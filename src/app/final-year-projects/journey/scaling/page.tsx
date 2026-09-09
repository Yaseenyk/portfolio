import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import LatencyDemo from "./LatencyDemo";
import { AsyncDiagram } from "./Diagrams";

const DESCRIPTION =
  "Scaling and real-time AI in plain words: the timeout problem when models are slow, synchronous vs asynchronous architectures, message queues, streaming and WebSockets vs polling, caching, and keeping cost sane at scale.";

export const metadata: Metadata = {
  title: "Chapter 15 — Scaling & Real-Time AI: When Models Are Slow",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/journey/scaling/` },
  openGraph: {
    type: "article",
    title: "Chapter 15 — Scaling & Real-Time AI",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/scaling/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-scaling.jpg`],
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

export default function ScalingChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 15 — Scaling & Real-Time AI", path: "/final-year-projects/journey/scaling" },
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
          Chapter 15 · Going deeper · Scale &amp; real-time
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          When the model is slow and the users are many
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          AI features break the normal rules of web apps in one uncomfortable
          way: they are <em>slow</em>. A model can take five, ten, thirty
          seconds to answer — an eternity in software. And when a hundred users
          arrive at once, that slowness compounds. This chapter is how real
          systems stay responsive and stay standing when the thing at their
          centre takes its time.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-scaling.jpg"
          alt="Crowding shapes passing through a buffer gate and emerging as one even ribbon."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          A crowd rushing a slow door becomes an orderly stream — with a queue and a buffer in the middle.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* 01 */}
        <H2 n="01">The timeout problem</H2>
        <P>
          Recall the request-response loop from Chapter 1: browser asks,
          backend answers, done — usually in well under a second. Now put a
          slow model in the middle. The user clicks, your backend calls the
          model, and then everyone <em>waits</em> — the browser, the
          connection, the server — for ten seconds or more. Two things break.
          The user assumes the app froze (Chapter 2 — eight seconds feels like
          forever). And connections have <Term>timeouts</Term>: many will
          simply give up and error after 30 seconds, so a genuinely long task
          fails not because it was wrong but because it took too long. The
          normal &ldquo;wait for the answer&rdquo; pattern quietly stops
          working.
        </P>
        <P>
          You already know how this feels from the other side. Ten in the
          morning, tatkal booking opens, and IRCTC goes from instant to a
          spinning wheel to &ldquo;something went wrong&rdquo;. Nothing was
          broken — far more people arrived at once than there were seats to
          serve, and the requests that could not be answered in time were
          dropped. Your project meets a small version of the same wall on demo
          day, when thirty classmates open it at once because the examiner
          told them to.
        </P>
        <LatencyDemo />

        {/* 02 */}
        <H2 n="02">Streaming — the fix for &ldquo;feels frozen&rdquo;</H2>
        <P>
          For a chat-style answer, the first fix you already met in Chapter 6:{" "}
          <Term>streaming</Term>. Instead of waiting for the whole answer and
          sending it at once, the backend forwards each token as the model
          writes it, and the frontend paints it live — the typewriter effect.
          The total time is unchanged, but the <em>felt</em> time collapses
          because something starts happening immediately, and the connection
          stays busy so it does not time out. Streaming solves the perception
          problem beautifully for anything a human reads as it appears.
        </P>

        {/* 03 */}
        <H2 n="03">Asynchronous architecture — the fix for &ldquo;truly long&rdquo;</H2>
        <P>
          But some jobs are not a quick chat — generating a report over fifty
          documents, an agent (Chapter 11) running twenty tool calls. These
          can take minutes, and no amount of streaming saves a request that
          outlives its own timeout. The professional answer is to stop making
          the user&rsquo;s request wait for the work at all. This is{" "}
          <Term>asynchronous</Term> architecture, and the shape is worth
          knowing.
        </P>
        <AsyncDiagram />
        <P>
          When the request arrives, the backend does <em>not</em> do the slow
          work. It writes the job onto a <Term>message queue</Term> — a
          waiting-list of tasks — and immediately answers the user:
          &ldquo;got it, working on it, here&rsquo;s a ticket number.&rdquo;
          The request is done in milliseconds; nothing times out. Meanwhile a
          separate program called a <Term>worker</Term> picks jobs off the
          queue one at a time and does the slow model work in the background.
          When it finishes, it saves the result (Chapter 4) and notifies the
          user. You have decoupled &ldquo;asking for the work&rdquo; from
          &ldquo;doing the work&rdquo; — the single most important pattern for
          anything slow, AI or not.
        </P>

        {/* 04 */}
        <H2 n="04">Telling the user it&rsquo;s ready — WebSockets vs polling</H2>
        <P>
          If the answer arrives later in the background, how does the
          user&rsquo;s screen find out? Two ways, and knowing the trade-off is
          a classic interview beat. <Term>Polling</Term>: the frontend asks the
          backend every few seconds, &ldquo;done yet? done yet?&rdquo; Simple
          to build, but wasteful — most of those checks get &ldquo;not
          yet&rdquo;, and there is a lag between ready and shown.{" "}
          <Term>WebSockets</Term>: a persistent open connection over which the
          server can <em>push</em> to the browser the instant the job is done —
          no repeated asking, no lag. Push beats poll for anything that must
          feel instant; polling is the honest, simple choice when a few seconds
          of delay is fine. Same trade-off you would meet building any live
          feature; AI just makes it common.
        </P>

        {/* 05 */}
        <H2 n="05">Caching and cost at scale</H2>
        <P>
          Now the part that decides whether your system survives success. When
          many users ask <em>similar</em> things, calling the model afresh
          every time is slow and expensive (Chapter 6). <Term>Caching</Term> is
          the fix: remember answers to questions you have already handled and
          serve the stored answer instantly, for free, without touching the
          model. The clever AI version is a <Term>semantic cache</Term> — using
          embeddings (Chapter 8), recognise that &ldquo;when are fees
          due?&rdquo; and &ldquo;fee deadline?&rdquo; are the <em>same</em>{" "}
          question and reuse the one answer. Every cache hit is a request that
          was instant and cost nothing.
        </P>
        <P>
          At scale, three levers keep both latency and the bill under control,
          all built on earlier chapters. <Term>Cache</Term> what repeats.{" "}
          <Term>Route</Term> easy requests to a small cheap model and reserve
          the expensive one for hard work (Chapter 6). And <Term>rate
          limit</Term> (Chapter 12) so no single user can flood the system or
          the bill. &ldquo;It works for one user&rdquo; and &ldquo;it works for
          ten thousand&rdquo; are different achievements, and the gap between
          them is exactly this chapter.
        </P>

        {/* 06 */}
        <H2 n="06">Do this today</H2>
        <P>
          You do not need scale to <em>feel</em> this. Add a simple in-memory
          cache to your notice-board AI: before calling the model, check
          whether you have answered this exact question already; if so, return
          the stored answer. Ask the same question twice and watch the second
          answer come back instantly and free. Then, if you are feeling bold,
          make one slow feature asynchronous — return a &ldquo;working on
          it&rdquo; immediately and finish the job in the background. Feeling
          your own app stay responsive while the model takes its time is the
          lesson landing.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/evaluation/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 14 · Evaluation
          </Link>
          <Link
            href="/final-year-projects/journey/fine-tuning/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 16 · Fine-tuning &amp; the road ahead
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
