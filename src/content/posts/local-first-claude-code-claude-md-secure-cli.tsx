import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Every new Claude Code session starts the same way: you re-explain that the
        project uses pnpm not npm, that tests run with Vitest, that the API layer
        lives under <code>src/server</code> and must never import from{" "}
        <code>src/ui</code>. You&apos;re paying — in tokens and in your own time —
        to re-teach the same facts daily, and the one session where you forget is
        the one where the agent runs <code>npm install</code> and rewrites your
        lockfile. The local agent needs a standing memory and a hard boundary.
        Both are configuration, not prompting.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        <code>CLAUDE.md</code> is the agent&apos;s standing system prompt for a
        workspace. It loads automatically at the start of every session, so any
        fact you put there is amortized to near-zero cost (Lesson 9 — it caches)
        instead of re-paid per conversation. It resolves in a hierarchy: a global{" "}
        <code>~/.claude/CLAUDE.md</code> for cross-project rules, a project{" "}
        <code>CLAUDE.md</code> checked into the repo for team conventions, and
        local overrides — merged, with the more specific file winning. This is the
        difference between an agent that re-learns your project every morning and
        one that already knows it.
      </p>
      <p>
        The discipline is that a <code>CLAUDE.md</code> is a context-window
        resident, so it is subject to the same budget physics as everything else.
        A bloated one — every edge case, a wall of history, duplicated docs — is
        dead weight re-sent on every turn, and worse, it buries the load-bearing
        rules in noise the model skims past. Treat it like API design: terse,
        imperative, the few invariants that actually change behavior. &quot;Use
        pnpm. Tests: <code>pnpm test</code>. Never edit <code>dist/</code>.&quot;
        beats three paragraphs of prose every time.
      </p>
      <p>
        The second pillar is the permission boundary. The agent can run shell
        commands, and the model is an untrusted planner (Lesson 4) — so the CLI is
        an execution surface that needs an explicit allowlist, not blanket trust.
        Claude Code gates tool use behind a permission model: read-only and safe
        commands can be pre-approved, while destructive or outward-facing
        operations require confirmation. Encoding that allowlist in settings turns
        &quot;hope it doesn&apos;t&quot; into &quot;it can&apos;t&quot; — the agent
        physically cannot run <code>git push --force</code> if it isn&apos;t
        permitted.
      </p>
      <p>
        The two pillars reinforce each other. <code>CLAUDE.md</code> tells the
        agent <em>what</em> to do and the conventions to honor; the permission
        layer enforces <em>what it may never do</em> regardless of what it
        plans. Hooks close the loop with determinism — a pre-commit hook or a
        command-blocking hook is a guardrail the model can&apos;t talk its way
        past, which (Lesson 10) is the only kind of guardrail that survives an
        adversarial input. Configuration over correction: the cheapest mistake is
        the one the runtime makes impossible.
      </p>

      <h2>An Optimized CLAUDE.md</h2>
      <p>
        Terse, imperative, only the invariants that change behavior. Every line
        earns its place in the window.
      </p>
      <Terminal title="CLAUDE.md">
        {`# Project: shop-api

## Stack
- Package manager: **pnpm** (never npm/yarn — it breaks the lockfile).
- Tests: \`pnpm test\` (Vitest). Typecheck: \`pnpm typecheck\`.
- Run all three before reporting any change done.

## Architecture (hard boundaries)
- API + business logic: \`src/server/**\`
- UI: \`src/ui/**\`
- **\`src/server\` must never import from \`src/ui\`** (enforced by eslint
  boundary rule — do not disable it).
- DB access only through \`src/server/db/repo.ts\`. No inline SQL elsewhere.

## Conventions
- Validate all external input with Zod at the route boundary.
- No new files unless asked; prefer editing existing ones.
- \`dist/\` and \`*.lock\` are generated — never hand-edit.

## Don't
- Don't add dependencies without asking.
- Don't write comments that restate the code.`}
      </Terminal>
      <p>
        Pair it with a permission allowlist in <code>.claude/settings.json</code>{" "}
        so safe commands run uninterrupted while anything destructive needs an
        explicit yes.
      </p>
      <Terminal title=".claude/settings.json">
        {`{
  "permissions": {
    "allow": [
      "Bash(pnpm test)",
      "Bash(pnpm typecheck)",
      "Bash(git status)",
      "Bash(git diff:*)"
    ],
    "deny": [
      "Bash(git push --force:*)",
      "Bash(rm -rf:*)",
      "Bash(pnpm publish:*)"
    ]
  }
}`}
      </Terminal>

      <h2>Layered Context &amp; the Permission Gate</h2>
      <Diagram
        label="The local Claude Code workspace: a global, project, and local CLAUDE.md merging into the session's standing context, with all shell commands passing through a permission gate that allows safe commands and blocks destructive ones."
        caption="CLAUDE.md is the standing memory; the permission gate is the hard boundary. Configuration over correction."
      >
        <svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="290" fill="#05070A" />
          <defs>
            <marker id="an7-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
            <marker id="an7-block" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Merge stack */}
          <text x="150" y="34" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">CLAUDE.md hierarchy</text>
          {[
            { t: "~/.claude/CLAUDE.md", s: "global rules" },
            { t: "./CLAUDE.md", s: "project conventions" },
            { t: ".claude/local", s: "local overrides" },
          ].map((r, i) => (
            <g key={r.t}>
              <rect x="40" y={50 + i * 52} width="220" height="42" rx="7" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" opacity={0.6 + i * 0.2} />
              <text x="56" y={70 + i * 52} fill="#e2e8f0" fontFamily="monospace" fontSize="12">{r.t}</text>
              <text x="56" y={85 + i * 52} fill="#7f8ea3" fontFamily="monospace" fontSize="10">{r.s}</text>
            </g>
          ))}
          <line x1="260" y1="130" x2="330" y2="130" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an7-arrow)" />

          {/* Agent */}
          <rect x="332" y="100" width="150" height="60" rx="9" fill="#160d1f" stroke="#a855f7" strokeWidth="2" />
          <text x="407" y="126" fill="#c4b5fd" fontFamily="monospace" fontSize="13" textAnchor="middle">Claude Code</text>
          <text x="407" y="146" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">standing context loaded</text>

          {/* Permission gate */}
          <line x1="482" y1="130" x2="552" y2="130" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an7-arrow)" />
          <rect x="554" y="92" width="176" height="76" rx="9" fill="#0b1220" stroke="#22d3ee" strokeWidth="2" />
          <text x="642" y="118" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">permission gate</text>
          <text x="642" y="138" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">allowlist / denylist</text>
          <text x="642" y="155" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">+ hooks</text>

          {/* Outcomes */}
          <line x1="642" y1="168" x2="560" y2="226" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an7-arrow)" />
          <text x="520" y="248" fill="#67e8f9" fontFamily="monospace" fontSize="11" textAnchor="middle">pnpm test ✓</text>
          <line x1="642" y1="168" x2="724" y2="226" stroke="#ef4444" strokeWidth="2" markerEnd="url(#an7-block)" />
          <text x="700" y="248" fill="#f87171" fontFamily="monospace" fontSize="11" textAnchor="middle">rm -rf ✗</text>
        </svg>
      </Diagram>
      <p>
        A configured workspace is the launchpad for reusable automation. Next, turn
        a repeated workflow into a first-class capability:{" "}
        <a href="/blog/building-custom-claude-skills-task-scripts">
          building custom Claude Skills
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const localFirstClaudeCode: BlogPost = {
  slug: "local-first-claude-code-claude-md-secure-cli",
  title: "Local-First Claude Code: CLAUDE.md & a Secure CLI",
  description:
    "Stop re-teaching your project every session. CLAUDE.md is the agent's standing system prompt; a permission allowlist is its hard boundary. Configuration over correction.",
  keywords: [
    "CLAUDE.md",
    "Claude Code config",
    "agent permissions",
    "secure CLI agent",
    "system files",
    "Claude Code settings",
    "allowlist",
    "local-first AI",
  ],
  publishedAt: "2026-06-04",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude Code", "Developer Tools"],
  takeaways: [
    "CLAUDE.md is the workspace's standing system prompt — it loads every session and caches, so facts in it are amortized to near zero instead of re-explained daily, and it resolves global → project → local with the specific file winning.",
    "Keep it terse and imperative: a CLAUDE.md is a context-window resident, so bloat is dead weight that buries the load-bearing rules in noise.",
    "The CLI is an execution surface for an untrusted planner — encode a permission allowlist/denylist in settings so destructive commands are impossible, not just discouraged.",
    "Hooks add deterministic guardrails the model can't talk past; configuration over correction means making the mistake impossible at the runtime level.",
  ],
  Body,
};
