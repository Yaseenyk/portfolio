import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 320"
        className="h-auto w-full"
        role="img"
        aria-label="The grounding contract: a query is retrieved against the knowledge base, and the model may only answer from retrieved context — out-of-scope queries hit a refusal valve."
      >
        <defs>
          <marker id="gc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Knowledge horizon */}
        <line x1="500" y1="24" x2="500" y2="296" stroke="#27272a" strokeWidth="1.5" strokeDasharray="5 6" />
        <text x="508" y="40" fill="#71717a" fontFamily="monospace" fontSize="11">
          knowledge horizon
        </text>

        {/* Query */}
        <rect x="24" y="118" width="120" height="52" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="84" y="149" fill="#e4e4e7" fontFamily="monospace" fontSize="13" textAnchor="middle">
          Query
        </text>

        {/* Retriever */}
        <rect x="196" y="118" width="130" height="52" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="261" y="143" fill="#22D3EE" fontFamily="monospace" fontSize="13" textAnchor="middle">
          Retriever
        </text>
        <text x="261" y="159" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          top-k · cosine
        </text>

        {/* Context */}
        <rect x="378" y="104" width="104" height="80" rx="8" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="430" y="138" fill="#A855F7" fontFamily="monospace" fontSize="12" textAnchor="middle">
          CONTEXT
        </text>
        <text x="430" y="156" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          chunks
        </text>

        {/* LLM */}
        <rect x="560" y="118" width="120" height="52" rx="8" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="620" y="149" fill="#22D3EE" fontFamily="monospace" fontSize="13" textAnchor="middle">
          LLM
        </text>

        {/* Grounded answer */}
        <rect x="560" y="236" width="120" height="48" rx="8" fill="rgba(16,185,129,0.08)" stroke="#10b981" />
        <text x="620" y="265" fill="#34d399" fontFamily="monospace" fontSize="12" textAnchor="middle">
          Grounded answer
        </text>

        {/* Refusal */}
        <rect x="378" y="236" width="104" height="48" rx="8" fill="rgba(244,63,94,0.08)" stroke="#f43f5e" />
        <text x="430" y="259" fill="#fb7185" fontFamily="monospace" fontSize="11" textAnchor="middle">
          Refuse
        </text>
        <text x="430" y="274" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          out-of-scope
        </text>

        {/* Arrows */}
        <line x1="144" y1="144" x2="190" y2="144" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#gc-arrow)" />
        <line x1="326" y1="144" x2="372" y2="144" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#gc-arrow)" />
        <line x1="482" y1="144" x2="554" y2="144" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#gc-arrow)" />
        <line x1="620" y1="170" x2="620" y2="230" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#gc-arrow)" />
        {/* Refusal valve: empty context routes the answer to a refusal */}
        <path d="M430 184 L430 236" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#gc-arrow)" />
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        The contract: nothing crosses the horizon. An empty CONTEXT yields a refusal, never a guess.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        Most teams can build a RAG system that works in the demo. The hard part
        ships later: the day it answers a question the documentation never
        covered — confidently, fluently, and wrong. A retrieval pipeline does not
        prevent hallucination on its own. It only changes <em>where</em> the
        model gets its facts. Whether it stays inside those facts is a separate
        decision, and it has to be made in the architecture, not hoped for in the
        prompt.
      </p>
      <p>
        On the streamerOS AI Support Agent I treat this as a hard contract I call{" "}
        <strong>grounding</strong>: the model may answer only from retrieved
        context, and when the context is empty it must refuse. This post is the
        pattern that enforces it.
      </p>

      <h2>Why &quot;don&apos;t hallucinate&quot; is not a strategy</h2>
      <p>
        A base model is a fluent prior over everything it ever read. Ask it about
        your product&apos;s config flags and it will happily interpolate
        plausible-sounding ones. Retrieval narrows the input, but if you paste the
        chunks into the prompt and ask politely for an answer, the model still
        treats its parametric memory as a fallback. The fix is to make the
        retrieved context the <em>only</em> admissible source and to define,
        explicitly, what happens when retrieval comes up empty.
      </p>

      <Diagram />

      <h2>The three boundaries</h2>
      <p>
        A grounding contract is three boundaries working together. Drop any one
        and the guarantee leaks.
      </p>
      <h3>1. Retrieval boundary</h3>
      <p>
        Embed the query, pull the top-k most similar chunks, and — critically —
        apply a similarity floor. A match below the floor is not a weak answer; it
        is <em>no answer</em>. This is what lets the system distinguish &quot;the
        docs are thin here&quot; from &quot;the docs are silent here.&quot;
      </p>
      <h3>2. Prompt boundary</h3>
      <p>
        The system prompt names the retrieved context as the sole authority and
        spells out the refusal behaviour as a literal string. Vague instructions
        produce vague compliance; an exact refusal sentence produces an exact
        refusal.
      </p>
      <h3>3. Output boundary</h3>
      <p>
        Require attribution. If every claim must cite a source heading from the
        context, a fabricated claim has nowhere to anchor — the requirement makes
        invention structurally awkward rather than merely discouraged.
      </p>

      <Terminal title="grounding.ts">
        <span className="tok-com">{`// retrieval boundary: a similarity floor turns "thin" into "silent"`}</span>
        {"\n"}
        {`const hits = await index.query({ vector: qVec, topK: 5, includeMetadata: true });\n`}
        {`const ctx = hits.filter((h) => h.score >= 0.75);\n`}
        {`if (ctx.length === 0) return REFUSAL;  // never reach the model\n\n`}
        <span className="tok-com">{`// prompt boundary: the model speaks only from ctx, and refuses otherwise`}</span>
        {"\n"}
        {`const answer = await generate({\n`}
        {`  system: GROUNDING_CONTRACT,\n`}
        {`  context: ctx.map((c) => c.metadata.text),\n`}
        {`  query,\n`}
        {`});`}
      </Terminal>

      <h2>The refusal is a feature, not a failure</h2>
      <p>
        Engineering managers tend to flinch at &quot;the bot says it doesn&apos;t
        know.&quot; They should celebrate it. A support assistant that cleanly
        defers the 5% it cannot answer is infinitely more deployable than one that
        invents an answer to all 100%. The refusal is also a free product signal:
        every clean &quot;that isn&apos;t in my knowledge base yet&quot; is a
        documentation gap, logged and rankable.
      </p>

      <blockquote>
        Hallucination is not a model defect you patch. It is an architectural gap
        you close — by deciding, in code, what the model is allowed to know.
      </blockquote>

      <p>
        The grounding contract is the spine of the streamerOS Support Agent. See
        the full retrieval and constraint breakdown in the{" "}
        <a href="/#projects">project teardown</a>, or the companion piece on{" "}
        <a href="/blog/edge-native-rag-cloudflare-workers-hono">
          running the whole pipeline at the edge
        </a>
        .
      </p>
    </>
  );
}

export const zeroHallucinationRag: BlogPost = {
  slug: "zero-hallucination-rag-grounding-contract",
  title: "Zero-Hallucination RAG: The Grounding Contract Pattern",
  description:
    "Retrieval does not stop hallucination — a grounding contract does. The three-boundary pattern (retrieval floor, prompt constraint, attribution) that forces a RAG agent to answer only from context, or refuse.",
  keywords: [
    "grounded RAG",
    "prevent LLM hallucination",
    "RAG system prompt",
    "retrieval augmented generation",
    "RAG architecture",
    "AI support agent",
  ],
  publishedAt: "2026-06-08",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["RAG", "AI Architecture", "Prompt Engineering"],
  takeaways: [
    "Retrieval changes where the model gets facts; a grounding contract decides whether it stays inside them.",
    "Three boundaries enforce it: a retrieval similarity floor, a prompt that names context as the sole authority, and required attribution.",
    "An empty context must trigger a literal refusal — the answer should never fall back to parametric memory.",
    "Clean refusals are a feature: they make the agent deployable and surface documentation gaps as a free signal.",
  ],
  Body,
};
