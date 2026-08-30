/**
 * Retired URLs → their closest surviving page. Stubs (rel=canonical +
 * meta-refresh — the strongest soft-301 GitHub Pages can issue) are written
 * into the static export by scripts/generate-redirects.mjs.
 *
 * Why this is populated again after the 2026-08 prune left these to 404: the
 * retired URLs are still linked from 18 published LinkedIn posts, DEV.to
 * cross-posts, and Google results. A visitor clicking those got "page doesn't
 * exist". A topically-nearest page is strictly better for that visitor than a
 * 404, and it consolidates whatever equity the old URL had instead of dropping
 * it. Google may treat loosely-related targets as soft-404 — acceptable; the
 * humans arriving from LinkedIn are the priority.
 *
 * Keys: bare slug under /blog/, or an absolute path starting with "/".
 * Values: bare slug under /blog/, or an absolute path starting with "/".
 * generate-redirects.mjs fails the build if a target does not exist in ./out,
 * so this map can never point at nothing.
 */
export const BLOG_REDIRECTS: Record<string, string> = {
  // Claude / Anthropic roadmap lessons → the two surviving lessons + hub
  "adaptive-extended-thinking-latency-vs-compute": "mastering-claude-architecture-context-windows-output-limits",
  "beyond-the-prompt-llm-mechanics": "mastering-claude-architecture-context-windows-output-limits",
  "claude-code-context-hygiene-clear-compact": "mastering-claude-architecture-context-windows-output-limits",
  "memory-and-stateful-ai-architecture": "mastering-claude-architecture-context-windows-output-limits",
  "xml-tag-structural-prompting-deterministic-shell": "mastering-claude-architecture-context-windows-output-limits",
  "json-structured-outputs-type-safe-zod": "mastering-claude-architecture-context-windows-output-limits",
  "type-safe-llms-strict-schemas-typescript-express": "mastering-claude-architecture-context-windows-output-limits",
  "prompt-engineering-fundamentals-backend-devs": "prompt-caching-deep-dive-latency-cost",
  "building-custom-claude-skills-task-scripts": "one-architect-claude-mcp-full-squad",
  "local-first-claude-code-claude-md-secure-cli": "one-architect-claude-mcp-full-squad",
  "multi-agent-worktrees-parallel-subagents": "one-architect-claude-mcp-full-squad",
  "model-context-protocol-mcp": "one-architect-claude-mcp-full-squad",
  "model-context-protocol-mcp-server-foundations": "one-architect-claude-mcp-full-squad",
  "enterprise-mcp-aggregation-postgres-figma-playwright": "one-architect-claude-mcp-full-squad",
  "tool-use-function-calling-mechanics": "one-architect-claude-mcp-full-squad",
  "function-calling-tool-use-patterns": "one-architect-claude-mcp-full-squad",
  "long-running-automated-agent-routines-cron-workflows": "zero-dollar-content-engine",
  "prompting-for-architecture-claude-full-stack": "vision-over-syntax-architecture-first",
  "/claude-code": "/anthropic-roadmap",

  // RAG / retrieval / caching → the surviving edge-RAG piece
  "advanced-redis-caching-strategies": "semantic-caching-edge-rag",
  "caching-the-ai-redis-mongodb-llm-latency": "semantic-caching-edge-rag",
  "edge-native-rag-cloudflare-workers-hono": "semantic-caching-edge-rag",
  "latency-first-ai-serverless-hono": "semantic-caching-edge-rag",
  "streaming-ai-edge-hono-ai-sdk-nextjs": "semantic-caching-edge-rag",
  "streaming-llm-responses-to-react": "semantic-caching-edge-rag",
  "hybrid-rag-bm25-vector-reranking": "semantic-caching-edge-rag",
  "rag-chunking-strategy-architecture": "semantic-caching-edge-rag",
  "single-model-rag-embeddings-generation": "semantic-caching-edge-rag",
  "vector-embeddings-in-production": "semantic-caching-edge-rag",
  "vector-foundations-semantic-search": "semantic-caching-edge-rag",
  "vector-databases-for-mern-developers": "semantic-caching-edge-rag",
  "building-your-first-rag-system": "semantic-caching-edge-rag",
  "zero-hallucination-rag-grounding-contract": "semantic-caching-edge-rag",

  // Agents / orchestration → the React Flow control-plane pieces
  "agentic-control-loops": "react-flow-agent-orchestration-canvas",
  "architecting-agentic-rag-pipelines-nodejs": "compiling-react-flow-graph-agent-pipeline",
  "router-agent-multi-agent-orchestration": "react-flow-agent-orchestration-canvas",
  "death-of-the-traditional-backend-router": "react-flow-agent-orchestration-canvas",
  "rag-grounding-the-agent": "react-flow-agent-orchestration-canvas",
  "stateful-agent-runtime-persistence-durable-objects-redis": "websocket-telemetry-at-scale",
  "stateless-agents-edge-cloudflare-durable-objects": "websocket-telemetry-at-scale",

  // Guardrails / evals / cost
  "constitutional-ai-safety-system-prompts-guardrails": "sable-ai-agent-never-touches-money",
  "guardrail-engineering-hallucination-prevention": "sable-ai-agent-never-touches-money",
  "evaluation-driven-development-golden-dataset": "llm-observability-opentelemetry-tracing",
  "evaluation-driven-prompt-engineering-golden-datasets": "llm-observability-opentelemetry-tracing",
  "evaluating-llm-outputs": "llm-observability-opentelemetry-tracing",
  "finops-for-ai-cost-governance": "ai-finops-playbook-stop-burning-money",

  // MERN / React / frontend
  "agentic-workflows-vs-copilots": "the-10x-reality-ai-replaced-the-mern-squad",
  "ai-native-dev-stack-rethinking-mern": "the-10x-reality-ai-replaced-the-mern-squad",
  "architecting-mern-at-ai-speed": "the-10x-reality-ai-replaced-the-mern-squad",
  "from-wireframe-to-web-high-fidelity-ui-ai-speed": "the-10x-reality-ai-replaced-the-mern-squad",
  "react-usememo-benchmarks": "when-usememo-actually-helps-in-react-19-and-how-to-measure-it",
  "redux-toolkit-architectures": "stop-mixing-render-and-domain-state-in-react-dashboards",
  "state-management-ai-era-zustand-vs-redux": "stop-mixing-render-and-domain-state-in-react-dashboards",
  "typescript-migration-playbook": "how-i-orchestrate-react-with-a-typed-event-bus",
  "role-based-access-control-patterns": "zero-account-auth-device-bound-identity-capability-tokens",
};
