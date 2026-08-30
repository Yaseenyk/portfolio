import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import TopicTable, { type Topic } from "@/components/campus/TopicTable";

export const meta: GuideMeta = {
  slug: "btech-cse-final-year-project-topics",
  title: "B.Tech CSE Final Year Project Topics That Survive Review Panels",
  h1: "B.Tech CSE final year project topics that survive a review panel",
  description:
    "B.Tech final year project ideas chosen for team work and staged reviews — each with the stack, honest difficulty, how to split it across a team, and the question the panel will open with.",
  tldr: "Strong B.Tech CSE projects survive staged review panels and split cleanly across a team — a distributed task queue, an API gateway with rate limiting, a real-time collaborative editor, a container-based CI runner. Give each member a vertical slice they can defend end to end, and pick something presentable early with visible room to grow.",
  category: "Topic lists",
  publishedAt: "2026-07-27",
  readingMinutes: 10,
  ogImage: "/social/btech-topics-wide.jpg",
  degrees: ["B.Tech", "M.Tech"],
  faq: [
    {
      question: "How do I split a B.Tech project across a team of four?",
      answer:
        "Split by module, not by layer. If one person does all the frontend and another all the backend, two members cannot answer for the other half in review. Give each member a vertical slice — their own feature from database to interface — so everyone can defend something end to end.",
    },
    {
      question: "What do B.Tech review panels look for?",
      answer:
        "Progress against the previous review, a clear problem statement, and evidence that design decisions were made rather than defaulted into. Panels reward a project that is presentable early and still has visible room to grow between checkpoints.",
    },
  ],
};

const SYSTEMS_TOPICS: Topic[] = [
  {
    title: "Distributed task queue with retry and dead-letter handling",
    stack: "Go or Node, Redis, PostgreSQL",
    difficulty: "Very hard",
    why: "Infrastructure-flavoured projects are rare in a batch and panels notice immediately.",
    question: "A worker dies mid-task. What happens to that task?",
  },
  {
    title: "API gateway with rate limiting and circuit breaking",
    stack: "Node or Go, Redis",
    difficulty: "Hard",
    why: "Every member can own one policy, which splits cleanly across a team.",
    question: "Explain your rate limiting algorithm and its failure mode.",
  },
  {
    title: "Real-time collaborative editor",
    stack: "Node, WebSockets, React, Redis",
    difficulty: "Very hard",
    why: "Conflict resolution is a genuinely hard problem with real literature behind it.",
    question: "Two users edit the same character. Reconcile it.",
  },
  {
    title: "Container-based CI runner for student submissions",
    stack: "Python or Go, Docker API",
    difficulty: "Hard",
    why: "Sandboxing untrusted code is a real security problem and demos brilliantly.",
    question: "How do you stop submitted code from escaping the container?",
  },
];

const AI_TOPICS: Topic[] = [
  {
    title: "Retrieval-augmented assistant over a domain corpus",
    stack: "Python, FastAPI, vector database, React",
    difficulty: "Hard",
    why: "Splits into four members cleanly: ingestion, retrieval, generation, interface.",
    question: "How do you prove an answer came from the source and not the model?",
  },
  {
    title: "Multi-agent workflow automation",
    stack: "Python, an LLM API, a task queue",
    difficulty: "Very hard",
    why: "Current, rarely duplicated, and full of design decisions worth defending.",
    question: "What stops two agents from looping forever?",
  },
  {
    title: "Anomaly detection on network or transaction data",
    stack: "Python, scikit-learn, Kafka or a stream simulator",
    difficulty: "Hard",
    why: "Extreme class imbalance forces you to abandon accuracy as a metric.",
    question: "Your data is 99.8% normal. Why is your model not just predicting normal?",
  },
  {
    title: "Video analytics — crowd counting or traffic flow",
    stack: "Python, YOLO or similar, OpenCV",
    difficulty: "Hard",
    why: "Visually compelling in a review and splits across detection, tracking and reporting.",
    question: "Show me it undercounting, and explain why.",
  },
];

