import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function TraceWaterfallDiagram() {
  const span = (
    x: number,
    y: number,
    w: number,
    color: string,
    label: string,
    meta: string,
  ) => (
    <g>
      <rect x={x} y={y} width={w} height="24" rx="4" fill={`${color}22`} stroke={color} />
      <text x={x + 8} y={y + 16} fill={color} fontFamily="monospace" fontSize="9">
        {label}
      </text>
      <text x={x + w + 8} y={y + 16} fill="#71717a" fontFamily="monospace" fontSize="8">
        {meta}
      </text>
    </g>
  );

  return (
    <Diagram
      label="A distributed trace of one agent request shown as a waterfall. A parent request span contains child spans for retrieve, rerank, model generation, and verify; each child carries token, cost, and latency attributes, and the slow generation span is highlighted."
      caption="A trace is the request's story end to end. Logs tell you a call happened; a span tells you how long it took, what it cost, and which step in the chain blew the latency budget."
    >
      <svg viewBox="0 0 760 250" role="img" aria-label="Agent request trace waterfall">
        {/* parent span */}
        <rect x="40" y="32" width="660" height="24" rx="4" fill="rgba(103,232,249,0.12)" stroke="#67E8F9" />
        <text x="48" y="48" fill="#67E8F9" fontFamily="monospace" fontSize="9">
          POST /answer · trace 4f2a…
        </text>
        <text x="640" y="48" fill="#71717a" fontFamily="monospace" fontSize="8">
          1.84s
        </text>

        {span(70, 72, 90, "#A855F7", "retrieve", "120ms")}
        {span(70, 104, 70, "#A855F7", "rerank", "80ms")}
        {span(170, 136, 420, "#fb7185", "model.generate", "1.41s · 2.3k tok · $0.011")}
        {span(600, 168, 90, "#22D3EE", "verify", "70ms")}

        {/* budget marker */}
        <line x1="300" y1="24" x2="300" y2="210" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 3" />
        <text x="306" y="206" fill="#22D3EE" fontFamily="monospace" fontSize="9">
          TTFT budget 280ms
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        LLM observability means every agent request ships a structured trace — one
        span per step, tagged with tokens, cost, latency, model, and outcome — so
        &quot;why is this slow or wrong?&quot; turns from folklore into facts. A
        multi‑step agent that only logs is a black box; wire it with OpenTelemetry
        and you get a waterfall you can scan and point at the span that blew the
        budget. In the pattern I call Trinity Architecture, tracing lives in the
        orchestration layer, not the UI or the model client.
      </p>

      <h2>Logs tell you it happened; spans tell you the shape</h2>
      <p>
        An agent call fans out: embed the query, retrieve, rerank, generate, verify,
        maybe loop. When the p95 latency creeps up or the bill doubles, scattered log
        lines can&apos;t tell you <em>which</em> step did it — they have no parent, no
        duration, no shared trace id. Spans do. Wrap each step and one request becomes
        a tree: total time at the root, a labelled child per stage, and attributes on
        each. On IntegrateX we caught a rerank burst exactly this way when canvas
        executions started queuing; the hunch became one slow span you could fix.
      </p>

      <TraceWaterfallDiagram />

      <h2>The GenAI semantic conventions make traces comparable</h2>
      <p>
        OpenTelemetry ships a standard vocabulary for model calls —{" "}
        <code>gen_ai.system</code>, <code>gen_ai.request.model</code>,{" "}
        <code>gen_ai.usage.input_tokens</code>, <code>gen_ai.usage.output_tokens</code>.
        Using the conventions instead of ad-hoc field names means any backend —
        Grafana, Honeycomb, Langfuse — renders your traces the same way, and
        cost-per-trace becomes a query over <code>output_tokens</code> rather than a
        spreadsheet. I route these attributes through a thin Serialization Adapter so
        telemetry stays lean and comparable without leaking UI or DB shapes across layers.
      </p>

      <Terminal title="otel.ts — one span per model call">
        <span className="tok-com">{`// wrap the model call in a span tagged with the GenAI conventions`}</span>
        {"\n"}
        {`return tracer.startActiveSpan("model.generate", async (span) => {\n`}
        {`  span.setAttributes({\n`}
        {`    "gen_ai.system": "anthropic",\n`}
        {`    "gen_ai.request.model": model,\n`}
        {`  });\n`}
        {`  const res = await llm.generate(prompt);\n`}
        {`  span.setAttributes({\n`}
        {`    "gen_ai.usage.input_tokens": res.usage.input,\n`}
        {`    "gen_ai.usage.output_tokens": res.usage.output,\n`}
        {`    "gen_ai.cost.usd": cost(res.usage),  // derived, for cost-per-trace\n`}
        {`  });\n`}
        {`  span.end();\n`}
        {`  return res;\n`}
        {`});`}
      </Terminal>

      <h2>Online tracing is not offline evals — you need both</h2>
      <p>
        Observability watches production as it happens: latency, cost, error rates,
        the actual distribution of traffic. Evals score quality against a fixed set
        before you ship. They answer different questions — &quot;is it fast and cheap
        right now?&quot; versus &quot;is it correct?&quot; — and neither covers the
        other. A trace can tell you a span took four seconds; only an eval tells you
        the answer it produced was wrong. On streamerOS we even sampled traces to
        avoid backpressure and keep 60fps renders while offline evals guarded quality.
      </p>

      <blockquote>
        You can&apos;t tune what you can&apos;t see. A trace per request turns
        &quot;the agent feels slow lately&quot; into &quot;the rerank span doubled on
        Tuesday&quot; — and that&apos;s the difference between debugging and guessing.
      </blockquote>

      <p>
        Tracing is what makes the{" "}
        <a href="/blog/latency-first-ai-serverless-hono">latency-first</a> target
        measurable and{" "}
        <a href="/blog/agentic-control-loops">autonomous loops</a> auditable. Continue
        on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const llmObservability: BlogPost = {
  slug: "llm-observability-opentelemetry-tracing",
  title: "LLM Observability: Tracing Agents with OpenTelemetry",
  description:
    "A multi-step agent that only logs is a black box. LLM observability emits a span per step — tagged with tokens, cost, and latency via the OpenTelemetry GenAI conventions — so a slow or expensive request becomes a trace you can read, not guess at.",
  keywords: [
    "LLM observability",
    "OpenTelemetry GenAI",
    "agent tracing",
    "cost per trace",
    "AI monitoring",
    "distributed tracing LLM",
  ],
  publishedAt: "2026-06-03",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "Observability", "Architecture"],
  takeaways: [
    "Emit one span per agent step so a request becomes a readable waterfall — total at the root, a labelled child per stage.",
    "Use the OpenTelemetry GenAI semantic conventions (gen_ai.*) so any backend renders traces the same way and cost-per-trace is a query.",
    "Online tracing answers 'fast and cheap right now?'; offline evals answer 'correct?' — they're complementary, not substitutes.",
  ],
  Body,
};
