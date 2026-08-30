import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "final-year-project-presentation-ppt",
  title: "Final Year Project Presentation & PPT — Slide By Slide",
  h1: "Final year project presentation and PPT, slide by slide",
  description:
    "How to build and deliver the final year project PPT for your viva: the slide-by-slide structure, how many slides, what examiners look at, demo tips, and handling questions.",
  tldr: "A final year project PPT is about 12 to 18 slides for a 10 to 15 minute viva: title and problem, objectives, existing versus proposed, architecture and design diagrams, tech stack and modules, screenshots and a live demo, testing and results, then limitations, future scope and conclusion. One idea per slide, and never read the slide aloud.",
  category: "Presentation",
  publishedAt: "2026-07-27",
  readingMinutes: 9,
  ogImage: "/og/campus/templates.jpg",
  howTo: {
    steps: [
      {
        name: "1. Title and problem",
        text: "Open with a clean title slide and one slide that states the problem concretely — who has it and why it is worth solving.",
      },
      {
        name: "2. Objectives, existing vs proposed",
        text: "Your numbered objectives, then a side-by-side of what already exists against what your system does differently.",
      },
      {
        name: "3. Architecture and design diagrams",
        text: "The architecture diagram, plus the ER and DFD, shown one at a time and explained rather than read out.",
      },
      {
        name: "4. Tech stack and modules",
        text: "The technologies you used with a one-line reason each, and the modules the system breaks into.",
      },
      {
        name: "5. Screenshots and live demo",
        text: "Screenshots of the working app as a fallback, then a short, rehearsed live demo of the core flow.",
      },
      {
        name: "6. Testing and results",
        text: "How you tested, a small test-case table, and what the system achieves against each objective.",
      },
      {
        name: "7. Limitations, future scope, conclusion",
        text: "An honest limitations slide, three or four concrete future extensions, and a one-line conclusion.",
      },
    ],
  },
  faq: [
    {
      question: "How many slides should a final year project presentation have?",
      answer:
        "Aim for 12 to 18 slides for a 10 to 15 minute viva. Fewer and you look underprepared; more and you will rush or overrun. One idea per slide, and never read the slide aloud — the slide is the summary, you are the detail.",
    },
    {
      question: "What do examiners look at in a project presentation?",
      answer:
        "Whether you understand your own system. They watch to see if your diagrams match your demo, if you can explain a design decision instead of reciting it, and if you handle a hard question honestly. A working demo and a calm answer beat a beautiful deck.",
    },
    {
      question: "Should I do a live demo or use screenshots?",
      answer:
        "Do both. Keep screenshots of every core screen in the deck as a fallback in case the laptop, network or projector fails, but run a short live demo of the main flow if you can. Rehearse the exact click path with seeded, realistic data so nothing breaks on stage.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        The presentation is where the project is defended, not explained. The panel
        has your report; the viva exists to check that you built what it describes
        and understand it. The deck is a supporting act &mdash; its job is to keep
        you on track and give the examiners something to look at while you talk. Aim
        for 12 to 18 slides, one idea each, for a 10 to 15 minute slot.
      </p>
      <p>
        One rule sits above the structure: <strong>the deck, the diagrams and the
        demo must all describe the same system.</strong> A slide showing a feature
        your demo cannot perform is the fastest way to turn a friendly viva hostile.
        Everything below assumes the deck matches the code on your laptop.
      </p>

      <h2>1. Title and problem</h2>
      <ul>
        <li>Title slide — project name, your name, guide, college, roll number</li>
        <li>The problem, stated concretely — who has it and why it matters</li>
      </ul>
      <p>
        Do not spend three slides warming up. One clean title slide, then one slide
        that names the real problem. If the examiner understands the problem by the
        end of slide two, the rest of the talk has a spine.
      </p>

      <h2>2. Objectives, existing vs proposed</h2>
      <ul>
        <li>Objectives — the numbered list straight from your synopsis</li>
        <li>Existing systems and what each does badly</li>
        <li>Your proposed system, side by side against them</li>
      </ul>
      <p>
        A simple two-column &ldquo;existing versus proposed&rdquo; slide does a lot
        of work: it justifies the project&rsquo;s existence in one glance and sets
        up every result you will claim later. Keep the objectives to the same
        wording you used in the report so nothing contradicts.
      </p>

      <h2>3. Architecture and design diagrams</h2>
      <ul>
        <li>Architecture diagram — the components and what flows between them</li>
        <li>ER diagram matching your actual database</li>
        <li>Data flow diagram, level 0 and level 1</li>
      </ul>
      <p>
        Show one diagram per slide and explain it &mdash; trace the flow with your
        cursor rather than reading labels. These slides are where examiners test
        whether you designed the system or downloaded it, so be ready to defend why
        a table is separate or why a flow is asynchronous.
      </p>

      <h2>4. Tech stack and modules</h2>
      <ul>
        <li>The technologies used, with a one-line reason for each choice</li>
        <li>The modules the system breaks into</li>
        <li>Which modules are core and which are supporting</li>
      </ul>
      <p>
        &ldquo;We used MongoDB because the data is document-shaped and the schema
        evolved during the build&rdquo; is an answer. &ldquo;We used MongoDB
        because it is popular&rdquo; is not. Every tool on this slide is an
        invitation for a question, so have a reason ready for each.
      </p>

      <h2>5. Screenshots and live demo</h2>
      <ul>
        <li>Screenshots of every core screen, in the deck as a fallback</li>
        <li>A short live demo of the main flow, if the setup allows it</li>
        <li>Seeded, realistic data &mdash; never &ldquo;asdf&rdquo; and &ldquo;test&rdquo;</li>
      </ul>
      <p>
        This is the part the panel came to see. Rehearse the exact click path until
        it is automatic, and seed the database with realistic data beforehand so the
        screens look like a real product. Keep screenshots in the deck too: if the
        laptop, network or projector fails, you present the flow from those and lose
        nothing.
      </p>

      <h2>6. Testing and results</h2>
      <ul>
        <li>How you tested &mdash; unit, integration, user acceptance</li>
        <li>A small test-case table: input, expected, actual, pass or fail</li>
        <li>What the system achieves against each objective from slide two</li>
      </ul>
      <p>
        Include a test that catches bad input, not only tests that pass. A results
        slide that maps back to the objectives you opened with closes the loop and
        makes the whole talk feel finished rather than merely stopped.
      </p>

      <h2>7. Limitations, future scope, conclusion</h2>
      <ul>
        <li>Limitations &mdash; stated honestly, before the panel finds them</li>
        <li>Future scope &mdash; three or four concrete extensions</li>
        <li>Conclusion &mdash; one line on what was built and learned</li>
      </ul>
      <p>
        Every system has limits, and a slide that owns them reads as maturity, not
        weakness. Make the future scope specific &mdash; &ldquo;add SMS alerts using
        the existing notification module&rdquo; beats &ldquo;the system can be
        enhanced further&rdquo;. Then close in one line and stop; a talk that ends
        cleanly leaves a better impression than one that trails off.
      </p>

      <h2>Handling the questions</h2>
      <ol>
        <li>
          <strong>Know your own code.</strong> The surest questions are about the
          part of the system you understand least. Read your own report and be able
          to explain any diagram in it.
        </li>
        <li>
          <strong>If you do not know, say so.</strong> &ldquo;I did not implement
          that; here is how I would&rdquo; is a strong answer. Bluffing is the one
          thing an experienced panel always catches.
        </li>
        <li>
          <strong>Answer the question asked.</strong> Do not launch into a rehearsed
          speech. Listen, answer in a sentence or two, and stop.
        </li>
        <li>
          <strong>Lean on your scope.</strong> &ldquo;Why does it not do X&rdquo; is
          fully answered by the out-of-scope boundary you declared in the synopsis.
        </li>
        <li>
          <strong>Stay calm on a hostile question.</strong> A hard question is a
          chance to show you understand the system, not an accusation. Treat it as
          one.
        </li>
      </ol>

      <hr />

      <p>
        Every project on this site ships with the deck, the report, the diagrams and
        the synopsis already written to match the code &mdash; and each one is
        walked through with you in live sessions so the demo and the answers are
        yours, not memorised.{" "}
        <Link href="/final-year-projects/">See the projects</Link>, and prepare with{" "}
        <Link href="/final-year-projects/guides/final-year-project-viva-questions/">
          the viva questions panels actually ask
        </Link>{" "}
        and the{" "}
        <Link href="/final-year-projects/guides/final-year-project-report-format/">
          report format that the deck should match
        </Link>
        . Need one built and rehearsed end to end? Start with a{" "}
        <Link href="/final-year-projects/custom/">custom build</Link>.
      </p>
    </>
  );
}
