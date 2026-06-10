import React, { useState } from "react";
import { TerminalPath } from "../../components/core/TerminalPath.jsx";
import { PulseDot } from "../../components/core/PulseDot.jsx";
import { GithubIcon, ExternalLinkIcon } from "../../components/core/Icons.jsx";
import { GlassCard } from "../../components/surfaces/GlassCard.jsx";
import { WindowFrame } from "../../components/surfaces/WindowFrame.jsx";
import { Terminal } from "../../components/surfaces/Terminal.jsx";
import { MetricPill } from "../../components/badges/MetricPill.jsx";
import { TechChip } from "../../components/badges/TechChip.jsx";
import { RoiNote } from "../../components/badges/RoiNote.jsx";
import { NeuralCoreArt } from "./NeuralCoreArt.jsx";

const PROJECTS = [
  {
    name: "streamerOS",
    category: "Flagship · Desktop Cockpit",
    description:
      "A Rust-powered desktop cockpit for streaming professionals, engineered via modular Claude orchestrations. Handles live system telemetry feeds, multi-platform chat velocity streams, and real-time automated OBS scene synchronization.",
    metrics: ["AI-Architected", "Rust / Next.js", "Live Telemetry"],
    tech: ["Rust", "WebSockets", "Claude AI"],
  },
  {
    name: "IntegrateX",
    category: "Workflow Automation",
    description:
      "An interactive workflow-automation environment featuring responsive connectors, processing layers, and directional edge bindings. Developed a custom state Serialization Adapter architecture to optimize graph serialization over the wire.",
    roi: "Achieved 94% reduction in workflow payload size by implementing a custom Serialization Adapter pattern, drastically lowering database I/O.",
    metrics: ["94% Payload Compression", "React Flow", "Zustand"],
    tech: ["React Flow", "Zustand", "TypeScript"],
    supplement: true,
  },
];

function ProjectRow({ project }) {
  const [showDocs, setShowDocs] = useState(false);
  return (
    <GlassCard hover="glow" style={{ overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "3rem", padding: "3rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="sk-category">{project.category}</span>
            <PulseDot></PulseDot>
          </div>
          <h3 style={{ margin: "1.25rem 0 0", fontSize: "1.75rem", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--zinc-50)" }}>
            {project.name}
          </h3>
          <p style={{ margin: "1rem 0 0", fontSize: 14, lineHeight: 1.625, color: "var(--zinc-400)" }}>{project.description}</p>
          {project.roi ? <div style={{ marginTop: "1.25rem" }}><RoiNote>{project.roi}</RoiNote></div> : null}
          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.metrics.map((m) => <MetricPill key={m}>{m}</MetricPill>)}
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tech.map((t) => <TechChip key={t}>{t}</TechChip>)}
          </div>
          <div style={{ marginTop: "1.75rem", display: "flex", gap: 12, color: "var(--zinc-500)" }}>
            <GithubIcon style={{ width: 18, height: 18 }}></GithubIcon>
            <ExternalLinkIcon style={{ width: 18, height: 18 }}></ExternalLinkIcon>
          </div>
        </div>
        <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", borderRadius: 12, border: "1px solid var(--zinc-800)", background: "rgba(5,7,10,.4)", display: "grid", placeItems: "center" }}>
          <NeuralCoreArt></NeuralCoreArt>
        </div>
      </div>
      {project.supplement ? (
        <div style={{ borderTop: "1px solid rgba(39,39,42,.5)", padding: "0 3rem 3rem" }}>
          <button
            type="button"
            onClick={() => setShowDocs((v) => !v)}
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 9999,
              border: "1px solid rgba(34,211,238,.3)",
              background: "rgba(34,211,238,.06)",
              padding: "8px 16px",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--cyan)",
              cursor: "pointer",
            }}
          >
            <span style={{ display: "inline-block", transition: "transform .2s", transform: showDocs ? "rotate(90deg)" : "none" }}>▸</span>
            {showDocs ? "Hide shadow documentation" : "View shadow documentation"}
          </button>
          {showDocs ? (
            <div style={{ paddingTop: "1.5rem" }}>
              <Terminal title="serialization-adapter.ts">
                <span className="tok-com">{"// 94% smaller graph payloads over the wire"}</span>{"\n"}
                <span className="tok-key">const</span> adapter = <span className="tok-fn">createAdapter</span>(<span className="tok-str">"react-flow"</span>);{"\n"}
                adapter.<span className="tok-fn">compress</span>(graph, {"{"} dedupe: <span className="tok-key">true</span>, topK: <span className="tok-num">8</span> {"}"});
              </Terminal>
            </div>
          ) : null}
        </div>
      ) : null}
    </GlassCard>
  );
}

/** The "mission control" dashboard window housing the projects section. */
export function HomeProjects() {
  return (
    <section id="dashboard" style={{ paddingBottom: "7rem", scrollMarginTop: "1.5rem" }}>
      <WindowFrame title="portfolio -- interactive-mode" status="live">
        <div style={{ padding: "3rem", display: "grid", gap: "3rem" }}>
          <TerminalPath path="~/projects"></TerminalPath>
          {PROJECTS.map((p) => <ProjectRow key={p.name} project={p}></ProjectRow>)}
        </div>
      </WindowFrame>
    </section>
  );
}
