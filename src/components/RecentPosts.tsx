"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAllPosts, formatDate } from "@/lib/blog";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// getAllPosts() is already sorted by publishedAt descending.
const RECENT = getAllPosts()
  .slice(0, 3)
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: formatDate(p.publishedAt),
    publishedAt: p.publishedAt,
    readingMinutes: p.readingMinutes,
  }));

export default function RecentPosts() {
  return (
    <section id="writing" className="scroll-mt-24 py-24">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/field-notes
        </h2>
        <Link
          href="/blog"
          className="font-mono text-xs text-zinc-500 transition-colors duration-200 hover:text-cyan"
        >
          View all →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {RECENT.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            whileHover={{ y: -5, borderColor: "#22D3EE" }}
            className="flex flex-col rounded-2xl border border-zinc-800/50 bg-zinc-950/60 p-6 backdrop-blur-md"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              <time dateTime={post.publishedAt}>{post.date}</time>
              <span>{post.readingMinutes} min</span>
            </div>

            <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-zinc-50">
              {post.title}
            </h3>

            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">
              {post.description}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cyan transition-colors duration-200 hover:text-ice"
              aria-label={`Read the article: ${post.title}`}
            >
              Read Article →
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
