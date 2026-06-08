import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 280"
        className="h-auto w-full"
        role="img"
        aria-label="Tokens flow from the model through a Hono SSE stream on a Cloudflare Worker into a Next.js App Router client, painting progressively, with a first-token-under-one-second marker."
      >
        <defs>
          <marker id="st-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Model */}
        <rect x="24" y="100" width="130" height="56" rx="10" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="89" y="133" fill="#A855F7" fontFamily="monospace" fontSize="12" textAnchor="middle">
          model
        </text>

        {/* Hono SSE */}
        <rect x="240" y="100" width="160" height="56" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="320" y="126" fill="#22D3EE" fontFamily="monospace" fontSize="12" textAnchor="middle">
          Hono · SSE
        </text>
        <text x="320" y="143" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          edge worker
        </text>

        {/* Next.js client */}
        <rect x="486" y="100" width="180" height="56" rx="10" fill="rgba(103,232,249,0.08)" stroke="#67E8F9" />
        <text x="576" y="126" fill="#67E8F9" fontFamily="monospace" fontSize="12" textAnchor="middle">
          Next.js · useChat
        </text>
        <text x="576" y="143" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          progressive paint
        </text>

        {/* token packets */}
        {[170, 195, 220].map((x, i) => (
          <rect key={`p1${i}`} x={x} y="121" width="12" height="14" rx="2" fill="#A855F7" opacity={0.4 + i * 0.2} />
        ))}
        {[416, 441, 466].map((x, i) => (
          <rect key={`p2${i}`} x={x} y="121" width="12" height="14" rx="2" fill="#22D3EE" opacity={0.4 + i * 0.2} />
        ))}

        {/* Arrows */}
        <line x1="154" y1="128" x2="236" y2="128" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#st-arrow)" />
        <line x1="400" y1="128" x2="482" y2="128" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#st-arrow)" />

        {/* first token marker */}
        <line x1="486" y1="180" x2="486" y2="220" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="486" y="240" fill="#34d399" fontFamily="monospace" fontSize="11" textAnchor="middle">
          first token &lt; 1s
        </text>
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        No spinner. Tokens leave the model and reach the user&apos;s screen as a continuous stream across the edge.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        A support answer that arrives all at once, after a three-second pause,
        feels broken even when it is correct. The same answer streamed word by
        word feels instant. Perceived latency is the product, and streaming is how
        you win it. The tricky part is that most tutorials show you half the wire —
        the React hook, or the backend handler — and leave you to guess how the two
        actually connect. This is the whole path: model to Hono to Next.js, end to
        end.
      </p>

      <h2>Server-Sent Events, not WebSockets</h2>
      <p>
        LLM streaming is one-directional: the server emits tokens, the client
        listens. That is exactly the shape SSE was built for, and it is far
        simpler than a WebSocket — plain HTTP, no upgrade handshake, automatic
        reconnection, and a perfect fit for the request/response model of a
        Cloudflare Worker. Reaching for a bidirectional socket here is solving a
        problem you do not have.
      </p>

      <Diagram />

      <h2>The backend: Hono streams the model through</h2>
      <p>
        On the Worker, the job is to take the model&apos;s token stream and relay
        it to the client without buffering. The <code>@ai-sdk</code> gives you a
        streaming result whose body is already a readable stream of tokens; Hono
        hands that straight back as the response. The Worker is a pass-through pipe
        with grounding attached — it never waits for the full answer before sending
        the first byte.
      </p>

      <Terminal title="worker.ts">
        <span className="tok-com">{`// Hono returns the model's token stream directly — no buffering`}</span>
        {"\n"}
        {`app.post("/ask", async (c) => {\n`}
        {`  const { query } = await c.req.json();\n`}
        {`  const ctx = await retrieve(query, c.env);\n\n`}
        {`  const result = streamText({\n`}
        {`    model: gemini(c.env),\n`}
        {`    system: GROUNDING_CONTRACT,\n`}
        {`    messages: [{ role: "user", content: withContext(query, ctx) }],\n`}
        {`  });\n\n`}
        {`  return result.toDataStreamResponse();  // SSE, straight to the edge\n`}
        {`});`}
      </Terminal>

      <h2>The frontend: App Router consumes it</h2>
      <p>
        On the Next.js side, the <code>useChat</code> hook from the AI SDK consumes
        that same stream and re-renders as each token lands. Point it at the Worker
        route, render the streaming message, and the progressive paint is handled
        for you. Because the App Router serves a static, prerendered shell, the
        page is interactive before the first token is even requested — the heavy
        lifting is all on the stream, not the bundle.
      </p>

      <Terminal title="chat.tsx">
        {`"use client";\n`}
        {`import { useChat } from "@ai-sdk/react";\n\n`}
        {`export function SupportChat() {\n`}
        {`  const { messages, input, handleInputChange, handleSubmit } =\n`}
        {`    useChat({ api: "https://agent.example.workers.dev/ask" });\n`}
        {`  // each token re-renders the last message — progressive paint, free\n`}
        {`  return /* form + message list */;\n`}
        {`}`}
      </Terminal>

      <h2>Why the edge makes it feel instant</h2>
      <p>
        Streaming hides total latency, but the first token still has to travel.
        Running the Worker at the edge means that first token has the shortest
        possible trip to the user, so the answer <em>starts</em> almost
        immediately — and once it starts, the brain stops counting. The combination
        of edge proximity and token streaming is what turns &quot;technically
        fast&quot; into &quot;feels instant.&quot;
      </p>

      <blockquote>
        Users do not experience total latency; they experience time-to-first-token.
        Stream from the edge and the wait disappears even when the work does not.
      </blockquote>

      <p>
        This is the delivery layer for{" "}
        <a href="/blog/edge-native-rag-cloudflare-workers-hono">
          the edge-native RAG pipeline
        </a>
        , and it carries{" "}
        <a href="/blog/zero-hallucination-rag-grounding-contract">
          grounded answers
        </a>{" "}
        — the stream is fast, but it is still constrained to the retrieved context.
      </p>
    </>
  );
}

export const streamingAiEdge: BlogPost = {
  slug: "streaming-ai-edge-hono-ai-sdk-nextjs",
  title: "Streaming AI From the Edge: SSE Token Streaming with Hono, @ai-sdk and Next.js",
  description:
    "Perceived latency is the product. The complete streaming path for a RAG agent — model to Hono SSE on a Cloudflare Worker to a Next.js App Router client — so answers paint as they form, with first token under a second.",
  keywords: [
    "stream LLM Hono",
    "server-sent events AI",
    "ai-sdk useChat",
    "Next.js App Router streaming",
    "edge streaming",
    "LLM streaming React",
  ],
  publishedAt: "2026-05-29",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["Serverless", "Next.js", "RAG"],
  takeaways: [
    "LLM streaming is one-directional, so SSE fits better than a WebSocket — plain HTTP, no handshake, edge-friendly.",
    "Hono relays the model's token stream straight to the client with no buffering; the AI SDK provides the stream.",
    "Next.js App Router + useChat consumes the stream and handles progressive paint, on a statically prerendered shell.",
    "Edge proximity minimises time-to-first-token, which is the latency users actually perceive.",
  ],
  Body,
};
