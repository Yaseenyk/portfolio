import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        You cannot ship what you cannot measure, and a non-deterministic system
        resists the deterministic tests engineers are used to. The same prompt can
        produce two valid answers, or one valid and one wrong, run to run.
        Evaluating LLM outputs is the discipline that turns &quot;it seemed to
        work&quot; into &quot;it passes,&quot; and it is what separates a demo from
        a product.
      </p>

      <h2>You can&apos;t ship what you can&apos;t measure</h2>
      <p>
        Without evals, every prompt change is a gamble — you fix one case and
        silently break three others, and you find out from users. A test suite for
        AI is not optional polish; it is the only way to change a prompt or swap a
        model with any confidence that you did not regress the behavior that
        mattered.
      </p>

      <h2>Three layers of evaluation</h2>
      <p>
        Start cheap and deterministic: schema and assertion checks that catch
        malformed or out-of-range outputs instantly. Add a golden set — a curated
        bank of inputs with known-good expectations you run on every change. And
        for subjective quality, use a stronger model as a judge, scoring outputs
        against a rubric. Each layer catches what the cheaper one cannot.
      </p>

      <Terminal title="eval.ts">
        <span className="tok-com">{"// cheapest layer: deterministic assertions on every output"}</span>
        {`
const out = Verdict.safeParse(await run(input));
expect(out.success).toBe(true);            // valid shape
expect(out.data.citations.length).toBeGreaterThan(0); // grounded
expect(out.data.confidence).toBeLessThanOrEqual(1);    // in range`}
      </Terminal>

      <h2>Make evals part of the loop</h2>
      <p>
        Evals only help if they run automatically — on every prompt edit, every
        model bump, every retrieval change. Wire them into CI so a regression
        fails the build instead of reaching production. The moment evaluating an
        AI feature feels as routine as running unit tests, you have crossed from
        experimenting to engineering.
      </p>

      <blockquote>
        A model you cannot evaluate is a model you cannot improve — you can only
        change it and hope. Evals turn hope into a passing build.
      </blockquote>

      <p>
        Evaluation pairs with validation; the{" "}
        <a href="/blog/type-safe-llms-strict-schemas-typescript-express">
          Type-Safe LLMs
        </a>{" "}
        post covers enforcing the contracts your evals assert against.
      </p>
    </>
  );
}

export const evaluatingLlmOutputs: BlogPost = {
  slug: "evaluating-llm-outputs",
  title: "Evaluating LLM Outputs: Testing the Untestable",
  description:
    "A non-deterministic system resists deterministic tests. The three-layer eval strategy — schema assertions, golden sets, LLM-as-judge — that turns 'seemed to work' into 'passes'.",
  keywords: [
    "LLM evaluation",
    "evals",
    "testing",
    "LLM-as-judge",
    "golden set",
    "CI",
    "AI quality",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["LLM", "Testing", "Evals"],
  takeaways: [
    "Non-deterministic outputs resist deterministic tests; evals are how you change prompts or models without regressing.",
    "Layer evaluation: cheap schema/assertion checks, a curated golden set, and LLM-as-judge for subjective quality.",
    "Wire evals into CI so a behavioral regression fails the build instead of reaching production.",
    "A model you can't evaluate is one you can only change and hope — evals turn hope into a passing build.",
  ],
  Body,
};
