/**
 * Chapter 3 diagram — the anatomy of one request inside the backend:
 * the corridor every request walks. Site diagram style.
 */

export function RequestAnatomyDiagram() {
  const stage = (
    x: number,
    w: number,
    stroke: string,
    fill: string,
    line1: string,
    line2: string,
  ) => (
    <g key={line1}>
      <rect x={x} y="88" width={w} height="72" rx="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y="118" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={stroke}>
        {line1}
      </text>
      <text x={x + w / 2} y="136" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">
        {line2}
      </text>
    </g>
  );

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · the corridor every request walks
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <svg
          viewBox="0 0 760 260"
          className="h-auto w-full"
          role="img"
          aria-label="A request enters the backend and passes auth, then validation, then the service holding the business rules, then the database layer, and a response with a status code returns to the client."
        >
          <defs>
            <marker id="ra-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="ra-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#67E8F9" />
            </marker>
          </defs>

          {/* incoming request */}
          <text x="36" y="112" fontFamily="monospace" fontSize="10" fill="#22D3EE">request</text>
          <text x="36" y="126" fontFamily="monospace" fontSize="8.5" fill="#52525b">from the</text>
          <text x="36" y="138" fontFamily="monospace" fontSize="8.5" fill="#52525b">frontend</text>
          <line x1="98" y1="124" x2="128" y2="124" stroke="#22D3EE" strokeWidth="1.5" markerEnd="url(#ra-arrow)" />

          {stage(132, 108, "#A855F7", "rgba(168,85,247,0.06)", "auth", "who are you?")}
          <line x1="240" y1="124" x2="266" y2="124" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ra-arrow)" />

          {stage(270, 108, "#A855F7", "rgba(168,85,247,0.06)", "validate", "reject garbage")}
          <line x1="378" y1="124" x2="404" y2="124" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ra-arrow)" />

          {stage(408, 116, "#22D3EE", "rgba(34,211,238,0.06)", "service", "the rules think")}
          <line x1="524" y1="124" x2="550" y2="124" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ra-arrow)" />

          {stage(554, 108, "#67E8F9", "rgba(103,232,249,0.05)", "db layer", "one door only")}

          {/* database cylinder */}
          <g stroke="#67E8F9" strokeWidth="1.5" opacity="0.85">
            <ellipse cx="700" cy="94" rx="28" ry="8" fill="rgba(103,232,249,0.05)" />
            <path d="M672 94 v44 a28 8 0 0 0 56 0 v-44" fill="rgba(103,232,249,0.05)" />
          </g>
          <text x="700" y="168" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">database</text>
          <line x1="662" y1="112" x2="676" y2="106" stroke="#3f3f46" strokeWidth="1.2" />

          {/* early exits */}
          <path d="M186 160 C 186 200, 120 208, 96 208" fill="none" stroke="#3f3f46" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#ra-arrow)" />
          <text x="130" y="226" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">401 — log in first</text>
          <path d="M324 160 C 324 204, 268 224, 240 228" fill="none" stroke="#3f3f46" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#ra-arrow)" />
          <text x="300" y="246" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">400 — bad input, here&apos;s why</text>

          {/* response path back */}
          <path d="M466 160 C 466 210, 220 224, 100 200 C 80 196, 60 186, 48 168" fill="none" stroke="#67E8F9" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#ra-arrow-c)" />
          <text x="470" y="216" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">response — 200/201 + JSON, the right status code</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Auth first, validate second, then think, then remember. Routes stay thin; services think; the db layer is the only door.
      </figcaption>
    </figure>
  );
}
