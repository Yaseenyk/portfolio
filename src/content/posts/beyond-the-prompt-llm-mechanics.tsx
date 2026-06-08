import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function ContextBudgetDiagram() {
  const segments = [
    ["system", 70, "#67E8F9"],
    ["retrieved context", 230, "#A855F7"],
    ["history", 140, "#22D3EE"],
    ["question", 90, "#3f3f46"],
  ] as const;
  let x = 40;

  return (
    <Diagram
      label="A fixed-width context window bar partitioned into system prompt, retrieved context, history, and the question, with a separate logits-to-sample pipeline below."
      caption="The context window is a fixed byte budget you partition. Below it: logits → softmax → sample is where temperature turns one model into many possible answers."
    >
      <svg viewBox="0 0 760 300" role="img" aria-label="Context window budget and sampling pipeline">
        <text x="40" y="40" fill="#71717a" fontFamily="monospace" fontSize="11">
          context window — a fixed token budget
        </text>

        {/* Budget bar */}
        <rect x="40" y="54" width="680" height="46" rx="8" fill="#0b1018" stroke="#3f3f46" />
        {segments.map(([label, w, color]) => {
          const seg = (
            <g key={label}>
              <rect x={x} y="54" width={w} height="46" fill={`${color}22`} stroke={color} />
              <text x={x + w / 2} y="81" fill={color} fontFamily="monospace" fontSize="10" textAnchor="middle">
                {label}
              </text>
            </g>
          );
          x += w;
          return seg;
        })}
        <text x="724" y="81" fill="#71717a" fontFamily="monospace" fontSize="10">
          ⟂
        </text>
        <text x="720" y="120" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="end">
          overflow → truncation
        </text>

        {/* Sampling pipeline */}
        <text x="40" y="178" fill="#71717a" fontFamily="monospace" fontSize="11">
          next-token sampling
        </text>
        {[
          ["logits", 40, "#3f3f46"],
          ["softmax", 240, "#22D3EE"],
          ["temperature", 440, "#A855F7"],
          ["sample →", 640, "#67E8F9"],
        ].map(([label, bx, color], i) => (
          <g key={label as string}>
            <rect x={bx as number} y="192" width="150" height="44" rx="8" fill="#0b1018" stroke={color as string} />
            <text x={(bx as number) + 75} y="219" fill={color as string} fontFamily="monospace" fontSize="11" textAnchor="middle">
              {label}
            </text>
            {i < 3 && (
              <line x1={(bx as number) + 150} y1="214" x2={(bx as number) + 200} y2="214" stroke="#52525b" strokeWidth="1.5" />
            )}
          </g>
        ))}
        <text x="515" y="262" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          higher temperature = flatter distribution = more variance
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        Prompt engineering is UX for a function you don&apos;t control. It matters,
        but it&apos;s the surface. To architect <em>with</em> an LLM rather than
        merely talk to one, you need the mechanics underneath: how text becomes
        tokens, why the context window is a budget and not a memory, and why the
        same prompt can give you a different answer every time.
      </p>

      <h2>The context window is a byte budget, not a memory</h2>
      <p>
        The most expensive misconception in AI engineering is treating the context
        window like RAM the model &quot;remembers.&quot; It is a fixed-width budget
        you allocate every single call: system instructions, retrieved context,
        conversation history, and the question all compete for the same finite
        token count. Overflow doesn&apos;t error — it silently truncates, and the
        thing that gets dropped is usually the context you most needed.
      </p>

      <ContextBudgetDiagram />

      <h2>Determinism is a parameter, not a property</h2>
      <p>
        A model doesn&apos;t &quot;decide&quot; an answer — it produces a
        probability distribution over the next token, then samples from it.
        Temperature reshapes that distribution: low temperature sharpens it toward
        the single most likely token (near-deterministic), high temperature
        flattens it (more variance). When stakeholders ask why the system gave two
        different answers to the same question, the honest answer is: because you
        asked it to roll dice.
      </p>

      <Terminal title="generate.ts">
        <span className="tok-com">{`// determinism is a knob you set, not a trait you assume`}</span>
        {"\n"}
        {`const answer = await model.generate({\n`}
        {`  prompt,\n`}
        {`  temperature: 0,   // sharpen toward the argmax token\n`}
        {`  top_p: 1,         // (no nucleus truncation needed at temp 0)\n`}
        {`  max_tokens: 512,  // reserve budget for the ANSWER, not just input\n`}
        {`});`}
      </Terminal>

      <h2>Tokenization is where the bugs live</h2>
      <p>
        Cost, latency, and truncation are all denominated in tokens, not
        characters — and tokens don&apos;t map cleanly to words. A JSON blob, a
        non-English language, or a long ID can cost far more tokens than its length
        suggests. Budgeting in characters is how you get a payload that fits in your
        head but overflows the window in production. Measure in tokens, reserve
        headroom for the output, and treat the count as a first-class constraint.
      </p>

      <blockquote>
        You can&apos;t architect a system whose core you model as magic. Tokens,
        budgets, and sampling are the three mechanics that turn &quot;prompting&quot;
        into engineering.
      </blockquote>

      <p>
        These mechanics underwrite everything downstream: the token budget is why{" "}
        <a href="/blog/vector-foundations-semantic-search">retrieval has to be selective</a>,
        and sampling variance is why{" "}
        <a href="/blog/guardrail-engineering-hallucination-prevention">guardrails verify outputs</a>{" "}
        instead of trusting them. Full series on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const beyondThePrompt: BlogPost = {
  slug: "beyond-the-prompt-llm-mechanics",
  title: "Beyond the Prompt: The LLM Mechanics Architects Actually Need",
  description:
    "Prompt engineering is UX for a function you don't control. To architect with LLMs you need the mechanics: tokens, the context window as a byte budget, and why determinism is a sampling parameter — not a model property.",
  keywords: [
    "LLM mechanics",
    "context window",
    "tokenization",
    "temperature sampling",
    "prompt engineering",
    "LLM architecture",
  ],
  publishedAt: "2026-03-16",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "LLM", "Architecture"],
  takeaways: [
    "The context window is a fixed token budget you allocate every call — overflow silently truncates, it does not error.",
    "Determinism is a sampling parameter (temperature/top-p), not a property of the model.",
    "Cost, latency, and truncation are denominated in tokens, not characters — budget in tokens and reserve output headroom.",
  ],
  Body,
};
