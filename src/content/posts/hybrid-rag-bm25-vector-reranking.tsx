import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function HybridRetrievalDiagram() {
  return (
    <Diagram
      label="A hybrid retrieval pipeline. One query fans out to a sparse BM25 lane and a dense vector lane in parallel; their ranked lists merge with Reciprocal Rank Fusion, then a cross-encoder reranks the top candidates before the survivors become context."
      caption="Two retrievers see different things. BM25 catches the exact token a vector misses; the vector catches the paraphrase BM25 misses. Fuse the ranks, then let a cross-encoder make the final call on a small top-k."
    >
      <svg viewBox="0 0 760 270" role="img" aria-label="Hybrid retrieval with rank fusion and reranking">
        <defs>
          <marker id="h-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* query */}
        <rect x="24" y="110" width="120" height="50" rx="10" fill="#0b1018" stroke="#67E8F9" />
        <text x="84" y="140" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          query
        </text>

        {/* sparse lane */}
        <line x1="144" y1="124" x2="216" y2="74" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#h-arrow)" />
        <rect x="220" y="48" width="160" height="50" rx="10" fill="#0b1018" stroke="#A855F7" />
        <text x="300" y="70" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          BM25 (sparse)
        </text>
        <text x="300" y="86" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          exact terms, codes
        </text>

        {/* dense lane */}
        <line x1="144" y1="146" x2="216" y2="196" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#h-arrow)" />
        <rect x="220" y="172" width="160" height="50" rx="10" fill="#0b1018" stroke="#22D3EE" />
        <text x="300" y="194" fill="#22D3EE" fontFamily="monospace" fontSize="11" textAnchor="middle">
          vector (dense)
        </text>
        <text x="300" y="210" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          meaning, paraphrase
        </text>

        {/* RRF merge */}
        <line x1="380" y1="73" x2="452" y2="120" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#h-arrow)" />
        <line x1="380" y1="197" x2="452" y2="150" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#h-arrow)" />
        <rect x="456" y="110" width="120" height="50" rx="10" fill="rgba(103,232,249,0.06)" stroke="#67E8F9" />
        <text x="516" y="132" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          RRF merge
        </text>
        <text x="516" y="148" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          reciprocal rank
        </text>

        {/* rerank */}
        <line x1="576" y1="135" x2="620" y2="135" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#h-arrow)" />
        <rect x="624" y="110" width="112" height="50" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="680" y="132" fill="#22D3EE" fontFamily="monospace" fontSize="11" textAnchor="middle">
          rerank
        </text>
        <text x="680" y="148" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          cross-encoder
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        Hybrid RAG runs two retrievers over the same query and fuses their results:
        a sparse keyword index (BM25) and a dense vector index. Each catches what the
        other is blind to — BM25 nails the exact error code or product SKU a vector
        embedding smears away, and the vector finds the paraphrase that shares no
        words with the document. Fusing them, then reranking the shortlist, is the
        single most reliable retrieval-quality upgrade in production.
      </p>

      <h2>Dense retrieval has a precision hole</h2>
      <p>
        Vector search is built for meaning, which is exactly why it fumbles
        specifics. &quot;Error TX-409&quot; and &quot;Error TX-410&quot; sit almost on
        top of each other in embedding space, and a rare identifier the embedding
        never really learned lands somewhere vague. Keyword search has the opposite
        profile: it&apos;s exact to a fault and goes blind the moment the user
        paraphrases. Neither is wrong — they fail in different directions, which is
        the whole reason to run both.
      </p>

      <HybridRetrievalDiagram />

      <h2>Reciprocal Rank Fusion needs no shared scale</h2>
      <p>
        The trap is trying to add a BM25 score to a cosine similarity — they live on
        incompatible scales and the blend is meaningless. Reciprocal Rank Fusion
        sidesteps it entirely by throwing away the scores and keeping only the{" "}
        <em>ranks</em>: each document scores <code>1 / (k + rank)</code> in each list,
        and you sum across lists. A document both retrievers rank highly wins; a
        document only one finds still places. No tuning of relative weights, no
        normalization — just position.
      </p>

      <Terminal title="hybridSearch.ts">
        <span className="tok-com">{`// two retrievers in parallel, fused by rank, then reranked`}</span>
        {"\n"}
        {`const [sparse, dense] = await Promise.all([\n`}
        {`  bm25.search(q, 50),            // exact terms, codes, names\n`}
        {`  vectorIndex.search(embed(q), 50), // meaning, paraphrase\n`}
        {`]);\n\n`}
        {`const fused = rrf([sparse, dense], 60); // score = Σ 1/(60 + rank)\n`}
        {`const top = await reranker.rank(q, fused.slice(0, 20)); // cross-encoder\n`}
        {`return top.slice(0, 5);          // small, high-precision context`}
      </Terminal>

      <h2>The cross-encoder earns its cost on a small top-k</h2>
      <p>
        Retrieval is recall-first: cast a wide net, accept some noise. Reranking is
        precision-last: a cross-encoder reads the query and each candidate{" "}
        <em>together</em> — not as two pre-computed vectors — and scores true
        relevance. It&apos;s too slow to run over the whole corpus, which is the
        point: you only ever run it on the ~20 survivors of fusion, so you pay for
        accuracy exactly where it changes the answer. Fewer, better chunks also means
        a tighter context window and a cheaper generation.
      </p>

      <blockquote>
        One retriever is a bet that meaning or keywords matter more. Hybrid RAG
        refuses the bet — retrieve both ways, fuse by rank, and let a cross-encoder
        spend its compute on the handful of chunks that actually reach the prompt.
      </blockquote>

      <p>
        Hybrid retrieval builds directly on{" "}
        <a href="/blog/vector-foundations-semantic-search">vector foundations</a> and
        only pays off when your{" "}
        <a href="/blog/rag-chunking-strategy-architecture">chunking strategy</a> gives
        each retriever clean units to rank — the same pipeline that grounds the{" "}
        <a href="/blog/edge-native-rag-cloudflare-workers-hono">streamerOS support agent</a>.
        Continue on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const hybridRag: BlogPost = {
  slug: "hybrid-rag-bm25-vector-reranking",
  title: "Hybrid RAG: Fusing Keyword and Vector Search with Reranking",
  description:
    "Dense vectors miss exact codes; keyword search misses paraphrase. Hybrid RAG runs BM25 and vector retrieval in parallel, fuses them with Reciprocal Rank Fusion, and reranks the shortlist with a cross-encoder for production-grade precision.",
  keywords: [
    "hybrid RAG",
    "BM25 vector search",
    "reciprocal rank fusion",
    "cross-encoder reranking",
    "retrieval precision",
    "production RAG architecture",
  ],
  publishedAt: "2026-06-02",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "RAG", "Search"],
  takeaways: [
    "Run sparse (BM25) and dense (vector) retrieval together — each catches the failure mode the other is blind to.",
    "Fuse with Reciprocal Rank Fusion, which uses rank position only, so you never have to reconcile incompatible score scales.",
    "Rerank the fused shortlist with a cross-encoder: precision compute spent only on the ~20 candidates that can reach the prompt.",
  ],
  Body,
};
