import Link from "next/link";
import { ROADMAP } from "@/lib/roadmap";

interface RoadmapStepperProps {
  /** 1-based step of the lesson currently being viewed. */
  current: number;
}

/**
 * A compact horizontal stepper showing the lesson's position in the 10-part
 * series. Completed steps read filled, the current step glows, upcoming steps
 * stay dim. Each segment links to its lesson (published ones only).
 */
export default function RoadmapStepper({ current }: RoadmapStepperProps) {
  return (
    <nav
      aria-label={`Roadmap progress: lesson ${current} of ${ROADMAP.length}`}
      className="flex items-center gap-1.5"
    >
      {ROADMAP.map((l) => {
        const isCurrent = l.step === current;
        const isDone = l.step < current;
        const live = l.status === "published";

        const bar = (
          <span
            className={[
              "block h-1.5 rounded-full transition-colors",
              isCurrent
                ? "w-7 bg-cyan shadow-[0_0_8px_0_rgba(34,211,238,0.7)]"
                : isDone
                  ? "w-4 bg-cyan/60"
                  : "w-4 bg-zinc-700",
            ].join(" ")}
          />
        );

        const title = `${l.step}. ${l.title}${live ? "" : " (coming soon)"}`;

        return live ? (
          <Link key={l.step} href={`/blog/${l.slug}`} title={title} aria-label={title}>
            {bar}
          </Link>
        ) : (
          <span key={l.step} title={title} aria-label={title}>
            {bar}
          </span>
        );
      })}
    </nav>
  );
}
