import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import TopicTable, { type Topic } from "@/components/campus/TopicTable";

export const meta: GuideMeta = {
  slug: "diploma-final-year-project-topics",
  title: "Diploma Final Year Project Topics (With Source Code)",
  h1: "Diploma final year project topics you can actually finish",
  description:
    "Simple, genuinely finishable diploma final year project ideas, each with the stack it needs and the viva question it attracts. Full source code included on every tier.",
  category: "Project ideas",
  publishedAt: "2026-07-27",
  readingMinutes: 8,
  degrees: ["Diploma"],
  ogImage: "/social/portal-wide.jpg",
  faq: [
    {
      question: "What is a simple final year project for diploma students?",
      answer:
        "A small CRUD web application with one real rule in it — a library system with a fine calculation, an attendance system with defaulter alerts, a canteen ordering system with an order state. Small scope, a clean database, and one piece of logic you can explain beats anything ambitious and unfinished.",
    },
    {
      question: "Do diploma projects come with source code?",
      answer:
        "The ones here do — full source code is included on every tier, with a local setup guide so it runs on your machine. The Mentored tier adds live sessions where the code is walked through line by line so you can answer for it in your viva.",
    },
    {
      question: "How simple should a diploma final year project be?",
      answer:
        "Simple enough to finish and document completely with time to spare. Diploma panels reward a working system whose report matches the code far more than an impressive idea that is still half-built at submission. Pick something you can complete, then make the one interesting part solid.",
    },
  ],
};

const WEB_TOPICS: Topic[] = [
  {
    title: "Library management with fine calculation",
    stack: "PHP + MySQL",
    difficulty: "Easy",
    why: "Proves you can handle a real rule — a fine that spans a holiday is more than plain CRUD, and it is the one thing to make solid.",
    question: "How do you calculate a fine across a closed day?",
  },
  {
    title: "Attendance system with defaulter alerts",
    stack: "PHP + MySQL",
    difficulty: "Easy",
    why: "Proves you handle the edge case — a percentage calculation plus a threshold alert is enough logic for a diploma panel.",
    question: "How is the percentage worked out when a student joins mid-term?",
  },
  {
    title: "QR-based canteen ordering and billing",
    stack: "PHP or Node, MySQL",
    difficulty: "Easy",
    why: "Proves you can model an order state machine — practical, demos well, and gives you real report material.",
    question: "How do you stop the same QR being used twice?",
  },
  {
    title: "College admission or enquiry portal",
    stack: "PHP + MySQL",
    difficulty: "Easy",
    why: "Proves you can draw and defend a workflow — the small set of application states is easy to diagram.",
    question: "Draw the state diagram for one application.",
  },
  {
    title: "Blood bank and donor registry",
    stack: "PHP + MySQL",
    difficulty: "Moderate",
    why: "Proves you can turn a need into a simple search — matching a request to a blood group and location is explainable logic.",
    question: "How do you find the nearest matching donor?",
  },
];

const DATA_APP_TOPICS: Topic[] = [
  {
    title: "Personal expense tracker with category totals",
    stack: "PHP or Node, MySQL, Chart.js",
    difficulty: "Easy",
    why: "Proves your charts come from real queries, not hard-coded numbers — the first thing an examiner checks.",
    question: "Show me the query behind this chart.",
  },
  {
    title: "Medicine and appointment reminder app",
    stack: "Flutter, SQLite, local notifications",
    difficulty: "Easy",
    why: "Proves you can schedule and store a notification — small, useful, and the examiner can install it on their phone.",
    question: "What happens to a reminder if the phone is switched off?",
  },
  {
    title: "Campus notice and event board",
    stack: "PHP + MySQL, or Firebase",
    difficulty: "Easy",
    why: "Proves you can enforce who is allowed to post — a simple, real access-control question you can answer.",
    question: "Who can post a notice, and how is that checked?",
  },
  {
    title: "Complaint or grievance tracker",
    stack: "PHP + MySQL",
    difficulty: "Easy",
    why: "Proves you can move a record through statuses — open, in progress, resolved — which is easy to diagram and defend.",
    question: "What are the statuses a complaint can be in, and who changes them?",
  },
];

export function Body() {
  return (
    <>
      <p>
        A diploma project is marked on the same three things as any other: does it
        run, does the documentation match the code, and can you walk an examiner
        through it. The difference is time and scope &mdash; you have less of the
        first, so keep the second small. The single most common mistake is picking
        something ambitious, getting most of the way there, and submitting a
        half-working demo with a report full of features that do not exist.
      </p>
      <p>
        So this list is filtered hard for genuinely finishable. Every idea is small
        enough to complete and document with time left over, and each has one real
        piece of logic worth making solid. Each entry carries the viva question it
        attracts, because choosing a topic is really choosing the question you will
        have to answer.
      </p>

      <h2>Simple web applications</h2>
      <p>
        The safest category by far. Pick one, keep the database clean, and put your
        effort into the one interesting rule &mdash; the fine calculation, the order
        state, the attendance threshold. Lead with that rule in your presentation and
        you have something concrete to show.
      </p>
      <TopicTable topics={WEB_TOPICS} />

      <h2>Small data and mobile projects</h2>
      <p>
        Just as finishable, and they demo well. A dashboard whose numbers trace back
        to a query, or an app the examiner can install on their own phone, both make
        a strong impression without needing a large codebase behind them.
      </p>
      <TopicTable topics={DATA_APP_TOPICS} />

      <h2>Three rules that keep a diploma project on track</h2>
      <ol>
        <li>
          <strong>Finish, then polish.</strong> Get the whole thing working end to
          end early, even if it is plain. A complete simple project beats an
          impressive half-built one every time.
        </li>
        <li>
          <strong>Validate the obvious.</strong> The examiner will type a negative
          number, a letter in a phone field, or leave a form blank. Handle those three
          and you look competent.
        </li>
        <li>
          <strong>Make the report match the code.</strong> If your ER diagram shows
          tables your database does not have, the panel assumes neither is yours.
          Draw what you actually built.
        </li>
      </ol>

      <hr />

      <p>
        A few of these are already built and come with the full source code, a setup
        guide, the report and diagrams, and daily sessions that walk through the code
        line by line so you can defend it in your viva &mdash;{" "}
        <Link href="/final-year-projects/for/diploma">
          see the diploma projects
        </Link>
        , including the{" "}
        <Link href="/final-year-projects/blood-bank-management">
          blood bank portal
        </Link>
        . Each listing is capped per college, so no two students at the same college
        submit the same build.
      </p>
      <p>
        If your idea is simpler than anything in the catalog &mdash; a smaller CRUD
        app, a single-feature tool &mdash;{" "}
        <Link href="/final-year-projects/custom">have it built for you</Link> at a
        scope that fits a diploma. Before you settle on a topic, read{" "}
        <Link href="/final-year-projects/guides/how-to-choose-a-final-year-project">
          how to choose a project you can actually finish
        </Link>{" "}
        and{" "}
        <Link href="/final-year-projects/guides/final-year-project-synopsis-format">
          the synopsis format
        </Link>{" "}
        your guide will want first.
      </p>
    </>
  );
}
