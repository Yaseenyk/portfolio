import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import GradientText from "@/components/GradientText";
import WorkflowCanvas from "./WorkflowCanvas";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "A live, interactive React Flow sandbox modelling a workflow-automation pipeline — Webhook Trigger → LLM Processor → Database Write. Drag the nodes, rewire the edges; state is managed with Zustand. A working demonstration of the IntegrateX node-graph architecture.";

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
  alternates: { canonical: `${SITE_URL}/sandbox` },
  openGraph: {
    type: "website",
    title: "Sandbox | Live React Flow Workflow Engine",
    description: DESCRIPTION,
    url: `${SITE_URL}/sandbox`,
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
            <h1 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              ~/sandbox
            </h1>
            <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>

          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            A live <GradientText>workflow engine</GradientText>, not a screenshot.
          </h2>
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
        </main>

        <footer className="mt-20 border-t border-zinc-800/70 py-10 text-sm text-zinc-500">
          © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
        </footer>
      </div>
    </>
  );
}
