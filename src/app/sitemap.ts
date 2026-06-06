import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const lastBlogUpdate = posts[0]?.publishedAt ?? "2026-06-06";

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/uses`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...postEntries,
  ];
}
