import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 340"
        className="h-auto w-full"
        role="img"
        aria-label="A React Flow canvas wiring a trigger node into an agent node with typed input and output ports, branching to tool nodes, with an execution overlay highlighting the active path."
      >
        <defs>
          <marker id="rf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        <text x="24" y="32" fill="#67E8F9" fontFamily="monospace" fontSize="11">
          CONTROL PLANE · active path lit
        </text>

        {/* Trigger */}
        <rect x="32" y="140" width="120" height="56" rx="10" fill="#0b1018" stroke="#3f3f46" />
        <text x="92" y="173" fill="#e4e4e7" fontFamily="monospace" fontSize="12" textAnchor="middle">
          Trigger
        </text>
        <circle cx="152" cy="168" r="5" fill="#22D3EE" />

        {/* Agent node */}
        <rect x="280" y="120" width="170" height="96" rx="12" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="365" y="150" fill="#A855F7" fontFamily="monospace" fontSize="13" textAnchor="middle">
          Agent
        </text>
        <text x="365" y="168" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          reason · plan · call
        </text>
        {/* typed ports */}
        <circle cx="280" cy="168" r="5" fill="#22D3EE" />
        <circle cx="450" cy="148" r="5" fill="#A855F7" />
        <circle cx="450" cy="188" r="5" fill="#67E8F9" />
        <text x="462" y="152" fill="#71717a" fontFamily="monospace" fontSize="9">tool</text>
        <text x="462" y="192" fill="#71717a" fontFamily="monospace" fontSize="9">done</text>

        {/* Tool nodes */}
        <rect x="568" y="86" width="160" height="50" rx="10" fill="#0b1018" stroke="#3f3f46" />
        <text x="648" y="116" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">
          search_docs()
        </text>
        <circle cx="568" cy="111" r="5" fill="#A855F7" />

        <rect x="568" y="160" width="160" height="50" rx="10" fill="#0b1018" stroke="#3f3f46" />
        <text x="648" y="190" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">
          create_ticket()
        </text>
        <circle cx="568" cy="185" r="5" fill="#A855F7" />

        {/* Output */}
        <rect x="568" y="248" width="160" height="50" rx="10" fill="rgba(103,232,249,0.08)" stroke="#67E8F9" />
        <text x="648" y="278" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          response
        </text>
        <circle cx="568" cy="273" r="5" fill="#67E8F9" />

        {/* Edges — active path lit in cyan */}
        <path d="M152 168 C 210 168, 230 168, 280 168" stroke="#67E8F9" strokeWidth="2" fill="none" markerEnd="url(#rf-arrow)" />
        <path d="M450 148 C 500 130, 520 111, 568 111" stroke="#A855F7" strokeWidth="2" fill="none" markerEnd="url(#rf-arrow)" />
        <path d="M450 188 C 500 185, 520 185, 568 185" stroke="#3f3f46" strokeWidth="1.5" fill="none" markerEnd="url(#rf-arrow)" />
        <path d="M450 188 C 510 230, 520 273, 568 273" stroke="#3f3f46" strokeWidth="1.5" fill="none" markerEnd="url(#rf-arrow)" />
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        Nodes are agents and tools; typed ports are the contract; the lit edge is the run actually executing.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        React Flow is the canvas we all reach for to <em>sketch</em> a workflow. Where it really earns its keep is as the{" "}
        <strong>control plane for a running agent system</strong>. On IntegrateX, the same graph a PM drags to say &quot;when a ticket comes in,
        search the docs, then either answer or escalate&quot; is the exact spec the runtime executes — no shadow YAML, no parallel DSL. The moment
        you wire it this way, the diagram stops being decoration and becomes the program.
      </p>

      <h2>Nodes are capabilities, edges are contracts</h2>
      <p>
        Treat the canvas like a system, not clip art. A node is a capability: trigger, agent, tool, output. An edge is a typed contract that says
        one capability&apos;s output is valid input to the next. React Flow already gives you the primitives you need: custom node components and
        typed handles (ports). You&apos;re not fighting the library; you&apos;re finally using the part most demos skip.
      </p>

      <Diagram />

      <h2>Typed ports are the whole trick</h2>
      <p>
        The gap between a pretty drawing and a real orchestrator is whether connections carry meaning. Put a type on each handle — document stream,
        tool result, terminal &quot;done&quot; — and reject bad edges <em>while</em> the user is drawing. Entire categories of runtime bugs disappear,
        and your on-call future self stops diffing logs to learn someone piped a string into a tool port. If the port doesn&apos;t accept the edge,
        it can&apos;t ship broken.
      </p>

      <Terminal title="ports.ts">
        <span className="tok-com">{`// a handle carries a type; the canvas refuses incompatible edges`}</span>
        {"\n"}
        {`type PortType = "trigger" | "tool" | "text" | "done";\n\n`}
        {`function isValidConnection(c: Connection, nodes: AgentNode[]) {\n`}
        {`  const from = portType(nodes, c.source, c.sourceHandle);\n`}
        {`  const to   = portType(nodes, c.target, c.targetHandle);\n`}
        {`  return COMPATIBLE[from]?.includes(to) ?? false;\n`}
        {`}\n\n`}
        <span className="tok-com">{`// <ReactFlow isValidConnection={isValidConnection} />`}</span>
      </Terminal>

      <h2>Separate the render graph from the run graph</h2>
      <p>
        Keep one invariant or you&apos;ll drown in state-synchronization lag: React Flow state is the <em>render</em> model — positions, selection,
        pan/zoom, visual edges. The executor consumes a <em>derived</em> run graph — capabilities and typed wiring, no UI fluff. I package this as the
        pattern I call <strong>Trinity Architecture</strong>: (1) Presentation — the canvas renders and dispatches events; (2) Reactive State / Orchestration —
        a client store owns the source of truth and optimistic updates; (3) Data / Serialization Adapter — a boundary that compiles rich in-memory state
        into lean wire payloads. On IntegrateX, that Serialization Adapter stripped React Flow metadata before persistence and cut payload size 94%, which
        killed a whole class of sync stalls and payload bloat. Boundary rule: the UI never formats DB schemas; the adapter never pokes UI state directly —
        only through the orchestrator.
      </p>

      <h2>Why managers care</h2>
      <p>
        A visual, typed graph is readable to a PM, tweakable by support, and debuggable by engineers watching the active path light up in real time.
        You stop spelunking imperative glue and start pointing at a living artifact. Keep the overlay cheap and state isolated, and you avoid render
        thrash while the system streams results; hard-won habit from streamerOS, where 60fps mattered. The payoff here is clarity the whole team can ship against.
      </p>

      <blockquote>
        The best agent architecture is the one a non-author can read. A typed node graph turns &quot;trust me, the orchestration works&quot; into something you can point at.
      </blockquote>

      <p>
        Next: <a href="/blog/compiling-react-flow-graph-agent-pipeline">
          compiling that canvas into a runnable pipeline
        </a>
        , and the related pattern of{" "}
        <a href="/blog/router-agent-multi-agent-orchestration">
          routing between specialised agents
        </a>
        .
      </p>
    </>
  );
}

export const reactFlowAgentCanvas: BlogPost = {
  slug: "react-flow-agent-orchestration-canvas",
  title: "React Flow as an Agent Orchestration Canvas",
  description:
    "React Flow is more than a diagramming library — it is a control plane for running agent systems. How typed nodes and ports turn a visual canvas into an executable, debuggable agent orchestration layer.",
  keywords: [
    "React Flow agent",
    "visual AI workflow builder",
    "agentic workflow UI",
    "React Flow tutorial",
    "agent orchestration",
    "node based editor",
  ],
  publishedAt: "2026-06-05",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["React Flow", "Agentic AI", "Architecture"],
  takeaways: [
    "React Flow can be the control plane for a running agent system, not just a diagram of one.",
    "Reframe nodes as capabilities (trigger, agent, tool, output) and edges as typed contracts between them.",
    "Typed ports let the canvas reject invalid graphs at draw time, eliminating a class of runtime errors.",
    "Keep the render graph (React Flow state) separate from the derived run graph the executor consumes.",
  ],
  Body,
};
