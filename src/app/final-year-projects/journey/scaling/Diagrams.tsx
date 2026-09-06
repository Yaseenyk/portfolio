/**
 * Chapter 15 diagram — the asynchronous pattern: the request returns a ticket
 * immediately; a queue and worker do the slow work; the result is pushed back.
 * Site diagram style.
 */

export function AsyncDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · don&rsquo;t make the request wait for the work
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 230" className="h-auto w-full min-w-[680px]" role="img" aria-label="A request is queued and answered instantly with a ticket; a worker processes the queue in the background and pushes the result back to the user when done.">
          <defs>
            <marker id="as-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="as-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#67E8F9" />
            </marker>
          </defs>

          {/* user + backend */}
          <rect x="20" y="80" width="96" height="46" rx="9" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.3" />
          <text x="68" y="107" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#67E8F9">frontend</text>

          <rect x="160" y="80" width="110" height="46" rx="9" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="215" y="100" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">backend</text>
          <text x="215" y="114" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">queues + replies fast</text>
          <line x1="116" y1="96" x2="156" y2="96" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#as-arrow)" />
          {/* instant ticket back */}
          <line x1="156" y1="112" x2="118" y2="112" stroke="#67E8F9" strokeWidth="1.3" markerEnd="url(#as-arrow-c)" />
          <text x="137" y="140" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#67E8F9">ticket (ms)</text>

          {/* queue */}
          <rect x="316" y="80" width="96" height="46" rx="9" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.3" />
          <text x="364" y="100" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#67E8F9">queue</text>
          <text x="364" y="114" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">waiting jobs</text>
          <line x1="270" y1="96" x2="312" y2="96" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#as-arrow)" />

          {/* worker */}
          <rect x="456" y="70" width="120" height="66" rx="10" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.3" />
          <text x="516" y="96" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#c4b5fd">worker</text>
          <text x="516" y="112" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">does the slow</text>
          <text x="516" y="124" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">model work</text>
          <line x1="412" y1="100" x2="452" y2="100" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#as-arrow)" />

          {/* save */}
          <g stroke="#67E8F9" strokeWidth="1.2">
            <ellipse cx="660" cy="86" rx="40" ry="10" fill="rgba(103,232,249,0.05)" />
            <path d="M620 86 v40 a40 10 0 0 0 80 0 v-40" fill="rgba(103,232,249,0.05)" />
          </g>
          <text x="660" y="112" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#67E8F9">save result</text>
          <line x1="576" y1="103" x2="616" y2="103" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#as-arrow)" />

          {/* push back to user */}
          <path d="M660 136 C 660 200, 120 210, 68 128" fill="none" stroke="#67E8F9" strokeWidth="1.3" strokeDasharray="6 4" markerEnd="url(#as-arrow-c)" />
          <text x="380" y="206" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">when done → push to the user (WebSocket) or the user polls for it</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        The request returns in milliseconds. The slow work happens off to the side. Nothing times out.
      </figcaption>
    </figure>
  );
}
