import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import TapJourney from "./TapJourney";
import { PipelineDiagram, ThreeTierDiagram } from "./Diagrams";

const DESCRIPTION =
  "Frontend, backend, database, dev and production, bugs and hotfixes — the map of how software actually works, explained in plain words for students who only got syntax in college.";

export const metadata: Metadata = {
  title: "Chapter 1 — Domains: How Software Actually Works, in Plain Words",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/domains/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 1 — Domains",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/domains/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-domains.jpg`],
  },
};

/* Consistent typography for a long read: one place to tune it. */
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

/* Numbered walk-through step. */
function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 font-mono text-[11px] text-ice">
        {n}
      </span>
      <span className="leading-relaxed text-zinc-300">{children}</span>
    </li>
  );
}

export default function DomainsChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 1 — Domains", path: "/final-year-projects/journey/domains" },
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
          Chapter 01 · Domains
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          How software actually works, in plain words
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Before we touch AI, you need the map of normal software. Not
          definitions to memorise — the actual picture of what is happening
          when someone uses an app. Read this like a story. Every big word is
          explained the moment it appears.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-domains.jpg"
          alt="Scattered loose bricks on the left, an arrow, and the same bricks assembled into one structured building on the right — knowing pieces versus seeing the system."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          College gives you the bricks. This chapter is the building.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* ------------------------------------------------------------ */}
        <H2 n="01">Why you feel stuck, and why it is not your fault</H2>
        <P>
          Here is something I wish someone had told me in my final year.
          College teaches you <Term>languages</Term> — Java, Python, C. You
          learn loops, arrays, maybe some SQL queries. You pass the exams. And
          then you sit in an interview and someone asks &ldquo;so, walk me
          through how a website works&rdquo; and your mind goes blank.
        </P>
        <P>
          It is not because you are weak at coding. It is because college gave
          you <Term>bricks</Term> and never showed you a{" "}
          <Term>building</Term>. You know what a for-loop is. Nobody showed
          you where that for-loop lives, what it talks to, who runs it, or
          what happens when a real user on a real phone touches a real button.
        </P>
        <P>
          The industry does not run on syntax. It runs on{" "}
          <Term>systems</Term> — pieces connected to each other, each with a
          job. Once you see the whole picture, interviews stop being scary,
          because most interview questions are really just asking: &ldquo;do
          you see the picture, or only the bricks?&rdquo; This chapter is that
          picture. I have spent around five years building these systems for
          companies and for myself, and this is the explanation I give every
          junior on day one.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="02">Start with one tap</H2>
        <P>
          Open Zomato in your head. You tap <Term>&ldquo;Place order&rdquo;</Term>.
          Within two seconds the screen says &ldquo;Order confirmed&rdquo;. Simple,
          right? Now let me show you what actually happened in those two
          seconds, because this one tap contains almost everything in software.
        </P>
        <ol className="mt-6 space-y-4">
          <Step n={1}>
            Your phone shows you buttons, colours, the cart, the total. All of
            that visible part is the <Term>frontend</Term>.
          </Step>
          <Step n={2}>
            When you tap, your phone does not decide anything itself. It sends
            a message over the internet — &ldquo;this user wants to order these
            items&rdquo; — to a computer owned by Zomato. That message is
            called a <Term>request</Term>.
          </Step>
          <Step n={3}>
            That Zomato computer runs the <Term>backend</Term> — the brain. It
            checks: is this user logged in? Is the restaurant open? Is the
            price correct? Did the payment go through?
          </Step>
          <Step n={4}>
            To answer those questions the backend needs stored facts — your
            account, the menu, past orders. It asks the{" "}
            <Term>database</Term>, which is where all of that is kept safely.
          </Step>
          <Step n={5}>
            The backend makes its decision and sends a message back to your
            phone — a <Term>response</Term> — saying &ldquo;order placed, here
            is the order number&rdquo;.
          </Step>
          <Step n={6}>
            The frontend receives that response and changes the screen to
            &ldquo;Order confirmed&rdquo;. You saw two seconds. Underneath, a
            full round trip happened.
          </Step>
        </ol>
        <P>
          Every app you have ever used — WhatsApp, Instagram, your bank,
          IRCTC — is this same loop, repeated millions of times a day.{" "}
          <Term>Frontend asks. Backend thinks. Database remembers.</Term>{" "}
          Hold onto that one line; the rest of this chapter just zooms into
          each part.
        </P>
        <TapJourney />

        {/* ------------------------------------------------------------ */}
        <H2 n="03">Frontend — everything the user can see and touch</H2>
        <P>
          The frontend is the part of the app that runs on the{" "}
          <Term>user&rsquo;s own device</Term> — their phone or their browser.
          Buttons, forms, animations, the login screen, the red error message
          when your password is wrong. If you can see it or tap it, it is
          frontend.
        </P>
        <P>
          On the web it is built from three things. <Term>HTML</Term> is the
          skeleton — &ldquo;there is a heading here, a button there&rdquo;.{" "}
          <Term>CSS</Term> is the paint and clothing — colours, sizes,
          spacing. <Term>JavaScript</Term> is the movement — what happens when
          you click, type, or scroll. Tools like <Term>React</Term> (which
          you will hear constantly) are just organised ways of writing that
          JavaScript so a big app does not become a mess.
        </P>
        <P>
          One thing juniors take time to accept: the frontend is{" "}
          <Term>never trusted</Term>. It runs on the user&rsquo;s device, and
          a clever user can modify anything on their own device. So the
          frontend can show a price, but the backend must re-check that price
          before charging money. Remember this — it explains half of why
          backends exist.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="04">Backend — the brain that runs on someone else&rsquo;s computer</H2>
        <P>
          The backend is a program that runs, day and night, on a computer
          the company controls. That computer is called a{" "}
          <Term>server</Term> — and I want to remove the mystery from that
          word right now. A server is not a magical thing. It is a normal
          computer, usually sitting in a huge air-conditioned building called
          a <Term>data centre</Term>, with one difference: it never sleeps
          and it is always connected to the internet, waiting for requests.
        </P>
        <P>
          The backend holds the <Term>rules of the business</Term>. Nobody can
          withdraw more money than their balance. A student cannot see another
          student&rsquo;s marks. An order cannot be placed if the restaurant
          is closed. This logic lives in the backend precisely because users
          cannot touch it or tamper with it. Backends are written in languages
          you already know of — Java, Python, JavaScript (through{" "}
          <Term>Node.js</Term>), C#. Same languages you learned; different
          seat in the system.
        </P>
        <P>
          Now, how do frontend and backend talk without confusion? Through an{" "}
          <Term>API</Term>. People make this word sound heavy; it is not. An
          API is simply the <Term>fixed menu of requests</Term> a backend
          agrees to answer. Like a restaurant menu: you cannot walk into the
          kitchen, but you can order anything on the menu and you know what
          you will get. &ldquo;Send email and password to{" "}
          <span className="font-mono text-sm text-ice">/login</span>, and I
          will reply with yes or no&rdquo; — that is one item on the menu. The
          messages travel in a simple text format called <Term>JSON</Term>,
          which is nothing more than labelled values:{" "}
          <span className="font-mono text-sm text-ice">
            {'{ "name": "Asha", "total": 250 }'}
          </span>
          . That is genuinely all JSON is.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="05">Database — the memory that survives</H2>
        <P>
          Here is a question worth pausing on: when the backend program is
          restarted, everything in its memory is wiped. So where do ten years
          of user accounts live? Not in the backend. They live in the{" "}
          <Term>database</Term> — a separate program whose only job is to
          store data safely and hand it back fast, even if the power goes,
          even if there are ten crore rows.
        </P>
        <P>
          The most common kind looks like Excel sheets that follow strict
          rules: tables with rows and columns. A{" "}
          <span className="font-mono text-sm text-ice">users</span> table, an{" "}
          <span className="font-mono text-sm text-ice">orders</span> table.
          You talk to it in <Term>SQL</Term> — the query language you saw in
          college — and now you know where it actually gets used. Databases
          like MySQL and Postgres work this way. There is another family
          (like MongoDB) that stores data as flexible documents instead of
          strict tables — you will meet both; the idea is the same.
        </P>
        <P>
          Keep the division of labour clean in your head: the database{" "}
          <Term>remembers, it does not think</Term>. The backend thinks. The
          frontend shows. When an interviewer asks &ldquo;where would you
          check if the coupon is valid?&rdquo; — you now know the coupon is{" "}
          <em>stored</em> in the database, but the <em>checking</em> is
          backend work.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="06">Put together, that picture is &ldquo;architecture&rdquo;</H2>
        <P>
          You have probably heard people say &ldquo;system architecture&rdquo;
          in a serious voice. Here is the secret: architecture is just{" "}
          <Term>the drawing of which parts exist and who talks to whom</Term>.
          Frontend → backend → database, with arrows. That is already an
          architecture — the simplest and most common one, sometimes called{" "}
          <Term>three-tier</Term> because it has three layers.
        </P>
        <P>
          Real companies add more boxes to the drawing as they grow — a box
          that remembers frequent answers so the database is not disturbed
          every time (a <Term>cache</Term>), a box that sends emails, a box
          that handles payments. Architecture work is deciding which boxes to
          have and how they connect, <em>before</em> writing code. When we
          design AI systems later in this journey, we are doing exactly this —
          adding a few new boxes to the same drawing you now understand.
        </P>
        <ThreeTierDiagram />

        {/* ------------------------------------------------------------ */}
        <H2 n="07">Your laptop vs the real world: dev and production</H2>
        <P>
          Now a part almost no college covers, and every company lives by.
          The app exists in more than one place at the same time.
        </P>
        <P>
          The copy on a developer&rsquo;s own laptop is the{" "}
          <Term>development environment</Term> (everyone says{" "}
          <Term>dev</Term>). Here you can break things freely. Fake users,
          fake money, fake data. Nothing real is harmed.
        </P>
        <P>
          The copy that real users are touching right now — real money, real
          data — is the <Term>production environment</Term> (everyone says{" "}
          <Term>prod</Term>). Production is sacred. You never experiment
          there, for the same reason a surgeon does not practise on a live
          patient. Most companies keep one more copy in between, called{" "}
          <Term>staging</Term> — a dress rehearsal that looks exactly like
          production but with test data, where the team checks everything one
          last time.
        </P>
        <P>
          So the honest life of any feature is: built on a laptop in dev →
          tested on staging → released to production. When you hear someone
          say &ldquo;it works on my machine&rdquo; as a joke — this is the
          joke. It worked in dev, and broke in production, because the two
          worlds are never perfectly identical.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="08">How code travels: git, deployment, releases</H2>
        <P>
          How does code physically move from a laptop to production? First,
          every company keeps its code in <Term>git</Term> — think of it as a
          diary of every change ever made, with the author&rsquo;s name and
          date on each entry. Ten developers can work on the same app without
          overwriting each other, and any mistake can be traced and undone.
        </P>
        <P>
          When a change is ready, a teammate reads it before it is accepted —
          that is a <Term>code review</Term>, and it is normal, not an insult.
          Then the new version is packaged and copied onto the servers. That
          act — putting new code onto the servers so users get it — is called{" "}
          <Term>deployment</Term>. A <Term>release</Term> is the named bundle
          of changes that went out; that is what version numbers like{" "}
          <span className="font-mono text-sm text-ice">v2.3</span> mean on
          the Play Store — third set of fixes on the second big version.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="09">When things break: bugs, hotfixes, rollbacks</H2>
        <P>
          Software breaks. Not sometimes — constantly. Accepting this
          calmly is half of becoming a professional. A <Term>bug</Term> is any
          behaviour that is not what was intended — a wrong total, a button
          that does nothing, a crash. Bugs found in dev are cheap; you just
          fix them. Bugs found in production are the expensive ones, because
          real users are being hurt while the clock runs.
        </P>
        <P>
          For a production bug that cannot wait — payments failing, login
          broken — the team writes the smallest possible fix and pushes it
          straight out, skipping the usual relaxed schedule. That emergency
          repair is a <Term>hotfix</Term>. &ldquo;Hot&rdquo; because it is
          applied to a live, running system, like changing a tyre while the
          car is still moving.
        </P>
        <P>
          And if a new release itself caused the disaster, there is an undo
          button: a <Term>rollback</Term> — put the previous working version
          back on the servers first, breathe, and investigate afterwards.
          Users get a working app back in minutes while the team debugs in
          peace. Notice the mindset here: professionals do not aim for
          &ldquo;never break&rdquo;. They aim for &ldquo;when it breaks, we
          recover fast&rdquo;.
        </P>
        <PipelineDiagram />

        {/* ------------------------------------------------------------ */}
        <H2 n="10">The domains — who does what</H2>
        <P>
          Now you can understand job titles, because every title is just
          ownership of one part of the picture you have built in this
          chapter.
        </P>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-left">
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Role
                </th>
                <th className="px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Owns, in plain words
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ["Frontend developer", "Everything the user sees and touches — screens, buttons, forms."],
                ["Backend developer", "The brain on the server — rules, APIs, security, talking to the database."],
                ["Full-stack developer", "Both of the above. Not a superhero — just comfortable on both sides of the request."],
                ["Mobile developer", "Frontend, but for Android/iOS apps instead of the browser."],
                ["Database administrator (DBA)", "Keeps the memory safe, fast, and backed up as data grows huge."],
                ["DevOps engineer", "The road between laptop and production — servers, deployments, monitoring."],
                ["QA / Tester", "Tries to break the app before users do, and writes tests that catch bugs automatically."],
                ["UI/UX designer", "Decides what the screens should look like and feel like before anyone codes them."],
                ["Product manager", "Decides what should be built and why — the voice of the user and the business."],
              ].map(([role, owns]) => (
                <tr key={role}>
                  <td className="whitespace-nowrap px-5 py-3.5 font-medium text-zinc-100">
                    {role}
                  </td>
                  <td className="px-5 py-3.5 leading-relaxed text-zinc-400">{owns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          When someone asks &ldquo;which domain do you want to work in?&rdquo;
          — this table is what they mean. And here is the comforting part:
          you do not have to choose today. You have to <em>understand the
          whole picture</em> today. The choice comes from building.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="11">Why interviews suddenly make sense</H2>
        <P>
          Go back to the question that used to scare you: &ldquo;what happens
          when you type a URL and press enter?&rdquo; The interviewer is not
          testing memorised trivia. They are checking one thing — do you see
          the system, or only the syntax? You can now answer it in one
          breath: the browser (frontend) sends a request across the internet
          to a server, the backend checks the rules and asks the database for
          what it remembers, a response comes back, and the screen updates.
        </P>
        <P>
          Every &ldquo;hard&rdquo; question is a zoom-in on some part of this
          chapter. &ldquo;Where would you validate this?&rdquo; — backend,
          because the frontend can&rsquo;t be trusted. &ldquo;Why is the app
          slow?&rdquo; — somewhere on that round trip; find which leg.
          &ldquo;What if the deploy breaks?&rdquo; — rollback. The words stop
          being vocabulary and start being places on a map you own.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="12">What to do with this chapter</H2>
        <P>
          Read it twice. Then close it and explain the Zomato tap to a friend
          in your own words, in your own language. If you can do that without
          looking, this chapter is yours — teaching it is the proof of
          learning it. Everything in the 16 days ahead, including every AI
          system we design, is built on top of exactly this picture: something
          asks, something thinks, something remembers. From here on, we start
          adding the AI boxes to that drawing.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Back to the 16-day journey
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
            Chapter 02 · coming next
          </span>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
