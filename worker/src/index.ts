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
  /** Passcode for the private /outreach drafter. Set via:
   *  npx wrangler secret put OUTREACH_PASSCODE  (or the CF dashboard). */
  OUTREACH_PASSCODE?: string;
  /** OpenAI (ChatGPT) key — drafts the outreach emails. Set as a secret:
   *  npx wrangler secret put OPENAI_API_KEY  (or the CF dashboard). */
  OPENAI_API_KEY?: string;
  /** Optional model override (default gpt-4o-mini). */
  OUTREACH_MODEL?: string;
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

/* ------------------------------ /api/outreach --------------------------- */
// Private, passcode-gated: drafts a personalized cold-outreach email in
// Yaseen's voice. Returns a draft only — the human reviews and sends from
// Gmail (propose/confirm boundary; never auto-sends).

const OUTREACH_FACTS = `About Yaseen Khatib (the sender):
- Senior Full-Stack Developer (React, Node.js, TypeScript, Python, MongoDB) now building production AI systems: RAG, agents, MCP.
- Shipped 5 products solo in ~12 months (streamerOS, IntegrateX, Sable, plus two autonomous pipelines).
- Speed proof: for a client LMS (Path Saathi), took a Monday MVP brief to a working platform live on dev the next day.
- Unusual proof point: recruiters/clients can add his portfolio to Claude as an MCP connector and interview it from inside their own AI.
- Open to project work and roles — remote, hybrid, or on-site (Hyderabad, IST).`;

// Links to weave into every email (plain URLs — they auto-linkify when sent).
const LINKS = `Portfolio: ${SITE}
Know more about me: ${SITE}/about
Products: ${SITE}/products
Blog: ${SITE}/blog
Interview my portfolio inside your own AI (MCP): https://yaseen-concierge.yaseenyk.workers.dev/mcp`;

// Best-effort read of the prospect's website → a short plain-text digest so
// the opener can reference what they actually do. Fails soft (many sites
// block bots or are JS-only); the typed goal/context still carries the email.
async function fetchSiteDigest(rawUrl: string): Promise<string> {
  try {
    const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OutreachResearch/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
    const desc = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)/i)?.[1] ?? "";
    const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)/i)?.[1] ?? "";
    const heads = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)]
      .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
      .filter(Boolean)
      .slice(0, 6);
    const digest = [
      title && `Title: ${title}`,
      (desc || ogDesc) && `Description: ${desc || ogDesc}`,
      heads.length && `Headings: ${heads.join(" · ")}`,
    ]
      .filter(Boolean)
      .join("\n");
    return digest.slice(0, 900);
  } catch {
    return "";
  }
}

