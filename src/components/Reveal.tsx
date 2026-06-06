"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** Scroll-triggered fade-in-up wrapper. Fires once when it enters the viewport. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
