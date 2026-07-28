import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        The most cargo-culted hook I run into is <code>useMemo</code> — wrapped
        around everything, understood by few. On a data-heavy admin dashboard,
        using it precisely made the interactions noticeably snappier; reached
        for reflexively elsewhere, it quietly makes apps slower while looking like
        optimization. The difference is knowing exactly what it costs and what it
        buys.
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
        the flame graph got shorter. The win on that dashboard came from
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
        . I lean on this measure-first instinct across the five products I shipped
        solo this year — the judgment I bring is refusing to call anything an
        optimization until the flame graph agrees.
      </p>
    </>
  );
}

export const reactUseMemoBenchmarks: BlogPost = {
  slug: "react-usememo-benchmarks",
  title: "React useMemo: Measured Wins, Not Cargo-Cult Habit",
  description:
    "In React reviews, useMemo is the hook I see cargo-culted most: what it truly costs, the two cases that justify it, and why I open the Profiler before memoizing.",
  keywords: [
    "useMemo",
    "React performance",
    "memoization",
    "profiler",
    "rendering",
    "React performance engineer",
    "React developer for hire",
    "Yaseen Khatib",
  ],
  publishedAt: "2026-06-07",
  updatedAt: "2026-07-28",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["React", "Performance", "Frontend"],
  takeaways: [
    "useMemo caches a value between renders at the cost of a dependency comparison and a memory slot — it is not free.",
    "It only wins on genuinely expensive computations or for preserving referential identity.",
    "On cheap computations the overhead exceeds the work, making the app slower while looking optimized.",
    "Measure with the Profiler first; the dashboard win came from memoizing a few heavy selectors, not the whole tree.",
  ],
  Body,
};
