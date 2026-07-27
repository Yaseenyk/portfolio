"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatInr, lowestPrice, type CampusProject } from "@/lib/campus";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export default function ProjectCard({
  project,
  index,
}: {
  project: CampusProject;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06, ease: EASE }}
    >
      <Link
        href={`/final-year-projects/${project.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-cyan/40"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
          {project.category}
        </span>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
              From
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-50">
              {formatInr(lowestPrice(project))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">{project.degrees.join(" · ")}</p>
            <p className="mt-1 text-xs text-ice transition-transform duration-300 group-hover:translate-x-0.5">
              View project →
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
