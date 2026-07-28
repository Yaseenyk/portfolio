import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import TopicTable, { type Topic } from "@/components/campus/TopicTable";

export const meta: GuideMeta = {
  slug: "mca-final-year-project-topics",
  title: "MCA Final Year Project Topics (2026–27) With Stack And Difficulty",
  h1: "MCA final year project topics, with the stack and the honest difficulty",
  description:
    "Twenty MCA final year project ideas grouped by domain, each with the stack it needs, how hard it really is, and the viva question it will attract. Written by an engineer who builds these systems professionally.",
  tldr: "Good MCA final year projects are moderately sized systems you can defend in depth — a RAG document assistant, resume screening, sales forecasting, or a well-architected full-stack app — each paired with a stack you actually know. MCA vivas push into design decisions, so pick by the depth of questions a project attracts, not by the title.",
  category: "Topic lists",
  publishedAt: "2026-07-27",
  readingMinutes: 12,
  ogImage: "/social/mca-topics-wide.jpg",
  degrees: ["MCA", "M.Tech"],
  faq: [
    {
      question: "Which project is best for MCA final year?",
      answer:
        "The one you can explain. MCA vivas push into design decisions rather than features, so a moderately sized project you understand completely scores better than an ambitious one you cannot defend. Pick by the depth of the questions it will attract, not by how impressive the title sounds.",
    },
    {
      question: "Is a machine learning project better than a web project for MCA?",
      answer:
        "Not automatically. An ML project scores well only if you can discuss your dataset, your metric, and where the model fails. A well-architected full-stack system with real design decisions behind it will beat a machine learning project you cannot evaluate.",
    },
  ],
};

const AI_TOPICS: Topic[] = [
  {
    title: "Document assistant with retrieval-augmented generation",
    stack: "Python, FastAPI, a vector database, React",
    difficulty: "Hard",
    why: "Answers questions from a real document set and cites its source, instead of being a wrapper around a chat API.",
    question: "How do you stop it from inventing an answer?",
  },
  {
    title: "Resume screening and job matching",
    stack: "Python, spaCy, scikit-learn, Flask",
    difficulty: "Moderate",
    why: "Parsing is the hard half. The explainable score is what makes it defensible.",
    question: "Explain TF-IDF and why cosine similarity, not Euclidean distance.",
  },
  {
    title: "Fake news / claim detection with source checking",
    stack: "Python, transformers, Flask",
    difficulty: "Hard",
    why: "Forces you to confront class imbalance and the limits of your training data.",
    question: "Why is accuracy a misleading metric on this dataset?",
  },
  {
    title: "Medical symptom triage with confidence bounds",
    stack: "Python, scikit-learn, Flask, MySQL",
    difficulty: "Hard",
    why: "Refusing to predict when unsure is the whole project. Panels love it.",
    question: "What happens when the model is 51% confident?",
  },
  {
    title: "Demand or sales forecasting for a small business",
    stack: "Python, pandas, Prophet or ARIMA, Streamlit",
    difficulty: "Moderate",
    why: "Time series is a distinct skill and far less duplicated than classification.",
    question: "Why can you not shuffle time series data before splitting?",
  },
];

const FULLSTACK_TOPICS: Topic[] = [
  {
    title: "Multi-tenant hospital or clinic management",
    stack: "MERN or Django, PostgreSQL",
    difficulty: "Moderate",
    why: "Common topic, uncommon execution — real slot-conflict detection is what separates it.",
    question: "What happens if two patients book the same slot simultaneously?",
  },
  {
    title: "Inventory system with audit trail and reversals",
    stack: "Node, PostgreSQL, React",
    difficulty: "Moderate",
    why: "An immutable ledger instead of a mutable quantity column is a genuine design decision.",
    question: "How do you reverse a transaction without losing history?",
  },
  {
    title: "Role-based e-learning platform with progress tracking",
    stack: "MERN, MongoDB",
    difficulty: "Moderate",
    why: "Three roles, real permission boundaries, and content sequencing logic.",
    question: "Show me a student accessing an instructor route.",
  },
  {
    title: "Online examination system with anti-cheating measures",
    stack: "MERN, WebSockets, Redis",
    difficulty: "Hard",
    why: "Timing, tab-switch detection, and autosave under connection loss are real problems.",
    question: "What happens if the browser closes mid-exam?",
  },
  {
    title: "Complaint or grievance tracking with SLA escalation",
    stack: "Django or Node, PostgreSQL",
    difficulty: "Moderate",
    why: "State machines and time-based escalation are more interesting than CRUD.",
    question: "Draw the state diagram for a complaint.",
  },
];

const REALTIME_TOPICS: Topic[] = [
  {
    title: "Collaborative document or whiteboard editor",
    stack: "Node, WebSockets, React, Redis",
    difficulty: "Very hard",
    why: "Conflict resolution between simultaneous edits is a genuinely hard problem.",
    question: "Two users type in the same place. What happens?",
  },
  {
    title: "Live vehicle or delivery tracking",
    stack: "Node, WebSockets, MongoDB, Leaflet",
    difficulty: "Hard",
    why: "Geospatial queries plus streaming updates plus offline gaps.",
    question: "What happens to the trail when the driver loses signal for ten minutes?",
  },
  {
    title: "Real-time auction or bidding platform",
    stack: "Node, WebSockets, PostgreSQL",
    difficulty: "Hard",
    why: "Race conditions on the final bid are the entire challenge.",
    question: "Two bids arrive in the same millisecond. Which wins, and why?",
  },
];

