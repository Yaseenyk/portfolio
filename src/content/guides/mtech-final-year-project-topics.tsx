import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import TopicTable, { type Topic } from "@/components/campus/TopicTable";

export const meta: GuideMeta = {
  slug: "mtech-final-year-project-topics",
  title: "M.Tech Final Year Project Topics (With Source Code)",
  h1: "M.Tech final year project topics with a research angle",
  description:
    "M.Tech project ideas that carry a novelty angle a paper can be built on, each with the contribution to defend and the stack it needs. Full source code included on every tier.",
  tldr: "A strong M.Tech project carries a defensible novelty angle — a new method, a new comparison, a new dataset, or a measurable improvement over a baseline — framed like a paper: problem, related work, method, results, limitations. Full source code, the trained model, and the evaluation scripts are included on every tier.",
  category: "Project ideas",
  publishedAt: "2026-07-27",
  readingMinutes: 11,
  degrees: ["M.Tech"],
  ogImage: "/social/portal-wide.jpg",
  faq: [
    {
      question: "What makes a good M.Tech final year project?",
      answer:
        "A defensible contribution, not just working software. An M.Tech thesis is marked on novelty — a new method, a new comparison, a new dataset, or a measurable improvement over an existing baseline. You need a question your work answers and numbers that answer it, on top of a system that runs.",
    },
    {
      question: "Do M.Tech projects need a published paper?",
      answer:
        "Many departments expect at least a conference or journal submission, and some make it a requirement for the degree. Even where it is optional, framing the work as a paper — problem, related work, method, results, limitations — is exactly the structure your thesis and viva are graded against, so build for it from day one.",
    },
    {
      question: "Can I get the source code for an M.Tech project?",
      answer:
        "Yes — full source code is included on every tier, along with the trained model, the dataset pipeline and the evaluation scripts that produce your metrics. The Mentored tier adds live sessions that walk through the method and the results so you can defend the contribution, not just run the code.",
    },
  ],
};

const ML_TOPICS: Topic[] = [
  {
    title: "Recommendation system with a cold-start improvement",
    stack: "Python, scikit-learn or PyTorch, a public dataset",
    difficulty: "Hard",
    why: "The novelty is your handling of new users or items — a measurable lift over a plain collaborative-filtering baseline is your contribution.",
    question: "What is your baseline, and by how much do you beat it?",
  },
  {
    title: "Fake news / misinformation detection with explainability",
    stack: "Python, transformers, LIME or SHAP",
    difficulty: "Hard",
    why: "The contribution is not classifying — it is explaining why, and reporting where the model fails. That is what turns a demo into a paper.",
    question: "Show me an example your model gets confidently wrong.",
  },
  {
    title: "Resume screening / candidate ranking with bias analysis",
    stack: "Python, NLP embeddings, a fairness metric",
    difficulty: "Hard",
    why: "Ranking is easy; auditing the ranking for bias is the research angle and the part a panel will push hardest on.",
    question: "How do you know your ranking is not biased by the wording?",
  },
  {
    title: "Plant disease detection with a lightweight / edge model",
    stack: "Python, CNNs, transfer learning, TensorFlow Lite",
    difficulty: "Hard",
    why: "The novelty is the trade-off — accuracy against model size or inference time — presented as a curve, not a single number.",
    question: "What did you give up in accuracy to run this on a phone?",
  },
  {
    title: "Face recognition attendance robust to spoofing or occlusion",
    stack: "Python, OpenCV, a face-embedding model",
    difficulty: "Very hard",
    why: "The contribution is rejection — proving the system refuses a photo or an unenrolled face is harder and more publishable than matching.",
    question: "What happens when someone holds up a printed photo?",
  },
];

const SYSTEMS_TOPICS: Topic[] = [
  {
    title: "RAG-based domain assistant with a retrieval evaluation",
    stack: "Python, a vector database, an LLM API, RAGAS or a custom eval",
    difficulty: "Hard",
    why: "Anyone can wire up retrieval; the contribution is measuring retrieval quality and grounding, and showing where it hallucinates.",
    question: "How do you measure whether an answer is actually grounded?",
  },
  {
    title: "Comparative study of models on a domain dataset you built",
    stack: "Python, several model families, a held-out test set",
    difficulty: "Hard",
    why: "A carefully built dataset plus an honest comparison is a legitimate M.Tech contribution on its own — the data is the novelty.",
    question: "Why is your dataset a fair test, and how did you split it?",
  },
  {
    title: "Anomaly or intrusion detection with a new feature set",
    stack: "Python, scikit-learn, a public security dataset",
    difficulty: "Hard",
    why: "The angle is the features you engineered and the precision-recall trade-off at a chosen operating point, not raw accuracy.",
    question: "At your threshold, what is the false-positive rate?",
  },
];

