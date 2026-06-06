# Architecture & Conventions

Yaseen Khatib's personal portfolio — a **minimal but content-rich, animated single-page application** positioning him as a **Senior MERN Stack + AI Developer**. The aesthetic mimics the "streamerOS" landing-page style: an ink background with a faint CSS grid, neon cyan/purple gradients, inline animated SVGs, and a mocked-up desktop "dashboard" window housing the main content. Built with **Next.js (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

See `migration-status.md` for the full history of design directions.

## Tech stack

| Concern      | Choice                                   |
| ------------ | ---------------------------------------- |
| Framework    | Next.js 14 (App Router, `src/app`)       |
| Language     | TypeScript (strict)                      |
| Styling      | Tailwind CSS                             |
| Animation    | Framer Motion                            |
| Icons        | Inline SVG (no icon library)             |
| Contact form | EmailJS (`@emailjs/browser`)             |
| Font         | Inter via `next/font/google`             |

## Theme — streamerOS Signal Kit

Custom colors in `tailwind.config.ts` (`theme.extend.colors`):

| Token    | Hex       | Role                                          |
| -------- | --------- | --------------------------------------------- |
| `ink`    | `#05070A` | Base background                               |
| `cyan`   | `#22D3EE` | Gradient accent (bottom) · primary button     |
| `purple` | `#A855F7` | Gradient accent (top)                         |
| `ice`    | `#67E8F9` | Glowing borders / active states / pulse       |

> ⚠️ These override Tailwind's default `cyan`/`purple` scales — use the flat tokens only.

- **Grid background:** a fixed, `-z-10` overlay in `page.tsx` draws a faint 40px CSS grid (`linear-gradient` hairlines) over the ink base.
- **Radial glows:** `globals.css` layers two faint cyan/purple radial glows on the body.
- **Gradient text:** the `.text-gradient` utility (`globals.css`) + `animate-gradient`.
- **Custom animations** (`tailwind.config.ts`): `animate-gradient` (flowing gradient text) and `animate-pulseGlow`. SVG "live" motion is done in Framer Motion (see `PulseDot`, `Signal`).

## Project structure

```
src/
  app/
    layout.tsx        Root layout: Inter font var, SEO metadata
    globals.css       Tailwind + ink theme, radial-glow bg, .text-gradient utility
    page.tsx          Grid bg + sticky header + Hero + Dashboard + Contact + footer
  app/blog/
    layout.tsx        Grid bg + slim header/footer + reading container (max-w-3xl)
    page.tsx          Blog index — lists posts from the registry
    [slug]/page.tsx   Dynamic post template: generateStaticParams + generateMetadata
                      (SEO) + JSON-LD TechArticle & BreadcrumbList (AEO) + themed layout
  content/posts/      Blog posts as typed BlogPost objects (metadata + takeaways + JSX Body)
  lib/blog.tsx        BlogPost type, post registry, helpers, SITE_URL, formatDate
  components/
    GridBackground.tsx  Shared fixed CSS grid bg (home + blog)
    blog/Terminal.tsx   macOS-style terminal code block (token classes in globals.css)
    Icons.tsx         Inline SVGs: WindowControls, Github, ExternalLink, Arrow, Download
    PulseDot.tsx      Animated glowing "live" status dot (ping ring) — client
    Signal.tsx        Animated broadcasting-signal SVG (pulsing arcs) — client
    GradientText.tsx  Animated cyan→purple gradient text
    Hero.tsx          2-col layout: copy (staggered reveal) + NeuralCore animation (client)
    NeuralCore.tsx    Abstract "AI core" — pulsing nodes, data pulses, rotating rings (client)
    ArchitecturePipeline.tsx  Interactive "mini-game": manifesto + animated Database→Backend→
                      Frontend flow with a hold-to-engage AI speed toggle (client)
    Dashboard.tsx     Glassmorphism desktop-window wrapper housing Projects & Experience
    Projects.tsx      Stacked full-width 2-col cards (text left / animation right); 7 projects,
                      each wired to a dedicated animation; metric pills; ice hover glow (client)
    projects/         One Framer Motion animation per project:
      SystemTelemetry   streamerOS — pulsing telemetry bars
      NodeGraph         IntegrateX — node graph with flowing data packets
      DocumentScan      Police RAG — scrolling text + scanning laser + verdict badge
      RealtimeSync      CMZ App — server broadcasting packets to user nodes
      DataSorting       Hospital-API — requests routed through a gateway into DBs
      TVScreen          Cross-Platform TV — skeleton wipes into a resolved dashboard
      Untangle          SANKALP — tangled nodes untangling into a clean grid
    Experience.tsx    Vertical animated timeline tree, scroll fade-ins (client)
    ContactForm.tsx   Neon form with submission state machine (client)
    Reveal.tsx        Shared scroll fade-in wrapper (client) — available helper
    SectionLabel.tsx  Shared numbered eyebrow — available helper
    TextLink.tsx      Shared text link — available helper
public/
  Resume.pdf          Linked from the Hero "Download CV" button
```