const VISION_TOPICS: Topic[] = [
  {
    title: "Face recognition attendance with unknown-face rejection",
    stack: "Python, OpenCV, dlib, Flask",
    difficulty: "Moderate",
    why: "Rejecting unknown faces rather than matching the nearest is the marking point.",
    question: "What is your distance threshold, and how did you choose it?",
  },
  {
    title: "Automatic number plate recognition",
    stack: "Python, OpenCV, Tesseract or a detection model",
    difficulty: "Hard",
    why: "Real-world image conditions make this much harder than it demos.",
    question: "Show me it failing on a dirty or angled plate.",
  },
  {
    title: "Sign language or gesture recognition",
    stack: "Python, MediaPipe, TensorFlow",
    difficulty: "Hard",
    why: "Genuinely useful, visually striking, and rarely duplicated in a batch.",
    question: "How much of your accuracy is the model and how much is the landmark extraction?",
  },
];

const MOBILE_TOPICS: Topic[] = [
  {
    title: "Offline-first expense or budget tracker",
    stack: "React Native, SQLite, Node backend",
    difficulty: "Moderate",
    why: "Works when the campus wifi dies during your demo. That alone is worth it.",
    question: "Two devices edit the same record offline. How do you resolve it?",
  },
  {
    title: "Field data collection app with background sync",
    stack: "Flutter or React Native, SQLite",
    difficulty: "Moderate",
    why: "A real problem for surveys, agriculture and health workers.",
    question: "What is in your sync queue, and what happens if it fails halfway?",
  },
  {
    title: "Accessibility app — text to speech with on-device OCR",
    stack: "React Native, ML Kit",
    difficulty: "Moderate",
    why: "Socially useful projects get a warmer reception than another booking app.",
    question: "Why on-device rather than an API call?",
  },
];

export function Body() {
  return (
    <>
      <p>
        Most MCA topic lists are the same forty titles copied between sites, with no
        indication of what any of them takes to build or what a panel will ask about
        it. This one is written from the other side — these are systems I build
        professionally, and the difficulty ratings are honest rather than
        encouraging.
      </p>
      <p>
        MCA is postgraduate, and the viva reflects it. Panels push past what your
        project does and into why you built it that way. So each topic below lists
        the question it will attract. If you cannot imagine answering that question,
        pick a different topic — that is the entire point of this list.
      </p>

      <h2>AI and machine learning</h2>
      <p>
        The highest-scoring category and the easiest to get wrong. An ML project
        only earns its marks if you can discuss your dataset, defend your metric,
        and show a case where the model fails.
      </p>
      <TopicTable topics={AI_TOPICS} />

      <h2>Full-stack systems</h2>
      <p>
        Unfashionable, consistently well-marked. The marks are in schema design and
        the auth boundary, not in the number of screens. A hospital management
        system built properly beats a weak ML project every time.
      </p>
      <TopicTable topics={FULLSTACK_TOPICS} />

      <h2>Real-time systems</h2>
      <p>
        The most technically demanding group. Attempt these only if you are
        comfortable reasoning about two things happening at once — but if you are,
        they are almost never duplicated in a batch.
      </p>
      <TopicTable topics={REALTIME_TOPICS} />

      <h2>Computer vision</h2>
      <p>
        Demos beautifully, which cuts both ways: panels get excited and then probe
        hard. Know your failure cases before you walk in.
      </p>
      <TopicTable topics={VISION_TOPICS} />

      <h2>Mobile applications</h2>
      <p>
        Consistently underrated. An app the examiner can install on their own phone
        makes an impression that a localhost demo cannot.
      </p>
      <TopicTable topics={MOBILE_TOPICS} />

      <h2>How to actually choose from this list</h2>
      <ol>
        <li>
          Read the viva question next to each topic. Pick three where the question
          interests you rather than frightens you.
        </li>
        <li>
          Check what the rest of your batch is doing. Duplication inside one cohort
          is the fastest way to a hostile panel.
        </li>
        <li>
          Be honest about your time. A moderate project finished and understood
          beats a hard one that is eighty per cent done in March.
        </li>
        <li>
          Confirm with your guide before you build anything. A rejected topic in
          week six is the most expensive mistake available to you.
        </li>
      </ol>

      <hr />

      <p>
        Several of these are already built and available with the source, the
        report, and daily sessions that walk you through the code —{" "}
        <Link href="/final-year-projects">see the catalog</Link>. Anything on this
        list that is not there can be{" "}
        <Link href="/final-year-projects/custom">built to your problem statement</Link>
        . And before your viva, read{" "}
        <Link href="/final-year-projects/guides/final-year-project-viva-questions">
          the questions panels actually ask
        </Link>
        .
      </p>
    </>
  );
}
