import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import { RequestAnatomyDiagram } from "./Diagrams";

const DESCRIPTION =
  "Backend development with Claude Code, in plain words: routes, validation, business rules, auth, status codes, logs, tests as the backend's eyes, the API contract as the spec, and the folder structure that keeps the AI precise.";

export const metadata: Metadata = {
  title: "Chapter 3 — Building the Backend with Claude Code",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/backend/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 3 — Building the Backend with Claude Code",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/backend/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-backend.jpg`],
  },
};

/* Same reading typography as Chapters 1 and 2 — chapters stay self-contained. */
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
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {title}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300">
        {children}
      </pre>
    </figure>
  );
}

export default function BackendChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 3 — Backend with Claude Code", path: "/final-year-projects/journey/backend" },
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
          Chapter 03 · Backend, with Claude Code
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Building the part nobody sees
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          The frontend from Chapter 2 is a beautiful shop with nothing behind
          the counter. Now we build the brain — the backend from Chapter 1
          that checks the rules and talks to the database. Same Claude Code
          workflow, one big difference: this part has no screens, so you will
          learn to judge it a new way.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-backend.jpg"
          alt="Small shapes entering through a single gate into a corridor of orderly checkpoint frames and emerging transformed on the far side."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          One door in, checkpoints in sequence, one answer out. That is a backend.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* ------------------------------------------------------------ */}
        <H2 n="01">A program with no face</H2>
        <P>
          Everything you built in Chapter 2 you could <em>see</em> — click a
          button, watch the screen. The backend has no screen. It is a
          program that sits on a server, listens for requests, and answers
          them. Its only face is its behaviour: what comes back when you
          ask, how fast, and what it refuses to do.
        </P>
        <P>
          This changes how you verify work. In Chapter 2, Claude&rsquo;s
          &ldquo;eyes&rdquo; were a browser taking screenshots. For a
          backend, the eyes are different: <Term>you judge it by sending
          requests and reading the answers, and by automated tests that do
          this for you hundreds of times a second</Term>. Hold that thought —
          it shapes this whole chapter.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="02">What backend work is actually made of</H2>
        <P>Like the frontend&rsquo;s seven jobs, the backend has its own:</P>
        <ul className="mt-4 space-y-2.5">
          {[
            ["Routes (endpoints)", "the items on the API menu from Chapter 1 — “POST /login”, “GET /notices”. Each one is a door with a name."],
            ["Validation", "checking every incoming request at the door. Chapter 1's iron rule — the frontend is never trusted — is enforced here."],
            ["Business rules", "the actual thinking: who can post a notice, what happens when it's reported, what a valid order is."],
            ["Talking to the database", "reading and writing the memory — always through one layer, never scattered everywhere."],
            ["Auth", "two questions on every request: who are you? and are you allowed to do this?"],
            ["Errors and status codes", "answering failure honestly — the right code and a clear message, not a crash."],
            ["Logs", "the backend's diary — what happened and when, so at 2 a.m. you can find out why something broke."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-2.5 leading-relaxed text-zinc-300">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
              <span>
                <Term>{t}</Term> — {d}
              </span>
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------------------ */}
        <H2 n="03">Language: still the secondary decision</H2>
        <P>
          Backends are written in Java, Python, C#, Go — and JavaScript. For
          this journey we use <Term>Node.js with Express and
          TypeScript</Term>, for one very practical reason: it is the same
          language as your frontend. One language means every review skill
          you built in Chapter 2 carries straight over, and Claude moves
          between both sides of the wire without switching costumes. If your
          college taught Java or Python — nothing here is wasted. Routes,
          validation, services, auth, tests: every concept transfers; only
          the spelling changes.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="04">Setup — the memory file, backend edition</H2>
        <P>
          The workflow is the one you already know: a folder, a CLAUDE.md,
          a docs/ directory, and the loop. Only the contents change —
          backend rules are about trust and safety, not pixels.
        </P>
        <Code title="CLAUDE.md — backend edition">{`# CLAUDE.md

API for the college notice-board app. Node.js + Express + TypeScript.
The frontend from ../notice-board-web consumes this API.

## Commands
- npm run dev    -> start on localhost:4000
- npm run test   -> run all tests (must pass before every commit)
- npm run lint   -> must pass, no warnings

## Structure
- src/routes/     -> one file per resource; routes stay THIN
- src/services/   -> the business rules; all thinking happens here
- src/db/         -> the ONLY place that touches the database
- src/middleware/ -> auth and validation, applied at the door
- docs/api-contract.md is the source of truth. Change it FIRST.

## Rules
- Validate every request body at the door. Trust nothing from the client.
- Routes never contain business logic; services never send responses.
- Never log passwords, tokens, or personal data.
- Every endpoint gets a test for its success case and its failure cases.`}</Code>

        {/* ------------------------------------------------------------ */}
        <H2 n="05">The API contract is the real spec</H2>
        <P>
          In Chapter 2 I made you write{" "}
          <span className="font-mono text-sm text-ice">docs/api-contract.md</span>{" "}
          and build the frontend against mock data. Here is the payoff: that
          same file is now the <Term>construction plan for the backend</Term>.
          The contract sits between both sides like a signed agreement — the
          frontend was built expecting these exact requests and responses, so
          the backend&rsquo;s job is simply to honour them.
        </P>
        <Code title="docs/api-contract.md — one entry">{`## POST /notices          (auth required)
Creates a notice.

Request body:
  { "title": string (3-100 chars), "body": string (max 2000) }

Responses:
  201  { "id": string, "title": string, "body": string,
         "authorId": string, "createdAt": string }
  400  { "error": "what exactly was wrong with the input" }
  401  { "error": "log in first" }`}</Code>
        <P>
          Your instruction to Claude becomes: &ldquo;Read
          docs/api-contract.md. Implement POST /notices exactly as written,
          with validation and tests for the 201, 400 and 401 cases.&rdquo;
          Precise input, precise output. And when frontend and backend
          disagree later — the contract file decides who is wrong. This is
          how real teams with separate frontend and backend engineers stay
          sane, and you are learning it as a student.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="06">The anatomy of one request</H2>
        <P>
          Inside the backend, every request walks the same corridor. Learn
          this shape once and every backend you ever open — in any language —
          becomes readable:
        </P>
        <RequestAnatomyDiagram />
        <P>
          The order matters and is worth saying out loud. <Term>Auth comes
          first</Term> — no point validating a request from someone who
          shouldn&rsquo;t be here at all. <Term>Validation second</Term> —
          reject garbage at the door, politely, with a 400 and a reason.
          Only then does the <Term>service</Term> do the thinking, the{" "}
          <Term>db layer</Term> do the remembering, and the route send back
          an answer with the right status code. Routes stay thin — they
          receive and respond. Services think. The db layer is the only
          door to the database. Three sentences that will keep every backend
          you build clean.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="07">Status codes and errors — answering honestly</H2>
        <P>
          Status codes are the API&rsquo;s facial expressions, and you only
          need six to start. <Term>200</Term> — done, here you go.{" "}
          <Term>201</Term> — done, and I created something new.{" "}
          <Term>400</Term> — your request made no sense (their mistake).{" "}
          <Term>401</Term> — I don&rsquo;t know who you are, log in.{" "}
          <Term>404</Term> — that thing doesn&rsquo;t exist.{" "}
          <Term>500</Term> — I broke, and it&rsquo;s my fault, not yours.
        </P>
        <P>
          The professional habit hiding in there: <Term>4xx codes blame the
          client, 5xx codes blame the server</Term> — and an honest backend
          never sends a 500 for what is really a 400. One more rule that
          sounds small and isn&rsquo;t: error messages should say what went
          wrong (&ldquo;title must be 3–100 characters&rdquo;) without
          leaking how the system works inside. Helpful outside, quiet about
          the machinery.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="08">Auth in plain words</H2>
        <P>
          Auth is two different questions wearing one name.{" "}
          <Term>Authentication</Term>: who are you? You prove it once — email
          and password — and the backend hands you a <Term>token</Term>: a
          long signed string your frontend attaches to every later request.
          Think of the stamped wristband at an event: show it at every gate
          instead of showing your ticket again. <Term>Authorisation</Term>:
          fine, you&rsquo;re in — but are you <em>allowed to do this</em>?
          A student can post a notice; only an admin can delete someone
          else&rsquo;s. Same wristband, different colours.
        </P>
        <P>
          And one rule you must never break, even in a toy project:{" "}
          <Term>passwords are never stored as-is</Term>. They are run through
          a one-way scrambler (called hashing) so that even if the database
          leaks, no one recovers the real passwords. Claude will do this
          correctly if your CLAUDE.md demands it — and you will check the
          diff, because now you know what to look for.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="09">Tests — the backend&rsquo;s screenshots</H2>
        <P>
          Here is where the Chapter 2 loop earns its keep. The verify step
          for a backend is not a screenshot — it is a{" "}
          <Term>test</Term>: a small program that sends a request to your
          endpoint and checks the answer. &ldquo;POST /notices with a good
          body returns 201. With a one-letter title, 400. Without a token,
          401.&rdquo; Written once, they run in seconds, forever, on every
          change.
        </P>
        <P>
          With Claude, tests stop being homework. It writes them alongside
          the endpoint, runs them, and fixes its own failures before you
          even look — <em>if</em> your CLAUDE.md demands tests, which yours
          now does. Your job is to review <em>what</em> is tested: the rules
          from the contract, especially the failure cases. A test suite that
          only checks the happy path is a seatbelt made of paper.
        </P>
        <Code title="the backend loop — what changes from Chapter 2">{`Specify   -> the endpoint's entry in docs/api-contract.md
Plan      -> Claude proposes: route + service + validation + tests
Build     -> it writes the files, runs lint and the build
Verify    -> npm run test  (and curl the endpoint yourself — feel it)
Review    -> read the diff; check validation, status codes, no leaks
Commit    -> git, then /clear and next endpoint`}</Code>
        <P>
          That <span className="font-mono text-sm text-ice">curl</span> in
          the verify step is a tiny terminal tool that sends one request by
          hand — the backend developer&rsquo;s way of pressing the button.
          Ask Claude to show you; sending your first hand-written request
          and reading the raw JSON answer is this chapter&rsquo;s version of
          the magic moment.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="10">Folder structure — the corridor, as folders</H2>
        <Code title="the structure — mirrors the request's path">{`notice-board-api/
  CLAUDE.md
  docs/
    api-contract.md      # THE source of truth (shared with the frontend)
    architecture.md
  src/
    routes/
      notices.ts         # thin: receive, call service, respond
      auth.ts
    services/
      notices.service.ts # the rules live here
      auth.service.ts
    middleware/
      auth.ts            # the wristband check
      validate.ts        # the door check
    db/
      index.ts           # the ONLY file that touches the database
    lib/
      types.ts           # shared shapes — mirror the contract
  tests/
    notices.test.ts      # one test file per resource
  package.json`}</Code>
        <P>
          Compare it with the diagram above — the folders <em>are</em> the
          corridor. That is the point: when structure mirrors the journey of
          a request, both you and Claude always know where a change belongs.
          &ldquo;Fix the validation on notices&rdquo; touches exactly one
          predictable place.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="11">What you must still learn by hand, backend edition</H2>
        <P>
          Same warning as Chapter 2, sharper consequences. A sloppy frontend
          looks ugly; a sloppy backend <em>leaks data and loses money</em>.
          So: read every diff that touches auth or validation twice — those
          are the load-bearing walls. Learn to read a stack trace calmly
          (the error&rsquo;s family tree — it tells you exactly where things
          died). And practise explaining the corridor — auth, validate,
          think, remember, respond — because &ldquo;design an API for
          X&rdquo; is one of the most common interview questions there is,
          and it is answered with exactly what you now know.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="12">Do this today</H2>
        <P>
          Take the api-contract.md you wrote in Chapter 2. Create the
          backend folder, write the CLAUDE.md from section 04, and run the
          loop endpoint by endpoint: GET /notices first (no auth — easiest),
          then POST /notices, then login. Curl each one. Watch the tests
          pass. Then the graduation moment: <Term>delete the mock data from
          your frontend and point it at your real API</Term>. When the
          notice you post from the browser comes back from your own backend
          — that is the full loop from Chapter 1, built by you, twice over.
        </P>
        <P>
          One thing is still missing: your notices vanish every time the
          backend restarts, because they live in its temporary memory. You
          know from Chapter 1 exactly what is supposed to fix that. Next
          chapter: the database.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/frontend/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 02 · Frontend
          </Link>
          <Link
            href="/final-year-projects/journey/database/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 04 · Database
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
