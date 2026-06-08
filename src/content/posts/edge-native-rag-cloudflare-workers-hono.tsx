import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 340"
        className="h-auto w-full"
        role="img"
        aria-label="A user request hits the nearest edge Worker running Hono, which queries a serverless vector store and the model, versus a long round-trip to a single distant origin."
      >
        <defs>
          <marker id="ed-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Edge path label */}
        <text x="24" y="34" fill="#22D3EE" fontFamily="monospace" fontSize="11">
          EDGE-NATIVE · ~40ms
        </text>

        {/* User */}
        <circle cx="70" cy="110" r="22" fill="#0b1018" stroke="#3f3f46" />
        <text x="70" y="114" fill="#e4e4e7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          user
        </text>

        {/* Edge Worker (Hono) */}
        <rect x="150" y="64" width="200" height="92" rx="10" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" />
        <text x="250" y="88" fill="#22D3EE" fontFamily="monospace" fontSize="12" textAnchor="middle">
          Edge Worker · Hono
        </text>
        <rect x="166" y="100" width="78" height="40" rx="6" fill="#0b1018" stroke="#3f3f46" />
        <text x="205" y="124" fill="#a1a1aa" fontFamily="monospace" fontSize="10" textAnchor="middle">
          router
        </text>
        <rect x="256" y="100" width="78" height="40" rx="6" fill="#0b1018" stroke="#3f3f46" />
        <text x="295" y="124" fill="#a1a1aa" fontFamily="monospace" fontSize="10" textAnchor="middle">
          RAG
        </text>

        {/* Vector store */}
        <rect x="402" y="56" width="150" height="46" rx="8" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="477" y="84" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          Upstash Vector
        </text>

        {/* Model */}
        <rect x="402" y="118" width="150" height="46" rx="8" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="477" y="146" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          gemini-flash
        </text>

        {/* Arrows edge path */}
        <line x1="92" y1="110" x2="146" y2="110" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ed-arrow)" />
        <line x1="350" y1="100" x2="398" y2="82" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ed-arrow)" />
        <line x1="350" y1="124" x2="398" y2="140" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ed-arrow)" />

        {/* Divider */}
        <line x1="40" y1="208" x2="720" y2="208" stroke="#27272a" strokeWidth="1" strokeDasharray="3 6" />

        {/* Centralized path */}
        <text x="24" y="244" fill="#71717a" fontFamily="monospace" fontSize="11">
          CENTRALIZED ORIGIN · ~300ms+
        </text>
        <circle cx="70" cy="290" r="22" fill="#0b1018" stroke="#3f3f46" />
        <text x="70" y="294" fill="#e4e4e7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          user
        </text>
        <rect x="560" y="266" width="160" height="46" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="640" y="294" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">
          one far region
        </text>
        <line x1="92" y1="290" x2="556" y2="290" stroke="#71717a" strokeWidth="1.5" strokeDasharray="6 5" markerEnd="url(#ed-arrow)" />
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        The compute moves to the user. The whole pipeline — router, retrieval, model call — runs at the nearest edge.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        The default RAG tutorial assumes a server: a long-lived Node process,
        sitting in one region, holding a connection pool and waiting for traffic.
        For a global support assistant that model is backwards. Your users are
        everywhere; your origin is in one place; and most of the time it is idle,
        burning money to stay warm for a request that may never come. The
        streamerOS Support Agent runs the opposite way — the entire pipeline
        executes at the edge, on Cloudflare Workers, fronted by Hono.
      </p>

      <h2>What &quot;edge-native&quot; actually buys you</h2>
      <p>
        It is not just lower latency, though that is the headline. Running the RAG
        pipeline as a Worker means the router, the vector query, and the model
        call all happen in the data center physically closest to the person
        typing. There is no hop to a distant origin before any work begins. And
        because Workers spin up per request with near-zero cold start, there is no
        fleet to size and nothing to keep warm.
      </p>

      <Diagram />

      <h2>Why Hono</h2>
      <p>
        Workers give you a runtime; Hono gives you a framework that respects it.
        It is tiny, has no Node-API dependencies, and is fully typed end to end.
        On a runtime where every kilobyte of bundle and every millisecond of cold
        start is visible, Express-shaped baggage is a liability. Hono&apos;s
        router is built for exactly this surface — define routes, attach
        middleware, stream responses, and ship.
      </p>

      <Terminal title="worker.ts">
        <span className="tok-com">{`// the entire backend is a single edge handler`}</span>
        {"\n"}
        {`import { Hono } from "hono";\n`}
        {`const app = new Hono();\n\n`}
        {`app.post("/ask", async (c) => {\n`}
        {`  const { query } = await c.req.json();\n`}
        {`  const ctx = await retrieve(query, c.env);   // Upstash Vector, same edge\n`}
        {`  return streamGrounded(c, query, ctx);       // SSE back to the client\n`}
        {`});\n\n`}
        {`export default app;`}
      </Terminal>

      <h2>The shape of the request</h2>
      <p>
        A question arrives at the nearest PoP. The Worker boots, embeds the query,
        queries Upstash Vector — itself a serverless, HTTP-addressable store, so
        no persistent connection is needed — assembles the grounded context, and
        streams the model&apos;s answer straight back. The whole round trip never
        leaves the edge except to reach the model. When the response finishes, the
        Worker is gone. Nothing lingers, nothing idles.
      </p>

      <h2>The constraints are the point</h2>
      <p>
        Workers impose limits — CPU budget per request, no long-lived sockets, no
        sprawling dependencies. Those constraints are exactly what force a clean,
        stateless RAG design. You cannot lazily cache a giant client in module
        scope and forget about it; you build the pipeline to be cheap to start and
        cheap to discard. That discipline is why the architecture scales to zero
        and back without anyone touching it.
      </p>

      <blockquote>
        A serverless RAG pipeline is not a smaller version of your server. It is a
        different shape — stateless, edge-resident, and cheapest precisely when
        nobody is using it.
      </blockquote>

      <p>
        Grounding is what keeps this honest — see{" "}
        <a href="/blog/zero-hallucination-rag-grounding-contract">
          the grounding contract
        </a>{" "}
        — and{" "}
        <a href="/blog/streaming-ai-edge-hono-ai-sdk-nextjs">
          streaming from the edge
        </a>{" "}
        is how the answer reaches the user as it forms.
      </p>
    </>
  );
}

export const edgeNativeRag: BlogPost = {
  slug: "edge-native-rag-cloudflare-workers-hono",
  title: "Edge-Native RAG: Running a Retrieval Pipeline on Cloudflare Workers + Hono",
  description:
    "The standard RAG tutorial assumes a fat Node origin. Here is how to run the entire retrieval pipeline at the edge — router, vector query, and model call — on Cloudflare Workers with Hono, scaling to zero between requests.",
  keywords: [
    "RAG on Cloudflare Workers",
    "Hono RAG",
    "serverless RAG",
    "edge AI",
    "Upstash Vector",
    "Cloudflare Workers AI",
  ],
  publishedAt: "2026-06-07",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["Serverless", "RAG", "Cloudflare"],
  takeaways: [
    "Edge-native RAG runs the router, vector query, and model call in the data center closest to the user — no hop to a distant origin.",
    "Workers spin up per request with near-zero cold start, so there is no fleet to size and nothing to keep warm.",
    "Hono is the right framework for the runtime: tiny, typed, no Node-API baggage, built for streaming.",
    "Worker constraints (CPU budget, no long-lived sockets) force a clean stateless pipeline that scales to zero.",
  ],
  Body,
};
