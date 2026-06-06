# Content Guide

How to add or edit the site's content without touching the framework.

## Add a blog post

Posts are **typed `BlogPost` objects** (one `.tsx` file each) in
`src/content/posts/`, registered in `src/lib/blog.tsx`. (This is the working
format — the site does not use raw `.mdx`.)

### 1. Create the file

`src/content/posts/my-new-post.tsx`:

```tsx
import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>Lead paragraph…</p>
      <h2>A section</h2>
      <p>Body. Escape apostrophes in JSX text as <code>&amp;apos;</code>.</p>
      <blockquote>A pull quote.</blockquote>
      <Terminal title="example.ts">
        <span className="tok-com">{"// comment"}</span>
        {`
const x = 1;`}
      </Terminal>
      <p>
        Link to other content: <a href="/blog/some-slug">another post</a> or{" "}
        <a href="/#projects">the projects</a>.
      </p>
    </>
  );
}

export const myNewPost: BlogPost = {
  slug: "my-new-post",            // → /blog/my-new-post
  title: "My New Post",
  description: "150–160 char meta description / OG / JSON-LD.",
  keywords: ["...", "..."],
  publishedAt: "2026-06-10",      // ISO; controls sort order
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Backend"],        // also become Command-Center filter pills
  takeaways: [                    // AEO: "Executive Teardown" bullets + JSON-LD abstract
    "Direct answer 1.",
    "Direct answer 2.",
  ],
  Body,
};
```

### 2. Register it

In `src/lib/blog.tsx`, import it and add it to the `POSTS` array:

```ts
import { myNewPost } from "@/content/posts/my-new-post";
const POSTS: BlogPost[] = [ myNewPost, /* …existing… */ ];
```

The index sorts by `publishedAt` descending automatically, and
`generateStaticParams` will prerender the new route. The template auto-renders
the breadcrumb, gradient `<h1>`, meta row, Executive Teardown box, prose body,
JSON-LD, and the hire-me footer CTA.

### Authoring notes
- **Body** uses plain HTML tags (styled by `prose prose-invert`) plus
  `<Terminal>` for code. Inside `<Terminal>`, code passed as a `{`…`}` string
  expression does **not** need entity escaping; JSX **text** does (`&apos;`).
- Token colors in terminals: `tok-key`, `tok-fn`, `tok-str`, `tok-num`,
  `tok-com`, `tok-punc` (defined in `globals.css`).
- `tags` drive the `/blog` filter pills (top 12 by frequency) — reuse existing
  tag vocabulary where possible.

## Add or edit a project

Projects render from the `PROJECTS` array in `src/components/Projects.tsx`. Each
entry pairs content with a dedicated animation component:

```ts
{
  name: "streamerOS",
  category: "Flagship · Desktop Cockpit",
  description: "…",
  metrics: ["AI-Architected", "Rust / Next.js", "Live Telemetry"],  // ice pills
  tech: ["Rust", "WebSockets", "Claude AI"],                        // subtle chips
  Animation: SystemTelemetry,   // from components/projects/*
}
```

Animation components live in `src/components/projects/` (SVG / `motion` divs):
`SystemTelemetry`, `NodeGraph`, `DocumentScan`, `RealtimeSync`, `DataSorting`,
`TVScreen`, `Untangle`. To add a project, append to `PROJECTS` and wire an
`Animation` (reuse one or add a new file). Also update the flagship JSON-LD in
`src/app/page.tsx` if it should be a structured-data entity.

## Edit `/uses`

`src/app/uses/page.tsx` is data-driven from the `CLUSTERS` array (hardware /
MERN / AI). Edit names/descriptions there; the page **and** its `TechArticle`
JSON-LD (`mentions`) are both generated from that array, so they stay in sync.
Hardware items use schema type `Product`, software/AI use `SoftwareApplication`.

## Regenerate the resume PDF

The Download CV button serves `public/Resume.pdf`. To regenerate it after editing
`scripts/generate-resume.js` (a 2-page A4 layout: page 1 experience/skills/
education, page 2 all projects):

```bash
npm install            # ensures puppeteer + Chromium are present
npm run generate:resume
```

Then commit the updated `public/Resume.pdf`. The script renders inline
Tailwind-CDN markup with Puppeteer; it needs a Chromium binary and network at
generation time. It is **not** run in CI.

## Update the Person entity / socials

`src/lib/site.ts` is the single source for `SITE_URL`, `SOCIALS` (LinkedIn,
GitHub), and the `PERSON` object (name, jobTitle, locality, `knowsAbout`). The
sitewide `Person` JSON-LD is built from it. Update here, not in individual pages.
