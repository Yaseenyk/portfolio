"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/lib/useHydrated";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Scroll-triggered fade-in-up wrapper. Fires once when it enters the viewport.
 *
 * The server HTML is rendered in the visible state (`initial={false}`); the
 * hidden state is applied only after hydration and only to elements not yet
 * in view, so nothing above the fold ever flashes and nothing is invisible to
 * a crawler that snapshots before JavaScript runs.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants: Variants = {
    hidden: { opacity: 0, y, transition: { duration: 0 } },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial={false}
      animate={hydrated && !inView ? "hidden" : "show"}
    >
      {children}
    </motion.div>
  );
}
