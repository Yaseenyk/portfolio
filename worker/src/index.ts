/**
 * Portfolio Concierge — one Worker, two interfaces:
 *
 *   POST /api/chat   Grounded RAG for the site's terminal concierge.
 *   POST /mcp        MCP server (Streamable HTTP) — add this URL to Claude
 *                    and interrogate the portfolio from inside your own AI.
 *
 * Grounding contract: answers come only from the indexed corpus
 * (llms-full.txt, embedded into Vectorize by worker/scripts/index-corpus.mjs).
 * Low-similarity queries get an honest refusal, never a guess.
 */

export interface Env {
  AI: {
    run(model: string, input: Record<string, unknown>): Promise<any>;
  };
  VECTORIZE: {
    query(
      vector: number[],
      options: Record<string, unknown>,
    ): Promise<{ matches: { id: string; score: number; metadata?: Record<string, unknown> }[] }>;
  };
}

const EMBED_MODEL = "@cf/baai/bge-base-en-v1.5";
const GEN_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const MIN_SCORE = 0.55;
const SITE = "https://yaseenkhatib.streamerosai.com";

const ALLOWED_ORIGINS = new Set([
  SITE,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const REFUSAL =
  "That's outside my grounded context — I only answer from Yaseen's indexed portfolio corpus, and retrieval confidence was too low to answer honestly. Try asking about his stack, products, architecture decisions, or availability.";

const AVAILABILITY =
  "Yaseen Khatib is open to Lead and Senior Full-Stack / AI Engineering roles — remote, hybrid, or on-site. Based in Hyderabad, India (IST), comfortable working from an office, effective across global time zones. Contact: contact@streamerosai.com · linkedin.com/in/yaseen-yk · github.com/Yaseenyk. Interview brief for engineering leadership: " +
  SITE +
  "/interview";

const PRODUCTS = [
  "streamerOS — Rust + Tauri desktop cockpit for streamers: on-device Twitch/YouTube chat ingestion, telemetry, OBS WebSocket automation. " + SITE + "/products/streameros",
  "IntegrateX — React Flow workflow engine; schema-aware serialization adapter cut payloads 94%. " + SITE + "/blog/the-94-percent-decision-integratex",
  "Sable — local-first AI finance agent: on-device SQLite, model proposes / human commits. " + SITE + "/products/sable",
  "Zero-Cost AI Blog Writer — autonomous daily article + cover pipeline on GitHub Actions, $0 infrastructure. " + SITE + "/products/ai-blogger",
  "Automated LinkedIn Pipeline — turns shipped work into scheduled posts, state committed to Git. " + SITE + "/products/linkedin-pipeline",
].join("\n");

/* ------------------------------- helpers -------------------------------- */

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : SITE;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id, MCP-Protocol-Version",
    "Access-Control-Max-Age": "86400",
  };
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(origin) },
  });
}

async function embed(env: Env, text: string): Promise<number[]> {
  const res = await env.AI.run(EMBED_MODEL, { text: [text] });
  return res.data[0];
}

interface Retrieved {
  ms: number;
  topScore: number;
  chunks: { text: string; url: string; title: string; score: number }[];
}

async function retrieve(env: Env, query: string, topK = 5): Promise<Retrieved> {
  const t0 = Date.now();
  const vector = await embed(env, query);
  const result = await env.VECTORIZE.query(vector, {
    topK,
    returnValues: false,
    returnMetadata: "all",
  });
  const chunks = result.matches.map((m) => ({
    text: String(m.metadata?.text ?? ""),
    url: String(m.metadata?.url ?? ""),
    title: String(m.metadata?.title ?? ""),
    score: m.score,
  }));
  return { ms: Date.now() - t0, topScore: chunks[0]?.score ?? 0, chunks };
}

async function generate(env: Env, query: string, context: string): Promise<string> {
  const res = await env.AI.run(GEN_MODEL, {
    messages: [
      {
        role: "system",
        content:
          "You are the portfolio concierge for Yaseen Khatib, a Senior Full-Stack AI Engineer. " +
          "Answer the user's question using ONLY the CONTEXT below — it is excerpts from Yaseen's own articles. " +
          "If the context does not contain the answer, say so plainly instead of guessing. " +
          "Write 2-4 sentences of plain text (no markdown), professional and specific, in third person about Yaseen.\n\nCONTEXT:\n" +
          context,
      },
      { role: "user", content: query },
    ],
    max_tokens: 320,
  });
  return String(res.response ?? "").trim();
}

/* ------------------------------ /api/chat ------------------------------- */

