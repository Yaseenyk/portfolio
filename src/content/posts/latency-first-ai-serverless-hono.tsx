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
        People will forgive a wrong answer faster than a slow one. You can fix a bad
        take; you can&apos;t rescue a dead spinner. I budget for sub-300ms
        time-to-first-token: open the stream from the edge, kick retrieval in
        parallel, and let cache hits land instantly. That&apos;s how IntegrateX and
        streamerOS stayed &quot;live&quot; under load; the monolith path sits quiet
        through cold starts and serial I/O, and users bounce before the first byte.
      </p>

      <h2>Time-to-first-token beats total time</h2>
      <p>
        Humans key off when text <em>starts</em> moving, not when it finishes. A
        pipeline that shows words at ~280ms and wraps in three seconds feels faster
        than a two-second silent build-then-dump. Optimize the front of the curve.
        In the pattern I call Trinity Architecture, the Presentation layer just
        paints arriving tokens; the Orchestrator owns the stream and retries; the
        Adapter preps lean prompts. Shave TTFT first — everything else amortizes.
      </p>

      <LatencyWaterfallDiagram />

      <h2>The edge kills the round-trips</h2>
      <p>
        Every hop is a tax you can&apos;t prompt away. Put the orchestration on an
        edge runtime — Hono on Cloudflare Workers — next to the user and the model.
        Warm starts, cheap concurrency, and no region ping-pong just to fetch
        history. Retrieval and history must fan out; don&apos;t queue them. With my
        Trinity split, UI never formats data or waits on I/O; the Adapter only
        shapes payloads; the Orchestrator coordinates and streams. The only thing
        worth waiting on is tokens from the model.
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
        Real traffic repeats: &quot;reset password,&quot; &quot;forgot password,&quot;
        and &quot;can&apos;t sign in&quot; are the same ask. Exact-match caching
        whiffs all of them. Embed the query, do a KNN lookup, and if confidence
        clears a floor, return the prior answer immediately and log provenance. Now
        your heaviest FAQs become zero-cost, zero-latency hits. Add TTLs and drift
        checks so freshness stays honest.
      </p>

      <blockquote>
        Latency isn&apos;t a tuning pass; it&apos;s an operating posture: stream
        first, run at the edge, fan out retrieval, and never recompute what you can
        recall — with Trinity Architecture keeping each layer in its lane.
      </blockquote>

      <p>
        Streaming and parallelism only matter once the answer is{" "}
        <a href="/blog/rag-grounding-the-agent">grounded</a> and the payload is{" "}
        <a href="/blog/payload-compression-serialization-patterns">small</a>. On
        IntegrateX, a Serialization Adapter stripped non-essential React Flow UI
        metadata before persistence and cut payloads 94%, which kept edge streams
        snappy and avoided backpressure thrash. Continue on the <a href="/roadmap">roadmap</a>.
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
