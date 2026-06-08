import type { ReactNode } from "react";

/**
 * SupportAgentDocs — an engineering-manager-facing architectural breakdown of
 * the streamerOS AI Support Agent: a Tier-1 support assistant built on a
 * grounded RAG pipeline. Rendered as the expandable `Supplement` below the
 * project card (see Projects.tsx), so it stays a pure presentational component.
 *
 * Visual language mirrors ShadowDocs / blog/Terminal.tsx — macOS window chrome,
 * mono eyebrow labels, `.tok-*` syntax tokens, and the cyan/purple/ice theme.
 */

const STACK: [string, string][] = [
  ["Edge runtime", "Hono on Cloudflare Workers — a thin, typed router executing at the network edge."],
  ["Vector store", "Upstash Vector — serverless similarity search over 768-dim embeddings."],
  ["Model", "gemini-flash-latest — one model for both embedding and generation."],
  ["Orchestration", "@ai-sdk — streamed generation, typed tool calls, and a uniform provider surface."],
  ["Knowledge base", "knowledge-base.md — the single source of truth, chunked and embedded at build time."],
  ["Transport", "Server-Sent token streaming over fetch — first token in well under a second, globally."],
];

const PIPELINE: [string, string][] = [
  [
    "Ingest & chunk",
    "knowledge-base.md is split into semantically coherent passages — the unit of retrieval, not the whole document.",
  ],
  [
    "Embed (768-dim)",
    "Each chunk is embedded with gemini-flash-latest and upserted into Upstash Vector. The corpus becomes a searchable latent space.",
  ],
  [
    "Retrieve (top-k)",
    "An incoming question is embedded with the same model and matched by cosine similarity. Only the highest-scoring chunks are pulled.",
  ],
  [
    "Constrain & ground",
    "Retrieved chunks are injected as the sole authority in the system prompt. The model is forbidden from answering beyond them.",
  ],
  [
    "Stream",
    "@ai-sdk streams the grounded answer token-by-token back through the Worker to the client.",
  ],
];

const GROUNDING_PROMPT = `SYSTEM // Strict Grounding Policy — Tier-1 Support

ROLE
You are the streamerOS Support Agent. You answer ONLY
from the retrieved documentation context provided below.

CONTEXT
{top_k_chunks}   // semantic matches from Upstash Vector

RULES
- Answer EXCLUSIVELY from CONTEXT. Never draw on prior
  knowledge or invent steps, settings, or version numbers.
- If CONTEXT does not contain the answer, refuse cleanly:
  "I can only help with documented streamerOS features —
   that isn't in my knowledge base yet."
- Attribute every claim to its source section heading.
- Do not speculate about roadmap, pricing, or any service
  outside the knowledge base.

OUTPUT
- Concise, step-numbered, copy-pasteable. No preamble.`;

const IMPACT: [string, string, string][] = [
  [
    "Zero-hallucination",
    "Grounded-only",
    "Answers are bounded by retrieved context and refuse when the knowledge base is silent — fabricated steps and invented settings are designed out, not patched over.",
  ],
  [
    "Real-time latency",
    "<1s first token",
    "Edge execution plus streamed generation means the user reads the answer as it forms — no spinner, no blocking round-trip to a distant origin.",
  ],
  [
    "Cost efficiency",
    "Scales to zero",
    "Workers and Upstash are serverless and consumption-priced. Idle support traffic costs effectively nothing; load scales without provisioning.",
  ],
];

/** Section eyebrow + hairline, matching products/Section.tsx. */
function DocSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="px-5 py-7 sm:px-7">
      <div className="flex items-center gap-3">
        <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
          {label}
        </h4>
        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Renders the grounding prompt, dimming comment lines via `.tok-com`. */
