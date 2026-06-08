/**
 * The "AI Systems Architect" Masterclass Roadmap — a curated 15-lesson series.
 *
 * This is the single source of truth for the series. The hub (`/roadmap`) and the
 * per-lesson chrome (progress bar + stepper + Next-Lesson nav, injected by
 * `app/blog/[slug]/page.tsx`) both read from here. `slug` must match a registered
 * `BlogPost` slug in `lib/blog.tsx` for a lesson to resolve to a live route.
 */

export type LessonStatus = "published" | "coming-soon";

export interface RoadmapLesson {
  /** 1-based position in the series. */
  step: number;
  /** URL segment — must match a BlogPost slug for "published" lessons. */
  slug: string;
  /** Short series title (the post's <h1> can be longer/punchier). */
  title: string;
  /** One-line hook shown on the hub card. */
  blurb: string;
  /** Coarse theme, used for the hub's section label. */
  module: "Foundations" | "Systems" | "Production" | "Career";
  /** Drives the hub label + whether the card links out. */
  status: LessonStatus;
}

export const ROADMAP_META = {
  title: "The AI Systems Architect Roadmap",
  tagline:
    "A 15-part masterclass on building production-grade AI systems — from rethinking the MERN stack to hybrid retrieval, observability, FinOps, and stateful agents.",
  /** Estimated total read time, kept in sync with the lessons below. */
  totalMinutes: 98,
};

/**
 * Ordered series. To stage a future lesson, set `status: "coming-soon"` (and omit
 * its post file) — the hub renders it as a locked "Coming Soon" card and the
 * lesson chrome simply skips a dead Next link.
 */
export const ROADMAP: RoadmapLesson[] = [
  {
    step: 1,
    slug: "ai-native-dev-stack-rethinking-mern",
    title: "The AI-Native Dev Stack",
    blurb:
      "MERN didn't die — it grew a nervous system. The three new tiers every stack now needs.",
    module: "Foundations",
    status: "published",
  },
  {
    step: 2,
    slug: "beyond-the-prompt-llm-mechanics",
    title: "Beyond the Prompt",
    blurb:
      "Tokens, the context window as a byte budget, and why determinism is a parameter — not a property.",
    module: "Foundations",
    status: "published",
  },
  {
    step: 3,
    slug: "vector-foundations-semantic-search",
    title: "Vector Foundations",
    blurb:
      "Turning meaning into geometry so 'reset my password' finds 'recover account access.'",
    module: "Foundations",
    status: "published",
  },
  {
    step: 4,
    slug: "rag-grounding-the-agent",
    title: "RAG: Grounding the Agent",
    blurb:
      "The grounding contract that turns a confident stranger into an expert who cites the manual.",
    module: "Systems",
    status: "published",
  },
  {
    step: 5,
    slug: "agentic-control-loops",
    title: "Agentic Control Loops",
    blurb:
      "A chatbot answers; an agent acts. The observe-decide-act loop that makes autonomy tractable.",
    module: "Systems",
    status: "published",
  },
  {
    step: 6,
    slug: "latency-first-ai-serverless-hono",
    title: "Latency-First AI",
    blurb:
      "Users forgive a wrong answer faster than a slow one. Streaming first tokens from the edge.",
    module: "Production",
    status: "published",
  },
  {
    step: 7,
    slug: "model-context-protocol-mcp",
    title: "The Model Context Protocol",
    blurb:
      "The USB-C of AI tooling — collapsing N×M bespoke integrations into N+M servers and clients.",
    module: "Production",
    status: "published",
  },
  {
    step: 8,
    slug: "payload-compression-serialization-patterns",
    title: "94% Compression",
    blurb:
      "How we cut an agent-graph payload by 94% — by designing the format around the data, not gzip.",
    module: "Production",
    status: "published",
  },
  {
    step: 9,
    slug: "guardrail-engineering-hallucination-prevention",
    title: "Guardrail Engineering",
    blurb:
      "Deterministic checks wrapped around a probabilistic core. Defense-in-depth that fails closed.",
    module: "Production",
    status: "published",
  },
  {
    step: 10,
    slug: "hybrid-rag-bm25-vector-reranking",
    title: "Hybrid RAG",
    blurb:
      "Dense vectors miss exact codes; keywords miss paraphrase. Fuse BM25 and vectors, then rerank.",
    module: "Production",
    status: "published",
  },
  {
    step: 11,
    slug: "llm-observability-opentelemetry-tracing",
    title: "LLM Observability",
    blurb:
      "A multi-step agent that only logs is a black box. One OpenTelemetry span per step makes it readable.",
    module: "Production",
    status: "published",
  },
  {
    step: 12,
    slug: "finops-for-ai-cost-governance",
    title: "FinOps for AI",
    blurb:
      "Cost per request is a property you design — cache so you never pay twice, route so you never overpay.",
    module: "Production",
    status: "published",
  },
  {
    step: 13,
    slug: "evaluation-driven-development-golden-dataset",
    title: "Evaluation-Driven Dev",
    blurb:
      "A prompt is code with no tests until a golden dataset gates the merge on a regression threshold.",
    module: "Production",
    status: "published",
  },
  {
    step: 14,
    slug: "memory-and-stateful-ai-architecture",
    title: "Memory & Stateful AI",
    blurb:
      "The context window is RAM, not disk. Tier memory into a working buffer, episodic summaries, and durable facts.",
    module: "Production",
    status: "published",
  },
  {
    step: 15,
    slug: "ai-native-portfolio-landing-lead-roles",
    title: "The AI-Native Portfolio",
    blurb:
      "Show systems, not tool usage. Turn the portfolio itself into proof-of-work for lead roles.",
    module: "Career",
    status: "published",
  },
];

export const TOTAL_LESSONS = ROADMAP.length;

export function publishedCount(): number {
  return ROADMAP.filter((l) => l.status === "published").length;
}

export interface LessonContext {
  lesson: RoadmapLesson;
  /** Previous published lesson, if any. */
  prev: RoadmapLesson | null;
  /** Next published lesson, if any. */
  next: RoadmapLesson | null;
  total: number;
}

/** Resolve a slug to its place in the series (or null if it isn't a lesson). */
export function getLessonBySlug(slug: string): LessonContext | null {
  const i = ROADMAP.findIndex((l) => l.slug === slug);
  if (i === -1) return null;

  const isLive = (l: RoadmapLesson) => l.status === "published";
  // Walk outward for the nearest live neighbours so a staged lesson never
  // produces a dead Next/Prev link.
  let prev: RoadmapLesson | null = null;
  for (let j = i - 1; j >= 0; j--) {
    if (isLive(ROADMAP[j])) {
      prev = ROADMAP[j];
      break;
    }
  }
  let next: RoadmapLesson | null = null;
  for (let j = i + 1; j < ROADMAP.length; j++) {
    if (isLive(ROADMAP[j])) {
      next = ROADMAP[j];
      break;
    }
  }

  return { lesson: ROADMAP[i], prev, next, total: ROADMAP.length };
}
