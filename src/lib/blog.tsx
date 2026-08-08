import type { ComponentType } from "react";
import { SITE_URL } from "@/lib/site";
import { tenXReality } from "@/content/posts/the-10x-reality";
import { payloadReductionReactFlow } from "@/content/posts/94-percent-payload-reduction-react-flow";
import { realTimeTelemetry } from "@/content/posts/real-time-telemetry-websockets-react";
import { chatgptChangedEngineering } from "@/content/posts/chatgpt-changed-full-stack-engineering";
// Advanced MERN + AI architecture series.
import { customSerializationAdapters } from "@/content/posts/custom-serialization-adapters";
import { websocketTelemetryAtScale } from "@/content/posts/websocket-telemetry-at-scale";
import { optimizingMongoAggregation } from "@/content/posts/optimizing-mongodb-aggregation";
// streamerOS AI Support Agent — serverless RAG + agentic architecture series.
import { reactFlowAgentCanvas } from "@/content/posts/react-flow-agent-orchestration-canvas";
import { compilingReactFlowAgent } from "@/content/posts/compiling-react-flow-graph-agent-pipeline";
import { semanticCachingEdge } from "@/content/posts/semantic-caching-edge-rag";
// The AI Systems Architect Roadmap — 15-part masterclass series (see lib/roadmap.ts).
import { payloadCompression } from "@/content/posts/payload-compression-serialization-patterns";
import { llmObservability } from "@/content/posts/llm-observability-opentelemetry-tracing";
import { aiNativePortfolio } from "@/content/posts/ai-native-portfolio-landing-lead-roles";
// Mastering Claude Code: The 90% Efficiency Roadmap (see lib/claude-code-roadmap.ts).
// The Complete Anthropic & Claude Developer Roadmap (see lib/anthropic-roadmap.ts).
import { masteringClaudeArchitecture } from "@/content/posts/mastering-claude-architecture-context-windows-output-limits";
import { promptCachingDeepDive } from "@/content/posts/prompt-caching-deep-dive-latency-cost";
// Founder's Log — the vision series: product stories + operating model (see components/FoundersLog.tsx).
import { myJourneyPost } from "@/content/posts/my-journey-web-developer-to-ai-engineer";
import { shippedFiveProductsSolo } from "@/content/posts/shipped-5-products-solo-12-months";
import { visionOverSyntax } from "@/content/posts/vision-over-syntax-architecture-first";
import { oneArchitectFullSquad } from "@/content/posts/one-architect-claude-mcp-full-squad";
import { aiFinopsPlaybook } from "@/content/posts/ai-finops-playbook-stop-burning-money";
import { linkedinPipelineStory } from "@/content/posts/linkedin-pipeline-job-search-runs-itself";
import { zeroDollarContentEngine } from "@/content/posts/zero-dollar-content-engine";
import { sableTrustBoundary } from "@/content/posts/sable-ai-agent-never-touches-money";
import { streamerOsRustStory } from "@/content/posts/streameros-rust-over-electron";
import { ninetyFourPercentDecision } from "@/content/posts/the-94-percent-decision-integratex";
import { hireMyHead } from "@/content/posts/hire-my-head-not-my-hands";

export { SITE_URL };

/** The Founder's Log vision series, in narrative order — featured on the home page. */
export const FOUNDERS_LOG_SLUGS = [
  "my-journey-web-developer-to-ai-engineer",
  "shipped-5-products-solo-12-months",
  "vision-over-syntax-architecture-first",
  "one-architect-claude-mcp-full-squad",
  "ai-finops-playbook-stop-burning-money",
  "linkedin-pipeline-job-search-runs-itself",
  "zero-dollar-content-engine",
  "sable-ai-agent-never-touches-money",
  "streameros-rust-over-electron",
  "the-94-percent-decision-integratex",
  "hire-my-head-not-my-hands",
] as const;

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
  /**
   * Set on thin, purely-informational posts that will never convert — keeps
   * them out of the index so they stop diluting the site's topical focus (the
   * intent-mismatch that got the site flagged). Still followed for link equity.
   */
  noindex?: boolean;
  /** The article body (JSX). */
  Body: ComponentType;
}

// Registry — add new posts here.
const POSTS: BlogPost[] = [
  // Founder's Log — the vision series (newest).
  myJourneyPost,
  shippedFiveProductsSolo,
  visionOverSyntax,
  oneArchitectFullSquad,
  aiFinopsPlaybook,
  linkedinPipelineStory,
  zeroDollarContentEngine,
  sableTrustBoundary,
  streamerOsRustStory,
  ninetyFourPercentDecision,
  hireMyHead,
  // Claude/Anthropic — the two lessons that earned impressions; the rest of the
  // 15-part 'masterclass' was commodity explainer content and was removed.
  masteringClaudeArchitecture,
  promptCachingDeepDive,
  // AI systems architecture — the pieces backed by first-hand measurement.
  payloadCompression,
  llmObservability,
  aiNativePortfolio,
  // streamerOS AI Support Agent — serverless RAG + agentic architecture.
  reactFlowAgentCanvas,
  compilingReactFlowAgent,
  semanticCachingEdge,
  // Advanced MERN + AI architecture.
  customSerializationAdapters,
  websocketTelemetryAtScale,
  optimizingMongoAggregation,
  realTimeTelemetry,
  tenXReality,
  payloadReductionReactFlow,
  // Foundational primer (the origin-story piece).
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
