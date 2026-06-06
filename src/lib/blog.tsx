import type { ComponentType } from "react";
import { architectingMernAtAiSpeed } from "@/content/posts/architecting-mern-at-ai-speed";
import { tenXReality } from "@/content/posts/the-10x-reality";
import { agenticRagPipelines } from "@/content/posts/agentic-rag-pipelines-nodejs";
import { payloadReductionReactFlow } from "@/content/posts/94-percent-payload-reduction-react-flow";
import { promptingForArchitecture } from "@/content/posts/prompting-for-architecture-claude";

/** Public base URL — used for canonical links, OpenGraph, and JSON-LD. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaseenkhatib.dev";

export interface Author {
  name: string;
  role: string;
  url?: string;
}

export interface BlogPost {
  /** URL segment: /blog/<slug> */
  slug: string;
  /** <h1> + SEO title + JSON-LD headline */
  title: string;
  /** Meta description + OG/Twitter description + JSON-LD description */
  description: string;
  keywords: string[];
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: Author;
  tags: string[];
  /** AEO: 3–4 direct-answer bullets rendered in the "Executive Summary" box. */
  takeaways: string[];
  /** Absolute or root-relative OG/Twitter image (optional). */
  ogImage?: string;
  /** The article body (JSX). */
  Body: ComponentType;
}

// Registry — add new posts here.
const POSTS: BlogPost[] = [
  tenXReality,
  agenticRagPipelines,
  payloadReductionReactFlow,
  promptingForArchitecture,
  architectingMernAtAiSpeed,
];

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

/** Deterministic (UTC) date formatting so static output never drifts. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
