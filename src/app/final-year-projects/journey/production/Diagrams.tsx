/**
 * Chapter 12 diagrams — guardrails around the model, and the full capstone
 * system with every chapter labelled. Site diagram style.
 */

export function GuardrailDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · guardrails — check the input, check the output
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 170" className="h-auto w-full min-w-[620px]" role="img" aria-label="User input passes an input guardrail before reaching the model, and the model's output passes an output guardrail before reaching the user.">
          <defs>
            <marker id="gr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
          </defs>

          <text x="52" y="88" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#22D3EE">user</text>
          <line x1="82" y1="92" x2="120" y2="92" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#gr-arrow)" />

          {/* input guardrail */}
          <rect x="124" y="60" width="120" height="64" rx="10" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.5" />
          <text x="184" y="86" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#c4b5fd">input guardrail</text>
          <text x="184" y="102" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">moderate · redact PII</text>
          <text x="184" y="114" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">strip injections</text>
          <line x1="244" y1="92" x2="288" y2="92" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#gr-arrow)" />

          {/* model */}
          <rect x="292" y="60" width="176" height="64" rx="12" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="380" y="88" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#67E8F9">the model / agent</text>
          <text x="380" y="106" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">powerful, untrusted engine</text>
          <line x1="468" y1="92" x2="512" y2="92" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#gr-arrow)" />

          {/* output guardrail */}
          <rect x="516" y="60" width="120" height="64" rx="10" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.5" />
          <text x="576" y="86" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#c4b5fd">output guardrail</text>
          <text x="576" y="102" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">safe? on-topic?</text>
          <text x="576" y="114" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#71717a">no leaks?</text>
          <line x1="636" y1="92" x2="676" y2="92" stroke="#52525b" strokeWidth="1.3" markerEnd="url(#gr-arrow)" />
          <text x="708" y="88" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#22D3EE">user</text>

          <text x="380" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">never trust the input · never trust the output · the model is the engine, not the brakes</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        The model sits inside the guardrails, never outside them.
      </figcaption>
    </figure>
  );
}

export function CapstoneDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · the capstone — every box is a chapter
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg viewBox="0 0 760 340" className="h-auto w-full min-w-[700px]" role="img" aria-label="The full system: frontend, backend, guardrails, embedding and vector search over a database, a grounded prompt to an LLM or agent, output guardrail and cost logging, returning a cited answer.">
          <defs>
            <marker id="cap-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
          </defs>

          {[
            { x: 20, y: 150, w: 92, c: "#22D3EE", t: "frontend", ch: "Ch 2" },
            { x: 140, y: 150, w: 92, c: "#A855F7", t: "backend", ch: "Ch 3" },
            { x: 260, y: 150, w: 92, c: "#A855F7", t: "in-guard", ch: "Ch 12" },
          ].map((b) => (
            <g key={b.t}>
              <rect x={b.x} y={b.y} width={b.w} height={46} rx={9} fill="rgba(255,255,255,0.02)" stroke={b.c} strokeWidth="1.3" />
              <text x={b.x + b.w / 2} y={b.y + 22} textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill={b.c}>{b.t}</text>
              <text x={b.x + b.w / 2} y={b.y + 36} textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#52525b">{b.ch}</text>
            </g>
          ))}

          {/* retrieval cluster */}
          <rect x="380" y="40" width="150" height="120" rx="12" fill="none" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" />
          <text x="455" y="34" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#52525b">retrieval · Ch 8–9</text>
          <rect x="396" y="54" width="118" height="34" rx="8" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.2" />
          <text x="455" y="75" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">embed + vector search</text>
          <g stroke="#67E8F9" strokeWidth="1.2">
            <ellipse cx="455" cy="108" rx="42" ry="10" fill="rgba(103,232,249,0.05)" />
            <path d="M413 108 v28 a42 10 0 0 0 84 0 v-28" fill="rgba(103,232,249,0.05)" />
          </g>
          <text x="455" y="126" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#67E8F9">DB · Ch 4</text>

          {/* prompt + llm */}
          <rect x="560" y="60" width="90" height="40" rx="9" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.2" />
          <text x="605" y="78" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#c4b5fd">grounded</text>
          <text x="605" y="90" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#c4b5fd">prompt · Ch 7</text>
          <rect x="560" y="118" width="90" height="42" rx="9" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.3" />
          <text x="605" y="138" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">LLM / agent</text>
          <text x="605" y="151" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#52525b">Ch 5–6 · 11</text>

          {/* out guard + answer */}
          <rect x="678" y="118" width="70" height="42" rx="9" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.2" />
          <text x="713" y="138" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#c4b5fd">out-guard</text>
          <text x="713" y="151" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#52525b">+ cost log</text>

          {/* flow arrows */}
          <line x1="112" y1="173" x2="138" y2="173" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#cap-arrow)" />
          <line x1="232" y1="173" x2="258" y2="173" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#cap-arrow)" />
          <line x1="352" y1="168" x2="394" y2="120" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#cap-arrow)" />
          <line x1="514" y1="80" x2="556" y2="80" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#cap-arrow)" />
          <line x1="605" y1="100" x2="605" y2="114" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#cap-arrow)" />
          <line x1="650" y1="139" x2="674" y2="139" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#cap-arrow)" />

          {/* answer back */}
          <path d="M713 160 C 713 300, 120 300, 66 200" fill="none" stroke="#67E8F9" strokeWidth="1.3" strokeDasharray="6 4" markerEnd="url(#cap-arrow)" />
          <text x="400" y="296" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">cited answer, safe to show, returns to the user</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Twelve chapters, one system. You can explain every arrow — which is exactly what the job asks.
      </figcaption>
    </figure>
  );
}
