"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Reports how far into an article people actually get.
 *
 * A pageview only says someone landed. These milestones separate "bounced off
 * the headline" from "read the whole thing", which is the difference between a
 * post that draws traffic and a post that works.
 *
 * Events land in GoatCounter as `evt-read:<slug>:<milestone>`, so a single
 * dashboard filter on `read:` ranks every article by completion.
 */
const MILESTONES = [25, 50, 75, 100] as const;

/** Below this, a "scroll to 100%" is just a short page, not a read. */
const MIN_ENGAGED_MS = 8000;

export default function ReadDepth({ slug }: { slug: string }) {
  const fired = useRef<Set<number>>(new Set());
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const pct = Math.min(100, (window.scrollY / scrollable) * 100);
      const engagedMs = Date.now() - startedAt.current;

      for (const m of MILESTONES) {
        if (pct < m || fired.current.has(m)) continue;
        // The deepest milestone doubles as the "finished it" signal, so it has
        // to survive someone hitting End on a short page.
        if (m === 100 && engagedMs < MIN_ENGAGED_MS) continue;
        fired.current.add(m);
        track(`read:${slug}:${m}`);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once on mount so a page shorter than the viewport still counts.
    measure();

    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
