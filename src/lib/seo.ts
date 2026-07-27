import { SITE_URL, SITE_DESCRIPTION, PERSON, SOCIALS } from "./site";

/**
 * Stable JSON-LD node ids. The root layout declares the entities once in a
 * sitewide @graph; every page-level schema block references them by @id via
 * `personRef` instead of redeclaring Person/WebSite blobs.
 */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Reference to the sitewide Person node — use as author/publisher/provider. */
export const personRef = { "@id": PERSON_ID };

/**
 * The site's permanent entity graph, emitted once in the root layout.
 * Person is the root entity of a personal portfolio; `sameAs` is what ties
 * the GitHub/LinkedIn profiles to the name as one entity for answer engines.
 */
export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      url: SITE_URL,
      email: `mailto:${PERSON.email}`,
      sameAs: [SOCIALS.linkedin, SOCIALS.github],
      knowsAbout: PERSON.knowsAbout,
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.locality,
        addressCountry: PERSON.country,
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Yaseen Khatib",
      description: SITE_DESCRIPTION,
      publisher: personRef,
    },
  ],
};

export interface Crumb {
  name: string;
  /** Site-relative path, e.g. "/blog" or "/products/streameros". */
  path: string;
}

/** Canonical form of a site-relative path: served URLs carry a trailing
 *  slash (trailingSlash + GitHub Pages), so canonicals/sitemap/JSON-LD must
 *  too — otherwise they point at 301s. */
export function canonicalUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;
}

/** BreadcrumbList for a nested page — pass the trail below Home. */
export function breadcrumbJsonLd(trail: Crumb[]) {
  const crumbs = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  /** Short step heading — must match a visible step/section heading. */
  name: string;
  /** One-line description of the step, matching the on-page instruction. */
  text: string;
}

/**
 * HowTo schema. Use ONLY for genuinely step-by-step guides: the steps MUST
 * correspond to the ordered sections a reader sees on the page (Google's
 * matching-content rule, and the site's honest-content thesis). Feed the same
 * steps the page renders so the two can never drift.
 */
export function howToJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  /** ISO 8601 duration, e.g. "PT1H". Omit if unknown. */
  totalTime?: string;
  steps: HowToStep[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * Course schema for a mentored final-year-project listing. Honest here because
 * the Mentored tier is a real taught course: N live sessions, a line-by-line
 * code walkthrough, and viva prep. `provider`/`instructor` reference the
 * sitewide Person by @id (resolved from the layout graph on the same page).
 */
export function courseJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  /** Live 1-hour sessions in the Mentored tier — drives courseWorkload. */
  sessionCount: number;
  /** Mentored-tier price. */
  price: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: personRef,
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${opts.sessionCount}H`,
      instructor: personRef,
      offers: {
        "@type": "Offer",
        category: "Mentored",
        price: opts.price,
        priceCurrency: opts.currency ?? "INR",
        availability: "https://schema.org/InStock",
        url: `${opts.url}#enquire`,
      },
    },
  };
}

/**
 * FAQPage schema. Feed it the SAME array the page renders — markup matching
 * visible content is a Google rich-results requirement, and deriving both
 * from one array makes drift impossible.
 */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
