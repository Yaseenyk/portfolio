import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function GuardrailDiagram() {
  return (
    <Diagram
      label="A defense-in-depth pipeline: an input guard, then a grounded model, then an output verifier and citation check, ending at a fail-closed gate that either passes the answer or routes it to an escalation path."
      caption="Guardrails are deterministic checks wrapping a probabilistic core. Each layer catches what the others miss, and the final gate fails closed — it would rather escalate than ship an unverified answer."
    >
      <svg viewBox="0 0 760 260" role="img" aria-label="Defense-in-depth guardrails">
        <defs>
          <marker id="g-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {[
          ["input guard", 24, "#67E8F9", "pre"],
          ["grounded model", 200, "#A855F7", "in-context"],
          ["output verifier", 400, "#22D3EE", "post"],
          ["fail-closed gate", 588, "#67E8F9", "decide"],
        ].map(([label, x, color, tag], i, arr) => (
          <g key={label as string}>
            <rect x={x as number} y="86" width="148" height="56" rx="10" fill="#0b1018" stroke={color as string} />
            <text x={(x as number) + 74} y="112" fill={color as string} fontFamily="monospace" fontSize="11" textAnchor="middle">
              {label}
            </text>
            <text x={(x as number) + 74} y="130" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
              {tag}
            </text>
            {i < arr.length - 1 && (
              <line x1={(x as number) + 148} y1="114" x2={(arr[i + 1][1] as number) - 4} y2="114" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#g-arrow)" />
            )}
          </g>
        ))}

        {/* pass / escalate */}
        <rect x="588" y="180" width="148" height="40" rx="10" fill="rgba(244,63,94,0.07)" stroke="#f43f5e" />
        <text x="662" y="205" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="middle">
          reject → escalate
        </text>
        <line x1="662" y1="142" x2="662" y2="178" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#g-arrow)" />

        <rect x="588" y="28" width="148" height="36" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="662" y="51" fill="#22D3EE" fontFamily="monospace" fontSize="10" textAnchor="middle">
          pass → ship
        </text>
        <line x1="662" y1="84" x2="662" y2="66" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#g-arrow)" />
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        After shipping LLMs into real products, I stopped trying to erase hallucination and started boxing it in.
        The production answer to &quot;what if the model is wrong?&quot; isn&apos;t a prettier prompt — it&apos;s a sequence
        of deterministic checks wrapped around the probabilistic core. I treat the model like an untrusted dependency:
        validate what goes in, ground what it&apos;s allowed to see, verify what comes out, and fail closed the moment a check trips.
      </p>

      <h2>Treat the model as untrusted</h2>
      <p>
        Assume it will sometimes be confidently wrong. You wouldn&apos;t pipe raw user input into your database; don&apos;t pipe raw model
        output into your product. On IntegrateX, one invented parameter could have triggered a bad workflow call, so we built guards:
        input validation up front (reject prompt injection, malformed or out-of-scope asks) and output verification at the back (claims trace to context).
        I apply the same boundary discipline as the pattern I call Trinity Architecture: orchestration owns the contract, the model never sees raw user input,
        and the adapter layer sanitizes what crosses the wire. No component talks past its neighbor, and the model never gets to write directly to state or side effects.
      </p>

      <GuardrailDiagram />

      <h2>Grounding plus &quot;refuse if unsupported&quot; beats hoping</h2>
      <p>
        The highest leverage move is a strict grounding contract: give the model only the retrieved context and require it to answer solely from that —
        and refuse when the context doesn&apos;t support an answer. Then back it with a post-generation verifier that proves every claim maps to a cited source.
        Answers that can&apos;t be grounded don&apos;t get &quot;improved&quot;; they get rejected or escalated. In production, refusal is a feature that prevents
        silent data drift and bad side effects.
      </p>

      <Terminal title="guardrails.ts">
        <span className="tok-com">{`// defense in depth — each layer catches a different failure`}</span>
        {"\n"}
        {`const safe = inputGuard(req);            // pre: scope + injection check\n`}
        {`if (!safe.ok) return reject(safe.reason);\n\n`}
        {`const draft = await model.generate(ground(ctx, safe.q));  // in-context\n`}
        {`const check = await verify(draft, ctx);  // post: claims ⊆ sources?\n\n`}
        {`return check.grounded             // fail closed\n`}
        {`  ? { answer: draft, sources: check.cited }\n`}
        {`  : escalateToHuman(safe.q);      // would rather escalate than guess`}
      </Terminal>

      <h2>Layer the guardrails so each catches what the others miss</h2>
      <p>
        No single check covers the space. Input validation blocks the bad ask the model would mangle; grounding fences what it&apos;s allowed to say;
        output verification catches confident fiction that sneaks through; the fail-closed gate ensures &quot;unsure&quot; flows to escalation, not production.
        Think of it like backpressure for semantics: each stage reduces risk, and failures terminate early rather than flooding downstream systems with garbage.
      </p>

      <blockquote>
        You don&apos;t stop hallucination by willing the model to behave. You stop it by surrounding it with deterministic gates that fail closed — so the
        worst case is a refusal, never a confident lie.
      </blockquote>

      <p>
        Guardrails are the production payoff of{" "}
        <a href="/blog/rag-grounding-the-agent">grounding</a> and the discipline that
        makes <a href="/blog/agentic-control-loops">autonomous loops</a> safe to
        ship without gambling on luck. The series closes with the{" "}
        <a href="/blog/ai-native-portfolio-landing-lead-roles">AI-native portfolio</a>{" "}
        — see the full <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const guardrailEngineering: BlogPost = {
  slug: "guardrail-engineering-hallucination-prevention",
  title: "Guardrail Engineering: Preventing Hallucination in Production",
  description:
    "You can't fine-tune away hallucination, but you can engineer around it. Guardrails are deterministic checks wrapped around a probabilistic core — input validation, grounding contracts, and output verification that fail closed.",
  keywords: [
    "AI guardrails",
    "hallucination prevention",
    "LLM output verification",
    "prompt injection defense",
    "grounding contract",
    "production LLM safety",
  ],
  publishedAt: "2026-06-01",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "Architecture", "RAG"],
  takeaways: [
    "Treat the model as an untrusted subsystem: validate inputs and verify outputs, don't hope it behaves.",
    "Grounding plus 'refuse if unsupported' is the highest-leverage guardrail — an ungroundable answer is rejected, not improved.",
    "Layer guardrails (pre, in-context, post) and fail closed, so the worst case is a refusal or escalation, never a confident lie.",
  ],
  Body,
};
