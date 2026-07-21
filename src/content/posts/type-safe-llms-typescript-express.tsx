import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        An LLM is a probabilistic text generator that will, on some random
        Tuesday, hand you a malformed object, invent a field, or answer in prose
        when you asked for JSON. Your backend is a deterministic system that
        cannot crash because a sampler got creative. Production AI engineering
        lives in that gap: treat model output like traffic from the open
        internet and validate it at the boundary.
      </p>

      <h2>Treat the LLM as an untrusted input boundary</h2>
      <p>
        You already gate user input before it gets anywhere near storage. A
        model deserves even more suspicion — it&apos;s plausible enough to slip
        past a careless path and poison state three layers deep. In the pattern
        I call Trinity Architecture, the model sits outside the Data /
        Serialization Adapter; nothing reaches the orchestrator or UI until it
        clears a schema at that adapter boundary.
      </p>

      <h2>Structured output, then validate anyway</h2>
      <p>
        Ask for structured output and show the schema — then assume it&apos;s
        wrong. Run every response through a runtime validator (zod is the usual
        choice) that also gives you strong TypeScript types. If it fails,
        retry with the validation error as feedback, or fail fast. What you
        never do is let an unvalidated blob descend into application logic.
      </p>

      <Terminal title="validate.ts">
        <span className="tok-key">const</span> Verdict ={" "}
        <span className="tok-fn">z.object</span>
        <span className="tok-punc">({`{`}</span>
        {"\n  "}
        decision<span className="tok-punc">:</span>{" "}
        <span className="tok-fn">z.enum</span>
        <span className="tok-punc">([</span>
        <span className="tok-str">&quot;guilty&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-str">&quot;not_guilty&quot;</span>
        <span className="tok-punc">]),</span>
        {"\n  "}
        confidence<span className="tok-punc">:</span>{" "}
        <span className="tok-fn">z.number</span>
        <span className="tok-punc">().</span>
        <span className="tok-fn">min</span>
        <span className="tok-punc">(</span>
        <span className="tok-num">0</span>
        <span className="tok-punc">).</span>
        <span className="tok-fn">max</span>
        <span className="tok-punc">(</span>
        <span className="tok-num">1</span>
        <span className="tok-punc">),</span>
        {"\n  "}
        citations<span className="tok-punc">:</span>{" "}
        <span className="tok-fn">z.array</span>
        <span className="tok-punc">(</span>
        <span className="tok-fn">z.string</span>
        <span className="tok-punc">()).</span>
        <span className="tok-fn">min</span>
        <span className="tok-punc">(</span>
        <span className="tok-num">1</span>
        <span className="tok-punc">),</span>
        {"\n"}
        <span className="tok-punc">{`}`});</span>
        {"\n\n"}
        <span className="tok-key">const</span> parsed = Verdict.
        <span className="tok-fn">safeParse</span>
        <span className="tok-punc">(</span>raw
        <span className="tok-punc">);</span>
        {"\n"}
        <span className="tok-key">if</span>{" "}
        <span className="tok-punc">(!</span>parsed.success
        <span className="tok-punc">)</span>{" "}
        <span className="tok-key">return</span>{" "}
        <span className="tok-fn">retryWithError</span>
        <span className="tok-punc">(</span>parsed.error
        <span className="tok-punc">);</span>
        {"\n"}
        <span className="tok-key">return</span> parsed.data
        <span className="tok-punc">;</span>{" "}
        <span className="tok-com">{`// now fully typed + safe to persist`}</span>
      </Terminal>

      <h3>Push validation into Express middleware</h3>
      <p>
        Don&apos;t scatter parsing across controllers. Write a thin middleware
        that runs the schema, attaches the typed result to the request, and
        short-circuits on failure. Controllers stay boring and only see
        contract-valid data. The same edge layer handles sanitization and size
        limits so business logic receives clean inputs in both directions. That
        muscle memory came from streamerOS — under backpressure and 60fps
        targets, centralizing the heavy checks at the boundary kept everything
        predictable.
      </p>

      <h2>Rate-limiting and defensive middleware</h2>
      <p>
        AI endpoints are expensive and abusable, so rate-limiting is
        correctness, not just cost control. Put a per-identity limiter ahead of
        the model, cap payload size, and keep request validation strict. That
        combination kept the Hospital-API stable under load and shaved real
        response time by rejecting bad traffic before it touched the hot path.
      </p>

      <h2>Fail loud, never silent</h2>
      <p>
        The worst case isn&apos;t an error — it&apos;s a plausible response that
        quietly writes garbage. Schema checks flip silent corruption into a loud
        failure with context. A visible crash is a ticket you can close; a
        hallucination you persist is an incident you chase weeks later.
      </p>

      <blockquote>
        The model can be wrong. Your backend can&apos;t take it on faith. The
        schema is the proof.
      </blockquote>

      <p>
        This validation discipline underpins the{" "}
        <a href="/#projects">Police RAG Agent</a> and{" "}
        <a href="/#projects">Hospital-API</a> — typed outputs, hardened
        middleware, and a strict Trinity split: presentation only renders,
        orchestration handles retries, and the adapter validates and shapes the
        payload. Zero tolerance for unvalidated model data.
      </p>
    </>
  );
}

export const typeSafeLlms: BlogPost = {
  slug: "type-safe-llms-strict-schemas-typescript-express",
  title: "Type-Safe LLMs: Enforcing Strict Schemas in TypeScript & Express",
  description:
    "AI hallucinates; your backend cannot crash. How to validate every LLM response through zod schemas and Express middleware so an AI-augmented MERN app stays crash-free.",
  keywords: [
    "type-safe LLM",
    "zod",
    "structured output",
    "Express middleware",
    "validation",
    "rate limiting",
    "TypeScript",
  ],
  publishedAt: "2026-06-01",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["TypeScript", "Express", "Validation"],
  takeaways: [
    "Treat every LLM response as untrusted input and validate it at the boundary before it touches application logic.",
    "Request structured output, then validate it anyway through a runtime schema (zod) that doubles as your TypeScript type.",
    "Centralize parsing, rate-limiting, and sanitization in Express middleware so controllers only see contract-valid data.",
    "Fail loud: schema validation converts silent, persisted hallucinations into visible, catchable errors.",
  ],
  Body,
};
