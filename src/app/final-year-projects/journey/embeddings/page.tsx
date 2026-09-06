import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import MeaningMap from "./MeaningMap";
import { EmbeddingDiagram } from "./Diagrams";

const DESCRIPTION =
  "Embeddings in plain words: how meaning becomes a list of numbers, what a vector space is without heavy maths, and how cosine similarity lets a computer measure that two different sentences mean the same thing.";

export const metadata: Metadata = {
  title: "Chapter 8 — Embeddings: Turning Meaning Into Numbers",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/embeddings/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 8 — Embeddings: Turning Meaning Into Numbers",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/embeddings/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-embeddings.jpg`],
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

export default function EmbeddingsChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 8 — Embeddings", path: "/final-year-projects/journey/embeddings" },
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
          Chapter 08 · Meaning as numbers
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Turning meaning into numbers
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Chapter 7 kept hitting one wall: the model does not know your
          information. To fix that we need computers to <em>find</em> the
          right piece of your text for a given question — which means teaching
          a computer to understand that two sentences with no words in common
          can mean the same thing. This chapter is the beautiful idea that
          makes that possible, and it is the foundation of everything left in
          the journey.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-embeddings.jpg"
          alt="Scattered shapes drifting into tight clusters where similar shapes sit close together."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          Give every piece of text a position. Similar meanings land in the same neighbourhood.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">The problem keyword search can&rsquo;t solve</H2>
        <P>
          A student searches your notice board for &ldquo;fee deadline&rdquo;.
          There is a perfect notice — but it says &ldquo;last date for tuition
          payment&rdquo;. Not one word matches. Old-style search, which looks
          for the <em>letters</em> you typed, finds nothing, and the student
          leaves thinking the notice does not exist.
        </P>
        <P>
          That is the wall. Computers are brilliant at matching exact
          characters and hopeless at matching <em>meaning</em> — and humans
          almost never use the exact words the document used. We need a way
          for a computer to know that &ldquo;fee deadline&rdquo; and &ldquo;last
          date for tuition payment&rdquo; are close in meaning, even with zero
          shared words. Embeddings are that way.
        </P>

        {/* 02 */}
        <H2 n="02">The one idea: give meaning a location</H2>
        <P>
          Here is the whole concept in a picture you already own. Imagine a
          giant map. On it, we place every word and sentence as a dot — and we
          arrange them so that <Term>things with similar meaning sit close
          together</Term>. &ldquo;King&rdquo; and &ldquo;queen&rdquo; are
          neighbours. &ldquo;Dog&rdquo; and &ldquo;puppy&rdquo; are neighbours.
          &ldquo;Pizza&rdquo; is far away in a different part of town with
          &ldquo;pasta&rdquo;. Meaning has become <em>position</em>. Drag the
          words around and watch it:
        </P>
        <MeaningMap />
        <P>
          Once meaning is a location, &ldquo;find text that means the same
          thing&rdquo; becomes &ldquo;find dots that are near this dot&rdquo; —
          and measuring nearness is something computers do instantly. That
          single translation, from meaning to distance, is the key that
          unlocks the rest of the journey.
        </P>

        {/* 03 */}
        <H2 n="03">An embedding is a list of numbers</H2>
        <P>
          Now the real version. A location on a flat map needs two numbers —
          across and up. To capture something as rich as <em>meaning</em>, two
          numbers are nowhere near enough, so an <Term>embedding</Term> uses
          hundreds or thousands of them. A typical embedding is a list of,
          say, 1,536 numbers. That list is a position — not on a 2D map, but
          in a space with 1,536 directions.
        </P>
        <P>
          Do not let that sentence scare you, and do not try to picture it —
          nobody can picture 1,536 dimensions, including the people who build
          these systems. You do not need to. The <em>idea</em> is identical to
          the map: it is just a position, and positions can be near or far.
          Each of those hundreds of numbers quietly captures some shade of
          meaning — how animal-like, how formal, how much about money — learned
          automatically. You will never read them by hand. You only ever ask
          one question of them: how close are these two positions?
        </P>

        {/* 04 */}
        <H2 n="04">Where the numbers come from</H2>
        <P>
          Who decides that &ldquo;fee&rdquo; and &ldquo;tuition payment&rdquo;
          belong close together? A model does — an <Term>embedding model</Term>,
          a cousin of the LLM from Chapter 5, trained on enormous amounts of
          text. It learned, from seeing how words are actually used across the
          internet, that some words appear in similar company, and it places
          those near each other. You do not train it; you use it exactly like
          the models in Chapter 6 — send text to an API, get back the list of
          numbers.
        </P>
        <P>
          Two facts that matter in practice. It is <Term>cheap and fast</Term>
          — embedding is far lighter than generating text, so turning a
          thousand notices into a thousand embeddings costs very little. And
          you must <Term>use the same model for everything</Term> you intend
          to compare: two embeddings are only comparable if they were made by
          the same model, because each model builds its own private map. Mix
          two maps and the distances mean nothing.
        </P>

        {/* 05 */}
        <H2 n="05">Measuring nearness — cosine similarity</H2>
        <P>
          One honest piece of maths, and it stays gentle. To find the notice
          closest in meaning to a query, the computer measures the distance
          between their two embeddings. The usual measuring stick has a name
          you will hear constantly — <Term>cosine similarity</Term> — and all
          it really asks is: <em>are these two positions pointing in the same
          direction?</em>
        </P>
        <P>
          You do not compute it by hand; a library does, in microseconds. But
          know how to read its answer, because it is a simple score: around{" "}
          <Term>1.0</Term> means &ldquo;these mean almost the same thing&rdquo;,
          around <Term>0</Term> means &ldquo;unrelated&rdquo;, and negative
          means &ldquo;opposite-ish&rdquo;. So &ldquo;fee deadline&rdquo; vs
          &ldquo;last date for tuition payment&rdquo; might score 0.9 —
          different words, nearly identical meaning — while &ldquo;fee
          deadline&rdquo; vs &ldquo;cricket match&rdquo; scores near 0. You
          have just turned &ldquo;do these mean the same?&rdquo; into a number
          you can sort by. (There is a cousin called dot product that hosted
          APIs often use for speed; same idea — higher means closer.)
        </P>

        {/* 06 */}
        <H2 n="06">Text in, meaning out — the whole shape</H2>
        <EmbeddingDiagram />
        <P>
          That is the complete mechanic, and it is worth saying as one
          sentence you can keep: <Term>an embedding model turns any piece of
          text into a position, and cosine similarity measures how close two
          positions are.</Term> Everything semantic — smart search,
          recommendations, grouping similar things, and the retrieval at the
          heart of RAG — is built on exactly this and nothing more exotic.
        </P>

        {/* 07 */}
        <H2 n="07">What this unlocks</H2>
        <P>
          Suddenly a whole class of features becomes possible, and you can now
          see how each one works underneath. <Term>Semantic search</Term>:
          embed the query, find the nearest document embeddings — the next
          chapter. <Term>Recommendations</Term>: &ldquo;more like this&rdquo;
          is just &ldquo;nearest neighbours to this&rdquo;. <Term>Grouping</Term>:
          notices that cluster together in the space are about the same topic,
          with nobody labelling them. <Term>Deduplication</Term>: two near-
          identical positions are two ways of saying the same thing. One idea,
          many products — which is why &ldquo;embeddings&rdquo; is on every AI
          job description, and why you now understand the thing behind the
          word.
        </P>

        {/* 08 */}
        <H2 n="08">The honest limits</H2>
        <P>
          Two things to keep you clear-eyed. An embedding captures{" "}
          <em>overall</em> meaning, not exact facts — it is great at &ldquo;these
          are about the same topic&rdquo; and blunt about &ldquo;which of these
          two dates is later&rdquo;. And it inherits its model&rsquo;s blind
          spots and biases from Chapter 5 — a model trained mostly on English
          maps other languages more coarsely, and prejudices in the training
          text can show up as positions. Embeddings are a powerful tool, not a
          truth machine, and knowing where the tool is blunt is what separates
          someone who uses it well from someone who trusts it too much.
        </P>

        {/* 09 */}
        <H2 n="09">Do this today</H2>
        <P>
          Make it concrete. Ask your embedding API (or have Claude wire a
          tiny script) to embed three sentences: &ldquo;the fee deadline is
          Friday&rdquo;, &ldquo;last date to pay tuition is Friday&rdquo;, and
          &ldquo;the cricket final is on Sunday&rdquo;. Print the cosine
          similarity between each pair. Watch the first two score high despite
          sharing almost no words, and both score low against the third. When
          you see a computer measure that two different sentences mean the
          same thing, the magic of the next three chapters stops being magic
          and becomes something you understand.
        </P>
        <P>
          You can now turn meaning into numbers. Next: store millions of these
          positions and find the nearest ones in milliseconds — the vector
          database, and real semantic search.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/prompting/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 07 · Prompting
          </Link>
          <Link
            href="/final-year-projects/journey/vector-search/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 09 · Vector search
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