export function Body() {
  return (
    <>
      <p>
        M.Tech is not marked on working software. It is marked on a{" "}
        <strong>defensible contribution</strong> &mdash; a method, a comparison, a
        dataset, or a measurable improvement that did not exist before you started.
        A system that runs is the floor, not the deliverable. The question every
        panel is really asking is: what is new here, and how do you know it works?
      </p>
      <p>
        So the ideas below are chosen for one property: each has a clear novelty
        angle you can turn into a paper. Every entry lists the question the panel
        opens with, because at this level that question is about your contribution,
        not your code. Before you pick, decide what your baseline is and what number
        you intend to move &mdash; that decision is your whole thesis.
      </p>

      <h2>Machine learning and deep learning</h2>
      <p>
        The most common M.Tech route, and the most crowded. The way out of the crowd
        is never the model &mdash; it is what you measure. Pick a baseline from the
        literature, beat it or explain honestly why you cannot, and report the
        failure cases. A results section that only contains wins reads as fabricated.
      </p>
      <TopicTable topics={ML_TOPICS} />

      <h2>Applied systems and evaluation</h2>
      <p>
        Underused, and often the stronger thesis. Building a dataset, or measuring
        something everyone else only demos, is a genuine contribution &mdash; and it
        is far easier to defend than yet another classifier, because the novelty is
        the evaluation itself.
      </p>
      <TopicTable topics={SYSTEMS_TOPICS} />

      <h2>What turns an M.Tech project into a thesis</h2>
      <ol>
        <li>
          <strong>A named baseline.</strong> &ldquo;My model gets 94%&rdquo; means
          nothing without the number you are beating. Cite the prior work you compare
          against, and reproduce its result on your split.
        </li>
        <li>
          <strong>An honest limitations section.</strong> Every method fails
          somewhere. Finding your own failure cases before the panel does is the
          difference between a viva you control and one you do not.
        </li>
        <li>
          <strong>Reproducibility.</strong> Fixed seeds, a documented split, and a
          script that regenerates every number in your thesis. Examiners at this level
          ask to see it run.
        </li>
        <li>
          <strong>A paper-shaped write-up.</strong> Problem, related work, method,
          results, limitations. If your report already follows a paper&rsquo;s
          structure, a submission is a formatting job, not a rewrite.
        </li>
      </ol>

      <hr />

      <p>
        Every ML build on this site ships with the full source code, the trained
        model, the dataset pipeline and the evaluation scripts that produce your
        metrics &mdash; plus daily sessions that walk through the method and the
        results line by line, so you defend the contribution and not just the syntax.
        Start with{" "}
        <Link href="/final-year-projects/for/mtech">the M.Tech projects</Link>. The
        research-angle builds above map to{" "}
        <Link href="/final-year-projects/recommendation-system-ml">
          the recommendation system
        </Link>
        ,{" "}
        <Link href="/final-year-projects/fake-news-detection-ml">
          fake news detection
        </Link>
        ,{" "}
        <Link href="/final-year-projects/resume-screening-ml">
          resume screening
        </Link>
        ,{" "}
        <Link href="/final-year-projects/plant-disease-detection">
          plant disease detection
        </Link>
        , the{" "}
        <Link href="/final-year-projects/ai-college-assistant">
          RAG college assistant
        </Link>{" "}
        and{" "}
        <Link href="/final-year-projects/face-recognition-attendance">
          face recognition attendance
        </Link>
        . Each is capped per college, and the Mentored tier varies a module &mdash;
        the dataset or the domain &mdash; so your contribution is genuinely yours.
      </p>
      <p>
        If your guide has already approved a specific novelty,{" "}
        <Link href="/final-year-projects/custom">
          have it built and evaluated for you
        </Link>
        . And frame the work early &mdash;{" "}
        <Link href="/final-year-projects/guides/final-year-project-synopsis-format">
          the synopsis format
        </Link>{" "}
        is where you state the contribution your thesis will be graded on.
      </p>
    </>
  );
}