const APPLIED_TOPICS: Topic[] = [
  {
    title: "IoT sensor pipeline with a live dashboard",
    stack: "ESP32/Arduino, MQTT, Node, React",
    difficulty: "Hard",
    why: "Hardware plus software impresses panels, and it splits naturally across a team.",
    question: "What happens to readings while the device is disconnected?",
  },
  {
    title: "Blockchain-backed certificate verification",
    stack: "Solidity, Hardhat, React",
    difficulty: "Hard",
    why: "Only worth doing if you can explain why a database would not suffice — so prepare that.",
    question: "Why does this need a blockchain rather than a signed database record?",
  },
  {
    title: "Accessibility tool — real-time captioning or navigation aid",
    stack: "Python or React Native, speech and vision APIs",
    difficulty: "Moderate",
    why: "Socially useful projects consistently get a warmer panel than another portal.",
    question: "What is your latency, and is that usable for a real person?",
  },
  {
    title: "Campus-scale resource scheduling with constraint solving",
    stack: "Python, OR-Tools, Django",
    difficulty: "Hard",
    why: "Timetabling is a real optimisation problem, not CRUD dressed up.",
    question: "What makes your schedule optimal rather than merely valid?",
  },
];

export function Body() {
  return (
    <>
      <p>
        B.Tech projects differ from BCA and MCA in two ways that should change what
        you pick. They are usually built by a team, and they are judged across two
        or three review checkpoints rather than one final demonstration. That means
        the project has to be presentable early and still have visible room to grow
        between reviews.
      </p>
      <p>
        A project that is either finished in week three or unshowable until week
        twelve will be marked down at some review, regardless of quality. Pick
        something with a natural staging.
      </p>

      <h2>Systems and infrastructure</h2>
      <p>
        The rarest category in any batch, and panels notice. If your department
        leans theoretical, this is where you differentiate — nobody else will be
        presenting a task queue.
      </p>
      <TopicTable topics={SYSTEMS_TOPICS} />

      <h2>AI and machine learning</h2>
      <p>
        Popular enough that duplication is a real risk. Differentiate on the
        evaluation rather than the model: a project that honestly characterises
        where it fails outscores one claiming ninety-nine per cent accuracy.
      </p>
      <TopicTable topics={AI_TOPICS} />

      <h2>Applied and interdisciplinary</h2>
      <TopicTable topics={APPLIED_TOPICS} />

      <h2>How to split this across a team</h2>
      <p>
        The default split is by layer — one person on frontend, one on backend, one
        on the model, one on the report. It is also the worst one, because at review
        three members cannot answer for the majority of the project and the panel
        works that out in about ninety seconds.
      </p>
      <p>
        Split by vertical slice instead. Each member owns one feature end to end,
        from schema to interface, and can therefore defend it completely. Shared
        concerns — auth, deployment, the report — get assigned as secondary duties
        on top.
      </p>

      <h2>What to have ready at each review</h2>
      <ul>
        <li>
          <strong>Review 1:</strong> problem statement, why existing solutions do not
          solve it, architecture diagram, and one working vertical slice. Not
          mockups — something running.
        </li>
        <li>
          <strong>Review 2:</strong> the core feature working end to end, your data
          model settled, and an honest list of what is not done.
        </li>
        <li>
          <strong>Review 3:</strong> the complete system, a demonstrated failure case
          you handle gracefully, and every member able to answer for their slice.
        </li>
      </ul>
      <p>
        That middle item at review three is worth more than another feature.
        Deliberately show something going wrong and being handled — panels remember
        it, because almost nobody does it.
      </p>

      <hr />

      <p>
        Projects in several of these areas are already built, with source, report
        and daily sessions walking through the code —{" "}
        <Link href="/final-year-projects/for/btech/">see the B.Tech projects</Link>,
        or{" "}
        <Link href="/final-year-projects/custom/">
          have your team&rsquo;s problem statement built to spec
        </Link>
        . Before your final review, read{" "}
        <Link href="/final-year-projects/guides/final-year-project-viva-questions/">
          the questions panels actually ask
        </Link>
        .
      </p>
    </>
  );
}
