import React from "react";
import { TerminalPath } from "../../components/core/TerminalPath.jsx";
import { TextLink } from "../../components/core/TextLink.jsx";
import { GlassCard } from "../../components/surfaces/GlassCard.jsx";

const POSTS = [
  {
    title: "Agentic Control Loops",
    description: "Why the orchestrator–worker pattern beats monolithic prompts for long-horizon agent tasks, and how to budget tokens across the loop.",
    date: "Jun 2, 2026",
    minutes: 7,
  },
  {
    title: "Zero-Hallucination RAG: the Grounding Contract",
    description: "Designing retrieval pipelines that refuse out-of-scope answers — schema, refusal prompts, and evaluation against a golden dataset.",
    date: "May 26, 2026",
    minutes: 9,
  },
  {
    title: "94% Payload Reduction with React Flow",
    description: "A custom Serialization Adapter pattern for workflow graphs that collapses redundant node state before it ever hits the wire.",
    date: "May 19, 2026",
    minutes: 6,
  },
];

/** "~/field-notes" — recent blog post cards. */
export function HomePosts() {
  return (
    <section id="blog" style={{ padding: "0 0 6rem", scrollMarginTop: "6rem" }}>
      <TerminalPath path="~/field-notes" action="View all →" actionHref="#blog"></TerminalPath>
      <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {POSTS.map((post) => (
          <GlassCard key={post.title} hover="lift" style={{ display: "flex", flexDirection: "column", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--zinc-500)" }}>
              <time>{post.date}</time>
              <span>{post.minutes} min</span>
            </div>
            <h3 style={{ margin: "1rem 0 0", fontSize: 18, fontWeight: 600, lineHeight: 1.375, letterSpacing: "-0.025em", color: "var(--zinc-50)" }}>{post.title}</h3>
            <p style={{ margin: "0.75rem 0 0", flex: 1, fontSize: 14, lineHeight: 1.625, color: "var(--zinc-400)" }}>{post.description}</p>
            <div style={{ marginTop: "1.5rem" }}>
              <TextLink href="#blog" arrow="right" style={{ fontSize: 14, fontWeight: 500, color: "var(--cyan)" }}>Read Article</TextLink>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
