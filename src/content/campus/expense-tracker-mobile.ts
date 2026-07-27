import type { CampusProject } from "@/lib/campus";

export const expenseTrackerMobile: CampusProject = {
  slug: "expense-tracker-mobile",
  title: "Smart Expense Tracker — offline-first mobile app",
  category: "Mobile · React Native",
  tagline:
    "A real Android app that works with the internet off, and auto-categorises what you spend.",
  summary:
    "Most mobile projects are a form over an API and die when the campus wifi drops during the demo. This one stores everything in on-device SQLite, works fully offline, and syncs when a connection returns. Expenses are auto-categorised from the merchant text, budgets raise alerts before they are breached, and the charts are computed from real queries rather than hardcoded arrays. It installs on the examiner's phone.",
  degrees: ["BCA", "MCA", "B.Tech", "B.Sc IT"],
  domain: "Mobile Application",
  stack: [
    "React Native (Expo)",
    "TypeScript",
    "SQLite",
    "Zustand",
    "Victory Native",
    "Node.js",
    "Express",
  ],
  features: [
    "Add, edit, and delete expenses entirely offline — no network required",
    "Auto-categorisation of expenses from merchant and note text",
    "Monthly budgets per category with alerts before the limit is crossed",
    "Charts for spend by category and trend over time, from live queries",
    "Background sync to a Node backend once a connection returns",
    "Export a monthly statement as CSV",
  ],
  modules: [
    "Why offline-first, and what that forces in the architecture",
    "Expo project structure, navigation, and screen composition",
    "The SQLite layer — schema, migrations, and typed queries",
    "State with Zustand, and keeping the UI in sync with the database",
    "Categorisation logic and the budget alert engine",
    "The sync protocol: queueing writes and resolving conflicts",
    "Charts, building the APK, and mock viva on the offline design",
  ],
  difficulty: "Intermediate",
  sessionCount: 7,
  prices: { source: 5000, academic: 9000, mentored: 15000 },
  seatsPerCollege: 2,
  publishedAt: "2026-07-27",
};
