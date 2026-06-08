"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A fixed reading-progress bar pinned to the very top of the viewport, tracking
 * document scroll. Rendered only for roadmap lessons by the post template.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  // Smooth the raw scroll value so the bar glides rather than jitters.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-purple via-cyan to-ice shadow-[0_0_12px_0_rgba(34,211,238,0.6)]"
    />
  );
}
