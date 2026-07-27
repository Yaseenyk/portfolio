// Single source of truth for the Final Year Projects surface: the
// /final-year-projects catalog, each /final-year-projects/<slug> page, the
// custom-build brief, and the sitemap all read from here.
//
// Listing files under src/content/campus/ import the TYPE only — importing a
// runtime value from here would create an import cycle and hit a TDZ error
// during the static export.
import { SITE_URL } from "@/lib/site";
import { aiCollegeAssistant } from "@/content/campus/ai-college-assistant";
import { hospitalManagementMern } from "@/content/campus/hospital-management-mern";
import { expenseTrackerMobile } from "@/content/campus/expense-tracker-mobile";
import { resumeScreeningMl } from "@/content/campus/resume-screening-ml";
import { faceRecognitionAttendance } from "@/content/campus/face-recognition-attendance";
import { ecommerceMern } from "@/content/campus/ecommerce-mern";
import { realtimeChatMern } from "@/content/campus/realtime-chat-mern";
import { recommendationSystemMl } from "@/content/campus/recommendation-system-ml";
import { fakeNewsDetectionMl } from "@/content/campus/fake-news-detection-ml";
import { plantDiseaseDetection } from "@/content/campus/plant-disease-detection";
import { bloodBankManagement } from "@/content/campus/blood-bank-management";

export type Degree = "BCA" | "MCA" | "B.Tech" | "B.Sc IT" | "M.Tech" | "Diploma";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type TierId = "source" | "academic" | "mentored";

export interface CampusPrices {
  source: number;
  academic: number;
  mentored: number;
}

export interface CampusTier {
  id: TierId;
  name: string;
  /** Total price in INR. */
  price: number;
  /** Number of monthly installments the total is split across. */
  emiMonths: number;
  includes: string[];
}

export interface CampusProject {
  slug: string;
  title: string;
  /** Mono eyebrow, e.g. "Machine Learning · Python". */
  category: string;
  /** One-line positioning under the title. */
  tagline: string;
  /** Card body + SEO description. */
  summary: string;
  degrees: Degree[];
  domain: string;
  stack: string[];
  /** What the built system actually does — user-facing capabilities. */
  features: string[];
  /** Code modules walked through in the sessions. */
  modules: string[];
  difficulty: Difficulty;
  /** Live sessions included in the Mentored tier. */
  sessionCount: number;
  prices: CampusPrices;
  /** How many students at one college may buy this in one academic year. */
  seatsPerCollege: number;
  demoUrl?: string;
  /**
   * Share/rich-result image (site-relative), e.g. "/social/ai-college.jpg".
   * Omit to fall back to the brand-locked FYP portal image — see
   * campusImageUrl(). Generate bespoke per-project images with
   * scripts/campus_social.py when you want them.
   */
  ogImage?: string;
  publishedAt: string;
}

/** Sessions run live on Google Meet, one per day, after 8 PM IST. */
export const SESSION_POLICY = {
  platform: "Google Meet",
  startsAfter: "8:00 PM IST",
  cadence: "Daily",
  durationMinutes: 60,
};

/**
 * Payment is direct (UPI / bank transfer) and split into monthly
 * installments — no gateway, no checkout on this site. Sessions begin once
 * the first installment clears; full source, report, and deployment handover
 * happens after the final installment.
 */
export const PAYMENT_POLICY = {
  method: "Direct UPI / bank transfer",
  sessionsStart: "After the first installment",
  handover: "After the final installment",
};

export const CUSTOM_BUILD_RANGE = { min: 10000, max: 50000 };

/** WhatsApp is the conversion channel for this audience — every CTA offers it. */
export const WHATSAPP_NUMBER = "918208335028";

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Launch offer. This is the honest substitute for testimonials the site does
 * not have yet: a real discount for the first students, in exchange for
 * permission to publish what they thought. Set `seats` to 0 to retire it —
 * the band disappears everywhere rather than going stale.
 */
export const EARLY_BIRD = {
  seats: 3,
  discountPercent: 40,
  condition:
    "in exchange for an honest review and permission to show your finished project here",
};

/**
 * Registered listings, newest first. Add a file under `src/content/campus/`
 * and import it above — nothing is live until it appears in this array.
 */
export const CAMPUS_PROJECTS: CampusProject[] = [
  ecommerceMern,
  realtimeChatMern,
  recommendationSystemMl,
  fakeNewsDetectionMl,
  plantDiseaseDetection,
  bloodBankManagement,
  aiCollegeAssistant,
  hospitalManagementMern,
  expenseTrackerMobile,
  resumeScreeningMl,
  faceRecognitionAttendance,
];

/**
 * The standard three tiers for a listing. Inclusions are identical across the
 * catalog so a student comparing two projects is only comparing the projects.
 */
export function getTiers(project: CampusProject): CampusTier[] {
  return [
    {
      id: "source",
      name: "Source",
      price: project.prices.source,
      emiMonths: 1,
      includes: [
        "Full source code",
        "Local setup guide",
        "Sample dataset / seed data",
        "One handover call",
      ],
    },
    {
      id: "academic",
      name: "Academic",
      price: project.prices.academic,
      emiMonths: 2,
      includes: [
        "Everything in Source",
        "Project report (synopsis + full document)",
        "Presentation deck",
        "ER / DFD / architecture diagrams",
        "Deployment walkthrough",
      ],
    },
    {
      id: "mentored",
      name: "Mentored",
      price: project.prices.mentored,
      emiMonths: 3,
      includes: [
        "Everything in Academic",
        `${project.sessionCount} live sessions on ${SESSION_POLICY.platform}`,
        "Line-by-line code walkthrough",
        "Viva question prep + mock viva",
        "One module varied for you (dataset / domain)",
        "WhatsApp support until submission",
      ],
    },
  ];
}

