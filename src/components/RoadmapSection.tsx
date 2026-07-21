import Link from "next/link";

const TRACKS = [
  {
    href: "/roadmap",
    label: "AI Systems Architect",
    detail: "15 lessons · RAG → agents → FinOps",
  },
  {
    href: "/claude-code",
    label: "Claude Code Efficiency",
    detail: "the 90% token-efficiency workflow",
  },
  {
    href: "/anthropic-roadmap",
    label: "Anthropic & Claude Development",
    detail: "15 lessons · tools → MCP → multi-agent",
  },
];

/** Compact banner replacing the old 10-row lesson list — the tracks sell
 *  themselves on their own hub pages. Server component, zero bundle cost. */
export default function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-24 py-16">
      <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6 backdrop-blur-md sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            ~/learning-tracks
          </h2>
          <span className="font-mono text-[11px] text-zinc-500">
            40+ lessons, free
          </span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TRACKS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group rounded-xl border border-zinc-800/60 bg-white/[0.02] p-4 transition-colors hover:border-cyan/50"
            >
              <span className="block text-sm font-semibold text-zinc-100 transition-colors group-hover:text-cyan">
                {t.label} →
              </span>
              <span className="mt-1 block font-mono text-[11px] text-zinc-500">
                {t.detail}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
