import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import TopicTable, { type Topic } from "@/components/campus/TopicTable";

export const meta: GuideMeta = {
  slug: "bsc-it-final-year-project-topics",
  title: "B.Sc IT Final Year Project Topics (With Source Code)",
  h1: "B.Sc IT final year project topics with source code",
  description:
    "Practical B.Sc IT final year project ideas across web, data and mobile, each with the stack it needs and the viva question it attracts. Full source code included on every tier.",
  tldr: "The best B.Sc IT final year projects are complete full-stack web or data applications with a clean database and one real feature you can defend, rather than a half-built AI idea. Good directions span web, data and mobile, and full source code is included on every tier.",
  category: "Project ideas",
  publishedAt: "2026-07-27",
  readingMinutes: 9,
  degrees: ["B.Sc IT"],
  ogImage: "/og/campus/hub.jpg",
  faq: [
    {
      question: "What is a good final year project for B.Sc IT?",
      answer:
        "A complete full-stack web application with a clean database design. B.Sc IT is marked on a system that runs, documentation that matches the code, and your ability to defend both — so a finished CRUD-plus-one-real-feature project scores better than an ambitious AI project left half-built at submission.",
    },
    {
      question: "Do B.Sc IT final year projects come with source code?",
      answer:
        "The ones on this site do — full source code is included on every tier, not just an explanation. The Mentored tier adds live sessions where the code is walked through line by line so you can answer for any part of it in the viva.",
    },
    {
      question: "Does a B.Sc IT project need machine learning?",
      answer:
        "No. A well-structured web or data project is easier to defend and marked just as well. Add ML only if you can name your dataset and your metric and explain both, otherwise it becomes a liability the moment the panel asks how it was trained.",
    },
  ],
};

const WEB_TOPICS: Topic[] = [
  {
    title: "E-commerce store with cart and order flow",
    stack: "MERN (MongoDB, Express, React, Node)",
    difficulty: "Moderate",
    why: "Proves you can model a cart, an order and a stock count as separate concerns instead of one messy table.",
    question: "Two people buy the last item at the same second. Who gets it?",
  },
  {
    title: "Real-time chat application with message history",
    stack: "Node, Socket.io, MongoDB",
    difficulty: "Moderate",
    why: "Proves you understand persistent connections and delivery state, not just request-response CRUD.",
    question: "What happens to a message sent to a user who is offline?",
  },
  {
    title: "Blood bank and donor matching portal",
    stack: "PHP + MySQL, or MERN",
    difficulty: "Moderate",
    why: "Proves you can turn a requirement (urgency, blood group, distance) into ranking logic you can explain.",
    question: "How do you order donors for an urgent request?",
  },
  {
    title: "Online complaint and grievance tracker",
    stack: "Node or Django, PostgreSQL",
    difficulty: "Moderate",
    why: "Proves you can model state over time — an escalation rule is more interesting to a panel than plain CRUD.",
    question: "What happens to a complaint nobody actions for a week?",
  },
  {
    title: "College admission and enquiry portal",
    stack: "PHP + MySQL, or Django",
    difficulty: "Easy",
    why: "Proves you can draw and defend a workflow — the application states give you real report material.",
    question: "Draw the state diagram for a single application.",
  },
];

const DATA_TOPICS: Topic[] = [
  {
    title: "Personal expense tracker with category insights",
    stack: "Node or PHP, MySQL, Chart.js",
    difficulty: "Easy",
    why: "Proves every chart is computed from a real query rather than hard-coded — the thing panels probe first.",
    question: "Show me the query behind this chart.",
  },
  {
    title: "Student performance dashboard with trend analysis",
    stack: "Python, pandas, Flask or Streamlit",
    difficulty: "Easy",
    why: "Proves you can do real analysis without having to defend a trained model. Very finishable.",
    question: "What does this trend tell a teacher that a marks table does not?",
  },
  {
    title: "Attendance system with defaulter alerts",
    stack: "PHP + MySQL",
    difficulty: "Easy",
    why: "Proves you handle the edge case — a student who joins mid-term breaks a naive percentage.",
    question: "How is the percentage calculated when a student joins late?",
  },
  {
    title: "Weather or crop advisory dashboard on a public API",
    stack: "Python, Flask, a public REST API",
    difficulty: "Moderate",
    why: "Proves you handle failure — consuming a third-party API teaches the error handling panels ask about.",
    question: "What does your app show when the API is down?",
  },
];

