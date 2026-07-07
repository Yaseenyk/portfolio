import type { ComponentType } from "react";
import { SITE_URL } from "@/lib/site";
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
// Advanced MERN + AI architecture series.
import { agenticVsCopilots } from "@/content/posts/agentic-workflows-vs-copilots";
import { customSerializationAdapters } from "@/content/posts/custom-serialization-adapters";
import { vectorEmbeddingsInProduction } from "@/content/posts/vector-embeddings-in-production";
import { advancedRedisCaching } from "@/content/posts/advanced-redis-caching-strategies";
import { websocketTelemetryAtScale } from "@/content/posts/websocket-telemetry-at-scale";
import { optimizingMongoAggregation } from "@/content/posts/optimizing-mongodb-aggregation";
import { rbacPatterns } from "@/content/posts/role-based-access-control-patterns";
import { reduxToolkitArchitectures } from "@/content/posts/redux-toolkit-architectures";
import { typescriptMigrationPlaybook } from "@/content/posts/typescript-migration-playbook";
import { reactUseMemoBenchmarks } from "@/content/posts/react-usememo-benchmarks";
// streamerOS AI Support Agent — serverless RAG + agentic architecture series.
import { zeroHallucinationRag } from "@/content/posts/zero-hallucination-rag-grounding-contract";
import { edgeNativeRag } from "@/content/posts/edge-native-rag-cloudflare-workers-hono";
import { singleModelRag } from "@/content/posts/single-model-rag-embeddings-generation";
import { reactFlowAgentCanvas } from "@/content/posts/react-flow-agent-orchestration-canvas";
import { compilingReactFlowAgent } from "@/content/posts/compiling-react-flow-graph-agent-pipeline";
import { semanticCachingEdge } from "@/content/posts/semantic-caching-edge-rag";
import { routerAgentPattern } from "@/content/posts/router-agent-multi-agent-orchestration";
import { ragChunkingArchitecture } from "@/content/posts/rag-chunking-strategy-architecture";
import { streamingAiEdge } from "@/content/posts/streaming-ai-edge-hono-ai-sdk-nextjs";
import { statelessAgentsEdge } from "@/content/posts/stateless-agents-edge-cloudflare-durable-objects";
// The AI Systems Architect Roadmap — 15-part masterclass series (see lib/roadmap.ts).
import { aiNativeDevStack } from "@/content/posts/ai-native-dev-stack-rethinking-mern";
import { beyondThePrompt } from "@/content/posts/beyond-the-prompt-llm-mechanics";
import { vectorFoundations } from "@/content/posts/vector-foundations-semantic-search";
import { ragGroundingTheAgent } from "@/content/posts/rag-grounding-the-agent";
import { agenticControlLoops } from "@/content/posts/agentic-control-loops";
import { latencyFirstAi } from "@/content/posts/latency-first-ai-serverless-hono";
import { modelContextProtocol } from "@/content/posts/model-context-protocol-mcp";
import { payloadCompression } from "@/content/posts/payload-compression-serialization-patterns";
import { guardrailEngineering } from "@/content/posts/guardrail-engineering-hallucination-prevention";
import { hybridRag } from "@/content/posts/hybrid-rag-bm25-vector-reranking";
import { llmObservability } from "@/content/posts/llm-observability-opentelemetry-tracing";
import { finopsForAi } from "@/content/posts/finops-for-ai-cost-governance";
import { evaluationDrivenDevelopment } from "@/content/posts/evaluation-driven-development-golden-dataset";
import { memoryAndStatefulAi } from "@/content/posts/memory-and-stateful-ai-architecture";
import { aiNativePortfolio } from "@/content/posts/ai-native-portfolio-landing-lead-roles";
// Mastering Claude Code: The 90% Efficiency Roadmap (see lib/claude-code-roadmap.ts).
import { claudeCodeContextHygiene } from "@/content/posts/claude-code-context-hygiene-clear-compact";
// The Complete Anthropic & Claude Developer Roadmap (see lib/anthropic-roadmap.ts).
import { masteringClaudeArchitecture } from "@/content/posts/mastering-claude-architecture-context-windows-output-limits";
import { xmlStructuralPrompting } from "@/content/posts/xml-tag-structural-prompting-deterministic-shell";
import { jsonStructuredOutputs } from "@/content/posts/json-structured-outputs-type-safe-zod";
import { toolUseFunctionCalling } from "@/content/posts/tool-use-function-calling-mechanics";
import { modelContextProtocolFoundations } from "@/content/posts/model-context-protocol-mcp-server-foundations";
import { adaptiveExtendedThinking } from "@/content/posts/adaptive-extended-thinking-latency-vs-compute";
import { localFirstClaudeCode } from "@/content/posts/local-first-claude-code-claude-md-secure-cli";
import { buildingCustomSkills } from "@/content/posts/building-custom-claude-skills-task-scripts";
import { promptCachingDeepDive } from "@/content/posts/prompt-caching-deep-dive-latency-cost";
import { constitutionalAiSafety } from "@/content/posts/constitutional-ai-safety-system-prompts-guardrails";
import { multiAgentWorktrees } from "@/content/posts/multi-agent-worktrees-parallel-subagents";
import { statefulAgentRuntime } from "@/content/posts/stateful-agent-runtime-persistence-durable-objects-redis";
import { enterpriseMcpAggregation } from "@/content/posts/enterprise-mcp-aggregation-postgres-figma-playwright";
import { evalDrivenPromptEngineering } from "@/content/posts/evaluation-driven-prompt-engineering-golden-datasets";
import { autonomousAgentRoutines } from "@/content/posts/long-running-automated-agent-routines-cron-workflows";
// Founder's Log — the vision series: product stories + operating model (see components/FoundersLog.tsx).
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
  /** The article body (JSX). */
  Body: ComponentType;
}

