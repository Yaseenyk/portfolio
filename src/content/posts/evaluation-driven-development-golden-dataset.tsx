import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function EvalGateDiagram() {
  return (
    <Diagram
      label="A CI pipeline gated on an evaluation. A pull request changing a prompt or model runs against a golden dataset of labelled cases; the resulting pass-rate is compared to the stored baseline. Above threshold merges; a regression blocks the merge."
      caption="The golden dataset turns a prompt change into a testable diff. CI runs the candidate against fixed cases and compares to baseline — a regression blocks the merge the same way a failing unit test would."
    >
      <svg viewBox="0 0 760 240" role="img" aria-label="Evaluation gate in CI">
        <defs>
          <marker id="e-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* PR */}
        <rect x="20" y="96" width="120" height="50" rx="10" fill="#0b1018" stroke="#67E8F9" />
        <text x="80" y="118" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          pull request
        </text>
        <text x="80" y="134" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          prompt / model Δ
        </text>

        {/* golden set run */}
        <line x1="140" y1="121" x2="196" y2="121" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#e-arrow)" />
        <rect x="200" y="96" width="150" height="50" rx="10" fill="rgba(168,85,247,0.06)" stroke="#A855F7" />
        <text x="275" y="118" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          run vs golden set
        </text>
        <text x="275" y="134" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          N labelled cases
        </text>

        {/* score */}
        <line x1="350" y1="121" x2="406" y2="121" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#e-arrow)" />
        <rect x="410" y="96" width="130" height="50" rx="10" fill="#0b1018" stroke="#22D3EE" />
        <text x="475" y="118" fill="#22D3EE" fontFamily="monospace" fontSize="11" textAnchor="middle">
          score vs baseline
        </text>
        <text x="475" y="134" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          pass-rate Δ
        </text>

        {/* gate split */}
        <line x1="540" y1="110" x2="600" y2="70" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#e-arrow)" />
        <rect x="604" y="46" width="132" height="44" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="670" y="66" fill="#22D3EE" fontFamily="monospace" fontSize="10" textAnchor="middle">
          ≥ baseline
        </text>
        <text x="670" y="81" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          merge
        </text>

        <line x1="540" y1="132" x2="600" y2="172" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#e-arrow)" />
        <rect x="604" y="152" width="132" height="44" rx="10" fill="rgba(244,63,94,0.07)" stroke="#f43f5e" />
        <text x="670" y="172" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="middle">
          regression
        </text>
        <text x="670" y="187" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          block merge
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        Evaluation-Driven Development treats a golden dataset like your AI&apos;s test
        suite. Every prompt or model tweak runs in CI against labelled cases with a
        regression threshold. Without that harness, a prompt is code with no tests —
        you nudge a line, it looks better on the three examples you stared at, and
        you ship a silent regression on the other ninety-seven. The golden set turns
        &quot;feels better&quot; into a measurable score that either clears the bar or
        blocks the merge.
      </p>

      <h2>A prompt change is a diff without a test</h2>
      <p>
        Prompt engineering is cheap to change and hides side effects. Fix one failing
        case by sprinkling an instruction, and you can quietly break a whole category
        you weren&apos;t watching. Manual spot-checks bias toward what you expect to
        move; they miss the collateral. The only defense is the same one that works
        for code: a fixed set of cases, run on every change, that fails loudly when
        behavior regresses.
      </p>

      <EvalGateDiagram />

      <h2>The golden dataset is the asset, not the prompt</h2>
      <p>
        Prompts and models churn; the labelled set of inputs and expected outcomes is
        what compounds. Seed it from real failures — every production bug becomes a
        permanent case so the same mistake can never ship twice — and grow it toward
        the long tail and the edge cases that break naive prompts. Each row is an
        input, a way to judge the output (exact match, a rubric, an{" "}
        <a href="/blog/evaluating-llm-outputs">LLM-as-judge</a> score), and a label.
        Curating that set is the real engineering work; the prompt is just the current
        candidate being measured against it. Keep the artifact lean and reproducible:
        store only inputs, expected judgments, and minimal context. On IntegrateX, a
        Serialization Adapter stripped non-essential React Flow UI metadata before
        persistence and cut payloads 94% — the same discipline keeps eval records
        small, portable, and free of view-specific noise.
      </p>

      <Terminal title="eval.test.ts — golden set as a CI gate">
        <span className="tok-com">{`// every prompt/model change is scored against fixed cases`}</span>
        {"\n"}
        {`const cases = loadGolden("./golden/*.jsonl");\n`}
        {`const results = await Promise.all(\n`}
        {`  cases.map(async (c) => ({\n`}
        {`    pass: await judge(c, await candidate.run(c.input)),\n`}
        {`  })),\n`}
        {`);\n\n`}
        {`const rate = results.filter((r) => r.pass).length / results.length;\n`}
        {`expect(rate).toBeGreaterThanOrEqual(BASELINE); // regression fails CI`}
      </Terminal>

      <h2>Gate the merge, not the vibe</h2>
      <p>
        The discipline only sticks when the threshold is wired into CI. Store the
        current pass-rate as the baseline; a pull request that drops below it fails
        the check and can&apos;t merge, exactly like a broken unit test. That single
        gate changes the culture: prompt changes stop being judged by whoever argues
        hardest and start being judged by the dataset. &quot;Trust me, it&apos;s
        better&quot; becomes &quot;the pass-rate went from 91% to 94%.&quot; In the
        pattern I call Trinity Architecture, that gate lives in the Reactive
        State/Orchestration layer — the UI just renders status, and the adapter
        persists eval records — so no layer talks past its neighbor.
      </p>

      <blockquote>
        Confidence in an AI feature isn&apos;t earned by trying prompts until one
        feels right. It&apos;s earned by a golden dataset that fails the build the
        moment a change makes things worse — and that grows every time production
        exposes a gap.
      </blockquote>

      <p>
        Eval-driven development is the test harness around the scoring methods in{" "}
        <a href="/blog/evaluating-llm-outputs">evaluating LLM outputs</a> and the
        safety net that lets{" "}
        <a href="/blog/guardrail-engineering-hallucination-prevention">guardrails</a>{" "}
        evolve without silent regressions. Keep the Trinity split tight — presentation
        renders, orchestration owns truth, and the adapter handles serialization —
        and you get fast iteration without shipping vibes. Continue on the{" "}
        <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const evaluationDrivenDevelopment: BlogPost = {
  slug: "evaluation-driven-development-golden-dataset",
  title: "Evaluation-Driven Development: The Golden Dataset as a CI Gate",
  description:
    "A prompt is code with no tests until you have a golden dataset — a curated set of labelled cases every change runs against in CI, gated on a regression threshold. Eval-driven development turns 'feels better' into a number that blocks the merge.",
  keywords: [
    "evaluation-driven development",
    "golden dataset",
    "LLM evals CI",
    "prompt regression testing",
    "AI quality gate",
    "LLM-as-judge",
  ],
  publishedAt: "2026-06-05",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "Testing", "Evals"],
  takeaways: [
    "Treat a prompt change like a code diff: it needs a fixed test set, or you ship silent regressions you never spot-checked.",
    "The golden dataset is the compounding asset — seed it from real production failures so the same bug can never ship twice.",
    "Wire the pass-rate threshold into CI so a regression blocks the merge, replacing 'trust me, it's better' with a measured delta.",
  ],
  Body,
};
