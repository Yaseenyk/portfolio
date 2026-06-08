import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 320"
        className="h-auto w-full"
        role="img"
        aria-label="One document chunked three ways — fixed-size, recursive, and semantic — with a recall heatmap showing which strategy surfaces the correct passage."
      >
        {/* Fixed */}
        <text x="24" y="36" fill="#71717a" fontFamily="monospace" fontSize="11">FIXED-SIZE</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={`f${i}`} x={24 + i * 66} y="48" width="60" height="40" rx="4" fill="rgba(244,63,94,0.06)" stroke="#7f1d2e" />
        ))}
        <text x="300" y="73" fill="#71717a" fontFamily="monospace" fontSize="10">splits mid-thought</text>

        {/* Recursive */}
        <text x="24" y="132" fill="#71717a" fontFamily="monospace" fontSize="11">RECURSIVE</text>
        {[
          [24, 50], [78, 70], [152, 56], [212, 84],
        ].map(([x, w], i) => (
          <rect key={`r${i}`} x={x} y="144" width={w} height="40" rx="4" fill="rgba(168,85,247,0.06)" stroke="#A855F7" />
        ))}
        <text x="320" y="169" fill="#71717a" fontFamily="monospace" fontSize="10">respects structure</text>

        {/* Semantic */}
        <text x="24" y="228" fill="#71717a" fontFamily="monospace" fontSize="11">SEMANTIC</text>
        {[
          [24, 96], [124, 64], [192, 104],
        ].map(([x, w], i) => (
          <rect key={`s${i}`} x={x} y="240" width={w} height="40" rx="4" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        ))}
        <text x="320" y="265" fill="#71717a" fontFamily="monospace" fontSize="10">splits on meaning</text>

        {/* Recall heatmap */}
        <text x="470" y="36" fill="#67E8F9" fontFamily="monospace" fontSize="11">RECALL @ correct passage</text>
        {[
          ["fixed", 0.41, "#f43f5e", 56],
          ["recursive", 0.72, "#A855F7", 110],
          ["semantic", 0.89, "#22D3EE", 164],
        ].map(([label, val, color, y]) => (
          <g key={label as string}>
            <text x="470" y={(y as number) + 16} fill="#a1a1aa" fontFamily="monospace" fontSize="10">{label as string}</text>
            <rect x="560" y={y as number} width="170" height="20" rx="4" fill="#18181b" stroke="#27272a" />
            <rect x="560" y={y as number} width={(val as number) * 170} height="20" rx="4" fill={color as string} opacity="0.7" />
            <text x="736" y={(y as number) + 15} fill="#e4e4e7" fontFamily="monospace" fontSize="10" textAnchor="end">
              {`${Math.round((val as number) * 100)}%`}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        Same document, same model, same query — only the chunking changed. Retrieval quality is a chunking decision.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        When a RAG system gives a vague or wrong answer, the instinct is to blame
        the model or the prompt. Most of the time the real culprit is upstream and
        invisible: <strong>chunking</strong>. Retrieval can only return what your
        chunking carved out, and if the right answer was split across two chunks —
        or buried in a chunk full of unrelated text — no amount of prompt tuning
        will recover it. Chunking is not preprocessing. It is the retrieval
        architecture.
      </p>

      <h2>The chunk is the unit of truth</h2>
      <p>
        Your vector index does not store documents; it stores chunks. A chunk is
        the smallest thing retrieval can return and the largest thing it can
        return as a single unit. Get it wrong and you fail in one of two
        directions. Too small, and a self-contained answer gets sliced across
        chunk boundaries, so retrieval surfaces a fragment that is true but
        incomplete. Too large, and each chunk dilutes its own embedding with
        unrelated content, so the vector means everything and matches nothing
        sharply.
      </p>

      <Diagram />

      <h2>Three strategies, escalating in cost and quality</h2>
      <h3>Fixed-size</h3>
      <p>
        Split every N characters with some overlap. Trivial to implement and
        almost always wrong at the edges, because it cheerfully cuts through the
        middle of a sentence, a code block, or a numbered list. It is the
        baseline, and the source of most &quot;my RAG is bad&quot; complaints.
      </p>
      <h3>Recursive / structural</h3>
      <p>
        Split along the document&apos;s own structure first — headings,
        paragraphs, list items — and only fall back to size limits within those
        boundaries. For Markdown documentation this is the high-leverage default:
        a heading and its body stay together because the document already told you
        they belong together.
      </p>
      <h3>Semantic</h3>
      <p>
        Split where the <em>meaning</em> shifts. Embed sentences, measure the
        distance between neighbours, and cut where the topic changes. It produces
        the most coherent chunks and costs the most to build. For a stable
        knowledge base embedded once, that one-time cost is usually worth it.
      </p>

      <Terminal title="chunk.ts">
        <span className="tok-com">{`// structure first, size only as a fallback within a section`}</span>
        {"\n"}
        {`function chunkMarkdown(md: string, max = 1200) {\n`}
        {`  const sections = splitByHeadings(md);        // keep heading + body together\n`}
        {`  return sections.flatMap((s) =>\n`}
        {`    s.length <= max ? [s] : splitByParagraph(s, max)\n`}
        {`  );\n`}
        {`}\n\n`}
        <span className="tok-com">{`// every chunk carries its heading as metadata — for attribution AND recall`}</span>
      </Terminal>

      <h2>Carry the heading into the chunk</h2>
      <p>
        One technique pays for itself everywhere: prepend each chunk with the
        heading path it came from. &quot;Setup &gt; OBS &gt; Connecting&quot;
        prefixed onto the chunk text does two things at once — it sharpens the
        embedding with topical context, lifting recall, and it gives you a ready-
        made citation for the grounding contract. The same metadata serves
        retrieval quality and answer attribution.
      </p>

      <h2>Measure it, do not guess</h2>
      <p>
        Chunking strategy is the highest-leverage knob in a RAG system, so treat
        it like one: build a small evaluation set of real questions with their
        correct source passages, then measure recall — did the right chunk make
        the top-k? — for each strategy. The heatmap in the diagram is exactly that
        experiment. You will usually find that fixing chunking moves the quality
        needle further than any model upgrade.
      </p>

      <blockquote>
        &quot;My retrieval is bad&quot; is almost never a model problem. It is a
        chunking problem wearing a model costume.
      </blockquote>

      <p>
        Good chunks make{" "}
        <a href="/blog/zero-hallucination-rag-grounding-contract">
          the grounding contract
        </a>{" "}
        enforceable and{" "}
        <a href="/blog/single-model-rag-embeddings-generation">
          single-model embeddings
        </a>{" "}
        worth their precision. The chunk is where retrieval quality is won or lost.
      </p>
    </>
  );
}

export const ragChunkingArchitecture: BlogPost = {
  slug: "rag-chunking-strategy-architecture",
  title: "Chunking Is the Whole Game: A Retrieval-Quality Chunking Architecture",
  description:
    "Most RAG quality complaints are chunking complaints in disguise. Fixed-size, recursive, and semantic chunking compared — plus why carrying the heading into each chunk lifts both recall and attribution.",
  keywords: [
    "RAG chunking strategy",
    "text chunking",
    "semantic chunking",
    "improve RAG accuracy",
    "chunk size embeddings",
    "retrieval quality",
  ],
  publishedAt: "2026-05-30",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["RAG", "Embeddings", "AI Architecture"],
  takeaways: [
    "Retrieval can only return what chunking carved out — chunking is the retrieval architecture, not preprocessing.",
    "Fixed-size splitting cuts through meaning; recursive (structural) splitting is the high-leverage default for docs.",
    "Prepend each chunk with its heading path to sharpen the embedding and provide a ready-made citation.",
    "Measure recall against a labelled eval set — fixing chunking usually beats upgrading the model.",
  ],
  Body,
};
