/**
 * Static teaching diagrams for Chapter 1 — Domains. Server components,
 * hand-authored SVG in the site's diagram style (ink panel, cyan/violet/ice,
 * mono labels). Each one draws exactly what the surrounding prose just said.
 */

function Panel({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="not-prose my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {label}
        </span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        {caption}
      </figcaption>
    </figure>
  );
}

/** Three-tier architecture + the boxes that get added as a company grows. */
export function ThreeTierDiagram() {
  return (
    <Panel
      label="Diagram · the drawing people call “architecture”"
      caption="Three layers is already an architecture. Growth just adds more boxes to the same drawing."
    >
      <svg
        viewBox="0 0 760 300"
        className="h-auto w-full"
        role="img"
        aria-label="Three-tier architecture: frontend, backend and database connected by arrows, with dotted future boxes — cache, emails, payments — attached to the backend."
      >
        <defs>
          <marker id="tt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Frontend */}
        <rect x="32" y="70" width="180" height="80" rx="12" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="122" y="105" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#22D3EE">frontend</text>
        <text x="122" y="126" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#71717a">asks · user&apos;s device</text>

        {/* Backend */}
        <rect x="290" y="70" width="180" height="80" rx="12" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.5" />
        <text x="380" y="105" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#A855F7">backend</text>
        <text x="380" y="126" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#71717a">thinks · the rules</text>

        {/* Database */}
        <g stroke="#67E8F9" strokeWidth="1.5">
          <ellipse cx="638" cy="82" rx="90" ry="14" fill="rgba(103,232,249,0.05)" />
          <path d="M548 82 v56 a90 14 0 0 0 180 0 v-56" fill="rgba(103,232,249,0.05)" />
        </g>
        <text x="638" y="118" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#67E8F9">database</text>
        <text x="638" y="170" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#71717a">remembers · survives restarts</text>

        {/* arrows between tiers */}
        <line x1="212" y1="100" x2="286" y2="100" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tt-arrow)" />
        <line x1="286" y1="124" x2="212" y2="124" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tt-arrow)" />
        <line x1="470" y1="100" x2="544" y2="100" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tt-arrow)" />
        <line x1="544" y1="124" x2="470" y2="124" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tt-arrow)" />
        <text x="249" y="90" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">API</text>
        <text x="507" y="90" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">SQL</text>

        {/* future boxes, dotted */}
        {[
          { x: 200, label: "cache" },
          { x: 340, label: "emails" },
          { x: 480, label: "payments" },
        ].map((b) => (
          <g key={b.label}>
            <rect x={b.x} y="218" width="110" height="46" rx="10" fill="none" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="5 4" />
            <text x={b.x + 55} y="245" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#71717a">{b.label}</text>
            <line x1={b.x + 55} y1="218" x2="380" y2="154" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" />
          </g>
        ))}
        <text x="620" y="245" fontFamily="monospace" fontSize="10" fill="#52525b">← added as the</text>
        <text x="620" y="260" fontFamily="monospace" fontSize="10" fill="#52525b">   company grows</text>
      </svg>
    </Panel>
  );
}

/** Dev → staging → production, with hotfix and rollback annotated. */
export function PipelineDiagram() {
  return (
    <Panel
      label="Diagram · the life of a feature"
      caption="Laptop → dress rehearsal → real users. Hotfix jumps the queue; rollback is the undo button."
    >
      <svg
        viewBox="0 0 760 290"
        className="h-auto w-full"
        role="img"
        aria-label="Pipeline from development on a laptop, through staging, to production — with a hotfix arrow jumping straight to production and a rollback arrow pointing back to the previous version."
      >
        <defs>
          <marker id="pl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
          <marker id="pl-arrow-v" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#A855F7" />
          </marker>
        </defs>

        {/* Dev */}
        <rect x="32" y="90" width="190" height="86" rx="12" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="127" y="120" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#22D3EE">dev · your laptop</text>
        <text x="127" y="140" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">break things freely</text>
        <text x="127" y="156" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">fake users · fake money</text>

        {/* Staging */}
        <rect x="286" y="90" width="190" height="86" rx="12" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.5" />
        <text x="381" y="120" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#67E8F9">staging</text>
        <text x="381" y="140" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">dress rehearsal</text>
        <text x="381" y="156" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">looks real · test data</text>

        {/* Production */}
        <rect x="540" y="90" width="190" height="86" rx="12" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.5" />
        <text x="635" y="120" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#A855F7">production</text>
        <text x="635" y="140" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">real users · real money</text>
        <text x="635" y="156" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">sacred — no experiments</text>

        {/* forward arrows */}
        <line x1="222" y1="133" x2="282" y2="133" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#pl-arrow)" />
        <line x1="476" y1="133" x2="536" y2="133" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#pl-arrow)" />
        <text x="252" y="122" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">review +</text>
        <text x="252" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">deploy</text>
        <text x="506" y="122" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">final check</text>
        <text x="506" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">+ release</text>

        {/* git note under dev */}
        <text x="127" y="205" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">git — the diary of every change</text>

        {/* hotfix path */}
        <path d="M127 90 C 200 20, 560 20, 632 86" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#pl-arrow-v)" />
        <text x="380" y="36" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#A855F7">hotfix — smallest possible fix, straight to production</text>

        {/* rollback path */}
        <path d="M700 176 C 700 240, 580 252, 545 252" fill="none" stroke="#52525b" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#pl-arrow)" />
        <text x="420" y="256" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">rollback — put the last working version back, then investigate calmly</text>
      </svg>
    </Panel>
  );
}
