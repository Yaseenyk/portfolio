/**
 * Chapter 10 diagram — the full RAG architecture: indexing (once) fills the
 * vector DB; the live path retrieves, augments and generates. Site style.
 */

export function RagArchitectureDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · the whole RAG system
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 320" className="h-auto w-full min-w-[680px]" role="img" aria-label="Indexing: documents are chunked, embedded and stored in the vector database. Live: a question is embedded, matched to retrieve chunks, combined into a grounded prompt, sent to the LLM, and returned as a cited answer.">
          <defs>
            <marker id="ra-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="ra-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#67E8F9" />
            </marker>
          </defs>

          {/* indexing row */}
          <text x="24" y="28" fontFamily="monospace" fontSize="10" fill="#A855F7">INDEXING · ahead of time</text>
          <rect x="24" y="40" width="96" height="40" rx="8" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="72" y="64" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#a1a1aa">documents</text>
          <rect x="150" y="40" width="86" height="40" rx="8" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="193" y="64" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#a1a1aa">chunk+embed</text>
          <line x1="120" y1="60" x2="146" y2="60" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ra-arrow)" />
          <line x1="236" y1="60" x2="360" y2="128" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ra-arrow)" />

          {/* vector DB (center) */}
          <g stroke="#67E8F9" strokeWidth="1.5">
            <ellipse cx="400" cy="150" rx="60" ry="14" fill="rgba(103,232,249,0.06)" />
            <path d="M340 150 v44 a60 14 0 0 0 120 0 v-44" fill="rgba(103,232,249,0.06)" />
          </g>
          <text x="400" y="168" textAnchor="middle" fontFamily="monospace" fontSize="10.5" fill="#67E8F9">vector DB</text>
          <text x="400" y="184" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">vectors + text</text>

          {/* live row */}
          <text x="24" y="250" fontFamily="monospace" fontSize="10" fill="#22D3EE">LIVE · per question</text>
          <rect x="24" y="262" width="96" height="40" rx="8" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="72" y="286" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#a1a1aa">question</text>
          <rect x="150" y="262" width="86" height="40" rx="8" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="193" y="286" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#a1a1aa">embed</text>
          <line x1="120" y1="282" x2="146" y2="282" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ra-arrow)" />
          {/* embed -> retrieve from vector db */}
          <line x1="236" y1="282" x2="360" y2="196" stroke="#22D3EE" strokeWidth="1.3" markerEnd="url(#ra-arrow)" />
          <text x="286" y="250" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">retrieve</text>

          {/* vector db -> prompt */}
          <rect x="500" y="130" width="96" height="40" rx="8" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="548" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">grounded</text>
          <text x="548" y="163" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">prompt</text>
          <line x1="460" y1="150" x2="496" y2="150" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ra-arrow)" />
          <text x="480" y="140" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">chunks</text>
          {/* question also into prompt */}
          <line x1="236" y1="278" x2="500" y2="164" stroke="#3f3f46" strokeWidth="1.1" strokeDasharray="4 3" markerEnd="url(#ra-arrow)" />
          <text x="360" y="238" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">+ question</text>

          {/* prompt -> LLM */}
          <rect x="636" y="130" width="100" height="40" rx="8" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.3" />
          <text x="686" y="154" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#67E8F9">LLM</text>
          <line x1="596" y1="150" x2="632" y2="150" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#ra-arrow)" />

          {/* answer out */}
          <line x1="686" y1="170" x2="686" y2="240" stroke="#67E8F9" strokeWidth="1.3" markerEnd="url(#ra-arrow-c)" />
          <text x="686" y="258" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">cited answer</text>
          <text x="686" y="272" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">or honest refusal</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Fill the vector DB once. For every question: embed, retrieve, ground, generate — answer with a source.
      </figcaption>
    </figure>
  );
}
