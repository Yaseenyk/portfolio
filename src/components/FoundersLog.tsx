"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** Counts up when scrolled into view; honors prefers-reduced-motion. */
function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const t0 = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-zinc-800/60 bg-white/[0.02] px-4 py-3 text-center"
    >
      <span className="block text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-cyan to-purple bg-clip-text tabular-nums">
        {n}
        {suffix}
      </span>
      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
        {label}
      </span>
    </div>
  );
}

// Plain serializable shape — the server page maps the registry to this so
// the post bodies never enter the client bundle.
export interface LogEntry {
  slug: string;
  title: string;
  description: string;
}

export default function FoundersLog({ entries }: { entries: LogEntry[] }) {
  const ENTRIES = entries;
  return (
    <section id="founders-log" className="scroll-mt-24 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            ~/founders-log
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl">
            A résumé <em>tells</em> you what I did.
            <br />
            This <span className="text-gradient animate-gradient">
              shows you
            </span>{" "}
            — as it happened.
          </p>
        </div>
        <Link
          href="/blog"
          className="font-mono text-xs text-zinc-500 transition-colors hover:text-cyan"
        >
          All dispatches →
        </Link>
      </div>

      {/* Live proof-stats — count up on first view */}
      <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
        <Stat value={5} label="products · solo" />
        <Stat value={100} suffix="+" label="dispatches" />
        <Stat value={1} suffix=" day" label="fastest client ship" />
      </div>

      <ol className="mt-8 divide-y divide-zinc-800/60 border-y border-zinc-800/60">
        {ENTRIES.map((post, i) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE, delay: (i % 5) * 0.05 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-baseline gap-4 py-4 transition-colors sm:gap-6"
            >
              <span className="shrink-0 font-mono text-xs text-zinc-600 transition-colors group-hover:text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block text-base font-semibold leading-snug tracking-tight text-zinc-200 transition-colors group-hover:text-zinc-50 sm:text-lg">
                  {post.title}
                </span>
                <span className="mt-1 hidden text-sm leading-relaxed text-zinc-500 sm:line-clamp-1">
                  {post.description}
                </span>
              </span>
              <span
                aria-hidden
                className="shrink-0 font-mono text-sm text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-cyan"
              >
                →
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
