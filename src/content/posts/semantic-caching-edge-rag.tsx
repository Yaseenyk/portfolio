import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 300"
        className="h-auto w-full"
        role="img"
        aria-label="An incoming query is embedded and checked against cached vectors; above the similarity threshold it returns a cached answer, below it the model is called and the result is stored."
      >
        <defs>
          <marker id="sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Query */}
        <rect x="24" y="120" width="110" height="50" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="79" y="150" fill="#e4e4e7" fontFamily="monospace" fontSize="12" textAnchor="middle">
          query
        </text>

        {/* Embed + cache lookup */}
        <rect x="180" y="108" width="150" height="74" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="255" y="138" fill="#22D3EE" fontFamily="monospace" fontSize="12" textAnchor="middle">
          embed + lookup
        </text>
        <text x="255" y="156" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          nearest cached vec
        </text>

        {/* Threshold dial */}
        <circle cx="430" cy="145" r="40" fill="none" stroke="#3f3f46" strokeWidth="6" />
        <path d="M430 145 L430 109" stroke="#67E8F9" strokeWidth="3" />
        <path d="M430 145 L458 165" stroke="#A855F7" strokeWidth="3" />
        <text x="430" y="210" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          sim ≥ 0.95 ?
        </text>

        {/* HIT */}
        <rect x="560" y="60" width="180" height="50" rx="8" fill="rgba(16,185,129,0.08)" stroke="#10b981" />
        <text x="650" y="82" fill="#34d399" fontFamily="monospace" fontSize="12" textAnchor="middle">
          HIT → cached answer
        </text>
        <text x="650" y="98" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          ~0 cost · instant
        </text>

        {/* MISS */}
        <rect x="560" y="180" width="180" height="64" rx="8" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="650" y="206" fill="#A855F7" fontFamily="monospace" fontSize="12" textAnchor="middle">
          MISS → call LLM
        </text>
        <text x="650" y="224" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          then store result
        </text>

        {/* Arrows */}
        <line x1="134" y1="145" x2="176" y2="145" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
        <line x1="330" y1="145" x2="386" y2="145" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
        <path d="M470 130 C 510 100, 530 85, 558 85" stroke="#10b981" strokeWidth="1.5" fill="none" markerEnd="url(#sc-arrow)" />
        <path d="M470 165 C 510 195, 530 210, 558 210" stroke="#A855F7" strokeWidth="1.5" fill="none" markerEnd="url(#sc-arrow)" />
        {/* write-back dashed */}
        <path d="M650 180 C 650 150, 540 150, 470 150" stroke="#52525b" strokeWidth="1.2" strokeDasharray="4 4" fill="none" markerEnd="url(#sc-arrow)" />
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        The cheapest model call is the one you never make. Above the threshold, the answer is already on the shelf.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        Support traffic is gloriously repetitive. &quot;How do I connect my
        OBS?&quot;, &quot;how do I link OBS&quot;, &quot;OBS setup help&quot; — three
        phrasings of one question, and a naive RAG pipeline runs the full retrieve-
        and-generate gauntlet for every single one. Each is a model call you paid
        for and a second of latency the user waited through, to produce an answer
        you have already produced a hundred times. Semantic caching fixes this by
        recognising the question, not the string.
      </p>

      <h2>Why a normal cache misses</h2>
      <p>
        A key-value cache keyed on the raw query string is useless here, because
        no two users phrase a question identically. The cache hit rate hovers near
        zero. What you actually want to match on is <em>meaning</em> — and you
        already have the machinery to measure meaning, because your RAG pipeline
        embeds the query anyway. A semantic cache reuses that embedding to ask a
        different question: have I already answered something that means this?
      </p>

      <Diagram />

      <h2>The mechanism</h2>
      <p>
        Embed the incoming query — you were going to anyway. Before doing any
        retrieval or generation, search a small vector index of previously
        answered queries. If the nearest neighbour sits above a similarity
        threshold, return its stored answer and stop. If not, run the full
        pipeline, then write the new query embedding and its answer back to the
        cache. The cache learns the shape of your traffic over time, and the hot
        questions go nearly free.
      </p>

      <Terminal title="semantic-cache.ts">
        <span className="tok-com">{`// check meaning, not string equality`}</span>
        {"\n"}
        {`const qVec = await embed(query);\n`}
        {`const [near] = await cache.query({ vector: qVec, topK: 1 });\n\n`}
        {`if (near && near.score >= 0.95) {\n`}
        {`  return near.metadata.answer;        // HIT — no retrieval, no LLM\n`}
        {`}\n\n`}
        {`const answer = await runRagPipeline(query, qVec);\n`}
        {`await cache.upsert({ vector: qVec, metadata: { answer } });  // learn it\n`}
        {`return answer;`}
      </Terminal>

      <h2>The threshold is a product decision</h2>
      <p>
        The similarity floor is the one dial that matters, and it is not an
        engineering constant — it is a risk choice. Set it high (0.97+) and you
        only ever reuse answers to near-identical questions; safe, lower hit rate.
        Set it lower and you catch more paraphrases but risk serving a confidently
        adjacent answer to a subtly different question. For a grounded support
        agent I keep it conservative, because a wrong cache hit undoes the entire
        zero-hallucination guarantee.
      </p>

      <h2>Invalidation is the catch</h2>
      <p>
        A cached answer is a snapshot of the documentation at the moment it was
        generated. When the knowledge base changes, stale entries become a
        liability — they will happily serve last month&apos;s instructions. The
        clean fix is to tag every cache entry with the corpus version it was
        derived from and drop the whole cache on re-index. The cache is cheap to
        rebuild; serving a confidently outdated answer is not.
      </p>

      <blockquote>
        Semantic caching is the rare optimisation that improves cost and latency at
        once — you are not making the model faster, you are skipping it entirely for
        questions you have already answered.
      </blockquote>

      <p>
        This sits in front of{" "}
        <a href="/blog/edge-native-rag-cloudflare-workers-hono">
          the edge-native pipeline
        </a>{" "}
        and respects{" "}
        <a href="/blog/zero-hallucination-rag-grounding-contract">
          the grounding contract
        </a>{" "}
        — a cache hit is only valid if the original answer was grounded.
      </p>
    </>
  );
}

export const semanticCachingEdge: BlogPost = {
  slug: "semantic-caching-edge-rag",
  title: "Semantic Caching at the Edge: Cutting RAG Cost and Latency Before You Call the LLM",
  description:
    "Support traffic is repetitive, but a string-keyed cache never hits. A semantic cache matches on meaning using the query embedding you already compute — skipping retrieval and generation entirely for questions you have already answered.",
  keywords: [
    "semantic cache",
    "LLM caching",
    "reduce LLM cost",
    "vector cache",
    "RAG latency optimization",
    "AI cost optimization",
  ],
  publishedAt: "2026-06-02",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["RAG", "Performance", "Cost Optimization"],
  takeaways: [
    "String-keyed caches miss because no two users phrase a question the same way; semantic caching matches on meaning.",
    "Reuse the query embedding you already compute to look up previously answered questions in a small vector index.",
    "The similarity threshold is a risk decision, not a constant — keep it conservative for grounded agents.",
    "Tag cache entries with the corpus version and invalidate on re-index to avoid serving stale answers.",
  ],
  Body,
};
