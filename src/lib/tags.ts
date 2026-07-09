import { getAllPosts } from "@/lib/blog";
import { getAllMdxMeta } from "@/lib/mdx";

export interface TagPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
}

/** URL segment for a tag: "AI Orchestration" → "ai-orchestration". */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Every tag across TSX + MDX posts → its display label and posts (newest first). */
export function getTagIndex(): Map<string, { label: string; posts: TagPost[] }> {
  const tsxSlugs = new Set(getAllPosts().map((p) => p.slug));
  const merged = [
    ...getAllPosts(),
    ...getAllMdxMeta().filter((m) => !tsxSlugs.has(m.slug)),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const index = new Map<string, { label: string; posts: TagPost[] }>();
  for (const post of merged) {
    for (const tag of post.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const entry = index.get(slug) ?? { label: tag, posts: [] };
      entry.posts.push({
        slug: post.slug,
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
        readingMinutes: post.readingMinutes,
      });
      index.set(slug, entry);
    }
  }
  return index;
}