function PromptSurface({ text }: { text: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-[#070b11] px-4 py-4 font-mono text-[12.5px] leading-relaxed text-zinc-300">
      <code>
        {text.split("\n").map((line, i) => {
          const trimmed = line.trimStart();
          const isComment = trimmed.startsWith("//") || trimmed.includes("//");
          const isHeading = /^[A-Z]{3,}$/.test(trimmed);
          return (
            <span
              key={i}
              className={
                isComment ? "tok-com" : isHeading ? "text-purple" : undefined
              }
            >
              {line + "\n"}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

export default function SupportAgentDocs() {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-white/[0.02] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">
          shadow-docs · streamerOS / AI Support Agent
        </span>
      </div>

      <div className="divide-y divide-zinc-800">
        {/* 01 — Overview */}
        <DocSection label="01 · Overview">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-zinc-400">
            <p>
              The streamerOS AI Support Agent is a{" "}
              <strong className="text-zinc-200">Tier-1 support assistant</strong>{" "}
              built on a <strong className="text-zinc-200">grounded RAG</strong>{" "}
              architecture. It resolves the routine, documented questions that
              dominate a support queue — setup, configuration, troubleshooting —
              without escalating to a human and without inventing answers.
            </p>
            <p>
              The deliberate shift here is from a{" "}
              <strong className="text-zinc-200">generic chat model</strong>, which
              answers confidently from a fuzzy parametric memory, to a{" "}
              <strong className="text-zinc-200">
                semantic-search-backed documentation assistant
              </strong>{" "}
              whose every answer is retrieved from — and constrained to — the
              product&apos;s own knowledge base. The model stops being the source
              of truth and becomes a renderer for it.
            </p>
          </div>
        </DocSection>

        {/* 02 — Architectural Pillars */}
        <DocSection label="02 · Architectural Pillars">
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-semibold text-zinc-200">
                Technical stack
              </h5>
              <dl className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-800/40 sm:grid-cols-2">
                {STACK.map(([term, desc]) => (
                  <div key={term} className="bg-ink/60 p-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan">
                      {term}
                    </dt>
                    <dd className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                      {desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-zinc-200">
                Grounded retrieval pipeline
              </h5>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-400">
                Hallucination is prevented at the architecture level, not by
                asking the model to behave. The knowledge base is turned into a
                searchable vector space; only relevant passages reach the model;
                a strict prompt forbids it from going beyond them.
              </p>
              <ol className="mt-4 space-y-px overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-800/40">
                {PIPELINE.map(([title, desc], i) => (
                  <li key={title} className="flex gap-4 bg-ink/60 p-4">
                    <span className="font-mono text-xs text-purple">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-zinc-200">
                        {title}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-zinc-200">
                Why Cloudflare Workers + Hono
              </h5>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-400">
                Support is global and bursty. Workers execute on Cloudflare&apos;s
                edge network, so the agent runs close to the user wherever they
                are — eliminating the latency of a single centralized origin.{" "}
                <strong className="text-zinc-200">Hono</strong> is a minimal,
                type-safe router built for that runtime: near-zero cold starts and
                negligible per-request overhead. The combination is{" "}
                <strong className="text-zinc-200">serverless by default</strong> —
                no instances to keep warm, no fleet to size — which is exactly the
                profile an unpredictable support workload wants.
              </p>
            </div>
          </div>
        </DocSection>

        {/* 03 — The Constraint Logic */}
        <DocSection label="03 · The Constraint Logic — the 'Why'">
          <div className="space-y-4">
            <p className="max-w-3xl text-[13px] leading-relaxed text-zinc-400">
              A single model —{" "}
              <strong className="text-zinc-200">gemini-flash-latest</strong> —
              handles both embedding and generation. This is an intentional
              reduction in architectural complexity: one provider, one SDK
              surface, one set of credentials, and embedding/query vectors that
              live in the same latent space by construction. Fewer moving parts
              means fewer failure modes and a smaller operational surface to
              reason about.
            </p>
            <p className="max-w-3xl text-[13px] leading-relaxed text-zinc-400">
              The grounding itself is enforced in the system prompt. The model is
              handed the retrieved chunks as its <em>only</em> authority and is
              instructed to refuse anything out of scope — turning &quot;please
              don&apos;t hallucinate&quot; into a hard contract:
            </p>
            <PromptSurface text={GROUNDING_PROMPT} />
          </div>
        </DocSection>

        {/* 04 — Metrics / Impact */}
        <DocSection label="04 · Metrics & Impact">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {IMPACT.map(([title, stat, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-ice/15 bg-ice/[0.04] p-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ice">
                  {title}
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
                  {stat}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </DocSection>
      </div>
    </div>
  );
}
