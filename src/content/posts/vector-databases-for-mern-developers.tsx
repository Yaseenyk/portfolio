import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        If you can write a MongoDB query, you can understand a vector database.
        The difference is what you search by: instead of matching exact field
        values, you match by <em>meaning</em>. That single shift is what makes
        semantic search, RAG, and recommendation systems possible — and it fits
        into a MERN stack more naturally than most engineers expect.
      </p>

      <h2>What a vector actually is</h2>
      <p>
        An embedding model turns a piece of text into a long array of numbers — a
        coordinate in a high-dimensional space where similar meanings sit close
        together. &quot;Cancel my subscription&quot; and &quot;how do I end my
        plan&quot; land near each other even though they share no keywords. The
        vector is just that coordinate. A vector database is built to find the
        nearest ones, fast.
      </p>

      <h2>Similarity search vs. exact query</h2>
      <p>
        A normal query asks &quot;where status equals active.&quot; A vector
        query asks &quot;what is closest to this point.&quot; The first is exact
        and binary; the second is ranked and fuzzy. You are no longer filtering
        records — you are sorting all of them by relevance to a meaning and taking
        the top few. That is the entire mechanism behind retrieval.
      </p>

      <Terminal title="search.ts">
        <span className="tok-com">{"// $vectorSearch: nearest neighbours by meaning"}</span>
        {`
const hits = await Docs.aggregate([
  { $vectorSearch: {
      index: "embedding_index",
      queryVector: await embed(query),
      path: "embedding",
      numCandidates: 200,
      limit: 5,
  } },
]);`}
      </Terminal>

      <h2>Atlas vector search vs. a dedicated store</h2>
      <p>
        For a MERN team, the pragmatic answer is usually to keep your vectors next
        to your documents — MongoDB Atlas&apos;s vector search means one database,
        one query language, no extra system to operate. Reach for a dedicated
        store only when scale, specialized indexing, or extreme query volume
        justify the added operational weight. Most products never do.
      </p>

      <blockquote>
        A vector database is not exotic infrastructure. It is a WHERE clause that
        sorts by meaning instead of matching by value.
      </blockquote>

      <p>
        Embeddings power the search; the next post,{" "}
        <a href="/blog/embeddings-semantic-search-mongodb">Embeddings 101</a>,
        goes deeper on generating and storing them.
      </p>
    </>
  );
}

export const vectorDatabasesForMern: BlogPost = {
  slug: "vector-databases-for-mern-developers",
  title: "Vector Databases, Explained for MERN Developers",
  description:
    "If you can write a Mongo query, you can understand a vector database — you just search by meaning instead of value. The mechanism behind semantic search and RAG.",
  keywords: [
    "vector database",
    "MongoDB Atlas",
    "vector search",
    "embeddings",
    "semantic search",
    "MERN",
    "AI",
  ],
  publishedAt: "2023-05-05",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Vector DB", "MongoDB", "AI"],
  takeaways: [
    "An embedding is a coordinate in meaning-space; a vector DB finds the nearest ones quickly.",
    "Vector search ranks everything by relevance to a meaning rather than filtering by exact value.",
    "For MERN teams, Atlas vector search keeps vectors beside documents — one database, one query language.",
    "Reach for a dedicated vector store only when scale or query volume genuinely justifies the operational weight.",
  ],
  Body,
};
