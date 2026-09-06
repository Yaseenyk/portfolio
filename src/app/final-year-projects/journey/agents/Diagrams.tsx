/**
 * Chapter 11 diagram — a router sending a request to specialist agents, each
 * with its own narrow tools, and a reviewer checking the result. Site style.
 */

export function MultiAgentDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · a router and its specialists
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 300" className="h-auto w-full min-w-[640px]" role="img" aria-label="A request reaches a router, which sends it to one of three specialist agents — fees, timetable, general — each with its own tools. A reviewer checks the answer before it returns.">
          <defs>
            <marker id="ag-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="ag-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#67E8F9" />
            </marker>
          </defs>

          {/* request */}
          <text x="60" y="150" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#22D3EE">request</text>
          <line x1="96" y1="160" x2="150" y2="160" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ag-arrow)" />

          {/* router */}
          <rect x="150" y="134" width="110" height="52" rx="12" fill="rgba(168,85,247,0.08)" stroke="#A855F7" strokeWidth="1.5" />
          <text x="205" y="158" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#A855F7">router</text>
          <text x="205" y="173" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">picks a specialist</text>

          {/* specialists */}
          {[
            { y: 40, name: "fees agent", tool: "→ fee lookup" },
            { y: 134, name: "timetable agent", tool: "→ schedule DB" },
            { y: 228, name: "general agent", tool: "→ RAG search" },
          ].map((a) => (
            <g key={a.name}>
              <rect x="340" y={a.y} width="150" height="48" rx="10" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
              <text x="415" y={a.y + 22} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#67E8F9">{a.name}</text>
              <text x="415" y={a.y + 37} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">own tools {a.tool}</text>
              <line x1="260" y1="160" x2="336" y2={a.y + 24} stroke="#52525b" strokeWidth="1.2" markerEnd="url(#ag-arrow)" />
            </g>
          ))}

          {/* reviewer */}
          <rect x="560" y="110" width="130" height="52" rx="12" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="625" y="134" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#c4b5fd">reviewer</text>
          <text x="625" y="149" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">checks before ship</text>
          <line x1="490" y1="64" x2="558" y2="120" stroke="#3f3f46" strokeWidth="1.1" markerEnd="url(#ag-arrow)" />
          <line x1="490" y1="158" x2="558" y2="140" stroke="#3f3f46" strokeWidth="1.1" markerEnd="url(#ag-arrow)" />
          <line x1="490" y1="252" x2="558" y2="150" stroke="#3f3f46" strokeWidth="1.1" markerEnd="url(#ag-arrow)" />

          {/* answer */}
          <line x1="625" y1="162" x2="625" y2="205" stroke="#67E8F9" strokeWidth="1.3" markerEnd="url(#ag-arrow-c)" />
          <text x="625" y="223" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">reviewed answer</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        One narrow job per agent, one router to direct, one reviewer to check — a team, not a hero.
      </figcaption>
    </figure>
  );
}
