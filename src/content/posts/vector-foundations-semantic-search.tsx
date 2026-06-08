import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function VectorSpaceDiagram() {
  const cluster = (cx: number, cy: number, color: string, label: string) => (
    <g>
      {[
        [0, 0],
        [18, -10],
        [-14, 12],
        [10, 16],
        [-20, -8],
      ].map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r="4" fill={color} opacity="0.85" />
      ))}
      <text x={cx} y={cy + 42} fill={color} fontFamily="monospace" fontSize="10" textAnchor="middle">
        {label}
      </text>
    </g>
  );

  return (
    <Diagram
      label="A 2D embedding space showing clustered points for billing, account access, and shipping topics; a query vector for 'reset my password' lands inside the account-access cluster via a cosine-similarity cone."
      caption="Embeddings place meaning as geometry. 'Reset my password' lands among 'recover account access' — semantic neighbours, not string matches — and an ANN index finds them in sub-millisecond time."
    >
      <svg viewBox="0 0 760 320" role="img" aria-label="Semantic vector space">
        {/* axes */}
        <line x1="60" y1="280" x2="700" y2="280" stroke="#27272a" strokeWidth="1" />
        <line x1="60" y1="280" x2="60" y2="40" stroke="#27272a" strokeWidth="1" />

        {cluster(200, 110, "#A855F7", "billing")}
        {cluster(560, 120, "#67E8F9", "shipping")}
        {cluster(420, 210, "#22D3EE", "account access")}

        {/* query */}
        <circle cx="400" cy="200" r="6" fill="#fb7185" stroke="#fff" strokeWidth="1" />
        <text x="400" y="184" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="middle">
          &quot;reset my password&quot;
        </text>

        {/* cosine cone to nearest cluster */}
        <path d="M400 200 L470 190 M400 200 L450 230" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <text x="600" y="270" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="end">
          distance ≈ semantic similarity
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        Keyword search asks &quot;does this string appear?&quot; Semantic search
        asks &quot;does this <em>mean</em> the same thing?&quot; The bridge between
        those two questions is the embedding: a model that turns a span of text
        into a vector, positioned so that things which mean similar things land
        near each other. Get this layer right and &quot;reset my password&quot;
        finds &quot;recover account access&quot; without sharing a single word.
      </p>

      <h2>Meaning becomes geometry</h2>
      <p>
        An embedding model maps text into a high-dimensional space where distance
        encodes similarity. You never look at the 1,536 numbers directly — you
        compare them. Cosine similarity between two vectors approximates how related
        their meanings are, which means search becomes a geometry problem: find the
        nearest neighbours to the query vector.
      </p>

      <VectorSpaceDiagram />

      <h2>ANN indexes trade exactness for speed</h2>
      <p>
        Comparing the query against every vector (a brute-force k-NN scan) is exact
        but doesn&apos;t scale — at a million documents it&apos;s a linear wall.
        Approximate nearest-neighbour indexes like HNSW and IVF give up a sliver of
        recall to return results in sub-millisecond time, by navigating a graph or
        probing a subset of partitions instead of scanning everything. For
        production retrieval, &quot;approximately the right ten, instantly&quot;
        beats &quot;exactly the right ten, eventually.&quot;
      </p>

      <Terminal title="search.ts">
        <span className="tok-com">{`// embed the query, then ANN-search the store`}</span>
        {"\n"}
        {`const [qVec] = await embed([query]);\n\n`}
        {`const hits = await store.search({\n`}
        {`  vector: qVec,\n`}
        {`  topK: 8,                 // recall vs. token-budget tradeoff\n`}
        {`  metric: "cosine",\n`}
        {`  filter: { lang: "en" },  // metadata pre-filter narrows the space\n`}
        {`});`}
      </Terminal>

      <h2>Chunking decides quality more than the model does</h2>
      <p>
        Teams obsess over which embedding model to use and under-invest in how they
        split documents. But retrieval quality is dominated by chunk design: too
        large and a chunk dilutes its own meaning across many topics; too small and
        it loses the context that made it answerable. The unit you embed <em>is</em>
        the unit you retrieve — design it for the question you expect, not for the
        convenience of your parser.
      </p>

      <blockquote>
        Semantic search isn&apos;t a better keyword index. It&apos;s a different
        question — &quot;what means this?&quot; — answered by turning meaning into
        coordinates and asking what&apos;s nearby.
      </blockquote>

      <p>
        This vector layer is the retrieval half of{" "}
        <a href="/blog/rag-grounding-the-agent">RAG</a>, and the place where{" "}
        <a href="/blog/latency-first-ai-serverless-hono">semantic caching</a> later
        earns its keep. Continue on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const vectorFoundations: BlogPost = {
  slug: "vector-foundations-semantic-search",
  title: "Vector Foundations: How Semantic Search Actually Works",
  description:
    "Keyword search asks 'does this string appear?' Semantic search asks 'does this mean the same thing?' Embeddings turn meaning into geometry — and chunking, not model choice, usually decides retrieval quality.",
  keywords: [
    "semantic search",
    "vector embeddings",
    "ANN HNSW IVF",
    "cosine similarity",
    "vector database",
    "retrieval quality",
  ],
  publishedAt: "2026-03-30",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "RAG", "Backend"],
  takeaways: [
    "Embeddings map text into a space where distance approximates semantic similarity, turning search into a geometry problem.",
    "ANN indexes (HNSW/IVF) trade a sliver of exactness for sub-millisecond recall at scale.",
    "Chunking strategy — the unit you embed is the unit you retrieve — usually decides retrieval quality more than the model does.",
  ],
  Body,
};
