import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        You know the drill you&apos;ve typed into Claude too many times: &quot;cut
        a release — bump the version, update the changelog from the commits since
        the last tag, run the build, then draft the GitHub release notes.&quot;
        Under deadline, human RAM drops a frame, a step gets skipped, and the
        output drifts. Copy‑pasting prose isn&apos;t reuse; it&apos;s entropy. A
        Skill is a small, discoverable, versioned task script the agent loads on
        demand and runs the same way every time.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        A Skill is a folder with a <code>SKILL.md</code> at its root: YAML
        frontmatter declaring a <code>name</code> and a <code>description</code>,
        followed by the instructions the agent should follow when the skill fires.
        The crucial design property is <strong>progressive disclosure</strong>.
        Only the name and description sit in the context window by default — a few
        tokens advertising the capability. The full instruction body loads{" "}
        <em>only</em> when the model decides the skill is relevant. That keeps the
        wire lean, prevents context bloat, and lets you ship fifty skills without
        paying for fifty skills&apos; worth of context on every turn.
      </p>
      <p>
        That makes the <code>description</code> the single most important line in
        the file — it&apos;s the entire basis on which the model decides whether to
        invoke. Same lesson as tool descriptions (Lesson 4), same stakes: state
        precisely what the skill does and the trigger conditions for using it.
        &quot;Cut a release: bump version, regenerate changelog, build, draft
        notes&quot; gets selected at the right moment; &quot;release helper&quot;
        does not. The description is a routing decision encoded as prose.
      </p>
      <p>
        Skills compose with everything earlier in the series, which is what makes
        them more than prompt snippets. In the pattern I call{" "}
        <em>Trinity Architecture</em>, the chat surface is Presentation, the skill
        body is the Reactive Orchestrator that sequences work and guards
        boundaries, and MCP tools / structured output / gated shell calls play the
        Data / Serialization Adapter role to touch the outside world. The body can
        call MCP tools (Lesson 5), enforce structured output (Lesson 3), and run
        shell commands that the permission layer gates (Lesson 7). It can bundle
        supporting files — scripts, templates, reference docs — that the agent
        pulls in only when needed. The skill becomes the orchestrator; the
        primitives underneath it do the work.
      </p>
      <p>
        The trade-off is curation. Skills are cheap to add and that&apos;s the
        trap — a sprawl of overlapping, vaguely-described skills produces
        misrouting, where the model picks the wrong one or none. Treat your skill
        library like a public API: few, sharp, non-overlapping capabilities with
        descriptions precise enough that selection is unambiguous. A small set of
        well-scoped skills beats a large set of fuzzy ones, every time.
      </p>

      <h2>A Release Skill</h2>
      <p>
        Frontmatter advertises the capability cheaply; the body — loaded only on
        invocation — is the deterministic script.
      </p>
      <Terminal title="skills/cut-release/SKILL.md">
        {`---
name: cut-release
description: >
  Cut a release for this repo. Use when asked to "cut a release",
  "ship a version", or "tag a release". Bumps the version, regenerates
  the changelog from commits since the last tag, builds, and drafts
  GitHub release notes. Does NOT push or publish without confirmation.
---

# Cut a release

Follow these steps in order. Stop and ask before any push/publish.

1. Determine the bump (patch/minor/major) from the commits since the
   last tag. If ambiguous, ask.
2. Run \`pnpm version <bump> --no-git-tag-version\`.
3. Regenerate \`CHANGELOG.md\`: group commits since the last tag by
   Conventional-Commit type (feat / fix / chore). Use the template in
   \`./changelog-section.md\`.
4. Run \`pnpm build && pnpm test\`. If either fails, stop and report.
5. Draft GitHub release notes from the new changelog section. Output
   them in a \`<release_notes>\` block — do not post them.
6. Summarize what changed and wait for go-ahead to tag and push.`}
      </Terminal>
      <p>
        Invoke it with <code>/cut-release</code> (or just describe the intent) and
        the agent loads this body, follows the steps deterministically, and stops
        at the boundary you defined — the same sequence, every release, with no
        reconstruction from memory.
      </p>

      <h2>Progressive Disclosure</h2>
      <Diagram
        label="Progressive disclosure of Claude Skills: many skill names and descriptions sit cheaply in context, a trigger matches one, only that skill's full instruction body and bundled files load, and the agent executes against underlying tools."
        caption="Names cost a few tokens each; only the matched skill's full body loads. Ship fifty, pay for one."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <marker id="an8-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
          </defs>

          {/* registry of cheap descriptors */}
          <text x="130" y="34" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">always in context</text>
          {["cut-release", "triage-bug", "audit-deps", "gen-migration"].map((s, i) => (
            <g key={s}>
              <rect x="34" y={48 + i * 46} width="192" height="34" rx="6" fill="#0b1220" stroke={i === 0 ? "#22d3ee" : "#1e3a44"} strokeWidth={i === 0 ? 2 : 1.2} />
              <text x="48" y={70 + i * 46} fill={i === 0 ? "#67e8f9" : "#7f8ea3"} fontFamily="monospace" fontSize="12">{s} · desc</text>
            </g>
          ))}
          <text x="130" y="252" fill="#64748b" fontFamily="monospace" fontSize="10" textAnchor="middle">~few tokens each</text>

          {/* trigger match */}
          <line x1="226" y1="65" x2="300" y2="120" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an8-arrow)" />
          <rect x="302" y="98" width="150" height="50" rx="8" fill="#160d1f" stroke="#a855f7" strokeWidth="2" />
          <text x="377" y="120" fill="#c4b5fd" fontFamily="monospace" fontSize="12" textAnchor="middle">match: cut-release</text>
          <text x="377" y="138" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">on demand</text>

          {/* full body loads */}
          <line x1="452" y1="123" x2="522" y2="123" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an8-arrow)" />
          <rect x="524" y="78" width="206" height="92" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="627" y="104" fill="#e2e8f0" fontFamily="monospace" fontSize="12" textAnchor="middle">SKILL.md body loads</text>
          <text x="627" y="124" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">+ bundled scripts / templates</text>
          <text x="627" y="142" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">full step-by-step instructions</text>
          <text x="627" y="160" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">(only now in context)</text>

          {/* executes against primitives */}
          <line x1="627" y1="170" x2="627" y2="206" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an8-arrow)" />
          <rect x="430" y="208" width="394" height="44" rx="8" fill="#0b1220" stroke="#a855f7" strokeWidth="1.5" />
          <text x="627" y="235" fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="middle">executes via MCP tools · shell (gated) · structured output</text>
        </svg>
      </Diagram>
      <p>
        Skills are reusable behavior; the next lesson makes all of it cheaper to
        run by reusing the static context itself —{" "}
        <a href="/blog/prompt-caching-deep-dive-latency-cost">
          the prompt caching deep dive
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const buildingCustomSkills: BlogPost = {
  slug: "building-custom-claude-skills-task-scripts",
  title: "Building Custom Claude Skills: Reusable Task Scripts",
  description:
    "Pasting the same instructions isn't reuse. A Claude Skill is a discoverable, versioned task script that loads on demand via progressive disclosure and runs the same way every time.",
  keywords: [
    "Claude Skills",
    "SKILL.md",
    "progressive disclosure",
    "custom skills",
    "agent task scripts",
    "Claude Code skills",
    "skill frontmatter",
    "reusable workflows",
  ],
  publishedAt: "2026-06-03",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude Code", "Developer Tools"],
  takeaways: [
    "A Skill is a folder with a SKILL.md (YAML name + description, then instructions); progressive disclosure keeps only the name and description in context until the model decides the skill is relevant.",
    "The description is the routing decision — it's the sole basis for invocation, so state precisely what the skill does and when to use it.",
    "Skills compose with the primitives: a body can call MCP tools, force structured output, run permission-gated shell commands, and pull in bundled scripts and templates only when needed.",
    "Curate like a public API — a few sharp, non-overlapping skills beat a sprawl of fuzzy ones that cause misrouting.",
  ],
  Body,
};
