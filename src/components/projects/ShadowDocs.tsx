import type { ReactNode } from "react";

/**
 * ShadowDocs — a side-by-side "prompt → generated artifact" window used to make
 * the AI-assisted authoring of IntegrateX's Serialization Adapter legible to a
 * non-author (e.g. an engineering manager auditing how the code came to exist).
 *
 * Left pane: the shadow context handed to the model. Right pane: the TypeScript
 * adapter it produced. Stacks vertically under `lg`. Matches the macOS window
 * chrome of `blog/Terminal.tsx` and the `.tok-*` syntax tokens in globals.css.
 */

const DIRECTIVE = `SYSTEM // Shadow context: react-flow graph persistence

ROLE
You are architecting a Serialization Adapter for an
interactive workflow graph built on React Flow + Zustand.

CONSTRAINTS
- Persist only the fields required to reconstruct the graph.
- Strip volatile / derived state: measured dimensions,
  selection + drag flags, internal RF handles, and any
  computed edge geometry.
- Emit a compact wire shape; rehydrate to full nodes on
  load. Primary objective: minimise database I/O per save.

OUTPUT
- A typed serializeGraph / deserializeGraph pair.`;

const GENERATED = `// adapters/graph-serialization.ts
import type { Node, Edge } from "reactflow";

// The volatile RF node is ~16 keys; the wire node is 5.
type Wire = ReturnType<typeof serializeGraph>;

export function serializeGraph(nodes: Node[], edges: Edge[]) {
  return {
    n: nodes.map((node) => ({
      i: node.id,
      t: node.type ?? "default",
      x: Math.round(node.position.x),
      y: Math.round(node.position.y),
      d: node.data,
    })),
    e: edges.map((edge) => [edge.source, edge.target]),
  };
}

export function deserializeGraph(wire: Wire) {
  return {
    nodes: wire.n.map((w) => ({
      id: w.i,
      type: w.t,
      position: { x: w.x, y: w.y },
      data: w.d,
    })),
    edges: wire.e.map(([source, target]) => ({
      id: source + "-" + target,
      source,
      target,
      animated: true,
    })),
  };
}`;

/** Renders code text, dimming comment lines via the `.tok-com` token. */
function CodeSurface({ text, accent }: { text: string; accent: string }) {
  return (
    <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-zinc-300">
      <code>
        {text.split("\n").map((line, i) => {
          const isComment = line.trimStart().startsWith("//");
          return (
            <span
              key={i}
              className={isComment ? "tok-com" : undefined}
              style={!isComment ? { color: accent } : undefined}
            >
              {line + "\n"}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

function PaneHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-zinc-800 bg-white/[0.02] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
      {children}
    </div>
  );
}

export default function ShadowDocs() {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-white/[0.02] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">
          shadow-docs · IntegrateX / Serialization Adapter
        </span>
      </div>

      {/* Panes — stacked on mobile, side-by-side from lg */}
      <div className="grid grid-cols-1 divide-y divide-zinc-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div>
          <PaneHeader>
            <span className="text-purple">AI Directive</span>{" "}
            <span className="text-zinc-600">(Shadow Context)</span>
          </PaneHeader>
          <CodeSurface text={DIRECTIVE} accent="#a1a1aa" />
        </div>

        <div>
          <PaneHeader>
            <span className="text-cyan">Generated Output</span>{" "}
            <span className="text-zinc-600">(graph-serialization.ts)</span>
          </PaneHeader>
          <CodeSurface text={GENERATED} accent="#d4d4d8" />
        </div>
      </div>
    </div>
  );
}
