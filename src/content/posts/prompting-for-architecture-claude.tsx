import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Generating a function with AI is a solved problem. Generating a{" "}
        <em>system</em> is not. The difference is memory: a model will write you
        a flawless controller and, three prompts later, invent a second data
        shape that contradicts the first — because it never held the whole
        architecture, only the last few thousand tokens of it. Building
        enterprise software with Claude is not a prompting skill. It is a context
        engineering discipline, and it has two pillars: Shadow Documentation and
        strict contextual boundaries.
      </p>

      <h2>The real failure mode: context collapse</h2>
      <p>
        Every serious AI build dies the same way. Early prompts are crisp and the
        output is excellent. As the system grows, the model&apos;s working
        picture of it drifts — naming conventions wander, the schema mutates,
        the same concern gets implemented twice in two incompatible ways. This is
        not a model weakness; it is an architecture-of-context weakness. You are
        asking a stateless system to maintain a stateful invariant. The fix is to
        make the architecture itself the context.
      </p>

      <h2>Shadow Documentation</h2>
      <p>
        Shadow Documentation is a living, machine-readable specification of your
        system that you maintain alongside the code and feed into every
        significant prompt. Not prose for humans — a dense, current statement of
        the contracts, the boundaries, and the decisions already made. It is the
        memory the model does not have.
      </p>

      <Terminal title="ARCHITECTURE.md">
        <span className="tok-com">{`# Contracts (authoritative)`}</span>
        {"\n"}
        <span className="tok-key">CaseRecord</span>
        <span className="tok-punc">:</span> {`{`} id, statuteRefs[], timeline[],
        verdict? {`}`}
        {"\n"}
        <span className="tok-key">Verdict</span>
        <span className="tok-punc">:</span> {`{`} decision:{" "}
        <span className="tok-str">&quot;guilty&quot;</span> |{" "}
        <span className="tok-str">&quot;not_guilty&quot;</span>, citations[]{" "}
        {`}`}
        {"\n\n"}
        <span className="tok-com">{`# Boundaries`}</span>
        {"\n"}
        - retrieval lives in /agent; never in /api controllers
        {"\n"}
        - all LLM output validated by zod before persistence
        {"\n\n"}
        <span className="tok-com">{`# Decisions`}</span>
        {"\n"}
        - Mongo over Postgres: document-shaped case data
        {"\n"}
        - one Zustand store owns render state; DB stores records only
      </Terminal>

      <h3>What goes in the shadow docs</h3>
      <p>
        Three things, ruthlessly current: the <strong>contracts</strong> (the
        canonical data shapes every layer must honor), the{" "}
        <strong>boundaries</strong> (what lives where, and what is forbidden from
        crossing), and the <strong>decisions</strong> (the choices already made,
        so the model stops relitigating them). When the spec and the code
        disagree, the spec is the bug report.
      </p>

      <h2>Contextual boundaries: one layer per prompt</h2>
      <p>
        The second pillar is scope discipline. A prompt that asks for &quot;the
        feature&quot; invites the model to improvise across three layers at once,
        which is exactly where contradictions are born. Scope every prompt to a
        single layer and a single contract: generate the Mongoose model for this
        schema; now the controller that satisfies this contract; now the React
        hook that consumes that endpoint. Each prompt inherits the shadow docs
        and touches one seam. The architect holds the system; the model fills one
        cell of it at a time.
      </p>

      <h2>Prompts as specifications</h2>
      <p>
        Treat prompts the way you treat infrastructure: versioned, precise, and
        reviewed. An ambiguous prompt is an ambiguous requirement that merely
        fails faster. The prompts that built streamerOS read like architecture
        tickets — a contract, a constraint, an acceptance check — not like a
        conversation. That is the whole trick: you are not chatting with a coder,
        you are issuing specifications to a build system that happens to
        understand English.
      </p>

      <blockquote>
        AI does not replace the architect. It removes every excuse the architect
        ever had for an unclear specification.
      </blockquote>

      <p>
        The complete workflow — shadow docs, prompt structure, and the
        review loop behind a production system — is detailed in the{" "}
        <a href="/#projects">streamerOS breakdown</a>.
      </p>
    </>
  );
}

export const promptingForArchitecture: BlogPost = {
  slug: "prompting-for-architecture-claude-full-stack",
  title: "Prompting for Architecture: Building Full-Stack Systems with Claude",
  description:
    "Coding with AI is easy; architecting with it is hard. Shadow Documentation and strict contextual boundaries are how you build enterprise systems with Claude — the exact workflow behind streamerOS.",
  keywords: [
    "Claude",
    "AI architecture",
    "prompt engineering",
    "context engineering",
    "full-stack development",
    "AI workflows",
    "enterprise software",
  ],
  publishedAt: "2026-06-03",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Claude", "AI Workflows", "Architecture"],
  takeaways: [
    "AI writes code well but loses the system; the architect's job is keeping the system coherent across stateless sessions.",
    "Shadow Documentation — a living, machine-readable spec of contracts, boundaries, and decisions — is the memory the model lacks.",
    "Enforce strict contextual boundaries: scope every prompt to one layer and one contract.",
    "Treat prompts as versioned architecture specifications, not throwaway chat.",
  ],
  Body,
};
