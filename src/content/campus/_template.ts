// Template for a Final Year Project listing. Copy to <slug>.ts, fill it in,
// then import it into `CAMPUS_PROJECTS` in src/lib/campus.ts — a listing is
// not live until it appears in that array.
//
// Import the TYPE only. Pulling a runtime value out of lib/campus here would
// close an import cycle and fail the static export.
import type { CampusProject } from "@/lib/campus";

export const template: CampusProject = {
  slug: "your-project-slug",
  title: "Human-readable project title",
  category: "Machine Learning · Python",
  tagline: "One line a student would repeat to their guide.",
  summary:
    "Two or three sentences on what the system does and why it earns marks. This doubles as the SEO description, so lead with the problem it solves.",
  degrees: ["BCA", "MCA", "B.Tech"],
  domain: "Machine Learning",
  stack: ["Python", "Flask", "scikit-learn", "MySQL"],
  features: [
    "What a user can actually do in the running app",
    "One bullet per capability, not per file",
  ],
  modules: [
    "Module walked through in session 1",
    "Module walked through in session 2",
  ],
  difficulty: "Intermediate",
  sessionCount: 6,
  prices: { source: 4000, academic: 8000, mentored: 15000 },
  seatsPerCollege: 2,
  publishedAt: "2026-07-27",
};
