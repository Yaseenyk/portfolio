/**
 * Chapter 16 diagram — the decision ladder: prompt first, then RAG, then
 * fine-tune, each answering a different need. Site diagram style.
 */

export function ApproachDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · try them in this order
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 210" className="h-auto w-full min-w-[660px]" role="img" aria-label="A decision ladder: change the instructions with prompting first; if it needs your facts, use RAG; if it needs a consistent style you cannot prompt, fine-tune.">
          <defs>
            <marker id="ap-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
          </defs>

          {/* prompt */}
          <rect x="30" y="80" width="180" height="70" rx="12" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.5" />
          <text x="120" y="106" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#22D3EE">1 · prompt</text>
          <text x="120" y="124" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">change the instructions</text>
          <text x="120" y="137" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">free · instant · try first</text>

          {/* rag */}
          <rect x="290" y="80" width="180" height="70" rx="12" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="380" y="106" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#67E8F9">2 · RAG</text>
          <text x="380" y="124" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">change the knowledge</text>
          <text x="380" y="137" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">needs YOUR facts</text>

          {/* fine-tune */}
          <rect x="550" y="80" width="180" height="70" rx="12" fill="rgba(168,85,247,0.07)" stroke="#A855F7" strokeWidth="1.5" />
          <text x="640" y="106" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#A855F7">3 · fine-tune</text>
          <text x="640" y="124" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">change the model</text>
          <text x="640" y="137" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">consistent style · last resort</text>

          <line x1="210" y1="115" x2="286" y2="115" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ap-arrow)" />
          <line x1="470" y1="115" x2="546" y2="115" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ap-arrow)" />
          <text x="248" y="105" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">not enough?</text>
          <text x="508" y="105" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">not enough?</text>

          <text x="380" y="185" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">behaviour → prompt · knowledge → RAG · form you can&rsquo;t prompt → fine-tune</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Cheapest tool that solves the problem wins. Fine-tuning is powerful precisely because it is rarely needed.
      </figcaption>
    </figure>
  );
}
