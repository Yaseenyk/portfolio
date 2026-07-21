import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        I patched a system prompt to calm one customer&apos;s edge case, shipped,
        and three days later a different path started returning junk — the
        &quot;fix&quot; quietly regressed six flows nobody re-ran. Prompts are
        code with no type system and no test suite by default, so every change is
        a blind edit to production behavior. I wouldn&apos;t merge a refactor
        without tests; same rule applies here. Eval-driven prompt engineering is
        how you stop merging prompts without them.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        The foundation is a <strong>golden dataset</strong>: a curated set of
        representative inputs paired with expected outputs or acceptance
        criteria. It is the prompt&apos;s test suite. The only way it stays
        honest is sourcing it from <em>reality</em> — production traffic,
        especially the failures and edge cases that burned you — not toy happy
        paths. Every fix graduates into the set so that bug can&apos;t ship
        twice. Over time the golden set becomes a living contract for what the
        prompt must keep getting right. It mirrors the boundary discipline in the
        pattern I call Trinity Architecture: lock the contract, and make it
        executable.
      </p>
      <p>
        Scoring splits by output type. Structured outputs (Lesson 3) get{" "}
        <strong>deterministic assertions</strong> — exact match, schema validity,
        a numeric field in range — fast, cheap, and unambiguous. Open-ended
        outputs need an <strong>LLM-as-judge</strong>: a separate model call that
        scores against a rubric (is it grounded, does it answer, is the tone
        right). The judge is useful but noisy; anchor it to a concrete rubric and
        sanity-check the judge against human labels before you trust the numbers —
        otherwise you just launder bias into a score.
      </p>
      <p>
        The payoff is turning prompt work from vibes into a measurable loop.
        Change the prompt, run the golden set, read the pass-rate delta. A change
        that fixes three and breaks five is now{" "}
        <em>visibly</em> a regression instead of a surprise next week. Wire the
        suite into CI as a gate; if the pass rate drops below the bar, the build
        fails — same as unit tests — and prompts get the same safety net as the
        rest of your code.
      </p>
      <p>
        The trade-offs are dataset maintenance and judge cost. The set decays if
        you don&apos;t feed it fresh production failures, and an LLM judge adds a
        call per case, so large suites on every commit burn tokens and time —
        route the judge to a cheaper tier (Lesson 3), run a fast subset on push,
        and hold the full battery for merge. The deeper risk is overfitting:
        chase the set too hard and you optimize for the test, not the task. Keep
        it growing and representative so it stays an honest proxy for production.
      </p>

      <h2>An Eval Harness</h2>
      <p>
        Golden cases, deterministic assertions where you can, an anchored judge
        where you can&apos;t, and a pass-rate gate. That&apos;s the harness.
      </p>
      <Terminal title="eval.ts">
        <span className="tok-com">{"// Prompts are code. This is their test suite — sourced from real failures."}</span>
        {`
type Case = {
  input: string
  assert: (out: Ticket) => boolean   // deterministic where possible
  rubric?: string                    // LLM-judge where output is open-ended
}

// Each entry is a real production case, many born from a past bug.
const GOLDEN: Case[] = [
  { input: "card charged twice",     assert: (o) => o.category === "billing" && o.severity >= 3 },
  { input: "love the new dashboard", assert: (o) => o.category === "feature" }, // regression #214
  { input: "app crashes on upload",  assert: (o) => o.category === "bug" && o.severity >= 4 },
]

async function judge(out: string, rubric: string): Promise<boolean> {
  const res = await anthropic.messages.create({
    model: "claude-haiku-4-5",                 // cheap tier for scoring
    max_tokens: 8,
    system: \`Score PASS or FAIL strictly against: \${rubric}\`,
    messages: [{ role: "user", content: out }],
  })
  return /PASS/.test(text(res))
}

export async function runEvals(): Promise<number> {
  let passed = 0
  for (const c of GOLDEN) {
    const out = await classify(c.input)        // the prompt under test
    const ok = c.rubric ? await judge(JSON.stringify(out), c.rubric) : c.assert(out)
    if (ok) passed++
    else console.error("FAIL:", c.input, "→", out)
  }
  const rate = passed / GOLDEN.length
  if (rate < 0.95) process.exit(1)             // CI gate: regression fails the build
  return rate
}`}
      </Terminal>
      <p>
        Run it in CI. If a prompt edit drops the pass rate below threshold, the
        build fails — the same gate a broken unit test would trip. Silent
        regressions stop at the door.
      </p>

      <h2>The Eval Gate</h2>
      <Diagram
        label="The eval-driven loop: a prompt change runs against a golden dataset of real cases, scored by deterministic assertions and an anchored LLM judge, producing a pass rate that gates the merge — passing ships, failing blocks and feeds new failures back into the dataset."
        caption="Every prompt change runs the golden set. Pass-rate gates the merge; new failures become permanent cases."
      >
        <svg viewBox="0 0 760 270" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="270" fill="#05070A" />
          <defs>
            <marker id="an14-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
            <marker id="an14-fb" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#a855f7" />
            </marker>
          </defs>

          <rect x="32" y="104" width="140" height="56" rx="8" fill="#160d1f" stroke="#a855f7" strokeWidth="1.5" />
          <text x="102" y="128" fill="#c4b5fd" fontFamily="monospace" fontSize="12" textAnchor="middle">prompt change</text>
          <text x="102" y="146" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">the edit under test</text>

          <line x1="172" y1="132" x2="232" y2="132" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an14-arrow)" />

          <rect x="234" y="92" width="160" height="80" rx="9" fill="#0b1220" stroke="#22d3ee" strokeWidth="2" />
          <text x="314" y="118" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">golden dataset</text>
          <text x="314" y="138" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">real cases · past bugs</text>
          <text x="314" y="156" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">assert + judge</text>

          <line x1="394" y1="132" x2="454" y2="132" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an14-arrow)" />

          <rect x="456" y="104" width="130" height="56" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="2" />
          <text x="521" y="128" fill="#e2e8f0" fontFamily="monospace" fontSize="12" textAnchor="middle">pass rate</text>
          <text x="521" y="146" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">≥ 95% gate</text>

          {/* outcomes */}
          <line x1="586" y1="120" x2="668" y2="96" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an14-arrow)" />
          <text x="700" y="96" fill="#67e8f9" fontFamily="monospace" fontSize="11" textAnchor="middle">ship ✓</text>
          <line x1="586" y1="144" x2="668" y2="172" stroke="#ef4444" strokeWidth="2" />
          <text x="700" y="178" fill="#f87171" fontFamily="monospace" fontSize="11" textAnchor="middle">block ✗</text>

          {/* feedback: new failures → dataset */}
          <path d="M700,190 L700,232 L314,232 L314,172" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#an14-fb)" />
          <text x="500" y="252" fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="middle">every new production failure → permanent golden case (can&apos;t regress twice)</text>
        </svg>
      </Diagram>
      <p>
        Once behavior is measurable and gated, the agent is stable enough to run
        unattended. The series closes there:{" "}
        <a href="/blog/long-running-automated-agent-routines-cron-workflows">
          autonomous agent routines on a cron
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const evalDrivenPromptEngineering: BlogPost = {
  slug: "evaluation-driven-prompt-engineering-golden-datasets",
  title: "Eval-Driven Prompt Engineering with Golden Datasets",
  description:
    "Prompts are code with no test suite by default, so every edit is a blind change to production. Build a golden dataset and an eval harness that gates every prompt change in CI.",
  keywords: [
    "eval-driven development",
    "golden dataset",
    "prompt evaluation",
    "LLM as judge",
    "prompt regression testing",
    "Claude evals",
    "prompt engineering CI",
    "LLM testing",
  ],
  publishedAt: "2026-05-28",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude", "Testing"],
  takeaways: [
    "A golden dataset is the prompt's test suite — curated real production inputs (especially past failures) with expected outputs, so a fixed bug becomes a permanent case that can't regress twice.",
    "Score structured outputs with deterministic assertions and open-ended ones with an LLM-as-judge, but anchor the judge to a concrete rubric and validate it against human labels first.",
    "Wire the eval suite into CI as a pass-rate gate so a prompt change that drops below threshold fails the build, giving prompts the same safety net as code.",
    "Watch dataset rot, judge cost, and overfitting — route the judge to a cheap tier, gate the full suite at merge, and keep the dataset growing and representative.",
  ],
  Body,
};
