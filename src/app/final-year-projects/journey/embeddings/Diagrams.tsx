/**
 * Chapter 8 diagram — text in, a position out, then similarity as distance.
 * Site diagram style.
 */

export function EmbeddingDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · text → a position → a closeness score
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 210" className="h-auto w-full min-w-[620px]" role="img" aria-label="Two texts each pass through the same embedding model, becoming two lists of numbers, which cosine similarity compares into one closeness score.">
          <defs>
            <marker id="em-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
          </defs>

          {/* text A */}
          <rect x="20" y="34" width="180" height="40" rx="8" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="110" y="59" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">&ldquo;fee deadline&rdquo;</text>
          {/* text B */}
          <rect x="20" y="136" width="180" height="40" rx="8" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="110" y="161" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">&ldquo;last date to pay tuition&rdquo;</text>

          {/* embedding model */}
          <rect x="270" y="70" width="150" height="70" rx="12" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="345" y="100" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#67E8F9">embedding model</text>
          <text x="345" y="118" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">same model for both</text>

          <line x1="200" y1="54" x2="266" y2="92" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#em-arrow)" />
          <line x1="200" y1="156" x2="266" y2="118" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#em-arrow)" />

          {/* vectors */}
          <text x="490" y="60" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22D3EE">[0.12, -0.03, 0.88, …]</text>
          <text x="490" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#A855F7">[0.10, -0.01, 0.85, …]</text>
          <text x="490" y="176" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">~1,536 numbers each</text>
          <line x1="420" y1="95" x2="560" y2="70" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#em-arrow)" />
          <line x1="420" y1="115" x2="560" y2="140" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#em-arrow)" />

          {/* similarity */}
          <rect x="600" y="82" width="140" height="46" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.5" />
          <text x="670" y="102" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#22D3EE">cosine similarity</text>
          <text x="670" y="118" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#67E8F9">0.91 · very close</text>
          <line x1="600" y1="70" x2="600" y2="70" />
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        No shared words, position nearly identical — the score sees the meaning, not the letters.
      </figcaption>
    </figure>
  );
}
