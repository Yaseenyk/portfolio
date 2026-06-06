# Project History & Status

Original revert point: commit `6764871` (the first Vite + SCSS + Framer Motion app).

## Timeline

1. **Vite → Next.js migration** (2026-06-06). Ported the original Vite + React + SCSS portfolio to Next.js (App Router), 1:1 SCSS→Tailwind.
2. **Text-only zinc redesign** (2026-06-06). Stark text-only `zinc` theme; removed framer-motion, images, scroll-snap.
3. **Animated streamerOS redesign** (2026-06-06). Rich animated SPA on the streamerOS Signal Kit theme; re-added framer-motion.
4. **Content-rich dashboard redesign** (2026-06-06). Refined the streamerOS direction into a metric-dense layout: faint CSS grid background, inline animated SVG icons, a mocked-up desktop "dashboard" window housing Projects & Experience, and the full real CV content.
5. **Mission-control spacing & flagship overhaul** (2026-06-06). Cleaner, premium pass: glassmorphism dashboard (`shadow-2xl shadow-cyan-500/10`), much more whitespace, responsive bento (`md:grid-cols-2 lg:grid-cols-3`) with multi-column flagships, metrics reformatted as glowing data-node pills, and increased timeline spacing. Added the previously-missing **streamerOS** flagship (Rust desktop cockpit, with a live telemetry visual). `cyan`/`purple`/`ice` colors given `DEFAULT` + numbered shades so `shadow-cyan-500/10`-style utilities resolve.
6. **Hero 2-column + AI-focus pass** (2026-06-06). Reworked the Hero into a 2-column layout (copy left, vertically centered; new `NeuralCore` AI-brain animation right) to kill the empty void. Rewrote copy across Hero/Projects/Experience to foreground Agentic workflows, LLM orchestration, vector retrieval, and architectural depth. Widened bento gap to `gap-8`; centered the contact heading and form.
7. **Wide-layout + Operational Ethos manifesto** (2026-06-06). Expanded the shared wrapper to `max-w-7xl` (`px-6 md:px-12 lg:px-24`) so the Hero is wide and the headline no longer breaks mid-word (`whitespace-nowrap` on "AI-Speed.", grid ratio `lg:grid-cols-[1.2fr_1fr]`, NeuralCore scaled to `lg:max-w-[600px]`). Added the **Operational Ethos** manifesto block between Hero and Dashboard (terminal glass card, cyan left-border, mono gradient pipeline). Added **Fira Code** via `next/font` as `font-mono`, upgrading all monospace text.
8. **Interactive Architecture Pipeline mini-game** (2026-06-06). Replaced the static `OperationalEthos` block with `ArchitecturePipeline`: a manifesto plus an animated Database→Backend→Frontend flow diagram with a hold-to-engage AI speed toggle (Manual 1x → AI-Assisted 10x: slow single packet → fast multi-packet stream, nodes ignite + shake). Works on mouse/touch/keyboard. `OperationalEthos.tsx` deleted (redundant messaging).
9. **Full-width Projects rebuild** (2026-06-06). Scrapped the bento grid for a vertical stack of full-width 2-column cards (text left / animation right), streamerOS-style. Expanded to **7 projects** (added SANKALP) and built a **dedicated Framer Motion animation for each** under `components/projects/`: SystemTelemetry, NodeGraph, DocumentScan, RealtimeSync, DataSorting, TVScreen, Untangle — all SVG/`motion`, no images.
10. **Architecture Pipeline immersive overhaul** (2026-06-06). Killed the dead-space vertical stack: rebuilt `ArchitecturePipeline` as a full-width diagonal diagram (radial glow + accelerating grid) with three data-rich mini-dashboard nodes, sweeping `motion.path` curves, and a curve-sampled particle swarm. Reactor-style hold-to-engage button drives Manual↔AI-speed. Responsive — collapses to a vertical node stack under `md`.
11. **SEO/AEO Blog** (2026-06-06). Added a dynamic App Router blog: `/blog` index + `/blog/[slug]` template with `generateStaticParams`, dynamic `generateMetadata`, and JSON-LD (`TechArticle` + `BreadcrumbList`). AEO summary box up top; streamerOS theme (gradient h1, customized `prose prose-invert`, terminal code blocks, footer CTA). Posts are typed `BlogPost` objects in `content/posts/` (registry in `lib/blog.tsx`). Added `@tailwindcss/typography`, extracted `GridBackground`, set `metadataBase`, added a Blog nav link.
12. **Floating-island Navbar** (2026-06-06). Replaced the inline header with `Navbar.tsx`: a floating glass pill, live `PulseDot`, Framer `layoutId` sliding hover highlight, animated hamburger + dropdown on mobile. Shared across home and blog.
13. **GitHub Pages deploy + contact routing** (2026-06-06). `next.config.mjs` → `output: 'export'`, `images.unoptimized`, `trailingSlash`, env-driven `basePath`. `.github/workflows/deploy.yml` (static export → `upload-pages-artifact` → `deploy-pages`, auto-enable Pages). Project-site basePath `/portfolio`; prefixed the raw Resume link. Contact form displays email + phone and passes `to_email`/`reply_to`.
14. **Resume PDF engine** (2026-06-06). `scripts/generate-resume.js` (Puppeteer) → 2-page A4 `public/Resume.pdf` (page 1 experience/skills/education, page 2 all projects). `npm run generate:resume`; CI skips the Chromium download. Download CV saves as `Yaseen-Khatib-Resume.pdf`.
15. **Blog series (20 articles)** (2026-06-06). Wrote the 10-post 2026 series plus a 10-post foundational series **backdated across the AI boom (Dec 2022 → Oct 2024)**. 21 posts total incl. the template sample.
16. **Blog Command Center** (2026-06-06). Rewrote `/blog` as a client `BlogIndex`: glassmorphic sticky control bar (search with cyan focus glow, tag-derived filter pills, latest/oldest sort), dense 3-col grid with `AnimatePresence` + `motion layout` reflow. Server page stays for `metadata`; width control moved into pages (index `max-w-6xl`, posts `max-w-3xl`).
17. **SEO/AEO audit** (2026-06-06). `lib/site.ts` (single source for URL/socials/Person); root layout title template + full OG/Twitter + sitewide `Person` JSON-LD; home `SoftwareApplication` JSON-LD; `sitemap.ts` + `robots.ts` (welcomes AI crawlers); factual SVO Hero opener; Projects/Experience → `<section>` + `<h2>`; BlogIndex a11y.
18. **`/uses` page** (2026-06-06). Terminal "system specs" dashboard (hardware / MERN / AI clusters) with `TechArticle` JSON-LD `mentions` generated from the rendered data; Executive Teardown box; added to sitemap + Navbar ("Stack").
19. **Full E2E documentation — current** (2026-06-06). Authored `docs/` set: README, architecture, content-guide, seo-aeo, deployment, plus this changelog.

