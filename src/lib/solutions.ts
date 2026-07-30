// Single source of truth for the /solutions surface — the client-facing side
// of the site, kept deliberately separate from /hire (recruiter-facing).
//
// Pricing note: every figure here is MINE. The page never states what a
// competitor charges, because an unsourced "SAP costs X" is the one claim on
// this surface that could actually be challenged. Transparent own-pricing
// against an unnamed "enterprise quote" does the same persuasive work.
import { SITE_URL } from "@/lib/site";

export type ServiceId =
  | "custom-build"
  | "ai-integration"
  | "erp"
  | "architecture";

export interface Service {
  id: ServiceId;
  name: string;
  /** Mono eyebrow. */
  category: string;
  tagline: string;
  summary: string;
  /** Concrete deliverables — what actually lands in their hands. */
  deliverables: string[];
  /** Typical engagement length, stated honestly. */
  timeline: string;
  priceFrom: number;
  priceTo: number;
  /** The objection this service usually meets, answered head-on. */
  objection: { q: string; a: string };
}

export const SERVICES: Service[] = [
  {
    id: "architecture",
    name: "Architecture review & advisory",
    category: "Advisory · fastest to start",
    tagline: "Find out what it should cost before anyone builds it.",
    summary:
      "You have a quote, a vendor proposal, or an internal plan, and no independent way to judge it. I read the requirement, map what actually needs building, and tell you where the estimate is real and where it is padding — in writing, with a recommended architecture you can hand to whoever builds it, including someone other than me.",
    deliverables: [
      "Written architecture document with a system diagram",
      "Build-versus-buy assessment per component",
      "An honest cost and timeline range for the work",
      "A review of any vendor proposal you already hold",
      "Two follow-up calls after delivery",
    ],
    timeline: "1–2 weeks",
    priceFrom: 25000,
    priceTo: 75000,
    objection: {
      q: "Why pay for advice from someone who wants to build it?",
      a: "Because the document is yours regardless of who builds it, and I will tell you when a component should be bought rather than built. If the answer is that you do not need a custom system, that is the answer you get — it is the cheapest possible outcome for you and the one that makes the advice worth paying for.",
    },
  },
  {
    id: "ai-integration",
    name: "AI integration into what you already run",
    category: "AI · most common request",
    tagline: "Agentic RAG and LLM workflows bolted onto your existing systems.",
    summary:
      "Most businesses do not need to replace anything to get value from AI. They need their own documents searchable and answerable, their repetitive document handling automated, or a workflow that currently costs three people a day made to run on its own. This is grounded retrieval over your data, wired into the systems you already have, with citations so an answer can always be traced back to its source.",
    deliverables: [
      "Retrieval pipeline over your documents or database",
      "Answers that cite their source, with a refusal path when retrieval finds nothing",
      "Integration into your existing stack — no rip and replace",
      "Cost controls: model routing and caching, so spend is predictable",
      "Handover documentation and a walkthrough with your team",
    ],
    timeline: "3–8 weeks",
    priceFrom: 150000,
    priceTo: 600000,
    objection: {
      q: "How do we know it will not make things up?",
      a: "Because it answers only from what it retrieved, and every answer carries a citation you can open. When retrieval finds nothing above the threshold, it says so instead of guessing. This is the part most AI demos skip and the part I build first — you will see it refuse to answer during the demo.",
    },
  },
  {
    id: "custom-build",
    name: "Fixed-scope custom systems",
    category: "Build · you own the code",
    tagline: "The internal tool, dashboard, or automation, built to a fixed price.",
    summary:
      "Scoped, quoted, and built to a written specification. Internal tools, operations dashboards, customer portals, integrations between systems that do not talk to each other. You get the source code and the deployment, not a licence — which means you can hire anyone to maintain it afterwards, including nobody.",
    deliverables: [
      "Complete source code in your repository, under your ownership",
      "Deployed and running on infrastructure you control",
      "Technical documentation and a handover session",
      "Fixed price agreed before work starts — scope changes are quoted, never assumed",
      "30 days of defect fixes after handover at no cost",
    ],
    timeline: "4–12 weeks",
    priceFrom: 200000,
    priceTo: 1000000,
    objection: {
      q: "What happens if you become unavailable halfway through?",
      a: "The code lives in your repository from the first commit, not mine, and it is documented as it is written rather than at the end. Payment is staged against delivered milestones, so you are never paid ahead of work. If everything stopped tomorrow you would hold working, documented code up to the last milestone and owe nothing further.",
    },
  },
  {
    id: "erp",
    name: "ERP and business system replacement",
    category: "Systems · largest engagements",
    tagline: "Build the twenty per cent of the ERP you actually use.",
    summary:
      "Enterprise ERP is priced for enterprises, and most mid-sized businesses use a fraction of what they license — while paying per seat, per year, forever, for the rest. The alternative is building precisely the modules you use, integrated with the accounting or compliance systems you must keep, and owning the result outright. Not always the right answer; the architecture review exists to establish whether it is yours.",
    deliverables: [
      "Module-by-module scope agreed before anything is built",
      "Migration plan and data import from your current system",
      "Integrations with the tools you are keeping",
      "Role-based access, audit trails, and reporting",
      "Staff training sessions and written operating documentation",
      "Phased delivery — each phase usable on its own",
    ],
    timeline: "3–9 months, delivered in phases",
    priceFrom: 600000,
    priceTo: 2500000,
    objection: {
      q: "Is replacing a working ERP not an enormous risk?",
      a: "Yes, which is why it is phased and why the first conversation is an architecture review rather than a proposal. Each phase is usable on its own and runs alongside your existing system until you choose to switch. If the review concludes that you should stay where you are and integrate instead, that is what the document will say.",
    },
  },
];

