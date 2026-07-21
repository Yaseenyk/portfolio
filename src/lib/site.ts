/** Production base URL — used for canonical links, OpenGraph, JSON-LD, sitemap. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaseenkhatib.streamerosai.com";

/** Sitewide default description — root metadata, OG, and the WebSite entity. */
export const SITE_DESCRIPTION =
  "Yaseen Khatib — Senior Full-Stack Developer (MERN) building production AI systems: Agentic RAG, LLM orchestration, and five solo-shipped products. Open to remote, hybrid, or on-site roles.";

/**
 * Search-engine site-verification codes. Paste the content value from
 * Google Search Console (HTML-tag method) and Bing Webmaster Tools here,
 * then rebuild — empty strings are omitted from the page entirely.
 * Bing matters for AEO: its index feeds ChatGPT search.
 */
export const VERIFICATION = {
  google: "",
  bing: "001424A9DC931D947201E7F6E9CA9A23",
};

export const SOCIALS = {
  github: "https://github.com/Yaseenyk",
  linkedin: "https://www.linkedin.com/in/yaseen-yk",
};

export const PERSON = {
  name: "Yaseen Nurmahammad Khatib",
  jobTitle: "Senior Full-Stack AI Engineer",
  email: "contact@streamerosai.com",
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
