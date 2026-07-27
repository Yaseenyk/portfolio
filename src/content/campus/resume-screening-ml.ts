import type { CampusProject } from "@/lib/campus";

export const resumeScreeningMl: CampusProject = {
  slug: "resume-screening-ml",
  title: "AI Resume Screening & Job Match System",
  category: "NLP · Machine Learning",
  tagline: "Ranks resumes against a job description, and shows why each one scored what it did.",
  summary:
    "Upload a job description and a folder of resumes; the system parses each PDF, extracts skills and experience, scores the match, and ranks the candidates. The part that earns marks is explainability — every score breaks down into the skills matched, the skills missing, and the experience gap, so it is a model you can defend rather than a black box that prints a number.",
  degrees: ["MCA", "B.Tech", "BCA", "M.Tech"],
  domain: "AI / Machine Learning",
  stack: [
    "Python",
    "Flask",
    "scikit-learn",
    "spaCy",
    "TF-IDF",
    "PyPDF2",
    "MySQL",
    "Bootstrap",
  ],
  features: [
    "Bulk resume upload with PDF and DOCX parsing",
    "Skill and experience extraction using an NLP entity pipeline",
    "Match score against any pasted job description, with a ranked shortlist",
    "Per-candidate breakdown: skills matched, skills missing, experience gap",
    "Recruiter dashboard with saved job posts and past shortlists",
    "Candidate view showing what to add to score higher",
  ],
  modules: [
    "Text extraction from PDFs and why parsing is the hard half of this project",
    "The NLP pipeline — tokenising, entity extraction, and the skill dictionary",
    "Vectorising text: TF-IDF explained, and cosine similarity by hand",
    "Turning similarity into an explainable score with weighted components",
    "Flask app, database schema, and the recruiter dashboard",
    "Evaluating the model, discussing its bias and limits, and mock viva",
  ],
  difficulty: "Intermediate",
  sessionCount: 6,
  prices: { source: 4500, academic: 8000, mentored: 14000 },
  seatsPerCollege: 2,
  publishedAt: "2026-07-27",
};
