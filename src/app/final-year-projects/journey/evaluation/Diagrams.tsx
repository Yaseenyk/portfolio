/**
 * Chapter 14 diagram — the eval loop: a change runs the golden set, scores it,
 * and the score decides ship vs revert. Site diagram style.
 */

export function EvalLoopDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · every change gets a verdict
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 190" className="h-auto w-full min-w-[660px]" role="img" aria-label="A change runs against the golden dataset, produces a score, and the score decides whether to ship or revert — a loop.">
          <defs>
            <marker id="ev-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
          </defs>

          <rect x="20" y="66" width="110" height="48" rx="10" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="75" y="86" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#a1a1aa">a change</text>
          <text x="75" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">prompt · chunks · model</text>

          <rect x="170" y="66" width="120" height="48" rx="10" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="230" y="86" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">run golden set</text>
          <text x="230" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">every question</text>
          <line x1="130" y1="90" x2="166" y2="90" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ev-arrow)" />

          <rect x="330" y="66" width="120" height="48" rx="10" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.3" />
          <text x="390" y="86" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#67E8F9">score</text>
          <text x="390" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">retrieval + answer</text>
          <line x1="290" y1="90" x2="326" y2="90" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ev-arrow)" />

          {/* decision */}
          <path d="M540 66 l40 24 l-40 24 l-40 -24 z" fill="rgba(255,255,255,0.02)" stroke="#a1a1aa" strokeWidth="1.3" />
          <text x="540" y="94" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#a1a1aa">better?</text>
          <line x1="450" y1="90" x2="496" y2="90" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ev-arrow)" />

          {/* ship */}
          <rect x="626" y="44" width="110" height="40" rx="9" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="681" y="68" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#67E8F9">score up → ship</text>
          <line x1="580" y1="82" x2="622" y2="66" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ev-arrow)" />

          {/* revert loops back */}
          <rect x="626" y="100" width="110" height="40" rx="9" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="681" y="124" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">down → revert</text>
          <line x1="580" y1="98" x2="622" y2="116" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ev-arrow)" />
          <path d="M626 128 C 400 168, 120 150, 75 116" fill="none" stroke="#3f3f46" strokeWidth="1.1" strokeDasharray="5 4" markerEnd="url(#ev-arrow)" />
          <text x="360" y="176" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">caught before a user ever saw it</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        The AI-era version of automated tests: change, measure, keep or roll back on evidence.
      </figcaption>
    </figure>
  );
}
