/** Production base URL — used for canonical links, OpenGraph, JSON-LD, sitemap. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaseenyk.github.io/portfolio";

export const SOCIALS = {
  github: "https://github.com/Yaseenyk",
  linkedin: "https://www.linkedin.com/in/yaseen-yk",
};

export const PERSON = {
  name: "Yaseen Nurmahammad Khatib",
  jobTitle: "Senior Full-Stack AI Engineer",
  email: "yaseenkhatib04@gmail.com",
  locality: "Hyderabad",
  country: "India",
  knowsAbout: [
    "MERN Stack",
    "Agentic RAG",
    "React.js",
    "Node.js",
    "TypeScript",
    "LLM Orchestration",
    "MongoDB",
  ],
};

/** schema.org Person — injected sitewide in the root layout for AEO. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
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
};
