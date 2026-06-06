"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import PulseDot from "./PulseDot";
import { GithubIcon, ExternalLinkIcon } from "./Icons";
import SystemTelemetry from "./projects/SystemTelemetry";
import NodeGraph from "./projects/NodeGraph";
import DocumentScan from "./projects/DocumentScan";
import RealtimeSync from "./projects/RealtimeSync";
import DataSorting from "./projects/DataSorting";
import TVScreen from "./projects/TVScreen";
import Untangle from "./projects/Untangle";

interface Project {
  name: string;
  category: string;
  description: string;
  metrics: string[];
  tech: string[];
  Animation: ComponentType;
}

const PROJECTS: Project[] = [
  {
    name: "streamerOS",
    category: "Flagship · Desktop Cockpit",
    description:
      "A Rust-powered desktop cockpit for streaming professionals, engineered via modular Claude orchestrations. Handles live system telemetry feeds, multi-platform chat velocity streams, and real-time automated OBS scene synchronization.",
    metrics: ["AI-Architected", "Rust / Next.js", "Live Telemetry"],
    tech: ["Rust", "WebSockets", "Claude AI"],
    Animation: SystemTelemetry,
  },
  {
    name: "Police RAG Agent — POSCO Cases",
    category: "Agentic AI · RAG",
    description:
      "An autonomous agentic retrieval-augmented generation engine deployed for law enforcement workflows. Scans massive multi-format legal structures to confidently trace, evaluate, and output systematic verdict matrices directly to investigators.",
    metrics: ["Agentic AI", "Vector Retrieval", "LLM Orchestration"],
    tech: ["LLM", "Vector DB", "Prompt Orchestration", "Python"],
    Animation: DocumentScan,
  },
  {
    name: "IntegrateX",
    category: "Workflow Automation",
    description:
      "An interactive workflow-automation environment featuring responsive connectors, processing layers, and directional edge bindings. Developed a custom state Serialization Adapter architecture to optimize graph serialization over the wire.",
    metrics: ["94% Payload Compression", "React Flow", "Zustand"],
    tech: ["React Flow", "Zustand", "TypeScript"],
    Animation: NodeGraph,
  },
  {
    name: "CMZ App — Enterprise Portal",
    category: "Enterprise · Admin Portal",
    description:
      "A scaled administrative core engine supporting thousands of active endpoints. Hardened through structured cache rings and strict role-based authorization layers for low-latency, high-availability operation.",
    metrics: [
      "25% Latency Reduction",
      "99.9% Uptime",
      "35% Error Elimination",
    ],
    tech: ["React", "TypeScript", "Node", "Redis", "JWT", "WebSockets"],
    Animation: RealtimeSync,
  },
  {
    name: "Hospital-API",
    category: "Backend · REST API",
    description:
      "A high-throughput clinical workflow orchestration platform. Optimizes lookup routines through heavily cached queries and defensive server request-validation pipes for reliable patient-doctor data flow.",
    metrics: [
      "40% Workload Reduction",
      "30% Query Optimization",
      "25% Server Response Accel",
    ],
    tech: ["Node.js", "Express", "MongoDB"],
    Animation: DataSorting,
  },
  {
    name: "Cross-Platform TV Suite",
    category: "Embedded · Smart TV",
    description:
      "Embedded native smart-television systems engineered using modular vanilla abstractions for pristine execution over limited, multi-resolution, low-spec client platforms.",
    metrics: ["30% Retention Boost", "15% Performance Tuning"],
    tech: ["React", "Vanilla JS", "Samsung", "LG", "Vizio"],
    Animation: TVScreen,
  },
  {
    name: "SANKALP",
    category: "Architecture · Refactoring",
    description:
      "Structural system architectural optimization and deep defensive codebase translation for an enterprise core application. Implemented system type-safety definitions and refactored core data channels.",
    metrics: ["System Architecture", "Deep Code Refactoring"],
    tech: ["System Design", "TypeScript", "Refactoring"],
    Animation: Untangle,
  },
];

function MetricPills({ metrics }: { metrics: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {metrics.map((m) => (
        <span
          key={m}
          className="inline-flex items-center gap-2 rounded-full border border-ice/20 bg-ice/[0.06] px-3 py-1.5 text-xs font-medium text-ice"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
          {m}
        </span>
      ))}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { Animation } = project;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-ink/40 backdrop-blur-xl transition-all duration-300 hover:border-ice/30 hover:shadow-[0_0_44px_-12px_rgba(103,232,249,0.4)]"
    >
      <div className="grid grid-cols-1 items-center gap-12 p-8 lg:grid-cols-2 lg:p-12">
        {/* Left — content */}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              {project.category}
            </span>
            <PulseDot />
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {project.name}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>

          <div className="mt-6">
            <MetricPills metrics={project.metrics} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-3">
            <a
              href="#"
              aria-label={`${project.name} source code`}
              className="text-zinc-500 transition-colors duration-200 hover:text-ice"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#"
              aria-label={`${project.name} live demo`}
              className="text-zinc-500 transition-colors duration-200 hover:text-ice"
            >
              <ExternalLinkIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        {/* Right — animation */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-800 bg-ink/40">
          <Animation />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <div id="projects" className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/projects
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>

      <div className="mt-10 space-y-12">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
