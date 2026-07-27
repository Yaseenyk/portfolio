import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getAllMdxMeta } from "@/lib/mdx";
import { PRODUCTS } from "@/lib/products";
import { CAMPUS_PROJECTS, DEGREE_SLUGS } from "@/lib/campus";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const tsxSlugs = new Set(getAllPosts().map((p) => p.slug));
  const posts = [
    ...getAllPosts(),
    ...getAllMdxMeta().filter((m) => !tsxSlugs.has(m.slug)),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const lastBlogUpdate = posts[0]?.publishedAt ?? "2026-06-06";

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
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
      url: `${SITE_URL}/about/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/roadmap/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/claude-code/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/anthropic-roadmap/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/uses/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/sandbox/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/products/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PRODUCTS.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/final-year-projects/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/final-year-projects/custom/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/colleges/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/terms/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/final-year-projects/guides/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/final-year-projects/guides/${g.meta.slug}/`,
      lastModified: g.meta.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...Object.values(DEGREE_SLUGS).map((slug) => ({
      url: `${SITE_URL}/final-year-projects/for/${slug}/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...CAMPUS_PROJECTS.map((p) => ({
      url: `${SITE_URL}/final-year-projects/${p.slug}/`,
      lastModified: p.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/interview/`,
      lastModified: lastBlogUpdate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...postEntries,
    // Tag archive pages are intentionally excluded — they're noindex, so
    // listing them here would only dilute crawl budget on a young domain.
  ];
}
