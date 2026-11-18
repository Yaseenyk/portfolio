/**
 * Everything I have built, in one plain-data registry (safe to import from server and client: no post bodies, no components).
 * The /projects page is drawn from it, and entries with a `study` get a case-study page at /products/<slug>/
 * (app/products/[slug]). Products that already had a hand-written case study keep it and link to it via `caseStudy`.
 *
 * Every fact here was checked against the repos and the live sites on 14 Nov 2026. Add real numbers only.
 * `shot` is a real screenshot in public/shots/<shot>.webp (1280x800) with a 720x450 "-sm" copy.
 */

export type WorkGroup = "flagship" | "product" | "site" | "client" | "earlier";

export interface Study {
  /** One or two sentences: who had the problem and what it was. */
  problem: string;
  /** What exists now. */
  built: string;
  /** The decisions that shaped it, each with its reason. */
  decisions: [string, string][];
  /** Things a stranger can verify. */
  proof: string[];
  /** What it does not do, or what is still missing. Honest limits. */
  limits?: string[];
}

export interface Work {
  slug: string;
  name: string;
  group: WorkGroup;
  kind: string;
  /** One sentence. */
  line: string;
  /** The result or the proof, one line. */
  result?: string;
  stack: string[];
  shot?: string;
  live?: string;
  /** Link to the case study (an existing /products page, a blog post, or the generated one). */
  caseStudy?: string;
  code?: [string, string][];
  study?: Study;
}

const GH = "https://github.com/Yaseenyk";

export const GROUPS: { id: WorkGroup; title: string; note: string }[] = [
  { id: "flagship", title: "Flagship products", note: "The three I would show first." },
  { id: "product", title: "More products", note: "Complete products with their own users, sign-in or data." },
  { id: "site", title: "Sites and free tools", note: "Content and utility sites I build and run. Free to use." },
  { id: "client", title: "Client and applied work", note: "Built for someone else, or to solve one specific problem." },
  { id: "earlier", title: "Earlier and enterprise work", note: "From my jobs. The code is private, so there is no link and no screenshot." },
];

