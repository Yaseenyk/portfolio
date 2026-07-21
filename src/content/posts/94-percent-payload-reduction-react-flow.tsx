import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Node-graph editors — n8n clones, pipeline builders, anything with
        connectors and edges — carry a quiet performance leak. The thing the
        user drags around the canvas is a fat UI object, and naive systems write
        that object straight to storage. Save a moderately complex workflow and
        you&apos;re archiving measured widths, port geometry, drag state, even
        framework internals. On IntegrateX that bloat surfaced as sync lag and
        unnecessary WebSocket chatter during co-editing. I drew a hard
        serialization boundary, stripped the render-only fields, and the payload
        fell by <strong>94%</strong>.
      </p>

      <h2>Where the bytes go</h2>
      <p>
        A single React Flow node is not your data. It&apos;s your data wrapped in
        everything the renderer needs: <code>position</code>,{" "}
        <code>measured</code> dimensions, <code>selected</code> and{" "}
        <code>dragging</code> flags, handle definitions, z-index, and whatever
        view state your custom node component latched onto. Multiply that by every
        node and edge, serialize the whole graph, and your wire payload becomes
        mostly things that should never have left the browser. None of it matters
        to the backend, yet you pay for it on every save, reload, and real-time
        broadcast — plus the client pays again rehydrating it, which invites
        render thrash under load.
      </p>

      <h2>The Serialization Adapter pattern</h2>
      <p>
        The fix is an explicit boundary between two models that the naive design
        conflates: the <strong>render model</strong> (what React Flow needs) and
        the <strong>transport model</strong> (what your database and wire
        actually require). An adapter translates between them in both
        directions, and nothing crosses the boundary without passing through it.
        In the pattern I call <strong>Trinity Architecture</strong>, this is the
        third layer: Presentation (pure React/React Flow views), Reactive
        State/Orchestration (Zustand, events, optimistic intent), and the Data /
        Serialization Adapter (shape the lean records for the wire and storage).
        Boundary rule: the UI never formats DB schemas; the adapter never pokes
        UI state directly — it only hands records to the orchestrator.
      </p>

      <Terminal title="serialize.ts">
        <span className="tok-com">
          {`// render model (React Flow) → lean transport record`}
        </span>
        {"\n"}
        <span className="tok-key">export</span>{" "}
        <span className="tok-key">function</span>{" "}
        <span className="tok-fn">toRecord</span>
        <span className="tok-punc">(</span>node
        <span className="tok-punc">:</span> FlowNode
        <span className="tok-punc">)</span>
        <span className="tok-punc">:</span> NodeRecord{" "}
        <span className="tok-punc">{`{`}</span>
        {"\n  "}
        <span className="tok-key">return</span>{" "}
        <span className="tok-punc">{`{`}</span>
        {"\n    "}
        id<span className="tok-punc">:</span> node.id
        <span className="tok-punc">,</span>
        {"\n    "}
        type<span className="tok-punc">:</span> node.type
        <span className="tok-punc">,</span>
        {"\n    "}
        x<span className="tok-punc">:</span>{" "}
        <span className="tok-fn">round</span>
        <span className="tok-punc">(</span>node.position.x
        <span className="tok-punc">),</span> y
        <span className="tok-punc">:</span>{" "}
        <span className="tok-fn">round</span>
        <span className="tok-punc">(</span>node.position.y
        <span className="tok-punc">),</span>
        {"\n    "}
        config<span className="tok-punc">:</span> node.data.config
        <span className="tok-punc">,</span>{" "}
        <span className="tok-com">{`// the only domain data that matters`}</span>
        {"\n  "}
        <span className="tok-punc">{`}`}</span>
        <span className="tok-punc">;</span>{" "}
        <span className="tok-com">{`// no measured, no flags, no handles`}</span>
        {"\n"}
        <span className="tok-punc">{`}`}</span>
      </Terminal>

      <h3>Render model vs transport model</h3>
      <p>
        The inverse, <code>fromRecord</code>, rehydrates a transport record back
        into a full render node — recomputing the view state the renderer needs
        from defaults and layout rules rather than from storage. The principle:
        anything that can be <em>derived</em> should never be{" "}
        <em>stored</em>. Measured dimensions are derived. Selection is ephemeral.
        Handle geometry is a function of the node type. Persisting them is
        persisting a cache. On IntegrateX this also made upgrades safe: renderer
        changes didn&apos;t demand data migrations because we never saved UI-only
        state.
      </p>

      <h2>Zustand as the render store</h2>
      <p>
        Keep one store — Zustand is ideal here — as the single owner of the
        render model. The canvas reads and writes the rich nodes there with zero
        ceremony. Optimistic updates and cross-node orchestration live here too.
        Serialization happens only at the boundary: on save, map the store
        through <code>toRecord</code>; on load, map records through{" "}
        <code>fromRecord</code> back into the store. In my Trinity split, the UI
        renders from state and dispatches intent; the orchestrator holds the
        runtime truth; the adapter shapes bytes for the wire. The adapter is the
        only code that knows both shapes, so the rest of the application never
        has to.
      </p>

      <h2>The 94%, decomposed</h2>
      <p>
        The reduction isn&apos;t a trick; it&apos;s subtraction of baggage. Drop the
        measured geometry, the per-node interaction flags, the duplicated handle
        definitions, and the framework metadata; round coordinates to integers.
        A node that used to serialize to roughly a kilobyte collapses to a few
        dozen bytes. Across a graph of a hundred nodes, that flips the profile
        of save, load, and real-time sync from spiky to cheap — fewer bytes on
        the socket, less state to reconcile, less render churn on rehydrate.
      </p>

      <blockquote>
        Most payload-size issues aren&apos;t compression problems. They&apos;re boundary
        problems — you&apos;re shipping the cache because nobody drew the line between
        the view and the record.
      </blockquote>

      <p>
        The full pattern, including edge serialization and migration handling,
        is in the{" "}
        <a href="/#projects">IntegrateX breakdown</a>.
      </p>
    </>
  );
}

export const payloadReductionReactFlow: BlogPost = {
  slug: "94-percent-payload-reduction-react-flow",
  title: "Compressing the Wire: A 94% Payload Reduction in React Flow",
  description:
    "Node-graph editors serialize enormous JSON. A custom Serialization Adapter pattern that separates the React Flow render model from the transport record cut IntegrateX payloads by 94%.",
  keywords: [
    "React Flow",
    "Zustand",
    "serialization",
    "payload optimization",
    "state management",
    "MERN performance",
    "workflow automation",
  ],
  publishedAt: "2026-06-04",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["React Flow", "Zustand", "Performance"],
  takeaways: [
    "React Flow nodes carry view state, measured dimensions, and handles that never belong in your persistence layer.",
    "A Serialization Adapter cleanly separates the render model (UI) from the transport/persistence model (DB).",
    "Anything that can be derived (dimensions, selection, handle geometry) should be recomputed on load, never stored.",
    "On IntegrateX this stripped workflow payloads by 94%, transforming save, load, and real-time sync latency.",
  ],
  Body,
};
