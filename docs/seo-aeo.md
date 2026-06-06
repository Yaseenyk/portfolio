# SEO / AEO Reference

How search-engine and answer-engine optimization are implemented across the app.

## Metadata

- **Root** (`src/app/layout.tsx`): `metadataBase` (= `SITE_URL`), a title
  **template** (`default: "Yaseen Khatib | AI + MERN Architect"`,
  `template: "%s | Yaseen Khatib"`), description, keywords, authors/creator,
  canonical, full OpenGraph (title/description/url/siteName/locale `en_US`/type),
  Twitter (`summary_large_image` + `creator`), and `robots` directives.
- **Child pages** export their own `metadata` / `generateMetadata`; their `title`
  strings inherit the template (so a post becomes `"<title> | Yaseen Khatib"`).
  Use `title.absolute` to bypass it (the `/uses` page does, to keep the exact
  "Uses | AI & MERN Development Stack").

> **basePath + canonical:** the site lives under `/portfolio`. `new URL("/x",
> metadataBase)` would drop the subpath, so canonical/OG URLs are built from the
> absolute `SITE_URL` (which includes `/portfolio`) rather than relative paths.

## JSON-LD (the AEO core)

Injected as `<script type="application/ld+json">` (via
`dangerouslySetInnerHTML`):

| Schema | Where | Source |
| --- | --- | --- |
| `Person` | Root layout (sitewide) | `lib/site.ts` → `personJsonLd` |
| `SoftwareApplication` ×2 | Home (`page.tsx`) | streamerOS, IntegrateX |
| `TechArticle` + `BreadcrumbList` | Blog post (`[slug]/page.tsx`) | from the `BlogPost` |
| `TechArticle` (with `mentions`) | `/uses` | from the `CLUSTERS` array |

- **Person** defines `name`, `jobTitle`, `url`, `sameAs` (LinkedIn + GitHub),
  `knowsAbout` (MERN Stack, Agentic RAG, React.js, Node.js, TypeScript, LLM
  Orchestration, MongoDB), `address` (Hyderabad, India), `email`.
- Schemas are **built from the same data that renders the page** (projects,
  cluster items, post fields) so structured data always matches the screen.

## Sitemap & robots

- **`src/app/sitemap.ts`** → `/sitemap.xml`. Maps `/` (priority 1.0), `/blog`
  (0.9), `/uses` (0.7), and every post (0.8) with `changeFrequency`. URLs are
  absolute (`${SITE_URL}/…`). `export const dynamic = "force-static"` for export.
- **`src/app/robots.ts`** → `/robots.txt`. Allows all crawlers and explicitly
  welcomes AI/answer-engine bots: GPTBot, OAI-SearchBot, ChatGPT-User,
  anthropic-ai, ClaudeBot, Claude-Web, CCBot, PerplexityBot, Google-Extended,
  Applebot-Extended. Points to the sitemap.

> **Subpath caveat:** crawlers fetch `robots.txt` from the **domain root**
> (`yaseenyk.github.io/robots.txt`), but a project site serves it at
> `…/portfolio/robots.txt`. So the generated robots is not domain-authoritative.
> Mitigation: submit the sitemap URL directly in Search Console / Bing. A custom
> domain or a `yaseenyk.github.io` user-site would put both at the root.

## AEO content patterns

- **Executive Teardown / TL;DR box** at the top of blog posts and `/uses` — a
  glassmorphic summary of direct answers (answer engines cite these). Sourced
  from `takeaways` (posts) / `TAKEAWAYS` (uses).
- **Factual SVO opener:** the Hero's first paragraph is a Subject-Verb-Object
  sentence ("Yaseen Khatib is a Senior MERN Stack & AI Systems Engineer…") for
  clean fact extraction.

## Semantic HTML

- Landmarks: `<nav>` (Navbar), `<main>`, `<section>` (Projects/Experience/Hero/
  clusters), `<article>` (blog post + cards), `<aside>` (teardown box),
  `<footer>`. Definition list (`<dl>/<dt>/<dd>`) for `/uses` tool rows.
- **Heading hierarchy:** exactly one `<h1>` per page; section headings are
  `<h2>`; item titles `<h3>`. No skipped levels.
- A11y: filter pills + sort toggles have `aria-pressed`; search has
  `role="search"` + `aria-label`; icon-only links carry `aria-label`; decorative
  SVGs are `aria-hidden`.

## Post-deploy checklist

1. Validate structured data in Google's [Rich Results
   Test](https://search.google.com/test/rich-results) (Person, SoftwareApplication,
   TechArticle, BreadcrumbList).
2. Submit `https://yaseenyk.github.io/portfolio/sitemap.xml` directly in Google
   Search Console / Bing Webmaster (works around the robots subpath caveat).
3. Set the real **Twitter handle** in `layout.tsx` (currently `@yaseenyk`
   placeholder).
4. Optional: add per-page OpenGraph images (`ogImage` is supported on
   `BlogPost`, currently unused) for richer social/Twitter cards.
