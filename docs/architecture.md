# Architecture

The current-state architecture of the portfolio. For history/changelog see
[migration-status.md](./migration-status.md).

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, `output: 'export'` (static) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS, `@tailwindcss/typography` |
| Animation | Framer Motion |
| Icons | Inline SVG (no icon library) |
| Fonts | Inter + Fira Code via `next/font/google` (CSS vars) |
| Contact form | EmailJS (`@emailjs/browser`) |
| Resume | Puppeteer (dev-only tooling) |

## Directory structure

```
src/
  app/
    layout.tsx          Root: <html>/<body>, fonts, metadata, sitewide Person JSON-LD
    globals.css         Tailwind + ink theme, radial glow, .text-gradient, code tokens
    page.tsx            Home: Navbar + Hero + ArchitecturePipeline + Dashboard + Contact
    sitemap.ts          Generated /sitemap.xml
    robots.ts           Generated /robots.txt
    blog/
      layout.tsx        Grid bg + Navbar + footer for all /blog pages
      page.tsx          /blog server wrapper → <BlogIndex> (keeps metadata)
      [slug]/page.tsx   Post template: generateStaticParams + generateMetadata + JSON-LD
    uses/page.tsx       /uses system-specs dashboard
  components/
    Navbar.tsx          Floating glass island, layoutId hover, mobile menu
    Hero.tsx            2-col hero (copy + NeuralCore)
    NeuralCore.tsx      Animated AI-core SVG (nodes, data pulses, rings)
    ArchitecturePipeline.tsx  Interactive Database→Backend→Frontend mini-game
    Dashboard.tsx       Glass "cockpit" window wrapping Projects + Experience
    Projects.tsx        7 full-width project cards (data-driven)
    Experience.tsx      Animated vertical timeline
    ContactForm.tsx     Neon EmailJS form with state machine
    projects/           One Framer Motion animation per project (7)
    blog/
      BlogIndex.tsx     Client Command Center (search/filter/sort grid)
      Terminal.tsx      macOS-style terminal code block
    Icons.tsx, PulseDot.tsx, Signal.tsx, GradientText.tsx, Reveal.tsx,
    SectionLabel.tsx, TextLink.tsx, GridBackground.tsx   shared primitives
    FeaturedProject.tsx, StackEcosystem.tsx              unused (legacy, safe to prune)
  content/posts/        21 typed BlogPost objects (one file each)
  lib/
    site.ts             SITE_URL, SOCIALS, PERSON, personJsonLd (single source)
    blog.tsx            BlogPost type, post registry, helpers, formatDate
public/
  Resume.pdf            Generated CV (served by the Download CV button)
```

## Routes

| Route | Type | Notes |
| --- | --- | --- |
| `/` | Static | Home SPA. `SoftwareApplication` JSON-LD (streamerOS, IntegrateX). |
| `/blog` | Static | Client Command Center. |
| `/blog/[slug]` | SSG | One per post via `generateStaticParams`. `TechArticle` + `BreadcrumbList`. |
| `/uses` | Static | `TechArticle` JSON-LD with `mentions`. |
| `/sitemap.xml`, `/robots.txt` | Static | Generated from `lib`. |

All routes are prerendered to `out/` (with `trailingSlash: true`, each is
`route/index.html`).

## Theme — "streamerOS Signal Kit"

Custom colors in `tailwind.config.ts` (`theme.extend.colors`):

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#05070A` | Background |
| `cyan` | `#22D3EE` (+ 400/500/900) | Gradient accent (bottom), primary button |
| `purple` | `#A855F7` (+ 400/500) | Gradient accent (top) |
| `ice` | `#67E8F9` (+ 400/500) | Highlights, glows, "live" state |

> `cyan`/`purple`/`ice` are objects with `DEFAULT` + numbered shades so both
> `bg-cyan` and `shadow-cyan-900/20`-style utilities resolve.

- **Grid background:** `GridBackground.tsx` — a fixed 40px CSS grid, used on
  home, blog, and `/uses`.
- **Radial glow + base theme:** `globals.css` (ink bg, two faint cyan/purple
  radial glows, `::selection`).
- **Gradient text:** `.text-gradient` utility + `animate-gradient` keyframe.
- **Code tokens:** `.tok-*` classes in `globals.css` for terminal syntax color.
- **Fonts:** `font-sans` → Inter (`--font-inter`), `font-mono` → Fira Code
  (`--font-mono`).

## Home page anatomy (`page.tsx`)

1. **Navbar** (`Navbar.tsx`) — floating glass island (`fixed top-6 left-1/2`),
   logo + `PulseDot`, Framer `layoutId="nav-pill"` sliding hover highlight,
   animated hamburger + dropdown under `md`. Links: Projects, Experience, Blog,
   Stack (`/uses`), Contact. Shared by home, blog, and `/uses`.
2. **Hero** — 2-column, badge, gradient `whitespace-nowrap` "AI-Speed", factual
   Subject-Verb-Object opening paragraph (AEO), CTAs (View Architecture solid
   cyan / Download CV → `/Resume.pdf`), and `NeuralCore` AI-brain on the right.
3. **ArchitecturePipeline** — full-width interactive "mini-game": Database →
   Backend → Frontend glass nodes, `motion.path` curves, particle swarm, a
   hold-to-engage reactor that flips Manual (1x) → AI-Assisted (10x).
4. **Dashboard** — glassmorphism "cockpit" window housing:
   - **Projects** (`#projects`) — 7 full-width 2-col cards (text + bespoke
     animation): streamerOS, Police RAG, IntegrateX, CMZ, Hospital-API,
     Cross-Platform TV, SANKALP.
   - **Experience** (`#experience`) — animated timeline (Sparity, MSA, Manorama).
5. **ContactForm** (`#contact`) — neon EmailJS form, `idle→sending→sent|error`
   state machine, displays email + phone.

## Conventions

### Client vs. server components
Server (no `"use client"`): all `app/` route files, `Dashboard`, `Icons`,
`GradientText`, `SectionLabel`, `TextLink`, `GridBackground`, `Terminal`, the
post content files, `lib/*`. Everything that animates or holds state is a client
component (`Navbar`, `Hero`, `NeuralCore`, `ArchitecturePipeline`, `Projects`,
`Experience`, `ContactForm`, `BlogIndex`, `PulseDot`, `Signal`, `Reveal`, the
`projects/*` animations).

> Route pages stay server components so they can export `metadata` / JSON-LD;
> interactive UI is isolated in client leaves they render (e.g. `/blog` → server
> page maps posts to a plain shape and renders the client `BlogIndex`).

### Framer Motion patterns
- **Load reveal:** `container`/`item` variants with `staggerChildren`.
- **Scroll reveal:** `whileInView` + `viewport={{ once: true }}` (or the shared
  `<Reveal>`); never re-animate on scroll-back.
- **Hover:** `whileHover`/`whileTap`, `layoutId` for the navbar pill, CSS
  transitions for color/border/glow.
- **Looping SVG life:** `PulseDot`, `Signal`, `NeuralCore`, project animations
  use `repeat: Infinity` with transform/opacity only (no layout shift).
- Shared easing: `[0.21, 0.47, 0.32, 0.98]`.

### Styling
Tailwind utilities, heavy use of arbitrary values for viewport/exact sizing.
Brand colors via the theme tokens. Tailwind Typography (`prose prose-invert`)
customized via modifiers in the blog post template.
