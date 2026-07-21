import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import GradientText from "@/components/GradientText";
import WorkflowCanvas from "./WorkflowCanvas";
import SerializationBench from "./SerializationBench";
import ArchitecturePipeline from "@/components/ArchitecturePipeline";
import FinOpsSimulator from "@/components/widgets/FinOpsSimulator";
import ChaosToggle from "@/components/widgets/ChaosToggle";
import RagTraceWaterfall from "@/components/widgets/RagTraceWaterfall";
import GuardrailPlayground from "@/components/widgets/GuardrailPlayground";
import WebVitalsPanel from "@/components/widgets/WebVitalsPanel";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "An interactive engineering lab: a live React Flow workflow canvas with a real-time serialization bench proving the 94% payload reduction, an AI FinOps cost simulator, a chaos-engineering degrader, a RAG trace waterfall with semantic caching, an attackable guardrail playground, and this page's own live Core Web Vitals.";

export const metadata: Metadata = {
  title: { absolute: "Sandbox | Live React Flow Workflow Engine" },
  description: DESCRIPTION,
  keywords: [
    "React Flow",
    "Zustand",
    "workflow automation",
    "node graph",
    "interactive demo",
    "LLM pipeline",
    "IntegrateX",
    "TypeScript",
  ],
  alternates: { canonical: `${SITE_URL}/sandbox/` },
  openGraph: {
    type: "website",
    title: "Sandbox | Live React Flow Workflow Engine",
    description: DESCRIPTION,
    url: `${SITE_URL}/sandbox/`,
    siteName: "Yaseen Khatib",
  },
};

export default function SandboxPage() {
  return (
    <>
      <GridBackground />
      <Navbar />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
        <main className="pt-28">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              ~/sandbox
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>

          {/* The descriptive title is the h1 — the eyebrow is decoration */}
          <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            A live <GradientText>workflow engine</GradientText>, not a screenshot.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
            This is the architecture behind IntegrateX, running in your browser.
            Drag the nodes, drag from one handle to another to rewire the graph —
            every change flows through a Zustand store, the same pattern that
            powers the production serialization adapter. Pipeline:{" "}
            <span className="font-mono text-cyan">Webhook Trigger</span> →{" "}
            <span className="font-mono text-purple">LLM Processor</span> →{" "}
            <span className="font-mono text-ice">Database Write</span>.
          </p>

          <div className="mt-10">
            <WorkflowCanvas />
          </div>

          <p className="mt-4 font-mono text-[11px] text-zinc-600">
            React Flow + Zustand · drag nodes to reposition · drag between
            handles to connect
          </p>

          {/* Live proof of the 94% serialization claim, fed by the canvas above */}
          <SerializationBench />

          {/* The hold-to-engage pipeline mini-game (moved here from the
              homepage — it belongs with the other interactive exhibits) */}
          <div className="mt-24">
            <ArchitecturePipeline />
          </div>

          <section className="mt-24" aria-labelledby="lab-heading">
            <div className="flex items-center gap-3">
              <h2
                id="lab-heading"
                className="font-mono text-xs uppercase tracking-[0.25em] text-cyan"
              >
                ~/lab
              </h2>
              <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>

            <h3 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Infrastructure &amp; <GradientText>Resiliency Lab</GradientText>
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Interactive demonstrations of production-grade LLM cost governance
              and client-side network degradation recovery.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <FinOpsSimulator />
              <ChaosToggle />
            </div>
          </section>

          <section className="mt-24" aria-labelledby="obs-heading">
            <div className="flex items-center gap-3">
              <h2
                id="obs-heading"
                className="font-mono text-xs uppercase tracking-[0.25em] text-cyan"
              >
                ~/observability
              </h2>
              <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
            <h3 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Every AI request is a <GradientText>trace</GradientText>.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              A RAG pipeline you can&apos;t see span-by-span is a pipeline you
              can&apos;t debug or price. Run the query cold, then flip the
              semantic cache on and watch the same question collapse to a
              handful of milliseconds.
            </p>
            <div className="mt-10">
              <RagTraceWaterfall />
            </div>
          </section>

          <section className="mt-24" aria-labelledby="guard-heading">
            <div className="flex items-center gap-3">
              <h2
                id="guard-heading"
                className="font-mono text-xs uppercase tracking-[0.25em] text-cyan"
              >
                ~/guardrails
              </h2>
              <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
            <h3 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Go ahead — <GradientText>attack it</GradientText>.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Production agents survive adversarial input through layered,
              deterministic defenses — not polite prompting. Try an injection,
              leak some PII, ask something off-topic, and watch each layer rule
              on it.
            </p>
            <div className="mt-10">
              <GuardrailPlayground />
            </div>
          </section>

          <section className="mt-24" aria-labelledby="vitals-heading">
            <div className="flex items-center gap-3">
              <h2
                id="vitals-heading"
                className="font-mono text-xs uppercase tracking-[0.25em] text-cyan"
              >
                ~/vitals
              </h2>
              <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
            <div className="mt-10">
              <WebVitalsPanel />
            </div>
          </section>
        </main>

        <footer className="mt-20 border-t border-zinc-800/70 py-10 text-sm text-zinc-500">
          © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
        </footer>
      </div>
    </>
  );
}
