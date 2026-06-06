import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";
import BlogIndex, { type IndexPost } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Yaseen Khatib",
  description:
    "Field notes on architecting MERN stacks, agentic AI workflows, and shipping production systems at AI-speed.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  // Map to a plain, serializable shape for the client Command Center.
  const posts: IndexPost[] = getAllPosts().map((p) => ({
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
