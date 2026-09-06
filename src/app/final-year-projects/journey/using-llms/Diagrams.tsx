/**
 * Chapter 6 diagram — a model call is just Chapter 3's request loop, one hop
 * further: browser -> your backend (holds the key) -> the AI lab -> back.
 * Site diagram style.
 */

export function CallShapeDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · a model call is just the Chapter 1 loop, one hop further
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg
          viewBox="0 0 760 200"
          className="h-auto w-full min-w-[600px]"
          role="img"
          aria-label="The browser calls your backend, which holds the API key and calls the AI lab's model, and the reply travels back the same way."
        >
          <defs>
            <marker id="cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="cs-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#67E8F9" />
            </marker>
          </defs>

          {/* browser */}
          <rect x="24" y="70" width="150" height="72" rx="12" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.5" />
          <text x="99" y="100" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#22D3EE">frontend</text>
          <text x="99" y="118" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">no key here — ever</text>

          {/* your backend */}
          <rect x="256" y="70" width="170" height="72" rx="12" fill="rgba(168,85,247,0.07)" stroke="#A855F7" strokeWidth="1.5" />
          <text x="341" y="98" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#A855F7">your backend</text>
          <text x="341" y="116" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">holds the API key</text>
          <text x="341" y="130" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">picks the knobs</text>

          {/* AI lab */}
          <rect x="560" y="70" width="176" height="72" rx="12" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="648" y="98" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#67E8F9">the AI lab</text>
          <text x="648" y="116" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">runs the model</text>
          <text x="648" y="130" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">(Chapter 5)</text>

          {/* arrows out */}
          <line x1="174" y1="94" x2="252" y2="94" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
          <line x1="426" y1="94" x2="556" y2="94" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
          <text x="213" y="84" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">click</text>
          <text x="491" y="84" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">prompt + knobs</text>

          {/* arrows back */}
          <line x1="556" y1="120" x2="426" y2="120" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
          <line x1="252" y1="120" x2="174" y2="120" stroke="#67E8F9" strokeWidth="1.5" markerEnd="url(#cs-arrow-c)" />
          <text x="491" y="138" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">tokens back</text>
          <text x="213" y="138" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#67E8F9">answer</text>

          {/* key note */}
          <text x="380" y="176" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">the secret key sits in the middle box, where the user can never reach it</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        You already built the left two boxes. The model is just a third box your backend talks to.
      </figcaption>
    </figure>
  );
}
