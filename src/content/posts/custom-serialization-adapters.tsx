import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Rich UI objects make terrible database records. In IntegrateX — a
        node-graph automation tool — the thing the user drags around the canvas
        carries measured geometry, interaction flags, handle definitions, and
        framework internals. Persist that verbatim and every save writes
        kilobytes of cache. A custom Serialization Adapter pattern stripped it to
        the domain essentials and cut payloads by 94%.
      </p>

      <h2>Two models, one boundary</h2>
      <p>
        The naive design conflates two things that should never be the same: the
        <strong> render model</strong> (what the UI library needs to draw) and
        the <strong>transport model</strong> (what the database and wire
        actually require). An adapter translates between them in both directions,
        and nothing crosses the boundary without passing through it.
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
        The principle that powers the compression: anything that can be{" "}
        <em>derived</em> must never be <em>stored</em>. Measured dimensions are
        derived from layout. Selection is ephemeral. Handle geometry is a
        function of the node type. Persisting them is persisting a cache — and
        caches do not belong in your source of truth.
      </p>

      <h2>The 94%, decomposed</h2>
      <p>
        The reduction is not a clever codec; it is the sum of removing what was
        never needed. Drop the measured geometry, the per-node flags, the
        duplicated handles, and the framework metadata, round coordinates to
        integers, and a node that serialized to roughly a kilobyte collapses to a
        few dozen bytes. Across a hundred-node graph, that is the entire
        performance profile of save, load, and real-time sync.
      </p>

      <blockquote>
        Most payload-size problems are not compression problems — they are
        boundary problems. You are shipping the cache because nobody drew the line
        between the view and the record.
      </blockquote>

      <p>
        For the state-management side of the same project, see{" "}
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
