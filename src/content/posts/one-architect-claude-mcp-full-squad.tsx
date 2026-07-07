import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        Here is the uncomfortable math most engineering leaders haven&apos;t
        run yet: a large share of a product team&apos;s payroll goes to
        translation work — turning decided architecture into typed code,
        writing the CRUD nobody argues about, keeping three layers consistent
        with each other. That work is now automatable to a degree that changes
        staffing math. This post is the exact operating model I use — one
        architect directing Claude through MCP — and what installing it inside
        a company looks like.
      </p>

      <h2>The operating model</h2>
      <p>
        My setup has three layers. At the top, <strong>me</strong>: owning the
        data contracts, the trust boundaries, and the review. In the middle,{" "}
        <strong>Claude</strong> — not as a chat window, but as Claude Code
        running against the real repository with a maintained{" "}
        <code>CLAUDE.md</code> covering the conventions, the architecture, and
        the things it must never do. At the bottom,{" "}
        <strong>MCP servers</strong> that give the model governed hands:
        Postgres for real schema and data, Playwright for driving and
        verifying the actual UI, filesystem and Git for the codebase itself.
      </p>
      <p>
        The result is that a single instruction — &quot;add cursor-based
        pagination to the orders API and update every consumer&quot; — executes
        across database, backend, frontend, and tests in one coordinated pass,
        with the model reading real schema over MCP instead of hallucinating
        it, and verifying its own work in a real browser before I review.
      </p>

      <h2>What this replaces — and what it doesn&apos;t</h2>
      <ul>
        <li>
          <strong>Replaced:</strong> the mechanical middle of feature work —
          scaffolding, wiring, consistency maintenance, test boilerplate,
          migration chores. This was most of the payroll.
        </li>
        <li>
          <strong>Amplified:</strong> the architect. Decisions land in
          production the same day they are made, because there is no handoff
          chain to traverse.
        </li>
        <li>
          <strong>Not replaced:</strong> judgment. Someone still decides what
          the schema is, where the trust boundary sits, and whether the
          generated diff is actually correct. That someone is the hire that
          matters now.
        </li>
      </ul>

      <h2>Installing this at a company: the 30-day version</h2>
      <p>
        This is what I would do in my first month inside a team that
        hasn&apos;t operationalized AI yet:
      </p>
      <ul>
        <li>
          <strong>Week 1 — write the constitution.</strong> A{" "}
          <code>CLAUDE.md</code> per repo: architecture, conventions,
          forbidden patterns, verify commands. This single file is the
          difference between an AI that helps and an AI that vandalizes.
        </li>
        <li>
          <strong>Week 2 — wire MCP to the real systems.</strong> Read-only
          Postgres first, then the design system, then the browser. Governed
          access beats copy-pasted context by an order of magnitude.
        </li>
        <li>
          <strong>Week 3 — pick the worst recurring chore</strong> (migrations,
          test backfill, dependency upgrades) and automate it end-to-end as a
          proof.
        </li>
        <li>
          <strong>Week 4 — measure.</strong> Cycle time on the automated lane
          versus the manual lane, in front of the team. Adoption follows
          evidence, not mandates.
        </li>
      </ul>

      <blockquote>
        Companies do not have an AI-model problem — every vendor sells the same
        models. They have an <em>operating model</em> problem. The winners are
        the ones with an architect who has already run this system in
        production, on their own products, with their own money on the line.
      </blockquote>

      <p>
        I have. Every product on <a href="/products">this site</a> was built
        under exactly this model, and the{" "}
        <a href="/claude-code">Claude Code efficiency roadmap</a> documents the
        playbook lesson by lesson.
      </p>
    </>
  );
}

export const oneArchitectFullSquad: BlogPost = {
  slug: "one-architect-claude-mcp-full-squad",
  title:
    "One Architect + Claude + MCP = A Full Engineering Squad: The Operating Model I'd Install at Your Company",
  description:
    "The exact three-layer operating model — architect, Claude Code, MCP-wired systems — that lets one engineer ship like a squad, and the 30-day plan for installing it inside a real company.",
  keywords: [
    "Claude Code enterprise workflow",
    "MCP Model Context Protocol",
    "AI engineering operating model",
    "reduce engineering costs with AI",
    "AI developer productivity",
    "engineering team efficiency",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Claude", "MCP"],
  takeaways: [
    "The operating model has three layers: an architect owning contracts and review, Claude Code running against the real repo, and MCP servers giving the model governed access to Postgres, the browser, and Git.",
    "It replaces the mechanical middle of feature work — scaffolding, wiring, consistency — which is most of a product team's payroll.",
    "Judgment is not replaced; it becomes the hire that matters: schema, trust boundaries, and adversarial review of generated work.",
    "A 30-day installation plan: write CLAUDE.md constitutions, wire MCP read-only first, automate the worst chore, then measure cycle time publicly.",
  ],
  Body,
};
