import type { CampusProject } from "@/lib/campus";

export const hospitalManagementMern: CampusProject = {
  slug: "hospital-management-mern",
  title: "Hospital Management System (MERN)",
  category: "Full-Stack · MERN",
  tagline:
    "Three roles, real appointment conflicts, and a schema that holds up when the examiner pokes it.",
  summary:
    "The most-attempted project in Indian colleges, built the way it should be. Separate portals for patients, doctors, and admin; JWT auth with role guards on every route; appointment booking that actually detects slot collisions instead of overwriting them; and prescriptions and billing tied to real MongoDB relations. The marks in this project are in the schema design and the auth flow, so that is where the sessions spend their time.",
  degrees: ["BCA", "MCA", "B.Tech", "B.Sc IT"],
  domain: "Web Development",
  stack: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "JWT",
    "Tailwind CSS",
  ],
  features: [
    "Three role-based portals — patient, doctor, admin — behind one login",
    "Appointment booking with real slot-conflict detection per doctor",
    "Doctors write prescriptions against a visit; patients see their history",
    "Auto-generated bills with printable invoices",
    "Admin dashboard: doctor onboarding, department management, daily load",
    "Search and filter across patients, doctors, and appointments",
  ],
  modules: [
    "Schema design — how the six collections relate, and why not one big document",
    "Auth: hashing, JWT issue and verify, and role-guarded middleware",
    "The appointment engine — slot generation and conflict detection logic",
    "Express route structure, controllers, and centralised error handling",
    "React app structure: routing, protected routes, and shared state",
    "Prescriptions and billing — the write path end to end",
    "Deployment on a free tier, plus mock viva on schema and auth",
  ],
  difficulty: "Intermediate",
  sessionCount: 7,
  prices: { source: 4500, academic: 8500, mentored: 15000 },
  seatsPerCollege: 2,
  publishedAt: "2026-07-27",
};
