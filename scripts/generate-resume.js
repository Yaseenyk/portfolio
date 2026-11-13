// scripts/generate-resume.js
//
// Main résumé: two pages, single column, plain headings, aimed at "Senior Full-Stack AI Engineer (MERN)". Page 1 is what a recruiter
// reads in seven seconds (title, summary, skills, the three jobs); page 2 is proof (projects) and education.
//
// Every fact here is on the previous résumé (verified against the repo, the live site and GitHub on 2026-10-21) or on the live site.
// Nothing new is claimed. Private repositories get no "Code" link, and numbers that could not be verified are left out.
// The skills order follows what 71 live MERN-plus-AI postings asked for most on 2026-11-13 (system design, REST, React, testing,
// TypeScript, Python, CI/CD), but only skills that are true are listed: no cloud-provider, code-review or mentoring claims.
// A one-page plain version for application portals is scripts/generate-resume-ats.js.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SITE = 'https://yk.streamerosai.com';
const GH = 'https://github.com/Yaseenyk';
const a = (url, label) => `<a href="${url}">${label}</a>`;

const SKILLS = [
  ['MERN and web', 'MongoDB, Express, React, Node.js, TypeScript, JavaScript (ES2023), Next.js, Redux Toolkit, Zustand, REST APIs, WebSockets, JWT auth, Tailwind CSS, HTML and CSS'],
  ['AI engineering', 'LLM integration (OpenAI, Gemini, Claude APIs), RAG, embeddings and vector search (pgvector, Vectorize, Upstash Vector), function calling, agents, MCP servers, prompt engineering, LLM evals, fine-tuning and distillation (PyTorch), Ollama'],
  ['Backend and data', 'Python and FastAPI, NestJS, Java and Spring Boot, ASP.NET, PostgreSQL, SQL Server, Redis, SQLite, Firestore'],
  ['Delivery', 'System design, unit and integration testing, Git, GitHub Actions CI/CD, Docker, Cloudflare Workers, Agile delivery'],
];

const JOBS = [
  {
    title: 'Senior Software Developer', org: 'Sparity', meta: 'Hyderabad · Hybrid', dates: '06/2025 – Present',
    bullets: [
      'Own the LLM and agent layer of production MERN systems end to end: architecture, orchestration and deployment.',
      'Build agentic RAG services with schema-validated outputs, guardrails and cost-aware routing between models; build MCP servers.',
    ],
    stack: 'Node.js, React, TypeScript, MongoDB, LLM APIs, RAG, MCP',
  },
  {
    title: 'Full Stack Developer', org: 'MSA Software', meta: 'Remote', dates: '01/2023 – 05/2025',
    bullets: [
      'Cut dashboard response times 1.5 to 2x by profiling slow MongoDB aggregation pipelines, adding a caching layer and lazy-loading heavy panels.',
      'Moved the team’s legacy JavaScript to TypeScript and Next.js, removing a class of type-related production bugs.',
      'Migrated shared state from hand-rolled Redux to Redux Toolkit slices.',
    ],
    stack: 'React, Node.js, TypeScript, Next.js, MongoDB, Redux Toolkit',
  },
  {
    title: 'Software Developer (SDE 1)', org: 'Manorama Infosolutions', meta: 'Healthcare software · Remote', dates: '09/2021 – 01/2023',
    bullets: [
      'Built REST routing layers for hospital information systems on ASP.NET and React; 2x payload throughput on the hot paths.',
      'Moved tangled request handling into MVC and hardened it for concurrent user sessions.',
    ],
    stack: 'ASP.NET, MVC, React, REST APIs',
  },
];

