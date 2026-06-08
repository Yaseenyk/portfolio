import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function LatencyWaterfallDiagram() {
  const bar = (
    x: number,
    y: number,
    w: number,
    color: string,
    label: string,
  ) => (
    <g>
      <rect x={x} y={y} width={w} height="22" rx="4" fill={`${color}33`} stroke={color} />
      <text x={x + 6} y={y + 15} fill={color} fontFamily="monospace" fontSize="9">
        {label}
      </text>
    </g>
  );

  return (
    <Diagram
      label="Two latency waterfalls. The monolith path stacks cold start, serial retrieval, and a full generation before any output. The edge path warms instantly, retrieves in parallel, and streams the first token in under 300ms."
      caption="Perceived speed is time-to-first-token, not total time. The edge path streams its first token before the monolith has finished cold-starting."
    >
      <svg viewBox="0 0 760 300" role="img" aria-label="Latency waterfall comparison">
        {/* TTFT markers */}
        <line x1="360" y1="40" x2="360" y2="270" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 3" />
        <text x="366" y="52" fill="#22D3EE" fontFamily="monospace" fontSize="9">
          edge TTFT ~280ms
        </text>

        {/* monolith */}
        <text x="40" y="80" fill="#71717a" fontFamily="monospace" fontSize="11">
          monolith (serial, cold)
        </text>
        {bar(40, 92, 150, "#fb7185", "cold start")}
        {bar(190, 92, 130, "#f43f5e", "retrieve")}
        {bar(320, 92, 110, "#f43f5e", "history")}
        {bar(430, 92, 240, "#fb7185", "generate (blocking)")}
        <text x="676" y="108" fill="#71717a" fontFamily="monospace" fontSize="9">→ first byte</text>

        {/* edge */}
        <text x="40" y="180" fill="#71717a" fontFamily="monospace" fontSize="11">
          edge (parallel, warm)
        </text>
        {bar(40, 192, 60, "#67E8F9", "warm")}
        {bar(100, 192, 120, "#A855F7", "retrieve ∥")}
        {bar(100, 218, 120, "#A855F7", "cache ∥")}
        {bar(360, 192, 300, "#22D3EE", "stream tokens →")}
        <text x="240" y="207" fill="#71717a" fontFamily="monospace" fontSize="9">parallel</text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        Users forgive a wrong answer faster than a slow one. A wrong answer they can
        correct; a spinner they just abandon. Latency-first AI means designing the
        system so the first token lands in under 300 milliseconds — streamed from
        the edge, with retrieval in parallel and repeat questions served from cache
        — instead of a monolith sitting in silence while it thinks.
      </p>

      <h2>Time-to-first-token beats total time</h2>
      <p>
        Perceived performance is dominated by when output <em>starts</em>, not when
        it finishes. A response that streams its first words in 280ms and completes
        in three seconds feels faster than one that returns a complete answer after
        two seconds of blank screen. So the architectural goal isn&apos;t a smaller
        total — it&apos;s a smaller time-to-first-token. Everything else is detail.
      </p>

      <LatencyWaterfallDiagram />

      <h2>The edge kills the round-trips</h2>
      <p>
        Every hop between the user and the compute is latency you can&apos;t prompt
        your way out of. Running the orchestration on an edge runtime — Hono on
        Cloudflare Workers, deployed to hundreds of locations — puts the logic next
        to the user and the model API. No cold-start penalty, no transcontinental
        round-trip to a single region. The retrieval and history fetches that a
        monolith does serially, you fire in parallel, because at the edge the only
        thing worth waiting on is the model.
      </p>

      <Terminal title="edge.ts — Hono on Workers">
        <span className="tok-com">{`// parallel retrieval + streamed generation from the edge`}</span>
        {"\n"}
        {`app.post("/answer", async (c) => {\n`}
        {`  const q = (await c.req.json()).q;\n`}
        {`  const [ctx, hist] = await Promise.all([   // fan out, don't queue\n`}
        {`    retrieve(q),\n`}
        {`    loadHistory(c),\n`}
        {`  ]);\n`}
        {`  return streamText(c, model.stream(ground(ctx, hist, q))); // TTFT first\n`}
        {`});`}
      </Terminal>

      <h2>Semantic caching turns repeats into free, instant answers</h2>
      <p>
        Real traffic is repetitive: the same questions, phrased a dozen ways. An
        exact-match cache misses all of them. A <em>semantic</em> cache embeds the
        query and checks whether a near-identical question has been answered before
        — and if so, returns that answer for roughly zero cost and zero latency. It
        turns your most common questions into the cheapest and fastest ones, which
        is exactly backwards from a system that recomputes every time.
      </p>

      <blockquote>
        Latency isn&apos;t a tuning pass you do at the end. It&apos;s an
        architecture: stream first, run at the edge, retrieve in parallel, and never
        compute the same answer twice.
      </blockquote>

      <p>
        Streaming and parallelism only matter once the answer is{" "}
        <a href="/blog/rag-grounding-the-agent">grounded</a> and the payload is{" "}
        <a href="/blog/payload-compression-serialization-patterns">small</a>. Continue
        on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const latencyFirstAi: BlogPost = {
  slug: "latency-first-ai-serverless-hono",
  title: "Latency-First AI: Streaming from the Edge with Hono",
  description:
    "Users forgive a wrong answer faster than a slow one. Latency-first AI streams the first token in under 300ms from the edge — Hono on Workers, parallel retrieval, and semantic caching — instead of a monolith waiting to think.",
  keywords: [
    "edge AI",
    "Hono Cloudflare Workers",
    "streaming LLM",
    "time to first token",
    "semantic caching",
    "serverless AI latency",
  ],
  publishedAt: "2026-05-11",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["Edge", "AI", "Performance"],
  takeaways: [
    "Perceived speed is time-to-first-token, not total time — stream output the moment you can.",
    "Running orchestration at the edge removes round-trips and lets retrieval and history fetches run in parallel.",
    "Semantic caching serves near-identical repeat questions for roughly zero cost and zero latency.",
  ],
  Body,
};
