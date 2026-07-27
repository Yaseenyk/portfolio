import type { CampusProject } from "@/lib/campus";

export const recommendationSystemMl: CampusProject = {
  slug: "recommendation-system-ml",
  title: "Recommendation System — hybrid collaborative + content filtering",
  category: "AI / Machine Learning · Python",
  tagline:
    "Recommends from real user behaviour, explains why, and handles the new-user problem.",
  summary:
    "Most recommender projects hardcode a similarity matrix, demo on the same three users, and freeze the moment an examiner logs in as someone new. This one builds collaborative filtering with matrix factorization, adds a content-based model for cold-start, blends the two, and shows why each item was recommended. It reports precision and recall honestly rather than claiming it is always right, and it answers the question that sinks most of these: what do you recommend to a user with no history?",
  degrees: ["MCA", "B.Tech", "M.Tech"],
  domain: "AI / Machine Learning",
  stack: [
    "Python",
    "pandas",
    "scikit-learn",
    "Surprise",
    "FastAPI",
    "React",
    "PostgreSQL",
  ],
  features: [
    "Personalised recommendations from a user's ratings and behaviour",
    "Content-based fallback so a brand-new user still gets sensible picks",
    "A plain-English 'why this was recommended' next to each item",
    "Honest evaluation — precision@k and recall, not a vanity accuracy",
    "Admin view of the catalogue and the interaction data",
    "A FastAPI service the React front end calls for live recommendations",
  ],
  modules: [
    "Collaborative vs content-based vs hybrid — and when each fails",
    "Preparing the data and building the user-item ratings matrix",
    "Matrix factorization (SVD) — the intuition without the heavy math",
    "Content features and similarity for the cold-start path",
    "Blending the two models and handling a brand-new user",
    "Evaluating honestly: precision@k, recall, and why accuracy lies here",
    "Serving with FastAPI and rendering recommendations in React",
    "Deployment and a full mock viva on the cold-start design",
  ],
  difficulty: "Advanced",
  sessionCount: 8,
  prices: { source: 6000, academic: 11000, mentored: 18000 },
  seatsPerCollege: 1,
  publishedAt: "2026-07-27",
};
