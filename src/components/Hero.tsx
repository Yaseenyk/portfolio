"use client";

import { motion, type Variants } from "framer-motion";
import GradientText from "./GradientText";
import PulseDot from "./PulseDot";
import NeuralCore from "./NeuralCore";
import { ArrowRightIcon, DownloadIcon } from "./Icons";
import { RESUME_URL } from "@/lib/site";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// The h1 is the page's LCP element: it must paint visible in the initial
// HTML (no opacity fade), otherwise Chrome never records an LCP candidate.
const headline: Variants = {
  hidden: { y: 24 },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-8 py-12 sm:gap-12 sm:py-16 md:min-h-[80vh] md:grid-cols-2 md:gap-10 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      {/* Left: copy */}
      {/* initial={false}: the h1 is the LCP element and must be in the server
          HTML visible, not faded in after hydration. */}
      <motion.div variants={container} initial={false} animate="show">
        <motion.div variants={item} className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-full border border-zinc-800 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-300">
            Senior Full-Stack AI Engineer · MERN
          </span>
        </motion.div>

        <motion.h1
          variants={headline}
          className="mt-8 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Senior full-stack AI engineer.
          <br />
          MERN, wired into{" "}
          <GradientText className="whitespace-nowrap">
            LLM systems.
          </GradientText>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400"
        >
          I&apos;m Yaseen Khatib. Five years of building for the web end to
          end — React, Node.js, TypeScript, MongoDB — and the last few wiring
          that stack into production AI: RAG pipelines, agent orchestration,
          and six products shipped solo, from a Rust desktop app to
          autonomous pipelines. Everything on this site actually runs. Scroll
          down and poke it.
        </motion.p>

        <motion.p variants={item} className="mt-4 text-sm text-zinc-500">
          Hyderabad, India (IST) · happy remote, hybrid, or in an office ·
          effective across global time zones.
        </motion.p>

        {/* Two doors: a business buyer and a recruiter both find their path
            in the first screen. The business door carries the query people
            actually search; "open to work" lives on the hiring door only, so
            a client never reads it as "will leave my project halfway". */}
        <motion.div variants={item} className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href="/solutions/"
            className="group rounded-xl border border-cyan/40 bg-cyan/[0.06] p-4 transition-colors hover:border-cyan/70 hover:bg-cyan/[0.1]"
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">Need it built?</span>
            <span className="mt-1.5 block text-sm font-semibold text-zinc-50">
              Freelance full-stack &amp; AI developer in Hyderabad — fixed-price builds from ₹25k
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-xs text-ice">
              See services and prices <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
          <a
            href="/hire/"
            className="group rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] p-4 transition-colors hover:border-emerald-500/60"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
              <PulseDot color="bg-emerald-400" /> Hiring?
            </span>
            <span className="mt-1.5 block text-sm font-semibold text-zinc-50">
              Open to senior full-stack &amp; AI roles — remote, hybrid or on-site
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-300">
              CV and interview brief <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-5 text-sm">
          <a href="#contact" className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-cyan">
            Or just get in touch
          </a>
          <a
            href={RESUME_URL}
            download="Yaseen-Khatib-Resume.pdf"
            className="inline-flex items-center gap-1.5 font-medium text-zinc-400 transition-colors hover:text-ice"
          >
            <DownloadIcon className="h-4 w-4" /> Download CV
          </a>
        </motion.div>
      </motion.div>

      {/* Right: AI core animation — constrained on mobile so it doesn't
          dominate the first screen */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        className="mx-auto w-full max-w-[260px] sm:max-w-[400px] md:max-w-none"
      >
        <NeuralCore />
      </motion.div>
    </section>
  );
}
