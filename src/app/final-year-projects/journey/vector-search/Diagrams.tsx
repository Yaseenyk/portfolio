/**
 * Chapter 9 diagram — indexing (once, ahead of time) and querying (live),
 * meeting at the vector database. Site diagram style.
 */

export function VectorSearchDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · index once, query live — meeting at the vector database
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 300" className="h-auto w-full min-w-[640px]" role="img" aria-label="Documents are chunked, embedded and stored in the vector database ahead of time. Live, a query is embedded and matched against the stored vectors to return the nearest chunks.">
          <defs>
            <marker id="vs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="vs-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#67E8F9" />
            </marker>
          </defs>

          {/* indexing lane */}
          <text x="24" y="30" fontFamily="monospace" fontSize="10" fill="#A855F7">INDEXING · once, ahead of time</text>
          <rect x="24" y="44" width="110" height="44" rx="9" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="79" y="70" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">documents</text>
          <rect x="164" y="44" width="96" height="44" rx="9" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="212" y="66" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">chunk</text>
          <text x="212" y="79" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">+ overlap</text>
          <rect x="290" y="44" width="96" height="44" rx="9" fill="rgba(168,85,247,0.05)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="338" y="70" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">embed</text>
          <line x1="134" y1="66" x2="160" y2="66" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#vs-arrow)" />
          <line x1="260" y1="66" x2="286" y2="66" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#vs-arrow)" />
          <line x1="386" y1="66" x2="470" y2="120" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#vs-arrow)" />

          {/* vector DB */}
          <g stroke="#67E8F9" strokeWidth="1.5">
            <ellipse cx="540" cy="130" rx="70" ry="16" fill="rgba(103,232,249,0.06)" />
            <path d="M470 130 v50 a70 16 0 0 0 140 0 v-50" fill="rgba(103,232,249,0.06)" />
          </g>
          <text x="540" y="150" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#67E8F9">vector database</text>
          <text x="540" y="167" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">vectors + their text</text>

          {/* querying lane */}
          <text x="24" y="222" fontFamily="monospace" fontSize="10" fill="#22D3EE">QUERYING · live, per search</text>
          <rect x="24" y="236" width="110" height="44" rx="9" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="79" y="262" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">user query</text>
          <rect x="164" y="236" width="96" height="44" rx="9" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="212" y="262" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#a1a1aa">embed</text>
          <text x="212" y="228" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">same model!</text>
          <line x1="134" y1="258" x2="160" y2="258" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#vs-arrow)" />
          <line x1="260" y1="258" x2="480" y2="185" stroke="#22D3EE" strokeWidth="1.3" markerEnd="url(#vs-arrow)" />

          {/* results out */}
          <rect x="636" y="108" width="104" height="44" rx="9" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.3" />
          <text x="688" y="130" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#67E8F9">top-k</text>
          <text x="688" y="143" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">nearest chunks</text>
          <line x1="610" y1="130" x2="632" y2="130" stroke="#67E8F9" strokeWidth="1.3" markerEnd="url(#vs-arrow-c)" />
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        The heavy work happens during indexing. A live search is one embed and one nearest-neighbour lookup.
      </figcaption>
    </figure>
  );
}
