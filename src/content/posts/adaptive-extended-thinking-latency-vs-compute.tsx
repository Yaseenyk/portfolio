import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Two failure modes, opposite causes. I&apos;ve watched teams turn a snappy
        classifier into molasses by forcing every request through a thousand-token
        &quot;thinking&quot; preamble just to answer &quot;billing.&quot; At the
        same time, their planning agent face-plants on real multi-constraint work
        because it never budgets time to think. In production, tokens are compute;
        compute is latency and money. On streamerOS the 60fps path can&apos;t
        stall behind a model burning cycles; on IntegrateX the planner only got
        reliable once we let it think. Reasoning isn&apos;t free, and it isn&apos;t
        always worth it. Adaptive extended thinking is the dial — most teams either
        leave it off or pin it to max, and both are wrong.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        Extended thinking lets Claude spend tokens on visible internal reasoning —{" "}
        <code>thinking</code> blocks — before it commits to an answer. Those
        tokens come out of the same context window as everything else (Lesson 1)
        and out of your wallet. The 2026 models make this <em>adaptive</em>: given
        a <code>budget_tokens</code> ceiling, the model spends reasoning effort
        proportional to the difficulty it perceives, stopping early on easy
        requests and going deep only when the problem warrants. The budget is a
        cap, not a quota — set 16K and you&apos;re allowing depth when it&apos;s
        earned, not forcing every call to burn 16K.
      </p>
      <p>
        The core trade-off is latency for accuracy, and it is not linear. On
        genuinely hard tasks — multi-step math, constraint satisfaction,
        debugging across files, planning with dependencies — a thinking budget can
        be the difference between right and confidently wrong, and it pays for
        itself many times over. On easy, high-volume tasks — classification,
        extraction, formatting — that same budget buys nothing but time-to-first-
        token and cost. I tier this in the orchestration layer of the pattern I
        call Trinity Architecture: Presentation renders; the Reactive State /
        Orchestrator picks the budget per task; the Data / Serialization Adapter
        stays out of it. One dial per tier, not a global sledgehammer.
      </p>
      <p>
        Thinking composes with tool use in a way that matters for agents.{" "}
        <strong>Interleaved thinking</strong> lets the model reason between tool
        calls — inspect a <code>tool_result</code>, reflect on what it implies,
        then decide the next call — rather than blindly chaining tools. For a
        multi-step agent loop (Lesson 4) that reflection is often where the
        correctness lives: it&apos;s the difference between an agent that adapts to
        what it finds and one that executes a fixed plan into a wall.
      </p>
      <p>
        Two operational notes. First, thinking blocks are part of the assistant
        turn — preserve them in the transcript on multi-turn tool loops or you
        degrade the model&apos;s continuity. On IntegrateX, dropping those blocks
        between tool calls caused state-synchronization drift and brittle retries.
        Second, thinking interacts with caching (Lesson 9): the reasoning is
        dynamic, so it lives past your cached static prefix, not inside it. Budget
        thinking where it earns its latency, cache the stable context around it,
        and you get deep reasoning only on the turns that need it.
      </p>

      <h2>Budgeting Thinking by Task Tier</h2>
      <p>
        Don&apos;t set one global thinking budget. Tier it: zero for plumbing, a
        modest budget for analysis, a deep budget for planning. Put the switch in
        the orchestrator, not the UI — that&apos;s my Trinity split doing its job.
      </p>
      <Terminal title="thinking-tiers.ts">
        <span className="tok-com">{"// budget_tokens is a CEILING, not a quota — the model spends to difficulty."}</span>
        {`
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

const THINKING = {
  plumbing: 0,        // classify / extract / format — reasoning buys nothing
  analysis: 4_000,    // summarize, compare, light reasoning
  planning: 16_000,   // multi-constraint planning, cross-file debugging
} as const

type Tier = keyof typeof THINKING

export async function ask(tier: Tier, system: string, prompt: string) {
  const budget = THINKING[tier]
  return anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 4_000,
    // Reserve output headroom ABOVE the thinking budget (Lesson 1).
    thinking: budget > 0
      ? { type: "enabled", budget_tokens: budget }
      : { type: "disabled" },
    system,
    messages: [{ role: "user", content: prompt }],
  })
}

// Hot path stays fast; only the planner pays the latency tax.
await ask("plumbing", SYS, "Classify: 'my card was double charged'")
await ask("planning", SYS, "Sequence this 9-step migration under these 4 constraints…")`}
      </Terminal>
      <p>
        The same model, the same code path — the only variable is how much
        reasoning each tier is allowed to buy. Your classifier stays instant; your
        planner gets the depth it needs, and your p95 stays inside the SLO that
        pays the bills.
      </p>

      <h2>Effort Should Track Difficulty</h2>
      <Diagram
        label="A curve showing reasoning token spend rising with task difficulty under a fixed adaptive thinking budget, contrasted with the waste of a flat maxed-out budget and the failure of a zero budget on hard tasks."
        caption="Adaptive thinking spends to difficulty. A flat max wastes tokens on easy tasks; zero fails the hard ones."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <linearGradient id="an6-fill" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0.05" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* axes */}
          <line x1="70" y1="40" x2="70" y2="220" stroke="#334155" strokeWidth="1.5" />
          <line x1="70" y1="220" x2="710" y2="220" stroke="#334155" strokeWidth="1.5" />
          <text x="70" y="248" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle">easy</text>
          <text x="710" y="248" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="end">hard →  task difficulty</text>
          <text x="30" y="130" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle" transform="rotate(-90 30 130)">thinking tokens</text>

          {/* budget ceiling */}
          <line x1="70" y1="64" x2="710" y2="64" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="704" y="58" fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="end">budget_tokens ceiling (max)</text>

          {/* flat-max waste region */}
          <text x="250" y="92" fill="#7f5fb0" fontFamily="monospace" fontSize="10" textAnchor="middle">flat max = wasted on easy →</text>

          {/* adaptive curve */}
          <path d="M70,212 C220,208 300,170 420,120 C520,80 600,70 710,66 L710,220 L70,220 Z" fill="url(#an6-fill)" />
          <path d="M70,212 C220,208 300,170 420,120 C520,80 600,70 710,66" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
          <text x="430" y="150" fill="#67e8f9" fontFamily="monospace" fontSize="12">adaptive: spend ∝ difficulty</text>

          {/* zero line failure */}
          <line x1="70" y1="220" x2="710" y2="220" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
          <text x="560" y="212" fill="#f87171" fontFamily="monospace" fontSize="10" textAnchor="middle">zero budget → hard tasks fail</text>
        </svg>
      </Diagram>
      <p>
        With reasoning effort tuned, the workflow shifts from the API to the
        local agent. Next:{" "}
        <a href="/blog/local-first-claude-code-claude-md-secure-cli">
          CLAUDE.md, system files &amp; a secure CLI
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const adaptiveExtendedThinking: BlogPost = {
  slug: "adaptive-extended-thinking-latency-vs-compute",
  title: "Adaptive Extended Thinking: Trading Latency for Compute",
  description:
    "Reasoning isn't free. Adaptive extended thinking lets Claude spend tokens proportional to difficulty — tune budget_tokens per task tier so hard problems get depth and easy ones stay fast.",
  keywords: [
    "extended thinking",
    "Claude reasoning",
    "budget_tokens",
    "adaptive thinking",
    "interleaved thinking",
    "latency vs accuracy",
    "Claude Opus 4.8",
    "reasoning budget",
  ],
  publishedAt: "2026-06-05",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude", "Performance"],
  takeaways: [
    "Extended thinking spends tokens on visible reasoning before answering; the 2026 models make it adaptive, spending effort proportional to perceived difficulty up to a budget_tokens ceiling — the budget is a cap, not a quota.",
    "The latency-for-accuracy trade is non-linear: deep thinking pays off on hard multi-step tasks and buys nothing but cost on easy high-volume ones, so tier the budget per task rather than setting it globally.",
    "Interleaved thinking lets the model reason between tool calls, which is often where agent correctness lives — preserve thinking blocks across multi-turn tool loops.",
    "Thinking is dynamic, so it lives past the cached static prefix; budget reasoning where it earns its latency and cache the stable context around it.",
  ],
  Body,
};