export function getCampusProject(slug: string): CampusProject | undefined {
  return CAMPUS_PROJECTS.find((p) => p.slug === slug);
}

/** URL segment for each course landing page under /final-year-projects/for/. */
export const DEGREE_SLUGS: Record<Degree, string> = {
  BCA: "bca",
  MCA: "mca",
  "B.Tech": "btech",
  "B.Sc IT": "bsc-it",
  "M.Tech": "mtech",
  Diploma: "diploma",
};

export function degreeFromSlug(slug: string): Degree | undefined {
  return (Object.keys(DEGREE_SLUGS) as Degree[]).find(
    (d) => DEGREE_SLUGS[d] === slug,
  );
}

export function projectsForDegree(degree: Degree): CampusProject[] {
  return CAMPUS_PROJECTS.filter((p) => p.degrees.includes(degree));
}

export function campusUrl(slug: string): string {
  return `${SITE_URL}/final-year-projects/${slug}/`;
}

/**
 * Absolute rich-result / share image for a project. Falls back to the
 * brand-locked FYP portal image so the Product schema always has a valid
 * `image` (Google Merchant-listing requirement) and every project page ships
 * a real OG card.
 */
export function campusImageUrl(project: CampusProject): string {
  return `${SITE_URL}${project.ogImage ?? "/social/portal-wide.jpg"}`;
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Per-month figure shown next to a tier price. */
export function emiPerMonth(tier: CampusTier): number {
  return Math.ceil(tier.price / tier.emiMonths / 100) * 100;
}

export function lowestPrice(project: CampusProject): number {
  return project.prices.source;
}

/** Distinct degrees across the catalog, for the filter bar. */
export function allDegrees(): Degree[] {
  const seen = new Set<Degree>();
  CAMPUS_PROJECTS.forEach((p) => p.degrees.forEach((d) => seen.add(d)));
  return [...seen];
}

/** Distinct domains across the catalog, for the filter bar. */
export function allDomains(): string[] {
  return [...new Set(CAMPUS_PROJECTS.map((p) => p.domain))].sort();
}

export const CAMPUS_FAQ = [
  {
    question: "Do I have to build any of it myself?",
    answer:
      "No. The project is built, documented, and deployed for you — code, report, deck, diagrams, and the running application. Your only job is to turn up to the sessions and learn what you are submitting.",
  },
  {
    question: "Can I get my own idea built instead of picking from the list?",
    answer: `Yes. Send whatever your guide approved — or an idea you want built from scratch — through the custom build form. Any stack, any domain. Custom projects are quoted between ${formatInr(CUSTOM_BUILD_RANGE.min)} and ${formatInr(CUSTOM_BUILD_RANGE.max)} depending on scope, and run on the same sessions and installments.`,
  },
  {
    question: "Do I get the source code, or only the explanation?",
    answer:
      "You get the full source code on every tier. The Mentored tier adds live sessions where the code is walked through line by line so you can defend it in your viva.",
  },
  {
    question: "How do the daily sessions work?",
    answer: `Sessions are live on ${SESSION_POLICY.platform}, one per day, starting after ${SESSION_POLICY.startsAfter} so they do not clash with college hours. Each runs about ${SESSION_POLICY.durationMinutes} minutes and covers one module of the project.`,
  },
  {
    question: "Can I pay in installments?",
    answer: `Yes. Payment is direct — ${PAYMENT_POLICY.method.toLowerCase()} — split into monthly installments. Sessions start after the first installment; the complete source, report, and deployment handover comes after the final one.`,
  },
  {
    question: "I can buy a project online for ₹2,000. Why does this cost more?",
    answer:
      "Because that ₹2,000 buys a zip file. Nobody explains it to you, the same file has been sold to hundreds of students, and it collapses the moment your examiner asks why you chose that database. What you are paying for here is a project built for you, capped per college, and the sessions that make you able to answer for it. If a zip file is all you need, buy the zip file.",
  },
  {
    question: "How do I know you will not disappear after I take money?",
    answer:
      "Payment is split across months, so you are never paying for work you have not seen — you watch the code in sessions from the first one. If I fail to deliver what the project page promised, your remaining installments are cancelled and the last one is returned. I also have a name attached to this: the same site carries my portfolio, my published work, and my public repositories. That is not something I would burn for one project.",
  },
  {
    question: "What if my guide rejects the project or asks for changes?",
    answer:
      "Changes your guide asks for during review are made at no extra cost — that is part of the build, not a new scope. If your guide rejects the topic outright before work begins, you can switch to a different project or stop with nothing further owed.",
  },
  {
    question: "Will another student at my college submit the same project?",
    answer:
      "No. Each listing is capped to a limited number of students per college per academic year, and the Mentored tier varies one module — the dataset, the domain, or a feature — so two builds are never identical.",
  },
  {
    question: "Who actually builds and teaches this?",
    answer:
      "Yaseen Khatib — a Senior Full-Stack AI Engineer. The same person writes the code and runs the sessions, so every answer in your viva prep comes from whoever wrote the line you are asked about.",
  },
];
