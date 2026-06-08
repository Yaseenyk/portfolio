"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ROADMAP,
  ROADMAP_META,
  TOTAL_LESSONS,
  publishedCount,
  type RoadmapLesson,
} from "@/lib/roadmap";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const MODULE_COLOR: Record<RoadmapLesson["module"], string> = {
  Foundations: "text-ice",
  Systems: "text-cyan",
  Production: "text-purple-400",
  Career: "text-zinc-400",
};

function LessonRow({ lesson, i }: { lesson: RoadmapLesson; i: number }) {
  const live = lesson.status === "published";

  const inner = (
    <div
      className={[
        "flex h-full items-center gap-4 rounded-xl border p-4 backdrop-blur-md transition-all duration-300",
        live
          ? "border-zinc-800/60 bg-zinc-950/60 hover:border-cyan/40 hover:bg-zinc-900/60"
          : "border-zinc-800/40 bg-zinc-950/30 opacity-70",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-semibold transition-colors",
          live
            ? "border-cyan/40 bg-ink text-cyan group-hover:border-cyan"
            : "border-zinc-700 bg-ink text-zinc-500",
        ].join(" ")}
      >
        {String(lesson.step).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            live ? "text-zinc-100" : "text-zinc-400"
          }`}
        >
          {lesson.title}
        </p>
        <p
          className={`mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${MODULE_COLOR[lesson.module]}`}
        >
          {lesson.module}
          {!live && <span className="text-zinc-600"> · soon</span>}
        </p>
      </div>
    </div>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: EASE, delay: (i % 2) * 0.06 }}
      className="group"
    >
      {live ? (
        <Link href={`/blog/${lesson.slug}`} className="block h-full">
          {inner}
        </Link>
      ) : (
        <div className="h-full cursor-default">{inner}</div>
      )}
    </motion.li>
  );
}

export default function RoadmapSection() {
  const published = publishedCount();

  return (
    <section id="roadmap" className="scroll-mt-24 py-24">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/masterclass
        </h2>
        <Link
          href="/roadmap"
          className="font-mono text-xs text-zinc-500 transition-colors duration-200 hover:text-cyan"
        >
          View roadmap →
        </Link>
      </div>

      <div className="mt-8 max-w-2xl">
        <h3 className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          {ROADMAP_META.title}
        </h3>
        <p className="mt-3 leading-relaxed text-zinc-400">
          {ROADMAP_META.tagline}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple via-cyan to-ice shadow-[0_0_10px_0_rgba(34,211,238,0.6)]"
            style={{ width: `${(published / TOTAL_LESSONS) * 100}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-xs text-zinc-500">
          {published}/{TOTAL_LESSONS} published
        </span>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {ROADMAP.map((lesson, i) => (
          <LessonRow key={lesson.step} lesson={lesson} i={i} />
        ))}
      </ol>

      <Link
        href="/roadmap"
        className="mt-10 inline-flex items-center gap-2 rounded-lg border border-cyan/40 bg-cyan/5 px-5 py-2.5 text-sm font-semibold text-cyan transition-colors duration-300 hover:bg-cyan/10"
      >
        Explore the full roadmap →
      </Link>
    </section>
  );
}
