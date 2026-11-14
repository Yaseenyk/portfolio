# Yaseen Khatib: career timeline and skills

URL: https://yk.streamerosai.com/about
Summary: Five years of full-stack work, from hospital software to the LLM, RAG and agent layer, with the stack, roles and what he is looking for.

Yaseen Khatib is a Full Stack AI Developer based in Hyderabad, India, working on the MERN stack (MongoDB, Express, React, Node.js) with TypeScript and Next.js, and on the AI layer around it: RAG pipelines, function-calling agents, MCP servers, evals and cost-aware routing between models.

Timeline:
- 2021 to 2023: Software Developer (SDE 1) at Manorama Infosolutions, healthcare software, remote. Built REST routing layers for hospital information systems on ASP.NET and React, with about twice the payload throughput on the hot paths, and moved tangled request handling into MVC hardened for concurrent sessions.
- 2023 to 2025: Full Stack Developer at MSA Software, remote. Made dashboards 1.5 to 2x faster by profiling slow MongoDB aggregation pipelines, adding a caching layer and lazy-loading heavy panels. Moved the team's legacy JavaScript to TypeScript and Next.js, and moved shared state from hand-rolled Redux to Redux Toolkit.
- 2025 to now: Senior Software Developer at Sparity, Hyderabad, hybrid. Builds the AI tooling layer: a local hybrid RAG system, an MCP server for Claude Code, an AI pull-request review service, and a staffing-match pilot (FitRank).

Skills: MongoDB, Express, React, Node.js, TypeScript, Next.js, Redux Toolkit, REST APIs, WebSockets, JWT auth, Tailwind CSS; LLM integration (OpenAI, Gemini and Claude APIs), RAG, embeddings and vector search (pgvector, Vectorize, Upstash Vector, Chroma), function calling, agents, MCP servers, prompt engineering, LLM evals, fine-tuning and distillation with PyTorch, Ollama; Python and FastAPI, NestJS, Java and Spring Boot, ASP.NET, PostgreSQL, SQL Server, Redis, SQLite; system design, unit and integration testing, GitHub Actions CI/CD, Docker, Cloudflare Workers.

Education: B.E. Computer Science, D. Y. Patil College of Engineering, 2021. Diploma in Computer Science, D. Y. Patil Polytechnic, 2018. Coding Ninjas certifications in front-end architecture, React production development and advanced backend systems.

Looking for: Full Stack AI Developer roles (MERN with LLM, RAG and agents) in Hyderabad, Pune, Mumbai, Bangalore or remote India. Freelance and fixed-price builds are also possible; see https://yk.streamerosai.com/hire/.

---

# Sparity: RAG, MCP and AI tooling work

URL: https://yk.streamerosai.com/projects/
Summary: What Yaseen built at Sparity: a local hybrid RAG system with measured retrieval quality, an MCP server with 20 tools, and an AI pull-request review service.

At Sparity (2025 to now) Yaseen built the AI tooling that lets engineers and AI assistants work on a large web-app codebase without reading all of it.

Hybrid RAG system. A local retrieval system over a web application's source code, documentation and lint rules. It keeps three vector collections (docs, rules, code) in Chroma, with embeddings from nomic-embed-text through Ollama so nothing leaves the machine. Retrieval is hybrid: dense search plus BM25, fused with reciprocal rank fusion, then reranked by a cross-encoder (FlashRank, ms-marco MiniLM). Code is split with language-aware splitters, and ingestion is incremental: a SHA-256 manifest means only changed files are re-embedded and deleted files lose their chunks. An evaluation harness runs a golden query set and reports Recall@k and MRR; the baseline was Recall@5 of 0.95 and MRR of 0.83, against thresholds of 0.75 and 0.55, and the harness exits non-zero when quality drops below them. A rule of the project is that only steady-state knowledge is indexed, never task lists, status reports or session logs.

