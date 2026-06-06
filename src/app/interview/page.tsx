import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import GradientText from "@/components/GradientText";
import Terminal from "@/components/blog/Terminal";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "An internal-style talent briefing for engineering leadership evaluating Yaseen Khatib for a Lead MERN / AI Systems Architect role — architectural strengths, suggested interview prompts, and verifiable proof points.";

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
  alternates: { canonical: `${SITE_URL}/interview` },
  openGraph: {
    type: "article",
    title: "Interview Context | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/interview`,
    siteName: "Yaseen Khatib",
  },
};

export default function InterviewPage() {
  return (
    <>
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

          <footer className="mt-16 border-t border-zinc-800/70 py-10 text-sm text-zinc-500">
            © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
          </footer>
        </main>
      </div>
    </>
  );
}
