import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all conventional crawlers, except the private outreach tool.
      { userAgent: "*", allow: "/", disallow: "/outreach/" },
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
