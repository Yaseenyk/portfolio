import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function ControlLoopDiagram() {
  return (
    <Diagram
      label="A circular observe-decide-act control loop. Decide branches out to tool calls; a step-budget counter and a termination gate sit on the loop to stop it running away."
      caption="An agent is a loop over tools: observe → decide → act → observe. The step budget and termination gate are what separate an autonomous system from a runaway one."
    >
      <svg viewBox="0 0 760 320" role="img" aria-label="Agentic control loop">
        <defs>
          <marker id="al-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* loop nodes */}
        {[
          ["observe", 200, 70, "#67E8F9"],
          ["decide", 330, 160, "#22D3EE"],
          ["act", 200, 250, "#A855F7"],
        ].map(([label, cx, cy, color]) => (
          <g key={label as string}>
            <rect x={(cx as number) - 60} y={(cy as number) - 24} width="120" height="48" rx="10" fill="#0b1018" stroke={color as string} />
            <text x={cx as number} y={(cy as number) + 5} fill={color as string} fontFamily="monospace" fontSize="12" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}

        {/* loop arrows */}
        <path d="M230 92 C 300 100, 320 120, 330 136" stroke="#52525b" strokeWidth="1.5" fill="none" markerEnd="url(#al-arrow)" />
        <path d="M330 184 C 320 210, 290 226, 250 238" stroke="#52525b" strokeWidth="1.5" fill="none" markerEnd="url(#al-arrow)" />
        <path d="M170 230 C 120 200, 120 120, 160 88" stroke="#52525b" strokeWidth="1.5" fill="none" markerEnd="url(#al-arrow)" />

        {/* tools branching from decide */}
        {[
          ["search()", 60],
          ["db.query()", 130],
          ["sendEmail()", 200],
        ].map(([label, y]) => (
          <g key={label as string}>
            <rect x="510" y={(y as number) - 16} width="150" height="36" rx="8" fill="rgba(168,85,247,0.06)" stroke="#A855F7" />
            <text x="585" y={(y as number) + 7} fill="#c4b5fd" fontFamily="monospace" fontSize="10" textAnchor="middle">
              {label}
            </text>
            <line x1="392" y1="160" x2="506" y2={(y as number)} stroke="#52525b" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#al-arrow)" />
          </g>
        ))}

        {/* termination gate + budget */}
        <rect x="510" y="232" width="150" height="44" rx="10" fill="rgba(244,63,94,0.07)" stroke="#f43f5e" />
        <text x="585" y="252" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="middle">
          done? / budget?
        </text>
        <text x="585" y="267" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          else stop
        </text>
        <line x1="392" y1="172" x2="506" y2="250" stroke="#f43f5e" strokeWidth="1.2" markerEnd="url(#al-arrow)" />
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        A chatbot answers. An agent acts. The split isn&apos;t parameter count or a
        cuter prompt — it&apos;s a tight control loop. Observe real state, decide the
        next action, act through a tool, observe again, repeat. The loop carries the
        intelligence; any single inference is just one tick.
      </p>

      <h2>Agents are loops over tools, not bigger prompts</h2>
      <p>
        When an LLM can&apos;t reach, the reflex is to pour more words into the
        prompt. The agent move is different: give it a tool and a loop. Each turn the
        model sees the current state, chooses one action from a narrow, typed toolset,
        and the runtime executes then feeds back the result. On IntegrateX, keeping a
        small, deterministic tool surface forced the planner to be honest and made
        failures debuggable. A single inference can&apos;t book a flight; a loop that
        can call <code>search</code>,{" "}
        <code>select</code>, and <code>pay</code> across several turns can.
      </p>

      <ControlLoopDiagram />

      <h2>Every loop needs a way to stop</h2>
      <p>
        The failure mode isn&apos;t &quot;bad answer&quot;; it&apos;s the runaway
        loop: spinning tools, burning tokens, and hammering backends. So termination
        is part of the design, not a TODO. Give the loop an explicit success check{" "}
        <em>and</em> a hard step budget. If it can&apos;t finish, it should escalate
        cleanly, not grind the meter. I learned this building streamerOS — once your
        tick rate outruns the budget, you create backpressure and starve the next
        frame. Agents are no different.
      </p>

      <Terminal title="agent.ts">
        <span className="tok-com">{`// the loop is the architecture — note the two ways out`}</span>
        {"\n"}
        {`let state = init(task);\n`}
        {`for (let step = 0; step < MAX_STEPS; step++) {   // hard budget\n`}
        {`  const action = await model.decide(state, TOOLS);\n`}
        {`  if (action.type === "finish") return action.result; // success exit\n`}
        {`  const result = await TOOLS[action.name](action.args);\n`}
        {`  state = reduce(state, result);                // carry memory forward\n`}
        {`}\n`}
        {`return escalate(state); // budget exhausted → hand off, don't loop\n`}
      </Terminal>

      <h2>State between iterations is the hard part</h2>
      <p>
        The reasoning step demos well; the state work decides if it ships. What should
        carry across turns, and how do you keep it inside the token budget? If you
        just append every tool result, the context window and your bill vanish in a
        few cycles. Real agents <em>reduce</em> state — summarise, prune, and keep
        only what the next decision needs. I use the pattern I call Trinity
        Architecture: the loop is the Reactive State / Orchestration layer; a
        Serialization Adapter shapes rich in-memory context into lean prompts and tool
        payloads; Presentation only renders traces. That adapter paid for itself on
        IntegrateX when it stripped React Flow UI metadata before persistence — a 94%
        payload cut — and the same idea keeps agent memory tight and stable.
      </p>

      <blockquote>
        Autonomy isn&apos;t a smarter answer; it&apos;s a disciplined loop with a
        budget, a stop gate, and a memory you curate on purpose.
      </blockquote>

      <p>
        Keep each specialist in the loop a{" "}
        <a href="/blog/rag-grounding-the-agent">grounded RAG agent</a>, route between
        them with the{" "}
        <a href="/blog/router-agent-multi-agent-orchestration">router pattern</a>,
        and run the whole thing{" "}
        <a href="/blog/latency-first-ai-serverless-hono">at the edge</a>. Continue on
        the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const agenticControlLoops: BlogPost = {
  slug: "agentic-control-loops",
  title: "Agentic Control Loops: Building Autonomous Systems That Stop",
  description:
    "A chatbot answers; an agent acts. The difference is a control loop — observe, decide, act, observe — with tools as the hands, a hard step budget, and a termination condition so autonomy doesn't run away.",
  keywords: [
    "agentic AI",
    "control loop",
    "autonomous agents",
    "tool use",
    "agent state management",
    "AI orchestration",
  ],
  publishedAt: "2026-04-27",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["Agentic AI", "Architecture", "AI"],
  takeaways: [
    "Agents are loops over tools, not bigger prompts: observe → decide → act → observe, repeated.",
    "Every loop needs an explicit success condition and a hard step budget so it degrades to a clean stop, never a runaway spend.",
    "State and memory between iterations — reducing, not appending — is the real engineering, not the reasoning step.",
  ],
  Body,
};
