import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getAllMdxMeta } from "@/lib/mdx";
import { PRODUCTS } from "@/lib/products";
import { routeDate } from "@/lib/lastmod";

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

  const entries: MetadataRoute.Sitemap = [
    {
      // Trailing slash matters here: `trailingSlash: true` means every other
      // URL on this site is slash-terminated and the bare form 301s to it.
      // Emitting the homepage without one made the sitemap disagree with the
      // served canonical.
      url: `${SITE_URL}/`,
      lastModified: routeDate("src/app", lastBlogUpdate),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: routeDate("src/app/about", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hire/`,
      lastModified: routeDate("src/app/hire", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: routeDate("src/app/blog", lastBlogUpdate),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/roadmap/`,
      lastModified: routeDate("src/app/roadmap", lastBlogUpdate),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/anthropic-roadmap/`,
      lastModified: routeDate("src/app/anthropic-roadmap", lastBlogUpdate),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/uses/`,
      lastModified: routeDate("src/app/uses", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/sandbox/`,
      lastModified: routeDate("src/app/sandbox", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects/`,
      lastModified: routeDate("src/app/projects", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/products/`,
      lastModified: routeDate("src/app/products", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PRODUCTS.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}/`,
      lastModified: routeDate("src/app/products/${p.slug}", lastBlogUpdate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/solutions/`,
      lastModified: routeDate("src/app/solutions", lastBlogUpdate),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/solutions/business/`,
      lastModified: routeDate("src/app/solutions/business", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/small-business/`,
      lastModified: routeDate("src/app/solutions/small-business", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/interview/`,
      lastModified: routeDate("src/app/interview", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...postEntries,
    // Tag archive pages are intentionally excluded — they're noindex, so
    // listing them here would only dilute crawl budget on a young domain.
  ];

  return entries;
}
