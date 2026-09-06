import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import { SchemaDiagram } from "./Diagrams";

const DESCRIPTION =
  "Databases with Claude Code, in plain words: tables and relationships, schema design from a data-model doc, migrations, indexes, SQL injection, the one-door rule, and why production data is sacred.";

export const metadata: Metadata = {
  title: "Chapter 4 — The Database, with Claude Code",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/database/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 4 — The Database, with Claude Code",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/database/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-database.jpg`],
  },
};

/* Same reading typography as the earlier chapters — self-contained. */
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

export default function DatabaseChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 4 — Database with Claude Code", path: "/final-year-projects/journey/database" },
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
          Chapter 04 · Database, with Claude Code
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          The memory that must never lie
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Your backend from Chapter 3 thinks, but forgets everything on
          restart. This chapter gives it permanent memory — and teaches you
          the one part of the system where mistakes cannot be shrugged off.
          Code bugs get fixed. Lost data is lost.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-database.jpg"
          alt="A calm stacked-cylinder vault with neat rows of blocks stored in visible layers, one block being placed by a thin beam."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          Order, permanence, safekeeping. The database does one job and must do it perfectly.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* ------------------------------------------------------------ */}
        <H2 n="01">Why this part is different</H2>
        <P>
          Everything you have built so far can be thrown away and rebuilt.
          Delete the frontend — rebuild it tomorrow from the docs. Delete the
          backend — same. Delete the database and{" "}
          <Term>ten years of users, orders and records are gone forever</Term>.
          That asymmetry is why this chapter has a different tone. Frontend
          mistakes look bad. Backend mistakes behave badly. Database mistakes
          are <em>permanent</em>.
        </P>
        <P>
          It is also why, of all the chapters, this is the one where you
          review Claude&rsquo;s work most carefully. The AI will happily
          write a migration that drops a table. Your job is to be the person
          who reads it first.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="02">What database work is actually made of</H2>
        <ul className="mt-4 space-y-2.5">
          {[
            ["Designing the schema", "deciding what tables exist, what columns they have, and how they relate — the floor plan of the memory."],
            ["Queries", "asking the memory questions and giving it updates — the SQL you saw in college, finally with a purpose."],
            ["Migrations", "changing the floor plan of a building people already live in — safely, step by step, with a record."],
            ["Indexes", "the difference between finding a name in a phone book and reading every page of it."],
            ["Safety", "injection attacks, least privilege, and the one-door rule from Chapter 3."],
            ["Backups", "the undo button for reality. Not optional. Ever."],
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
        <H2 n="03">Tables and relationships, in plain words</H2>
        <P>
          A table is a strict Excel sheet: columns are decided in advance,
          every row follows them. The notice board needs two:{" "}
          <span className="font-mono text-sm text-ice">users</span> and{" "}
          <span className="font-mono text-sm text-ice">notices</span>. Every
          row gets an <Term>id</Term> — a unique number plate no other row
          shares.
        </P>
        <P>
          Now the idea the whole relational world is built on. A notice must
          remember who wrote it. We do not copy the author&rsquo;s name into
          the notice — names change, and copies drift apart. Instead the
          notice stores the author&rsquo;s <em>id</em>:{" "}
          <span className="font-mono text-sm text-ice">author_id = 7</span>,
          meaning &ldquo;written by user number 7&rdquo;. That pointing
          column is a <Term>foreign key</Term>, and the arrangement is a{" "}
          <Term>relationship</Term>: one user, many notices. Store a fact in
          exactly one place, point at it from everywhere else — that single
          principle is most of database design.
        </P>
        <SchemaDiagram />

        {/* ------------------------------------------------------------ */}
        <H2 n="04">Choosing a database: secondary, again</H2>
        <P>
          Same speech, third time, still true. We use{" "}
          <Term>PostgreSQL</Term> (&ldquo;Postgres&rdquo;) — free, battle-
          tested, and the most demanded relational database in job postings.
          You already know of MongoDB, which stores flexible documents
          instead of strict tables; it fits some problems well. But learn
          tables and relationships first: they force you to <em>think</em>{" "}
          about your data, and that thinking transfers everywhere — including
          to Mongo. For practice on your laptop, <Term>SQLite</Term> — a
          whole database living in a single file — is a perfectly honest
          starting point, and the concepts are identical.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="05">The data model doc — the spec, again</H2>
        <P>
          By now you know the move: before Claude touches anything, the
          thinking goes in a file. For the database it is{" "}
          <span className="font-mono text-sm text-ice">docs/data-model.md</span>{" "}
          — written in plain language first, not SQL:
        </P>
        <Code title="docs/data-model.md">{`# Data model — notice board

## What must be remembered
- Users: name, college email (unique), hashed password, role
  (student | admin), when they joined.
- Notices: title, body, who wrote it, when, and whether it is
  hidden by an admin.

## Relationships
- One user writes many notices. A notice has exactly one author.
- Deleting a user does NOT delete their notices (college records
  stay); the notice keeps pointing at the removed user's id.

## Rules the database itself should enforce
- Emails unique. Titles never empty. Role only student or admin.`}</Code>
        <P>
          Then: &ldquo;Read docs/data-model.md and draft the schema as a
          migration.&rdquo; Claude turns your plain words into SQL — and you
          review the translation, not the typing. Check three things: do the
          column names match the words you used, are the rules you wrote
          enforced (unique, not-null), and is anything there you never asked
          for.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="06">Migrations — renovating an occupied building</H2>
        <P>
          Here is the problem migrations solve. Month two, you need a{" "}
          <span className="font-mono text-sm text-ice">category</span>{" "}
          column on notices. But the database is <em>running</em>, full of
          real rows. You cannot delete it and start again — that is the
          &ldquo;lost forever&rdquo; scenario. You have to renovate the
          building while people live in it.
        </P>
        <P>
          A <Term>migration</Term> is a small numbered file describing one
          change: &ldquo;001 create users and notices&rdquo;, &ldquo;002 add
          category to notices&rdquo;. They live in git, run in order, and
          each runs exactly once — so every copy of the database (yours,
          your teammate&rsquo;s, production) reaches the same shape by the
          same recorded steps. The iron rule that follows:{" "}
          <Term>nobody changes a database by hand — every change is a
          migration file</Term>. The AI era makes this stricter, not looser:
          Claude writes the migration, you read it, git remembers it.
        </P>
        <Code title="migrations/ — the renovation diary">{`migrations/
  001_create_users_and_notices.sql
  002_add_category_to_notices.sql
  003_add_index_on_notices_created_at.sql

# each file: one change, runs once, in order, on every copy.
# reviewed like any diff — especially anything that DROPs or ALTERs.`}</Code>

        {/* ------------------------------------------------------------ */}
        <H2 n="07">Indexes — why apps get slow</H2>
        <P>
          When the notices table has 200 rows, everything is fast no matter
          what you do. At two lakh rows, &ldquo;show the newest notices&rdquo;
          suddenly takes seconds — because without help, the database reads{" "}
          <em>every row</em> to answer. That full read has a name (a table
          scan) and a cure: an <Term>index</Term> — a sorted side-structure
          the database maintains so it can jump straight to the answer, like
          the index pages of a textbook.
        </P>
        <P>
          The trade: indexes make reads fast and writes slightly slower, so
          you index the columns you <em>search and sort by</em> — not
          everything. And the professional move you can already do: when
          something is slow, ask the database to explain itself (Postgres
          literally has an <span className="font-mono text-sm text-ice">EXPLAIN</span>{" "}
          command) and ask Claude to interpret the output. &ldquo;The app is
          slow&rdquo; usually ends in a missing index — now you know the
          shape of the story.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="08">Safety — injection and the one-door rule</H2>
        <P>
          The most famous database attack is embarrassingly simple. If your
          backend builds a query by gluing user text into SQL, a user can
          type SQL <em>as their input</em> — a search box entry that ends
          with &ldquo;; DELETE everything&rdquo; — and the database will
          obey. That is <Term>SQL injection</Term>, and it has emptied real
          companies&rsquo; real tables.
        </P>
        <P>
          The defence is one habit: <Term>user text is never glued into a
          query</Term>. It is passed separately (called a parameterised
          query) so the database treats it as plain data, never as a
          command. Put it in CLAUDE.md as a rule and check it in review.
          Combine with Chapter 3&rsquo;s one-door rule — only src/db touches
          the database — and safety becomes something you can actually
          audit: one folder to read, one rule to check.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="09">Claude and your database — where the line is</H2>
        <P>
          How this fits the loop you know. The schema, migrations and seed
          data (fake rows for development) all live in the repo — so Claude
          reads and writes them like any code, and git remembers every
          change. For inspecting a <em>running</em> database there are MCP
          servers (a Postgres MCP, for instance) that let Claude look at
          real tables and run read-only queries — genuinely useful when
          debugging.
        </P>
        <P>
          And one line you never cross, which you already believe in from
          Chapter 1: <Term>the AI never gets a door to production
          data</Term>. Claude works on dev, with fake rows, always. Not
          because the AI is malicious — because accidents in dev cost
          nothing and accidents in production are the one category of
          mistake this chapter exists to prevent. The same applies to you,
          by the way. Professionals with ten years of experience do not
          hand-run queries on production either.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="10">Backups — the undo button for reality</H2>
        <P>
          Migrations protect the shape of the data. Backups protect the data
          itself: a copy of the whole database, taken automatically on a
          schedule, stored somewhere else. Every serious system has them,
          and there is one lesson about them that people learn either from a
          mentor or from a disaster — I would rather you get it from a
          mentor: <Term>a backup you have never restored is a rumour, not a
          backup</Term>. Practising the restore once, on dev, is what turns
          it into an actual safety net.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="11">What you must still learn by hand, database edition</H2>
        <P>
          Learn to read SQL comfortably — SELECT, INSERT, UPDATE, JOIN —
          because every schema and migration Claude writes is a diff you
          must judge, and this chapter told you which diffs are permanent.
          Practise drawing a data model on paper from a plain-English
          description; &ldquo;design the tables for X&rdquo; is a guaranteed
          interview question and it is exactly section 05 without the AI.
          And treat anything containing{" "}
          <span className="font-mono text-sm text-ice">DROP</span> or{" "}
          <span className="font-mono text-sm text-ice">DELETE</span> as a
          stop-and-read-twice moment, forever.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="12">Do this today</H2>
        <P>
          Finish the build. Write docs/data-model.md for the notice board in
          your own words. Have Claude draft migration 001 and read every
          line of it. Wire src/db to a real database — SQLite is fine —
          and re-run your Chapter 3 tests until they pass again. Then the
          moment this was all for: post a notice from your frontend,{" "}
          <Term>restart the backend, and refresh</Term>. The notice is still
          there. Frontend asks, backend thinks, database remembers — the
          whole sentence from Chapter 1 is now something you have built,
          end to end, with your own reviewed code at every layer.
        </P>
        <P>
          That is the entire classical system. What comes next in the
          journey is the new part — giving this system intelligence — and
          you now have every foundation the 16 days assume.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/backend/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 03 · Backend
          </Link>
          <Link
            href="/final-year-projects/journey/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Back to the 16-day journey
          </Link>
          <Link
            href="/final-year-projects/journey/llm/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-ice underline decoration-cyan/30 underline-offset-4 hover:decoration-cyan"
          >
            Next → Chapter 05 · What an LLM is
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
