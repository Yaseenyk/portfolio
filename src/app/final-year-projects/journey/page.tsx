import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { JOURNEY, JOURNEY_PHASES } from "@/lib/journey";
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
      </section>

      <div className="mt-16 space-y-16">
        {JOURNEY_PHASES.map((p) => (
          <section key={p.phase} id={`phase-${p.phase}`} className="scroll-mt-28">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-purple">
                {String(p.phase).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                {p.title}
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {p.days.map((d) => (
                <article
                  key={d.day}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-200 hover:border-cyan/30"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                    Day {String(d.day).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-zinc-50">
                    {d.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {d.topics.map((t) => (
                      <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ice" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

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