## Page anatomy

1. **Navbar** (`Navbar.tsx`) — a floating glassmorphic "island" (`fixed top-6 left-1/2 -translate-x-1/2`, `rounded-full backdrop-blur-md bg-zinc-950/60 shadow-cyan-900/20`). Logo + live `PulseDot`; desktop links use a Framer Motion `layoutId="nav-pill"` sliding glass highlight on hover; collapses to an animated hamburger + dropdown under `md`. Shared by the home page and the blog layout (links are absolute: `/#projects`, `/#experience`, `/blog`, `/#contact`).
2. **Hero** — 2-column (`md:grid-cols-2`, `items-center`, `min-h-[80vh]`): left is the copy (pill badge + animated `PulseDot` + "Senior MERN + AI Developer"; gradient headline; AI-focused subheadline — Agentic RAG, LLM orchestration; CTAs "View Architecture →" solid cyan and "Download CV" outline). Right is `NeuralCore` — a live, breathing AI-brain animation (cyan/purple). Stacks copy-first on mobile. The whole content column lives in one wide wrapper (`mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-24`) shared by Navbar, Hero, Dashboard, and Contact.
2b. **Architecture Pipeline** (`#architecture`) — full-width immersive interactive section between Hero and Dashboard. Top: centered "The Architecture is Everything." manifesto. Middle: a prominent **reactor button** ("Hold to Engage AI") + speed readout. Below: a full-width diagonal diagram (`aspect-[25/14]`) with a radial glow, an accelerating CSS grid, three **mini-dashboard nodes** (Database = flowing rows; Backend = scrolling mini-terminal; Frontend = wireframe with pulsing blocks; glass `backdrop-blur-xl bg-zinc-900/40`) placed top-left / center-right / bottom-left, connected by sweeping **`motion.path`** curves with flowing dashes + a data-particle swarm sampled along the curves. **Hold-to-engage** (`useState(engaged)`) flips Manual (1x: few slow particles, dim lines, slow grid) → AI-Assisted (10x: ~12 particles/path, lines ignite + glow underlay, grid accelerates, nodes shake). Pointer + focus handlers (`onPointerEnter/Down/Leave/Cancel`, `onFocus/Blur`, `touch-none`) cover mouse/touch/keyboard. Collapses to a vertical node stack under `md`.
3. **Dashboard** — a premium glassmorphism window (`bg-ink/80 backdrop-blur-md border-zinc-800 rounded-2xl shadow-2xl shadow-cyan-500/10`) with a macOS-style top bar (`WindowControls` + "portfolio -- interactive-mode" + live `Signal`) and generous internal padding. Body holds:
   - **Projects** (`#projects`) — a vertical stack (`space-y-12`) of full-width glassmorphic cards (`bg-ink/50 backdrop-blur-md`, ice hover glow). Each card is a 2-column grid (`lg:grid-cols-2 gap-8 items-center p-8 lg:p-12`): **text left** (category, title, description, glowing ice metric pills, tech badges, GitHub/external links) and a **dedicated Framer Motion animation right** (see `components/projects/`). Seven projects: streamerOS, IntegrateX, Police RAG, CMZ App, Hospital-API, Cross-Platform TV, SANKALP. Each animation is drawn with SVG/`motion` divs (no images) inside a `aspect-[4/3]` glass panel.
   - **Experience** (`#experience`) — animated vertical timeline (`space-y-16`): Sparity → MSA Software → Manorama.
