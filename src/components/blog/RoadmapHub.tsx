"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { RoadmapLesson, SeriesMeta } from "@/lib/series";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface HubCta {
  heading: string;
  body: string;
}

interface RoadmapHubProps {
  meta: SeriesMeta;
  lessons: RoadmapLesson[];
  /** Small uppercase label above the title. */
  eyebrow?: string;
  cta?: HubCta;
}

const DEFAULT_CTA: HubCta = {
  heading: "Building a production AI system?",
  body: "This roadmap is the architecture I ship by. Let's apply it to yours.",
};

// Parent-orchestrated reveal so every lesson animates in reliably, regardless
// of its own position in a tall mobile column.
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const MODULE_COLOR: Record<string, string> = {
  Foundations: "text-ice border-ice/30",
  Systems: "text-cyan border-cyan/30",
  Production: "text-purple-400 border-purple/30",
  Career: "text-zinc-300 border-zinc-700",
  Precision: "text-cyan border-cyan/30",
  Workflow: "text-purple-400 border-purple/30",
  Scale: "text-ice border-ice/30",
  "Developer Core": "text-cyan border-cyan/30",
  "Enterprise Production": "text-purple-400 border-purple/30",
};
const MODULE_COLOR_FALLBACK = "text-zinc-300 border-zinc-700";

function StatusPill({ status }: { status: RoadmapLesson["status"] }) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
        Published
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
      Coming Soon
    </span>
  );
}

function LessonRow({ lesson, last }: { lesson: RoadmapLesson; last: boolean }) {
  const live = lesson.status === "published";

  const card = (
    <div
      className={[
        "flex-1 rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 sm:p-6",
        live
          ? "border-zinc-800 bg-zinc-900/40 group-hover:border-cyan/40 group-hover:bg-zinc-900/60"
          : "border-zinc-800/60 bg-zinc-900/20 opacity-70",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${MODULE_COLOR[lesson.module] ?? MODULE_COLOR_FALLBACK}`}
        >
          {lesson.module}
        </span>
        <StatusPill status={lesson.status} />
      </div>

      <h3
        className={`mt-3 text-lg font-semibold tracking-tight sm:text-xl ${
          live ? "text-zinc-50 group-hover:text-cyan" : "text-zinc-400"
        } transition-colors`}
      >
        {lesson.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
        {lesson.blurb}
      </p>

      {live && (
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Read lesson →
        </span>
      )}
    </div>
  );

  return (
    <motion.li variants={rowVariants} className="group relative flex gap-3.5 sm:gap-5">
      {/* Rail: step node + connecting line */}
      <div className="relative flex flex-col items-center">
        <span
          className={[
            "z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-colors",
            live
              ? "border-cyan/50 bg-ink text-cyan shadow-[0_0_18px_-4px_rgba(34,211,238,0.6)] group-hover:border-cyan"
              : "border-zinc-700 bg-ink text-zinc-500",
          ].join(" ")}
        >
          {String(lesson.step).padStart(2, "0")}
        </span>
        {!last && (
          <span className="absolute top-11 h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-cyan/40 to-zinc-800" />
        )}
      </div>

      {live ? (
        <Link href={`/blog/${lesson.slug}`} className="flex flex-1">
          {card}
        </Link>
      ) : (
        <div className="flex flex-1 cursor-default">{card}</div>
      )}
    </motion.li>
  );
}

export default function RoadmapHub({
  meta,
  lessons,
  eyebrow = "Masterclass Roadmap",
  cta = DEFAULT_CTA,
}: RoadmapHubProps) {
  const total = lessons.length;
  const published = lessons.filter((l) => l.status === "published").length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          [ {eyebrow} ]
        </p>
        <h1 className="text-gradient animate-gradient mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {meta.tagline}
        </p>

        {/* Stats + progress bar */}
        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-zinc-500">
          <span className="text-zinc-300">{total} lessons</span>
          <span className="text-zinc-700">•</span>
          <span>{published} published</span>
          <span className="text-zinc-700">•</span>
          <span>~{meta.totalMinutes} min total</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple via-cyan to-ice shadow-[0_0_10px_0_rgba(34,211,238,0.6)]"
            style={{ width: `${(published / total) * 100}%` }}
          />
        </div>
      </header>

      {/* Playlist */}
      <motion.ol
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="mt-12 flex flex-col gap-6"
      >
        {lessons.map((lesson, i) => (
          <LessonRow
            key={lesson.step}
            lesson={lesson}
            last={i === lessons.length - 1}
          />
        ))}
      </motion.ol>

      {/* Footer CTA */}
      <div className="mt-16 overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 p-8 text-center backdrop-blur-md sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          {cta.heading}
        </h2>
        <p className="mt-3 text-zinc-400">{cta.body}</p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]"
        >
          Start a conversation →
        </Link>
      </div>
    </div>
  );
}
