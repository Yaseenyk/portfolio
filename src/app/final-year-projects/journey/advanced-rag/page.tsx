import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import RetrievalCompare from "./RetrievalCompare";
import { AdvancedRagDiagram } from "./Diagrams";

const DESCRIPTION =
  "Advanced RAG in plain words: why basic RAG disappoints, and the techniques that fix it — query expansion, hybrid search, re-ranking, better chunking and metadata filtering — each a targeted fix for a specific failure.";

export const metadata: Metadata = {
  title: "Chapter 13 — Advanced RAG: Making Retrieval Actually Reliable",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/journey/advanced-rag/` },
  openGraph: {
    type: "article",
    title: "Chapter 13 — Advanced RAG",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/advanced-rag/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-advanced-rag.jpg`],
  },
};

function H2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-14 flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-zinc-50">
      <span className="font-mono text-sm text-purple">{n}</span>
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-zinc-300">{children}</p>;
}
function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-zinc-50">{children}</strong>;
}

export default function AdvancedRagChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 13 — Advanced RAG", path: "/final-year-projects/journey/advanced-rag" },
        ])}
      />

      <Link
        href="/final-year-projects/journey/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← The 16-day journey
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          Chapter 13 · Going deeper · Advanced RAG
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          When basic RAG isn&rsquo;t good enough
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          You built RAG in Chapter 10 and it worked — until it didn&rsquo;t. A
          question phrased slightly oddly returns nothing useful; the right
          answer comes back ranked fifth; a search for an exact code misses.
          This chapter is the toolbox professionals reach for when the simple
          version disappoints — and every tool here fixes one <em>specific</em>{" "}
          failure, not vague &ldquo;make it better&rdquo;.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-advanced-rag.jpg"
          alt="A wide fan of document cards narrowing through two filter frames down to three bright cards."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          Retrieve wide, then sharpen. Advanced RAG is mostly about getting the right three chunks to the top.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">Everything depends on retrieval</H2>
        <P>
          Here is the single most important truth about RAG, and it decides
          whether your system is good or useless: <Term>the model can only be
          as right as the text you retrieved.</Term> If step one fetches the
          wrong chunks, no prompt, no model, no cleverness downstream can save
          the answer — the model literally does not have the information in
          front of it. So almost all of &ldquo;advanced RAG&rdquo; is really{" "}
          <em>advanced retrieval</em>: making sure the genuinely relevant text
          reaches the top of the pile.
        </P>
        <RetrievalCompare />

        {/* 02 */}
        <H2 n="02">Fix one: better chunking and metadata</H2>
        <P>
          The cheapest wins are before you retrieve at all. Revisit chunking
          from Chapter 9: chunks split mid-idea retrieve badly, so split at
          natural boundaries and overlap them. And attach <Term>metadata</Term>{" "}
          to every chunk — which document, what date, which category — because
          then you can <Term>filter before you search</Term>: &ldquo;only
          search notices from this semester&rdquo; or &ldquo;only the fees
          category&rdquo;. Narrowing the haystack before looking for the needle
          is often the biggest single improvement, and it is pure Chapter 4
          thinking applied to vectors.
        </P>

        {/* 03 */}
        <H2 n="03">Fix two: query expansion</H2>
        <P>
          Users type terrible queries — &ldquo;fees?&rdquo;, three words, no
          context. A tiny embedding of &ldquo;fees?&rdquo; is a weak, vague
          position (Chapter 8) that matches poorly. <Term>Query expansion</Term>{" "}
          fixes this by improving the query <em>before</em> searching: use a
          cheap, fast LLM call (Chapter 6) to rewrite &ldquo;fees?&rdquo; into
          &ldquo;When is the tuition fee payment deadline and how much is
          it?&rdquo; — a richer query whose embedding lands much closer to the
          right chunks. A variant generates <em>several</em> rewordings and
          searches with all of them, catching more of the relevant text. You
          are spending one small model call to make retrieval far sharper — a
          trade that almost always pays.
        </P>

        {/* 04 */}
        <H2 n="04">Fix three: hybrid search</H2>
        <P>
          Chapter 9 gave you two kinds of search and made you pick semantic.
          The truth is you often want <em>both</em>. Semantic search nails
          meaning but can miss an <em>exact</em> token — a product code
          &ldquo;CS-402&rdquo;, a specific name, an error number — because to
          an embedding those are just odd strings. Keyword search nails the
          exact token but misses meaning. <Term>Hybrid search</Term> runs both
          and merges the results, so &ldquo;the CS-402 lab timing&rdquo; finds
          the chunk that contains the exact code <em>and</em> is about lab
          timings. Most serious RAG systems are hybrid; pure semantic is the
          teaching version.
        </P>

        {/* 05 */}
        <H2 n="05">Fix four: re-ranking</H2>
        <P>
          The most powerful upgrade, and worth understanding well. Vector
          search is fast but <em>approximate</em> (Chapter 9) — it is good at
          getting the relevant chunks into the top twenty, but not perfect at
          ordering them, so the best chunk might come back fourth. Feeding the
          model twenty chunks is wasteful (Chapter 6 — tokens cost) and can
          bury the answer.
        </P>
        <P>
          <Term>Re-ranking</Term> adds a second, more careful pass:{" "}
          <em>retrieve wide, then sharpen</em>. Fetch the top 20 candidates
          cheaply with vector search, then run them through a stronger,
          slower model — a re-ranker — whose only job is to score how well
          each chunk actually answers this specific query, and keep the best 3
          or 4. Those go to the LLM. It is the same &ldquo;cast a wide net,
          then inspect carefully&rdquo; instinct a good researcher uses, and
          it is often the difference between a RAG demo and a RAG product.
        </P>
        <AdvancedRagDiagram />

        {/* 06 */}
        <H2 n="06">Diagnose before you fix</H2>
        <P>
          The senior skill here is not knowing the four fixes — it is knowing{" "}
          <em>which one</em> a given failure needs, and that comes from
          looking. When an answer is wrong, do not guess: <Term>print what was
          retrieved.</Term> If the right chunk is not in the retrieved set at
          all, your problem is retrieval — reach for query expansion, hybrid,
          or better chunking. If the right chunk <em>was</em> retrieved but
          ranked low and got crowded out, that is a re-ranking problem. If the
          right chunk was there, ranked first, and the model still answered
          wrong, now it is a prompt problem (Chapter 7). A professional reads
          the pipeline&rsquo;s middle before changing its ends. Amateurs
          randomly swap models and hope.
        </P>

        {/* 07 */}
        <H2 n="07">Do this today</H2>
        <P>
          Take your Chapter 10 RAG and add exactly one upgrade — query
          expansion is the easiest big win. Before searching, make a cheap LLM
          call that rewrites the user&rsquo;s short question into a fuller one,
          then search with that. Ask a deliberately lazy question
          (&ldquo;fees?&rdquo;) before and after, and print the retrieved
          chunks each time. Watching the right notice climb into the results
          because you improved the <em>query</em>, not the model, is the whole
          lesson of this chapter in one experiment.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/production/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 12 · Production
          </Link>
          <Link
            href="/final-year-projects/journey/evaluation/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 14 · Evaluation
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
