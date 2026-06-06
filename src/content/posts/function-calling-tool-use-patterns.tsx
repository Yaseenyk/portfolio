import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Function calling is the moment a language model stopped being a text
        generator and became a controller. Instead of only emitting words, the
        model can choose to invoke a typed function you expose — query a database,
        hit an API, run a calculation — and use the result. It is the primitive
        every agent is built on, and getting the tool design right matters more
        than the model you use.
      </p>

      <h2>From text-out to action</h2>
      <p>
        You give the model a menu of tools, each with a name, a description, and a
        typed argument schema. The model reads the request, decides whether a tool
        is needed, and returns a structured call — which your code executes,
        feeding the result back. The model never touches your systems directly; it
        proposes, your runtime disposes.
      </p>

      <Terminal title="tools.ts">
        <span className="tok-com">{"// expose narrow, typed, well-described tools"}</span>
        {`
const tools = [{
  name: "get_case",
  description: "Fetch a case record by its ID.",
  parameters: z.object({ id: z.string() }),
}];

const call = await llm.run(prompt, { tools });
if (call.tool) {
  const result = await registry[call.tool](call.args);
  // feed result back to the model for the final answer
}`}
      </Terminal>

      <h2>Designing tools the model can use</h2>
      <p>
        Tools should be narrow, typed, and honestly described. A vague tool
        (&quot;do_stuff&quot;) gets misused; a sprawling one with a dozen optional
        arguments confuses the model. The description is part of the interface —
        it is how the model decides when to reach for it. Treat each tool like a
        public API you are documenting for a capable but literal-minded consumer.
      </p>

      <h2>Guardrails are not optional</h2>
      <p>
        The model proposes calls; it must never be trusted to execute them
        unchecked. Validate every argument against its schema before running,
        scope what each tool can touch, and gate anything destructive behind an
        explicit confirmation. Autonomy without guardrails is just a faster path
        to a production incident.
      </p>

      <blockquote>
        Function calling turns a model into an agent. The agent is only as safe as
        the narrowest, best-validated tool you gave it.
      </blockquote>

      <p>
        Tool-driven control loops are the core of the{" "}
        <a href="/blog/architecting-agentic-rag-pipelines-nodejs">
          Agentic RAG
        </a>{" "}
        architecture and the{" "}
        <a href="/blog/death-of-the-traditional-backend-router">
          intent-driven router
        </a>
        .
      </p>
    </>
  );
}

export const functionCallingToolUse: BlogPost = {
  slug: "function-calling-tool-use-patterns",
  title: "Function Calling: Tool-Use Patterns for Production Agents",
  description:
    "Function calling turns a model from a text generator into a controller. How to expose narrow, typed tools — and the guardrails that keep autonomous tool use safe.",
  keywords: [
    "function calling",
    "tool use",
    "agentic AI",
    "Node.js",
    "LLM agents",
    "validation",
    "AI architecture",
  ],
  publishedAt: "2024-06-09",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Agentic AI", "Tool Use", "Node.js"],
  takeaways: [
    "Function calling lets the model propose typed tool invocations that your runtime executes — the primitive every agent is built on.",
    "Design tools narrow, typed, and honestly described; the description is how the model decides when to use them.",
    "Never execute a proposed call unchecked: validate arguments, scope tool access, gate destructive actions behind confirmation.",
    "The agent is only as safe as the narrowest, best-validated tool you exposed.",
  ],
  Body,
};
