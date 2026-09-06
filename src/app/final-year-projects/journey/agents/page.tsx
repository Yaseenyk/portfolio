import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import AgentLoop from "./AgentLoop";
import { MultiAgentDiagram } from "./Diagrams";

const DESCRIPTION =
  "AI agents in plain words: what makes an AI agentic, tool calling, the think-act-observe loop, connecting a model to search, calculators and databases, multi-agent systems, and the safety that agency demands.";

export const metadata: Metadata = {
  title: "Chapter 11 — AI Agents: Models That Act, Not Just Answer",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/agents/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 11 — AI Agents: Models That Act, Not Just Answer",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/agents/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-agents.jpg`],
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

export default function AgentsChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 11 — AI Agents", path: "/final-year-projects/journey/agents" },
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
          Chapter 11 · Models that act
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          AI agents — from answering to doing
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Until now the model has only ever produced <em>text</em>. Powerful,
          but passive — it answers and waits. An agent is a model that can
          take <em>actions</em>: search the web, run a calculation, query your
          database, book a slot — decide what to do, do it, look at the
          result, and keep going until the job is done. This is the frontier,
          and it is closer to your reach than you think.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-agents.jpg"
          alt="A central node with arms reaching out to operate several tools, with a loop arrow returning."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          Give the model tools and a loop, and it stops answering questions and starts finishing tasks.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">What makes an AI &ldquo;agentic&rdquo;</H2>
        <P>
          The word gets thrown around; here is the honest line. A normal LLM
          call is <em>one shot</em>: question in, answer out, done (Chapter 6).
          An <Term>agent</Term> is that same model placed inside a{" "}
          <em>loop</em>, given <em>tools</em> it can use and a <em>goal</em> to
          reach — and allowed to take several steps, deciding each one for
          itself, until the goal is met. The shift is from &ldquo;answer this
          question&rdquo; to &ldquo;achieve this outcome, using whatever steps
          it takes.&rdquo;
        </P>
        <P>
          The everyday example: ask a plain model &ldquo;what&rsquo;s the fee
          plus the hostel deposit?&rdquo; and it might do the arithmetic in its
          head and get it subtly wrong (Chapter 5 — it predicts tokens, it
          does not truly calculate). Give it a calculator tool and a loop, and
          it will <em>choose</em> to use the calculator, get the exact number,
          and answer correctly. It did not just respond — it acted.
        </P>

        {/* 02 */}
        <H2 n="02">Tool calling — the key mechanism</H2>
        <P>
          How can a model that only outputs text <em>do</em> anything? Through
          a beautifully simple trick called <Term>tool calling</Term> (or
          function calling). You describe to the model, in words, a set of
          tools it may use — each with a name and what it does: &ldquo;a tool
          called <span className="font-mono text-sm text-ice">search_notices</span>{" "}
          that takes a query and returns matching notices.&rdquo; Now, instead
          of answering, the model can reply: &ldquo;I want to use
          search_notices with the query &lsquo;hostel fees&rsquo;.&rdquo;
        </P>
        <P>
          And here is the part that surprises everyone: <Term>the model does
          not run the tool — your code does.</Term> The model only <em>asks</em>{" "}
          to use a tool; your program sees that request, actually runs the
          real function (this is Chapter 3 territory — your backend, your
          database), and hands the result back to the model. The model reads
          the result and continues. The model is the decider; your code is the
          hands. Once you see that split, agents stop being mysterious — they
          are your Chapter 3 backend, with an LLM choosing which functions to
          call.
        </P>

        {/* 03 */}
        <H2 n="03">The loop — think, act, observe</H2>
        <P>
          Put tool calling in a loop and you have an agent. Step through the
          cycle it runs, over and over, until it has what it needs:
        </P>
        <AgentLoop />
        <P>
          That is the entire engine: <Term>think</Term> (the model decides the
          next step), <Term>act</Term> (your code runs the chosen tool),{" "}
          <Term>observe</Term> (the result goes back to the model), repeat.
          RAG from Chapter 10 is really the simplest agent — one forced tool
          call (retrieve) before answering. A full agent just gets to choose
          its tools, and to loop. Same DNA, more freedom.
        </P>

        {/* 04 */}
        <H2 n="04">What tools actually are</H2>
        <P>
          A tool is just a function your code exposes to the model — and it
          can be anything your backend can do. <Term>Search the web</Term> so
          the model escapes its knowledge cutoff (Chapter 5). <Term>Query your
          database</Term> (Chapter 4) to answer from live data. <Term>A
          calculator</Term> for exact maths. <Term>Send an email, create a
          ticket, book a slot</Term> — real actions in the real world. This is
          also where <Term>MCP</Term> from Chapter 2 clicks fully into place:
          MCP is a standard way to hand an AI a menu of tools, which is
          exactly what an agent needs. The same protocol that gave Claude Code
          its abilities gives your agent its abilities.
        </P>

        {/* 05 */}
        <H2 n="05">Multi-agent systems — a team of specialists</H2>
        <P>
          One agent trying to do everything gets confused, the same way one
          giant 2000-line file does (Chapter 2). So a powerful pattern from
          Day 14: use <em>several</em> specialised agents that collaborate,
          each with a narrow job and its own small tool set.
        </P>
        <MultiAgentDiagram />
        <P>
          A <Term>router</Term> (or orchestrator) reads the request and sends
          it to the right specialist — a &ldquo;fees&rdquo; agent, a
          &ldquo;timetable&rdquo; agent, a &ldquo;general&rdquo; agent. Each
          specialist has a focused system prompt and only the tools it needs,
          so each does its one job well. You can even add a <Term>reviewer</Term>{" "}
          agent that checks another&rsquo;s work before it ships — automated
          quality control. It is the same idea that runs good human teams and
          good software (Chapter 1): break a big job into focused roles with
          clear handoffs. Architecture, all the way down.
        </P>

        {/* 06 */}
        <H2 n="06">Agency raises the stakes — and the danger</H2>
        <P>
          Now the sober part, and it is the most important paragraph in this
          chapter. A model that only writes text can, at worst, write
          something wrong. A model that can <em>act</em> can do something
          wrong — delete data, send a bad email, spend money. Remember prompt
          injection from Chapter 7? On a text bot, the worst it does is
          produce a weird answer. On an agent with a &ldquo;delete
          record&rdquo; tool, a successful injection could make it{" "}
          <em>actually delete records</em>. Agency multiplies both usefulness
          and blast radius.
        </P>
        <P>
          So the non-negotiable rules, all built from earlier chapters.{" "}
          <Term>Least privilege</Term>: give an agent the fewest, narrowest
          tools that do the job — never a raw &ldquo;run any database
          command&rdquo; tool when &ldquo;look up a fee&rdquo; will do.{" "}
          <Term>Human in the loop for anything dangerous</Term>: irreversible
          actions — sending money, deleting, emailing a customer — should
          propose and wait for a human&rsquo;s yes, not fire automatically.
          And <Term>every tool validates its own inputs</Term> (Chapter 3),
          because now the &ldquo;user&rdquo; calling your function is a
          sometimes-wrong model. Build agents like you are handing car keys to
          a talented teenager: real capability, real supervision.
        </P>

        {/* 07 */}
        <H2 n="07">Do this today</H2>
        <P>
          Give your notice board a tiny agent. Define two tools your backend
          already has — <span className="font-mono text-sm text-ice">search_notices(query)</span>{" "}
          and <span className="font-mono text-sm text-ice">calculate(expression)</span>{" "}
          — and describe them to the model. Then ask a question that needs
          both: &ldquo;What&rsquo;s the total if I pay the tuition fee and the
          exam fee?&rdquo; Watch the loop: the agent searches the notices for
          each fee, calls the calculator to add them, and answers with the
          exact total — choosing those steps itself. Keep both tools read-only
          and harmless, exactly as section 06 preaches, and you have safely
          built a real agent.
        </P>
        <P>
          You have now seen the whole ladder — a model that answers, that
          answers from your data, and that acts. One chapter remains, and it
          is the one that turns any of this from a clever demo into something
          you can actually put in front of real users without fear.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/rag/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 10 · RAG
          </Link>
          <Link
            href="/final-year-projects/journey/production/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 12 · Production
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
