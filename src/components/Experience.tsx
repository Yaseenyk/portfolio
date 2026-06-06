"use client";

import { motion, type Variants } from "framer-motion";

interface Role {
  period: string;
  role: string;
  company: string;
  note?: string;
  bullets?: string[];
  tags: string[];
}

const ROLES: Role[] = [
  {
    period: "Jun 2025 — Present",
    role: "Senior Software Developer",
    company: "Sparity",
    note: "Architecting autonomous Agentic workflows and integrating LLMs into production MERN systems — owning intelligent systems from design and orchestration through deployment.",
    tags: ["Agentic AI", "LLM Integration", "MERN", "System Architecture"],
  },
  {
    period: "Jan 2023 — May 2025",
    role: "Full Stack Web Developer",
    company: "MSA Software",
    bullets: [
      "Architected and scaled high-throughput Node.js APIs and React frontends, reducing legacy system latency by optimizing MongoDB aggregation pipelines.",
      "Transitioned cross-functional teams to modern Next.js and TypeScript standards, eliminating type-related production bugs.",
    ],
    tags: ["React", "TypeScript", "Node", "MongoDB"],
  },
  {
    period: "Sep 2021 — Jan 2023",
    role: "Software Developer (SDE 1)",
    company: "Manorama Infosolutions Pvt Ltd",
    bullets: [
      "Engineered robust backend API services and frontend interfaces, establishing core data flow patterns that accelerated feature delivery.",
      "Optimized system architecture for concurrent user sessions, improving overall platform stability.",
    ],
    tags: ["ReactJS", "ASP.NET", "REST APIs"],
  },
];

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const node: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Experience() {
  return (
    <section id="experience" aria-label="Professional experience" className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/experience
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>

      <div className="relative mt-10">
        {/* Animated vertical tree line */}
        <motion.span
          aria-hidden="true"
          className="absolute left-[7px] bottom-1 top-1 w-px origin-top bg-gradient-to-b from-cyan via-purple to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-16"
        >
          {ROLES.map((role) => (
            <motion.div key={role.company} variants={node} className="relative pl-12">
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-ice bg-ink shadow-[0_0_12px_0_rgba(103,232,249,0.7)]" />

              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
                {role.period}
              </p>
              <h3 className="mt-2.5 text-lg font-semibold text-zinc-50">
                {role.role}
                <span className="text-zinc-500"> · {role.company}</span>
              </h3>
              {role.note && (
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {role.note}
                </p>
              )}
              {role.bullets && (
                <ul className="mt-3 max-w-2xl space-y-2.5">
                  {role.bullets.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-400"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-800 bg-white/[0.02] px-2.5 py-1 text-[11px] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