4. **Contact** (`#contact`) — neon EmailJS form.
5. **Footer.**

## Conventions

### Client vs. server components
`layout.tsx`, `page.tsx`, `Dashboard.tsx`, `Icons.tsx`, `GradientText.tsx`, `SectionLabel.tsx`, `TextLink.tsx` are server components. Everything that animates or holds state is `"use client"` (`Hero`, `Projects`, `Experience`, `ContactForm`, `PulseDot`, `Signal`). `Dashboard` is a server component that composes client children.

### Framer Motion patterns
- **Load reveal:** `Hero` — `container`/`item` variants with `staggerChildren`, `initial="hidden" animate="show"`.
- **Scroll reveal / stagger:** `Projects` grid and `Experience` list use a container with `whileInView="show"` + `staggerChildren`, `viewport={{ once: true }}`.
- **Looping SVG life:** `PulseDot` (expanding ping ring) and `Signal` (staggered arc opacity) loop with `repeat: Infinity`.
- **Hover:** `whileHover={{ y: -4 }}` on cards plus `group-hover:border-ice/40` + ice glow shadow; buttons use `whileHover/whileTap` scale.
- Shared easing: `[0.21, 0.47, 0.32, 0.98]`.

### Content & data
Projects and Experience are data-driven from arrays at the top of their files (`PROJECTS`, `ROLES`). Projects carry an optional `metrics: {value,label}[]` (rendered as ice metric cells; 4+ metrics → featured multi-column grid) and a `span` for bento sizing. To add an item, append to the array.

### Contact form state
`idle → sending → sent | error`; button label tracks status, status line on terminal states, form clears on success, editing after a terminal state resets to `idle`. EmailJS credentials are module constants.

## Blog (SEO/AEO)

`/blog` (index) and `/blog/[slug]` (dynamic posts) live under `src/app/blog/` and share a layout (grid bg + reading container). Posts are **typed `BlogPost` objects** in `src/content/posts/`, registered in `src/lib/blog.tsx`.

- **Authoring:** each post exports a `BlogPost` — metadata (title, description, keywords, dates, author, tags), an AEO `takeaways[]` array, and a `Body` React component written with standard HTML tags (styled by `prose`) plus `<Terminal>` for code. Add it to the `POSTS` registry in `lib/blog.tsx`.
- **SEO:** `generateStaticParams` pre-renders every post; `generateMetadata` returns dynamic title/description/keywords/canonical/OpenGraph/Twitter. `metadataBase` is set in the root layout (`NEXT_PUBLIC_SITE_URL`, default `https://yaseenkhatib.dev`).
- **AEO:** a JSON-LD `<script>` emits a `TechArticle` (with `abstract` = takeaways) **and** a `BreadcrumbList`; the visible **Executive Summary** box puts direct answers at the very top.
- **Theme:** gradient `<h1>`, `prose prose-invert` customized via modifiers (cyan h2s, ice links, cyan-bordered blockquotes), terminal code blocks, and a glowing footer CTA → `/#contact`.
- **Note:** running Next 14, so `params` is synchronous. On Next 15, change the `params` type to `Promise<{slug}>` and `await` it in `generateMetadata`/the page.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

> Note: changes to `tailwind.config.ts` (e.g. new theme colors) require a **dev-server restart** — the JIT engine doesn't always hot-reload config changes, which can surface as a spurious "class does not exist" error until restart.
