# Yaseen Khatib — Portfolio Documentation

End-to-end documentation for the portfolio platform: an animated, content-rich
single-page application plus an SEO/AEO-optimized blog and `/uses` page, built to
position Yaseen Khatib as a Senior MERN Stack + AI Systems Engineer.

**Live:** https://yaseenyk.github.io/portfolio/ ·
**Repo:** https://github.com/Yaseenyk/portfolio

## At a glance

| | |
| --- | --- |
| Framework | Next.js 14 (App Router) — **static export** |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Tailwind Typography |
| Animation | Framer Motion |
| Fonts | Inter (sans) + Fira Code (mono) via `next/font` |
| Contact | EmailJS (client-side) |
| Resume | Puppeteer → `public/Resume.pdf` |
| Hosting | GitHub Pages (project site, basePath `/portfolio`) |
| CI/CD | GitHub Actions → static export → Pages |

## Surface

- **`/`** — animated home: floating Navbar, Hero (AI-core), interactive
  Architecture Pipeline mini-game, dashboard of 7 project cards (each with a
  bespoke animation), experience timeline, contact form.
- **`/blog`** — interactive "Command Center": search, tag filter, sort, animated
  grid. 21 posts.
- **`/blog/[slug]`** — SEO/AEO article template (JSON-LD, Executive Teardown,
  terminal code blocks).
- **`/uses`** — terminal "system specs" dashboard (hardware / MERN / AI stack).
- **`/sitemap.xml`**, **`/robots.txt`** — generated.

## Documentation index

| Doc | Covers |
| --- | --- |
| [architecture.md](./architecture.md) | Directory structure, routes, theme/design system, component catalog, conventions |
| [content-guide.md](./content-guide.md) | How to add a blog post, add/edit a project, edit `/uses`, regenerate the resume |
| [seo-aeo.md](./seo-aeo.md) | Metadata, JSON-LD, sitemap, robots, semantic HTML, post-deploy checklist |
| [deployment.md](./deployment.md) | Local dev, env vars, static export, GitHub Pages CI/CD, troubleshooting |
| [migration-status.md](./migration-status.md) | Project history / changelog (Vite → current) and open follow-ups |

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
npm run lint
npm run generate:resume   # regenerate public/Resume.pdf (needs puppeteer)
```
