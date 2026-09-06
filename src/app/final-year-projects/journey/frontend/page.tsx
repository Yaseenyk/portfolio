import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import { DevSystemDiagram } from "./Diagrams";

const DESCRIPTION =
  "Frontend development the way it works now: Claude Code setup, CLAUDE.md, feeding docs to the AI, MCP servers, an AI-friendly folder structure, and the plan-build-verify loop — in plain words.";

export const metadata: Metadata = {
  title: "Chapter 2 — Building the Frontend with Claude Code",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/frontend/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 2 — Building the Frontend with Claude Code",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/frontend/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-frontend.jpg`],
  },
};

/* Same reading typography as Chapter 1 — chapters stay self-contained. */
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

/* Terminal-style block for commands, files, and trees. */
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

export default function FrontendChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 2 — Frontend with Claude Code", path: "/final-year-projects/journey/frontend" },
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
          Chapter 02 · Frontend, with Claude Code
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Building the frontend the way it works now
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          In Chapter 1 you saw the map: frontend asks, backend thinks,
          database remembers. Now we build the first part of it — the
          frontend — the way professionals actually build it in 2026: with an
          AI pair named Claude Code doing the typing, and you doing the
          directing. This is the exact workflow behind the site you are
          reading right now.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-frontend.jpg"
          alt="A single bright origin node casting straight guide-beams that position floating interface panels into an assembling screen layout."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          The new job: you direct, the AI types, you review. Judgment stays with you.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* ------------------------------------------------------------ */}
        <H2 n="01">The job changed. The understanding didn&rsquo;t.</H2>
        <P>
          Let me be straight with you about something colleges have not caught
          up with. Professional developers no longer type most of their code.
          Tools like <Term>Claude Code</Term> — an AI that runs in your
          terminal, reads your whole project, writes and edits files, and runs
          commands — do the typing. The developer&rsquo;s job moved one seat
          up: <Term>decide what to build, direct the AI, and review
          everything it produces</Term>.
        </P>
        <P>
          Here is the trap, and I want you to hear it early: if you skip
          understanding and just accept whatever the AI writes, you become
          exactly the person from Chapter 1 again — someone who has code but
          no picture, and who goes blank in interviews. The AI multiplies
          what you understand. It cannot replace it, because the reviewer is
          you. Everything in this chapter assumes you read Chapter 1.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="02">What frontend work is actually made of</H2>
        <P>
          Before the tools, know the material. Every frontend, in every
          framework, is the same seven jobs:
        </P>
        <ul className="mt-4 space-y-2.5">
          {[
            ["Screens (pages)", "what the user sees at each URL — /login, /dashboard, /profile."],
            ["Components", "reusable lego pieces — a button, a card, a navbar — built once, used everywhere."],
            ["State", "what the screen currently remembers — the cart items, whether the menu is open, what you typed."],
            ["Styling", "colours, sizes, spacing — the design made real."],
            ["Routing", "which URL shows which screen, and moving between them without reloading."],
            ["Talking to APIs", "sending requests to the backend and painting the responses — the loop from Chapter 1."],
            ["The unhappy paths", "loading spinners, error messages, empty screens — the part beginners skip and professionals are judged on."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-2.5 leading-relaxed text-zinc-300">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
              <span>
                <Term>{t}</Term> — {d}
              </span>
            </li>
          ))}
        </ul>
        <P>
          Every frontend interview question is one of these seven in
          disguise. Keep the list; we will touch all of them.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="03">Choosing a language is the secondary decision</H2>
        <P>
          Students agonise over &ldquo;React or Angular or Vue?&rdquo; as if
          it decides their life. It does not. Underneath every framework sits
          the same ground floor — HTML, CSS, JavaScript — and every framework
          is just an organised way of writing them. The seven jobs above stay
          the same; only the spelling changes.
        </P>
        <P>
          For this journey we will use <Term>React</Term> with{" "}
          <Term>Next.js</Term> and <Term>TypeScript</Term>, for two honest
          reasons: it is what companies in India hire for most, and
          TypeScript&rsquo;s type checking catches the AI&rsquo;s mistakes
          automatically — which matters more than ever when an AI writes the
          code. But understand this clearly: <Term>the process you learn in
          this chapter works with any stack</Term>. The process is the skill.
          The framework is a detail.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="04">Setting up Claude Code</H2>
        <P>
          Claude Code is a terminal program. You install it once, open it
          inside a project folder, and talk to it in plain language. It reads
          your files, proposes changes, shows you exactly what it wants to
          edit, and waits for your approval.
        </P>
        <Code title="one-time setup (needs Node.js installed)">{`npm install -g @anthropic-ai/claude-code

cd my-first-frontend     # go into your project folder
claude                   # start it — first run asks you to log in`}</Code>
        <P>
          Three things to learn on day one. First, <Term>/init</Term> — run
          it in any existing project and Claude writes its first CLAUDE.md
          (next section) by studying your code. Second, <Term>plan
          mode</Term> — before big tasks, ask Claude to plan first and show
          you the plan before touching files; you approve the plan, then it
          builds. Third, <Term>/clear</Term> — wipes the conversation so a
          new task starts fresh. There is also a VS Code extension if you
          prefer clicking to typing; same brain, different window.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="05">CLAUDE.md — your project&rsquo;s memory</H2>
        <P>
          Here is the single most important habit of AI-era development.
          Claude starts every session knowing nothing about your project
          except what it can read. <Term>CLAUDE.md</Term> is a plain text
          file at the root of your project that Claude reads automatically,
          every single session. It is where you write down what a new
          teammate would need to know — because that is exactly what Claude
          is: a very fast teammate with no memory of yesterday.
        </P>
        <Code title="CLAUDE.md — a real example for a student project">{`# CLAUDE.md

College notice-board app. Next.js 14 + TypeScript + Tailwind.
Frontend only for now — data comes from mock files in src/lib/data.

## Commands
- npm run dev     -> start on localhost:3000
- npm run build   -> production build (run before every commit)
- npm run lint    -> must pass, no warnings

## Structure
- src/app/        -> one folder per screen (route)
- src/components/ -> shared pieces; one component per file
- src/lib/        -> helpers, mock data, types
- docs/           -> specs live here; READ the relevant doc before building

## Rules
- TypeScript strict. Never use "any".
- Small components: if a file passes ~150 lines, split it.
- Every screen needs loading, error, and empty states.
- Do not add libraries without asking me first.`}</Code>
        <P>
          Notice what it contains: commands, structure, and rules — short,
          factual, no essays. And one discipline that separates juniors from
          professionals: <Term>when you correct Claude twice about the same
          thing, stop and put that correction into CLAUDE.md</Term>. From
          then on, every future session already knows. That is how the file
          grows — from real friction, not imagination.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="06">The documentation process — feed the AI real specs</H2>
        <P>
          Amateur AI coding looks like this: type &ldquo;make me a
          website&rdquo;, get something random, complain the AI is dumb.
          Professional AI coding looks like this: <Term>write down what you
          want first, as files in the project, then point the AI at
          them</Term>. Claude can read every file in your repo — so your
          documentation is not for humans only anymore. It is the AI&rsquo;s
          working instructions.
        </P>
        <Code title="docs/ — write these BEFORE building">{`docs/
  architecture.md    # the boxes-and-arrows drawing from Chapter 1, in words:
                     # what screens exist, what data each needs, what talks to what
  api-contract.md    # every request the backend will answer:
                     # "POST /login takes {email, password}, returns {token}"
  conventions.md     # naming, folder rules, how components are structured
  screens/
    dashboard.md     # one file per screen: what it shows, every state,
                     # what happens on every click`}</Code>
        <P>
          Then your build instruction becomes: &ldquo;Read
          docs/screens/dashboard.md and docs/api-contract.md, then build the
          dashboard screen following conventions.md.&rdquo; The difference in
          output quality is not small — it is the whole game. And notice the
          bonus: you just learned to write specifications, which is precisely
          what senior engineers and architects do. The AI made the junior
          skill (typing) cheap and the senior skill (specifying clearly)
          valuable. This chapter is teaching you the senior skill.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="07">MCPs — giving Claude hands and eyes</H2>
        <P>
          Out of the box, Claude Code can read files, write files, and run
          commands. <Term>MCP</Term> (Model Context Protocol) is a standard
          plug for giving it more abilities. Remember the API-as-menu idea
          from Chapter 1? MCP is the same idea pointed the other way: a menu
          of tools the AI is allowed to use.
        </P>
        <P>For frontend work, one MCP matters above all the rest:</P>
        <P>
          <Term>Playwright MCP — the eyes.</Term> Playwright is a tool that
          drives a real browser from code. Plugged into Claude, it means the
          AI can open your page, click your buttons, and take screenshots of
          what it built. Why does that change everything? Because without it,
          Claude writes UI code <em>blind</em> — it never sees the result.
          With it, the loop closes: build → open in browser → look → fix →
          look again. That is exactly how a human frontend developer works.
        </P>
        <Code title="adding MCPs (run inside your project)">{`# the browser — Claude can now open and SEE your pages
claude mcp add playwright -- npx @playwright/mcp@latest

# settings are saved in .mcp.json — commit it, and every
# teammate (and every future session) gets the same tools`}</Code>
        <P>
          Two more worth knowing, when you need them: a <Term>Figma
          MCP</Term> lets Claude read a designer&rsquo;s Figma file directly,
          so &ldquo;build this screen from the design&rdquo; becomes a real
          instruction; a <Term>GitHub MCP</Term> lets it work with issues and
          pull requests. Start with Playwright only — tools you are not using
          just eat the AI&rsquo;s attention.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="08">Folder structure — organised for humans, optimised for AI</H2>
        <P>
          Here is a truth that surprises people: <Term>a repo organised for
          AI is just a well-organised repo</Term>. The AI raises the reward
          for discipline and the punishment for mess. When every file is
          small and has one job, Claude finds the right place instantly and
          edits precisely. When everything lives in one 2000-line file, the
          AI gets as confused as a human — and breaks unrelated things.
        </P>
        <Code title="the structure — works for any framework">{`my-first-frontend/
  CLAUDE.md               # the project's memory  (section 05)
  .mcp.json               # the AI's tools        (section 07)
  docs/                   # the specs             (section 06)
    architecture.md
    api-contract.md
    conventions.md
    screens/
  src/
    app/                  # SCREENS — one folder per route
      page.tsx            #   home
      login/page.tsx      #   /login
      dashboard/page.tsx  #   /dashboard
    components/
      ui/                 # shared lego: Button.tsx, Card.tsx, Input.tsx
      notices/            # feature pieces: NoticeList.tsx, NoticeCard.tsx
    lib/
      api.ts              # ALL backend calls live here — one door out
      types.ts            # shared TypeScript types
      data.ts             # mock data until the backend exists
  public/                 # images, icons, fonts
  package.json`}</Code>
        <P>The rules that make this work, in plain words:</P>
        <ul className="mt-4 space-y-2.5">
          {[
            ["One obvious home for everything.", "A new API call goes in lib/api.ts. A shared button goes in components/ui. Nobody — human or AI — should ever wonder where something belongs."],
            ["Small files, one job each.", "Claude edits by file. Small files mean precise edits and readable diffs you can actually review."],
            ["Group by feature, not by type.", "Everything about notices sits together in components/notices — so “change the notice card” touches one folder, not five."],
            ["One door to the backend.", "All requests go through lib/api.ts. When the API changes, one file changes — and Claude always knows where the network lives."],
            ["Types + lint as the safety net.", "TypeScript and the linter catch the AI's mistakes mechanically, before your eyes have to."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-2.5 leading-relaxed text-zinc-300">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
              <span>
                <Term>{t}</Term> {d}
              </span>
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------------------ */}
        <H2 n="09">The loop — how a feature actually gets built</H2>
        <P>
          Now put it all together. This is the architecture of the{" "}
          <em>development system</em> itself — you, the AI, its tools, and
          your repo — and the loop you will run many times a day:
        </P>
        <DevSystemDiagram />
        <ol className="mt-6 space-y-3">
          {[
            ["Specify", "Write (or update) the screen's doc in docs/. Plain words: what it shows, every state, every click."],
            ["Plan", "Ask Claude to read the docs and propose a plan — which files it will create and why. Read the plan. Fix the plan, not the code — it is ten times cheaper."],
            ["Build", "Approve. Claude writes the files, runs lint and the build, fixes its own errors."],
            ["Verify", "Claude opens the page with Playwright, screenshots it, and compares against the spec. You look too — your eyes are the final gate."],
            ["Review & commit", "Read the diff — every line. Ask about anything you don't understand (it will explain patiently, forever). Then commit with git: the diary entry from Chapter 1."],
            ["Clear", "/clear, next task. Small tasks, fresh context, better results."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 font-mono text-[11px] text-ice">
                {i + 1}
              </span>
              <span className="leading-relaxed text-zinc-300">
                <Term>{t}.</Term> {d}
              </span>
            </li>
          ))}
        </ol>
        <P>
          One session with this loop and you will feel it: the bottleneck is
          no longer typing speed. It is how clearly you can say what you
          want, and how sharply you can judge what came back. Those two
          skills are the career.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="10">Context hygiene — the AI&rsquo;s working memory</H2>
        <P>
          One limitation to respect from day one. Claude&rsquo;s working
          memory for a session — called the <Term>context window</Term> — is
          large but finite, and everything competes for it: your files, the
          conversation, its own thinking. When it fills up, quality quietly
          drops; the AI starts forgetting decisions from twenty messages ago.
        </P>
        <P>
          The fix is habits, not heroics. Keep tasks small — &ldquo;build
          the login screen&rdquo;, not &ldquo;build the whole app&rdquo;.
          Run <Term>/clear</Term> between tasks so each one starts fresh —
          CLAUDE.md and your docs survive, which is exactly why they live in
          files and not in the chat. And point Claude at the two or three
          relevant files instead of saying &ldquo;look at everything&rdquo;.
          Files are the project&rsquo;s permanent memory; the chat is
          disposable. Act accordingly.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="11">What you must still learn by hand</H2>
        <P>
          I will not lie to you the way the internet does. There is a failure
          mode called building on vibes — accepting AI output you cannot
          read. It works for a demo and collapses the day something breaks
          and the AI&rsquo;s fix also breaks. Then you are helpless in front
          of your own project — and an interviewer can smell it in two
          questions.
        </P>
        <P>
          So three non-negotiables. <Term>Read every diff</Term> — if a line
          confuses you, ask Claude to explain it; being tutored by the same
          tool that wrote the code is the most underrated feature it has.{" "}
          <Term>Learn to read HTML, CSS and JavaScript</Term> even though you
          rarely write them from scratch — a reviewer must read the language
          fluently. And <Term>learn the browser&rsquo;s DevTools</Term> —
          right-click, Inspect — because that is where the frontend tells you
          the truth about what it is actually doing.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="12">Do this today</H2>
        <P>
          Reading builds nothing. Today: install Claude Code, make an empty
          folder, and write two files yourself by hand — a CLAUDE.md copied
          from section 05 and edited to your project, and{" "}
          <span className="font-mono text-sm text-ice">docs/screens/notice-board.md</span>{" "}
          describing a college notice board: a list of notices, a search
          box, a &ldquo;new notice&rdquo; form, plus loading, error, and
          empty states. Then tell Claude: &ldquo;Read the docs and build
          it.&rdquo; Watch the loop happen. Read every file it creates. Ask
          it to explain the two you understand least.
        </P>
        <P>
          When you can walk a friend through that folder — why every file
          exists and what each one does — you have done something most
          final-year students in this country have not: shipped a real
          frontend the way the industry actually ships them. The deeper
          version of this workflow — where it scales to full products — is
          written up in{" "}
          <Link
            href="/blog/one-architect-claude-mcp-full-squad/"
            className="text-ice underline decoration-cyan/30 underline-offset-4 hover:decoration-cyan"
          >
            One Architect + Claude + MCP = A Full Engineering Squad
          </Link>
          . Next chapter, we cross to the other side of the wire and build
          the backend the same way.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/domains/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 01 · Domains
          </Link>
          <Link
            href="/final-year-projects/journey/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Back to the 16-day journey
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
            Chapter 03 · coming next
          </span>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
