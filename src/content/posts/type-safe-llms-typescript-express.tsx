import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        An LLM is a probabilistic text generator that will, eventually, hand you
        a malformed object, an invented field, or prose where you asked for JSON.
        Your backend is a deterministic system that must never crash on it. The
        entire discipline of production AI engineering lives in that gap: treat
        every model response as untrusted input and validate it at the boundary,
        exactly as you would a request from the open internet.
      </p>

      <h2>Treat the LLM as an untrusted input boundary</h2>
      <p>
        You already validate user input before it touches your database. A model
        response deserves the same suspicion — more, because it is plausible
        enough to slip past a careless code path and corrupt state three layers
        deep. The rule is simple: no LLM output enters your application logic
        until it has passed a schema.
      </p>

      <h2>Structured output, then validate anyway</h2>
      <p>
        Ask the model for structured output and give it the schema — but never
        assume it complied. Parse every response through a runtime validator
        (zod is the standard) that doubles as your TypeScript type. If it fails,
        you retry with the validation error fed back in, or you fail the request
        loudly. What you never do is pass an unvalidated blob downstream.
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
        Do not scatter parsing through your controllers. A small middleware that
        runs the schema, attaches the typed result to the request, and short
        circuits on failure keeps every AI-backed route uniform: the controller
        only ever sees data that already matched its contract. The same layer is
        where input validation and sanitization belong, so a request is clean
        before it reaches business logic in either direction.
      </p>

      <h2>Rate-limiting and defensive middleware</h2>
      <p>
        AI endpoints are expensive and abusable, which makes rate-limiting a
        correctness concern, not just a cost one. A per-identity limiter in front
        of the model — plus payload-size caps and strict request validation —
        is what kept the Hospital-API stable under load and cut a meaningful slice
        of server response time by rejecting bad traffic before it ever reached
        the work.
      </p>

      <h2>Fail loud, never silent</h2>
      <p>
        The worst outcome is not an error — it is a malformed response that looks
        fine and quietly writes garbage to your database. Schema validation turns
        that silent corruption into a visible, catchable failure. A crash you can
        see is a bug you can fix; a hallucination you persisted is an incident
        you discover weeks later.
      </p>

      <blockquote>
        The model is allowed to be wrong. Your backend is not allowed to believe
        it without proof. The schema is the proof.
      </blockquote>

      <p>
        This validation discipline underpins the{" "}
        <a href="/#projects">Police RAG Agent</a> and{" "}
        <a href="/#projects">Hospital-API</a> — typed outputs, hardened
        middleware, and zero tolerance for unvalidated model data.
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
