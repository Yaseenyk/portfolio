import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import SearchCompare from "./SearchCompare";
import { VectorSearchDiagram } from "./Diagrams";

const DESCRIPTION =
  "Vector databases and semantic search, in plain words: chunking documents, why normal databases can't search by meaning, how vector databases find nearest neighbours fast, and building real meaning-based search.";

export const metadata: Metadata = {
  title: "Chapter 9 — Vector Search: Finding by Meaning at Scale",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/vector-search/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 9 — Vector Search: Finding by Meaning at Scale",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/vector-search/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-vector-search.jpg`],
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

export default function VectorSearchChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 9 — Vector Search", path: "/final-year-projects/journey/vector-search" },
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
          Chapter 09 · Finding by meaning
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Vector search — meaning-based, at scale
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Chapter 8 gave every piece of text a position. Now we do something
          useful with a million of them: store them, and — the instant a
          question arrives — find the nearest few in milliseconds. This is the
          engine that powers smart search and, in the next chapter, RAG.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-vector-search.jpg"
          alt="One bright query point reaching out to its three nearest points in a field of stored points."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          Turn the question into a point. Return the stored points nearest to it. That is vector search.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">Keyword search vs semantic search — feel it</H2>
        <P>
          Chapter 8 named the problem; here you watch it. The same query,
          searched two ways over the same notices — one matching letters, one
          matching meaning:
        </P>
        <SearchCompare />
        <P>
          Keyword search is not useless — it is exact, fast, and unbeatable
          when you know the precise word (a product code, a name).{" "}
          <Term>Semantic search</Term> wins when the user&rsquo;s words and
          the document&rsquo;s words differ but the meaning matches — which,
          for questions asked in human language, is most of the time. Real
          systems often use both together (called hybrid search), but the new
          and powerful half is the semantic one, so that is what we build.
        </P>

        {/* 02 */}
        <H2 n="02">First, chunking — cut documents into bites</H2>
        <P>
          Before you can search by meaning, one preparation step almost every
          tutorial fumbles. You do not embed a whole 40-page document as one
          position — that would blur every topic in it into a single muddy
          average, useless for finding a specific answer. Instead you cut the
          document into smaller pieces first. That cutting is called{" "}
          <Term>chunking</Term>, and each piece gets its own embedding and its
          own dot on the map.
        </P>
        <P>
          The judgment is in the size. Chunks <em>too big</em> mix several
          ideas and retrieve fuzzily. Chunks <em>too small</em> lose the
          context that made them meaningful — a sentence ripped from its
          paragraph. The honest sweet spot is a paragraph-ish size, split at
          natural boundaries (paragraphs, sections) rather than blindly every
          N characters. And a professional trick: <Term>overlap</Term> the
          chunks slightly — let each one repeat the last sentence or two of
          the previous — so an idea that straddles a boundary is not sliced in
          half and lost. Getting chunking right quietly decides whether your
          whole search feels smart or dumb; it is the unglamorous step that
          matters most.
        </P>

        {/* 03 */}
        <H2 n="03">Why your Chapter 4 database can&rsquo;t do this</H2>
        <P>
          You already know a database (Chapter 4) that stores rows and finds
          them fast. Why not use it? Because it finds things by{" "}
          <em>exact match and sorting</em> — where <span className="font-mono text-sm text-ice">email = &lsquo;x&rsquo;</span>,
          or all rows ordered by date. It has no notion of &ldquo;find the
          rows whose <em>meaning</em> is nearest to this position in a
          1,500-dimensional space&rdquo;. Ask a normal database that and it
          would have to compare your query against <em>every single row</em>,
          one by one — fine for a hundred, hopeless for ten million.
        </P>

        {/* 04 */}
        <H2 n="04">The vector database</H2>
        <P>
          So a specialised kind of database exists for exactly this job: the{" "}
          <Term>vector database</Term>. Its one talent is storing millions of
          embeddings and answering, near-instantly, &ldquo;here are the k
          positions closest to this one&rdquo; — a <Term>nearest-neighbour
          search</Term>. Names you will meet: <Term>Pinecone</Term> (hosted,
          easy to start), <Term>Qdrant</Term> and <Term>Chroma</Term>
          (open-source, run them yourself), and <Term>pgvector</Term> — an
          add-on that gives the Postgres you already know from Chapter 4 this
          exact superpower, so you often do not even need a separate database.
        </P>
        <VectorSearchDiagram />
        <P>
          The trick that makes it fast is worth one honest sentence: a vector
          database does not truly check every point either. It builds a smart{" "}
          <Term>index</Term> ahead of time (the Chapter 4 idea, evolved) that
          lets it leap to the right neighbourhood and check only the points
          nearby. To get that speed it accepts being <em>approximately</em>
          right — occasionally missing the very closest point for one just
          slightly further. For search, a near-perfect answer in one
          millisecond beats a perfect answer in ten seconds every time.
        </P>

        {/* 05 */}
        <H2 n="05">The two phases — indexing and querying</H2>
        <P>
          Every semantic-search system, including the ones you will build,
          has two clearly separate phases. Keep them apart in your head and
          the whole thing stays simple.
        </P>
        <P>
          <Term>Indexing (done ahead of time, once):</Term> take your
          documents, chunk them, embed every chunk with your chosen model
          (Chapter 8), and store each embedding — plus the original text it
          came from — in the vector database. This is a batch job you run when
          documents are added or change, not while a user waits.
        </P>
        <P>
          <Term>Querying (done live, per search):</Term> take the
          user&rsquo;s query, embed it with the <em>same</em> model, ask the
          vector database for the nearest chunks, and return them. Embed one
          query, one fast nearest-neighbour lookup, done — the reason search
          feels instant is that all the heavy work already happened during
          indexing.
        </P>

        {/* 06 */}
        <H2 n="06">Store the text with the vector</H2>
        <P>
          A beginner mistake worth stopping on: people store the embedding and
          forget to store the <em>original text</em> beside it. But an
          embedding is a position — a list of numbers — and you cannot show a
          user a list of numbers. So each entry in the vector database keeps
          the vector (for finding) <em>and</em> the source text and a little
          metadata like which document and page it came from (for showing and
          citing). That stored text is what the next chapter feeds to an LLM,
          and that stored source is how a RAG answer can point at where it came
          from. Design for it now.
        </P>

        {/* 07 */}
        <H2 n="07">How this fits the workflow</H2>
        <P>
          Nothing here breaks the system you built in Chapters 2–4; it adds
          one box to the drawing, exactly as Chapter 1 promised growth would.
          Your backend gains an indexing job and a search endpoint; the vector
          database sits alongside your normal one. With Claude Code, wiring a
          hosted vector database or pgvector is a well-trodden path — the
          judgment you bring is the design: how you chunk, which embedding
          model, how many neighbours to fetch, and what metadata to keep. Put
          those decisions in your <span className="font-mono text-sm text-ice">docs/</span>{" "}
          before building, the same discipline as every chapter.
        </P>

        {/* 08 */}
        <H2 n="08">Do this today</H2>
        <P>
          Build real semantic search over your notice board. Chunk each notice
          (they are short — one chunk each is fine to start), embed them, and
          store the embeddings with their text in pgvector or a free hosted
          vector database. Then a search box: embed the query, fetch the three
          nearest notices, show them. Now search &ldquo;when do I pay&rdquo;
          and watch it surface the notice about tuition dates that shares not
          one word with your query. That moment — a search that understands
          instead of matches — is the payoff of two chapters, and the exact
          machine the next chapter turns into a system that <em>answers</em>.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/embeddings/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 08 · Embeddings
          </Link>
          <Link
            href="/final-year-projects/journey/rag/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 10 · RAG
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
