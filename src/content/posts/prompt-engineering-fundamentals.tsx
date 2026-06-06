import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Backend engineers spent years learning to design clean API contracts.
        Prompt engineering is the same skill pointed at a different system. A
        prompt is a request to an unreliable, non-deterministic service, and the
        difference between a flaky feature and a dependable one is almost entirely
        in how rigorously you structure that request.
      </p>

      <h2>A prompt is an API contract</h2>
      <p>
        Treat it like one. Specify the role the model is playing, the context it
        may use, the constraints it must obey, and the exact output format you
        expect back. A loose prompt is an underspecified endpoint — it will
        &quot;work&quot; in the demo and fail in production the moment real input
        arrives.
      </p>

      <Terminal title="prompt.ts">
        <span className="tok-com">{"// structure beats cleverness, every time"}</span>
        {`
ROLE:     You are a strict JSON extraction service.
CONTEXT:  \${record}
TASK:     Extract the fields defined in the schema.
RULES:    Use only the context. If a field is absent, return null.
FORMAT:   Return JSON matching CaseSchema. No prose.`}
      </Terminal>

      <h2>Structure beats cleverness</h2>
      <p>
        The instinct is to write persuasive, clever prose. Resist it. The prompts
        that hold up are boring and explicit: labeled sections, unambiguous
        rules, and a single, rigid output contract. Cleverness is fragile across
        model versions; structure is portable. If you cannot describe what you
        want as a checklist, the model cannot reliably produce it.
      </p>

      <h2>Turn the determinism knobs</h2>
      <p>
        Two levers matter most. Lower the temperature for anything that must be
        consistent — extraction, classification, routing — and raise it only when
        you genuinely want variation. And always pair the prompt with a schema you
        validate on the way out, so &quot;return JSON&quot; becomes a guarantee
        you enforce rather than a hope you express.
      </p>

      <blockquote>
        A good prompt reads like a specification, not a sales pitch. If you would
        not accept its ambiguity in an API contract, do not accept it here.
      </blockquote>

      <p>
        Structured prompting is the foundation everything else builds on — see how
        it scales into full systems in{" "}
        <a href="/blog/prompting-for-architecture-claude-full-stack">
          Prompting for Architecture
        </a>
        .
      </p>
    </>
  );
}

export const promptEngineeringFundamentals: BlogPost = {
  slug: "prompt-engineering-fundamentals-backend-devs",
  title: "Prompt Engineering Fundamentals for Backend Engineers",
  description:
    "A prompt is an API contract to an unreliable service. How structure, explicit constraints, and determinism knobs turn flaky LLM features into dependable ones.",
  keywords: [
    "prompt engineering",
    "backend",
    "LLM",
    "structured output",
    "temperature",
    "API contract",
    "AI",
  ],
  publishedAt: "2023-01-15",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Prompt Engineering", "Backend", "AI"],
  takeaways: [
    "Treat a prompt like an API contract: explicit role, context, constraints, and a rigid output format.",
    "Structure beats cleverness — boring, checklist-like prompts are portable across model versions; clever prose is fragile.",
    "Lower temperature for anything that must be consistent, and always validate the output against a schema.",
    "If you can't describe the request as a checklist, the model can't reliably fulfill it.",
  ],
  Body,
};
