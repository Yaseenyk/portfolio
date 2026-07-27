import type { CampusProject } from "@/lib/campus";

export const fakeNewsDetectionMl: CampusProject = {
  slug: "fake-news-detection-ml",
  title: "Fake News Detection — an NLP classifier that shows its reasoning",
  category: "AI / Machine Learning · NLP",
  tagline:
    "Classifies an article as real or fake, with a confidence score and the words that drove it.",
  summary:
    "Most fake-news projects are a pasted Kaggle notebook that reports 99% accuracy and cannot explain a single prediction. This one builds the NLP pipeline properly — cleaning, tokenizing, TF-IDF, a trained classifier, with an optional transformer upgrade — reports real metrics with a confusion matrix, and surfaces the exact words that pushed a decision. It is built to answer the one question that ends most of these vivas honestly: what does your model get wrong, and why?",
  degrees: ["MCA", "B.Tech", "M.Tech"],
  domain: "AI / Machine Learning",
  stack: [
    "Python",
    "scikit-learn",
    "NLTK",
    "TF-IDF",
    "FastAPI",
    "React",
  ],
  features: [
    "Paste or upload an article and get real / fake with a confidence score",
    "Explainability — the top words that pushed the prediction each way",
    "A confusion matrix and honest precision / recall, not just accuracy",
    "Batch-classify a CSV of articles at once",
    "Admin option to retrain the model on new labelled data",
    "A FastAPI service behind a clean React front end",
  ],
  modules: [
    "The NLP pipeline: cleaning, tokenizing, and vectorizing text",
    "TF-IDF and a classifier baseline that actually generalises",
    "Evaluation: the confusion matrix and why accuracy lies on imbalance",
    "Explainability — reading feature weights back into words",
    "An optional transformer upgrade and when it is worth it",
    "Serving the model with FastAPI",
    "The React UI for single and batch classification",
    "Deployment and a full mock viva on the error analysis",
  ],
  difficulty: "Advanced",
  sessionCount: 8,
  prices: { source: 6000, academic: 11000, mentored: 18000 },
  seatsPerCollege: 1,
  publishedAt: "2026-07-27",
};
