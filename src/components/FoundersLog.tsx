"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getPostBySlug, FOUNDERS_LOG_SLUGS } from "@/lib/blog";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Narrative order from the registry — each row is a headline built to be
// read in the first scroll, before any project card.
const ENTRIES = FOUNDERS_LOG_SLUGS.map((slug) => getPostBySlug(slug)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p),
);

export default function FoundersLog() {
  return (
    <section id="founders-log" className="scroll-mt-24 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            ~/founders-log
          </h2>
          <p className="mt-3 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl">
            Syntax is table stakes. This is the{" "}
            <span className="text-gradient animate-gradient">vision</span> —
            10 stories from building 5 products solo.
          </p>
        </div>
        <span className="font-mono text-xs text-zinc-500">
          {ENTRIES.length} dispatches · updated {ENTRIES[0] ? "July 2026" : ""}
        </span>
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
