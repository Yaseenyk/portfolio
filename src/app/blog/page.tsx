import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Yaseen Khatib",
  description:
    "Field notes on architecting MERN stacks, agentic AI workflows, and shipping production systems at AI-speed.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12">
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

      <div className="mt-12 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-zinc-800 bg-ink/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-ice/30 hover:shadow-[0_0_36px_-12px_rgba(103,232,249,0.35)] sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span className="text-zinc-700">•</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 transition-colors duration-200 group-hover:text-cyan">
              {post.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {post.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
