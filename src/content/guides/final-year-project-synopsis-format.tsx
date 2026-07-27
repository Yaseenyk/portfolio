import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "final-year-project-synopsis-format",
  title: "Final Year Project Synopsis Format — Section By Section",
  h1: "Final year project synopsis format, section by section",
  description:
    "How to write a final year project synopsis that gets approved: what each section needs, the standard structure, the right length, and the mistakes that get a synopsis sent back.",
  category: "Documentation",
  publishedAt: "2026-07-27",
  readingMinutes: 9,
  ogImage: "/social/portal-wide.jpg",
  howTo: {
    steps: [
      {
        name: "1. Title and problem statement",
        text: "A specific, buildable title, and a problem stated concretely — who has it, why it matters, and why existing options fall short.",
      },
      {
        name: "2. Objectives you can be held to",
        text: "A short numbered list of outcomes, each a thing the finished system will do, phrased so a panel can check whether you met it.",
      },
      {
        name: "3. Scope and what is out of scope",
        text: "Draw the boundary explicitly: what the project covers and, just as important, a declared list of what it deliberately does not.",
      },
      {
        name: "4. Proposed system",
        text: "Describe the system you intend to build in plain terms, with a simple block or architecture sketch and how it improves on what exists.",
      },
      {
        name: "5. Tools and technologies",
        text: "The stack you will actually use — language, framework, database, libraries — named specifically, not a menu of everything you have heard of.",
      },
      {
        name: "6. Modules",
        text: "Break the system into the four to seven modules you will build, each with a one-line description of what it does.",
      },
      {
        name: "7. Feasibility",
        text: "A short honest note on technical, economic and time feasibility — that the stack is known to you and the scope fits the semester.",
      },
      {
        name: "8. Timeline",
        text: "A week-by-week or phase-by-phase plan from approval to submission, so the guide can see the work is planned, not improvised.",
      },
      {
        name: "9. References",
        text: "A handful of real sources — papers, docs, or existing systems — in your department's citation style.",
      },
    ],
  },
  faq: [
    {
      question: "How long should a final year project synopsis be?",
      answer:
        "Most colleges expect 8 to 15 pages, but your department's format document is the only length that matters. A synopsis is a proposal, not a report — it should be short enough to read in one sitting and specific enough to approve without a second meeting.",
    },
    {
      question: "What is the difference between a synopsis and a report?",
      answer:
        "The synopsis is submitted for approval before you build. It states the problem, the proposed solution, the tools and the timeline, so the guide can sign off on the idea. The report is written after, and documents the system you actually built, with full design, testing and results.",
    },
    {
      question: "Why do synopses get rejected?",
      answer:
        "Usually because the scope is too large for one semester, the problem is vague, or the objectives cannot be checked. Guides also send back a synopsis that is really a rebuild of an existing app with nothing new, or one whose stack the student clearly cannot use yet.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        The synopsis is the document you submit for approval before you write a
        single line of code. It is a proposal: it tells your guide what you intend
        to build, why it is worth building, and that you have a realistic plan to
        finish it in a semester. Get it signed and you have a green light. Get it
        wrong and you lose weeks arguing about the idea instead of building it.
      </p>
      <p>
        Your department has a format document, and it overrides everything below on
        length, margins and section order. What follows is the structure almost
        every Indian college converges on, and what actually belongs in each
        section so the synopsis is approved on the first pass.
      </p>

      <h2>1. Title and problem statement</h2>
      <ul>
        <li>A title that is specific and buildable, not a slogan</li>
        <li>The problem stated concretely — who has it and why it matters</li>
        <li>What people do today, and where that falls short</li>
      </ul>
      <p>
        A guide approves a synopsis they can picture as a finished system.
        &ldquo;Smart AI-based platform for everything&rdquo; is not that.
        &ldquo;A web app that lets a small blood bank match donors to requests by
        blood group and location&rdquo; is. The title should already hint at the
        scope.
      </p>

      <h2>2. Objectives you can be held to</h2>
      <ul>
        <li>A numbered list, usually three to five items</li>
        <li>Each objective is something the finished system will do</li>
        <li>Phrased so a panel can check whether you met it</li>
      </ul>
      <p>
        Write objectives as outcomes, not activities. &ldquo;To learn React&rdquo;
        is not an objective. &ldquo;To let a user register, list their available
        stock, and receive a request notification&rdquo; is — every clause is
        testable, and later maps straight to a module and a test case.
      </p>

      <h2>3. Scope and what is out of scope</h2>
      <ul>
        <li>What the project covers, in plain terms</li>
        <li>An explicit list of what it deliberately does not do</li>
        <li>The user roles the system supports</li>
      </ul>
      <p>
        The out-of-scope list is the cheapest defence you will ever write. It stops
        the scope creeping during the build, and it answers the viva question
        &ldquo;why does it not do X&rdquo; before it is asked. Declare it now while
        you still have the leverage to say no.
      </p>

      <h2>4. Proposed system</h2>
      <ul>
        <li>A plain-language description of what you intend to build</li>
        <li>A simple block or architecture sketch — boxes and arrows are enough</li>
        <li>How it improves on the existing options you named earlier</li>
      </ul>
      <p>
        This is the heart of the synopsis. Keep it concrete. One clear diagram of
        the parts and what flows between them tells a guide more than three
        paragraphs of adjectives, and it becomes the seed of your report&rsquo;s
        design chapter.
      </p>

      <h2>5. Tools and technologies</h2>
      <ul>
        <li>Language and framework, named specifically</li>
        <li>Database, and why it fits the data you are storing</li>
        <li>Key libraries or services you already know you will need</li>
      </ul>
      <p>
        List the stack you will actually use, not every technology you have heard
        of. A menu of ten frameworks signals that you have not decided. A short,
        deliberate list signals that you have. Pick tools you can already use — the
        semester is for building, not for learning a stack from zero.
      </p>

      <h2>6. Modules</h2>
      <ul>
        <li>Four to seven modules the system breaks into</li>
        <li>A one-line description of what each module does</li>
        <li>An indication of which are core and which are optional</li>
      </ul>
      <p>
        Modules are how you show the work is bounded. They map one-to-one onto your
        objectives and, later, onto the chapters of your report. If you cannot break
        the system into clean modules on paper, the scope is not clear enough yet.
      </p>

      <h2>7. Feasibility</h2>
      <ul>
        <li>Technical — the stack is known to you and the problem is solvable</li>
        <li>Economic — it runs on free or already-available tools</li>
        <li>Time — the scope genuinely fits the semester</li>
      </ul>
      <p>
        Keep this honest and short. A guide has seen enough over-ambitious
        synopses to value one that admits its limits. Time feasibility is the one
        students underestimate most — a plan that only works if nothing goes wrong
        is not feasible.
      </p>

      <h2>8. Timeline</h2>
      <ul>
        <li>A week-by-week or phase-by-phase plan from approval to submission</li>
        <li>Build phases mapped to your modules</li>
        <li>Time reserved at the end for testing, the report and the deck</li>
      </ul>
      <p>
        A Gantt chart or a simple phase table both work. The point is to show the
        work is planned rather than improvised. Reserve real time at the end for
        documentation and testing — the students who run out of time run out of it
        here, not in the build.
      </p>

      <h2>9. References</h2>
      <ul>
        <li>A handful of real sources — papers, documentation, existing systems</li>
        <li>In your department&rsquo;s citation style</li>
      </ul>
      <p>
        For MCA and M.Tech, cite actual papers. For BCA and diploma, a survey of
        the existing applications you are improving on is usually enough. Either
        way, keep them real — a padded reference list is easy to spot and adds
        nothing.
      </p>

      <h2>The mistakes that get a synopsis sent back</h2>
      <ol>
        <li>
          <strong>Scope too large for one semester.</strong> The single most common
          reason. A guide would rather approve a small project done well than a
          grand one that will never ship.
        </li>
        <li>
          <strong>A vague problem.</strong> If the problem could describe any app,
          the objectives will be vague too, and nothing can be checked at the end.
        </li>
        <li>
          <strong>Objectives that cannot be measured.</strong> &ldquo;To make a
          user-friendly system&rdquo; is not something a panel can verify. Rewrite
          it as a specific thing the system does.
        </li>
        <li>
          <strong>A rebuild of an existing app with nothing new.</strong> Another
          clone of a shopping site with no problem behind it reads as a tutorial,
          not a project. Name the gap you are closing.
        </li>
        <li>
          <strong>A stack you cannot yet use.</strong> Proposing a technology you
          have never touched, on a deadline, is a time-feasibility risk the guide
          can see even if you cannot.
        </li>
      </ol>

      <hr />

      <p>
        Every project on this site ships with the synopsis, the report, the
        diagrams and the deck already written to match the code &mdash; because the
        synopsis is where the whole project is either scoped to finish or quietly
        set up to fail.{" "}
        <Link href="/final-year-projects">See the projects</Link>, then read the{" "}
        <Link href="/final-year-projects/guides/final-year-project-report-format">
          report format chapter by chapter
        </Link>{" "}
        and{" "}
        <Link href="/final-year-projects/guides/how-to-choose-a-final-year-project">
          how to choose a project worth building
        </Link>
        . If the scope in your head is bigger than your semester, a{" "}
        <Link href="/final-year-projects/custom">custom build</Link> comes scoped,
        documented and walked through in live sessions.
      </p>
    </>
  );
}
