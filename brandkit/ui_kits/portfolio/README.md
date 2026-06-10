# UI Kit — Portfolio Site (Homepage)

High-fidelity recreation of `https://yaseenyk.github.io/portfolio` built from the source at `portfolio/src/` (Hero.tsx, Navbar.tsx, Dashboard.tsx, Projects.tsx, RecentPosts.tsx, page.tsx).

- `index.html` — entry; mounts `PortfolioHome` from the compiled DS bundle.
- `PortfolioHome.jsx` — page composition (grid bg → navbar → hero → projects window → posts → footer).
- `HomeNavbar.jsx` — fixed centered pill nav with sliding hover highlight.
- `HomeHero.jsx` — status badge, gradient-keyword headline, lead, CTA pair, AI-core art.
- `NeuralCoreArt.jsx` — CSS-animation recreation of NeuralCore.tsx (breathing core, rotating dashed rings, hex nodes).
- `HomeProjects.jsx` — WindowFrame "portfolio -- interactive-mode" housing `~/projects` rows (incl. ROI note + expandable shadow-docs toggle on IntegrateX).
- `HomePosts.jsx` — `~/field-notes` post cards with lift hover.
- `HomeFooter.jsx` — sign-off + external links.

Omitted (present on the real site, out of kit scope): ArchitecturePipeline, Products strip, Experience timeline, Roadmap, ContactForm, mobile menu. Project art panels reuse NeuralCoreArt as a stand-in for the per-project motion art (SystemTelemetry, NodeGraph, …).

Framer Motion entrance reveals are not reproduced; hover/press states are CSS.
