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
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-300"
        >
          <PulseDot />
          Senior MERN + AI Developer
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
          Yaseen Khatib is a Senior MERN Stack &amp; AI Systems Engineer who
          bridges high-performance MERN architectures with autonomous AI systems.
          He specializes in Agentic RAG pipelines, LLM orchestration, and
          high-throughput backend scaling — architecting and shipping production
          systems at AI-speed.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#dashboard"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]"
          >
            View Architecture
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
