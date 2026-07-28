import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "ai-ml-final-year-projects",
  title: "AI & Machine Learning Final Year Projects (With Source Code)",
  h1: "AI and machine learning final year projects that survive the viva",
  description:
    "AI and machine learning final year projects with source code for Indian students — the sub-areas, the one viva question each attracts, and the real projects we build.",
  tldr: "The strongest AI and ML final year projects are ones you can fully defend — a classifier, recommender, NLP or computer-vision system on a clean public dataset where you understand the data, the metric, and what the model gets wrong. Full source code, the report, and the training notebook come with each.",
  category: "Project ideas",
  publishedAt: "2026-07-27",
  readingMinutes: 10,
  ogImage: "/social/portal-wide.jpg",
  faq: [
    {
      question: "Are machine learning projects good for final year?",
      answer:
        "They impress a panel more than a plain CRUD app, but only if you can explain your dataset, your metric, and what your model gets wrong. An ML project you cannot defend scores worse than a simple web app you can. Pick one where you understand every number.",
    },
    {
      question: "Do AI and ML final year projects come with source code?",
      answer:
        "The ones we build do — full source on every tier, plus the report, the diagrams, and the training notebook. Source code being included is the baseline, not an upsell. The thing students actually run out of time for is the viva prep, which is why we do that live.",
    },
    {
      question: "Which machine learning project is easiest to defend in a viva?",
      answer:
        "One with a clear, honest metric and a visible failure mode. A classifier that shows its confidence and admits when it is unsure is far easier to defend than one that silently guesses, because the panel's first question is always how you know it is not guessing.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        A machine learning project impresses a panel before you say a word. It
        signals that you did something harder than a CRUD form, and examiners
        reward that. But it is also where more final year projects quietly
        collapse than anywhere else, and they collapse on one question:{" "}
        <strong>
          what does your model get wrong, and how do you know it is not just
          guessing?
        </strong>
      </p>
      <p>
        Most students train a model, screenshot a high accuracy number, and stop.
        Then the panel asks about the class distribution, or what happens on an
        input the model has never seen, and there is nothing to say. The accuracy
        was on a test set that looked exactly like the training set, and the whole
        thing folds. An ML project you cannot defend scores worse than a plain web
        app you can &mdash; so the entire game is picking an area where you
        understand the failure mode, not just the demo.
      </p>
      <p>
        Below are the sub-areas that work for a final year project, the one viva
        question each reliably attracts, and then the real projects we build with
        source code and line-by-line viva sessions.
      </p>

      <h2>Natural language processing (NLP)</h2>
      <p>
        Text classification &mdash; spam, sentiment, fake news, topic tagging.
        Approachable because the data is everywhere and the pipeline is
        well-trodden: clean the text, vectorise it, train a classifier. The trap
        is that a bag-of-words model can score well on a leaky dataset and mean
        nothing.
      </p>
      <p>
        <strong>The viva question:</strong> &ldquo;Which words is your model
        actually keying on?&rdquo; If you cannot show the features driving a
        prediction, the panel assumes it learned the dataset, not the language.
      </p>

      <h2>Computer vision (CV)</h2>
      <p>
        Image classification and detection &mdash; leaf disease, defects, medical
        scans, face recognition. The most visually impressive category, which is
        exactly why panels probe it hardest. A CNN that hits 98% on a clean
        Kaggle set often falls apart on a photo you take yourself.
      </p>
      <p>
        <strong>The viva question:</strong> &ldquo;What does it do with a blurry,
        badly-lit, or completely unrelated image?&rdquo; The marks are in
        rejecting or flagging the input you were not trained on, not in the clean
        demo.
      </p>

      <h2>Recommender systems</h2>
      <p>
        Suggesting products, movies, courses, or content from user behaviour.
        Attractive because it feels like a real product, and there is genuine
        logic to explain &mdash; collaborative filtering, content-based, or a
        hybrid. The trap is the cold-start problem.
      </p>
      <p>
        <strong>The viva question:</strong> &ldquo;What do you recommend to a
        brand-new user with no history?&rdquo; A recommender with no answer for
        the new user is a recommender that only works in the demo.
      </p>

      <h2>RAG and LLM applications</h2>
      <p>
        Retrieval-augmented generation &mdash; a chatbot that answers from a
        specific set of documents instead of making things up. The current
        favourite, and a strong one, because it is genuinely modern and useful.
        The trap is treating the LLM as magic and having no story for grounding.
      </p>
      <p>
        <strong>The viva question:</strong> &ldquo;How do you stop it inventing an
        answer that is not in your documents?&rdquo; If you cannot point to
        retrieval and citations, the panel correctly calls it a wrapper around
        someone else&rsquo;s API.
      </p>

      <h2>The projects we actually build</h2>
      <p>
        Every project below ships with full source code on every tier, the report
        and diagrams written to match the code, and live sessions that walk you
        through it line by line so the viva questions above have real answers.
        Seats are capped per college, so no two students at the same institution
        get handed the same defence.
      </p>
      <ul>
        <li>
          <Link href="/final-year-projects/ai-college-assistant">
            AI College Assistant (agentic RAG)
          </Link>{" "}
          &mdash; answers from your college&rsquo;s own PDFs and cites the page it
          answered from, so &ldquo;how do you know it is not hallucinating&rdquo;
          has a one-click answer.
        </li>
        <li>
          <Link href="/final-year-projects/recommendation-system-ml">
            Recommendation System (hybrid ML)
          </Link>{" "}
          &mdash; combines collaborative and content-based filtering and has a
          real answer for the new-user cold-start, which is the question this
          topic always attracts.
        </li>
        <li>
          <Link href="/final-year-projects/fake-news-detection-ml">
            Fake News Detection (NLP)
          </Link>{" "}
          &mdash; returns a confidence score and the words that drove the
          decision, so you can show the panel what the model is keying on instead
          of hand-waving.
        </li>
        <li>
          <Link href="/final-year-projects/plant-disease-detection">
            Plant Disease Detection (CV)
          </Link>{" "}
          &mdash; a CNN tested on real phone photos, not just a clean dataset, so
          the &ldquo;what about a bad image&rdquo; question is already handled.
        </li>
        <li>
          <Link href="/final-year-projects/resume-screening-ml">
            Resume Screening &amp; Job Match
          </Link>{" "}
          &mdash; ranks resumes against a job description and shows why each one
          scored what it did, which turns an opaque model into an explainable one.
        </li>
        <li>
          <Link href="/final-year-projects/face-recognition-attendance">
            Face Recognition Attendance (CV)
          </Link>{" "}
          &mdash; the marks are in rejecting an unknown face rather than guessing
          the nearest match, and that rejection path is built and explained.
        </li>
      </ul>

      <hr />

      <p>
        If none of these fit your college&rsquo;s brief, we{" "}
        <Link href="/final-year-projects/custom">build to a custom spec</Link>{" "}
        with the same source, documentation, and viva sessions. Not sure ML is the
        right call for your degree? Read{" "}
        <Link href="/final-year-projects/guides/how-to-choose-a-final-year-project">
          how to choose a final year project
        </Link>{" "}
        first, then browse by degree:{" "}
        <Link href="/final-year-projects/for/bca">BCA</Link>,{" "}
        <Link href="/final-year-projects/for/mca">MCA</Link>,{" "}
        <Link href="/final-year-projects/for/btech">B.Tech</Link>, or{" "}
        <Link href="/final-year-projects/for/mtech">M.Tech</Link>. Or see the{" "}
        <Link href="/final-year-projects">full catalog</Link>.
      </p>
    </>
  );
}
