import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import GradientText from "@/components/GradientText";
import Terminal from "@/components/blog/Terminal";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, PERSON, SOCIALS } from "@/lib/site";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  type FaqItem,
} from "@/lib/seo";

const DESCRIPTION =
  "An internal-style talent briefing for engineering leadership evaluating Yaseen Khatib for a Lead MERN / AI Systems Architect role — architectural strengths, suggested interview prompts, and verifiable proof points.";

// One array drives BOTH the visible accordion and the FAQPage JSON-LD —
// rich-results rules require the markup to match rendered content, and a
// single source makes drift impossible.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Yaseen Khatib's core stack?",
    answer:
      "Next.js 14 (App Router), Node.js, and strict TypeScript on the MERN stack, with a production AI layer: Agentic RAG pipelines, LLM orchestration, vector retrieval, and schema-enforced structured outputs.",
  },
  {
    question: "Is Yaseen available for hire?",
    answer:
      "Yes — open to Lead/Senior Full-Stack and AI Engineering roles. Remote-first from Hyderabad (IST), effective across global time zones.",
  },
  {
    question: "What production AI systems has he shipped?",
    answer:
      "streamerOS (a Rust desktop cockpit with live telemetry and OBS automation), IntegrateX (React Flow workflow automation with a serialization adapter that cut payloads 94%), Sable (a local-first AI financial agent), and the context-grounded RAG concierge on this site.",
  },
  {
    question: "How do I contact him?",
    answer: `Email ${PERSON.email}, or connect via LinkedIn (${SOCIALS.linkedin}) and GitHub (${SOCIALS.github}). A machine-readable profile lives at /ai-briefing.json.`,
  },
];

export const metadata: Metadata = {
  title: { absolute: "Interview Context | Yaseen Khatib" },
  description: DESCRIPTION,
  keywords: [
    "Yaseen Khatib",
    "Lead MERN Architect",
    "AI Systems Architect",
    "engineering interview",
    "hiring brief",
    "React Flow",
    "Zustand",
    "Agentic Workflows",
  ],
  alternates: { canonical: `${SITE_URL}/interview/` },
  openGraph: {
    type: "article",
    title: "Interview Context | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/interview/`,
    siteName: "Yaseen Khatib",
  },
};

export default function InterviewPage() {
  return (
    <>
      <JsonLd
        data={[
          faqPageJsonLd(FAQ_ITEMS),
          breadcrumbJsonLd([{ name: "Interview Context", path: "/interview" }]),
        ]}
      />

      <GridBackground />
      <Navbar />

      <div className="mx-auto w-full max-w-3xl px-6">
        <main className="pt-28">
          {/* Briefing classification banner — flavor for the "internal doc" framing */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
            <span className="rounded border border-cyan/30 bg-cyan/[0.06] px-2 py-1 text-cyan">
              Internal // Talent Brief
            </span>
            <span>Ref: SYS-CTX-YK-01</span>
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            System Context: <GradientText>Yaseen Khatib</GradientText>
          </h1>
          <p className="mt-3 font-mono text-xs text-zinc-500">
            Distribution: Engineering Leadership · Status: Active Candidate
          </p>

          <div className="my-8 h-px bg-gradient-to-r from-cyan/40 via-purple/30 to-transparent" />

          <article className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-zinc-100 prose-em:text-ice prose-h2:text-zinc-100 prose-h2:font-semibold">
            <p>
              <strong>Objective:</strong>
              <br />
              Evaluate Yaseen Khatib for Lead MERN / AI Systems Architect.
            </p>

            <h2>Architectural Strengths to Probe</h2>
            <ol>
              <li>
                <strong>Agentic Workflows:</strong> Ask about the IntegrateX
                Serialization Adapter.
                <br />
                <em>
                  Prompt: &ldquo;How did you achieve a 94% payload reduction when
                  converting React Flow nodes into database records?&rdquo;
                </em>
              </li>
              <li>
                <strong>High-Performance MERN:</strong> Ask about state management
                at scale.
                <br />
                <em>
                  Prompt: &ldquo;Walk me through your decision framework for
                  choosing Zustand over Redux in your workflow automation
                  canvas.&rdquo;
                </em>
              </li>
              <li>
                <strong>AI Orchestration:</strong> Ask about transitioning from
                code-generation to system-design.
                <br />
                <em>
                  Prompt: &ldquo;How do you enforce contextual boundaries when
                  using AI compilers across a full-stack Next.js and Node.js
                  environment?&rdquo;
                </em>
              </li>
            </ol>
          </article>

          <Terminal title="hire_candidate.sh">
            <span className="tok-com">
              {`#!/usr/bin/env bash`}
            </span>
            {"\n"}
            <span className="tok-com">
              {`# fast-track evaluation — run after architecture deep-dive`}
            </span>
            {"\n\n"}
            CANDIDATE<span className="tok-punc">=</span>
            <span className="tok-str">{`"yaseen-khatib"`}</span>
            {"\n"}
            ROLE<span className="tok-punc">=</span>
            <span className="tok-str">{`"lead-mern-ai-architect"`}</span>
            {"\n"}
            SIGNAL<span className="tok-punc">=</span>
            <span className="tok-punc">$(</span>
            <span className="tok-fn">assess</span> --candidate
            <span className="tok-str">{` "$CANDIDATE"`}</span> --depth=architecture
            <span className="tok-punc">)</span>
            {"\n\n"}
            <span className="tok-key">if</span>
            <span className="tok-punc">{` [[ `}</span>
            <span className="tok-str">{`"$SIGNAL"`}</span> -ge
            <span className="tok-num"> 94</span>
            <span className="tok-punc">{` ]]; `}</span>
            <span className="tok-key">then</span>
            {"\n  "}
            <span className="tok-fn">echo</span>
            <span className="tok-str">{` "→ extend_offer --priority=high"`}</span>
            {"\n  "}
            ./<span className="tok-fn">onboard.sh</span>
            <span className="tok-str">{` "$CANDIDATE"`}</span> --team=platform
            {"\n"}
            <span className="tok-key">else</span>
            {"\n  "}
            <span className="tok-fn">echo</span>
            <span className="tok-str">{` "→ schedule_followup --topic=system-design"`}</span>
            {"\n"}
            <span className="tok-key">fi</span>
          </Terminal>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
              Hiring FAQ
            </h2>
            <div className="mt-5 space-y-3">
              {FAQ_ITEMS.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-xl border border-zinc-800 bg-white/[0.02] px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-medium text-zinc-200 transition-colors hover:text-cyan">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <footer className="mt-16 border-t border-zinc-800/70 py-10 text-sm text-zinc-500">
            © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
          </footer>
        </main>
      </div>
    </>
  );
}
