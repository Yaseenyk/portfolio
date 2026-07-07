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
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
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