const APP_TOPICS: Topic[] = [
  {
    title: "Offline-first budget or expense app",
    stack: "React Native or Flutter, SQLite",
    difficulty: "Moderate",
    why: "Proves you understand local storage and sync — and it survives a demo when campus wifi dies.",
    question: "Where is the data stored, and what happens with no network?",
  },
  {
    title: "Medicine and appointment reminder app",
    stack: "Flutter, SQLite, local notifications",
    difficulty: "Easy",
    why: "Proves you can schedule and persist notifications — small scope, genuinely useful, examiner-installable.",
    question: "What happens to a reminder if the phone is switched off?",
  },
  {
    title: "Campus notice and event app",
    stack: "React Native, Firebase",
    difficulty: "Easy",
    why: "Proves you can enforce roles — who is allowed to post is a real access-control question.",
    question: "Who can post a notice, and how is that enforced in code?",
  },
];

export function Body() {
  return (
    <>
      <p>
        B.Sc IT projects are marked on three things: does the system run, does the
        documentation match the code, and can you walk an examiner through it. Depth
        of algorithm counts for far less than completeness. The most common way to
        lose marks is to pick something ambitious, get eighty per cent of the way
        there, and submit a half-working demo alongside a report describing features
        that do not exist.
      </p>
      <p>
        So this list is filtered for practical and finishable — mostly web and data
        projects a B.Sc IT student can actually complete and document. Each idea
        carries the viva question it attracts, because choosing a topic is really
        choosing which question you will have to answer.
      </p>

      <h2>Web applications</h2>
      <p>
        The safest category, and the one where duplication is worst. If you pick a
        common topic, differentiate it with one piece of real logic &mdash; conflict
        detection, a ranking rule, an escalation rule &mdash; and lead with that in
        your presentation.
      </p>
      <TopicTable topics={WEB_TOPICS} />

      <h2>Data and dashboards</h2>
      <p>
        Underrated for B.Sc IT. Real analysis on real data, without needing to defend
        a trained model, and the charts give you something concrete to talk through.
        The trick is that every number on screen must trace back to a query you can
        show.
      </p>
      <TopicTable topics={DATA_TOPICS} />

      <h2>Mobile applications</h2>
      <p>
        The strongest impression available to a B.Sc IT student is an examiner
        installing your app on their own phone. It is worth the extra setup, and the
        offline and notification behaviour gives you genuine engineering to explain.
      </p>
      <TopicTable topics={APP_TOPICS} />

      <h2>Three mistakes that cost B.Sc IT students marks</h2>
      <ol>
        <li>
          <strong>The report does not match the code.</strong> An ER diagram showing
          seven tables when your database has four is worse than no diagram &mdash; it
          proves neither was made by you. Panels check.
        </li>
        <li>
          <strong>Nothing is validated.</strong> The examiner will type a negative
          number, a letter in a phone field, or leave a form blank. Handle those three
          and you look competent.
        </li>
        <li>
          <strong>Choosing on ambition, not on time.</strong> Count the weeks you
          actually have, subtract exams, and be honest. Finished beats impressive.
        </li>
      </ol>

      <hr />

      <p>
        Several of these are already built and come with the full source code, the
        report, the diagrams and daily sessions that walk through the code line by
        line so you can defend it &mdash;{" "}
        <Link href="/final-year-projects/for/bsc-it">
          see the B.Sc IT projects
        </Link>
        . The e-commerce and chat builds map directly onto the web ideas above:{" "}
        <Link href="/final-year-projects/ecommerce-mern">the MERN store</Link>,{" "}
        <Link href="/final-year-projects/realtime-chat-mern">
          the real-time chat app
        </Link>
        , the{" "}
        <Link href="/final-year-projects/expense-tracker-mobile">
          mobile expense tracker
        </Link>{" "}
        and the{" "}
        <Link href="/final-year-projects/blood-bank-management">
          blood bank portal
        </Link>
        . Each listing is capped per college so no two students at the same college
        submit the same build. If your topic is on this list but not in the catalog,{" "}
        <Link href="/final-year-projects/custom">have it built for you</Link>.
      </p>
      <p>
        Before you commit, read{" "}
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
