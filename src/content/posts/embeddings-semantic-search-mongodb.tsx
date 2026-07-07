import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Keyword search has a fatal flaw: it matches characters, not meaning. A
        user searching &quot;laptop won&apos;t turn on&quot; never finds the
        article titled &quot;resolving boot failures&quot; because they share no
        words. Embeddings fix that by representing meaning as geometry — and with
        MongoDB now able to store and search vectors, semantic search drops into a
        MERN stack without a second database.
      </p>

      <h2>Meaning, not keywords</h2>
      <p>
        An embedding model maps text to a vector such that related ideas land near
        each other in space. Search stops being &quot;which documents contain
        these exact tokens&quot; and becomes &quot;which documents mean something
        close to this.&quot; That is the difference between a search that frustrates
        users and one that feels like it understood them.
      </p>

      <h2>Generate, store, search</h2>
      <p>
        The workflow is three moves. When a document is created or updated, embed
        its text and store the vector alongside it. At query time, embed the
        search string the same way and run a nearest-neighbour search over the
        stored vectors. Because the embedding lives on the document, your data and
        its semantic index never drift apart.
      </p>

      <Terminal title="embed.ts">
        <span className="tok-com">{"// store the vector beside the document"}</span>
        {`
await Docs.insertOne({ ...doc, embedding: await embed(doc.text) });

// query by meaning, return the closest matches
const results = await Docs.aggregate([
  { $vectorSearch: {
      index: "embedding_index",
      path: "embedding",
      queryVector: await embed(searchText),
      numCandidates: 150,
      limit: 8,
  } },
]);`}
      </Terminal>

      <h2>The details that decide quality</h2>
      <p>
        Two choices shape results more than anything else: keep your embedding
        model consistent — vectors from different models are not comparable — and
        re-embed when a document&apos;s text changes, or your index quietly rots.
        Get those right and semantic search is shockingly good with very little
        code.
      </p>

      <blockquote>
        Keyword search finds the words the user typed. Semantic search finds the
        thing they meant. Only one of those is what they actually wanted.
      </blockquote>

      <p>
        For the mental model behind the vectors, start with{" "}
        <a href="/blog/vector-databases-for-mern-developers">
          vector databases for MERN developers
        </a>
        .
      </p>
    </>
  );
}

export const embeddingsSemanticSearch: BlogPost = {
  slug: "embeddings-semantic-search-mongodb",
  title: "Embeddings 101: Semantic Search in MongoDB",
  description:
    "Keyword search matches characters, not meaning. How embeddings + MongoDB vector search deliver semantic search in a MERN stack — generate, store, and query by meaning.",
  keywords: [
    "embeddings",
    "semantic search",
    "MongoDB",
    "vector search",
    "MERN",
    "AI",
    "search relevance",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Embeddings", "MongoDB", "Search"],
  takeaways: [
    "Keyword search matches tokens; semantic search matches meaning by representing text as vectors.",
    "The workflow is three moves: embed on write, store the vector beside the document, embed-and-search on query.",
    "Keep one embedding model (vectors across models aren't comparable) and re-embed when text changes.",
    "Storing the vector on the document keeps data and its semantic index from drifting apart.",
  ],
  Body,
};
