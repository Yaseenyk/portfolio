"use client";

import { useFlowStore } from "./WorkflowCanvas";

const TYPE_CODES: Record<string, number> = { input: 0, default: 1, output: 2 };

const bytesOf = (s: string) => new TextEncoder().encode(s).length;

function fmt(bytes: number): string {
  return bytes >= 1024 ? `${(bytes / 1024).toFixed(2)} KB` : `${bytes} B`;
}

/**
 * Live proof of the IntegrateX serialization thesis, measured from the real
 * canvas above: the raw React Flow state (what the naive approach persists)
 * versus a schema-aware struct that stores only what the schema can't derive.
 * Every drag re-runs the measurement — nothing here is mocked.
 */
export default function SerializationBench() {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);

  // What JSON.stringify(store) would persist: styles, handles, floats,
  // renderer bookkeeping — the "view" leaking into the database.
  const raw = JSON.stringify({ nodes, edges });

  // The adapter's output: node = [typeCode, x, y, label]; edge = [src, tgt]
  // by node index. Styles/dimensions/handles are derivable from the schema.
  const idIndex = new Map(nodes.map((n, i) => [n.id, i]));
  const compact = JSON.stringify({
    v: 1,
    n: nodes.map((n) => [
      TYPE_CODES[n.type ?? "default"] ?? 1,
      Math.round(n.position.x),
      Math.round(n.position.y),
      String(n.data?.label ?? ""),
    ]),
    e: edges.map((e) => [idIndex.get(e.source) ?? -1, idIndex.get(e.target) ?? -1]),
  });

  const rawBytes = bytesOf(raw);
  const compactBytes = bytesOf(compact);
  const saved = rawBytes > 0 ? ((rawBytes - compactBytes) / rawBytes) * 100 : 0;

  return (
    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          Serialization Adapter — live bench
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
          ● real bytes, measured from the canvas above
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-baseline justify-between font-mono text-xs">
            <span className="text-zinc-400">
              raw React Flow state <span className="text-zinc-600">(what naive persistence stores)</span>
            </span>
            <span className="text-zinc-200">{fmt(rawBytes)}</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-zinc-900">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-zinc-600 to-zinc-500" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between font-mono text-xs">
            <span className="text-zinc-400">
              schema-aware struct <span className="text-zinc-600">(what the adapter stores)</span>
            </span>
            <span className="text-ice">{fmt(compactBytes)}</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-zinc-900">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan to-purple transition-[width] duration-300"
              style={{ width: `${Math.max((compactBytes / rawBytes) * 100, 1.5)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/70 pt-4">
        <p className="max-w-md text-xs leading-relaxed text-zinc-500">
          Drag a node or wire a new edge above and watch both payloads reprice.
          The database stores what is <em>true</em>, not what is <em>drawn</em> —
          styles, dimensions, and handles are derived from the schema on load.{" "}
          <a
            href="/blog/the-94-percent-decision-integratex"
            className="text-ice underline-offset-4 hover:underline"
          >
            The full story →
          </a>
        </p>
        <div className="text-right">
          <div className="text-3xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-cyan to-purple bg-clip-text">
            −{saved.toFixed(1)}%
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            payload right now
          </div>
        </div>
      </div>
    </div>
  );
}