export const WORK: Work[] = [
  /* ------------------------------------------------------------ flagship */
  {
    slug: "spotai", name: "SpotAI", group: "flagship", kind: "AI gym app · mobile and web",
    line: "An AI gym app for Indian gyms: a squat coach on the phone camera for members, and arrivals, dues and UPI payments for owners.",
    result: "No video ever leaves the phone. Each gym's data is walled off. 190 API tests.",
    stack: ["Vue 3", "Capacitor", "NestJS", "PostgreSQL", "MediaPipe", "NATS"],
    shot: "spotai", live: "https://spotai.streamerosai.com/", caseStudy: "/products/spotai/",
  },
  {
    slug: "fitrank", name: "FitRank", group: "flagship", kind: "AI decision model",
    line: "Ranks people for open tasks. A small model I trained scores every option, and a manager makes every final call.",
    result: "Beats a rules-only baseline on shortlists (94% vs 91%) and publishes where it loses. 93.5% backend test coverage.",
    stack: ["Python", "FastAPI", "PyTorch", "PostgreSQL + pgvector", "React", "Docker"],
    shot: "fitrank", live: "https://fitrank.streamerosai.com/", caseStudy: "/products/fitrank/",
  },
  {
    slug: "streameros", name: "streamerOS", group: "flagship", kind: "Desktop app · Rust",
    line: "A desktop app that reads a streamer's chat on their own PC and switches OBS scenes when chat spikes. Built with Claude Code.",
    result: "No account and no cloud. 306 Rust tests. The site and its AI support agent are public.",
    stack: ["Rust", "Tauri 2", "OBS WebSocket", "Next.js", "Hono", "Upstash Vector"],
    shot: "streameros", live: "https://streamerosai.com/", caseStudy: "/products/streameros/", code: [["Site and agent", `${GH}/streamer-os-website`]],
  },

  /* ------------------------------------------------------------ products */
  {
    slug: "esports-hub", name: "Esports Hub", group: "product", kind: "Tournament platform",
    line: "Everything an organiser needs to run a gaming or sports tournament: sign-ups, brackets, points tables, ID cards, live TV screens and gate check-in.",
    result: "About 640 browser tests on desktop and phone and about 600 API tests, on every push.",
    stack: ["Next.js 14", "React", "TypeScript", "Hono", "Cloudflare Workers", "D1 (SQL)", "Playwright"],
    shot: "esports", live: "https://esports.streamerosai.com/", caseStudy: "/products/esports-hub/",
    code: [["Frontend", `${GH}/esports-frontend`], ["API", `${GH}/esports-backend`]],
    study: {
      problem: "A college fest or a local gaming event is run from spreadsheets and WhatsApp groups. Sign-ups are a form, brackets are drawn by hand, and nobody at the gate knows who has paid.",
      built: "One site with 14 free tools that need no account (bracket and points-table makers, ID cards, certificates, posters, a gate check-in scanner), and an app behind sign-in for organisers who want their event, teams and results saved. Built with Claude Code, reviewed and tested by me.",
      decisions: [
        ["Free tools first, account second", "The points-table maker and the bracket generator work in the browser with nothing to install and no sign-up. An organiser gets value in a minute, and only creates an account when they want to keep their event."],
        ["A static site and a small API", "The site is a static Next.js export on GitHub Pages. The API is a Hono app on Cloudflare Workers with a D1 SQL database, built up over 48 migrations. Nothing runs on a server I have to keep alive."],
        ["Sign-in checked on the server, with no stored secret", "Google sign-in tokens are verified in the Worker against Google's public keys with the Web Crypto API, so no client secret is stored. Email sign-ups must confirm their address before they can use the app."],
        ["Organisations and roles, tested as a contract", "Who may do what is written down as fixture files, and the test suite fails if a route's permissions drift from them."],
        ["Analytics that cannot be polluted by tests", "Tag Manager loads only on the live domain. My own browser tests once added about 2,800 fake page views to Google Analytics; a host check now makes that impossible."],
      ],
      proof: [
        "About 640 browser tests run on desktop and phone, and about 600 API tests, on every push.",
        "The site lists 14 free tools, 30 guides and 23 ID card designs, in 3 languages.",
        "41 of its 56 sitemap pages were indexed by Google on 13 Nov 2026 (measured with Google's URL Inspection API).",
        "Both repositories are public.",
      ],
      limits: [
        "It is new. I have no real event numbers to publish yet, so none are claimed here.",
        "One live-screen browser test was failing on the last run I checked and still needs fixing.",
      ],
    },
  },
  {
    slug: "analytics-dashboard", name: "Analytics dashboard", group: "product", kind: "Reporting tool",
    line: "Google Analytics and Search Console for all twelve of my sites on one phone-friendly page, with a list of pages Google has not indexed.",
    result: "Report data is saved in a database and refreshed one site at a time, only when I ask, so it stays inside Google's limits.",
    stack: ["Next.js", "TypeScript", "Cloudflare Workers", "KV", "GA4 Data API", "Search Console API"],
    shot: "analytics", live: "https://analytics.streamerosai.com/", caseStudy: "/products/analytics-dashboard/", code: [["Code", `${GH}/analytics-dashboard`]],
  },
  {
    slug: "sable", name: "Sable", group: "product", kind: "Mobile AI agent",
    line: "A personal expense tracker for Android where the model proposes and only a person can commit a change. Records stay on the phone.",
    result: "No cloud backend and no SMS access. Every database change waits behind a Review and Confirm card.",
    stack: ["React Native (Expo)", "SQLite", "OpenAI function calling", "TypeScript"],
    shot: "sable", live: "https://sable.streamerosai.com/", caseStudy: "/products/sable/",
  },
  {
    slug: "portfolio-concierge", name: "Portfolio Concierge", group: "product", kind: "RAG API and MCP server",
    line: "Answers questions about my work from this site's own pages, and refuses when it has no good source. Also a public MCP server.",
    result: "Runs live on the home page. The index rebuilds after every deploy.",
    stack: ["Cloudflare Workers", "Vectorize", "Workers AI", "MCP", "TypeScript"],
    live: "/#rag-concierge", code: [["Code", `${GH}/portfolio/tree/main/worker`]],
  },
  {
    slug: "integratex", name: "IntegrateX", group: "product", kind: "Workflow engine",
    line: "A drag-and-drop workflow canvas, with a serialization adapter that separates what the screen needs from what the database stores.",
    result: "Stored payloads cut by 94%, with nothing lost on reload.",
    stack: ["React Flow", "Zustand", "TypeScript", "MongoDB"],
    shot: "integratex", live: "/sandbox/", caseStudy: "/blog/94-percent-payload-reduction-react-flow/",
  },

  /* ------------------------------------------------------------ sites and free tools */
  {
    slug: "solar-guide", name: "Solar subsidy guide", group: "site", kind: "Guide and calculator · 13 languages",
    line: "A guide to India's rooftop solar subsidy with a calculator that checks a vendor's quote, in 13 languages.",
    result: "Every figure carries its source and the date it was checked. The build fails if one does not.",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Cloudflare D1"],
    shot: "solar", live: "https://solar.streamerosai.com/", caseStudy: "/products/solar-guide/", code: [["Code", `${GH}/solar-site`]],
    study: {
      problem: "A household comparing rooftop solar quotes has to work out the central subsidy from government pages, in English, while a vendor quotes a number they cannot check.",
      built: "Thirteen pages in thirteen languages: what the subsidy pays, how to apply, how to check status, and a calculator where you type the system size and the vendor's price and see the subsidy, the cost after it and the payback time. Nothing you type leaves the browser.",
      decisions: [
        ["Every number has a source and a date", "All figures live in one file, each with a link to its source and the day it was checked. A build step refuses to publish a figure without both: 34 facts at the last build."],
        ["Translations cannot drift from the English", "A second build check compares every language file with the English one, so a translated page cannot carry a different number or miss a section."],
        ["A language goes live to Google only after a native reader approves it", "Translated pages were published but marked not-for-indexing until someone who reads the language confirmed them. All thirteen were opened on 13 Nov 2026 after that review."],
        ["It says what it is", "The first line on the page says it is an independent guide and not a government site."],
      ],
      proof: [
        "169 pages in the sitemap: 13 pages in each of 13 languages.",
        "The build prints its checks: 34 facts sourced and dated, 12 translations matching the English file.",
        "The enquiry form stores leads in a database; it was tested end to end.",
        "The repository is public.",
      ],
      limits: ["Search traffic is close to zero so far; most language pages were opened to Google only on 13 Nov 2026."],
    },
  },
  {
    slug: "exam-dates", name: "Exam dates India", group: "site", kind: "Reference site",
    line: "Dates, eligibility and fees for JEE Main, NEET UG, CUET UG and UPSC CSE, read from each exam body's own bulletin.",
    result: "A fact without an official source fails the build. When a date is not announced, the page says so.",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
    shot: "exams", live: "https://exams.streamerosai.com/", caseStudy: "/products/exam-dates/", code: [["Code", `${GH}/exams`]],
    study: {
      problem: "Exam date pages copy each other. A student planning around a wrong date pays for it, and most pages do not say where a date came from or when it was last checked.",
      built: "One site for four national exams. Each date, rule and fee links to the official document it was read from and shows the day it was checked. A calendar puts every date in one list.",
      decisions: [
        ["Official documents only", "Every fact is read from the exam body's information bulletin, public notice or annual calendar, never from another website."],
        ["The build enforces it", "A fact with no source cannot be published: the build fails. That is the same rule the solar guide uses."],
        ["It admits what is not known", "When an exam body has not published a date yet, the page says that instead of guessing."],
      ],
      proof: [
        "Four exams are covered: JEE Main, NEET UG, CUET UG and UPSC CSE.",
        "Each table row links to the official source it came from.",
        "The repository is public.",
      ],
      limits: ["Four exams only. More are added one at a time, each from its official bulletin."],
    },
  },
  {
    slug: "tool-sites", name: "Free tool sites", group: "site", kind: "Four utility sites, one codebase",
    line: "Developer tools, money calculators, image tools and math calculators: four free sites built from one shared codebase.",
    result: "284 unit tests. The US paycheck calculator is tested against the tax authority's own printed figures.",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Vitest", "Monorepo"],
    shot: "site-calc", live: "https://calc.streamerosai.com/", caseStudy: "/products/tool-sites/", code: [["Code", `${GH}/sites-lab-yk`]],
    study: {
      problem: "Small online tools are easy to build badly: slow pages, layout that jumps when an advert loads, and calculators whose answers nobody has checked.",
      built: "Four sites that share one layout, theme and SEO package and differ only in their tools: tools.streamerosai.com (JSON, Base64 and other developer tools), calc.streamerosai.com (pay raise, salary, overtime, paycheck, currency), images.streamerosai.com (compress, resize, convert) and math.streamerosai.com (percentage, age, date, hours, ratio).",
      decisions: [
        ["One shared package, four small apps", "Layout, navigation, light and dark themes, SEO and analytics live in one package. A new tool is one page and one entry in a list, so the four sites stay consistent."],
        ["Calculators are tested against published figures", "The paycheck calculator uses the 2026 US federal tax tables, and every bracket boundary is unit-tested against the amounts the tax authority prints. Tax figures are re-sourced each January."],
        ["Advert space is reserved before any advert exists", "Each advert position is a fixed-size labelled box, so the page does not jump when an advert loads. Adverts are off until the sites are approved."],
        ["Each site deploys on its own", "One repository, four deploy pipelines, four domains. A change to one site does not redeploy the others."],
      ],
      proof: [
        "284 unit tests across the four apps and the shared package.",
        "All four sites are live on their own domains.",
        "The repository is public.",
      ],
      limits: ["Adverts are not running yet, so there is no revenue to report.", "Traffic is still small."],
    },
  },
  {
    slug: "site-tools", name: "Developer tools", group: "site", kind: "Part of the free tool sites",
    line: "JSON, Base64 and other everyday developer tools that run in the browser.",
    stack: ["Next.js 14", "TypeScript"], shot: "site-tools", live: "https://tools.streamerosai.com/", caseStudy: "/products/tool-sites/",
  },
  {
    slug: "site-images", name: "Image tools", group: "site", kind: "Part of the free tool sites",
    line: "Compress, resize and convert images online.",
    stack: ["Next.js 14", "TypeScript"], shot: "site-images", live: "https://images.streamerosai.com/", caseStudy: "/products/tool-sites/",
  },
  {
    slug: "site-math", name: "Math calculators", group: "site", kind: "Part of the free tool sites",
    line: "Percentage, age, date, hours and ratio calculators.",
    stack: ["Next.js 14", "TypeScript"], shot: "site-math", live: "https://math.streamerosai.com/", caseStudy: "/products/tool-sites/",
  },
  {
    slug: "defendit", name: "DefendIt", group: "site", kind: "Service site for students",
    line: "Final-year projects for BCA, MCA and B.Tech students in India, built and then explained line by line so the student can defend it in the viva.",
    result: "Free report and synopsis templates, and prices shown on the page.",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
    shot: "defendit", live: "https://campus.streamerosai.com/", caseStudy: "/products/defendit/", code: [["Code", `${GH}/campus-site`]],
    study: {
      problem: "Final-year students in India often buy a project they cannot explain, and fail the viva. The sites that sell projects hide their prices and do not teach the code.",
      built: "A site that sells a different thing: I build the project, then walk the student through the code until they can explain every part. It shows its prices, and gives away report and synopsis templates and guides for free.",
      decisions: [
        ["Prices on the page", "The price range is on the first screen. A student should not have to message a stranger to learn what something costs."],
        ["Its own site, not a corner of my portfolio", "It started inside this portfolio. A recruiter and a student want different things, so it moved to its own domain and the old addresses redirect there."],
        ["Free help first", "Templates, topic guides and viva questions are free, because most students who arrive need a format, not a purchase."],
      ],
      proof: [
        "The site is live with its prices visible.",
        "63 old portfolio addresses redirect to it, so no earlier link broke.",
        "The repository is public.",
      ],
      limits: ["I do not publish student results or testimonials, because I have none I can verify publicly."],
    },
  },

  /* ------------------------------------------------------------ client and applied */
  {
    slug: "path-saathi", name: "Path Saathi LMS", group: "client", kind: "Client project · learning platform",
    line: "A free vocational-skilling platform for a client with a library of course videos and PDFs.",
    result: "The brief arrived on a Monday. Login, course delivery and a self-paced flow were live the next day.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    shot: "pathsaathi", live: "https://devlms.pathsaathi.in/login",
  },
  {
    slug: "aisa", name: "AISA", group: "client", kind: "Student association platform",
    line: "A department site that arrived as one 4,019-line HTML file with an exposed key, rebuilt with the server deciding what each person may do.",
    result: "Five sign-in states and 29 tests.",
    stack: ["Next.js", "Java 25", "Spring Boot 3", "Firestore", "Firebase Auth"],
    shot: "aisa", live: "https://yaseenyk.github.io/SIT-FE/", code: [["Frontend", `${GH}/SIT-FE`], ["API", `${GH}/SIT-BE`]],
  },
  {
    slug: "shelfsight", name: "ShelfSight AI", group: "client", kind: "Retail computer vision",
    line: "Four shelf problems for a small Indian shop in one on-premise system: missing stock, shelf layout, produce freshness and expiry dates.",
    result: "650 tests. It returns an error instead of a score it cannot support.",
    stack: ["FastAPI", "YOLOv8", "MobileNetV2", "Next.js 14", "Docker"],
    code: [["Backend", `${GH}/Shelfsight-AI-real-time-planogram-and-inventory-intelligence-be`], ["Dashboard", `${GH}/Shelfsight-AI-real-time-planogram-and-inventory-intelligence`]],
  },
  {
    slug: "streameros-agent", name: "streamerOS support agent", group: "client", kind: "RAG support assistant",
    line: "A first-line support assistant for streamerOS that answers only from the product's own documentation.",
    result: "Runs on Cloudflare Workers and streams its answer.",
    stack: ["Hono", "Cloudflare Workers", "Upstash Vector", "Gemini"],
    live: "https://streamerosai.com/", code: [["Code", `${GH}/streamer-os-website/tree/main/api`]],
  },
  {
    slug: "police-rag", name: "Police RAG agent", group: "client", kind: "Document assistant",
    line: "An assistant for police case work that searches the documents an investigator already has and shows the passages it relied on.",
    stack: ["Python", "LLM", "Vector database"],
  },
  {
    slug: "linkedin-pipeline", name: "LinkedIn pipeline", group: "client", kind: "Automation",
    line: "A scheduled job on GitHub Actions that publishes my technical posts to LinkedIn and keeps its state in Git.",
    result: "No server. It costs nothing to run.",
    stack: ["Python", "GitHub Actions"], caseStudy: "/products/linkedin-pipeline/", code: [["Code", `${GH}/linkedin-bot`]],
  },
  {
    slug: "ai-blogger", name: "AI blog writer (retired)", group: "client", kind: "An experiment I switched off",
    line: "A pipeline that drafted and published articles automatically. It worked, and it taught me that automated volume is the wrong way to publish.",
    result: "Switched off. Kept as a write-up of what went wrong.",
    stack: ["Next.js", "MDX", "GitHub Actions"], caseStudy: "/products/ai-blogger/",
  },

  /* ------------------------------------------------------------ earlier */
  {
    slug: "cmz", name: "CMZ App", group: "earlier", kind: "Enterprise admin portal",
    line: "An admin portal with role-based access, Redis caching and real-time updates.",
    stack: ["React", "TypeScript", "Node.js", "Redis", "JWT", "WebSockets"],
  },
  {
    slug: "hospital-api", name: "Hospital API", group: "earlier", kind: "REST API",
    line: "A REST API for hospital workflows: patients, doctors and appointments, with cached lookups and validation on every request.",
    stack: ["Node.js", "Express", "MongoDB"],
  },
  {
    slug: "tv-suite", name: "Smart-TV apps", group: "earlier", kind: "Samsung, LG and Vizio",
    line: "TV apps written in plain JavaScript so they stay fast on low-powered TV hardware.",
    stack: ["JavaScript", "Samsung", "LG", "Vizio"],
  },
  {
    slug: "sankalp", name: "SANKALP", group: "earlier", kind: "Refactoring",
    line: "A refactor of an enterprise application's core: types added across the codebase and the main data flows untangled.",
    stack: ["TypeScript", "System design"],
  },
];

export const studies = () => WORK.filter((w) => w.study);
export const getWork = (slug: string) => WORK.find((w) => w.slug === slug);
