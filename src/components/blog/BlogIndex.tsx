"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface IndexPost {
  slug: string;
  title: string;
  description: string;
  /** Human-readable date label. */
  date: string;
  /** ISO date, for sorting. */
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
}

type SortOrder = "latest" | "oldest";

// How many tag-pills to surface (most frequent first); the rest stay searchable.
const MAX_PILLS = 12;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BlogCard({
  post,
  activeCategory,
}: {
  post: IndexPost;
  activeCategory: string;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-ink/50 p-5 backdrop-blur-md transition-all duration-300 hover:border-ice/30 hover:shadow-[0_0_30px_-12px_rgba(103,232,249,0.4)]"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          <time dateTime={post.publishedAt}>{post.date}</time>
          <span>{post.readingMinutes} min</span>
        </div>

        <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-zinc-50 transition-colors duration-200 group-hover:text-cyan">
          {post.title}
        </h2>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2 py-0.5 text-[10px] transition-colors ${
                activeCategory === tag
                  ? "border-ice/40 bg-ice/10 text-ice"
                  : "border-zinc-800 text-zinc-400"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogIndex({ posts }: { posts: IndexPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) =>
      p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    );
    const top = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_PILLS)
      .map(([t]) => t);
    return ["All", ...top];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = posts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.tags.includes(activeCategory);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
    return list.sort((a, b) =>
      sortOrder === "latest"
        ? b.publishedAt.localeCompare(a.publishedAt)
        : a.publishedAt.localeCompare(b.publishedAt)
    );
  }, [posts, searchQuery, activeCategory, sortOrder]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/blog
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Field Notes
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
          Architecture, agentic AI workflows, and shipping production systems at
          AI-speed.
        </p>
      </header>

      {/* Command bar */}
      <div className="sticky top-24 z-30 mt-8 rounded-2xl border border-zinc-800/50 bg-zinc-950/60 p-4 backdrop-blur-md shadow-2xl shadow-cyan-900/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query archives..."
              aria-label="Search articles"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-4 text-sm text-zinc-100 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan focus:ring-2 focus:ring-cyan/20"
            />
          </div>

          {/* Sort */}
          <div className="flex shrink-0 items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1 text-xs">
            {(["latest", "oldest"] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setSortOrder(o)}
                className={`rounded-md px-3 py-1.5 capitalize transition-colors duration-200 ${
                  sortOrder === o
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Filter pills */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                activeCategory === cat
                  ? "border-ice bg-ice text-ink"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-6 font-mono text-xs text-zinc-500">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      {/* Grid */}
      <motion.div
        layout
        className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              activeCategory={activeCategory}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-800 py-16 text-center">
          <p className="font-mono text-sm text-zinc-500">
            No entries match your query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-3 text-sm text-cyan transition-colors hover:text-ice"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
