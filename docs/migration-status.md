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
11. **SEO/AEO Blog — current** (2026-06-06). Added a dynamic App Router blog: `/blog` index + `/blog/[slug]` template with `generateStaticParams`, dynamic `generateMetadata`, and JSON-LD (`TechArticle` + `BreadcrumbList`). AEO "Executive Summary" box up top; streamerOS theme (gradient h1, customized `prose prose-invert`, terminal code blocks, footer CTA). Posts are typed `BlogPost` objects in `content/posts/` (registry in `lib/blog.tsx`). Added `@tailwindcss/typography`, extracted `GridBackground`, set `metadataBase`, added a Blog nav link. Open items: replace the placeholder `SITE_URL`/`NEXT_PUBLIC_SITE_URL` with the real domain; add OG images; (Next 15) await `params`.

Current architecture is documented in `architecture.md`. Notes below cover the current state.

## What's done (present & working)

- **Theme + grid.** Signal Kit colors in `tailwind.config.ts`; faint 40px CSS grid background and radial glows.
- **Inline animated SVGs.** `Icons.tsx` (window controls, GitHub, external-link, arrow, download), plus looping `PulseDot` (ping ring) and `Signal` (broadcasting arcs).
- **Hero.** Animated pill badge ("Senior MERN + AI Developer"), headline with gradient "AI-Speed.", 4.5+ years subheadline, "View Architecture →" (solid cyan) + "Download CV" (outline, downloads `/Resume.pdf`).
- **Dashboard window.** `rounded-2xl border-zinc-800` cockpit with macOS top bar + "portfolio -- interactive-mode" + live signal.
- **Projects bento.** 6-col grid, staggered reveal, ice hover-glow borders, metric cells. All 5 projects with exact content: Police RAG Agent (POSCO), IntegrateX (94%), CMZ App (4,000+ users / 25% / 99.9% / 40% / 35%), Hospital-API (40% / 30% / 25%), Cross-Platform TV Suite (10+ / 30% / 15%).
- **Experience timeline.** Animated tree with scroll fade-ins: Sparity (Jun 2025–Present), MSA Software (Jan 2023–May 2025), Manorama (Sep 2021–Jan 2023), with the provided achievement notes.
- **Contact form.** Neon EmailJS form with `idle → sending → sent | error` state machine.

### Verification
- `npm run build` ✓ compiles, type-checks, prerenders all routes, **zero warnings**. First Load JS ≈ 129 kB.
- `npm run dev` ✓ serves `200`; verified the badge, headline, both CTAs, dashboard chrome, all 5 projects + key metrics (94% / 4,000+ / 99.9%), and the experience entries (Sparity, Manorama).

## What's remaining / follow-ups

- **Project links are placeholders.** Every project's GitHub/external icon links point to `"#"` in `Projects.tsx` — wire to real repos/demos.
- **`Resume.pdf` is the old CV.** The "Download CV" button serves `public/Resume.pdf`, which predates this content — replace it with an up-to-date CV.
- **EmailJS template fields.** Form sends `{ name, email, message }` to the existing service/template — confirm the variable names match or the `error` state surfaces on submit. Credentials are constants in `ContactForm.tsx` (consider `NEXT_PUBLIC_*` env vars).
- **No favicon** is set.
- **Reduced-motion.** Consider honoring `prefers-reduced-motion` given the animation density (looping SVGs, reveals).
- **Unused helpers.** `Reveal.tsx`, `SectionLabel.tsx`, `TextLink.tsx` are retained but no longer imported — keep as helpers or prune.
