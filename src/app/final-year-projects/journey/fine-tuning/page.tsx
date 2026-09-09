import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusLeadForm from "@/components/campus/CampusLeadForm";
import StickyActionBar from "@/components/campus/StickyActionBar";
import ChooseApproach from "./ChooseApproach";
import { ApproachDiagram } from "./Diagrams";

const DESCRIPTION =
  "Fine-tuning in plain words and when NOT to do it: prompt vs RAG vs fine-tuning, how fine-tuning actually works, who trains and fine-tunes models, cost and data reality, and the career roadmap from this journey onward.";

export const metadata: Metadata = {
  title: "Chapter 16 — Fine-Tuning, and the Road Ahead",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/journey/fine-tuning/` },
  openGraph: {
    type: "article",
    title: "Chapter 16 — Fine-Tuning, and the Road Ahead",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/fine-tuning/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-finetuning.jpg`],
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

export default function FineTuningChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 16 — Fine-Tuning & the Road Ahead", path: "/final-year-projects/journey/fine-tuning" },
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
          Chapter 16 · The finale
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Fine-tuning, and where you go from here
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          One technique remains that everyone asks about and few understand:
          fine-tuning — actually changing the model itself. This chapter
          demystifies it, tells you the far more important thing (when{" "}
          <em>not</em> to use it), and then closes the whole journey with the
          honest roadmap from where you now stand to a career.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-finetuning.jpg"
          alt="A general polygon refined by a focused beam into a sharper crystal, with a path continuing onward."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          Fine-tuning reshapes the model itself. Powerful, expensive, and needed far less often than people think.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">Three ways to make a model do what you want</H2>
        <P>
          By now you have learned two ways to steer a model, and this chapter
          adds the third — so let us line them up, because choosing between them
          is a real senior decision. <Term>Prompting</Term> (Chapters 6&ndash;7):
          change the <em>instructions</em>. Zero cost, instant, try a hundred
          versions in an afternoon. <Term>RAG</Term> (Chapter 10): change the{" "}
          <em>knowledge</em> you hand the model at question time. Gives it{" "}
          <em>your</em> facts without touching the model. <Term>Fine-tuning</Term>{" "}
          (this chapter): change the <em>model itself</em> — actually nudge its
          parameters (Chapter 5) so it behaves differently by default.
        </P>
        <P>
          The instinct beginners have is that fine-tuning, being the most
          powerful-sounding, must be the best. It is usually the{" "}
          <em>wrong</em> first choice — the most expensive, slowest, most
          brittle of the three. The professional move is the opposite order:
          reach for it last.
        </P>
        <P>
          Think of a new hostel warden on their first day. If you want them to
          answer &ldquo;what time does the gate close?&rdquo;, you do not send
          them for six months of training — you hand them the rule book and
          tell them to read from it. That is <Term>RAG</Term>. If you want them
          to answer politely, in Marathi, in three lines, never guessing when
          they are unsure, you tell them so once. That is{" "}
          <Term>prompting</Term>. Training is what you would do to change who
          they fundamentally are — expensive, slow, and pointless if the real
          problem was that nobody gave them the rule book.
        </P>

        {/* 02 */}
        <H2 n="02">What fine-tuning actually is</H2>
        <P>
          Remember from Chapter 5 how a model is built: pretraining sets
          billions of parameters, then fine-tuning nudges them toward being a
          helpful assistant. <Term>You</Term> can do a small version of that
          last step. You take an existing trained model and continue training
          it a little more, on a few hundred or thousand examples of exactly
          the behaviour you want — and its parameters shift to make that
          behaviour its new default. Give it a thousand examples of your
          company&rsquo;s support replies and it learns to write in that voice
          without being told each time.
        </P>
        <P>
          The critical thing to understand — and the mistake that wastes real
          money — is what fine-tuning is good at. It teaches <em>form</em>: a
          tone, a style, a format, a consistent way of responding. It is{" "}
          <em>bad</em> at teaching <em>facts</em>. Fine-tuning a model on your
          notices will not reliably make it <em>know</em> them — it will make
          it sound like them while still inventing details. Facts are RAG&rsquo;s
          job (retrieve the real text); style is fine-tuning&rsquo;s job. Mixing
          those up is the single most common expensive error in applied AI.
        </P>

        {/* 03 */}
        <H2 n="03">Prompt, RAG, or fine-tune? Decide.</H2>
        <P>
          Here is the decision as a professional makes it — try them in this
          order, and stop at the first that works:
        </P>
        <ChooseApproach />
        <ApproachDiagram />
        <P>
          The honest summary: <Term>prompt first, RAG for knowledge, fine-tune
          only for consistent behaviour you cannot get any other way</Term> —
          and even then, only when you have the data and the volume to justify
          it. Most production AI you will build and see is prompting plus RAG.
          Fine-tuning is a real tool with a narrow, genuine use — and knowing
          that it is narrow is exactly the judgment that marks you as someone
          who understands the field rather than its buzzwords.
        </P>

        {/* 04 */}
        <H2 n="04">Who trains, who fine-tunes — the whole ladder</H2>
        <P>
          Pull back to see the full picture from Chapter 5, now with every rung
          named. <Term>Pretraining</Term> a base model from scratch — the
          trillions of tokens, the thousands of GPUs, the months and the
          fortune — is done by a handful of frontier labs (OpenAI, Anthropic,
          Google, Meta, Mistral and a few others). Almost no one else, and
          certainly no student, does this. <Term>Fine-tuning</Term> an existing
          model is far more accessible — companies do it to specialise a model
          for medicine, law, or their own voice, and the tools are within reach
          of a small team or a capable individual. <Term>Building
          applications</Term> on top of these models with prompting, RAG and
          agents — that is the vast majority of all AI jobs, and it is exactly
          what these sixteen chapters trained you to do. You are aimed at the
          biggest, most open door in the field, not the narrowest.
        </P>

        {/* 05 */}
        <H2 n="05">The whole journey, in one breath</H2>
        <P>
          Look at how far you have come. You started not knowing what a
          frontend was. You can now explain — and build — a complete modern AI
          system: a frontend and backend and database (Ch 1&ndash;4); what a
          language model is, how it is built, and how to drive it (Ch 5&ndash;6);
          how to prompt it reliably and safely (Ch 7); how to give it your own
          knowledge with embeddings, vector search and RAG (Ch 8&ndash;10);
          how to make that retrieval sharp, measured, and fast at scale (Ch
          13&ndash;15); how to let it act as an agent (Ch 11); how to guard it
          for real users (Ch 12); and now, when to reshape the model itself
          (Ch 16). That is not a collection of tricks. That is the architecture
          of the AI era, and you hold all of it.
        </P>

        {/* 06 */}
        <H2 n="06">The roadmap from here</H2>
        <P>
          Be honest with yourself about what you have and what comes next. You
          have the <em>architecture</em> — the rare, durable, valuable part, the
          thing that separates an engineer from a syntax-typist and the thing
          the AI cannot do for you, because it is the judgment that reviews what
          the AI produces. What deepens now is craft, and craft comes from
          building. Ship real projects. Read production code. Go deeper on
          whichever layer gripped you most as you read — the frontend, the
          retrieval, the agents, the infrastructure. And put your work where
          people can see it: a public GitHub, a small live demo, a short
          write-up of what you built and the decisions you made. In this era,{" "}
          <Term>proof of building beats a list of courses, every single
          time.</Term>
        </P>
        <P>
          The deepest lesson under all sixteen chapters is the one you felt in
          Chapter 1 and have earned the right to believe now: the AI made the
          typing cheap and the judgment valuable. Understanding the system,
          choosing the architecture, reviewing the machine&rsquo;s work,
          knowing what can go wrong and guarding against it — that is the job
          now, and it is a better job than the one before it. You began this
          worried you only knew syntax. You end it able to design, build, and
          defend a modern AI system, from the frontend a user taps to the model
          at its heart. That distance is not small. That is a career, begun.
        </P>

        {/* 07 */}
        <H2 n="07">Your last assignment</H2>
        <P>
          One thing remains, and it matters more than any chapter. Take the
          notice-board app you have built across this whole journey — the RAG,
          the agent tool, the guardrails, the cache — write a clear README that
          explains its architecture in your own words, and put it on GitHub
          under your name. Then do the thing that changes everything: show it to
          someone. A senior, a recruiter, a friend, a room. Walk them through
          every box and every decision. When you can do that without notes —
          when the system you built is something you can defend out loud — you
          are no longer a student who took a course. You are an engineer with
          proof. Now go build the next one.
        </P>

        <div className="mt-12 rounded-2xl border border-cyan/20 bg-cyan/[0.03] p-6 sm:p-8">
          <p className="text-lg font-semibold tracking-tight text-zinc-50">
            That&rsquo;s the whole journey — sixteen chapters, end to end.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            From &ldquo;what is a frontend&rdquo; to a guarded, evaluated,
            production RAG agent you can defend in an interview. If you want the
            live version — sixteen days, four hours a day, building all of this
            with guidance and getting your own work reviewed line by line — the
            cohort is where these chapters become muscle memory.
          </p>
        </div>
      </article>

      <div className="mt-10">
        <CampusLeadForm
          projectTitle="16-Day AI Engineering Journey"
          heading="Join the next cohort"
          intro="You've read the whole journey. Tell me your course and how far you got, and I'll reply with the batch schedule, the fee, and an honest read on whether this is the right next step for you."
          messageLabel="Where are you starting from?"
          messagePlaceholder="Your course, which chapters landed hardest, and what you want out of the 16 days…"
        />
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
        <Link
          href="/final-year-projects/journey/scaling/"
          className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          ← Chapter 15 · Scaling
        </Link>
        <Link
          href="/final-year-projects/journey/"
          className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
        >
          Back to the 16-day journey
        </Link>
      </div>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
