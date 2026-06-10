import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        You asked one agent to migrate a 300-file codebase from one ORM to
        another. By file ninety the context window (Lesson 1) is saturated, it&apos;s
        forgotten the conventions it set on file ten, and the whole run is
        sequential — eight hours of wall-clock for work that&apos;s embarrassingly
        parallel. One context can&apos;t hold a migration, and one agent
        can&apos;t parallelize itself. The answer is an orchestrator that fans the
        work out to isolated subagents and fans the results back in.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        The pattern is <strong>orchestrator/worker</strong>. A lightweight
        orchestrator doesn&apos;t do the work — it decomposes the task into
        independent units, routes each to a fresh worker subagent with its own
        clean context window, and aggregates the results. Each worker gets the
        full window for <em>one</em> file instead of a shrinking slice of the
        whole job, so quality stays high deep into a large task. This is divide-
        and-conquer applied to attention budget: you&apos;re not making the model
        smarter, you&apos;re refusing to dilute it.
      </p>
      <p>
        The hard problem when workers run in parallel is <strong>state
        collision</strong>. Two agents editing the same working tree at once
        corrupt each other&apos;s changes. <code>git worktree</code> is the clean
        primitive: each worker gets its own checked-out copy of the repo on its
        own branch, mutates files in genuine isolation, and the orchestrator merges
        the branches at the end. No locks, no shared mutable filesystem, no
        interleaved writes — isolation by construction. The cost is real (disk and
        setup per worktree), so you spin them up only for agents that actually
        mutate files concurrently.
      </p>
      <p>
        Parallelism turns latency from sum into max. Ten files migrated serially is
        ten round-trips end to end; ten workers fanned out with{" "}
        <code>Promise.all</code> finish in roughly the time of the slowest single
        file. The same shift you make with parallel tool calls (Lesson 4), now at
        the agent level. The ceiling is concurrency limits and cost — N workers is
        N times the token spend at that instant — so you cap the fan-out and treat
        a budget as a hard ceiling, not a hope.
      </p>
      <p>
        The trade-offs are coordination and partial failure. Decomposition has to
        produce genuinely independent units — if file B depends on file A&apos;s
        new interface, they can&apos;t run blind in parallel, and naive splitting
        produces merge conflicts the orchestrator has to resolve. And in a fan-out,
        one worker dying must not sink the batch: collect results defensively,
        filter the failures, and retry or report them rather than letting one
        timeout abort the other nine. Fan-out buys speed; disciplined aggregation
        is what makes the speed trustworthy.
      </p>

      <h2>Parallel Subagent Routing</h2>
      <p>
        An orchestrator that fans independent units out to worker agents with the
        Vercel AI SDK, each worker isolated, results aggregated with bounded
        concurrency and per-worker failure handling.
      </p>
      <Terminal title="orchestrator.ts">
        <span className="tok-com">{"// Orchestrator decomposes; workers run in parallel on isolated worktrees."}</span>
        {`
import { anthropic } from "@ai-sdk/anthropic"
import { generateText, tool } from "ai"
import { z } from "zod"
import pLimit from "p-limit"

const limit = pLimit(6)   // hard concurrency cap → bound cost + rate limits

// One worker: a fresh context window scoped to a single file, in its own
// git worktree so concurrent file writes can never collide.
async function migrateFile(file: string) {
  const branch = \`migrate/\${file.replace(/\\W/g, "-")}\`
  const dir = await createWorktree(branch)          // isolated checkout

  const { text } = await generateText({
    model: anthropic("claude-opus-4-8"),
    system: MIGRATION_CONVENTIONS,                  // shared, cacheable prefix
    prompt: \`Migrate \${file} from Sequelize to Drizzle. Edit in place.\`,
    tools: {
      readFile:  tool({ /* scoped to \`dir\` */ }),
      writeFile: tool({ /* scoped to \`dir\` */ }),
    },
    maxSteps: 12,
  })
  return { file, branch, summary: text }
}

export async function runMigration(files: string[]) {
  // Fan out under the cap. settled, not all → one failure can't sink the batch.
  const results = await Promise.allSettled(
    files.map((f) => limit(() => migrateFile(f))),
  )
  const done   = results.filter((r) => r.status === "fulfilled").map((r) => r.value)
  const failed = files.filter((_, i) => results[i].status === "rejected")

  await mergeBranches(done.map((d) => d.branch))    // fan back in
  return { migrated: done.length, failed }          // report, don't swallow
}`}
      </Terminal>
      <p>
        <code>pLimit</code> caps the blast radius, the per-file worktree
        guarantees isolation, and <code>allSettled</code> means a single
        worker&apos;s failure is a line in the report — not an aborted migration.
      </p>

      <h2>Fan Out, Fan In</h2>
      <Diagram
        label="An orchestrator decomposing a large task into independent units, fanning them out to parallel worker subagents each in an isolated git worktree with its own context window, then merging the results back into the main branch."
        caption="Each worker gets a full context window and an isolated worktree. Wall-clock is the slowest worker, not the sum."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <marker id="an11-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
            <marker id="an11-arrow-p" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#a855f7" />
            </marker>
          </defs>

          <rect x="40" y="108" width="150" height="64" rx="9" fill="#0b1220" stroke="#22d3ee" strokeWidth="2" />
          <text x="115" y="135" fill="#67e8f9" fontFamily="monospace" fontSize="13" textAnchor="middle">orchestrator</text>
          <text x="115" y="154" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">decompose · cap · merge</text>

          {[60, 120, 180].map((y, i) => (
            <g key={y}>
              <line x1="190" y1="140" x2="300" y2={y + 22} stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an11-arrow)" />
              <rect x="302" y={y} width="246" height="44" rx="8" fill="#160d1f" stroke="#a855f7" strokeWidth="1.5" />
              <text x="318" y={y + 20} fill="#c4b5fd" fontFamily="monospace" fontSize="11">worker {i + 1} · worktree {i + 1}</text>
              <text x="318" y={y + 36} fill="#7f8ea3" fontFamily="monospace" fontSize="10">fresh context · isolated branch</text>
              <line x1="548" y1={y + 22} x2="600" y2="140" stroke="#a855f7" strokeWidth="2" markerEnd="url(#an11-arrow-p)" />
            </g>
          ))}

          <rect x="602" y="108" width="130" height="64" rx="9" fill="#0b1220" stroke="#22d3ee" strokeWidth="2" />
          <text x="667" y="135" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">merge</text>
          <text x="667" y="154" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">allSettled → main</text>

          <text x="380" y="252" fill="#64748b" fontFamily="monospace" fontSize="11" textAnchor="middle">latency = max(workers), not sum · one failure ≠ aborted batch</text>
        </svg>
      </Diagram>
      <p>
        Fanning out raises a new problem: these agents are stateless and ephemeral.
        Production needs them to survive a crash —{" "}
        <a href="/blog/stateful-agent-runtime-persistence-durable-objects-redis">
          a stateful agent runtime with Durable Objects &amp; Redis
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const multiAgentWorktrees: BlogPost = {
  slug: "multi-agent-worktrees-parallel-subagents",
  title: "Multi-Agent Worktrees & Parallel Subagents",
  description:
    "One context can't hold a migration and one agent can't parallelize itself. An orchestrator fans work out to isolated git-worktree subagents and fans the results back in.",
  keywords: [
    "multi-agent",
    "parallel subagents",
    "git worktree agents",
    "orchestrator worker",
    "Vercel AI SDK",
    "agent fan-out",
    "Claude agents",
    "parallel AI agents",
  ],
  publishedAt: "2026-05-31",
  readingMinutes: 10,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Agents", "Architecture"],
  takeaways: [
    "Use an orchestrator/worker pattern: a lightweight orchestrator decomposes the task and routes each independent unit to a fresh worker subagent with its own clean context window, keeping quality high deep into large tasks.",
    "git worktree isolates concurrent file mutations — each worker checks out its own branch and the orchestrator merges at the end, avoiding state collision without locks.",
    "Fan-out turns latency from sum into max: N workers under Promise.all finish in roughly the slowest worker's time, capped by a hard concurrency limit to bound cost.",
    "Decompose into genuinely independent units and aggregate defensively (allSettled) so one worker's failure is a reported line, not an aborted batch.",
  ],
  Body,
};
