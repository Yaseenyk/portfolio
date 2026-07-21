"use client";

import { motion } from "framer-motion";
import { PROJECTS, projectAnchor } from "@/components/Projects";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Span pattern over a 4-col grid (2 on mobile). grid-flow-dense packs it with
// no holes. Two featured 2x2 tiles carry a description line.
const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
];

const TINTS = [
  "from-cyan/[0.10]",
  "from-purple/[0.10]",
  "from-ice/[0.08]",
  "from-cyan/[0.07]",
  "from-purple/[0.09]",
];

export default function ProjectsBento() {
  return (
    <div className="grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-4 auto-rows-[9.5rem] sm:auto-rows-[11rem]">
      {PROJECTS.map((project, i) => {
        const span = SPANS[i % SPANS.length];
        const featured = span.includes("row-span-2");
        const href = project.href ?? `#${projectAnchor(project.name)}`;
        const external = href.startsWith("http");

        return (
          <motion.a
            key={project.name}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={`${project.name} — ${project.category}`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -4 }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-br ${TINTS[i % TINTS.length]} to-zinc-950/70 p-5 transition-colors hover:border-cyan/50 ${span}`}
          >
            {/* grid texture + top accent hairline */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:22px_22px]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan/50 via-purple/30 to-transparent"
            />
            {/* big faded index — fills the tile so it never reads empty */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-3 -top-5 font-mono text-[5.5rem] font-bold leading-none text-white/[0.04] transition-colors group-hover:text-cyan/[0.06]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* top: category */}
            <span className="relative font-mono text-[9px] uppercase tracking-[0.18em] text-cyan/80">
              {project.category}
            </span>

            {/* bottom: name, desc (featured), metric + tech chips */}
            <div className="relative mt-auto pt-4">
              <span className="flex items-baseline justify-between gap-2">
                <span
                  className={`font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-cyan ${
                    featured ? "text-xl" : "text-sm"
                  }`}
                >
                  {project.name}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-xs text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-cyan"
                >
                  →
                </span>
              </span>

              {featured && (
                <span className="mt-2 hidden text-xs leading-relaxed text-zinc-400 sm:line-clamp-2">
                  {project.description}
                </span>
              )}

              <span className="mt-3 flex flex-wrap gap-1.5">
                {(featured ? project.metrics.slice(0, 3) : project.tech.slice(0, 2)).map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-700/70 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] text-zinc-400"
                    >
                      {t}
                    </span>
                  ),
                )}
              </span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
