import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getAllMdxMeta } from "@/lib/mdx";
import { PRODUCTS } from "@/lib/products";
import { CAMPUS_PROJECTS, DEGREE_SLUGS } from "@/lib/campus";
import { GUIDES } from "@/lib/guides";
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

  return [
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
      url: `${SITE_URL}/final-year-projects/`,
      lastModified: routeDate("src/app/final-year-projects", lastBlogUpdate),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/final-year-projects/custom/`,
      lastModified: routeDate("src/app/final-year-projects/custom", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/colleges/`,
      lastModified: routeDate("src/app/final-year-projects/colleges", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/terms/`,
      lastModified: routeDate("src/app/final-year-projects/terms", lastBlogUpdate),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/`,
      lastModified: routeDate("src/app/final-year-projects/journey", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/domains/`,
      lastModified: routeDate("src/app/final-year-projects/journey/domains", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/frontend/`,
      lastModified: routeDate("src/app/final-year-projects/journey/frontend", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/backend/`,
      lastModified: routeDate("src/app/final-year-projects/journey/backend", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/database/`,
      lastModified: routeDate("src/app/final-year-projects/journey/database", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/llm/`,
      lastModified: routeDate("src/app/final-year-projects/journey/llm", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/using-llms/`,
      lastModified: routeDate("src/app/final-year-projects/journey/using-llms", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/prompting/`,
      lastModified: routeDate("src/app/final-year-projects/journey/prompting", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/embeddings/`,
      lastModified: routeDate("src/app/final-year-projects/journey/embeddings", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/vector-search/`,
      lastModified: routeDate("src/app/final-year-projects/journey/vector-search", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/rag/`,
      lastModified: routeDate("src/app/final-year-projects/journey/rag", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/agents/`,
      lastModified: routeDate("src/app/final-year-projects/journey/agents", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/production/`,
      lastModified: routeDate("src/app/final-year-projects/journey/production", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/advanced-rag/`,
      lastModified: routeDate("src/app/final-year-projects/journey/advanced-rag", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/evaluation/`,
      lastModified: routeDate("src/app/final-year-projects/journey/evaluation", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/scaling/`,
      lastModified: routeDate("src/app/final-year-projects/journey/scaling", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/journey/fine-tuning/`,
      lastModified: routeDate("src/app/final-year-projects/journey/fine-tuning", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/planner/`,
      lastModified: routeDate("src/app/final-year-projects/planner", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/find-my-project/`,
      lastModified: routeDate("src/app/final-year-projects/find-my-project", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/cost-estimator/`,
      lastModified: routeDate("src/app/final-year-projects/cost-estimator", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/templates/`,
      lastModified: routeDate("src/app/final-year-projects/templates", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/final-year-projects/question-bank/`,
      lastModified: routeDate("src/app/final-year-projects/question-bank", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/final-year-projects/guides/`,
      lastModified: routeDate("src/app/final-year-projects/guides", lastBlogUpdate),
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
      lastModified: routeDate("src/app/final-year-projects/for/${slug}", lastBlogUpdate),
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
      lastModified: routeDate("src/app/interview", lastBlogUpdate),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...postEntries,
    // Tag archive pages are intentionally excluded — they're noindex, so
    // listing them here would only dilute crawl budget on a young domain.
  ];
}
