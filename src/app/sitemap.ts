import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getAllMdxMeta } from "@/lib/mdx";
import { PRODUCTS } from "@/lib/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const tsxSlugs = new Set(getAllPosts().map((p) => p.slug));
  const posts = [
    ...getAllPosts(),
    ...getAllMdxMeta().filter((m) => !tsxSlugs.has(m.slug)),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
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
      url: `${SITE_URL}/about`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/roadmap`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/claude-code`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/anthropic-roadmap`,
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
    {
      url: `${SITE_URL}/sandbox`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PRODUCTS.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/interview`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...postEntries,
  ];
}
