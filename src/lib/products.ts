// Single source of truth for the Products surface: the home #products section,
// the /products dashboard, and each /products/<slug> deep-dive all read from here.
import { SITE_URL } from "@/lib/site";

export type ProductSlug = "streameros" | "linkedin-pipeline" | "ai-blogger";

export interface ProductMeta {
  slug: ProductSlug;
  name: string;
  /** Mono eyebrow, e.g. "Desktop · Rust". */
  category: string;
  /** One-line positioning under the name. */
  tagline: string;
  /** Dashboard card body + SEO description. */
  summary: string;
  /** Languages / frameworks / APIs shown as pills. */
  tech: string[];
  /** Public source repository. */
  repoUrl: string;
  /** Optional live deployment. */
  liveUrl?: string;
}

export const PRODUCTS: ProductMeta[] = [
  {
    slug: "streameros",
    name: "streamerOS",
    category: "Desktop · Rust",
    tagline: "Ultra-lightweight streaming cockpit",
    summary:
      "A Rust-powered desktop cockpit for Twitch & YouTube streamers — live system telemetry, multi-platform chat velocity, and automated OBS scene sync, all inside a ~152 MB / 1.8% CPU footprint.",
    tech: ["Rust", "Tauri v2", "WebSockets", "Next.js", "OBS WebSocket v5"],
    // The streamerOS app repo is private; this is the public website/landing repo.
    repoUrl: "https://github.com/Yaseenyk/streamer-os-website",
    liveUrl: "https://yaseenyk.github.io/streamer-os-website/",
  },
  {
    slug: "linkedin-pipeline",
    name: "Automated LinkedIn Pipeline",
    category: "Automation · Agent",
    tagline: "Autonomous content scheduler",
    summary:
      "A Python autonomous agent running on GitHub Actions that schedules and publishes technical content on a cron — drafting every post through the Gemini API. Zero servers, zero manual posting.",
    tech: ["Python", "GitHub Actions", "Gemini API", "Cron"],
    repoUrl: "https://github.com/Yaseenyk/linkedin-bot",
  },
  {
    slug: "ai-blogger",
    name: "Zero-Cost AI Blog Writer",
    category: "Pipeline · Content",
    tagline: "Git-triggered article factory",
    summary:
      "A native Next.js pipeline that autonomously writes, formats, and deploys Markdown articles straight to this site — Gemini drafts the MDX, GitHub Actions commits it, and GitHub Pages ships it.",
    tech: ["Next.js", "MDX", "google-genai", "GitHub Actions", "GitHub Pages"],
    repoUrl: "https://github.com/Yaseenyk/portfolio",
  },
];

export function getProduct(slug: string): ProductMeta | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productUrl(slug: ProductSlug): string {
  return `${SITE_URL}/products/${slug}`;
}
