/**
 * Everything I have built, in one plain-data registry (safe to import from server and client: no post bodies, no components).
 * The /projects page is drawn from it, and entries with a `study` get a case-study page at /products/<slug>/
 * (app/products/[slug]). Products that already had a hand-written case study keep it and link to it via `caseStudy`.
 *
 * Every fact here was checked against the repos and the live sites on 14 Nov 2026; the five generated case studies
 * (howItWorks, timeline, limits) were re-read from their repos and git logs on 19 Nov 2026. Add real numbers only.
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
  /** How it works, read from the product's own repository: [title, text]. */
  howItWorks?: [string, string][];
  /** Dated milestones read from the repository's git log: [date, what happened]. */
  timeline?: [string, string][];
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
        ["A static site and a small API", "The site is a static Next.js export on GitHub Pages. The API is a Hono app on Cloudflare Workers with a D1 SQL database, built up over about 50 migrations. Nothing runs on a server I have to keep alive."],
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
        "The newer organiser features (public tournament pages, team boards, disputes) are built behind feature flags that default to off; they were not switched on when I last checked, on 15 Nov 2026.",
      ],
      howItWorks: [
        ["The heavy work happens in the browser", "The ID card studio reads an Aadhaar QR code with jsQR and printed text with Tesseract.js, both inside the browser tab, and keeps only the last four digits. Card sheets become PDFs with jsPDF and batches become ZIP files with JSZip, also in the browser. No scan or photo is uploaded to make a card."],
        ["Rules written down before the code", "The repository's instructions set hard limits: everything runs on free plans, there is no money anywhere (no entry fees, prizes, payouts or wallets, and no money columns in the database), accounts are 18+ only, no government ID number or date of birth is stored, and profiles stay private until the person opts in. Do Not Track and Global Privacy Control are honoured."],
        ["One HTTP client for the whole site", "Every call to the API goes through one client module that caches, removes duplicate requests, uses ETags, batches and retries only reads. A second client is not allowed, so caching and error handling behave the same on every screen."],
        ["Three layers for new code, checked in CI", "New features are split into presentation, logic and data folders that may only talk to their neighbour. A lint script run in CI rejects arbitrary Tailwind values and relative ../ imports in the new code, while older files are left working rather than mass-refactored."],
        ["Screens that should not be in search stay out", "The signed-in app, the gate scanner, join links, passes, admin and the TV display routes are marked noindex on purpose. The public tools and guides are the only pages offered to search engines."],
      ],
      timeline: [
        ["17 Jan 2024", "The API repository starts as a small Express project. That code is kept in a legacy folder; the live API is now a Hono Worker."],
        ["10 Nov 2026", "The site starts as an interface prototype with sample data, marked noindex until real tools replaced the samples."],
        ["15 Nov 2026", "Decision recorded to build the next version on the existing free D1 database rather than a paid Postgres."],
        ["16 Nov 2026", "Trust pass: a real Contact page, an About page that names the author, and the API docs page taken out of search."],
        ["19 Nov 2026", "Publishers' game icons replaced with the site's own text badges, and guides bylined to a named author. 106 commits since 10 Nov."],
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
    shot: "sable2", live: "https://sable.streamerosai.com/", caseStudy: "/products/sable/",
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
        ["Every number has a source and a date", "All figures live in one file, each with a link to its source and the day it was checked. A build step refuses to publish a figure without both: 35 facts at the 19 Nov 2026 build."],
        ["Translations cannot drift from the English", "A second build check compares every language file with the English one, so a translated page cannot carry a different number or miss a section."],
        ["A language goes live to Google only after a native reader approves it", "Translated pages were published but marked not-for-indexing until someone who reads the language confirmed them. All thirteen were opened on 13 Nov 2026 after that review."],
        ["It says what it is", "The first line on the page says it is an independent guide and not a government site."],
      ],
      proof: [
        "172 URLs in the sitemap on 19 Nov 2026, across 13 languages.",
        "The build prints its checks: 35 facts sourced and dated, 12 translations matching the English file.",
        "The enquiry form stores leads in a database; it was tested end to end.",
        "The repository is public.",
      ],
      limits: [
        "Search traffic is close to zero so far; most language pages were opened to Google only on 13 Nov 2026.",
        "The newest English sections (the worked calculator examples and the six-facts summary) are English only until a native reader translates them; the other languages are shorter.",
        "The ministry's own site timed out during the 19 Nov 2026 re-check, so an amendment published only there after June 2024 could have been missed.",
      ],
      howItWorks: [
        ["The calculator is one small, pure function", "The subsidy is worked out in one module that reads its rates from the facts file: the per-kW rate for the first 2 kW, a lower rate for the third kW, nothing beyond 3 kW, with higher rates for the special-category states. The guidelines' own worked example (2.5 kW = 30,000 x 2 + 18,000 x 0.5 = 69,000 rupees) is written beside the code. Payback is the quote after subsidy divided by the yearly saving, and the page shows n/a when there is no saving to divide by."],
        ["The vendor's price is compared with the benchmark", "The same module computes the ministry's benchmark cost for the system size, so a household can see how far a quote sits above or below it. The page says the benchmark is a reference, not the price anyone will be quoted."],
        ["Sources were moved to official documents", "On 19 Nov 2026 the four figures that cited a trade publication were re-pointed to the sections of the official operational guidelines that state the same values. No value changed. The national portal's own text was read to confirm the subsidy rates and the 31 March 2027 closing date."],
        ["New text is never machine-translated", "Each language is a JSON file checked against the English one. Sections added later live in a separate English-only file and are merged only on English pages, so the translated pages cannot show text nobody has reviewed in that language."],
        ["Nothing typed leaves the browser", "The calculator runs in the page. Only the optional enquiry form sends anything, and only what the person types into it."],
      ],
      timeline: [
        ["4 Nov 2026", "First version: the subsidy guide, sourced facts, the calculator and the enquiry form; the same day, 12 more languages and six more guides."],
        ["5 Nov 2026", "Advert placeholders hidden until AdSense approves the site."],
        ["10 Nov 2026", "Hindi, Marathi and Gujarati opened to search after review."],
        ["13 Nov 2026", "All 13 languages opened to search after native readers confirmed the translations."],
        ["19 Nov 2026", "Every fact re-read in the guidelines and the portal; English calculator page grows from about 250 to about 1,040 words of worked sums."],
      ],
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
        "The build prints its check: 36 blocks of facts, all from official domains, sourced and dated.",
        "The repository is public.",
      ],
      limits: [
        "Four exams only. More are added one at a time, each from its official bulletin.",
        "The UPSC site and two NTA exam sites refused automated requests (HTTP 403) during the 19 Nov 2026 re-check, so those blocks still show their 10 Nov check date. I did not get around the block by pretending to be a browser.",
        "The fee pages for NEET UG, CUET UG and UPSC CSE are kept out of search: their bulletins hold too few fee facts to make a page worth reading, and I did not pad them.",
      ],
      howItWorks: [
        ["Facts are data, not prose", "Every date, rule and fee lives in one TypeScript file as blocks. Each block names its source document, links to it, carries the date it was last checked and holds labelled rows. Pages, the calendar and the FAQ answers are all built from those rows, so the same date cannot say two different things on two pages."],
        ["The build checks where a fact came from", "A script reads every block and fails the build if the source is missing, the checked date is missing, two rows share a label, or the source is not on an official domain (nta.nic.in, nic.in, gov.in, upsc.gov.in or the government's own document CDN). A link to another exam website cannot get through."],
        ["A daily watcher for new notices", "A scheduled job runs every morning. It reads the NTA and UPSC notice pages for links it has not seen before, and fingerprints every official PDF the site cites to notice when a document changes. When something is new it opens an issue for me to read. It never edits the site: a person reads the notice, updates the row and moves the checked date."],
        ["The site rebuilds every day", "A daily deploy means lists of upcoming dates drop events that have passed, and a table whose facts were last read more than 30 days ago shows a warning on time, without anyone pushing a change."],
        ["Thin pages stay out of the index by rule", "A section with too few sourced facts to stand alone is marked noindex and left out of the sitemap automatically, rather than padded with filler."],
      ],
      timeline: [
        ["10 Nov 2026", "Site launched for JEE Main, NEET UG, CUET UG and UPSC CSE, every fact read from the official document; the daily watcher started the same day."],
        ["16 Nov 2026", "Trust pass: About, Contact and Terms pages, a full privacy policy, and five thin pages taken out of search."],
        ["19 Nov 2026", "Facts re-read in the official bulletins. The full JEE fee table and the NEET eligibility rules were added from the bulletins, and both pages returned to the index. Sitemap: 28 URLs."],
      ],
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
      built: "Four sites that share one layout, theme and SEO package and differ only in their tools: tools.streamerosai.com (JSON formatter, validator, viewer, compare, minifier, JSON to CSV, Base64 encode and decode), calc.streamerosai.com (pay raise, salary and hourly, overtime, US paycheck, currency, EMI, SIP, GST, compound interest, loan eligibility and India income tax), images.streamerosai.com (compress to a target size, resize, and convert PNG, WebP and AVIF to JPG and JPG to PNG) and math.streamerosai.com (percentage and percent change, age, dates, hours and time, ratio, average, discount and standard deviation).",
      decisions: [
        ["One shared package, four small apps", "Layout, navigation, light and dark themes, SEO and analytics live in one package. A new tool is one page and one entry in a list, so the four sites stay consistent."],
        ["Calculators are tested against published figures", "The paycheck calculator uses the 2026 US federal tax tables, and every bracket boundary is unit-tested against the amounts the tax authority prints. Tax figures are re-sourced each January."],
        ["Advert space is planned, but nothing renders yet", "Each future advert position has a fixed reserved height (250 or 280 pixels), so a late advert could not make the page jump. Until AdSense approves the sites the slot renders nothing at all: no empty box, no label, no ad script."],
        ["Each site deploys on its own", "One repository, four deploy pipelines, four domains. A change to one site does not redeploy the others."],
      ],
      proof: [
        "284 unit tests across the four apps and the shared package.",
        "All four sites are live on their own domains.",
        "The repository is public.",
      ],
      limits: ["Adverts are not running yet, so there is no revenue to report.", "Traffic is still small.", "Tax tables and GST rates change; they are only as current as their last re-sourcing, which each page dates."],
      howItWorks: [
        ["Your input stays in your browser", "Every tool runs client-side. The image tools compress, resize and convert in the page itself, and the JSON tools parse in the page, so nothing you paste or upload is sent to a server. That is a written rule of the repository, not an afterthought."],
        ["Strict code standards, checked on every push", "TypeScript runs in strict mode with unchecked index access and unused code treated as errors, and any is banned. Pages are server-rendered with small client widgets, metadata and JSON-LD come only from shared helpers, and a CI job runs the checks on every push and pull request."],
        ["Where adverts may go is fixed in code", "Advert positions are limited by code: never above the fold, never in the header or footer and never inside a tool card, always below a result with a wide gap so a slot cannot be clicked by accident."],
        ["Rebuilt pages, not more pages", "On 16 Nov 2026 the calculator, JSON, image and math pages were rebuilt with worked examples, computed tables, FAQs and sources, and duplicate or templated pages were taken out of search instead of being multiplied."],
        ["Corrections are dated", "The GST page was corrected to the 5, 18 and 40 percent rates in force since 22 Sep 2025 when the pages were rebuilt."],
      ],
      timeline: [
        ["4 Nov 2026", "The shared shell and all four sites built and deployed, each to its own repository and domain; paycheck calculator on the 2026 IRS tables."],
        ["12 Nov 2026", "EMI, SIP, loan eligibility, GST, compound interest, percentage and India income tax calculators added."],
        ["15 Nov 2026", "Math and calc pages that had dropped out of the index were deepened, and the percentage calculator given one owner page."],
        ["16 Nov 2026", "Pages rebuilt with worked examples and sources; Terms pages added; advert slots changed to render nothing until approval."],
      ],
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
    slug: "defendit", name: "DefendIt", group: "site", kind: "Project classes for students",
    line: "Final-year project classes for BCA, MCA and B.Tech students in India: the project is built together in live classes and the student writes part of every module, so they can defend it in the viva.",
    result: "Prices on the page, free report and synopsis templates, and nothing finished is handed over.",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
    shot: "defendit", live: "https://campus.streamerosai.com/", caseStudy: "/products/defendit/", code: [["Code", `${GH}/campus-site`]],
    study: {
      problem: "Final-year students in India often buy a project they cannot explain, and fail the viva. The sites that sell projects hide their prices and do not teach the code.",
      built: "A site for project classes. Every tier starts with a design document and a starter repository. On the Mentored tier we build the project together in live classes, one module per class: I write and explain part of each module on screen and the student writes part of it, so they take part in every module. The student writes the report and I review it. Prices are on the page, and report and synopsis templates, guides and viva questions are free.",
      decisions: [
        ["A class, not a delivery", "On 19 Nov 2026 the offer was rewritten as project classes. The old done-for-you wording was removed from every page, the tiers became Starter, Guided and Mentored, and the terms and the enrolment agreement (version 2.0) were changed to match, with a dated note that earlier agreements keep their terms."],
        ["Prices on the page", "The price range is on the first screen. A student should not have to message a stranger to learn what something costs."],
        ["Its own site, not a corner of my portfolio", "It started inside this portfolio. A recruiter and a student want different things, so it moved to its own domain and the old addresses redirect there."],
        ["Free help first", "Templates, topic guides and viva questions are free, because most students who arrive need a format, not a purchase."],
      ],
      proof: [
        "The site is live with its prices and tiers visible.",
        "The terms say in plain words that this is a project class, not a delivery service, and that nothing finished is handed over to submit.",
        "63 old portfolio addresses redirect to it, so no earlier link broke.",
        "The repository is public.",
      ],
      limits: [
        "I do not publish student results or testimonials, because I have none I can verify publicly.",
        "Many colleges have rules about outside help. The site says that following them is the student's responsibility, and points students whose college allows no outside help to the free guides instead.",
      ],
      howItWorks: [
        ["Three tiers, each saying what it includes", "Starter: a design document (scope, modules, database schema), a starter repository with setup, folder structure, login and one worked example module, and a module-by-module build plan. Guided adds a written review of every module the student writes and of each report chapter. Mentored adds the live classes, daily one-hour sessions on Google Meet after 8 PM IST, debugging help and a mock viva."],
        ["A catalogue that has to earn its place in search", "Eleven project listings (web, mobile and machine learning) are typed data in the code. Each project page stays noindex until it has content genuinely its own, controlled by an explicit allow-list rather than by default."],
        ["No checkout, and no card details", "Payment is direct by UPI or bank transfer in monthly instalments. There is no payment gateway on the site, and it never asks for card numbers, OTPs or logins."],
        ["Free material is most of the site", "Thirty-one guides (topics per degree, report and synopsis formats, viva questions, deployment), downloadable report and synopsis templates, a sample report PDF and a 16-day AI engineering journey are free and need no sign-up."],
        ["One shared backend", "The enquiry form and the stored enrolment agreements go to the Cloudflare Worker that lives in this portfolio's repository, which allow-lists the DefendIt origin."],
      ],
      timeline: [
        ["22 Oct 2026", "Moved out of this portfolio onto its own domain, and renamed DefendIt the same day."],
        ["23 Oct 2026", "Technical deep dives written for all eleven project pages, which were then opened to search."],
        ["30 Oct 2026", "Sample final-year project report (PDF) and the report and synopsis templates added."],
        ["15 Nov 2026", "MCA report format, synopsis and BCA decision guides added."],
        ["16 Nov 2026", "About and Contact pages, and a privacy policy covering the visit counter, cookies and advertising."],
        ["19 Nov 2026", "The offer became project classes: built together in live classes, the student writes part of every module."],
      ],
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
