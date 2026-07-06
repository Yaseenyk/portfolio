"use client";

import { motion, type Variants } from "framer-motion";
import GradientText from "./GradientText";
import PulseDot from "./PulseDot";
import NeuralCore from "./NeuralCore";
import { ArrowRightIcon, DownloadIcon } from "./Icons";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  return (
    <section className="grid min-h-[80vh] grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      {/* Left: copy */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-1.5 text-xs font-medium text-emerald-300">
            <PulseDot color="bg-emerald-400" />
            Open to Remote roles
          </span>
          <span className="inline-flex items-center rounded-full border border-zinc-800 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-300">
            Senior Full-Stack AI Engineer
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Architecting Scalable Systems.
          <br />
          Delivering at{" "}
          <GradientText className="whitespace-nowrap">AI-Speed.</GradientText>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400"
        >
          Yaseen Nurmahammad Khatib is a Senior Full-Stack AI Engineer who builds
          and ships autonomous AI products — from Agentic RAG pipelines and LLM
          orchestration to the high-throughput MERN systems they run on. He turns
          AI capabilities into production software, at AI-speed.
        </motion.p>

        <motion.p variants={item} className="mt-4 text-sm text-zinc-500">
          Based in Hyderabad (IST) · Remote-first, effective across global time
          zones.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]"
          >
            Get in touch
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Resume.pdf`}
            download="Yaseen-Khatib-Resume.pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors duration-300 hover:border-ice/60 hover:text-ice"
          >
            <DownloadIcon className="h-4 w-4" />
            Download CV
          </motion.a>
          <a
            href="#dashboard"
            className="text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-cyan"
          >
            View live architecture
          </a>
        </motion.div>
      </motion.div>

      {/* Right: AI core animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      >
        <NeuralCore />
      </motion.div>
    </section>
  );
}
