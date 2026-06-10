import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Ask Claude for today&apos;s order count and a naive integration gets back
        a confident, specific, completely invented number. The model has no
        database — it has a probability distribution over plausible-sounding
        answers. Tool use is how you close that gap: instead of hallucinating, the
        model pauses and asks <em>your</em> runtime to go get the real value. Get
        the request/result loop right and the same mechanism turns a chat model
        into an agent that can read databases, hit APIs, and run code.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        Tool use is a turn-based negotiation, not a callback. You send the model a
        list of tools — each a name, a description, and a JSON Schema for its
        inputs. When the model decides it needs one, it doesn&apos;t execute
        anything; it ends its turn with <code>stop_reason: &quot;tool_use&quot;</code>{" "}
        and emits one or more <code>tool_use</code> blocks naming the tool and its
        arguments. <strong>Your code</strong> runs the actual function, then
        sends the output back as a <code>tool_result</code> block referencing the
        call&apos;s <code>id</code>. The model picks up where it left off. The
        loop continues until a turn comes back without a tool request.
      </p>
      <p>
        The schema and the description are the entire interface, and they do more
        work than developers expect. The model chooses tools and fills arguments
        based almost entirely on the natural-language <code>description</code> —
        a vague one produces wrong tool selection and malformed inputs no amount
        of prompting fixes. Treat tool descriptions as the most load-bearing
        prose in your system: state what the tool does, when to use it, what each
        parameter means, and what it returns. The JSON Schema constrains shape;
        the description drives the decision.
      </p>
      <p>
        Claude can request multiple tools in a single turn, and that&apos;s a
        performance lever, not a curiosity. When the model needs the weather in
        three cities, it emits three <code>tool_use</code> blocks at once — you
        run them <em>concurrently</em> with <code>Promise.all</code> and return
        all results together, collapsing three sequential round-trips into one.
        Designing tools to be independent and parallel-safe is how you keep agent
        latency tolerable as the toolset grows.
      </p>
      <p>
        The trade-offs are real. Every tool definition lives in the context window
        (Lesson 1) and is re-sent each turn, so a sprawling toolset is a standing
        token tax — cache the definitions (Lesson 9) and prune what the model
        doesn&apos;t need. And tools are an execution surface: a{" "}
        <code>run_sql</code> tool with raw query access is a SQL-injection vector
        driven by a probabilistic caller. Constrain at the boundary — parameterize,
        allowlist, scope credentials — because the model is an untrusted planner,
        not a trusted executor.
      </p>

      <h2>The Agent Loop</h2>
      <p>
        The whole pattern is one loop: call, check the stop reason, execute any
        requested tools in parallel, feed results back, repeat.
      </p>
      <Terminal title="agent-loop.ts">
        <span className="tok-com">{"// The model plans; your runtime executes. Loop until it stops asking."}</span>
        {`
import Anthropic from "@anthropic-ai/sdk"
import type { MessageParam, Tool } from "@anthropic-ai/sdk/resources/messages"

const anthropic = new Anthropic()

const tools: Tool[] = [{
  name: "get_order_count",
  description: "Count orders for a given ISO date (YYYY-MM-DD). Use for any "
    + "question about how many orders were placed on a specific day.",
  input_schema: {
    type: "object",
    properties: { date: { type: "string", description: "ISO date" } },
    required: ["date"],
  },
}]

// Real implementations — parameterized, never string-built SQL.
const handlers: Record<string, (input: any) => Promise<unknown>> = {
  get_order_count: ({ date }) => db.orders.countByDate(date),
}

export async function runAgent(prompt: string) {
  const messages: MessageParam[] = [{ role: "user", content: prompt }]

  while (true) {
    const res = await anthropic.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      tools,
      messages,
    })
    messages.push({ role: "assistant", content: res.content })

    if (res.stop_reason !== "tool_use") return res   // model is done

    const calls = res.content.filter((b) => b.type === "tool_use")
    // Independent tools run concurrently — N round-trips collapse to one.
    const results = await Promise.all(calls.map(async (c: any) => ({
      type: "tool_result" as const,
      tool_use_id: c.id,
      content: JSON.stringify(await handlers[c.name](c.input)),
    })))
    messages.push({ role: "user", content: results })
  }
}`}
      </Terminal>
      <p>
        Every branch matters: appending the assistant turn before answering keeps
        the transcript valid, matching <code>tool_use_id</code> wires each result
        to its request, and the <code>stop_reason</code> check is the only thing
        ending the loop.
      </p>

      <h2>One Turn of the Loop</h2>
      <Diagram
        label="The tool-use cycle: a user prompt to Claude, the model returning a tool_use block with stop_reason tool_use, the application executing the function, and a tool_result block sent back for the model's final answer."
        caption="Request → execute in your runtime → result → answer. The model plans; it never executes."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <marker id="an4-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
          </defs>

          <rect x="40" y="48" width="180" height="56" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="130" y="74" fill="#67e8f9" fontFamily="monospace" fontSize="13" textAnchor="middle">Claude</text>
          <text x="130" y="93" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle">planner (untrusted)</text>

          <rect x="540" y="48" width="180" height="56" rx="8" fill="#0b1220" stroke="#a855f7" strokeWidth="1.5" />
          <text x="630" y="74" fill="#c4b5fd" fontFamily="monospace" fontSize="13" textAnchor="middle">Your Runtime</text>
          <text x="630" y="93" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle">executor (trusted)</text>

          {/* tool_use down to runtime */}
          <line x1="220" y1="80" x2="540" y2="80" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an4-arrow)" />
          <text x="380" y="70" fill="#67e8f9" fontFamily="monospace" fontSize="11" textAnchor="middle">stop_reason: tool_use → {`{ date }`}</text>

          {/* execute box */}
          <rect x="540" y="132" width="180" height="52" rx="8" fill="#160d1f" stroke="#a855f7" strokeWidth="1.5" />
          <text x="630" y="158" fill="#e2e8f0" fontFamily="monospace" fontSize="12" textAnchor="middle">db.countByDate()</text>
          <text x="630" y="175" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">parameterized · scoped</text>
          <line x1="630" y1="104" x2="630" y2="132" stroke="#a855f7" strokeWidth="2" markerEnd="url(#an4-arrow)" />

          {/* tool_result back up */}
          <line x1="540" y1="208" x2="220" y2="208" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an4-arrow)" />
          <text x="380" y="198" fill="#94a3b8" fontFamily="monospace" fontSize="11" textAnchor="middle">tool_result: {`{ count: 1432 }`}</text>
          <line x1="630" y1="184" x2="630" y2="208" stroke="#22d3ee" strokeWidth="2" />
          <line x1="130" y1="208" x2="130" y2="104" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an4-arrow)" />

          <text x="130" y="240" fill="#67e8f9" fontFamily="monospace" fontSize="11" textAnchor="middle">final answer</text>
          <text x="380" y="258" fill="#64748b" fontFamily="monospace" fontSize="11" textAnchor="middle">loop repeats until a turn has no tool_use block</text>
        </svg>
      </Diagram>
      <p>
        With the loop understood, the next question is how to expose tools to{" "}
        <em>many</em> agents without re-wiring each one — the{" "}
        <a href="/blog/model-context-protocol-mcp-server-foundations">
          Model Context Protocol
        </a>
        . Or see{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const toolUseFunctionCalling: BlogPost = {
  slug: "tool-use-function-calling-mechanics",
  title: "Tool Use & Function Calling Mechanics in Claude",
  description:
    "Claude hallucinates data it should fetch. Tool use fixes it: the model requests a function, your runtime executes it, and the result flows back. The full agent loop, explained.",
  keywords: [
    "Claude tool use",
    "function calling",
    "agent loop",
    "tool_use tool_result",
    "stop_reason",
    "parallel tool calls",
    "Anthropic agents",
    "Claude function calling",
  ],
  publishedAt: "2026-06-07",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude", "Agents"],
  takeaways: [
    "Tool use is turn-based: the model ends its turn with stop_reason tool_use and emits tool_use blocks; your code executes the function and returns a tool_result, and the loop repeats until a turn has no tool request.",
    "The natural-language tool description drives tool selection and argument filling more than the JSON Schema — write it as the most load-bearing prose in your system.",
    "Claude can request multiple tools in one turn; run independent ones concurrently with Promise.all to collapse sequential round-trips into one.",
    "The model is an untrusted planner, not a trusted executor — constrain tools at the boundary with parameterization, allowlists, and scoped credentials, and cache definitions to control token cost.",
  ],
  Body,
};
