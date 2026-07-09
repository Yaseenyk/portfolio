import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        IntegrateX is a node-based workflow automation canvas — drag nodes,
        wire them, run the flow. Early in the build I hit the decision that
        would quietly determine whether the product could ever feel
        professional: what do you actually <em>save</em> when a user saves a
        workflow? The obvious answer nearly sank it. The deliberate answer cut
        payloads by 94% and made the canvas feel instant. This is the story of
        that call — and why the interesting number isn&apos;t 94, it&apos;s
        the reasoning that found it.
      </p>

      <h2>Why are your saved payloads 10x bigger than they should be?</h2>
      <p>
        A React Flow canvas holds rich UI objects — every node carries
        positions, dimensions, selection state, handles, style, z-index,
        renderer bookkeeping. The path of least resistance is{" "}
        <code>JSON.stringify(nodes)</code> and ship it to Mongo. It works in
        the demo. Then workflows grow to hundreds of nodes and you discover
        you&apos;ve been paying to store and transmit the <em>view</em>: 90%+
        of those bytes are renderer state that can be reconstructed for free.
        Saves crawl, time-to-first-byte balloons, storage bills climb — for
        data that never needed to exist outside the browser.
      </p>

      <h2>The decision: a serialization boundary</h2>
      <p>
        The fix was architectural, not clever code: draw a hard line between
        the UI model and the domain model, and build a lossless, schema-aware{" "}
        <strong>Serialization Adapter</strong> that translates across it. On
        the way out, each node type maps to a compact struct — its type, its
        logical config, its connections, deltas for what the defaults
        can&apos;t derive. On the way in, the adapter rehydrates full React
        Flow objects from those structs plus the type&apos;s schema.
        Round-trip lossless, 94% smaller, and the canvas state machine
        (Zustand) never has to know persistence exists.
      </p>

      <blockquote>
        The database should store what is <em>true</em>, not what is{" "}
        <em>drawn</em>. Most bloated payloads are a category error: view state
        that talked its way into the domain.
      </blockquote>

      <h2>What 94% actually purchased</h2>
      <ul>
        <li>
          <strong>Instant-feeling saves and loads</strong> — the difference
          between a tool people trust with big workflows and one they
          don&apos;t.
        </li>
        <li>
          <strong>A stable domain schema</strong> — analytics, versioning, and
          server-side execution all became possible because the persisted
          format describes the workflow, not the pixels.
        </li>
        <li>
          <strong>Free evolution</strong> — the UI can redesign nodes at will;
          the adapter absorbs the change and old saves keep loading.
        </li>
      </ul>

      <h2>The transferable pattern</h2>
      <p>
        Every rich-client product hides this decision somewhere: a document
        editor, a BI dashboard builder, a design tool, a CRM with custom
        views. If your persistence layer mirrors your render layer, you are
        one growth quarter away from the same wall. The audit takes an
        afternoon — sample a persisted payload and highlight every field the
        client could reconstruct — and the ratio you find is usually shocking.
        The deep technical teardown, including the delta-encoding scheme,
        lives in{" "}
        <a href="/blog/94-percent-payload-reduction-react-flow">
          the companion engineering post
        </a>
        .
      </p>
    </>
  );
}

export const ninetyFourPercentDecision: BlogPost = {
  slug: "the-94-percent-decision-integratex",
  title:
    "The 94% Decision: One Architecture Call That Made IntegrateX Feel Instant",
  description:
    "Persisting React Flow's UI objects nearly sank the product. Drawing a serialization boundary between view and domain cut payloads 94% — the reasoning behind the call, and how to audit your own product for it.",
  keywords: [
    "payload optimization",
    "serialization adapter pattern",
    "React Flow persistence",
    "view model vs domain model",
    "frontend architecture decisions",
    "workflow automation engine",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Architecture", "Products"],
  takeaways: [
    "The near-fatal trap: JSON.stringify-ing React Flow nodes persists the view — 90%+ renderer state the client can reconstruct for free.",
    "A lossless, schema-aware Serialization Adapter maps UI objects to compact domain structs, cutting payloads 94% round-trip.",
    "The win compounds: instant saves, a stable domain schema for versioning and execution, and UI redesigns that never break old data.",
    "Audit your own product: sample a persisted payload and highlight what the client could derive — the ratio is usually shocking.",
  ],
  Body,
};