// Projects are chosen for a full-stack MERN-and-AI hire and ordered by how much each one proves: a large full-stack product,
// the two AI systems, the MERN performance result, a complete product with tests, and a client delivery.
const PROJECTS = [
  {
    name: 'Esports Hub', what: 'Tournament platform for organisers, built with Claude Code', stack: 'Next.js 14, React, TypeScript, Hono on Cloudflare Workers, D1 (SQL), Playwright',
    text: 'Sign-ups, brackets, points tables, ID cards, live TV screens and gate check-in, with 14 free tools. Google sign-in verified against Google’s public keys, email confirmation before first use, and organisations with roles. About 640 browser tests on desktop and phone and about 600 API tests, run on every push.',
    links: [a('https://esports.streamerosai.com', 'Live'), a(`${GH}/esports-frontend`, 'Frontend'), a(`${GH}/esports-backend`, 'API')],
  },
  {
    name: 'Portfolio Concierge', what: 'Grounded RAG API and public MCP server', stack: 'Cloudflare Workers, Vectorize, Workers AI, MCP, TypeScript',
    text: 'Answers questions about my work from a vector index of this site and refuses to answer below a similarity threshold instead of guessing. A public MCP server exposes search, products and availability tools, so a recruiter can interview this résumé from inside Claude. The index rebuilds automatically after every deploy.',
    links: [a(`${SITE}/#rag-concierge`, 'Try it'), a(`${GH}/portfolio/tree/main/worker`, 'Code')],
  },
  {
    name: 'IntegrateX', what: 'Workflow automation engine', stack: 'React Flow, Zustand, TypeScript, MongoDB',
    text: 'A node-based workflow canvas. The first design stored the React Flow render model; a custom serialization adapter separates the view from the stored record and cut payloads by 94%, round-trip lossless. Runs live in the browser.',
    links: [a(`${SITE}/sandbox/`, 'Live sandbox'), a(`${SITE}/blog/94-percent-payload-reduction-react-flow/`, 'Write-up')],
  },
  {
    name: 'FitRank', what: 'Typed AI decisions for staffing', stack: 'FastAPI, PostgreSQL and pgvector, PyTorch, React, Docker',
    text: 'A 23M-parameter MiniLM model, distilled from a 9B teacher, returns a probability for every option; a manager makes every final call. Against a rules-only baseline on 35 held-out tasks: hit@5 94% vs 91%, and hit@1 54% vs 74%, which is why it shortlists rather than assigns. 93.5% backend test coverage, GitHub Actions CI.',
    links: [a('https://fitrank.streamerosai.com', 'Live'), a(`${SITE}/products/fitrank/`, 'Case study')],
  },
  {
    name: 'SpotAI', what: 'AI gym app for Indian gyms, members and owners in one app', stack: 'Vue 3, Capacitor, NestJS, PostgreSQL, MediaPipe, NATS',
    text: 'Squat form check runs on the phone: frames never leave it, only rep counts and flags reach the API. Row-level security per gym, tested with two gyms side by side. 190 API tests and browser tests with accessibility checks on every screen.',
    links: [a('https://spotai.streamerosai.com/#download', 'Android and iPhone apps'), a(`${SITE}/products/spotai/`, 'Case study')],
  },
  {
    name: 'Path Saathi LMS', what: 'Client project, free vocational-skilling platform', stack: 'Next.js, React, Tailwind CSS, TypeScript',
    text: 'The brief and an MVP sketch arrived on a Monday; auth, course delivery for the client’s videos and PDFs, and a self-paced flow were live on the dev environment the next day.',
    links: [a('https://devlms.pathsaathi.in/login', 'Live (dev)')],
  },
];

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Yaseen Khatib - Senior Full-Stack AI Engineer (MERN)</title>
<style>
  @page { size: A4; margin: 12mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Arial, Helvetica, sans-serif; font-size: 10.1pt; line-height: 1.4; color: #15171c; margin: 0; }
  a { color: #0b5d70; text-decoration: none; }
  h1 { font-size: 22pt; line-height: 1.05; margin: 0; letter-spacing: 0.2px; color: #0b2f3a; }
  .title { font-size: 11pt; font-weight: 700; color: #0b5d70; margin: 3px 0 4px; }
  .contact { font-size: 9.2pt; color: #2a2f38; line-height: 1.5; }
  .contact span { white-space: nowrap; }
  .open { margin-top: 5px; font-size: 9.2pt; color: #2a2f38; }
  h2 { font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #0b2f3a; border-bottom: 1.2px solid #0b5d70; margin: 13px 0 6px; padding-bottom: 2px; }
  p { margin: 0 0 4px; }
  .skill { margin: 0 0 3px; }
  .skill b { color: #0b2f3a; }
  .job { margin-top: 10px; page-break-inside: avoid; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .row .t { font-size: 10.9pt; font-weight: 700; color: #111; }
  .row .t i { font-style: normal; font-weight: 600; color: #0b5d70; }
  .dates { white-space: nowrap; font-size: 9.4pt; color: #2a2f38; }
  .meta { font-size: 9.2pt; color: #4a505b; margin-top: 0; }
  ul { margin: 3px 0 2px; padding-left: 15px; }
  li { margin-bottom: 2px; }
  .stack { font-size: 9.2pt; color: #4a505b; }
  .stack b { color: #2a2f38; }
  .proj { margin-top: 9px; page-break-inside: avoid; }
  .proj .t { font-size: 10.6pt; font-weight: 700; color: #111; }
  .proj .t span { font-weight: 500; color: #3b414c; }
  .links { font-size: 9.2pt; white-space: nowrap; }
  .more { margin-top: 6px; }
  .page2 { break-before: page; }
</style></head><body>

<h1>Yaseen Khatib</h1>
<div class="title">Senior Full-Stack AI Engineer · MERN (MongoDB, Express, React, Node.js) · LLM, RAG and agents</div>
<div class="contact">
  <span>Hyderabad, India</span> · <span>${a('mailto:yaseenkhatib04@gmail.com', 'yaseenkhatib04@gmail.com')}</span> · <span>${a('tel:+918208335028', '+91 8208335028')}</span> ·
  <span>${a('https://www.linkedin.com/in/yaseen-yk', 'linkedin.com/in/yaseen-yk')}</span> · <span>${a(GH, 'github.com/Yaseenyk')}</span> · <span>${a(SITE, 'yk.streamerosai.com')}</span>
</div>
<div class="open"><b>Open to:</b> senior full-stack, GenAI and forward-deployed roles · remote, hybrid or Hyderabad · fixed-price builds</div>

<h2>Summary</h2>
<p>Senior full-stack developer on the MERN stack with TypeScript and Next.js, five years shipping production web systems: hospital information systems, analytics dashboards and, since 2025, the AI layer of production MERN systems at Sparity. I build the parts around the model that make AI usable: RAG pipelines, function-calling agents where a person approves every change, MCP servers, evals, and cost-aware routing between models. Cut dashboard response times 1.5 to 2x by profiling MongoDB aggregation pipelines; moved a team from JavaScript to TypeScript and Next.js. Six products shipped solo, each live and open, and a client learning platform live one day after the brief.</p>

<h2>Skills</h2>
${SKILLS.map(([k, v]) => `<p class="skill"><b>${k}:</b> ${v}</p>`).join('\n')}

<h2>Experience</h2>
${JOBS.map((j) => `<div class="job">
  <div class="row"><div class="t">${j.title}, <i>${j.org}</i></div><div class="dates">${j.dates}</div></div>
  <div class="meta">${j.meta}</div>
  <ul>${j.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
  <div class="stack"><b>Stack:</b> ${j.stack}</div>
</div>`).join('\n')}

<div class="page2"></div>
<h2 style="margin-top:0">Selected projects</h2>
<p style="font-size:9.2pt;color:#4a505b">Built and shipped solo unless marked client. Links checked on 14 Nov 2026.</p>
${PROJECTS.map((p) => `<div class="proj">
  <div class="row"><div class="t">${p.name} <span>· ${p.what}</span></div><div class="links">${p.links.join(' · ')}</div></div>
  <p style="margin:1px 0 1px">${p.text}</p>
  <div class="stack"><b>Stack:</b> ${p.stack}</div>
</div>`).join('\n')}
<p class="more"><b>Also:</b> Sable, a local-first AI finance agent in React Native where the model proposes and only a person commits (${a(`${SITE}/products/sable/`, 'case study')}). streamerOS, a Rust and Tauri 2 desktop app for streamers built with Claude Code, 306 Rust tests (${a('https://streamerosai.com', 'site')}). ShelfSight AI, retail vision on FastAPI and YOLOv8, 650 tests (${a(`${GH}/Shelfsight-AI-real-time-planogram-and-inventory-intelligence-be`, 'code')}). AISA, a student platform rebuilt from one 4,019-line HTML file into Next.js and Spring Boot (${a('https://yaseenyk.github.io/SIT-FE/', 'live')}).</p>

<h2>Open source and writing</h2>
<p>Public code at ${a(GH, 'github.com/Yaseenyk')}, including this portfolio, its RAG and MCP worker and the content pipelines. Engineering write-ups at ${a(`${SITE}/blog/`, 'yk.streamerosai.com/blog')} and ${a('https://dev.to/yaseenyk04', 'dev.to/yaseenyk04')}.</p>

<h2>Education</h2>
<p><b>B.E. Computer Science</b>, D. Y. Patil College of Engineering, 2021 · <b>Diploma, Computer Science</b>, D. Y. Patil Polytechnic, 2018<br>
Certifications (Coding Ninjas): Front End Architecture, React Production Development, Advanced Backend Systems</p>
</body></html>`;

(async () => {
  try {
    console.log('Generating 2-page résumé…');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const out = path.join(__dirname, '../public/Resume.pdf');
    await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
    await browser.close();
    console.log('Success! Resume generated at: ' + out + ' (' + fs.statSync(out).size + ' bytes)');
  } catch (error) {
    console.error('Error generating resume:', error);
    process.exit(1);
  }
})();
