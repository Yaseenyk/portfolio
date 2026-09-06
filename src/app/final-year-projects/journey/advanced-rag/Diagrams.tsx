/**
 * Chapter 13 diagram — the advanced retrieval pipeline: expand the query,
 * search hybrid + wide, re-rank, keep the best few. Site diagram style.
 */

export function AdvancedRagDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · retrieve wide, then sharpen
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 180" className="h-auto w-full min-w-[680px]" role="img" aria-label="The query is expanded, searched both semantically and by keyword to fetch a wide set of candidates, then re-ranked down to the best few chunks for the model.">
          <defs>
            <marker id="ar-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="ar-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#67E8F9" />
            </marker>
          </defs>

          {/* query */}
          <rect x="16" y="66" width="96" height="46" rx="9" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="64" y="86" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#a1a1aa">lazy query</text>
          <text x="64" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">&ldquo;fees?&rdquo;</text>

          {/* expand */}
          <rect x="140" y="66" width="104" height="46" rx="9" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="192" y="86" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">expand</text>
          <text x="192" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">richer question</text>
          <line x1="112" y1="89" x2="136" y2="89" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ar-arrow)" />

          {/* hybrid search */}
          <rect x="272" y="46" width="116" height="86" rx="10" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="330" y="72" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#67E8F9">hybrid search</text>
          <text x="330" y="88" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">semantic + keyword</text>
          <text x="330" y="112" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">~20 candidates</text>
          <line x1="244" y1="89" x2="268" y2="89" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ar-arrow)" />

          {/* re-rank */}
          <rect x="416" y="56" width="104" height="66" rx="10" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="468" y="82" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">re-rank</text>
          <text x="468" y="98" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">score each</text>
          <text x="468" y="110" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">keep best 3</text>
          <line x1="388" y1="89" x2="412" y2="89" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ar-arrow)" />

          {/* to LLM */}
          <rect x="560" y="56" width="90" height="66" rx="10" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.3" />
          <text x="605" y="82" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#67E8F9">top 3</text>
          <text x="605" y="98" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">→ grounded</text>
          <text x="605" y="110" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">prompt</text>
          <line x1="520" y1="89" x2="556" y2="89" stroke="#67E8F9" strokeWidth="1.3" markerEnd="url(#ar-arrow-c)" />

          <text x="380" y="160" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">wide net first · careful inspection second · only the best reaches the model</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Each stage is optional — add the one that fixes the failure you actually see.
      </figcaption>
    </figure>
  );
}