// Registry — add new posts here.
const POSTS: BlogPost[] = [
  // Founder's Log — the vision series (newest).
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
  // The Complete Anthropic & Claude Developer Roadmap — 15-part masterclass (newest).
  masteringClaudeArchitecture,
  xmlStructuralPrompting,
  jsonStructuredOutputs,
  toolUseFunctionCalling,
  modelContextProtocolFoundations,
  adaptiveExtendedThinking,
  localFirstClaudeCode,
  buildingCustomSkills,
  promptCachingDeepDive,
  constitutionalAiSafety,
  multiAgentWorktrees,
  statefulAgentRuntime,
  enterpriseMcpAggregation,
  evalDrivenPromptEngineering,
  autonomousAgentRoutines,
  // Mastering Claude Code: The 90% Efficiency Roadmap.
  claudeCodeContextHygiene,
  // The AI Systems Architect Roadmap — 15-part masterclass series.
  aiNativeDevStack,
  beyondThePrompt,
  vectorFoundations,
  ragGroundingTheAgent,
  agenticControlLoops,
  latencyFirstAi,
  modelContextProtocol,
  payloadCompression,
  guardrailEngineering,
  hybridRag,
  llmObservability,
  finopsForAi,
  evaluationDrivenDevelopment,
  memoryAndStatefulAi,
  aiNativePortfolio,
  // streamerOS AI Support Agent — serverless RAG + agentic architecture (newest).
  zeroHallucinationRag,
  edgeNativeRag,
  singleModelRag,
  reactFlowAgentCanvas,
  compilingReactFlowAgent,
  semanticCachingEdge,
  routerAgentPattern,
  ragChunkingArchitecture,
  streamingAiEdge,
  statelessAgentsEdge,
  // Advanced MERN + AI architecture series.
  agenticVsCopilots,
  customSerializationAdapters,
  vectorEmbeddingsInProduction,
  advancedRedisCaching,
  websocketTelemetryAtScale,
  optimizingMongoAggregation,
  rbacPatterns,
  reduxToolkitArchitectures,
  typescriptMigrationPlaybook,
  reactUseMemoBenchmarks,
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
  // Foundational series (fundamentals-first primers).
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
