"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "./Icons";

interface SectionCard {
  href: string;
  eyebrow: string;
  title: string;
  blurb: string;
}

const SECTIONS: SectionCard[] = [
  {
    href: "/work",
    eyebrow: "01",
    title: "Work",
    blurb: "Shipped AI products and selected engineering projects — each with a deep-dive.",
  },
  {
    href: "/blog",
    eyebrow: "02",
    title: "Blog",
    blurb: "Deep-dives on agentic RAG, LLM orchestration, and production AI architecture.",
  },
  {
    href: "/sandbox",
    eyebrow: "03",
    title: "Sandbox",
    blurb: "Interactive experiments and live demos you can poke at in the browser.",
  },
  {
    href: "/experience",
    eyebrow: "04",
    title: "Experience",
    blurb: "Roles, impact, and the systems shipped from full-stack to AI engineer.",
  },
  {
    href: "/roadmap",
    eyebrow: "05",
    title: "Roadmap",
    blurb: "The learning path from prompts to production agentic AI systems.",
  },
  {
    href: "/uses",
    eyebrow: "06",
    title: "Stack",
    blurb: "Tools, setup, and the AI-native workflow behind everything here.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/** The homepage hub — routes visitors to each area instead of stacking it all inline. */
export default function SectionCards() {
  return (
    <section aria-label="Explore" className="py-16">
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/explore
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SECTIONS.map((s) => (
          <motion.div key={s.href} variants={item}>
            <Link
              href={s.href}
              className="group flex h-full flex-col rounded-2xl border border-zinc-800/60 bg-ink/40 p-6 backdrop-blur-md transition-colors duration-300 hover:border-ice/30"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {s.eyebrow}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50 transition-colors duration-200 group-hover:text-cyan">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {s.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-colors duration-200 group-hover:text-ice">
                Explore
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
