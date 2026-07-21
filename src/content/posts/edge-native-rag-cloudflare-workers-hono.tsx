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
        I have watched the default RAG tutorial — a fat Node server parked in one
        region, nursing a pool and waiting — turn into latency tax and idle burn.
        For a global support assistant that model is backwards: users are
        everywhere, the origin is in one place, and most of the time it sits warm
        doing nothing. streamerOS taught me not to spend a hop on hot paths; the
        Support Agent follows that rule. The whole pipeline runs at the edge on
        Cloudflare Workers, fronted by Hono.
      </p>

      <h2>What &quot;edge-native&quot; actually buys you</h2>
      <p>
        Latency is the headline, but the real win is earlier first token and fewer
        moving parts. The router, vector query, and model call all execute in the
        PoP next to the person typing, so work starts immediately instead of after
        a pre-origin detour. Workers spin up per request with near-zero cold start
        and die when they are done — no regional fleet to size, no warm pool, no
        surprise connection drains during quiet hours.
      </p>

      <Diagram />

      <h2>Why Hono</h2>
      <p>
        Workers give you the runtime; Hono stays out of the way. It is tiny,
        type-safe, and avoids Node-API baggage that drags cold starts. On a
        platform where bundle weight and CPU slices are visible, Express-shaped
        abstractions are noise. Hono&apos;s router maps cleanly to the surface:
        declare routes, attach middleware, stream, return. When the budget is
        milliseconds and kilobytes, that restraint shows up in p99.
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
        A question lands at the nearest PoP. The Worker boots, embeds the query,
        hits Upstash Vector over HTTP — no pools, no sockets — builds grounded
        context, and streams the model&apos;s answer back over SSE. The round trip
        never leaves the edge until the model call, and when the stream closes the
        process is gone. On the client I keep the pattern I call Trinity
        Architecture: Presentation components only render and dispatch; a
        lightweight orchestrator manages the SSE stream and optimistic status; and
        the edge Worker acts as the Data / Serialization Adapter, translating a
        tiny ask payload into retrieval + model calls and emitting a lean stream.
      </p>

      <h2>The constraints are the point</h2>
      <p>
        Workers force the right discipline: strict CPU budget, no long-lived
        sockets, no sprawling dependencies. You design for cold, not for cozy —
        small modules, pure functions, stream early, and release pressure quickly.
        Buffering entire responses or carrying heavyweight clients in module scope
        just creates backpressure and rent you cannot pay at the edge. Keep it
        stateless, keep it cheap to start, and it will scale to zero and back
        without babysitting.
      </p>

      <blockquote>
        A serverless RAG pipeline is not a diet origin. It is a different shape —
        stateless, edge-resident, and cheapest precisely when nobody is using it.
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
        delivers first tokens sooner, which keeps the UI smooth and avoids render
        thrash under real-time constraints.
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
