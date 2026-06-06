import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Redux earned its boilerplate reputation honestly — and then Redux Toolkit
        made most of that reputation obsolete. For genuinely large enterprise
        state, shared across many features and a sizeable team, RTK&apos;s
        structure is an asset, not a tax. The skill is organizing slices so the
        store scales with the product instead of becoming the thing everyone is
        afraid to touch.
      </p>

      <h2>Feature slices, not a god store</h2>
      <p>
        The failure mode of large Redux is one sprawling store everyone edits.
        The fix is feature-oriented slices: each domain owns its slice, its
        reducers, and its selectors, colocated in a feature folder. The store
        becomes a composition of independent slices rather than a single
        contested file — which is what makes it survivable at scale.
      </p>

      <Terminal title="casesSlice.ts">
        <span className="tok-com">{"// a self-contained feature slice"}</span>
        {`
const casesSlice = createSlice({
  name: "cases",
  initialState: adapter.getInitialState(),
  reducers: {
    upserted: adapter.upsertOne,
    removed: adapter.removeOne,
  },
});

export const { upserted, removed } = casesSlice.actions;`}
      </Terminal>

      <h2>Normalize, and let RTK Query own the server</h2>
      <p>
        Two patterns keep large stores sane. Normalize collections with{" "}
        <code>createEntityAdapter</code> so entities live in a flat, indexed map
        instead of nested arrays you constantly re-walk. And move server state out
        of hand-written thunks into RTK Query, which gives you caching,
        invalidation, and loading states for free — leaving your slices to hold
        only the client state that genuinely belongs there.
      </p>

      <h2>When not to reach for it</h2>
      <p>
        RTK is the right tool when state is global, audited, and team-shared. It
        is the wrong tool for fast, local, high-frequency state — a live canvas, a
        streaming AI response — where its deliberate action-reducer flow becomes
        friction. Most serious apps run both: RTK for the durable global core, a
        lightweight store for the ephemeral surface.
      </p>

      <blockquote>
        Redux Toolkit did not win by being clever. It won by making the boring,
        scalable thing the path of least resistance.
      </blockquote>

      <p>
        For the lighter-weight side of the decision, see{" "}
        <a href="/blog/state-management-ai-era-zustand-vs-redux">
          Zustand vs. Redux
        </a>
        .
      </p>
    </>
  );
}

export const reduxToolkitArchitectures: BlogPost = {
  slug: "redux-toolkit-architectures",
  title: "Redux Toolkit Architectures for Massive Enterprise State",
  description:
    "RTK made Redux's boilerplate reputation obsolete. Structuring feature slices, normalizing with entity adapters, offloading server state to RTK Query — and when not to reach for it.",
  keywords: [
    "Redux Toolkit",
    "RTK Query",
    "state management",
    "createEntityAdapter",
    "enterprise architecture",
    "React",
    "slices",
  ],
  publishedAt: "2026-06-09",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Redux", "Architecture", "Frontend"],
  takeaways: [
    "Organize large stores as feature-oriented slices in feature folders, not one contested god store.",
    "Normalize collections with createEntityAdapter and let RTK Query own server state (caching, invalidation, loading).",
    "RTK fits global, audited, team-shared state; reach for a lighter store for fast, local, streaming surfaces.",
    "Most serious apps run both — RTK for the durable core, a lightweight store for the ephemeral surface.",
  ],
  Body,
};
