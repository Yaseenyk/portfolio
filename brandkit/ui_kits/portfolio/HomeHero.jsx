import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { GradientText } from "../../components/core/GradientText.jsx";
import { StatusBadge } from "../../components/badges/StatusBadge.jsx";
import { NeuralCoreArt } from "./NeuralCoreArt.jsx";

/** Homepage hero: badge, display headline with gradient keyword, lead, CTAs, AI-core art. */
export function HomeHero() {
  return (
    <section
      id="top"
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        alignItems: "center",
        gap: "4rem",
        minHeight: "80vh",
        padding: "5rem 0",
      }}
    >
      <div>
        <StatusBadge>Senior MERN + AI Developer</StatusBadge>
        <h1
          style={{
            margin: "2rem 0 0",
            fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            color: "var(--text-heading)",
            textWrap: "balance",
          }}
        >
          Architecting Scalable Systems.
          <br />
          Delivering at <GradientText style={{ whiteSpace: "nowrap" }}>AI-Speed.</GradientText>
        </h1>
        <p style={{ margin: "2rem 0 0", maxWidth: "36rem", fontSize: 18, lineHeight: 1.625, color: "var(--zinc-400)" }}>
          Yaseen Khatib is a Senior MERN Stack &amp; AI Systems Engineer who bridges high-performance MERN
          architectures with autonomous AI systems. He specializes in Agentic RAG pipelines, LLM orchestration,
          and high-throughput backend scaling — architecting and shipping production systems at AI-speed.
        </p>
        <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
          <Button icon="arrow-right" href="#dashboard">View Architecture</Button>
          <Button variant="secondary" icon="download" href="#">Download CV</Button>
        </div>
      </div>
      <NeuralCoreArt></NeuralCoreArt>
    </section>
  );
}