MCP server. The retrieval system is exposed to Claude Code over the Model Context Protocol with 20 tools: search tools (general, smart, docs, code, rules), structural lookups (list features, components, hooks, state slices, APIs and routes, outline a file, find a symbol, find its usages), operational tools (index stats, guidance, ingest status, regenerate docs), and GitLab merge-request tools (list open requests, read review comments, resolve threads). It is designed to be copied into a project folder: it detects its parent folder as the project root, generates structural docs without calling an LLM, and ingests at startup. Incremental ingest with no changes takes about 3 seconds, a warm query 200 to 400 milliseconds, and a full rebuild of 500 files 3 to 5 minutes.

AI pull-request review service. A backend that reviews GitLab merge requests through a webhook, with Azure AD (MSAL) sign-in: the front end gets an Azure ID token, the API validates it against the Azure keys (RS256), and issues its own signed JWT for role-checked scan, audit and analytics routes. The webhook stays on a separate shared-secret check.

What this shows: Yaseen treats retrieval as an engineering problem with measured quality, not a demo, and he builds the surrounding tooling (evals, incremental indexing, access control) that makes AI usable on a real codebase.

---

# FitRank: typed AI decisions for staffing

URL: https://yk.streamerosai.com/products/fitrank/
Summary: A small model, distilled from a larger teacher, that ranks people for tasks and leaves every final decision to a manager.

FitRank began as a resource-to-task matching pilot at Sparity, requested by a manager and demonstrated to managers with dummy data only. It returns a probability for every option so a person can see why, and a manager makes every final call. The model is a 23-million-parameter MiniLM distilled from a 9-billion-parameter teacher, served on CPU. Against a rules-only baseline on 35 held-out tasks, hit@5 was 94% versus 91%, while hit@1 was 54% versus 74%, which is why the system shortlists rather than assigns. Backend test coverage is 93.5%. Stack: FastAPI, PostgreSQL with pgvector, PyTorch, React, Docker, GitHub Actions CI. Live at https://fitrank.streamerosai.com.

---

# SpotAI: AI gym app for Indian gyms

URL: https://yk.streamerosai.com/products/spotai/
Summary: One app for gym members, trainers and owners, with squat form checks that run on the phone and never upload video frames.

SpotAI is a Vue 3 and Capacitor app (Android and iOS, plus a web demo) with a NestJS and PostgreSQL backend. Members get an AI coach that checks squat form with MediaPipe on the phone: frames never leave the device, and only rep counts and flags reach the API. Staff and owners use a console inside the same app for front desk, moderation, dues and alerts. Privacy and safety decisions are part of the design: row-level security per gym, tested with two gyms side by side; a model gateway with redaction, consent, guards and fallback; consent snapshots; bystander pixelation; retention jobs; and a face check-in backbone with encrypted templates and liveness, running in shadow mode until thresholds are set. It supports seven languages, passes accessibility checks (axe, WCAG AA contrast), has WhatsApp and push reminders with quiet hours, and ships production Docker images. Testing includes well over a hundred API tests, Python vision tests, parity files that keep the TypeScript and Python squat analysis in agreement, and Playwright end-to-end tests. Open decisions he documents honestly: who pays, handling of under-18 members under India's DPDP law. Download and case study: https://spotai.streamerosai.com and https://yk.streamerosai.com/products/spotai/.

---

# streamerOS: Rust and Tauri streaming cockpit

URL: https://yk.streamerosai.com/products/
Summary: A desktop app that reads chat on the streamer's own PC and switches OBS scenes when chat spikes, with no account and no cloud.

streamerOS is built with Rust and Tauri 2 and a React front end. A Rust evaluator is the only rule-execution engine: the React side is an editor and visualiser, which keeps automation fast and deterministic. A node-graph editor (React Flow) defines rules, the Rust backend watches chat velocity and sends OBS WebSocket commands to switch scenes. Other parts include an engagement dashboard, foreground-window detection, a mood engine that drives the interface, and a compliance speech-recognition feature with voice-activity gating. The Rust code has 306 tests, reviewed and tested by Yaseen, and the app was built with Claude Code. The marketing site (Next.js) and its support agent (Hono on Cloudflare Workers, Upstash Vector, Gemini) are public at https://streamerosai.com; the app repository is private.

