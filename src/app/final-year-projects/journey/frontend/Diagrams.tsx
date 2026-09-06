/**
 * Chapter 2 diagram — the architecture of the development system itself:
 * architect ↔ Claude Code ↔ repo, with MCP tools closing the verify loop.
 * Site diagram style: ink panel, cyan/violet/ice, mono labels.
 */

export function DevSystemDiagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · the development system you are about to run
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <svg
          viewBox="0 0 760 300"
          className="h-auto w-full"
          role="img"
          aria-label="You the architect direct Claude Code, which reads and edits the repo — CLAUDE.md, docs and source — while MCP tools like the Playwright browser let it see and verify the pages it builds."
        >
          <defs>
            <marker id="ds-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="ds-arrow-c" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22D3EE" />
            </marker>
          </defs>

          {/* You — the architect */}
          <rect x="32" y="70" width="180" height="92" rx="12" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth="1.5" />
          <text x="122" y="102" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#22D3EE">you</text>
          <text x="122" y="122" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">specify · review · decide</text>
          <text x="122" y="138" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">the judgment seat</text>

          {/* Claude Code */}
          <rect x="290" y="70" width="180" height="92" rx="12" fill="rgba(168,85,247,0.07)" stroke="#A855F7" strokeWidth="1.5" />
          <text x="380" y="102" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#A855F7">claude code</text>
          <text x="380" y="122" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">plans · builds · runs checks</text>
          <text x="380" y="138" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">the fast hands</text>

          {/* Repo */}
          <rect x="548" y="70" width="180" height="92" rx="12" fill="rgba(103,232,249,0.05)" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="638" y="98" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#67E8F9">your repo</text>
          <text x="638" y="118" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">CLAUDE.md · docs/ · src/</text>
          <text x="638" y="134" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">the permanent memory</text>
          <text x="638" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">git — the diary</text>

          {/* You <-> Claude */}
          <line x1="212" y1="98" x2="286" y2="98" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ds-arrow)" />
          <line x1="286" y1="134" x2="212" y2="134" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ds-arrow)" />
          <text x="249" y="88" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">plain words</text>
          <text x="249" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">diffs to review</text>

          {/* Claude <-> Repo */}
          <line x1="470" y1="98" x2="544" y2="98" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ds-arrow)" />
          <line x1="544" y1="134" x2="470" y2="134" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ds-arrow)" />
          <text x="507" y="88" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">edits</text>
          <text x="507" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#52525b">reads</text>

          {/* MCP tools */}
          <rect x="290" y="212" width="180" height="60" rx="12" fill="none" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="380" y="238" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#a1a1aa">mcp tools</text>
          <text x="380" y="256" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">browser (eyes) · figma · github</text>
          <line x1="380" y1="162" x2="380" y2="208" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* verify loop: browser sees the built pages */}
          <path d="M474 242 C 600 242, 660 210, 652 166" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#ds-arrow-c)" />
          <text x="600" y="262" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#22D3EE">the verify loop — opens and SEES the pages it built</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        You hold judgment. Claude holds speed. The repo holds memory. MCPs close the loop.
      </figcaption>
    </figure>
  );
}
