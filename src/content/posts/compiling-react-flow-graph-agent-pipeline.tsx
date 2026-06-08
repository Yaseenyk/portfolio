import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 330"
        className="h-auto w-full"
        role="img"
        aria-label="A visual node graph on the left is compiled into a topologically ordered execution plan on the right, with a cycle-detection guard."
      >
        <defs>
          <marker id="cp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Left: visual graph */}
        <text x="24" y="32" fill="#A855F7" fontFamily="monospace" fontSize="11">
          VISUAL GRAPH
        </text>
        <rect x="32" y="56" width="80" height="40" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="72" y="81" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">A</text>
        <rect x="160" y="56" width="80" height="40" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="200" y="81" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">B</text>
        <rect x="96" y="150" width="80" height="40" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="136" y="175" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">C</text>
        <rect x="96" y="240" width="80" height="40" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="136" y="265" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">D</text>
        <path d="M72 96 L120 150" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cp-arrow)" />
        <path d="M200 96 L152 150" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cp-arrow)" />
        <path d="M136 190 L136 236" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cp-arrow)" />

        {/* compile arrow */}
        <rect x="300" y="150" width="120" height="40" rx="20" fill="rgba(34,211,238,0.08)" stroke="#22D3EE" />
        <text x="360" y="175" fill="#22D3EE" fontFamily="monospace" fontSize="12" textAnchor="middle">
          compile()
        </text>
        <line x1="260" y1="170" x2="298" y2="170" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cp-arrow)" />
        <line x1="422" y1="170" x2="468" y2="170" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cp-arrow)" />

        {/* cycle guard */}
        <text x="360" y="226" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          ↑ cycle? throw
        </text>

        {/* Right: ordered plan */}
        <text x="560" y="32" fill="#67E8F9" fontFamily="monospace" fontSize="11">
          EXECUTION PLAN
        </text>
        {["A · B", "C", "D"].map((label, i) => (
          <g key={label}>
            <rect x="500" y={56 + i * 64} width="220" height="44" rx="8" fill="rgba(103,232,249,0.06)" stroke="#67E8F9" />
            <text x="520" y={83 + i * 64} fill="#67E8F9" fontFamily="monospace" fontSize="11">
              {`step ${i + 1}`}
            </text>
            <text x="700" y={83 + i * 64} fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="end">
              {label}
            </text>
            {i < 2 && (
              <line x1="610" y1={100 + i * 64} x2="610" y2={120 + i * 64} stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cp-arrow)" />
            )}
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        Compilation: a topological sort turns a freeform graph into an ordered plan — and rejects cycles before they run.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        A React Flow canvas is gorgeous and entirely inert. It is a set of nodes
        and edges with positions. The interesting engineering question is the one
        the demos skip: <strong>how do you actually run it?</strong> A freeform
        graph has no inherent order, may fan out and back in, and — because a user
        drew it — may contain a cycle that would loop forever. Turning that into a
        deterministic, runnable pipeline is a compilation problem, and it has a
        clean, classic solution.
      </p>

      <h2>From render graph to execution plan</h2>
      <p>
        First, strip the canvas down to its essence. The executor does not care
        about positions or selection state; it cares about which capability feeds
        which. Reduce the React Flow state to a dependency map: for every node,
        the set of nodes that must complete before it can start. That adjacency
        structure — not the visual graph — is what you compile.
      </p>

      <Diagram />

      <h2>Topological sort: the order falls out</h2>
      <p>
        A workflow graph is a DAG, and a DAG has a topological order: a linear
        sequence in which every node appears after all of its dependencies.
        Kahn&apos;s algorithm computes it by repeatedly taking nodes with no
        remaining unmet dependencies. As a bonus, it doubles as your cycle
        detector — if you finish with nodes still unprocessed, the graph contains a
        cycle, and you refuse to run rather than hang.
      </p>

      <Terminal title="compile.ts">
        <span className="tok-com">{`// Kahn's algorithm: produces run order AND detects cycles`}</span>
        {"\n"}
        {`function compile(graph: RunGraph): Node[] {\n`}
        {`  const indeg = new Map(graph.nodes.map((n) => [n.id, 0]));\n`}
        {`  for (const e of graph.edges) indeg.set(e.target, indeg.get(e.target)! + 1);\n\n`}
        {`  const ready = graph.nodes.filter((n) => indeg.get(n.id) === 0);\n`}
        {`  const order: Node[] = [];\n`}
        {`  while (ready.length) {\n`}
        {`    const n = ready.shift()!;\n`}
        {`    order.push(n);\n`}
        {`    for (const m of successors(graph, n.id)) {\n`}
        {`      indeg.set(m, indeg.get(m)! - 1);\n`}
        {`      if (indeg.get(m) === 0) ready.push(byId(graph, m));\n`}
        {`    }\n`}
        {`  }\n`}
        {`  if (order.length !== graph.nodes.length) throw new Error("cycle detected");\n`}
        {`  return order;\n`}
        {`}`}
      </Terminal>

      <h2>Parallelism is free once you have levels</h2>
      <p>
        The topological sort gives you more than a line — it gives you levels.
        Nodes that share the same dependency depth have no ordering constraint
        between them, which means they can run concurrently. In the diagram, A and
        B occupy step one and execute in parallel; C waits for both; D waits for C.
        You get correct concurrency not by hand-annotating it but by reading it
        off the structure.
      </p>

      <h2>Why compile at all</h2>
      <p>
        Compilation is the seam that makes everything downstream tractable. A
        compiled plan is cacheable, serialisable, and — crucially — verifiable
        before a single agent runs. You can reject invalid graphs, estimate cost,
        and replay a run deterministically because the order is fixed. The visual
        graph is for humans; the compiled plan is for the machine, and keeping them
        separate is what makes the system both editable and reliable.
      </p>

      <blockquote>
        The canvas is the source; the compiled plan is the program. Topological
        sort is the compiler — and the same pass that orders your nodes is the one
        that proves the graph can run at all.
      </blockquote>

      <p>
        This is the runtime half of{" "}
        <a href="/blog/react-flow-agent-orchestration-canvas">
          using React Flow as an orchestration canvas
        </a>
        . For persisting these graphs without shipping the cache, see the{" "}
        <a href="/blog/94-percent-payload-reduction-react-flow">
          serialization adapter pattern
        </a>
        .
      </p>
    </>
  );
}

export const compilingReactFlowAgent: BlogPost = {
  slug: "compiling-react-flow-graph-agent-pipeline",
  title: "From Diagram to Execution: Compiling a React Flow Graph into a Runnable Agent Pipeline",
  description:
    "A React Flow canvas is inert until you compile it. How to reduce a visual node graph to a dependency map, topologically sort it into a runnable plan, detect cycles, and extract free parallelism.",
  keywords: [
    "React Flow execution engine",
    "topological sort DAG",
    "node graph compiler",
    "workflow engine TypeScript",
    "agent pipeline",
    "cycle detection",
  ],
  publishedAt: "2026-06-03",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["React Flow", "Agentic AI", "Algorithms"],
  takeaways: [
    "Running a visual graph is a compilation problem: reduce the canvas to a dependency map, not the rendered nodes.",
    "Kahn's topological sort produces a deterministic run order and detects cycles in the same pass.",
    "Nodes at the same dependency depth can run concurrently — parallelism falls out of the structure for free.",
    "A compiled plan is cacheable, verifiable before execution, and deterministically replayable.",
  ],
  Body,
};
