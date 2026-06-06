"use client";

import { motion } from "framer-motion";

interface PulseDotProps {
  className?: string;
}

/** A glowing "live" status dot (SVG) with a looping ping ring — the streamerOS signal. */
export default function PulseDot({ className = "" }: PulseDotProps) {
  return (
    <span className={`relative inline-flex h-2.5 w-2.5 ${className}`}>
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-ice"
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ice shadow-[0_0_8px_1px_rgba(103,232,249,0.8)]" />
    </span>
  );
}
