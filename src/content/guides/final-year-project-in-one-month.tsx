import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "final-year-project-in-one-month",
  title: "Final Year Project in 1 Month (A Realistic Plan)",
  h1: "Final year project in one month, a realistic plan",
  description:
    "An honest four-week plan to build, document and defend a final year project when a month is all you have left — what that timeline can and cannot produce, week by week.",
  category: "Crunch time",
  publishedAt: "2026-07-27",
  readingMinutes: 10,
  ogImage: "/social/portal-wide.jpg",
  howTo: {
    totalTime: "P28D",
    steps: [
      {
        name: "Week 1 — Lock scope and write the synopsis",
        text: "Cut the idea down to one core flow you can finish, write and get the synopsis approved, freeze the feature list in writing, and set up the repository, database and empty screens before you build anything.",
      },
      {
        name: "Week 2 — Build the core, and only the core",
        text: "Build the single end-to-end flow that defines the project, seed realistic data, and stop the moment it works front to back — no extra modules, no polish, no second feature.",
      },
      {
        name: "Week 3 — Test, capture evidence, and write the report",
        text: "Write a real test table including failure cases, capture screenshots of the working system, and draft the report chapter by chapter while the design decisions are still fresh in your head.",
      },
      {
        name: "Week 4 — Buffer, diagrams, and viva preparation",
        text: "Reconcile every diagram to the code you are actually submitting, fix the bugs testing surfaced, rehearse the two-minute overview out loud, and keep the last few days as pure buffer.",
      },
    ],
  },
  faq: [
    {
      question: "Can you really finish a final year project in one month?",
      answer:
        "A tightly scoped one, yes — one core feature, built well, documented to match, and genuinely understood. What a month cannot produce is a sprawling multi-module system with novel research in it. The students who succeed in a month are the ones who cut scope hard in week one, not the ones who work faster.",
    },
    {
      question: "What should I do if I have less than two weeks left?",
      answer:
        "Be honest with yourself about the arithmetic. Under two weeks you cannot both build and document a project from zero and understand it well enough to defend it. At that point the safe route is a project that is already built and documented, walked through with you session by session so you can actually explain it — which is the whole point of the done-for-you option.",
    },
    {
      question: "Is it better to submit a small finished project or a big unfinished one?",
      answer:
        "A small finished project, every time. A panel scores a working system with matching documentation far higher than an ambitious half-built one with diagrams that describe features that do not exist. Scope down until the project is finishable, then execute it completely.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        One month is enough time to build, document and defend a final year
        project — but only a specific kind of project, built in a specific order.
        The mistake that sinks students at this stage is not working too slowly.
        It is refusing to cut the idea down to something a month can actually
        hold. This is the plan that fits.
      </p>
      <p>
        Read the honest version first: a month buys you <strong>one core feature,
        built properly, documented to match, and understood well enough to
        explain.</strong> It does not buy you a five-module platform, original
        research, or the polish you imagined in September. Accept that in week
        one and the plan works. Fight it and you arrive at the viva with three
        half-finished features and a report that describes none of them.
      </p>

      <h2>Week 1 — Lock scope and write the synopsis</h2>
      <p>
        Spend the first day deciding what you are <em>not</em> building. Take
        whatever the idea was and reduce it to the single flow that makes it that
        project: for an e-commerce site, place an order end to end; for a chat
        app, two users exchanging messages in real time; for an ML project, one
        model that classifies one thing. Everything else is future scope.
      </p>
      <p>Before you write a line of application code, finish these:</p>
      <ul>
        <li>A frozen feature list — what it will do, and explicitly what it will not</li>
        <li>The synopsis, submitted and approved by your guide</li>
        <li>The repository, database and empty screens scaffolded</li>
        <li>A rough ER diagram you will keep true to the code as you go</li>
      </ul>
      <p>
        Get the synopsis approved this week without fail. A topic rejected in
        week two of a four-week plan is not a setback, it is the end of the plan.
        If you are unsure of the format, the{" "}
        <Link href="/final-year-projects/guides/final-year-project-synopsis-format">
          synopsis format guide
        </Link>{" "}
        has the structure most departments expect.
      </p>

      <h2>Week 2 — Build the core, and only the core</h2>
      <p>
        This is the week you build the one flow from week one, front to back, and
        nothing else. Resist every instinct to add a second feature, a nicer UI,
        or a login system you do not strictly need. Get the core working, then
        stop.
      </p>
      <p>
        Seed realistic data as you go — real names, real products, real prices.
        Screenshots full of &ldquo;asdf&rdquo; and &ldquo;test test&rdquo; are one
        of the clearest signals to a panel that a project was rushed. The moment
        the core flow works end to end, you have a submittable project. Everything
        after this point is documentation and defence, not building.
      </p>
      <p>
        If you can already tell the build is slipping past this week — the core
        will not come together, or you are stuck on something you cannot solve —
        do not spend week three hoping it resolves. Read{" "}
        <Link href="/final-year-projects/guides/stuck-on-final-year-project">
          the honest fix for being stuck
        </Link>{" "}
        and make the call early, while you still have three weeks of options.
      </p>

      <h2>Week 3 — Test, capture evidence, and write the report</h2>
      <p>
        Two jobs run in parallel this week. First, test the system properly and
        write it down: a test case table with input, expected output, actual
        output, and a pass or fail column. Include failure cases — invalid input,
        an empty form, an unauthorised action — because a table of only passes
        reads as fabricated, while one that shows bad input being caught reads as
        engineering.
      </p>
      <p>
        Second, write the report while the decisions are still fresh. Do not save
        it for the end — a report written the night before submission always
        looks like one. Draft it chapter by chapter, and follow the{" "}
        <Link href="/final-year-projects/guides/final-year-project-report-format">
          report format guide
        </Link>{" "}
        so you do not lose easy marks on structure. The single rule that matters:
        the report must describe the code you are actually submitting.
      </p>

      <h2>Week 4 — Buffer, diagrams, and viva preparation</h2>
      <p>
        The last week is deliberately light on new work, because something always
        breaks and you need the room. Use it to:
      </p>
      <ul>
        <li>Reconcile every diagram — ER, DFD, use case — to the code as it now is</li>
        <li>Fix the bugs that testing surfaced in week three</li>
        <li>Rehearse the two-minute project overview out loud, more than once</li>
        <li>Keep the final two or three days as pure buffer, building nothing</li>
      </ul>
      <p>
        Preparing for the viva is not a week-four afterthought — it is half of
        your marks. Walk through{" "}
        <Link href="/final-year-projects/guides/how-to-explain-your-project-in-the-viva">
          how to explain your project confidently
        </Link>{" "}
        and rehearse against the{" "}
        <Link href="/final-year-projects/guides/final-year-project-viva-questions">
          questions panels actually ask
        </Link>
        . A project you built but cannot explain scores like a project you did not
        build.
      </p>

      <h2>What a month cannot do — and the honest alternative</h2>
      <p>
        Everything above assumes you have four clear weeks and can give them to
        this. If the real number is smaller — you have ten days, or exams eat two
        of the four weeks, or the build has already failed once — then the plan
        does not fit, and pretending it does is how projects arrive at the viva
        broken.
      </p>
      <p>
        When the timeline is genuinely gone, the safe route is a project that is
        already built and documented, then walked through with you in daily live
        sessions until you can explain every part of it yourself. That is not a
        shortcut around understanding the work — it is the fastest honest path
        <em> to</em> understanding it when there is no time left to build from
        zero. Every tier ships with the full source code, the report, and
        line-by-line viva preparation, and seats are capped per college so two
        students never walk in with the same submission.
      </p>

      <hr />

      <p>
        If a month is what you have, this plan uses it well —{" "}
        <Link href="/final-year-projects">start from a project close to your idea</Link>{" "}
        so week one is a head start rather than a blank page. If the month is
        already gone, the honest option is a{" "}
        <Link href="/final-year-projects/custom">build to your problem statement</Link>{" "}
        with the documentation and viva prep done alongside it. Two projects that
        fit a crunch well are{" "}
        <Link href="/final-year-projects/ecommerce-mern">the MERN e-commerce store</Link>{" "}
        and{" "}
        <Link href="/final-year-projects/realtime-chat-mern">the real-time chat app</Link>{" "}
        — both have one clear core flow you can lock in week one.
      </p>
    </>
  );
}
