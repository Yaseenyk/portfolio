import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import RagPipeline from "./RagPipeline";
import { RagArchitectureDiagram } from "./Diagrams";

const DESCRIPTION =
  "RAG explained end to end, in plain words: combining vector search with an LLM so it answers only from your real documents, the grounding contract, citations, refusal, and the advanced techniques that make it reliable.";

export const metadata: Metadata = {
  title: "Chapter 10 — RAG: Answers Grounded in Your Own Documents",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/rag/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 10 — RAG: Answers Grounded in Your Own Documents",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/rag/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-rag.jpg`],
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
function Code({ title, children }: { title: string; children: string }) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300">{children}</pre>
    </figure>
  );
}

export default function RagChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 10 — RAG", path: "/final-year-projects/journey/rag" },
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
          Chapter 10 · Retrieval-Augmented Generation
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          RAG — making the model answer from your documents
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          This is the one. Every chapter so far has been building toward it.
          RAG is how you take a model that knows nothing about your college,
          your company, or your data — and make it answer questions about
          exactly that, accurately, with sources. It is the most in-demand AI
          skill there is right now, and by the end of this chapter you will
          understand it completely.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-rag.jpg"
          alt="A question pulling relevant document cards from a stack, both feeding a core that emits one grounded answer."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          Fetch the real pages first. Then let the model answer using only those. Retrieve, then generate.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">The problem, stated one last time</H2>
        <P>
          Chapter 5: the model is frozen and knows nothing after its training
          cutoff, and nothing about your private data. Chapter 7: prompting
          can reduce hallucination but cannot give the model knowledge it
          never had. So how does a support bot answer questions about a
          product released last month, or a college assistant answer from
          <em> this</em> year&rsquo;s notices? Not by retraining the model —
          that costs a fortune and you would do it every time a notice
          changed. There is a far cleverer way.
        </P>
        <P>
          The insight is almost embarrassingly simple. The model is a
          brilliant reader and writer; it just lacks <em>your</em> facts. So
          do not try to put your facts <em>inside</em> the model. Instead, at
          the moment of the question, <Term>hand the model the relevant text
          and ask it to answer using only that</Term> — the way you would give
          a sharp intern the right file and say &ldquo;answer from this&rdquo;.
          That is RAG: <Term>R</Term>etrieval-<Term>A</Term>ugmented{" "}
          <Term>G</Term>eneration. Retrieve the right text, augment the prompt
          with it, generate the answer.
        </P>

        {/* 02 */}
        <H2 n="02">Walk the pipeline</H2>
        <P>
          And you already built every piece. RAG is not a new technology — it
          is Chapters 8 and 9 wired into Chapter 6. Step through it:
        </P>
        <RagPipeline />
        <P>
          Read that again and notice something wonderful: there is no magic
          box. Vector search (Chapter 9) finds the relevant chunks; the prompt
          (Chapter 7) stuffs them in with an instruction; the LLM (Chapter 6)
          writes the answer. RAG is a <em>pattern</em>, not a product — an
          architecture (Chapter 1!) that connects tools you already
          understand. That is exactly why understanding the foundations
          mattered so much.
        </P>

        {/* 03 */}
        <H2 n="03">The whole system on one page</H2>
        <RagArchitectureDiagram />
        <P>
          The left half is the indexing from Chapter 9, done ahead of time.
          The right half is the live path: question in, retrieve, augment,
          generate, answer out. The same vector database sits in the middle,
          filled once and queried forever. If you can draw this diagram from
          memory and explain each arrow, you can pass most &ldquo;explain
          RAG&rdquo; interviews on the spot.
        </P>

        {/* 04 */}
        <H2 n="04">The augmented prompt — where grounding happens</H2>
        <P>
          The heart of RAG is one carefully built prompt. After retrieval, you
          assemble a message that puts the fetched text in front of the
          question, with a strict instruction — this is Chapter 7 doing the
          most important work of its life:
        </P>
        <Code title="the RAG prompt — retrieved context + a grounding rule">{`SYSTEM:
Answer the student's question using ONLY the notices below.
If the answer is not in them, say exactly: "I don't have that information."
Never use outside knowledge. Cite the notice you used.

CONTEXT (retrieved by vector search):
[1] "Last date for tuition payment is Friday 14th."
[2] "Scholarship application window closes on the 30th."

QUESTION:
When is the fee due?`}</Code>
        <P>
          That instruction — <Term>&ldquo;using ONLY the notices below&rdquo;</Term>{" "}
          — is called the <Term>grounding contract</Term>, and it is the line
          that turns a confident liar into a trustworthy assistant. It aims
          the model at real, retrieved words instead of its foggy memory, so
          its answer is anchored to your actual documents. Everything good
          about RAG lives in that one instruction being present and obeyed.
        </P>

        {/* 05 */}
        <H2 n="05">Citations and refusal — the trust features</H2>
        <P>
          Two behaviours separate a toy RAG from one people trust with real
          decisions, and you can now see why each works.{" "}
          <Term>Citations</Term>: because you stored the source text with every
          vector (Chapter 9, the habit I made you build), you know exactly
          which chunk fed the answer — so you can show &ldquo;from Notice
          dated 3rd&rdquo; beside it. A cited answer is one a human can{" "}
          verify, and that changes everything about whether they trust it.
        </P>
        <P>
          <Term>Refusal</Term>: the &ldquo;if it is not in the notices, say I
          don&rsquo;t have that&rdquo; clause. It sounds like a weakness; it is
          the opposite. A system that honestly says &ldquo;I don&rsquo;t
          know&rdquo; for the 5% it cannot answer is infinitely more
          deployable than one that invents fluent nonsense for all 100%.
          Refusal is what makes RAG safe to put in front of real users — and
          it is only possible because retrieval gives the model a defined set
          of text to be &ldquo;in&rdquo; or &ldquo;not in&rdquo;.
        </P>

        {/* 06 */}
        <H2 n="06">When basic RAG disappoints — and the fixes</H2>
        <P>
          Build the simple version and you will hit its limits, so here are
          the real-world upgrades (Day 10 of the live sessions) — each a
          targeted fix for a specific failure, not random cleverness.
        </P>
        <P>
          <Term>The retrieval missed the right chunk.</Term> Everything
          depends on step one fetching the relevant text; if it does not, the
          model cannot answer no matter how good it is. Fix the retrieval:
          better chunking (Chapter 9), or <Term>query expansion</Term> —
          quietly rewrite or enrich the user&rsquo;s short query before
          searching, so &ldquo;fees?&rdquo; becomes something a search can
          actually match.
        </P>
        <P>
          <Term>Keywords and meaning both matter.</Term> Pure semantic search
          can miss an exact code or name; pure keyword search misses meaning.{" "}
          <Term>Hybrid search</Term> runs both and merges the results —
          Chapter 9&rsquo;s two halves, working together.
        </P>
        <P>
          <Term>The right chunk came back ranked fourth.</Term> Vector search
          is fast but approximate. <Term>Re-ranking</Term> adds a second, more
          careful pass: fetch the top 20 candidates cheaply, then use a
          stronger model to re-order them and keep the best 3 to send to the
          LLM. Retrieve wide, then sharpen. Together these turn a demo that
          works sometimes into a system that works reliably — and being able
          to name which fix solves which failure is exactly the senior skill.
        </P>

        {/* 07 */}
        <H2 n="07">Testing the untestable</H2>
        <P>
          One hard truth from Day 12: how do you test a system whose answers
          are written fresh each time and can be phrased a thousand ways? You
          cannot check for an exact string like a normal test (Chapter 3). So
          AI teams build an <Term>evaluation set</Term> — a collection of real
          questions with their known-correct answers and known sources — and
          measure the system against it: did retrieval fetch the right chunk?
          Did the answer match the truth? Did it correctly refuse when the
          answer was absent? You will not perfect this as a student, but
          knowing that <em>serious AI work is measured, not vibed</em> is what
          separates a professional from a demo-maker.
        </P>

        {/* 08 */}
        <H2 n="08">This is a real, shipped architecture</H2>
        <P>
          Everything in this chapter is exactly how production AI features are
          built today — a support bot over a company&rsquo;s help docs, a
          legal assistant over case files, a &ldquo;chat with your PDF&rdquo;
          tool. The concierge that answers questions on this very site is a
          RAG system: it retrieves from a fixed corpus and refuses politely
          when a question falls outside it. You are not learning a toy. You
          are learning the single most employable AI pattern of this era,
          from the same foundations the real ones are built on.
        </P>

        {/* 09 */}
        <H2 n="09">Do this today</H2>
        <P>
          Turn the semantic search you built in Chapter 9 into a system that
          answers. On a query: retrieve the top three notices (you already
          have this), drop them into the grounding prompt from section 04, and
          send it to your LLM. Now ask your notice board a real question in
          plain language and get back a sentence that answers it{" "}
          <em>from your actual notices</em>, with the source shown. Then test
          its honesty: ask something no notice covers, and watch it refuse
          instead of inventing. When it does — when your own system says
          &ldquo;I don&rsquo;t have that information&rdquo; instead of lying —
          you have built the thing companies are hiring people to build.
        </P>
        <P>
          You can now ground a model in real knowledge. The final step is to
          let it not just answer, but <em>act</em> — take steps, use tools, do
          things in the world. That is agents, and it is next.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/vector-search/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 09 · Vector search
          </Link>
          <Link
            href="/final-year-projects/journey/agents/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 11 · Agents
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
