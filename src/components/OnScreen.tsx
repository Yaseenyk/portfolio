"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mounts children only while the box is near the viewport, so decorative
 *  JS-driven loops stop costing main-thread time when scrolled away. The
 *  wrapper keeps its box (parent reserves the height), so nothing shifts. */
export default function OnScreen({ children, margin = "150px" }: { children: ReactNode; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return (
    <div ref={ref} className="h-full w-full">
      {on ? children : null}
    </div>
  );
}
