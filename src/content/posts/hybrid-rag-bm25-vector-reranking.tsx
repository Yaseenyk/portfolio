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
        In production, one retriever is a coin flip on the user’s phrasing. I run two
        lanes in parallel: a sparse keyword index (BM25) and a dense vector index.
        BM25 is ruthless about exact tokens &mdash; error codes, SKUs, API field
        names. Vectors forgive wording and catch the paraphrase BM25 would never see.
        They fail in opposite directions, so I let them disagree at wire speed, fuse
        the lists, then rerank the survivors. That sequence consistently moves answer
        quality more than any prompt tweak, and it does it without blowing up latency
        or context budget.
      </p>

      <h2>Dense retrieval has a precision hole</h2>
      <p>
        Vector search optimizes for meaning, which is why it trips on specifics.
        &quot;Error TX-409&quot; and &quot;Error TX-410&quot; sit shoulder to shoulder
        in embedding space, and a rare identifier the model never really learned
        floats somewhere ambiguous. Keyword search flips the trade: perfect when the
        token exists, useless the moment the user paraphrases or misspells. Neither
        is broken &mdash; they&apos;re specialized tools. The operational lesson is
        simple: lean on vectors for recall, lean on BM25 for precision on needles-in-
        haystacks, and never ask either to be something it isn&apos;t.
      </p>

      <HybridRetrievalDiagram />

      <h2>Reciprocal Rank Fusion needs no shared scale</h2>
      <p>
        Don&apos;t average a BM25 score with a cosine similarity. They aren&apos;t
        commensurate, so the math lies to you. Reciprocal Rank Fusion dodges the
        scale problem by using only{" "}
        <em>ranks</em>: each document scores <code>1 / (k + rank)</code> in each list,
        and you sum across lists. Items both retrievers rank highly rise; an item a
        single retriever loves can still earn a spot. No score normalization, no
        weight tuning, and far less config drift when corpora evolve or you swap
        embedding models. Position is stable; that stability pays back in on-call
        sanity.
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
        Retrieval is recall-first: cast a wide net and accept noise. Reranking is
        precision-last: a cross-encoder reads the query and each candidate{" "}
        <em>together</em> &mdash; not as two pre-computed vectors &mdash; and scores
        true relevance. It&apos;s expensive, so it has to be surgical. Run it only on
        the ~20 fused candidates that actually threaten to reach the prompt, then cut
        down to a handful. You buy accuracy where it flips the answer, keep p95
        latency inside budget, and avoid blowing tokens on filler. Fewer, better
        chunks also keep generation stable instead of thrashing across irrelevant
        context.
      </p>

      <blockquote>
        Don&apos;t pick between meaning and keywords. Run both, fuse by rank, then
        spend cross-encoder compute exactly where it changes the outcome: the few
        chunks that might enter the prompt.
      </blockquote>

      <p>
        In apps, I wire this into the pattern I call{" "}
        <em>Trinity Architecture</em>: Presentation renders the chat or notebook;
        Reactive State / Orchestration fans out to BM25 and vectors, runs fusion, and
        triggers rerank; a Data /{" "}
        <em>Serialization Adapter</em> trims the winners into lean, model-ready
        payloads. That adapter discipline came from IntegrateX, where stripping
        non-essential React Flow UI metadata before persistence cut payloads 94% —
        the same instinct that keeps RAG context tight. Hybrid retrieval builds on{" "}
        <a href="/blog/vector-foundations-semantic-search">vector foundations</a> and
        only pays off when your{" "}
        <a href="/blog/rag-chunking-strategy-architecture">chunking strategy</a> gives
        clean, comparable units to rank — the same pipeline that grounds the{" "}
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
