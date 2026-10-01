import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all conventional crawlers, except the private tools.
      {
        userAgent: "*",
        allow: "/",
        // /blog/tag/ is 45 pages that are already noindex, so every fetch is a
        // crawl Google spends to be told not to index. On a site where it
        // fetched roughly ten pages in September and 86 sit discovered-but-
        // never-crawled, that is the cheapest budget to reclaim — nothing is
        // lost, because none of them could rank anyway.
        disallow: ["/outreach/", "/leads/", "/blog/tag/"],
      },
      // Explicitly welcome AI / answer-engine crawlers (AEO).
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "anthropic-ai",
          "ClaudeBot",
          "Claude-Web",
          "CCBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
