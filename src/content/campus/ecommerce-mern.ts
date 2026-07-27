import type { CampusProject } from "@/lib/campus";

export const ecommerceMern: CampusProject = {
  slug: "ecommerce-mern",
  title: "E-Commerce Platform — MERN stack with a real cart & checkout",
  category: "Web Development · MERN",
  tagline:
    "A full store with a cart that survives a refresh, real stock, and a working checkout.",
  summary:
    "Most e-commerce projects are a product grid with a Buy button that does nothing, and they collapse the moment an examiner asks what happens when two people buy the last item. This one keeps the cart on the server so it survives refresh and login, decrements stock so it can never oversell, and runs a real Razorpay test-mode checkout that produces an order you can open in an admin panel. It behaves like a shop, not a screenshot.",
  degrees: ["BCA", "MCA", "B.Tech", "B.Sc IT"],
  domain: "Web Development",
  stack: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redux Toolkit",
    "JWT",
    "Razorpay (test mode)",
  ],
  features: [
    "Product catalogue with search, category filters, and pagination",
    "Server-side cart that persists across refresh, logout, and device",
    "Stock decremented safely so two buyers can never oversell the last unit",
    "Razorpay test-mode checkout with an order confirmation and receipt",
    "Per-user order history with status tracking",
    "Admin panel to manage products, stock, and incoming orders",
  ],
  modules: [
    "Architecture — why MERN, the auth flow, and how the layers talk",
    "MongoDB schema: products, users, cart, and orders",
    "JWT authentication and protected routes, front and back",
    "Cart logic and the oversell problem — why stock lives on the server",
    "Razorpay test integration and verifying the payment callback",
    "The admin panel: product CRUD and order management",
    "React + Redux Toolkit UI, and keeping cart state honest",
    "Deployment, environment secrets, and full mock viva",
  ],
  difficulty: "Intermediate",
  sessionCount: 8,
  prices: { source: 5500, academic: 10000, mentored: 16000 },
  seatsPerCollege: 2,
  publishedAt: "2026-07-27",
};