export interface HostedTier {
  id: string;
  name: string;
  monthly: number;
  setupFrom: number;
  best: string;
  includes: string[];
  featured?: boolean;
}

/**
 * The small-business side. A hosted subscription is a standing commitment —
 * uptime, backups and support do not stop — so a setup fee covers the build
 * and the monthly covers running it. Both tiers are cancellable with the data
 * exported, which is the clause that makes a small buyer comfortable.
 */
export const HOSTED_TIERS: HostedTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 800,
    setupFrom: 15000,
    best: "One tool doing one job — bookings, invoices, stock, enquiries.",
    includes: [
      "One hosted application, running on infrastructure I maintain",
      "Up to 3 staff logins",
      "Daily automated backups",
      "Small changes each month — text, fields, a new report",
      "Email support, replies within two working days",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 2500,
    setupFrom: 40000,
    best: "A few tools, more staff, or something customers log into.",
    featured: true,
    includes: [
      "Everything in Starter",
      "Up to 3 applications and 15 staff logins",
      "A customer-facing portal or public booking page",
      "Integrations — payments, WhatsApp, accounting exports",
      "Priority support, replies within one working day",
      "A monthly call to plan changes",
    ],
  },
];

export const HOSTED_POLICY = {
  cancel: "Cancel any month. Your data is exported in a standard format within seven days, at no charge.",
  ownership:
    "If you would rather run it yourself, the source and deployment are handed over for a one-time fee. You are never locked in.",
  honest:
    "This is one engineer, not a support desk. Response times above are real commitments; a 24/7 phone line is not something I offer, and you should not buy it from anyone who is a single person.",
};

export const ENGAGEMENT_STEPS = [
  {
    n: "01",
    title: "A call that costs nothing",
    body: "Thirty minutes. What you are trying to fix, what you already run, and what it has been quoted at. You leave with an honest opinion on whether this is worth building at all.",
  },
  {
    n: "02",
    title: "Written scope and a fixed price",
    body: "What will be built, what will not, the technologies, the milestones, and the number. Agreed before any work begins, and it does not move unless you change the scope.",
  },
  {
    n: "03",
    title: "Build in the open",
    body: "Code goes into your repository from the first commit. Weekly demos of something running, not status reports. Payment is staged against delivered milestones.",
  },
  {
    n: "04",
    title: "Handover, then step back",
    body: "Source, deployment, documentation and a training session for your team. You can maintain it yourself, hire anyone else, or keep me on. No licence, no lock-in.",
  },
];

export const SOLUTIONS_FAQ = [
  {
    question: "Why would I hire one engineer instead of a software company?",
    answer:
      "For the right size of problem, you get the person who designs the system also writing it, which removes the layer where requirements get lost. It is the wrong choice when you need twenty people in parallel or a 24/7 support desk — and I will tell you when that is the case rather than take the work.",
  },
  {
    question: "How do I know you can actually deliver this?",
    answer:
      "Every claim on this site points at something you can open. The products page carries architecture teardowns of systems built and shipped solo, the source repositories are public, and the professional history is on LinkedIn. Start with the evidence rather than the promises.",
  },
  {
    question: "Do I own the code?",
    answer:
      "Yes, on every engagement except the hosted subscription, where I run it for you — and even there the source can be handed over for a one-time fee. Code lives in your repository from the first commit. There is no licence to renew and nothing to be locked into.",
  },
  {
    question: "How is the price fixed if the scope changes?",
    answer:
      "The price is fixed against a written scope. If you want something outside it, that is quoted separately before it is built — never assumed and never invoiced as a surprise. Changes I got wrong are mine to fix at no cost.",
  },
  {
    question: "What if you take a full-time role midway through?",
    answer:
      "Your code sits in your repository, documented as it is written, and payment is staged against delivered milestones so you are never paid ahead of work. Any engagement I take on is one I have the capacity to finish; if I do not have that capacity, the honest answer at the first call is no.",
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "Yes. Work is remote and has been for most of my career, across IST-overlapping and Western hours. Pricing on this page is in rupees; international engagements are quoted in your currency.",
  },
];

export function solutionsUrl(path = ""): string {
  return `${SITE_URL}/solutions${path}/`;
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Compact form for large figures — "₹6L" reads better than "₹6,00,000". */
export function formatInrShort(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}k`;
  return `₹${amount}`;
}
