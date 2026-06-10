import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Your agent is twenty tool calls into a forty-step refactor when the worker
        process is recycled, the deploy rolls, or the request times out. Every
        decision, every file it touched, every dollar of tokens — gone. It starts
        over from message one, or worse, re-runs side effects it already
        committed. A Claude model is stateless by design (Lesson 1); making a
        long-running <em>agent</em> survive a crash is entirely your runtime&apos;s
        job. The answer is checkpointing.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        The agent loop (Lesson 4) is a state machine: messages, the current step,
        accumulated results, token spend. If that state lives only in process
        memory, a restart erases it. <strong>Checkpointing</strong> persists the
        state machine after every meaningful transition so the agent can resume
        from the last good point instead of the beginning. The unit of recovery
        is the step: write the new state durably the instant a step completes, and
        a crash costs you one step of replay, not the whole run.
      </p>
      <p>
        Where you persist it shapes correctness. <strong>Durable Objects</strong>{" "}
        give you a single-threaded, single-instance coordinator per agent —
        strongly-consistent storage with no two-writers race, which is exactly
        what a sequential agent loop wants. <strong>Redis</strong> complements it:
        fast shared state, work queues for fan-out (Lesson 11), distributed locks,
        and TTL&apos;d scratch space. A common split is a Durable Object as the
        authoritative per-agent checkpoint and coordinator, with Redis carrying
        the high-throughput queue and cache traffic around it.
      </p>
      <p>
        Resumption forces <strong>idempotency</strong>, and this is the subtle
        part. If a step issued a refund and then crashed before the checkpoint
        committed, naive replay issues a second refund. Every side-effecting step
        needs an idempotency key and a durable record of completion, so replay
        recognizes &quot;already done&quot; and skips it. Persisting the
        transcript is the easy half; making external effects exactly-once across a
        restart is the half that actually keeps you out of the incident channel —
        and it&apos;s the same audit-trail discipline as the guardrail layer
        (Lesson 10).
      </p>
      <p>
        The trade-off is latency and complexity versus durability. A checkpoint
        write after every step adds round-trips to durable storage, so for cheap,
        idempotent, retry-the-whole-thing tasks it&apos;s overkill — just rerun.
        Checkpointing earns its cost when a run is long, expensive, or has
        committed side effects you cannot afford to repeat or lose. Match the
        persistence to the blast radius of a restart: ephemeral for throwaway
        tasks, durable-and-idempotent for anything that moved money or mutated
        production.
      </p>

      <h2>A Checkpointed Agent Loop</h2>
      <p>
        State persists after every step; resume rehydrates it; side effects guard
        on an idempotency key so replay never double-fires.
      </p>
      <Terminal title="durable-agent.ts">
        <span className="tok-com">{"// Persist after every step. A crash costs one step of replay, not the run."}</span>
        {`
type AgentState = {
  runId: string
  step: number
  messages: MessageParam[]
  tokensSpent: number
  done: Set<string>        // idempotency keys of completed side effects
}

export class AgentDO {            // one Durable Object instance per run
  constructor(private store: DurableStore, private redis: Redis) {}

  async resumeOrStart(runId: string, prompt: string) {
    // Rehydrate from the last checkpoint, or start fresh.
    let state = (await this.store.get<AgentState>(runId))
      ?? { runId, step: 0, messages: [{ role: "user", content: prompt }],
           tokensSpent: 0, done: new Set() }

    while (true) {
      const res = await anthropic.messages.create({
        model: "claude-opus-4-8", max_tokens: 1024, tools, messages: state.messages,
      })
      state.messages.push({ role: "assistant", content: res.content })
      state.tokensSpent += res.usage.input_tokens + res.usage.output_tokens

      if (res.stop_reason !== "tool_use") break

      const results = []
      for (const call of res.content.filter((b) => b.type === "tool_use")) {
        const key = \`\${runId}:\${call.id}\`
        // Idempotency: skip any side effect this run already committed.
        const out = state.done.has(key)
          ? await this.redis.get(key)
          : await this.execAndRecord(key, call, state)
        results.push({ type: "tool_result", tool_use_id: call.id, content: out })
      }
      state.messages.push({ role: "user", content: results })
      state.step++

      await this.store.put(runId, state)   // ← checkpoint. Durable, after each step.
    }
    return state
  }
}`}
      </Terminal>
      <p>
        Kill the process anywhere in that loop and{" "}
        <code>resumeOrStart</code> picks up from the last{" "}
        <code>store.put</code> — replaying at most one step, and the{" "}
        <code>done</code> set guarantees a half-finished side effect never fires
        twice.
      </p>

      <h2>Checkpoint &amp; Resume</h2>
      <Diagram
        label="A long-running agent loop that writes its state machine to a Durable Object checkpoint after every step, with Redis carrying queue and idempotency records, so a crash resumes from the last checkpoint rather than the beginning."
        caption="State persists after each step; a crash resumes from the last checkpoint. Idempotency keys make side effects exactly-once."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <marker id="an12-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
            <marker id="an12-res" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#a855f7" />
            </marker>
          </defs>

          {/* step chain */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={40 + i * 122} y="52" width="96" height="46" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
              <text x={88 + i * 122} y="80" fill="#e2e8f0" fontFamily="monospace" fontSize="12" textAnchor="middle">step {i}</text>
              {i < 3 && <line x1={136 + i * 122} y1="75" x2={162 + i * 122} y2="75" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an12-arrow)" />}
              {/* checkpoint down arrow */}
              <line x1={88 + i * 122} y1="98" x2={88 + i * 122} y2="150" stroke="#22d3ee" strokeWidth="1.6" markerEnd="url(#an12-arrow)" />
            </g>
          ))}
          {/* crash marker on step 3 */}
          <text x="454" y="44" fill="#f87171" fontFamily="monospace" fontSize="13" textAnchor="middle">✗ crash</text>

          {/* Durable Object */}
          <rect x="40" y="156" width="430" height="50" rx="9" fill="#160d1f" stroke="#a855f7" strokeWidth="2" />
          <text x="255" y="180" fill="#c4b5fd" fontFamily="monospace" fontSize="12" textAnchor="middle">Durable Object — authoritative checkpoint (state machine)</text>
          <text x="255" y="197" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">single-instance · strongly consistent · written after every step</text>

          {/* Redis */}
          <rect x="486" y="156" width="234" height="50" rx="9" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="603" y="180" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">Redis</text>
          <text x="603" y="197" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">queue · idempotency keys · TTL cache</text>

          {/* resume arrow */}
          <path d="M255,206 L255,238 L470,238 L470,98" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#an12-res)" />
          <text x="360" y="256" fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="middle">restart → rehydrate last checkpoint → replay ≤ 1 step</text>
        </svg>
      </Diagram>
      <p>
        A durable single agent is ready for the messy reality of production tools.
        Next, govern many of them at once:{" "}
        <a href="/blog/enterprise-mcp-aggregation-postgres-figma-playwright">
          enterprise MCP aggregation
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const statefulAgentRuntime: BlogPost = {
  slug: "stateful-agent-runtime-persistence-durable-objects-redis",
  title: "Stateful Agent Runtime: Durable Objects + Redis",
  description:
    "A crash mid-run erases a stateless agent's progress. Checkpoint the agent's state machine to Durable Objects and Redis so it resumes from the last good step — exactly once.",
  keywords: [
    "stateful agents",
    "agent checkpointing",
    "Durable Objects",
    "Redis agent state",
    "idempotency",
    "agent persistence",
    "resumable agents",
    "Cloudflare Durable Objects",
  ],
  publishedAt: "2026-05-30",
  readingMinutes: 10,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Agents", "Architecture"],
  takeaways: [
    "The agent loop is a state machine; checkpoint it after every step so a crash costs one step of replay instead of the whole run, since the model itself is stateless.",
    "Use a Durable Object as the single-instance, strongly-consistent per-agent checkpoint and coordinator, with Redis for queues, locks, and TTL'd scratch state.",
    "Resumption demands idempotency — every side-effecting step needs an idempotency key and a durable completion record so replay skips already-committed effects instead of double-firing.",
    "Checkpointing trades latency and complexity for durability; reserve it for long, expensive, or side-effecting runs and just rerun cheap idempotent tasks.",
  ],
  Body,
};
