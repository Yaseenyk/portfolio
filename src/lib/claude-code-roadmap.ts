/**
 * "Mastering Claude Code: The 90% Efficiency Roadmap" — a 12-part series on
 * cutting token spend and cost while working in Claude Code.
 *
 * Single source of truth for this series. The hub (`/claude-code`) and the
 * per-lesson chrome (injected by `app/blog/[slug]/page.tsx` via `lib/series.ts`)
 * both read from here. `slug` must match a registered `BlogPost` slug in
 * `lib/blog.tsx` for a lesson to resolve to a live route.
 */

export type LessonStatus = "published" | "coming-soon";

export interface CcLesson {
  /** 1-based position in the series. */
  step: number;
  /** URL segment — must match a BlogPost slug for "published" lessons. */
  slug: string;
  title: string;
  blurb: string;
  module: "Foundations" | "Precision" | "Workflow" | "Scale";
  status: LessonStatus;
}

export const CC_META = {
  title: "Mastering Claude Code: The 90% Efficiency Roadmap",
  tagline:
    "A 12-part field guide to slashing token spend in Claude Code — from context hygiene and surgical file referencing to prompt caching, model routing, and measuring real cost per feature.",
  /** Estimated total read time, kept in sync with the lessons below. */
  totalMinutes: 84,
};

/**
 * Ordered series. To stage a future lesson, set `status: "coming-soon"` (and
 * omit its post file) — the hub renders it as a locked "Coming Soon" card and
 * the lesson chrome skips a dead Next link.
 */
export const CC_ROADMAP: CcLesson[] = [
  {
    step: 1,
    slug: "claude-code-context-hygiene-clear-compact",
    title: "Context Hygiene",
    blurb:
      "Stale context is dead weight you re-pay for every turn. Master /clear and /compact to reset the running bill.",
    module: "Foundations",
    status: "published",
  },
  {
    step: 2,
    slug: "claude-code-token-budget-mental-model",
    title: "The Token Budget Mental Model",
    blurb:
      "The context window is RAM, and every message re-sends the history. See the meter before you spend.",
    module: "Foundations",
    status: "coming-soon",
  },
  {
    step: 3,
    slug: "claude-code-surgical-file-referencing",
    title: "Surgical File Referencing",
    blurb:
      "Don't dump the repo — point at lines. @-mentions over paste, so Claude reads one file, not forty.",
    module: "Precision",
    status: "coming-soon",
  },
  {
    step: 4,
    slug: "claude-code-claude-md-context-cache",
    title: "CLAUDE.md as a Context Cache",
    blurb:
      "Stop re-explaining the project every session. Amortize your setup tokens to near zero.",
    module: "Precision",
    status: "coming-soon",
  },
  {
    step: 5,
    slug: "claude-code-custom-slash-commands-skills",
    title: "Custom Slash Commands & Skills",
    blurb:
      "Turn a repeated paragraph of instructions into one cheap call. Kill prompt boilerplate for good.",
    module: "Precision",
    status: "coming-soon",
  },
  {
    step: 6,
    slug: "claude-code-plan-mode-spec-first",
    title: "Plan Mode & Spec-First",
    blurb:
      "Think before tokens. A wrong turn is the most expensive output there is — plan to avoid re-generation.",
    module: "Workflow",
    status: "coming-soon",
  },
  {
    step: 7,
    slug: "claude-code-subagents-delegation",
    title: "Subagents & Delegation",
    blurb:
      "Offload search and exploration to a child context so the main window stays lean and cheap.",
    module: "Workflow",
    status: "coming-soon",
  },
  {
    step: 8,
    slug: "claude-code-model-routing-haiku-sonnet-opus",
    title: "Model Routing",
    blurb:
      "Don't pay Opus rates for a rename. Match Haiku, Sonnet, and Opus to the task in front of you.",
    module: "Workflow",
    status: "coming-soon",
  },
  {
    step: 9,
    slug: "claude-code-prompt-caching",
    title: "Prompt Caching",
    blurb:
      "Structure prompts so the static prefix caches — and take roughly 90% off those tokens on every reuse.",
    module: "Scale",
    status: "coming-soon",
  },
  {
    step: 10,
    slug: "claude-code-mcp-over-data-dumps",
    title: "MCP Servers over Data Dumps",
    blurb:
      "Give Claude a tool, not a paste. Fetch data on demand instead of front-loading the context window.",
    module: "Scale",
    status: "coming-soon",
  },
  {
    step: 11,
    slug: "claude-code-hooks-automation",
    title: "Hooks & Automation",
    blurb:
      "Deterministic guardrails kill correction round-trips — the cheapest token is the one you never send.",
    module: "Scale",
    status: "coming-soon",
  },
  {
    step: 12,
    slug: "claude-code-measuring-roi-cost-budgets",
    title: "Measuring ROI",
    blurb:
      "/cost, ccusage, and a token budget per feature. What you don't measure, you overpay for.",
    module: "Scale",
    status: "coming-soon",
  },
];
