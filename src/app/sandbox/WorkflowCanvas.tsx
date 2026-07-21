"use client";

import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type Connection,
} from "reactflow";
import { create } from "zustand";
import "reactflow/dist/style.css";

const BORDER = {
  cyan: "#22D3EE",
  purple: "#A855F7",
  ice: "#67E8F9",
} as const;

const nodeStyle = (accent: string) => ({
  width: 184,
  padding: "10px 14px",
  borderRadius: 12,
  border: `1px solid ${accent}`,
  background: "#0b1018",
  color: "#e4e4e7",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  boxShadow: `0 0 22px -8px ${accent}`,
});

// `input` exposes only a source handle, `output` only a target handle — so the
// linear Webhook → LLM → Database pipeline can't be wired backwards.
const initialNodes: Node[] = [
  {
    id: "trigger",
    type: "input",
    position: { x: 40, y: 140 },
    data: { label: "Webhook Trigger" },
    style: nodeStyle(BORDER.cyan),
  },
  {
    id: "llm",
    position: { x: 320, y: 140 },
    data: { label: "LLM Processor" },
    style: nodeStyle(BORDER.purple),
  },
  {
    id: "db",
    type: "output",
    position: { x: 600, y: 140 },
    data: { label: "Database Write" },
    style: nodeStyle(BORDER.ice),
  },
];

const initialEdges: Edge[] = [
  {
    id: "trigger-llm",
    source: "trigger",
    target: "llm",
    animated: true,
    style: { stroke: BORDER.cyan },
  },
  {
    id: "llm-db",
    source: "llm",
    target: "db",
    animated: true,
    style: { stroke: BORDER.purple },
  },
];

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
}

// Exported so the SerializationBench can measure the live canvas state.
export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) =>
    set({
      edges: addEdge(
        { ...connection, animated: true, style: { stroke: BORDER.ice } },
        get().edges,
      ),
    }),
}));

export default function WorkflowCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowStore();

  // React Flow measures the DOM on mount and has no meaningful SSR output;
  // gate it behind a mount flag so the static export renders a clean placeholder
  // instead of a hydration-mismatched empty canvas.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const frame =
    "h-[340px] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-ink sm:h-[60vh] sm:min-h-[460px]";

  if (!mounted) {
    return (
      <div className={`${frame} grid place-items-center`}>
        <span className="font-mono text-xs text-zinc-600">
          initializing canvas…
        </span>
      </div>
    );
  }

  return (
    <div className={frame}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        style={{ background: "#05070A" }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#1f2937" />
        <Controls className="!border-zinc-800 !bg-ink/80" showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
