# Yaseen Khatib — Signal Kit

Design system for the personal brand of **Yaseen Khatib**, Senior MERN Stack & AI Systems Engineer (Hyderabad, India). The brand voice is "mission control for an AI-speed engineer": a dark, terminal-flavored, signal-glow aesthetic the codebase itself names the **streamerOS Signal Kit**.

## Product context

One product surface: the **portfolio site** (`https://yaseenyk.github.io/portfolio`) — a Next.js 14 static export. Key views:

- **Home** — fixed pill navbar, hero ("Architecting Scalable Systems. Delivering at AI-Speed."), an "interactive-mode" macOS-style dashboard window housing Projects + Experience, recent posts, contact.
- **Blog** (`/blog`) — 70+ technical posts on Agentic RAG, LLM orchestration, MERN; rendered with terminal code blocks.
- **Products, Roadmap, Uses, Sandbox, Interview** — supporting pages on the same shell.

Featured projects: streamerOS (Rust desktop cockpit), IntegrateX (React Flow workflow automation, "94% payload compression"), RAG support agents, LinkedIn automation pipeline.

## Sources

- Codebase: locally-mounted `portfolio/` (Next.js 14 + Tailwind + Framer Motion). Canonical files:
  - `tailwind.config.ts` — brand colors (`ink`, `cyan`, `purple`, `ice`), fonts, keyframes
  - `src/app/globals.css` — body background, selection, gradient text, terminal tokens
  - `src/components/*` — Hero, Navbar, Projects, Dashboard, PulseDot, GradientText, SectionLabel, Terminal, Icons
  - `docs/content-guide.md` — authoring conventions
- Repo: https://github.com/Yaseenyk/portfolio · Live: https://yaseenyk.github.io/portfolio

## CONTENT FUNDAMENTALS

- **Voice**: third-person, authority-establishing. "Yaseen Khatib is a Senior MERN Stack & AI Systems Engineer who…" — never "I". CTAs address the reader plainly ("View Architecture", "Download CV", "Read Article →").
- **Tone**: confident systems-engineer bravado. Verbs of construction: *architecting, shipping, engineered, hardened, orchestrating*. Signature coinage: **"AI-speed"** ("delivered at AI-speed").
- **Casing**: Title Case for headings and CTAs; section eyebrows are terminal paths in lowercase mono — `~/projects`, `~/field-notes` — or numbered uppercase labels ("01 — PROFESSIONAL TIMELINE").
- **Metrics-forward**: claims are quantified and put in pills — "94% Payload Compression", "99.9% Uptime", "Zero-Hallucination", "$0 Infra".
- **No emoji.** Arrows are unicode/text: `→` `↗` `▸`.
- **Project copy formula**: category eyebrow (`Flagship · Desktop Cockpit` — middot-separated) → name → 2–3 sentence dense technical description → metric pills → tech chips.
- Footer sign-off pattern: "© 2026 Yaseen Khatib — Architected with Next.js & Framer Motion, delivered at AI-speed."

## VISUAL FOUNDATIONS

