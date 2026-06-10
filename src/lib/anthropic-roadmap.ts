/**
 * "The Complete Anthropic & Claude Developer Roadmap (Basics to Production)" —
 * a 15-part sequential masterclass taking a developer from the model's core
 * mechanics (context windows, structured prompting, tool use) through to
 * production-grade multi-agent systems (MCP aggregation, durable runtimes,
 * eval-driven engineering, autonomous routines).
 *
 * Single source of truth for this series. The hub (`/anthropic-roadmap`) and the
 * per-lesson chrome (injected by `app/blog/[slug]/page.tsx` via `lib/series.ts`)
 * both read from here. `slug` must match a registered `BlogPost` slug in
 * `lib/blog.tsx` for a lesson to resolve to a live route.
 */

export type LessonStatus = "published" | "coming-soon";

export interface AnLesson {
  /** 1-based position in the series. */
  step: number;
  /** URL segment — must match a BlogPost slug for "published" lessons. */
  slug: string;
  title: string;
  blurb: string;
  module: "Developer Core" | "Enterprise Production";
  status: LessonStatus;
}

export const AN_META = {
  title: "The Complete Anthropic & Claude Developer Roadmap (Basics to Production)",
  tagline:
    "A 15-part sequential masterclass from a Principal DevRel lens — from context-window physics, XML structural prompting, and type-safe tool use to MCP aggregation, durable agent runtimes, eval-driven engineering, and autonomous cron routines.",
  /** Estimated total read time, kept in sync with the lessons below. */
  totalMinutes: 135,
};

/**
 * Ordered series. To stage a future lesson, set `status: "coming-soon"` (and
 * omit its post file) — the hub renders it as a locked "Coming Soon" card and
 * the lesson chrome skips a dead Next link.
 */
export const AN_ROADMAP: AnLesson[] = [
  {
    step: 1,
    slug: "mastering-claude-architecture-context-windows-output-limits",
    title: "Claude Architecture: Context Windows & Output Physics",
    blurb:
      "The model is a fixed-size attention budget. Understand context windows, output caps, and token physics before you write a single prompt.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 2,
    slug: "xml-tag-structural-prompting-deterministic-shell",
    title: "XML-Tag Structural Prompting",
    blurb:
      "Free-text prompts are non-deterministic. Wrap inputs in XML tags to give Claude a parseable shell and pin its attention where you want it.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 3,
    slug: "json-structured-outputs-type-safe-zod",
    title: "Structured JSON Outputs + Zod Contracts",
    blurb:
      "An LLM that returns prose can't drive a system. Force type-safe JSON and validate it at the boundary with Zod before it touches your code.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 4,
    slug: "tool-use-function-calling-mechanics",
    title: "Tool Use & Function Calling Mechanics",
    blurb:
      "Tool use is the model asking your runtime to act. Master the request/result loop, schema design, and parallel tool calls.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 5,
    slug: "model-context-protocol-mcp-server-foundations",
    title: "Model Context Protocol: Server Foundations",
    blurb:
      "Stop hard-wiring integrations into prompts. Build an MCP server that exposes tools and resources Claude can discover and call.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 6,
    slug: "adaptive-extended-thinking-latency-vs-compute",
    title: "Adaptive Extended Thinking: Latency vs. Compute",
    blurb:
      "Reasoning isn't free. Tune adaptive extended thinking budgets to trade latency for accuracy on the problems that actually need it.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 7,
    slug: "local-first-claude-code-claude-md-secure-cli",
    title: "Local-First Claude Code: CLAUDE.md & Secure CLI",
    blurb:
      "Your CLAUDE.md is the agent's standing system prompt. Engineer it — plus secure CLI boundaries — for a deterministic local workspace.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 8,
    slug: "building-custom-claude-skills-task-scripts",
    title: "Building Custom Claude Skills",
    blurb:
      "Turn a repeated workflow into a first-class Skill — a discoverable, versioned task script the agent invokes on demand.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 9,
    slug: "prompt-caching-deep-dive-latency-cost",
    title: "Prompt Caching Deep Dive",
    blurb:
      "Structure the static prefix so it caches, and take roughly 90% off those tokens plus a latency win on every reuse.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 10,
    slug: "constitutional-ai-safety-system-prompts-guardrails",
    title: "Constitutional AI, Safety & Guardrails",
    blurb:
      "Safety is an architecture, not an afterthought. Layer constitutional principles, system prompts, and runtime guardrails.",
    module: "Developer Core",
    status: "published",
  },
  {
    step: 11,
    slug: "multi-agent-worktrees-parallel-subagents",
    title: "Multi-Agent Worktrees & Parallel Subagents",
    blurb:
      "One context can't hold a migration. Fan work out to isolated git worktrees and route parallel subagents that don't collide.",
    module: "Enterprise Production",
    status: "published",
  },
  {
    step: 12,
    slug: "stateful-agent-runtime-persistence-durable-objects-redis",
    title: "Stateful Agent Runtime: Durable Objects + Redis",
    blurb:
      "Agents crash, sessions resume. Checkpoint handoffs to Durable Objects and Redis so a long-running agent survives restarts.",
    module: "Enterprise Production",
    status: "published",
  },
  {
    step: 13,
    slug: "enterprise-mcp-aggregation-postgres-figma-playwright",
    title: "Enterprise MCP Aggregation",
    blurb:
      "Production agents need many tools at once. Aggregate Postgres, Figma, and Playwright MCP servers behind one governed surface.",
    module: "Enterprise Production",
    status: "published",
  },
  {
    step: 14,
    slug: "evaluation-driven-prompt-engineering-golden-datasets",
    title: "Eval-Driven Prompt Engineering",
    blurb:
      "If you can't measure a prompt, you can't ship it. Build golden datasets and an eval harness that gates every prompt change.",
    module: "Enterprise Production",
    status: "published",
  },
  {
    step: 15,
    slug: "long-running-automated-agent-routines-cron-workflows",
    title: "Autonomous Agent Routines: Cron Workflows",
    blurb:
      "The endgame is an agent that runs without you. Schedule cron-style autonomous routines with checkpoints, budgets, and kill-switches.",
    module: "Enterprise Production",
    status: "published",
  },
];
