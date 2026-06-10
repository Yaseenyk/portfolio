import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Your pipeline expected <code>{`{ "category": "billing" }`}</code> and
        Claude returned &quot;Sure! This looks like a billing issue, here&apos;s
        the JSON:&quot; wrapped in a markdown fence. So you reached for a regex to
        rip the object out of the prose, and that regex has been the source of
        every 2am page since. An LLM that returns prose can&apos;t drive a system.
        The job is to make the model emit a typed object and to validate that
        object at the boundary — before it ever touches your code.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        The reliable way to get JSON out of Claude is not &quot;please respond in
        JSON&quot; — it&apos;s <strong>tool use</strong>. Define a tool whose{" "}
        <code>input_schema</code> is the shape you want, then set{" "}
        <code>tool_choice</code> to force that tool. The model is now constrained
        to produce arguments matching your JSON Schema, and the API hands you the
        object as the tool call&apos;s <code>input</code> — no fences, no
        preamble, no parsing. You&apos;ve turned a generation problem into a
        function-signature problem.
      </p>
      <p>
        But a schema the model <em>tried</em> to satisfy is not a guarantee. The
        JSON Schema you pass to the API constrains structure, but it can&apos;t
        express every invariant your domain needs — a severity that must be 1–5,
        a summary under 120 characters, an enum that must be exhaustive. So you
        keep a second contract on your side of the wire: a{" "}
        <strong>Zod schema</strong> that is the real source of truth.{" "}
        <code>z.infer</code> gives you the static type for free, and{" "}
        <code>.parse()</code> enforces the runtime invariants the moment data
        crosses the boundary. One definition, both a compile-time type and a
        runtime gate.
      </p>
      <p>
        The trade-off is what to do on a validation miss, and the answer is rarely
        &quot;crash.&quot; A failed parse is signal: feed the validation error
        back to the model as a <code>tool_result</code> and ask it to correct the
        offending field. One repair round-trip fixes the overwhelming majority of
        misses cheaply. Bound the retries — two or three — so a genuinely
        impossible request fails fast instead of looping. This is the same
        discipline as the output-budget guard from Lesson 1: validate at the
        edge, fail loudly, never let malformed data leak inward.
      </p>
      <p>
        Note the model-routing angle: forced-tool JSON extraction is a
        well-structured, low-creativity task. You don&apos;t need Opus 4.8 for it
        — Sonnet 4.6 or even Haiku 4.5 hits the schema reliably at a fraction of
        the cost and latency. Reserve the flagship for the reasoning, and let a
        cheaper model do the structured plumbing.
      </p>

      <h2>A Validated Extraction</h2>
      <p>
        One Zod schema is the contract. The tool forces the shape; Zod enforces
        the invariants the JSON Schema can&apos;t.
      </p>
      <Terminal title="classify.ts">
        <span className="tok-com">{"// One definition → a compile-time type AND a runtime gate."}</span>
        {`
import Anthropic from "@anthropic-ai/sdk"
import { z } from "zod"

const Ticket = z.object({
  category: z.enum(["billing", "bug", "feature", "other"]),
  severity: z.number().int().min(1).max(5),
  summary:  z.string().max(120),
})
type Ticket = z.infer<typeof Ticket>

const anthropic = new Anthropic()

export async function classify(text: string): Promise<Ticket> {
  const res = await anthropic.messages.create({
    model: "claude-haiku-4-5",        // structured plumbing — cheap tier
    max_tokens: 512,
    tool_choice: { type: "tool", name: "emit_ticket" },
    tools: [{
      name: "emit_ticket",
      description: "Return the structured ticket classification.",
      input_schema: {
        type: "object",
        properties: {
          category: { type: "string", enum: ["billing","bug","feature","other"] },
          severity: { type: "integer", minimum: 1, maximum: 5 },
          summary:  { type: "string" },
        },
        required: ["category","severity","summary"],
      },
    }],
    messages: [{ role: "user", content: text }],
  })

  const block = res.content.find((b) => b.type === "tool_use")
  if (block?.type !== "tool_use") throw new Error("model returned no tool call")

  // The schema is the contract, not a suggestion. Throws → caller can repair.
  return Ticket.parse(block.input)
}`}
      </Terminal>
      <p>
        Wrap the call in a bounded retry that re-sends Zod&apos;s error message as
        a correction prompt, and the rare miss self-heals in one round-trip
        instead of paging you.
      </p>

      <h2>The Validation Boundary</h2>
      <Diagram
        label="Flow of a Claude tool call producing JSON arguments, passing through a Zod validation gate that either yields a typed object or loops a correction request back to the model."
        caption="Forced tool use shapes the JSON; Zod is the gate. A miss becomes a repair loop, not a crash."
      >
        <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="260" fill="#05070A" />
          <defs>
            <marker id="an3-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
            <marker id="an3-arrow-p" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#a855f7" />
            </marker>
          </defs>

          <rect x="28" y="98" width="150" height="60" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="103" y="124" fill="#67e8f9" fontFamily="monospace" fontSize="13" textAnchor="middle">Claude</text>
          <text x="103" y="144" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle">forced tool</text>

          <line x1="180" y1="128" x2="250" y2="128" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an3-arrow)" />
          <text x="215" y="118" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">JSON</text>

          <rect x="252" y="98" width="170" height="60" rx="8" fill="#0b1220" stroke="#a855f7" strokeWidth="2" />
          <text x="337" y="124" fill="#c4b5fd" fontFamily="monospace" fontSize="13" textAnchor="middle">Zod .parse()</text>
          <text x="337" y="144" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle">runtime contract</text>

          {/* pass */}
          <line x1="424" y1="128" x2="496" y2="128" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an3-arrow)" />
          <text x="460" y="118" fill="#67e8f9" fontFamily="monospace" fontSize="10" textAnchor="middle">pass</text>
          <rect x="498" y="98" width="234" height="60" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="615" y="124" fill="#e2e8f0" fontFamily="monospace" fontSize="13" textAnchor="middle">typed Ticket</text>
          <text x="615" y="144" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle">safe to drive the system</text>

          {/* fail loop */}
          <path d="M337,160 L337,210 L103,210 L103,160" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#an3-arrow-p)" />
          <text x="220" y="228" fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="middle">fail → re-send error, bounded repair (≤3)</text>
        </svg>
      </Diagram>
      <p>
        Structured output is what turns a chat model into a component. Next, the
        full mechanics behind that <code>tool_use</code> block:{" "}
        <a href="/blog/tool-use-function-calling-mechanics">
          tool use &amp; function calling
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const jsonStructuredOutputs: BlogPost = {
  slug: "json-structured-outputs-type-safe-zod",
  title: "Structured JSON Outputs from Claude with Type-Safe Zod Contracts",
  description:
    "Parsing Claude's prose with regex breaks pipelines. Force type-safe JSON with tool use, then validate it at the boundary with a Zod contract that doubles as your type.",
  keywords: [
    "Claude JSON output",
    "structured outputs",
    "Zod validation",
    "tool use JSON",
    "type-safe LLM",
    "Anthropic tool_choice",
    "schema validation",
    "LLM data extraction",
  ],
  publishedAt: "2026-06-08",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude", "TypeScript"],
  takeaways: [
    "The reliable way to get JSON from Claude is forced tool use: define a tool whose input_schema is the target shape and set tool_choice, so the API returns the object directly with no fences or parsing.",
    "Keep a Zod schema as the real contract — z.infer gives the static type and .parse() enforces runtime invariants (ranges, lengths, enums) the JSON Schema can't express.",
    "On a validation miss, feed Zod's error back as a tool_result and let the model repair the field; bound retries to 2–3 so impossible requests fail fast.",
    "Forced-tool JSON extraction is low-creativity work — route it to Haiku 4.5 or Sonnet 4.6 and reserve Opus 4.8 for the reasoning.",
  ],
  Body,
};
