import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import GradeDemo from "./GradeDemo";
import { EvalLoopDiagram } from "./Diagrams";

const DESCRIPTION =
  "Evaluating AI systems in plain words: how to test software whose answers change every time, golden datasets, judging retrieval vs answer quality, LLM-as-judge, and catching regressions before users do.";

export const metadata: Metadata = {
  title: "Chapter 14 — Evaluating AI: Testing the Non-Deterministic",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/journey/evaluation/` },
  openGraph: {
    type: "article",
    title: "Chapter 14 — Evaluating AI Systems",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/evaluation/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-evaluation.jpg`],
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

export default function EvaluationChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 14 — Evaluating AI", path: "/final-year-projects/journey/evaluation" },
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
          Chapter 14 · Going deeper · Evaluation
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Testing a thing that never answers the same way twice
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          In Chapter 3 you tested a backend by checking &ldquo;does this
          endpoint return exactly this?&rdquo; But an AI answers in fresh words
          every time (Chapter 5) — there is no exact string to check. So how do
          you know a change made your system better and not worse? This is the
          question that separates people who <em>ship</em> AI from people who
          demo it, and almost nobody teaches it.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-evaluation.jpg"
          alt="A column of answer cards each checked by a gate marker, some passing and some failing."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          You can&rsquo;t check an AI answer letter-for-letter. You check whether it&rsquo;s right — at scale.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">Why &ldquo;it looks good&rdquo; is a trap</H2>
        <P>
          The natural way to check an AI feature is to try it a few times, nod,
          and ship. That instinct will burn you. You test the three questions
          you happen to think of, they work, you feel confident — and then a
          real user asks the fourth kind of question and it falls apart, and
          you never knew because you never asked it. Worse: you tweak a prompt
          to fix one case and silently break five others you are not looking
          at. <Term>Vibes do not scale, and they do not catch regressions.</Term>{" "}
          Real AI work replaces the nod with a number.
        </P>

        {/* 02 */}
        <H2 n="02">The golden dataset — your answer key</H2>
        <P>
          The foundation of all AI evaluation is a <Term>golden dataset</Term>:
          a collection of real questions paired with their known-correct
          answers, and — for RAG — the source that should be used. Think of it
          as the answer key to an exam you write once and grade against
          forever. Twenty or fifty carefully chosen questions is plenty to
          start: the common ones, the tricky ones, and crucially the ones that
          <em> should be refused</em> (Chapter 10) because no document covers
          them.
        </P>
        <P>
          Building it is real, human work — you write the questions and the
          right answers yourself, because you are defining what &ldquo;good&rdquo;
          means for your system. That effort is not overhead; it is you turning
          a vague hope (&ldquo;the bot should be helpful&rdquo;) into something
          you can actually measure. The moment you have a golden dataset, every
          future change gets a verdict instead of a shrug.
        </P>
        <P>
          You have seen exactly this system from the student&rsquo;s side. A
          board exam is not graded on whether the answer &ldquo;looks
          good&rdquo; — there is a model answer sheet, written before any
          paper was marked, and every script is compared against it by people
          who never meet you. That is why two examiners give roughly the same
          marks. Your golden dataset is that answer sheet, written for your
          own project, and running it is the moment you stop marking your own
          homework.
        </P>

        {/* 03 */}
        <H2 n="03">Grade the two halves separately</H2>
        <P>
          A RAG answer can be wrong for two very different reasons, and mixing
          them up wastes days. So grade them apart — this is Chapter 13&rsquo;s
          diagnosis instinct, made systematic.
        </P>
        <P>
          <Term>Retrieval quality:</Term> did the system fetch the right chunk
          at all? This one is almost like a normal test — you know which source
          should have come back, so you can check whether it did, across your
          whole golden set. Low retrieval score? The answer never had a chance;
          fix retrieval (Chapter 13). <Term>Answer quality:</Term> given the
          right context, was the final answer correct, grounded, and free of
          invention? Only worth looking at once retrieval is healthy. Two
          numbers, two different fixes — and knowing which is failing is most
          of the battle.
        </P>
        <GradeDemo />

        {/* 04 */}
        <H2 n="04">How do you grade the words? Three ways</H2>
        <P>
          The hard part: for answer quality, how does a program decide if a
          freely-worded answer is &ldquo;correct&rdquo;? Three approaches, from
          crude to clever. <Term>Exact facts:</Term> when the answer contains a
          checkable fact — a date, a number, a name — just check it is present.
          Cheap and reliable for factual questions.
        </P>
        <P>
          <Term>LLM-as-judge:</Term> the clever, now-standard trick. You use a
          second LLM call (Chapter 6) as the grader — you give it the question,
          the correct answer from your golden set, and the system&rsquo;s
          answer, and ask &ldquo;does the answer match the correct one? Reply
          yes or no with a reason.&rdquo; A model is genuinely good at judging
          whether two differently-worded answers mean the same thing (that is
          just Chapter 8&rsquo;s meaning-matching). It is not perfect, but it
          scales to hundreds of questions in minutes. And <Term>humans:</Term>{" "}
          the gold standard for the final check — you, reading a sample of
          answers with judgment no metric captures. Real teams use all three:
          automated checks for speed, human review for truth.
        </P>

        {/* 05 */}
        <H2 n="05">Run it on every change — catch regressions</H2>
        <EvalLoopDiagram />
        <P>
          Here is where evaluation earns its keep and connects to Chapter
          2&rsquo;s whole workflow. Once you have a golden dataset and a way to
          grade, you run the <em>entire</em> set every time you change a
          prompt, a chunking strategy, or a model — and you get a score.
          Changed the prompt and the score went from 82% to 88%? Ship it.
          Went from 82% to 71%? You just caught a <Term>regression</Term>{" "}
          before a single user did — the AI-era version of the automated tests
          from Chapter 3. This is the difference between improving your system
          on evidence and changing it on hope.
        </P>

        {/* 06 */}
        <H2 n="06">The honest reality</H2>
        <P>
          Two truths to keep you grounded. Evaluation is never perfect — an AI
          system is not a calculator, and &ldquo;88% good&rdquo; is a real,
          useful, honest number, not a failure to reach 100. The goal is not
          perfection; it is <em>knowing where you stand and whether you are
          improving.</em> And this is genuinely what the industry does: serious
          AI teams spend a large share of their effort on evaluation, because
          a system you cannot measure is a system you cannot safely improve.
          When an interviewer asks &ldquo;how would you know your AI feature is
          good?&rdquo; — a question that filters out the demo-makers instantly
          — you now have a real, structured answer.
        </P>

        {/* 07 */}
        <H2 n="07">Do this today</H2>
        <P>
          Give your notice-board RAG an answer key. Write ten questions with
          their correct answers — eight the notices cover, two they do not (the
          refusal cases). Run all ten through your system and grade them by
          hand: did it retrieve the right notice, was the answer right, did it
          correctly refuse the two? Write down the score. Now change one thing —
          your prompt, your chunk size — and run all ten again. Watching a
          single number tell you whether your change helped or hurt is the
          moment AI development stops being guesswork and becomes engineering.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/advanced-rag/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 13 · Advanced RAG
          </Link>
          <Link
            href="/final-year-projects/journey/scaling/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 15 · Scaling &amp; real-time
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
