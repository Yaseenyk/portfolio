import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";
import BlogIndex, { type IndexPost } from "@/components/blog/BlogIndex";

import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Field notes on architecting MERN stacks, agentic AI workflows, and shipping production systems at AI-speed.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    title: "Field Notes | Yaseen Khatib",
    description:
      "Field notes on architecting MERN stacks, agentic AI workflows, and shipping production systems at AI-speed.",
    url: `${SITE_URL}/blog`,
    siteName: "Yaseen Khatib",
  },
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
