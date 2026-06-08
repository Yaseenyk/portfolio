import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 320"
        className="h-auto w-full"
        role="img"
        aria-label="A central router agent classifies an incoming request and dispatches it to one of several specialised sub-agents, with a confidence-gated fallback to a human."
      >
        <defs>
          <marker id="ra-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Request */}
        <rect x="24" y="138" width="110" height="48" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="79" y="167" fill="#e4e4e7" fontFamily="monospace" fontSize="12" textAnchor="middle">
          request
        </text>

        {/* Router */}
        <rect x="190" y="124" width="150" height="76" rx="12" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="265" y="154" fill="#22D3EE" fontFamily="monospace" fontSize="13" textAnchor="middle">
          Router
        </text>
        <text x="265" y="172" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          classify intent
        </text>

        {/* Sub-agents */}
        {[
          ["Billing agent", 40, "#A855F7"],
          ["Setup agent", 120, "#A855F7"],
          ["Troubleshoot", 200, "#A855F7"],
        ].map(([label, y, color]) => (
          <g key={label as string}>
            <rect x="430" y={y as number} width="170" height="50" rx="10" fill="rgba(168,85,247,0.06)" stroke={color as string} />
            <text x="515" y={(y as number) + 30} fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}

        {/* Fallback */}
        <rect x="430" y="262" width="170" height="44" rx="10" fill="rgba(244,63,94,0.07)" stroke="#f43f5e" />
        <text x="515" y="289" fill="#fb7185" fontFamily="monospace" fontSize="11" textAnchor="middle">
          escalate → human
        </text>

        {/* Arrows */}
        <line x1="134" y1="162" x2="186" y2="162" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#ra-arrow)" />
        <path d="M340 150 C 390 110, 400 65, 426 65" stroke="#A855F7" strokeWidth="1.5" fill="none" markerEnd="url(#ra-arrow)" />
        <path d="M340 162 C 390 150, 400 145, 426 145" stroke="#A855F7" strokeWidth="1.5" fill="none" markerEnd="url(#ra-arrow)" />
        <path d="M340 174 C 390 210, 400 225, 426 225" stroke="#A855F7" strokeWidth="1.5" fill="none" markerEnd="url(#ra-arrow)" />
        <path d="M265 200 C 265 284, 380 284, 426 284" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" fill="none" markerEnd="url(#ra-arrow)" />
        <text x="300" y="276" fill="#71717a" fontFamily="monospace" fontSize="9">low confidence</text>
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        One router classifies; specialists execute. Below a confidence floor, the router hands off rather than guesses.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        &quot;Just add another agent&quot; is how a tidy AI feature becomes an
        untraceable mess. Bolt enough autonomous agents together and you get a
        system where no one can say which agent did what, why, or whether it will
        do the same thing tomorrow. The router-agent pattern is the antidote: a
        single, narrow decision-maker at the front whose only job is to classify
        the request and hand it to exactly one specialist.
      </p>

      <h2>The shape: hub and spoke, not a free-for-all</h2>
      <p>
        The failure mode of multi-agent systems is agents calling agents calling
        agents, with control flow that exists only at runtime and changes with the
        weather. The router pattern flattens that. The router does not <em>do</em>
        the work — it decides who should. Each spoke is a specialist with a small,
        well-tested scope: a billing agent that knows the billing docs, a setup
        agent grounded in the setup guide, a troubleshooting agent with the
        diagnostic playbook. The topology is legible because it is shallow.
      </p>

      <Diagram />

      <h2>The router is a classifier, not a thinker</h2>
      <p>
        Keep the router boring. Its prompt is a constrained classification task:
        read the request, output one route from a fixed enum, and a confidence.
        That is it. The moment you let the router start solving the problem itself,
        you have lost the separation that made the pattern worth using. A small,
        fast model does this well precisely because it is a narrow task.
      </p>

      <Terminal title="router.ts">
        <span className="tok-com">{`// the router emits a route + confidence, nothing more`}</span>
        {"\n"}
        {`const { route, confidence } = await classify(request, {\n`}
        {`  routes: ["billing", "setup", "troubleshoot"] as const,\n`}
        {`});\n\n`}
        {`if (confidence < 0.6) return escalateToHuman(request);  // gated fallback\n\n`}
        {`return AGENTS[route].handle(request);  // dispatch to one specialist`}
      </Terminal>

      <h2>The confidence gate is the safety valve</h2>
      <p>
        The single most important line in that snippet is the confidence check.
        Without it, an ambiguous request gets force-fit into whichever route scored
        marginally highest, and the user gets a confident answer from the wrong
        specialist. With it, low-confidence requests fall through to a human (or a
        clarifying question) instead of being misrouted. This is the same
        philosophy as a grounded RAG refusal: <em>knowing when not to act is part
        of the architecture.</em>
      </p>

      <h2>Why this is the deployable shape</h2>
      <p>
        Each specialist can be developed, evaluated, and improved in isolation —
        you can write a focused test suite for the billing agent without touching
        setup. The router itself is a tiny classifier you can evaluate with a
        labelled set of real questions. And when something goes wrong in
        production, the trace is one hop: which route fired, with what confidence.
        That debuggability is what turns a clever multi-agent demo into something
        you can actually run a support desk on.
      </p>

      <blockquote>
        The goal of a multi-agent system is not more agents. It is a system where,
        for any request, you can say in one sentence which agent handled it and why.
      </blockquote>

      <p>
        The routing graph is a natural fit for a{" "}
        <a href="/blog/react-flow-agent-orchestration-canvas">
          visual orchestration canvas
        </a>
        , and each specialist is itself a{" "}
        <a href="/blog/zero-hallucination-rag-grounding-contract">
          grounded RAG agent
        </a>{" "}
        bounded to its own slice of the docs.
      </p>
    </>
  );
}

export const routerAgentPattern: BlogPost = {
  slug: "router-agent-multi-agent-orchestration",
  title: "The Router-Agent Pattern: Multi-Agent Orchestration Without the Chaos",
  description:
    "Adding agents is how multi-agent systems become untraceable. The router-agent pattern keeps a single narrow classifier at the front, dispatching each request to exactly one specialist — with a confidence-gated fallback.",
  keywords: [
    "multi-agent orchestration",
    "agent routing",
    "LLM router pattern",
    "agentic architecture",
    "AI agent design",
    "intent classification LLM",
  ],
  publishedAt: "2026-06-01",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["Agentic AI", "Architecture", "RAG"],
  takeaways: [
    "The router-agent pattern flattens multi-agent chaos into a shallow hub-and-spoke topology.",
    "The router is a constrained classifier — it decides who handles the request, it does not do the work.",
    "A confidence gate routes ambiguous requests to a human instead of force-fitting them to a specialist.",
    "Specialists can be built, evaluated, and debugged in isolation, and every request traces to one route.",
  ],
  Body,
};
