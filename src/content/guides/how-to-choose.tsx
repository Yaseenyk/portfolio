import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "how-to-choose-a-final-year-project",
  title: "How To Choose A Final Year Project (Without Regretting It In March)",
  h1: "How to choose a final year project without regretting it in March",
  description:
    "A practical method for picking a final year project: how to size it against the weeks you actually have, how to avoid duplicating your batch, and the questions to ask your guide before you build anything.",
  tldr: "Choose a final year project by first counting the weeks you truly have after exams, placements and a four-week buffer, then picking the hardest idea you can finish inside them. Pick one goal — marks, a job, or higher study — take three options to your guide, and write the scope down before you build.",
  category: "Getting started",
  publishedAt: "2026-07-27",
  readingMinutes: 8,
  ogImage: "/social/how-to-choose-wide.jpg",
  howTo: {
    totalTime: "PT1H",
    steps: [
      {
        name: "Count the weeks you actually have",
        text: "Subtract a four-week buffer, your exam weeks, placement drives and festival breaks from your submission date to find the weeks you can really build in.",
      },
      {
        name: "Decide what you want on the other side",
        text: "Pick one goal — marks, a job, or higher study — and let it choose the project, because trying to serve all three serves none of them well.",
      },
      {
        name: "Find out what your batch is doing",
        text: "Ask around before committing so you do not submit a fourth variation of the same system, which turns the panel hostile through no fault of yours.",
      },
      {
        name: "Ask what question the project will attract",
        text: "Work out the one question a panel will inevitably ask, and choose a project whose question interests you rather than frightens you.",
      },
      {
        name: "Take three options to your guide, not one",
        text: "Bring three topics with two-line descriptions and honest difficulty notes so your guide advises rather than simply approves or rejects.",
      },
      {
        name: "Write the scope down before you build",
        text: "Put what it will and will not do, the technologies, and a week-by-week plan on one page, and get your guide to agree to it.",
      },
    ],
  },
  faq: [
    {
      question: "When should I finalise my final year project topic?",
      answer:
        "Before your department's approval deadline, which in most Indian colleges falls between August and October for a March submission. Finalising late is the single most common cause of a rushed, incomplete project, because every week spent undecided is a week removed from the build.",
    },
    {
      question: "Should I pick a hard project or an easy one?",
      answer:
        "Pick the hardest project you can finish with four weeks to spare. That buffer is not optional — it absorbs guide-requested changes, exam weeks, and the failures nobody plans for. A moderate project finished and understood outscores a hard one that is eighty per cent done.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        Most students choose a final year project by scrolling a list of titles and
        picking whichever sounds most impressive. Then they spend February
        discovering what it actually involves. There is a better method, and it
        takes about an hour.
      </p>

      <h2>Step 1 — Count the weeks you actually have</h2>
      <p>
        Take your submission date. Subtract four weeks as a buffer, because you will
        need them for guide-requested changes and things that break. Then subtract
        your exam weeks, any placement drives, and festival breaks when nothing gets
        done.
      </p>
      <p>
        Most students who think they have twenty-four weeks have about eleven usable
        ones. Do this arithmetic before you look at a single topic — it eliminates
        half the list on its own and saves you the disappointment later.
      </p>

      <h2>Step 2 — Decide what you want on the other side</h2>
      <p>Three legitimate goals, and they point at different projects:</p>
      <ul>
        <li>
          <strong>Marks.</strong> Pick something conventional, execute it unusually
          well, and document it perfectly. A hospital management system with real
          conflict detection and a matching ER diagram scores higher than a shaky AI
          project.
        </li>
        <li>
          <strong>A job.</strong> Pick something in the stack you want to be hired
          for, and build it as a portfolio piece. Interviewers ask about final year
          projects for the first two years of your career.
        </li>
        <li>
          <strong>Higher study.</strong> Pick something with a research angle, and
          plan for a paper alongside it. That changes the topic materially — you
          need novelty, not just working software.
        </li>
      </ul>
      <p>
        Trying to serve all three produces a project that does none of them well.
        Pick one, and let it decide.
      </p>

      <h2>Step 3 — Find out what your batch is doing</h2>
      <p>
        This is the step everyone skips, and it does more damage than any other.
        When fifteen students submit variations of the same library management
        system, the panel becomes hostile by the fourth one — through no fault of the
        fourth student.
      </p>
      <p>
        Ask around before you commit. If your topic is already taken, either change
        it or change its domain substantially: the same technical system applied to
        an entirely different problem is a different project, and defensible as one.
      </p>

      <h2>Step 4 — Ask what question the project will attract</h2>
      <p>
        Every project has one question a panel will inevitably ask. For a chatbot it
        is how you stop it inventing answers. For a booking system it is what happens
        with simultaneous bookings. For a machine learning project it is what your
        model gets wrong.
      </p>
      <p>
        Work out what that question is <em>before</em> you choose, and ask whether
        the prospect of answering it interests you or frightens you. If it
        frightens you, that feeling does not improve over six months — it arrives
        at the viva unchanged.
      </p>

      <h2>Step 5 — Take three options to your guide, not one</h2>
      <p>
        Arriving with one topic invites a yes or no. Arriving with three, each with
        a two-line description and an honest difficulty assessment, invites a
        conversation — and guides give far better input when they are choosing
        rather than judging.
      </p>
      <p>Ask them, explicitly:</p>
      <ul>
        <li>Has anyone in a recent batch done something close to this?</li>
        <li>Is the scope right for the time available, in your experience?</li>
        <li>What will the panel focus on for a project like this?</li>
        <li>What is the format and deadline for the synopsis?</li>
      </ul>

      <h2>Step 6 — Write the scope down before you build</h2>
      <p>
        One page. What it will do, what it will explicitly not do, which
        technologies, and a week-by-week plan with the dates from step one. Get your
        guide to agree to it.
      </p>
      <p>
        That page is what protects you when scope drifts in January, and its
        &ldquo;will not do&rdquo; section becomes your answer when a panel asks why
        the system lacks some feature. Declared limits are a design decision.
        Undeclared ones are an oversight.
      </p>

      <h2>The mistakes that recur every single year</h2>
      <ol>
        <li>
          <strong>Choosing on title rather than substance.</strong> &ldquo;AI-powered
          blockchain healthcare platform&rdquo; is four projects, and you will finish
          none of them.
        </li>
        <li>
          <strong>Deciding late.</strong> Every week spent undecided is a week
          removed from the build, and it never comes back.
        </li>
        <li>
          <strong>Building before approval.</strong> A topic rejected in week six is
          the most expensive mistake available to you.
        </li>
        <li>
          <strong>Leaving the report to the end.</strong> Write each chapter as you
          finish the corresponding work. Reports written in the final week always
          look like reports written in the final week.
        </li>
        <li>
          <strong>Assuming you will understand it later.</strong> If you cannot
          explain a module the week you build it, you certainly will not in March.
        </li>
      </ol>

      <hr />

      <p>
        If you already know what you want, it can be{" "}
        <Link href="/final-year-projects/custom">built to your problem statement</Link>{" "}
        — and if you do not, the topic lists are a reasonable place to start:{" "}
        <Link href="/final-year-projects/guides/mca-final-year-project-topics">
          MCA
        </Link>
        ,{" "}
        <Link href="/final-year-projects/guides/bca-final-year-project-topics">
          BCA
        </Link>
        , and{" "}
        <Link href="/final-year-projects/guides/btech-cse-final-year-project-topics">
          B.Tech
        </Link>
        .
      </p>
    </>
  );
}
