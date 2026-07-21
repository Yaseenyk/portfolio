"use client";

import { motion } from "framer-motion";
import { PROJECTS, projectAnchor } from "@/components/Projects";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Span pattern over a 4-column grid (2 cols on mobile). Cycles cleanly for
// 13 tiles with no holes thanks to grid-flow-dense.
const SPANS = [
  "col-span-2 row-span-2", // 0 featured
  "col-span-2",
  "",
  "",
  "col-span-2",
  "",
  "",
  "col-span-2 row-span-2", // 7 featured
  "",
  "",
  "col-span-2",
  "",
  "",
];

/** Bento showcase: every project as a visual tile — its own live animation
 *  as the artwork, hover zoom, staggered reveal. Tiles with a destination
 *  click through; the rest scroll to their detail card below. */
export default function ProjectsBento() {
  return (
    <div className="grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-4 auto-rows-[9.5rem] md:auto-rows-[10.5rem]">
      {PROJECTS.map((project, i) => {
        const span = SPANS[i % SPANS.length];
        const featured = span.includes("row-span-2");
        const href = project.href ?? `#${projectAnchor(project.name)}`;
        const external = href.startsWith("http");
        const { Animation } = project;

        return (
          <motion.a
            key={project.name}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={`${project.name} — ${project.category}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -4 }}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800/60 bg-ink/60 transition-colors hover:border-cyan/50 ${span}`}
          >
            {/* Artwork: the project's own live animation, zooming on hover */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-70 transition-transform duration-500 ease-out group-hover:scale-[1.07] [&>*]:h-full [&>*]:w-full"
            >
              <Animation />
            </div>

            {/* Legibility gradient */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
            />

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-cyan/80">
                {project.category}
              </span>
              <span className="mt-0.5 flex items-baseline justify-between gap-2">
                <span
                  className={`font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-cyan ${
                    featured ? "text-xl" : "text-sm"
                  }`}
                >
                  {project.name}
                </span>
                <span
                  aria-hidden
                  className="translate-x-0 font-mono text-xs text-zinc-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan group-hover:opacity-100"
                >
                  →
                </span>
              </span>
              {featured && (
                <span className="mt-1 hidden text-xs leading-snug text-zinc-400 sm:line-clamp-2">
                  {project.description}
                </span>
              )}
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
