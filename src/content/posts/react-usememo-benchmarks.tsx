import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        <code>useMemo</code> is the most cargo-culted hook in React — wrapped
        around everything, understood by few. Used precisely, it delivered a 1.5–2x
        dashboard response improvement on a data-heavy admin panel. Used
        reflexively, it makes apps slower while looking like optimization. The
        difference is knowing exactly what it costs and what it buys.
      </p>

      <h2>What it actually does</h2>
      <p>
        <code>useMemo</code> caches a computed value between renders, recomputing
        only when its dependencies change. That is the entire mechanic. It is not
        free: it adds a dependency comparison and a memory slot on every render.
        For a cheap computation, that overhead exceeds the work you are caching —
        you have paid to avoid a cost smaller than the payment.
      </p>

      <h2>Where it earns its keep</h2>
      <p>
        Two cases justify it. First, a genuinely expensive computation — sorting,
        filtering, or aggregating a large dataset on every render. Second,
        preserving referential identity so a memoized child or an effect
        dependency does not re-run when the value is logically unchanged. Outside
        those, you are adding indirection for no measurable gain.
      </p>

      <Terminal title="dashboard.tsx">
        <span className="tok-com">{"// memo earns its keep on the expensive aggregation"}</span>
        {`
const rollup = useMemo(
  () => aggregate(rows),         // O(n) over thousands of rows
  [rows]
);

// NOT this — the work is cheaper than the comparison
// const label = useMemo(() => \`\${first} \${last}\`, [first, last]);`}
      </Terminal>

      <h2>Measure, then memoize</h2>
      <p>
        The only honest way to apply it is with the Profiler open. Find the
        components that actually re-render expensively, memoize those, and verify
        the flame graph got shorter. The 2x win on that dashboard came from
        memoizing a handful of heavy selectors — not from blanketing the tree.
        Optimization you did not measure is just superstition with a hook.
      </p>

      <blockquote>
        <code>useMemo</code> is a trade: memory and a comparison in exchange for
        skipped work. If the skipped work is cheaper than the comparison, you made
        the app slower and called it fast.
      </blockquote>

      <p>
        For the broader state-management picture, see{" "}
        <a href="/blog/state-management-ai-era-zustand-vs-redux">
          State Management in the AI Era
        </a>
        .
      </p>
    </>
  );
}

export const reactUseMemoBenchmarks: BlogPost = {
  slug: "react-usememo-benchmarks",
  title: "React useMemo Benchmarks: When Memoization Actually Wins",
  description:
    "useMemo is the most cargo-culted hook in React. What it costs, the two cases that justify it, and how measured memoization delivered a 1.5–2x dashboard response improvement.",
  keywords: [
    "useMemo",
    "React performance",
    "memoization",
    "rendering",
    "profiler",
    "optimization",
    "frontend",
  ],
  publishedAt: "2026-06-07",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["React", "Performance", "Frontend"],
  takeaways: [
    "useMemo caches a value between renders at the cost of a dependency comparison and a memory slot — it is not free.",
    "It only wins on genuinely expensive computations or for preserving referential identity.",
    "On cheap computations the overhead exceeds the work, making the app slower while looking optimized.",
    "Measure with the Profiler first; the 2x dashboard win came from memoizing a few heavy selectors, not the whole tree.",
  ],
  Body,
};
