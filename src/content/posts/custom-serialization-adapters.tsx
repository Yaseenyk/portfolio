import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Rich UI objects are great for rendering and lousy as records. In
        IntegrateX — a node-graph automation tool — the node you drag around the
        canvas is packed with measured geometry, hover/selection flags, handle
        maps, and framework internals. Persist that verbatim and every save ships
        kilobytes of cached view state, sync gets chatty, and real-time edits run
        into backpressure. I put a Serialization Adapter at the boundary, kept
        only the domain fields, and dropped the UI scaffolding. Net: 94% smaller
        payloads and predictable sync.
      </p>

      <h2>Two models, one boundary</h2>
      <p>
        The naive approach fuses two things that must stay separate: the{" "}
        <strong>render model</strong> (what the UI needs to draw) and the{" "}
        <strong>transport model</strong> (what the wire and database require).
        The adapter translates both ways, and nothing crosses without it. This is
        the Data / Serialization Adapter in the pattern I call{" "}
        <em>Trinity Architecture</em>: Presentation renders and dispatches only,
        a Reactive State / Orchestration layer owns the runtime truth and
        optimistic updates, and the Adapter shapes lean records for the wire. No
        layer talks past its neighbor — the UI never formats DB schemas, and the
        adapter never pokes UI state directly.
      </p>

      <Terminal title="adapter.ts">
        <span className="tok-com">{"// render model → lean transport record (and back)"}</span>
        {`
export const toRecord = (node: FlowNode): NodeRecord => ({
  id: node.id,
  type: node.type,
  x: Math.round(node.position.x),
  y: Math.round(node.position.y),
  config: node.data.config,   // the only domain data that matters
});

export const fromRecord = (r: NodeRecord): FlowNode =>
  hydrate(r, defaults(r.type));   // recompute view state, don't store it`}
      </Terminal>

      <h2>Derived, never stored</h2>
      <p>
        The lever behind the compression is simple: anything that can be{" "}
        <em>derived</em> must not be <em>stored</em>. Dimensions come from
        layout. Selection is ephemeral. Handle geometry is a function of node
        type. Persisting them is persisting a cache. In IntegrateX, the
        orchestrator (Zustand in the middle of my Trinity split) recomputes those
        bits on load and on change, so the transport stays lean while the UI
        stays reactive.
      </p>

      <h2>The 94%, decomposed</h2>
      <p>
        This wasn&apos;t a clever codec; it was subtraction. Drop measured
        geometry, per-node flags, duplicated handles, and framework metadata.
        Round coordinates to integers. A node that used to serialize to roughly a
        kilobyte collapses to a few dozen bytes. Multiply by a hundred-node
        graph, and you reclaim the budget for save, load, and real-time sync —
        fewer bytes on the wire, fewer renders, less state-synchronization lag.
      </p>

      <blockquote>
        Most payload-size problems aren&apos;t compression problems — they&apos;re
        boundary problems. You&apos;re shipping the cache because nobody enforced
        the line between the view and the record.
      </blockquote>

      <p>
        For the state-management side of the same project — optimistic updates,
        sync ordering, and throttled broadcasts — see{" "}
        <a href="/blog/94-percent-payload-reduction-react-flow">
          Compressing the Wire
        </a>
        ; the system is{" "}
        <a href="/#projects">IntegrateX</a>.
      </p>
    </>
  );
}

export const customSerializationAdapters: BlogPost = {
  slug: "custom-serialization-adapters",
  title: "Custom Serialization Adapters: 94% Payload Compression",
  description:
    "Rich UI objects make terrible database records. The Serialization Adapter pattern that separates render model from transport record — and cut IntegrateX payloads by 94%.",
  keywords: [
    "serialization",
    "React Flow",
    "payload compression",
    "adapter pattern",
    "state management",
    "MERN performance",
    "IntegrateX",
  ],
  publishedAt: "2026-06-15",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Performance", "Architecture", "React Flow"],
  takeaways: [
    "Separate the render model (UI) from the transport model (DB) with an adapter that owns the only conversion.",
    "Anything derivable — dimensions, selection, handle geometry — is recomputed on load, never stored.",
    "The 94% reduction is the sum of removing framework metadata and rounding coordinates, not a codec trick.",
    "Most payload-size problems are boundary problems: you're shipping the cache because no line was drawn.",
  ],
  Body,
};
