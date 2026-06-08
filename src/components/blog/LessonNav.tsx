import Link from "next/link";
import type { RoadmapLesson } from "@/lib/roadmap";

interface LessonNavProps {
  prev: RoadmapLesson | null;
  next: RoadmapLesson | null;
}

/**
 * Bottom-of-lesson navigation for the roadmap series: a quiet "Previous" link
 * and a prominent "Next Lesson" card. Rendered above the generic hire-me CTA on
 * any post that belongs to the roadmap.
 */
export default function LessonNav({ prev, next }: LessonNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-16 grid gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-md transition-colors hover:border-zinc-700"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            ← Lesson {prev.step}
          </span>
          <span className="mt-1.5 font-medium text-zinc-300 transition-colors group-hover:text-zinc-50">
            {prev.title}
          </span>
        </Link>
      ) : (
        <Link
          href="/roadmap"
          className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-md transition-colors hover:border-zinc-700"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            ← Roadmap
          </span>
          <span className="mt-1.5 font-medium text-zinc-300 transition-colors group-hover:text-zinc-50">
            Back to the series overview
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col rounded-2xl border border-cyan/40 bg-gradient-to-br from-cyan/10 to-purple/10 p-5 text-right backdrop-blur-md transition-shadow hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)] sm:col-start-2"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Next Lesson {next.step} →
          </span>
          <span className="mt-1.5 font-semibold text-zinc-50">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
