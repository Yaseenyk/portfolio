import type { CampusProject } from "@/lib/campus";

export const bloodBankManagement: CampusProject = {
  slug: "blood-bank-management",
  title: "Blood Bank Management System — MERN with donor matching",
  category: "Web Development · MERN",
  tagline:
    "Matches donors to requests by blood group and location, and never shows stale stock.",
  summary:
    "Most blood-bank projects are a table of donor names with no logic behind them, and they stall the moment an examiner asks which group can donate to which. This one manages donors, inventory by blood group, and requests — matching a request to eligible donors using real group compatibility and location, decrementing stock every time a unit is issued, and keeping an audit trail of where each unit went. It is a clean, honest database project that actually enforces its own rules.",
  degrees: ["Diploma", "BCA", "B.Sc IT"],
  domain: "Web Development",
  stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  features: [
    "Donor registry with eligibility from the last-donation gap",
    "Inventory tracked by blood group, updated on every issue",
    "Request matching to compatible donors by group and location",
    "Issuing a unit decrements stock and writes an audit trail",
    "Role-based access for admin and staff",
    "Dashboard and printable reports on stock and requests",
  ],
  modules: [
    "Schema design for donors, inventory, and requests",
    "Blood-group compatibility — encoding the rules the panel will test",
    "The matching query: eligible donors by group and location",
    "Issuing a unit: stock decrement and the audit trail",
    "Authentication and admin / staff roles",
    "The React dashboard and report screens",
    "Deployment and a full mock viva on the compatibility logic",
  ],
  difficulty: "Beginner",
  sessionCount: 6,
  prices: { source: 4000, academic: 7500, mentored: 12000 },
  seatsPerCollege: 3,
  publishedAt: "2026-07-27",
};
