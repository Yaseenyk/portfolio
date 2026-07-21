"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
    <div ref={ref} className="flex-1 px-5 py-4">
      <span className="block text-2xl font-bold tabular-nums tracking-tight text-zinc-50 sm:text-3xl">
        {n}
        {suffix && <span className="text-cyan">{suffix}</span>}
      </span>
      <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
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
  /** Root-relative cover path (the post's real og image), when one exists. */
  image?: string;
}

export default function FoundersLog({ entries }: { entries: LogEntry[] }) {
  const ENTRIES = entries;
  return (
    <section id="founders-log" className="scroll-mt-24 py-10 sm:py-16">
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

      {/* Live proof-stats — one glass strip, counting up on first view */}
      <div className="relative mt-6 flex max-w-xl divide-x divide-zinc-800/60 overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/60 backdrop-blur-md">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan/50 via-purple/30 to-transparent"
        />
        <Stat value={5} label="products · solo" />
        <Stat value={100} suffix="+" label="dispatches" />
        <Stat value={1} suffix=" day" label="fastest client ship" />
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ENTRIES.map((post, i) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE, delay: (i % 3) * 0.08 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/60 backdrop-blur-md transition-colors hover:border-cyan/50"
            >
              {post.image && (
                <div className="overflow-hidden border-b border-zinc-800/60">
                  <Image
                    src={post.image}
                    alt=""
                    width={1536}
                    height={1024}
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <span className="font-mono text-[10px] text-zinc-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1.5 text-base font-semibold leading-snug tracking-tight text-zinc-100 transition-colors group-hover:text-cyan">
                  {post.title}
                </span>
                <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                  {post.description}
                </span>
                <span
                  aria-hidden
                  className="mt-auto pt-3 font-mono text-xs text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-cyan"
                >
                  read →
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
