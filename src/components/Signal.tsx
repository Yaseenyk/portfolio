"use client";

import { motion } from "framer-motion";

interface SignalProps {
  className?: string;
}

const ARCS = [
  "M8.5 14.5a5 5 0 0 1 7 0",
  "M6 12a9 9 0 0 1 12 0",
  "M3.5 9.5a13 13 0 0 1 17 0",
];

/** A broadcasting-signal SVG whose arcs pulse outward in a loop — the "live" feel. */
export default function Signal({ className }: SignalProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`text-cyan ${className ?? ""}`}
    >
      <circle cx="12" cy="18" r="1.6" fill="currentColor" />
      {ARCS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}
    </svg>
  );
}
