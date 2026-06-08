import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 320"
        className="h-auto w-full"
        role="img"
        aria-label="One model node feeds two paths — an embedding path that builds the vector index and a generation path that answers — both anchored to one shared latent space."
      >
        <defs>
          <marker id="sm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Single model */}
        <rect x="300" y="128" width="160" height="64" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="380" y="156" fill="#22D3EE" fontFamily="monospace" fontSize="13" textAnchor="middle">
          gemini-flash
        </text>
        <text x="380" y="174" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          one model · one SDK
        </text>

        {/* Embed path (top) */}
        <text x="40" y="40" fill="#A855F7" fontFamily="monospace" fontSize="11">
          EMBED PATH
        </text>
        <rect x="40" y="56" width="150" height="44" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="115" y="83" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">
          knowledge-base.md
        </text>
        <rect x="560" y="56" width="150" height="44" rx="8" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="635" y="83" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          vector index
        </text>

        {/* Generate path (bottom) */}
        <text x="40" y="232" fill="#67E8F9" fontFamily="monospace" fontSize="11">
          GENERATE PATH
        </text>
        <rect x="40" y="248" width="150" height="44" rx="8" fill="#0b1018" stroke="#3f3f46" />
        <text x="115" y="275" fill="#a1a1aa" fontFamily="monospace" fontSize="11" textAnchor="middle">
          user query
        </text>
        <rect x="560" y="248" width="150" height="44" rx="8" fill="rgba(103,232,249,0.08)" stroke="#67E8F9" />
        <text x="635" y="275" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          answer
        </text>

        {/* Shared latent space band */}
        <text x="380" y="252" fill="#52525b" fontFamily="monospace" fontSize="10" textAnchor="middle">
          one shared latent space
        </text>

        {/* Arrows in */}
        <path d="M190 78 L300 144" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#sm-arrow)" />
        <path d="M190 270 L300 176" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#sm-arrow)" />
        {/* Arrows out */}
        <path d="M460 144 L558 78" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#sm-arrow)" />
        <path d="M460 176 L558 270" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#sm-arrow)" />
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        One model, two jobs. Query and corpus are embedded by the same function, so they land in the same space by construction.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        The reflexive RAG architecture reaches for two models: a specialised
        embedding model for retrieval and a separate, larger model for generation.
        It is defensible — best-of-breed at each step. It is also two providers,
        two SDKs, two sets of credentials, two failure surfaces, and a standing
        risk that your query embeddings and your corpus embeddings drift into
        subtly different spaces. On the streamerOS Support Agent I made the
        opposite call: one model — <code>gemini-flash-latest</code> — does both.
      </p>

      <h2>The complexity you delete</h2>
      <p>
        Every provider you add is not one integration but a tax on all of them:
        another key to rotate, another rate limit to reason about, another client
        to bundle into a constrained Worker, another SDK quirk to learn. Folding
        embedding and generation into a single model removes an entire axis of
        operational surface. The architecture diagram loses a box, and so does the
        on-call runbook.
      </p>

      <Diagram />

      <h2>The subtle win: one latent space</h2>
      <p>
        Retrieval works by comparing the query vector to the chunk vectors. That
        comparison is only meaningful if both vectors live in the{" "}
        <em>same</em> space. When two different models embed the corpus and the
        query, you are quietly trusting that their geometries align well enough —
        a trust that erodes the moment either model is versioned underneath you.
        Use one model for both and the guarantee is free: query and corpus are
        embedded by the same function, so they are comparable by construction.
      </p>

      <Terminal title="embed.ts">
        <span className="tok-com">{`// same model, same call — used at index time AND query time`}</span>
        {"\n"}
        {`async function embed(text: string, env: Env) {\n`}
        {`  const { embedding } = await ai.embed({\n`}
        {`    model: "gemini-flash-latest",   // 768-dim\n`}
        {`    value: text,\n`}
        {`  });\n`}
        {`  return embedding;\n`}
        {`}\n\n`}
        <span className="tok-com">{`// index time: embed(chunk)  ·  query time: embed(question)`}</span>
        {"\n"}
        <span className="tok-com">{`// identical function → guaranteed-comparable vectors`}</span>
      </Terminal>

      <h2>When the trade-off flips</h2>
      <p>
        This is not dogma. If your corpus is enormous and retrieval recall is the
        whole product, a dedicated embedding model tuned for that may earn its
        keep. If your generation needs frontier reasoning that a flash-tier model
        cannot provide, split it. The point is to make the choice deliberately:
        the dual-model setup is the default people reach for without pricing the
        complexity, and for a bounded, documentation-grounded support agent that
        complexity buys almost nothing.
      </p>

      <blockquote>
        Best-of-breed is a real strategy, but so is fewest-moving-parts. For a
        bounded RAG agent, one model that is good at both beats two models you have
        to keep in sync.
      </blockquote>

      <p>
        This unification is one of the load-bearing decisions behind the agent —
        see the{" "}
        <a href="/#projects">project teardown</a> — and it pairs naturally with{" "}
        <a href="/blog/edge-native-rag-cloudflare-workers-hono">
          an edge-native runtime
        </a>{" "}
        where every extra dependency has a real cost.
      </p>
    </>
  );
}

export const singleModelRag: BlogPost = {
  slug: "single-model-rag-embeddings-generation",
  title: "One Model, Two Jobs: Single-Model RAG for Embeddings and Generation",
  description:
    "The default RAG stack uses a separate embedding model and generation model. Here is the case for using one model for both — fewer moving parts, one set of credentials, and query/corpus vectors that share a latent space by construction.",
  keywords: [
    "embedding model vs generation model",
    "RAG architecture decisions",
    "gemini flash embeddings",
    "simplify RAG stack",
    "single model RAG",
    "vector embeddings",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["RAG", "AI Architecture", "Embeddings"],
  takeaways: [
    "The dual-model RAG default (embed model + generation model) adds a provider, SDK, credential, and failure surface most apps do not need.",
    "Using one model for both deletes an entire axis of operational complexity.",
    "Embedding query and corpus with the same function guarantees they share a latent space — no silent geometry drift.",
    "Split the models deliberately only when recall or frontier reasoning genuinely demands it.",
  ],
  Body,
};
