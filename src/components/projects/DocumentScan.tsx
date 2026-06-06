"use client";

import { motion } from "framer-motion";

const LINE_WIDTHS = [90, 70, 80, 60, 85, 75, 65, 88, 72, 82];

/** Police RAG — scrolling case text under a scanning laser, resolving to a verdict. */
export default function DocumentScan() {
  return (
    <div className="flex h-full w-full flex-col p-6">
      <span className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
        case://posco/analysis
      </span>

      <div className="relative flex-1 overflow-hidden rounded-lg border border-zinc-800 bg-ink/40">
        {/* Scrolling case text */}
        <motion.div
          className="absolute inset-x-0 top-0 flex flex-col gap-2 p-3"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          {[...LINE_WIDTHS, ...LINE_WIDTHS].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-zinc-700/60"
              style={{ width: `${w}%` }}
            />
          ))}
        </motion.div>

        {/* Scanning laser */}
        <motion.div
          className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan/25 to-transparent"
          animate={{ top: ["-12%", "100%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-0 h-px bg-ice shadow-[0_0_12px_2px_rgba(103,232,249,0.85)]"
          animate={{ top: ["-12%", "100%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Verdict badge */}
      <motion.div
        className="mt-3 flex items-center justify-center gap-2 rounded-md border border-ice/40 bg-ice/5 py-2 font-mono text-xs uppercase tracking-widest text-ice"
        animate={{
          opacity: [0.4, 1, 0.4],
          boxShadow: [
            "0 0 0px rgba(103,232,249,0)",
            "0 0 16px -2px rgba(103,232,249,0.5)",
            "0 0 0px rgba(103,232,249,0)",
          ],
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ice" />
        Verdict Generated
      </motion.div>
    </div>
  );
}
