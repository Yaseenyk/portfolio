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
      "A Rust-powered desktop cockpit for Twitch & YouTube streamers — automating OBS scenes, monitoring chat velocity, and tracking system resources. Architected and brought to production via advanced Claude AI orchestrations.",
    metrics: ["AI-Architected", "Rust / Next.js", "Live Telemetry"],
    tech: ["Rust", "Next.js", "Claude AI", "OBS", "WebSockets"],
    Animation: SystemTelemetry,
  },
  {
    name: "IntegrateX",
    category: "Workflow Automation",
    description:
      "A highly complex workflow-automation UI (similar to n8n) featuring dynamic connectors, nodes, and edges. Engineered a custom Serialization Adapter pattern to radically compress workflow graphs on the wire.",
    metrics: ["94% Smaller Payload", "React Flow", "Zustand"],
    tech: ["React Flow", "Zustand", "TypeScript", "SVG"],
    Animation: NodeGraph,
  },
  {
    name: "Police RAG Agent — POSCO Cases",
    category: "Agentic AI · RAG",
    description:
      "An Agentic RAG pipeline engineered for law enforcement. The LLM autonomously extracts and analyzes dense case details from existing databases to deliver precise, actionable legal statements (Guilty / Not Guilty).",
    metrics: ["Agentic AI", "Vector Retrieval", "LLM Orchestration"],
    tech: ["LLM", "Vector DB", "Prompt Orchestration", "Python"],
    Animation: DocumentScan,
  },
  {
    name: "CMZ App — Enterprise Admin Portal",
    category: "Enterprise · Admin Portal",
    description:
      "A large-scale React/TS/Node application serving 4,000+ active users. Implemented Redis caching, RBAC via JWT, and cross-platform real-time sync using WebSockets.",
    metrics: ["25% Lower Latency", "99.9% Uptime", "35% Fewer Errors"],
    tech: ["React", "TypeScript", "Node", "Redis", "JWT", "WebSockets"],
    Animation: RealtimeSync,
  },
  {
    name: "Hospital-API",
    category: "Backend · REST API",
    description:
      "A high-performance Node.js/Express RESTful API managing COVID-19 patient-doctor workflows. Hardened with custom rate-limiting, validation middleware, and heavily optimized MongoDB indexing.",
    metrics: ["40% Less Admin Work", "30% Higher Query Efficiency"],
    tech: ["Node.js", "Express", "MongoDB"],
    Animation: DataSorting,
  },
  {
    name: "Cross-Platform TV Application Suite",
    category: "Embedded · Smart TV",
    description:
      "Architected embedded applications for Samsung, LG, and Vizio Smart TVs using React and vanilla JavaScript. Delivered flawless rendering across 10+ screen resolutions and low-end hardware.",
    metrics: ["30% Retention Boost", "15% Faster Load Times"],
    tech: ["React", "Vanilla JS", "Samsung", "LG", "Vizio"],
    Animation: TVScreen,
  },
  {
    name: "SANKALP",
    category: "Architecture · Refactoring",
    description:
      "Led the complex system architecture and deep code refactoring of a legacy platform, ensuring enterprise-grade scalability, type-safety, and maintainability.",
    metrics: ["System Architecture", "Deep Refactoring"],
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
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-ink/50 backdrop-blur-md transition-all duration-300 hover:border-ice/30 hover:shadow-[0_0_44px_-12px_rgba(103,232,249,0.4)]"
    >
      <div className="grid grid-cols-1 items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
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