async function handleOutreach(request: Request, env: Env, origin: string | null): Promise<Response> {
  if (!env.OUTREACH_PASSCODE) {
    return json({ error: "outreach drafter not configured (no passcode set)" }, 503, origin);
  }
  if (!env.OPENAI_API_KEY) {
    return json({ error: "OPENAI_API_KEY not set on the worker" }, 503, origin);
  }
  let body: {
    passcode?: string;
    company?: string;
    companyUrl?: string;
    jd?: string;
    image?: string; // data URL of an uploaded job-post screenshot
  };
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid JSON body" }, 400, origin);
  }
  if ((body.passcode ?? "") !== env.OUTREACH_PASSCODE) {
    return json({ error: "wrong passcode" }, 401, origin);
  }

  let company = String(body.company ?? "").trim().slice(0, 120);
  const companyUrl = String(body.companyUrl ?? "").trim().slice(0, 200);
  let jd = String(body.jd ?? "").trim().slice(0, 4000);
  let extractedEmail = "";

  try {
    // If a screenshot was uploaded, OCR the job post: pull company, role,
    // the full JD text, and any contact email out of it (gpt-4o vision).
    if (typeof body.image === "string" && body.image.startsWith("data:image")) {
      const vres = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    "This is a screenshot of a job posting. Extract and return ONLY " +
                    "a JSON object with keys: \"company\" (hiring company name), " +
                    "\"role\" (job title), \"email\" (any contact/apply email if " +
                    "present, else \"\"), and \"jd\" (the full job description text, " +
                    "responsibilities and requirements, as plain text). Use \"\" for " +
                    "anything not present.",
                },
                { type: "image_url", image_url: { url: body.image } },
              ],
            },
          ],
          response_format: { type: "json_object" },
          max_tokens: 1200,
        }),
      });
      if (vres.ok) {
        const vdata = (await vres.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        try {
          const ex = JSON.parse(String(vdata.choices?.[0]?.message?.content ?? "{}"));
          // Typed fields win; extracted fields fill the gaps.
          if (!jd && ex.jd) jd = String(ex.jd).slice(0, 4000);
          if (!company && ex.company) company = String(ex.company).slice(0, 120);
          if (ex.email) extractedEmail = String(ex.email).trim().slice(0, 120);
        } catch {
          /* extraction best-effort */
        }
      }
    }

    // Read the prospect's site if a URL was given (best-effort).
    const siteDigest = companyUrl ? await fetchSiteDigest(companyUrl) : "";

    const system =
      "You are Yaseen Khatib, a senior full-stack + AI engineer, writing a " +
      "polished, professional job-application email to a hiring manager. The " +
      "register is formal and traditional but still concrete and confident — " +
      "the tone of a strong professional application, not a casual note and not " +
      "a marketing pitch. Complete, well-formed sentences. Return ONLY a JSON " +
      "object with string keys \"subject\" and \"body\".";

    const rules =
      "REQUIREMENTS:\n" +
      "- Formal, respectful register throughout. No slang, no exclamation marks, " +
      "no em dashes (use commas or full stops), at most one question.\n" +
      "- Open by stating interest in the specific role" +
      (company ? " at the company" : "") +
      ", then in the next sentence show genuine understanding of what they do.\n" +
      "- State achievements as PLAIN OUTCOMES a non-technical hiring manager " +
      "understands, not jargon. Bad: \"a 94% serialization result\". Good: " +
      "\"built a workflow engine whose serialization layer reduced data payloads " +
      "by 94%, making saves effectively instant.\" Explain the win.\n" +
      "- Choose only the 1-2 MOST role-relevant proofs and present them well; do " +
      "not list everything. Real proofs: shipped 5 production products solo in a " +
      "year; delivered a client LMS (Path Saathi) from brief to a live platform " +
      "in a single day; built IntegrateX, a React Flow workflow engine whose " +
      "serialization layer cut payloads 94%; Sable, a local-first AI finance agent.\n" +
      "- Include one distinctive, professionally-framed point: my portfolio is " +
      "available as an MCP connector, so the team can query it directly from " +
      "within their own AI assistant, a capability few candidates offer.\n" +
      "- 120-170 words in the body. Confident but never boastful.\n" +
      "- BANNED phrases: \"I hope this email finds you well\", \"aligns perfectly\", " +
      "\"resonates deeply\", \"successfully shipped\", \"demonstrating my ability\", " +
      "\"high-quality solutions\", \"passionate\", \"leverage\", \"synergy\", " +
      "\"fast-paced\", \"seamless\", \"evolution\".\n";

    const greeting = company ? `Dear ${company} Team,` : "Dear Hiring Manager,";
    const user =
      OUTREACH_FACTS +
      "\n\n" +
      (jd
        ? `TARGET ROLE / JOB DESCRIPTION — tailor the whole email to it, mapping my strongest relevant proof to what they actually need:\n${jd}\n\n`
        : "") +
      (company ? `Prospect company: ${company}\n` : "") +
      (siteDigest ? `What their company does (from their website):\n${siteDigest}\n` : "") +
      "\n" + rules +
      "\nSTRUCTURE:\n" +
      "- \"subject\": a formal application subject line: " +
      "\"Application: <role from the JD, or 'Full-Stack + AI Engineer'> — Yaseen Khatib\".\n" +
      "- \"body\": line 1 is the greeting \"" + greeting + "\", then a blank line, " +
      "then the email, then a courteous close (e.g. \"I would welcome the chance " +
      "to discuss how I can contribute.\"), then a line \"Links:\" followed by " +
      "these on their own lines with full URLs kept intact:\n" + LINKS +
      "\nthen a blank line, then \"Best regards,\" and \"Yaseen Khatib\" on the next line.";

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.OUTREACH_MODEL || "gpt-4o",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
        max_tokens: 700,
        temperature: 0.7,
      }),
    });
    if (!res.ok) {
      return json(
        { error: `openai error ${res.status}: ${(await res.text()).slice(0, 200)}` },
        502,
        origin,
      );
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    let subject = `Full-Stack + AI Engineer — Yaseen Khatib`;
    let emailBody = "";
    try {
      const parsed = JSON.parse(String(data.choices?.[0]?.message?.content ?? "{}"));
      if (parsed.subject) subject = String(parsed.subject).trim();
      emailBody = String(parsed.body ?? "").trim();
    } catch {
      emailBody = String(data.choices?.[0]?.message?.content ?? "").trim();
    }
    return json(
      {
        subject,
        body: emailBody,
        researched: Boolean(siteDigest),
        tailored: Boolean(jd),
        extractedEmail,
        extractedCompany: company,
      },
      200,
      origin,
    );
  } catch (err) {
    return json({ error: `draft failed: ${String(err).slice(0, 200)}` }, 500, origin);
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
    if (pathname === "/api/outreach" && request.method === "POST") {
      return handleOutreach(request, env, origin);
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
