import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";
import { getAllMdxMeta } from "@/lib/mdx";
import BlogIndex, { type IndexPost } from "@/components/blog/BlogIndex";

import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Field notes on MERN architecture, agentic AI workflows and production systems - written from the work, with the decisions and numbers behind them.",
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    type: "website",
    title: "Field Notes | Yaseen Khatib",
    description:
      "Field notes on MERN architecture, agentic AI workflows and production systems - written from the work, with the decisions and numbers behind them.",
    url: `${SITE_URL}/blog/`,
    siteName: "Yaseen Khatib",
  },
};

export default function BlogIndexPage() {
  // Merge the hand-authored TSX registry with the AI-generated MDX posts.
  // TSX slugs win on collision; the result is sorted newest-first.
  const tsxSlugs = new Set(getAllPosts().map((p) => p.slug));
  const merged = [
    ...getAllPosts(),
    ...getAllMdxMeta().filter((m) => !tsxSlugs.has(m.slug)),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  // Map to a plain, serializable shape for the client Command Center.
  const posts: IndexPost[] = merged.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: formatDate(p.publishedAt),
    publishedAt: p.publishedAt,
    readingMinutes: p.readingMinutes,
    tags: p.tags,
  }));

  return <BlogIndex posts={posts} />;
}
