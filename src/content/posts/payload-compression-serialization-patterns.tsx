import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function CompressionDiagram() {
  return (
    <Diagram
      label="A before bar showing a large verbose-JSON payload, three transform stages — dedupe keys, drop defaults, delta-encode — and an after bar showing the payload reduced by 94%."
      caption="The 94% came from designing the format around the data's structure — shared schema, omitted defaults, delta-encoded positions — not from gzipping verbose JSON after the fact."
    >
      <svg viewBox="0 0 760 280" role="img" aria-label="Payload compression stages">
        {/* before bar */}
        <text x="40" y="46" fill="#71717a" fontFamily="monospace" fontSize="11">
          verbose JSON
        </text>
        <rect x="40" y="56" width="680" height="34" rx="6" fill="rgba(244,63,94,0.12)" stroke="#f43f5e" />
        <text x="710" y="78" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="end">
          100% · repeated keys + defaults
        </text>

        {/* stages */}
        {[
          ["dedupe keys", "#22D3EE"],
          ["drop defaults", "#A855F7"],
          ["delta-encode", "#67E8F9"],
        ].map(([label, color], i) => (
          <g key={label as string}>
            <rect x={40 + i * 240} y="118" width="200" height="40" rx="8" fill="#0b1018" stroke={color as string} />
            <text x={140 + i * 240} y="143" fill={color as string} fontFamily="monospace" fontSize="11" textAnchor="middle">
              {label}
            </text>
            {i < 2 && (
              <text x={252 + i * 240} y="143" fill="#52525b" fontFamily="monospace" fontSize="14" textAnchor="middle">
                →
              </text>
            )}
          </g>
        ))}

        {/* after bar */}
        <text x="40" y="206" fill="#71717a" fontFamily="monospace" fontSize="11">
          schema-aware encoding
        </text>
        <rect x="40" y="216" width="41" height="34" rx="6" fill="rgba(34,211,238,0.18)" stroke="#22D3EE" />
        <text x="92" y="238" fill="#22D3EE" fontFamily="monospace" fontSize="11">
          6% — a 94% reduction, lossless
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        On IntegrateX&apos;s React Flow automation canvas, we cut the agent-graph payload by 94% without losing a node,
        edge, or coordinate. The win wasn&apos;t gzip — it was a Serialization Adapter, the bridge in the pattern I call
        Trinity Architecture, shaped around what the data actually <em>is</em>: a known schema, not prose. Once you stop
        shipping generic JSON and serialize the structure, the redundant bytes evaporate.
      </p>

      <h2>Generic JSON pays for the same keys over and over</h2>
      <p>
        A graph of 400 nodes serialized as idiomatic JSON repeats the strings{" "}
        <code>&quot;position&quot;</code>, <code>&quot;data&quot;</code>,{" "}
        <code>&quot;type&quot;</code>, <code>&quot;sourceHandle&quot;</code> four hundred times. It ships default values
        that never changed. It encodes absolute coordinates that mostly differ from their neighbours by a few pixels.
        Every one of those is a byte you&apos;re paying to transmit, parse, and re-transmit — and none of them carry
        information. Multiply that by WebSocket hops, JSON.parse cost, diffing, and render churn, and you&apos;re burning
        budget for zero signal.
      </p>

      <CompressionDiagram />

      <h2>Design the format around the data, not the other way around</h2>
      <p>
        The reduction came from three schema-aware moves, each lossless. Dedupe the keys: the schema is known, so field
        names live in one header, not on every record. Drop the defaults: if a node&apos;s type is the common case, omit it
        and reconstruct on read. Delta-encode the positions: store each coordinate as an offset from the last, so a tidy
        layout compresses to near-nothing. In my Trinity split, the Serialization Adapter does that work and hands the
        orchestrator lean buffers; the UI stays declarative and dumb by design. gzip on top of <em>that</em> is gravy; gzip
        on top of verbose JSON is lipstick.
      </p>

      <Terminal title="serialize.ts">
        <span className="tok-com">{`// before: 1 record = repeated keys + defaults + absolute coords`}</span>
        {"\n"}
        {`{ "id": "n12", "type": "agent", "position": { "x": 740, "y": 320 }, ... }\n\n`}
        <span className="tok-com">{`// after: columnar header + omitted defaults + delta coords`}</span>
        {"\n"}
        {`schema: ["id", "type?", "dx", "dy"]   // keys declared once\n`}
        {`rows:   [["n12", , 12, 8], ...]       // type omitted = default; coords are deltas`}
      </Terminal>

      <h2>Payload is a budget — measure it like latency</h2>
      <p>
        The reason this is worth doing isn&apos;t bytes for their own sake. Payload size is a budget that buys you faster
        loads, cheaper bandwidth, and smaller diffs over the wire on every interaction. On a real-time canvas with live
        node execution, the payload <em>is</em> the latency and it drives backpressure. On IntegrateX (and on streamerOS
        under 60fps constraints), tracking payload beside FPS and RTT kept the socket steady, reconciliation snappy, and
        render thrash down. Treat it as a first-class metric and the 94% is just what falls out of taking it seriously.
      </p>

      <blockquote>
        Compression isn&apos;t a bolt-on. The biggest wins come from encoding the data as what it is — structure with a
        schema — long before gzip ever sees it.
      </blockquote>

      <p>
        A small payload is half of feeling{" "}
        <a href="/blog/latency-first-ai-serverless-hono">instant</a>; the other half is streaming. This pattern grew out
        of the{" "}
        <a href="/blog/react-flow-agent-orchestration-canvas">agent orchestration canvas</a> and fits cleanly in my
        Trinity Architecture boundary: presentation renders, orchestration decides, the adapter serializes. Continue on
        the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const payloadCompression: BlogPost = {
  slug: "payload-compression-serialization-patterns",
  title: "94% Compression: Custom Serialization Patterns for Structured Data",
  description:
    "We cut a React Flow agent-graph payload by 94% without losing a node. The trick wasn't gzip — it was designing a serialization format around what the data is: structure with a known schema, not prose.",
  keywords: [
    "custom serialization",
    "payload compression",
    "columnar encoding",
    "delta encoding",
    "React Flow performance",
    "wire format design",
  ],
  publishedAt: "2026-05-25",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["Performance", "Architecture", "Frontend"],
  takeaways: [
    "Generic JSON wastes bytes on repeated keys, default values, and absolute coordinates that carry no information.",
    "A schema-aware format — deduped keys, omitted defaults, delta-encoded values — beats compressing verbose JSON after the fact.",
    "Payload size is a first-class budget: on a real-time canvas the payload is the latency, so measure it like one.",
  ],
  Body,
};
