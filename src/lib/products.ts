// Single source of truth for the Products surface: the home #products section,
// the /products dashboard, and each /products/<slug> deep-dive all read from here.
import { SITE_URL } from "@/lib/site";

export type ProductSlug =
  | "spotai"
  | "fitrank"
  | "sable"
  | "streameros"
  | "linkedin-pipeline"
  | "ai-blogger"
  | "analytics-dashboard";

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
  /** Public source repository (omitted when the code is private). */
  repoUrl?: string;
  /** Optional live deployment. */
  liveUrl?: string;
  /** Real screenshots in public/shots/: desktop ids (1280x800, with a -sm copy) and phone ids (520x1125). */
  shots?: { desktop?: string[]; phone?: string[] };
  /** Installable builds and demos, shown as buttons on the product page. */
  downloads?: { label: string; url: string; note: string }[];
}

export const PRODUCTS: ProductMeta[] = [
  {
    slug: "spotai",
    name: "SpotAI",
    category: "Mobile + Web · On-device AI",
    tagline: "An AI gym buddy for members and a management console for Indian gym owners",
    summary:
      "A gym app with two sides. Members get a squat coach that runs MediaPipe pose on the phone and never uploads a frame, a workout log, a diet plan built from Indian dishes, an opt-in leaderboard and buddies. Owners get live arrivals with dues flagged, UPI payments, busy hours and a trainer console that reviews the AI's tips. Consent per purpose, built to the shape of India's DPDP Act.",
    tech: [
      "Vue 3 + Capacitor",
      "NestJS",
      "PostgreSQL RLS",
      "MediaPipe",
      "NATS",
      "Astro + GSAP",
    ],
    // The app repo is private; this is the public marketing site.
    repoUrl: "https://github.com/Yaseenyk/spotai-website",
    liveUrl: "https://spotai.streamerosai.com/",
    shots: { desktop: ["spotai"], phone: ["spotai-app-m", "spotai-m"] },
    downloads: [
      {
        label: "Android app",
        url: "https://spotai.streamerosai.com/downloads/spotai-demo.apk",
        note: "APK · Android 7+ · latest version",
      },
      {
        label: "iPhone web app",
        url: "https://spotai.streamerosai.com/demo/",
        note: "Safari → Add to Home Screen",
      },
      {
        label: "iOS build",
        url: "https://spotai.streamerosai.com/downloads/spotai-ios.ipa",
        note: "Unsigned .ipa · AltStore or Sideloadly",
      },
    ],
  },
  {
    slug: "fitrank",
    name: "FitRank",
    category: "Decision Model · Applied ML",
    tagline: "Typed AI decisions for staffing — the model recommends, a human decides",
    summary:
      "Ranks people for open tasks with typed decisions that return a probability for every option. Code applies the hard rules, a MiniLM student distilled from an open-weight teacher answers five bounded questions, and a manager makes every final call.",
    tech: [
      "Python",
      "FastAPI",
      "MiniLM",
      "PyTorch",
      "Postgres + pgvector",
      "React + TypeScript",
    ],
    // Source is private; the page links the live site, not a repository that would 404.
    liveUrl: "https://fitrank.streamerosai.com/",
    shots: { desktop: ["fitrank"], phone: ["fitrank-m"] },
  },
  {
    slug: "sable",
    name: "Sable",
    category: "Mobile · Android · AI Agent",
    tagline: "Local-First AI Financial Agent",
    summary:
      "A personal expense tracker for Android that keeps every record on the phone in SQLite, with no account and no backend. You add money by typing, in chat or from a bank statement; an OpenAI function-calling agent (on the user's own key) reads files and loose wording, and every database change waits behind a Review & Confirm card.",
    tech: [
      "React Native (Expo)",
      "TypeScript",
      "SQLite",
      "Zustand",
      "OpenAI · Function Calling",
      "OpenAI · Vision",
    ],
    // The app repo is private; this is the public marketing site.
    repoUrl: "https://github.com/Yaseenyk/sable-website",
    liveUrl: "https://sable.streamerosai.com/",
    shots: { desktop: ["sable"], phone: ["sable-app-m", "sable-m"] },
  },
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
    // The product's own domain, not the github.io mirror it 301s from — the
    // mirror was the only address this site ever pointed at, so the canonical
    // one got none of the association.
    liveUrl: "https://streamerosai.com",
    shots: { desktop: ["streameros"], phone: ["streameros-m"] },
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
    tagline: "A retired experiment in automated publishing",
    summary:
      "An experiment I built and then switched off: a Next.js pipeline in which an LLM drafted Markdown articles and GitHub Actions committed and deployed them for $0 of infrastructure. It worked — and taught me that automated volume is the wrong way to publish. The posts on this site are first-person now; the pipeline stays as a teardown.",
    tech: ["Next.js", "MDX", "google-genai", "GitHub Actions", "GitHub Pages"],
    repoUrl: "https://github.com/Yaseenyk/portfolio",
  },
  {
    slug: "analytics-dashboard",
    name: "Analytics Dashboard",
    category: "Dashboard · Analytics",
    tagline: "One page for Google Analytics and Search Console across twelve sites",
    summary:
      "A tracking and reporting system for my twelve sites: one GA4 property with a stream per site, tagged events for clicks and leads, first-touch attribution on every lead, and a dashboard that shows traffic, sources (search, social, AI assistants), Search Console queries and live visitors. A GitHub Action builds the data every two hours, and a free Cloudflare Worker fetches live numbers when the page opens.",
    tech: [
      "GA4 Data API",
      "Search Console API",
      "GitHub Actions",
      "GitHub Pages",
      "Cloudflare Workers",
      "Vanilla JS",
    ],
    repoUrl: "https://github.com/Yaseenyk/analytics-dashboard",
    liveUrl: "https://analytics.streamerosai.com/",
    shots: { desktop: ["analytics"], phone: ["analytics-m"] },
  },
];

export function getProduct(slug: string): ProductMeta | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productUrl(slug: ProductSlug): string {
  return `${SITE_URL}/products/${slug}/`;
}
