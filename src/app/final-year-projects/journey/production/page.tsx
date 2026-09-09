import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusLeadForm from "@/components/campus/CampusLeadForm";
import StickyActionBar from "@/components/campus/StickyActionBar";
import { GuardrailDiagram, CapstoneDiagram } from "./Diagrams";

const DESCRIPTION =
  "Taking AI to production, in plain words: guardrails and content moderation, PII redaction, rate limiting and cost control, the full capstone architecture, and the career roadmap from this journey to a job.";

export const metadata: Metadata = {
  title: "Chapter 12 — Guardrails, Production & the Capstone",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/production/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 12 — Guardrails, Production & the Capstone",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/production/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-production.jpg`],
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

export default function ProductionChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 12 — Production & Capstone", path: "/final-year-projects/journey/production" },
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
          Chapter 12 · Production &amp; the capstone
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Making it safe, and making it yours
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          A demo that works on your laptop and a system real strangers can use
          are two very different things — and the gap between them is exactly
          what companies pay engineers for. This final chapter closes that gap:
          the guardrails that make AI safe to ship, and the capstone that ties
          all sixteen days into one system you can put your name on.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-production.jpg"
          alt="A cluster of connected boxes wrapped in a protective outer frame with filter markers on its inputs and outputs."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          The same system you built — now wrapped, filtered, and guarded at every edge. That is production.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">Why &ldquo;it works&rdquo; is not &ldquo;it&rsquo;s ready&rdquo;</H2>
        <P>
          Your notice-board AI answers your questions beautifully. But you are
          a friendly user who asks sensible things. Real users are a different
          animal: some are confused, some are careless, and a few are actively
          hostile. Someone will paste a thousand-word rant, someone will try
          the prompt injection from Chapter 7, someone will accidentally
          submit their Aadhaar number, and someone will hammer your endpoint
          ten thousand times and hand you a huge bill. Production means
          building for <em>all</em> of them, not just the polite ones. This is
          Chapter 2&rsquo;s &ldquo;design the unhappy paths&rdquo; grown all
          the way up.
        </P>
        <P>
          The version of this you will actually meet is demo day. The app you
          have opened four hundred times on your own laptop now has your guide,
          the external examiner and half your batch on it at once — on the
          college Wi-Fi, on an old Android phone, with one person typing in
          Hindi and another pasting an entire question paper into a box you
          sized for a sentence. Nothing in that list is unfair. It is simply
          the first time your project has met people who did not build it.
        </P>

        {/* 02 */}
        <H2 n="02">Guardrails — the checks around the model</H2>
        <P>
          From Chapter 6 you know the rule: never trust model output. From
          Chapter 3: never trust user input. <Term>Guardrails</Term> are those
          two instincts made into real layers that sit <em>around</em> the
          model — checking what goes in and what comes out, because the model
          itself cannot be trusted to police either.
        </P>
        <GuardrailDiagram />
        <P>
          <Term>On the way in:</Term> is this input safe and sensible before it
          ever reaches the model? Block abuse, strip attacks, reject nonsense.{" "}
          <Term>On the way out:</Term> is this answer safe to show before it
          reaches the user? Check it did not produce something harmful, did not
          leak the system prompt, stayed on topic. The model is the powerful
          engine in the middle; guardrails are the seatbelt and brakes. You
          never ship the engine without them.
        </P>

        {/* 03 */}
        <H2 n="03">Content moderation and PII redaction</H2>
        <P>
          Two specific guardrails you must know by name. <Term>Content
          moderation</Term>: automatically detecting and blocking harmful
          content — abuse, hate, dangerous instructions — either with a
          dedicated moderation API the AI labs provide (often free) or a
          checking step of your own. It protects your users from the model and
          your product from misuse.
        </P>
        <P>
          <Term>PII redaction</Term> — PII means Personally Identifiable
          Information: names, phone numbers, Aadhaar or PAN numbers, addresses.
          Users will paste it without thinking, and you often do not want to
          send it to an outside AI lab (Chapter 6 — hosted models see your
          data) or store it. So you detect and mask it — turning &ldquo;my
          number is 98765 43210&rdquo; into &ldquo;my number is [PHONE]&rdquo;
          — before it travels. In India this is not just courtesy; handling
          personal data carefully is increasingly the law, and &ldquo;we strip
          PII before it leaves our servers&rdquo; is a sentence that wins
          enterprise trust.
        </P>

        {/* 04 */}
        <H2 n="04">Rate limiting and cost control</H2>
        <P>
          Here is the one that ends student projects with a scary bill. Every
          model call costs money (Chapter 6), so an unprotected AI endpoint is
          an open tap on your bank account — and a single buggy loop or one
          malicious user can run it all night. Two defences, both essential.
        </P>
        <P>
          <Term>Rate limiting</Term>: cap how many requests one user can make
          in a window — say twenty questions a minute. It stops abuse and
          runaway loops cold, and it is a standard backend skill (Chapter 3),
          not an AI one. <Term>Cost tracking</Term>: log the token usage of
          every call (it comes back in the response, Chapter 6) so you can
          <em> see</em> what you are spending, per user and per feature, and
          set alerts before a surprise becomes a disaster. And the design-time
          lever from Chapter 6 returns: route easy requests to a small cheap
          model and reserve the expensive one for genuinely hard work.
          Treating spend as a first-class concern from day one is a whole
          discipline — companies literally hire for it.
        </P>

        {/* 05 */}
        <H2 n="05">The capstone — everything, in one system</H2>
        <P>
          Now stand back and look at what sixteen days has actually taught you
          to build. Here is a complete, production-shaped AI application — and
          every single box is a chapter you now understand:
        </P>
        <CapstoneDiagram />
        <P>
          A user asks a question through a <Term>frontend</Term> (Ch 2). It
          hits your <Term>backend</Term> (Ch 3), which holds the keys and the
          rules. Input passes an <Term>input guardrail</Term> (Ch 12). The
          question is embedded and run through <Term>vector search</Term> (Ch
          8&ndash;9) over documents stored in a <Term>database</Term> (Ch 4).
          Retrieved context builds a <Term>grounded prompt</Term> (Ch 7) sent
          to the <Term>LLM</Term> (Ch 5&ndash;6), perhaps as an <Term>agent</Term>{" "}
          with tools (Ch 11). The answer passes an <Term>output guardrail</Term>,
          gets logged for <Term>cost</Term>, and returns with a citation. That
          is a real, modern, employable AI system — and you can explain every
          arrow. That is the whole point of this journey.
        </P>

        {/* 06 */}
        <H2 n="06">How to whiteboard it in an interview</H2>
        <P>
          &ldquo;Design an AI system that answers questions over company
          documents&rdquo; is one of the most common senior-level interview
          questions of this era, and you can now answer it live. Do it in
          this order, out loud, drawing boxes: start with the goal and the
          data; draw the indexing path (chunk, embed, store); draw the query
          path (embed, retrieve, ground, generate); add the guardrails on
          input and output; mention cost, rate limiting, and evaluation; and
          name your honest trade-offs — chunk size, which model, hosted vs
          local. Most candidates memorise buzzwords. You will draw the actual
          machine, from foundations, because you built it. That is what gets
          the offer.
        </P>

        {/* 07 */}
        <H2 n="07">The career roadmap — where this goes</H2>
        <P>
          Be honest with yourself about what you now have and what is next.
          You have the <em>architecture</em> — the rare and valuable part, the
          thing that separates an engineer from a syntax-typist. What deepens
          with practice is the craft: shipping more real projects, reading
          production code, going deeper on whichever layer grips you — the
          frontend, the retrieval, the agents, the infrastructure. Build
          things that are <em>yours</em> and put them where people can see
          them — a public GitHub, a small live demo, a write-up of what you
          built and why. In the AI era, <Term>proof of building beats a list
          of courses</Term>, every time.
        </P>
        <P>
          And the deepest lesson under all sixteen days: the AI made the
          typing cheap and the <em>judgment</em> valuable. Understanding the
          system, choosing the architecture, reviewing what the machine
          produces, knowing what can go wrong and guarding against it — that
          is the job now, and it is a better job than the one before. You
          started this journey worried you only knew syntax. You end it able to
          design and defend a modern AI system. That is not a small distance.
          That is a career, begun.
        </P>

        {/* 08 */}
        <H2 n="08">Your capstone — do this</H2>
        <P>
          Bring it home. Take the notice-board app you have grown chapter by
          chapter and make it capstone-worthy: RAG answers with citations (Ch
          10), one small safe agent tool (Ch 11), an input and output guardrail
          (this chapter), rate limiting on the AI endpoint, and token-cost
          logging. Then write a short README explaining the architecture — the
          diagram from section 05 in your own words — and put the whole thing
          on GitHub. That single repository proves, to any recruiter who opens
          it, that you can build the thing everyone is hiring for. Sixteen days
          ago it would have looked like magic. Now it is just your project.
        </P>

        <div className="mt-12 rounded-2xl border border-cyan/20 bg-cyan/[0.03] p-6 sm:p-8">
          <p className="text-lg font-semibold tracking-tight text-zinc-50">
            You can now build the whole thing, end to end.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            That is the core journey — frontend to a guarded production RAG
            agent. Four more chapters go deeper: making retrieval sharp,
            measuring quality honestly, staying fast at scale, and reshaping
            the model itself. Read on, or if you want the live version — sixteen
            days, four hours a day, with your own work reviewed line by line —
            the cohort is where these chapters become muscle memory.
          </p>
        </div>
      </article>

      <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
        <Link
          href="/final-year-projects/journey/agents/"
          className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          ← Chapter 11 · Agents
        </Link>
        <Link
          href="/final-year-projects/journey/advanced-rag/"
          className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
        >
          Next → Chapter 13 · Advanced RAG
        </Link>
      </div>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
