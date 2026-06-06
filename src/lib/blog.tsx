import type { ComponentType } from "react";
import { architectingMernAtAiSpeed } from "@/content/posts/architecting-mern-at-ai-speed";
import { tenXReality } from "@/content/posts/the-10x-reality";
import { agenticRagPipelines } from "@/content/posts/agentic-rag-pipelines-nodejs";
import { payloadReductionReactFlow } from "@/content/posts/94-percent-payload-reduction-react-flow";
import { promptingForArchitecture } from "@/content/posts/prompting-for-architecture-claude";
import { cachingTheAi } from "@/content/posts/caching-the-ai-redis-mongodb";
import { typeSafeLlms } from "@/content/posts/type-safe-llms-typescript-express";
import { realTimeTelemetry } from "@/content/posts/real-time-telemetry-websockets-react";
import { deathOfTheBackendRouter } from "@/content/posts/death-of-the-traditional-backend-router";
import { fromWireframeToWeb } from "@/content/posts/from-wireframe-to-web-ai-speed";
import { stateManagementAiEra } from "@/content/posts/state-management-ai-era-zustand-vs-redux";
import { chatgptChangedEngineering } from "@/content/posts/chatgpt-changed-full-stack-engineering";
import { promptEngineeringFundamentals } from "@/content/posts/prompt-engineering-fundamentals";
import { buildingYourFirstRag } from "@/content/posts/building-your-first-rag-system";
import { vectorDatabasesForMern } from "@/content/posts/vector-databases-for-mern-developers";
import { fineTuningVsRag } from "@/content/posts/fine-tuning-vs-rag";
import { streamingLlmToReact } from "@/content/posts/streaming-llm-responses-to-react";
import { embeddingsSemanticSearch } from "@/content/posts/embeddings-semantic-search-mongodb";
import { tokenEconomics } from "@/content/posts/token-economics-cost-optimizing-llm-apps";
import { functionCallingToolUse } from "@/content/posts/function-calling-tool-use-patterns";
import { evaluatingLlmOutputs } from "@/content/posts/evaluating-llm-outputs";

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
  cachingTheAi,
  typeSafeLlms,
  realTimeTelemetry,
  deathOfTheBackendRouter,
  fromWireframeToWeb,
  stateManagementAiEra,
  architectingMernAtAiSpeed,
  // Foundational series, backdated across the AI boom (2022–2024).
  functionCallingToolUse,
  evaluatingLlmOutputs,
  tokenEconomics,
  embeddingsSemanticSearch,
  streamingLlmToReact,
  fineTuningVsRag,
  vectorDatabasesForMern,
  buildingYourFirstRag,
  promptEngineeringFundamentals,
  chatgptChangedEngineering,
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
