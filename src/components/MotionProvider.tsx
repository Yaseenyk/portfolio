"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Honors the OS-level "reduce motion" setting for every framer-motion
 *  animation in the tree (transform/layout animations are skipped). */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
