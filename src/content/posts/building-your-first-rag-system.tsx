import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        A base model knows the public internet up to its training cut-off and
        nothing about your data. Retrieval-Augmented Generation closes that gap:
        instead of fine-tuning facts into the model, you fetch the relevant facts
        at query time and hand them to the model as context. It is the most
        practical way to put a language model to work on private, current, or
        domain-specific knowledge.
      </p>

      <h2>Why the model needs your data</h2>
      <p>
        Ask a raw model about your internal policies, your customer records, or
        last week&apos;s events and it will either refuse or confidently invent.
        RAG removes the guessing: the model only answers from what you retrieve,
        which makes its output groundable, citable, and current — three things a
        bare model cannot offer.
      </p>

      <h2>The pipeline: chunk, embed, retrieve, ground</h2>
      <p>
        Every RAG system is the same four steps. Split your documents into
        coherent chunks. Embed each chunk into a vector. At query time, embed the
        question and retrieve the nearest chunks. Then assemble those chunks into
        a grounded prompt and let the model answer from them alone.
      </p>

      <Terminal title="rag.ts">
        <span className="tok-com">{"// retrieve, then ground the answer in what you found"}</span>
        {`
const hits = await store.search(embed(question), { k: 5 });
const context = hits.map((h) => h.text).join("\\n---\\n");
const answer = await llm.complete(
  \`Answer ONLY from the context. Cite sources.\\n\${context}\\n\\nQ: \${question}\`
);`}
      </Terminal>

      <h2>The failure modes that bite first</h2>
      <p>
        Two things sink naive RAG. Bad chunking — splitting mid-thought so no
        single chunk carries a complete idea — wrecks retrieval before the model
        ever runs. And missing grounding discipline — letting the model answer
        without forcing citations — quietly reintroduces the hallucination you
        adopted RAG to escape. Fix the chunks, enforce the citations, and most of
        the magic takes care of itself.
      </p>

      <blockquote>
        RAG does not make the model smarter. It makes the model honest — it can
        only tell you what you were able to find.
      </blockquote>

      <p>
        This is the foundation the autonomous version builds on; see the{" "}
        <a href="/blog/architecting-agentic-rag-pipelines-nodejs">
          Agentic RAG teardown
        </a>{" "}
        for what happens when retrieval becomes a tool the model controls.
      </p>
    </>
  );
}

export const buildingYourFirstRag: BlogPost = {
  slug: "building-your-first-rag-system",
  title: "Building Your First RAG System: A Practical Architecture",
  description:
    "A base model knows nothing about your data. The four-step RAG pipeline — chunk, embed, retrieve, ground — and the two failure modes that sink naive implementations.",
  keywords: [
    "RAG",
    "retrieval augmented generation",
    "embeddings",
    "Node.js",
    "vector search",
    "AI architecture",
    "grounding",
  ],
  publishedAt: "2023-03-10",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["RAG", "AI", "Node.js"],
  takeaways: [
    "RAG fetches relevant facts at query time instead of fine-tuning them in — the practical way to use private or current data.",
    "Every RAG system is four steps: chunk, embed, retrieve, ground.",
    "Bad chunking wrecks retrieval before the model runs; missing citation discipline reintroduces hallucination.",
    "RAG makes the model honest — it can only answer from what you retrieved.",
  ],
  Body,
};
