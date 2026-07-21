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
        the demos skip: <strong>how do you actually run it?</strong> On IntegrateX,
        the pretty graph was useless until we made it deterministic. A user-drawn
        graph has no inherent order, can fan out and then converge, and it may
        hide a cycle that will happily spin your workers forever. Turning that into
        a predictable, runnable pipeline is a compilation problem with a battle‑tested
        answer.
      </p>

      <h2>From render graph to execution plan</h2>
      <p>
        First, strip the canvas down to its essence. The executor does not care
        about positions or selection state; it cares about which capability feeds
        which. In the pattern I call Trinity Architecture, React Flow lives in the
        Presentation layer; the Reactive State / Orchestration layer (Zustand for
        IntegrateX) holds the active graph; and a Data / Serialization Adapter
        prepares what the runner needs. That adapter reduces rich UI state to a
        dependency map: for each node, the set of nodes that must finish before it
        can start. That adjacency — not the visual graph — is what you compile. A
        bonus from the same adapter on IntegrateX: we stripped UI‑only metadata and
        cut payload size by 94% before persisting.
      </p>

      <Diagram />

      <h2>Topological sort: the order falls out</h2>
      <p>
        A workflow graph is a DAG, and a DAG has a topological order: a linear
        sequence in which every node appears after all of its dependencies.
        Kahn&apos;s algorithm handles this cleanly. I let it pop nodes with no
        unmet deps, push successors when their indegree drops, and treat any
        leftovers as a hard error. That same pass becomes the cycle guard — if the
        processed count doesn&apos;t match, we fail fast before allocating a single
        worker or opening a stream.
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
        Read concurrency from the structure and you avoid hand‑tuned queues, head‑of‑line
        blocking, and the kind of backpressure bugs I fought in streamerOS. Cap
        parallelism per level, stream results, and you won&apos;t thrash renders or
        starve downstream consumers.
      </p>

      <h2>Why compile at all</h2>
      <p>
        Compilation is the seam that makes everything downstream tractable. A
        compiled plan is cacheable, serialisable, and — crucially — verifiable
        before a single agent runs. You can reject invalid graphs, estimate cost,
        and replay a run deterministically because the order is fixed. It also
        enforces the Trinity boundary: UI edits don&apos;t leak DB schemas, and the
        adapter never mutates UI state — it feeds the orchestrator, which drives the
        runner. The visual graph is for humans; the compiled plan is for the machine,
        and keeping them separate is what keeps edits fast and execution reliable.
      </p>

      <blockquote>
        The canvas is how you think; the compiled plan is how you guarantee it runs.
        Topological sort does both jobs in one pass: it orders the work and proves
        the graph is runnable.
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
        {" "}— the adapter layer in my Trinity split that made IntegrateX practical at scale.
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
