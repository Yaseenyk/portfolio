"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";

// Animation features load after first paint (async), so framer's engine is
// off the critical path. domMax covers the layout/layoutId animations used by
// the navbar pill and the blog index.
const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/** Honors the OS-level "reduce motion" setting for every framer-motion
 *  animation in the tree (transform/layout animations are skipped). */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
