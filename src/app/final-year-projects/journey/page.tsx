import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { JOURNEY } from "@/lib/journey";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusLeadForm from "@/components/campus/CampusLeadForm";
import StickyActionBar from "@/components/campus/StickyActionBar";

const DESCRIPTION =
  "A 16-day live program — 4 hours a day, 64 hours total — taking you from how LLMs actually work through embeddings, vector search and RAG to agents, guardrails and a full system-design capstone.";

export const metadata: Metadata = {
  title: "The 16-Day AI Engineering Journey — Live, 4 Hours a Day",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/journey/` },
  openGraph: {
    type: "website",
    title: "The 16-Day AI Engineering Journey",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/guides.jpg`],
  },
};

const META_CHIPS = [
  `${JOURNEY.days} days`,
  `${JOURNEY.hoursPerDay} hours / day`,
  `${JOURNEY.totalHours} hours live`,
  JOURNEY.format,
];

export default function JourneyPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
        ])}
      />

      <header>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/final-year-projects/journey
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          The 16-day AI Engineering Journey
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Four phases, sixteen live sessions, four hours a day. It starts at
          &ldquo;how does an LLM actually work&rdquo; and ends with you
          whiteboarding an enterprise AI system — the same stack of skills
          behind every RAG and agent system on this site.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {META_CHIPS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-cyan/30 bg-cyan/[0.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ice"
            >
              {c}
            </span>
          ))}
        </div>
      </header>

      {/* Foundations chapters — read like a book before (and alongside) the
          live days. Clickable; more chapters land here as they are written. */}
      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Start here · Foundations chapters
        </h2>
        <Link
          href="/final-year-projects/journey/domains/"
          className="group mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
              Chapter 01 · Domains
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              How software actually works, in plain words
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              Frontend, backend, database, dev vs production, bugs and
              hotfixes — the full map, explained like a mentor would, with
              zero heavy words. Read this first.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </Link>
        <Link
          href="/final-year-projects/journey/frontend/"
          className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
              Chapter 02 · Frontend, with Claude Code
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              Building the frontend the way it works now
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              Claude Code setup, CLAUDE.md, feeding docs to the AI, MCPs
              (giving it eyes), the AI-friendly folder structure, and the
              plan → build → verify loop you will run every day.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </Link>
        <Link
          href="/final-year-projects/journey/backend/"
          className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
              Chapter 03 · Backend, with Claude Code
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              Building the part nobody sees
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              Routes, validation, business rules, auth and status codes in
              plain words — with the API contract as the spec and tests as
              the backend&apos;s eyes.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </Link>
        <Link
          href="/final-year-projects/journey/database/"
          className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
              Chapter 04 · Database, with Claude Code
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              The memory that must never lie
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              Tables and relationships, schema from a data-model doc,
              migrations, indexes, injection, backups — and why production
              data stays sacred.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </Link>
        <Link
          href="/final-year-projects/journey/llm/"
          className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
              Chapter 05 · The LLM, from scratch
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              What an LLM actually is, and how one gets built
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              Next-word prediction, tokens, parameters, attention, and the
              full build pipeline — data, pretraining, fine-tuning, RLHF —
              and the people behind every stage.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </Link>
        <Link
          href="/final-year-projects/journey/using-llms/"
          className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
              Chapter 06 · Using an LLM
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              The knobs, the wire, and the bill
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              The API call, system vs user prompts, temperature, top-p and
              top-k, max tokens, streaming, token cost, hosted vs local —
              and why the key never touches the frontend.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </Link>
        <Link
          href="/final-year-projects/journey/prompting/"
          className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
              Chapter 07 · Prompting that works
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              Getting the answer you actually wanted
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              System prompts, zero/few-shot and chain-of-thought, forcing
              strict JSON, and the failure side — reducing hallucination and
              defending against prompt injection.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </Link>
        {[
          {
            href: "/final-year-projects/journey/embeddings/",
            n: "Chapter 08 · Meaning as numbers",
            title: "Turning meaning into numbers",
            desc: "Embeddings, vector space without heavy maths, and cosine similarity — how a computer measures that two different sentences mean the same thing.",
          },
          {
            href: "/final-year-projects/journey/vector-search/",
            n: "Chapter 09 · Finding by meaning",
            title: "Vector search, at scale",
            desc: "Chunking, why normal databases can't search by meaning, vector databases and nearest-neighbour search, and building real semantic search.",
          },
          {
            href: "/final-year-projects/journey/rag/",
            n: "Chapter 10 · RAG",
            title: "Answers grounded in your documents",
            desc: "Retrieval-augmented generation end to end: the grounding contract, citations, honest refusal, and the advanced techniques that make it reliable.",
          },
          {
            href: "/final-year-projects/journey/agents/",
            n: "Chapter 11 · Models that act",
            title: "AI agents and tool calling",
            desc: "Tool calling, the think-act-observe loop, connecting a model to real functions, multi-agent systems, and the safety that agency demands.",
          },
          {
            href: "/final-year-projects/journey/production/",
            n: "Chapter 12 · Production & capstone",
            title: "Making it safe, and making it yours",
            desc: "Guardrails, PII redaction, rate limiting and cost control, the full capstone architecture, and the career roadmap from here to a job.",
          },
          {
            href: "/final-year-projects/journey/advanced-rag/",
            n: "Chapter 13 · Going deeper · Advanced RAG",
            title: "When basic RAG isn't good enough",
            desc: "Query expansion, hybrid search, re-ranking, better chunking and metadata — each a targeted fix for a specific retrieval failure.",
          },
          {
            href: "/final-year-projects/journey/evaluation/",
            n: "Chapter 14 · Evaluation",
            title: "Testing a thing that never answers the same way twice",
            desc: "Golden datasets, grading retrieval vs answer quality, LLM-as-judge, and catching regressions before your users do.",
          },
          {
            href: "/final-year-projects/journey/scaling/",
            n: "Chapter 15 · Scale & real-time",
            title: "When the model is slow and the users are many",
            desc: "The timeout problem, streaming, async architectures and queues, WebSockets vs polling, caching, and keeping cost sane at scale.",
          },
          {
            href: "/final-year-projects/journey/fine-tuning/",
            n: "Chapter 16 · The finale",
            title: "Fine-tuning, and where you go from here",
            desc: "Prompt vs RAG vs fine-tuning and when to use each, how fine-tuning really works, who trains models, and the roadmap from here to a career.",
          },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple/30 bg-purple/[0.05] p-6 transition-colors duration-200 hover:border-purple/60"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
                {c.n}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
                {c.title}
              </h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
                {c.desc}
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ice transition-transform duration-200 group-hover:translate-x-1">
              Read →
            </span>
          </Link>
        ))}
      </section>

      <div className="mt-20">
        <CampusLeadForm
          projectTitle="16-Day AI Engineering Journey"
          heading="Reserve a seat on the next batch"
          intro="Tell me your course and where you are with AI, and I'll reply with the batch schedule, fee, and whether this journey fits where you're trying to get to."
          messageLabel="Where are you starting from?"
          messagePlaceholder="Your course, how comfortable you are with code, and what you want out of the 16 days…"
        />
      </div>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