- **Background system**: near-black ink `#05070A`, fixed-attachment ambient radial glows (cyan top-center, purple top-right) + a faint fixed 40px CSS grid overlay. Content sits in a `max-w-[1400px]` centered column. No light mode.
- **Color**: cyan `#22D3EE` is the primary signal (links, eyebrows, CTAs); purple `#A855F7` only ever appears as cyan's gradient partner or syntax token; ice `#67E8F9` is the "live" accent (pulse dots, metric pills, hover borders). Neutrals are the zinc scale; emerald is reserved for ROI/success notes. Selection is cyan bg / ink text.
- **Type**: Inter (sans) for everything; Fira Code (mono) for eyebrows, categories, terminal text, metadata. Hero is 36–60px semibold, tracking-tight, leading 1.08. Body copy is 14px zinc-400 leading-relaxed. Eyebrows: 12px uppercase, letter-spacing 0.25em. The hero keyword gets the **animated cyan→purple gradient text** (200% bg, 4s linear loop).
- **Cards**: `rounded-2xl` glass — `border zinc-800/50`, translucent dark fill (`ink/40` or `zinc-950/60`), `backdrop-blur`. Hover: border shifts to ice/cyan + a soft outer ice glow `0 0 44px -12px rgba(103,232,249,.4)`, post cards also lift `y:-5`.
- **Buttons**: primary = solid cyan, ink text, `rounded-lg`, semibold 14px, cyan glow shadow that intensifies on hover; secondary = zinc-700 outline, hover border/text → ice. Hover scale 1.03, press scale 0.97.
- **Pills & chips**: metric pills are `rounded-full border ice/20 bg ice/6` with a glowing ice dot; tech chips are quieter — `rounded-full border zinc-800/80 text zinc-400 11px`.
- **The signal motif**: a glowing ice **PulseDot** (2.5px radius, ping ring expanding 1→2.2 scale, 1.8s easeOut loop) appears beside the wordmark, in badges, on project cards.
- **Window chrome**: macOS traffic lights (`#ff5f57 #febc2e #28c840`) top a "mission control" window (`rounded-2xl`, `bg-white/[0.02]` title bar, centered mono filename, "LIVE" status right). Terminals reuse the same chrome at `rounded-xl` over `#0b1018`.
- **Motion**: signature ease `cubic-bezier(0.21, 0.47, 0.32, 0.98)`; reveal = fade + rise 24–30px over 0.5–0.6s, staggered 0.08–0.12s; hovers transition 200–300ms. Infinite loops only for ambient signals (gradient text, pulse dots).
- **Rules/dividers**: 1px gradient fades — cyan→transparent after eyebrow numbers, zinc-800→transparent beside section headings.
- **Radii**: pills 9999px · cards/window 16px · terminals/media 12px · buttons 8px · notes 6px. No hard 0-radius elements.
- **Imagery**: none — no photos. Visual interest comes from abstract animated SVG/motion "art" panels inside `aspect-[4/3]` bordered frames, the grid, and glows. Color temperature is cool throughout.

## ICONOGRAPHY

- **Inline stroke SVGs**, hand-rolled in `src/components/Icons.tsx` — Lucide-style: `viewBox="0 0 24 24"`, `stroke="currentColor"`, `stroke-width="2"`, round caps/joins. GitHub mark is the one `fill` icon. Copied to `assets/icons/` as single files; recreated as React in `components/core/Icons.jsx`.
- No icon font, no PNG icons, no emoji. Unicode arrows `→ ↗ ▸` act as functional glyphs in links and toggles.
- **Logo**: the **Circuit Y — Live Port** mark: the Y drawn as a circuit trace in the cyan→purple signal gradient, node terminals (ice + purple) at the branch tips, and the brand's pulse-dot "live port" at the base. Full set in `assets/logo/`: `circuit-y.svg` (ink app-icon tile) + 1024/512/256 PNGs, `circuit-y-glyph.svg`/`-512.png` (bare, transparent), `lockup-dark-bg.png` (mark + name + role line), `favicon.ico` (16/32/48, also at `assets/favicon.ico`). The text wordmark (`wordmark.svg`, `wordmark-dark-bg.png`) remains for nav contexts. Dark-bg PNGs are for ink surfaces only.
- If new icons are needed, use **Lucide** (CDN) — it matches the 24/2px stroke style exactly.

## Index

- `styles.css` — global entry; imports everything under `tokens/`
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css` (glows/gradients/motion), `fonts.css`, `base.css` (body bg, gradient-text + grid utilities, terminal tokens)
- `guidelines/` — foundation specimen cards (Design System tab)
- `assets/` — `favicon.ico`, `logo/` (Circuit Y mark SVG+PNGs, glyph, lockup, wordmark), `icons/*.svg`, `reference/Portfolio.png` (homepage screenshot)
- `components/core/` — Button, TextLink, GradientText, PulseDot, SectionLabel, TerminalPath, Icons
- `components/surfaces/` — GlassCard, WindowFrame, Terminal
- `components/badges/` — MetricPill, TechChip, RoiNote, StatusBadge
- `ui_kits/portfolio/` — interactive homepage recreation (`index.html` + screen JSX)
- `SKILL.md` — agent-skill entry point

## Caveats

- **Fonts**: Inter + Fira Code load from Google Fonts (the repo holds no binaries — it uses `next/font/google`). Identical families, so no visual drift.
- Framer Motion behaviors are recreated with CSS animations/transitions in the kit.
