import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function RagPipelineDiagram() {
  return (
    <Diagram
      label="A RAG pipeline: a query is embedded, used to retrieve top-k chunks, assembled into a grounded prompt, and generated into a cited answer — with a branch that refuses when retrieval scores fall below a floor."
      caption="RAG is a contract: retrieve, ground, then answer only from the retrieved context — or refuse. The refusal branch is the part that makes it trustworthy."
    >
      <svg viewBox="0 0 760 300" role="img" aria-label="RAG pipeline with refusal branch">
        <defs>
          <marker id="rg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {[
          ["query", 24, "#67E8F9"],
          ["embed", 168, "#22D3EE"],
          ["retrieve top-k", 312, "#A855F7"],
          ["assemble", 480, "#22D3EE"],
          ["generate", 624, "#67E8F9"],
        ].map(([label, x, color], i, arr) => (
          <g key={label as string}>
            <rect x={x as number} y="96" width={i === 2 || i === 4 ? 124 : 112} height="52" rx="10" fill="#0b1018" stroke={color as string} />
            <text x={(x as number) + (i === 2 || i === 4 ? 62 : 56)} y="127" fill={color as string} fontFamily="monospace" fontSize="11" textAnchor="middle">
              {label}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={(x as number) + (i === 2 ? 124 : 112)}
                y1="122"
                x2={(arr[i + 1][1] as number) - 4}
                y2="122"
                stroke="#52525b"
                strokeWidth="1.5"
                markerEnd="url(#rg-arrow)"
              />
            )}
          </g>
        ))}

        {/* knowledge base feeding retrieve */}
        <rect x="312" y="20" width="124" height="40" rx="8" fill="rgba(168,85,247,0.06)" stroke="#A855F7" />
        <text x="374" y="45" fill="#c4b5fd" fontFamily="monospace" fontSize="10" textAnchor="middle">
          knowledge base
        </text>
        <line x1="374" y1="60" x2="374" y2="92" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#rg-arrow)" />

        {/* cited answer */}
        <rect x="600" y="200" width="160" height="44" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="680" y="227" fill="#22D3EE" fontFamily="monospace" fontSize="10" textAnchor="middle">
          answer + citations
        </text>
        <path d="M680 148 L680 198" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#rg-arrow)" />

        {/* refusal branch */}
        <rect x="300" y="200" width="180" height="44" rx="10" fill="rgba(244,63,94,0.07)" stroke="#f43f5e" />
        <text x="390" y="227" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="middle">
          refuse — &quot;not in docs&quot;
        </text>
        <path d="M374 148 C 374 180, 390 185, 390 198" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" fill="none" markerEnd="url(#rg-arrow)" />
        <text x="250" y="186" fill="#71717a" fontFamily="monospace" fontSize="9">low score</text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        An ungrounded LLM is a confident stranger: fluent, plausible, and willing
        to invent. Retrieval-Augmented Generation turns it into an expert who cites
        the manual. You retrieve the context relevant to the question, inject it
        into the prompt, and contract the model to answer <em>only</em> from what it
        was given. The model stops being the source of truth and becomes the thing
        that phrases it.
      </p>

      <h2>RAG is a grounding contract, not a search box</h2>
      <p>
        The mental model that matters: RAG is a contract with two clauses. Answer
        from the retrieved context, and if the context doesn&apos;t contain the
        answer, say so. The second clause is what people skip, and it&apos;s the one
        that makes the system trustworthy. A grounded agent that refuses when it has
        nothing to stand on is worth more than one that always answers — because the
        always-answering one is lying part of the time.
      </p>

      <RagPipelineDiagram />

      <h2>Retrieval quality caps answer quality</h2>
      <p>
        No prompt rescues bad retrieval. If the right chunk isn&apos;t in the
        top-k, the model literally cannot ground its answer in it — it will either
        refuse or improvise. This is why, in the streamerOS support agent, the
        retrieval step gets the engineering attention: tight chunking, metadata
        filters, and a score floor below which we&apos;d rather return nothing than
        a guess. Garbage retrieval, garbage answer.
      </p>

      <Terminal title="rag.ts">
        <span className="tok-com">{`// the grounding contract, in code`}</span>
        {"\n"}
        {`const hits = await store.search({ vector: await embed(q), topK: 6 });\n\n`}
        {`if (!hits.length || hits[0].score < 0.74) {\n`}
        {`  return { answer: "I don't have that in the docs.", sources: [] };\n`}
        {`}\n\n`}
        {`const prompt = ground(SYSTEM, hits, q); // "answer ONLY from <context>"\n`}
        {`const answer = await model.generate({ prompt, temperature: 0 });\n`}
        {`return { answer, sources: hits.map(h => h.id) };`}
      </Terminal>

      <h2>Citations and refusal are architecture</h2>
      <p>
        Treat citations and refusals as load-bearing structure, not polish. Every
        answer should carry the IDs of the chunks it was grounded in, so a human
        can verify it and so the system can be evaluated. Every low-confidence
        retrieval should fall through to an honest &quot;I don&apos;t know&quot;
        rather than a fabricated paragraph. Knowing when <em>not</em> to answer is
        the feature.
      </p>

      <blockquote>
        RAG doesn&apos;t make the model smarter. It makes it accountable — bounding
        it to a source it can cite, and to silence when it can&apos;t.
      </blockquote>

      <p>
        A grounded agent is the building block; wrap a{" "}
        <a href="/blog/agentic-control-loops">control loop</a> around several of
        them and you have an autonomous system, defended by{" "}
        <a href="/blog/guardrail-engineering-hallucination-prevention">guardrails</a>.
        Continue on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const ragGroundingTheAgent: BlogPost = {
  slug: "rag-grounding-the-agent",
  title: "RAG: Grounding the Agent (My streamerOS Approach)",
  description:
    "An ungrounded LLM is a confident stranger. RAG turns it into an expert who cites the manual: retrieve relevant context, inject it, and contract the model to answer only from what it was given — or refuse.",
  keywords: [
    "RAG architecture",
    "retrieval augmented generation",
    "grounding contract",
    "hallucination prevention",
    "AI citations",
    "production RAG",
  ],
  publishedAt: "2026-04-13",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["RAG", "AI", "Architecture"],
  takeaways: [
    "RAG is a grounding contract: answer from retrieved context, and refuse when the context doesn't contain the answer.",
    "Retrieval quality caps answer quality — no prompt rescues a chunk that wasn't retrieved.",
    "Citations and refusal are load-bearing architecture, not features: every answer cites its sources or admits it doesn't know.",
  ],
  Body,
};