async function handleChat(request: Request, env: Env, origin: string | null): Promise<Response> {
  let query: string;
  try {
    const body = (await request.json()) as { query?: string };
    query = String(body.query ?? "").trim();
  } catch {
    return json({ error: "invalid JSON body" }, 400, origin);
  }
  if (!query || query.length > 500) {
    return json({ error: "query must be 1-500 characters" }, 400, origin);
  }

  try {
    const r = await retrieve(env, query);
    const searchTrace = {
      kind: "search",
      label: "vector search",
      value: `${r.ms}ms · top ${r.topScore.toFixed(2)}`,
    };

    if (r.topScore < MIN_SCORE) {
      return json(
        {
          answer: REFUSAL,
          grounded: false,
          traces: [
            searchTrace,
            { kind: "guard", label: "grounding contract", value: "refused — out of corpus" },
          ],
        },
        200,
        origin,
      );
    }

    const context = r.chunks
      .map((c) => `[${c.title}] ${c.text}`)
      .join("\n---\n")
      .slice(0, 6000);
    const answer = await generate(env, query, context);
    const sources = [...new Set(r.chunks.map((c) => c.url).filter(Boolean))].slice(0, 3);

    return json(
      {
        answer: answer || REFUSAL,
        grounded: true,
        sources,
        traces: [
          searchTrace,
          { kind: "context", label: "context retrieved", value: `${r.chunks.length} chunks` },
          { kind: "guard", label: "guardrail check", value: "passed" },
        ],
      },
      200,
      origin,
    );
  } catch (err) {
    return json({ error: `pipeline error: ${String(err).slice(0, 200)}` }, 500, origin);
  }
}

/* --------------------------------- /mcp --------------------------------- */

const TOOLS = [
  {
    name: "search_portfolio",
    description:
      "Semantic search over Yaseen Khatib's 95-article portfolio corpus (architecture decisions, products, AI systems, career). Returns the most relevant excerpts with source URLs.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "What to look up" } },
      required: ["query"],
    },
  },
  {
    name: "get_products",
    description:
      "List the five production products Yaseen Khatib built solo, with one-line summaries and links.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_availability",
    description:
      "Yaseen Khatib's current availability, target roles, location/timezone, and contact channels.",
    inputSchema: { type: "object", properties: {} },
  },
];

async function callTool(env: Env, name: string, args: Record<string, unknown>): Promise<string> {
  if (name === "get_products") return PRODUCTS;
  if (name === "get_availability") return AVAILABILITY;
  if (name === "search_portfolio") {
    const query = String(args?.query ?? "").trim();
    if (!query) return "Provide a query.";
    const r = await retrieve(env, query, 4);
    if (r.topScore < MIN_SCORE) {
      return "No sufficiently relevant excerpts in the corpus for that query (grounding contract: refuse rather than guess).";
    }
    return r.chunks
      .map((c) => `## ${c.title} (relevance ${c.score.toFixed(2)})\n${c.text}\nSource: ${c.url}`)
      .join("\n\n");
  }
  throw new Error(`unknown tool: ${name}`);
}

async function handleMcp(request: Request, env: Env, origin: string | null): Promise<Response> {
  let rpc: { jsonrpc?: string; id?: number | string | null; method?: string; params?: any };
  try {
    rpc = await request.json();
  } catch {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "parse error" } }, 400, origin);
  }

  // Notifications carry no id and expect no body.
  if (rpc.id === undefined || rpc.id === null) {
    return new Response(null, { status: 202, headers: corsHeaders(origin) });
  }

  const reply = (result: unknown) => json({ jsonrpc: "2.0", id: rpc.id, result }, 200, origin);
  const fail = (code: number, message: string) =>
    json({ jsonrpc: "2.0", id: rpc.id, error: { code, message } }, 200, origin);

  try {
    switch (rpc.method) {
      case "initialize":
        return reply({
          protocolVersion: rpc.params?.protocolVersion ?? "2025-03-26",
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "yaseen-khatib-portfolio", version: "1.0.0" },
          instructions:
            "Tools for evaluating Yaseen Khatib (Senior Full-Stack AI Engineer). Search his article corpus, list his shipped products, or check availability. Canonical bio: " +
            SITE +
            "/about",
        });
      case "ping":
        return reply({});
      case "tools/list":
        return reply({ tools: TOOLS });
      case "tools/call": {
        const text = await callTool(env, String(rpc.params?.name), rpc.params?.arguments ?? {});
        return reply({ content: [{ type: "text", text }], isError: false });
      }
      default:
        return fail(-32601, `method not found: ${rpc.method}`);
    }
  } catch (err) {
    return fail(-32603, String(err).slice(0, 200));
  }
}

/* --------------------------------- router -------------------------------- */

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (pathname === "/api/chat" && request.method === "POST") {
      return handleChat(request, env, origin);
    }
    if (pathname === "/mcp") {
      if (request.method === "POST") return handleMcp(request, env, origin);
      // Stateless server: no SSE stream to offer on GET.
      return new Response(null, { status: 405, headers: corsHeaders(origin) });
    }
    if (pathname === "/" && request.method === "GET") {
      return json(
        {
          service: "yaseen-concierge",
          endpoints: {
            chat: "POST /api/chat {query}",
            mcp: "POST /mcp (MCP Streamable HTTP — add this URL to Claude)",
          },
          owner: SITE,
        },
        200,
        origin,
      );
    }
    return json({ error: "not found" }, 404, origin);
  },
};
