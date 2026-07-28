import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Every RAG system I&apos;ve operated fails the same quiet way: it retrieves
        plausible-but-wrong context and answers confidently from it. A demo hides
        that behind a single similarity query; production vector search — the kind
        powering the Police RAG system over dense, multi-format legal archives —
        has to be precise, filterable, and current. Closing that gap is the job.
      </p>

      <h2>Chunking decides retrieval quality</h2>
      <p>
        Before a single vector is searched, the chunking strategy has already
        determined the ceiling. Split mid-thought and no chunk carries a complete
        idea; split too coarsely and the relevant sentence drowns in noise. For
        legal text, chunk on semantic boundaries — clauses, sections — with a
        small overlap so context is never severed at the seam. Retrieval is only
        as good as the units you embedded.
      </p>

      <h2>Filter, then rank</h2>
      <p>
        Pure semantic similarity is not enough when correctness is legal. Combine
        the vector search with metadata pre-filters — jurisdiction, date, case
        type — so the model only ever ranks candidates that are structurally
        valid. This hybrid of exact filtering and semantic ranking is what keeps
        an autonomous system from citing an irrelevant statute that merely{" "}
        <em>reads</em> similar.
      </p>

      <Terminal title="search.ts">
        <span className="tok-com">{"// filter on metadata, rank by meaning"}</span>
        {`
const hits = await Cases.aggregate([
  { $vectorSearch: {
      index: "case_embeddings",
      path: "embedding",
      queryVector: await embed(question),
      filter: { jurisdiction, caseType },   // hard constraints first
      numCandidates: 400,
      limit: 8,
  } },
]);`}
      </Terminal>

      <h2>Keep the index honest</h2>
      <p>
        An embedding index rots silently. Use one embedding model consistently —
        vectors from different models are not comparable — and re-embed whenever
        source text changes, or retrieval slowly drifts from reality. In a system
        that outputs verdict matrices, a stale index is not a degraded
        experience; it is a wrong answer with a citation attached.
      </p>

      <blockquote>
        In production, vector search is not &quot;find similar.&quot; It is
        &quot;find valid, then rank by meaning, and never cite what you could not
        ground.&quot;
      </blockquote>

      <p>
        The judgment that separates a demo from a system I&apos;d put in front of a
        legal team is knowing retrieval quality is decided upstream — at chunking
        and filtering — long before the ranker runs. For the fundamentals, see{" "}
        <a href="/blog/embeddings-semantic-search-mongodb">Embeddings 101</a> and{" "}
        <a href="/blog/vector-databases-for-mern-developers">
          Vector Databases for MERN Developers
        </a>
        ; the system is the{" "}
        <a href="/#projects">Police RAG Agent</a>.
      </p>
    </>
  );
}

export const vectorEmbeddingsInProduction: BlogPost = {
  slug: "vector-embeddings-in-production",
  title: "Vector Embeddings in Production: Where RAG Quietly Fails",
  description:
    "Shipping vector embeddings in production, I learned RAG is a pipeline, not a query: chunking, metadata-filtered hybrid search, and keeping indexes from rotting.",
  keywords: [
    "vector embeddings",
    "vector search",
    "RAG",
    "production RAG engineer",
    "hybrid search MongoDB",
    "Yaseen Khatib",
  ],
  publishedAt: "2026-06-14",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Vector DB", "RAG", "AI"],
  takeaways: [
    "Chunking sets the ceiling on retrieval quality — split on semantic boundaries with overlap, never mid-thought.",
    "Combine metadata pre-filters with semantic ranking so the model only ranks structurally-valid candidates.",
    "Keep one embedding model and re-embed on source changes, or the index silently rots into wrong answers.",
    "Production vector search means: find valid, rank by meaning, and never cite what you couldn't ground.",
  ],
  Body,
};