---

# Esports Hub: tournament platform for organisers

URL: https://esports.streamerosai.com
Summary: Sign-ups, brackets, points tables, ID cards, live TV screens and gate check-in, with 14 free tools and 100 scheduled how-to guides.

Esports Hub (https://esports.streamerosai.com) is a tournament platform for college and community organisers, built with Next.js 14, React and TypeScript, a Hono API on Cloudflare Workers with D1 (SQL), and tested with Playwright: about 640 browser tests on desktop and phone and about 600 API tests run on every push. It covers registration forms, brackets (single and double elimination, round robin, groups), points tables, schedules, ID cards with in-browser QR reading, certificates, live display screens, and gate check-in. Sign-in uses Google, verified against Google's public keys, with email confirmation before first use, and organisations with roles. The site also carries 100 scheduled how-to guides for organisers, released three a week from 16 November 2026 by a daily build with no API key: each guide is held to written checks (length, sourced facts only, no unsourced statistics, links only to earlier pages).

---

# Analytics dashboard, SEO and content pipelines

URL: https://yk.streamerosai.com/products/analytics-dashboard/
Summary: A public dashboard over Google Analytics and Search Console for five sites, plus the scheduled content and posting automation behind Yaseen's sites.

Analytics dashboard (https://analytics.streamerosai.com). Next.js on GitHub Pages with a Cloudflare Worker and KV store. It shows Google Analytics 4 and Search Console data for all of Yaseen's sites. Because Google's APIs have quotas, all data is saved: the page shows the saved copy, and only a Refresh button on a screen calls Google, per source and per site, then updates the saved copy. Features include a "not indexed" list (counting only pages Google actually checked, not intentional noindex pages), closest-to-page-one searches, a bot check using engagement rates, change notes, notifications with per-item read state, and a mobile layout. It has 105 automated tests.

Scheduled content. Posts are written ahead in Claude Code sessions with sourced facts, given future dates, and released by a daily deploy; no API key runs in CI. A lint checks voice rules and every number against a sources file, and caps cadence at two posts a week. This replaced an earlier Claude-API publishing job that failed.

Other sites and automation. Four small utility sites (tools, calculators, images, math) share one component package; the math site ran a four-week hreflang experiment with a Chinese page rather than IP-based redirects. A LinkedIn posting bot runs on a fixed Tuesday to Thursday cycle. The portfolio itself is a Next.js static export with a grounded RAG assistant and a public MCP server (this one) on Cloudflare Workers that refuses to answer below a similarity threshold.

---

# Path Saathi LMS and client delivery

URL: https://yk.streamerosai.com/projects/
Summary: A client learning platform live one day after the brief, and how Yaseen delivers client work.

Path Saathi LMS is a client project: a free vocational-skilling platform built with Next.js, React, Tailwind CSS and TypeScript. The brief and an MVP sketch arrived on a Monday; authentication, course delivery for the client's videos and PDFs, and a self-paced flow were live on the dev environment the next day. Yaseen's approach on client work is vertical slices that run end to end, automated tests before each push, and plain written explanations of choices for non-technical stakeholders.

---

# How Yaseen works with AI coding tools

URL: https://yk.streamerosai.com/about
Summary: Building with Claude Code while owning the review, tests and decisions.

Yaseen builds much of his work with Claude Code and treats the model as a fast collaborator, not an owner. He writes the constraints (tests, honesty rules, what must never be automated), reviews the output, and keeps humans in the loop for anything that commits or spends: in FitRank a manager makes every decision, in SpotAI frames never leave the phone, in the finance agent Sable only a person commits a change, and in his scheduled-content pipeline a person reviews each batch before it is released. His projects favour real artifacts over claims: live links, public case studies, test counts, and honest limits such as FitRank's weaker top-1 accuracy.