Current architecture lives in [architecture.md](./architecture.md); see the
other docs for content, SEO, and deployment. The whole app builds clean
(`npm run build` → 29 static pages, zero warnings/type errors) and is deployed.

## Open follow-ups

- **Project links are placeholders.** GitHub/external icon links in `Projects.tsx`
  point to `"#"` — wire real repos/demos.
- **Duplicate Pages workflow.** Both `deploy.yml` and `nextjs.yml` deploy to
  Pages on push; delete `nextjs.yml` (see [deployment.md](./deployment.md)).
- **EmailJS recipient.** The form passes `to_email`/`reply_to`, but the actual
  "To" address is set in the EmailJS template dashboard — confirm it routes to
  `yaseenkhatib04@gmail.com`. Credentials are constants in `ContactForm.tsx`.
- **Twitter handle** in `layout.tsx` is a placeholder (`@yaseenyk`).
- **No favicon / OG images.** Add a favicon and per-page OG images (`ogImage` on
  `BlogPost` is supported but unused).
- **`prefers-reduced-motion`** is not yet honored despite heavy animation.
- **Unused legacy components** — `FeaturedProject.tsx`, `StackEcosystem.tsx`
  (and arguably `SectionLabel`/`TextLink`) are retained but unimported; safe to
  prune.
- **Hardware in `/uses`** are sensible placeholders to personalize.
