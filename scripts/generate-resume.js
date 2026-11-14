// scripts/generate-resume.js
//
// Main résumé: two pages, single column, plain headings, aimed at "Full Stack AI Developer (MERN, LLM, RAG, agents)". Keywords and
// results are bold so the page can be skimmed (see kw() below); the text stays real text, in reading order, so portals can parse it. Page 1 is what a recruiter
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

// Bold the words a hiring manager scans for, and the numbers that prove the work. Longest phrases first so they win over their parts.
const KEYWORDS = [
  'MERN', 'Full Stack AI Developer', 'agentic RAG', 'RAG pipelines', 'RAG', 'LLM and agent layer', 'LLM integration', 'LLM', 'function-calling agents', 'agents', 'agent', 'MCP servers', 'MCP',
  'evals', 'cost-aware routing', 'guardrails', 'schema-validated outputs', 'embeddings', 'vector search', 'pgvector', 'fine-tuning', 'distillation', 'PyTorch',
  'TypeScript', 'Next.js', 'Node.js', 'React', 'MongoDB', 'Redux Toolkit', 'FastAPI', 'NestJS', 'PostgreSQL', 'Cloudflare Workers', 'Hono', 'Rust', 'Tauri 2', 'Vue 3', 'Docker', 'GitHub Actions', 'CI/CD',
  'REST', 'JWT', 'row-level security', 'system design',
  '1.5 to 2x', '2x', '94%', '93.5%', '23M-parameter', 'hit@5', '306 Rust tests', '190 API tests', '640 browser tests', '600 API tests', 'next day', 'one day after the brief',
];
const KW_RE = new RegExp('(?<![A-Za-z0-9])(' + KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')).join('|') + ')(?![A-Za-z0-9])', 'g');
const kw = (t) => t.replace(KW_RE, '<b>$1</b>');

const SKILLS = [
  ['MERN and web', '<b>MongoDB, Express, React, Node.js, TypeScript</b>, JavaScript (ES2023), <b>Next.js</b>, Redux Toolkit, Zustand, <b>REST APIs</b>, WebSockets, JWT auth, Tailwind CSS, HTML and CSS'],
  ['AI engineering', '<b>LLM integration</b> (OpenAI, Gemini, Claude APIs), <b>RAG</b>, <b>embeddings and vector search</b> (pgvector, Vectorize, Upstash Vector), <b>function calling, agents, MCP servers</b>, prompt engineering, <b>LLM evals</b>, fine-tuning and distillation (PyTorch), Ollama'],
  ['Backend and data', '<b>Python and FastAPI</b>, NestJS, Java and Spring Boot, ASP.NET, <b>PostgreSQL</b>, SQL Server, Redis, SQLite, Firestore'],
  ['Delivery', '<b>System design</b>, unit and integration testing, Git, <b>GitHub Actions CI/CD</b>, <b>Docker</b>, <b>Cloudflare Workers</b>, Agile delivery'],
];

const JOBS = [
  {
    title: 'Senior Software Developer', org: 'Sparity', meta: 'Hyderabad · Hybrid', dates: '06/2025 – Present',
    bullets: [
      'Built a local hybrid RAG system over the team’s web-app codebase and docs: dense plus BM25 retrieval, rank fusion and a cross-encoder reranker, incremental ingestion. Recall@5 0.95 and MRR 0.83 on a golden query set, with an eval harness that fails the build below its thresholds.',
      'Exposed it to Claude Code through an MCP server with 20 retrieval and code-lookup tools, so engineers get project context without reading whole repos; packaged so any team can vendor it into their own project.',
      'Built an AI pull-request review service: GitLab webhooks, Azure AD (MSAL) sign-in, internal JWTs and role-checked APIs. Led an HR resource-to-task matching pilot (FitRank) from proposal to a manager demo.',
    ],
    stack: 'Python, Node.js, TypeScript, React, FastAPI, Chroma, Ollama, MCP, GitLab',
  },
  {
    title: 'Full Stack Developer', org: 'MSA Software', meta: 'Remote', dates: '01/2023 – 05/2025',
    bullets: [
      'Made dashboards 1.5 to 2x faster by profiling slow MongoDB aggregation pipelines, adding a caching layer and lazy-loading heavy panels.',
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
// then the flagship products (SpotAI, FitRank, streamerOS) and a client delivery. Concierge and IntegrateX are in the "Also" line.
const PROJECTS = [
  {
    name: 'Esports Hub', what: 'Tournament platform for organisers, built with Claude Code', stack: 'Next.js 14, React, TypeScript, Hono on Cloudflare Workers, D1 (SQL), Playwright',
    text: 'Sign-ups, brackets, points tables, ID cards, live TV screens and gate check-in, with 14 free tools. Google sign-in verified against Google’s public keys, email confirmation, and organisations with roles. About 640 browser tests and about 600 API tests run on every push.',
    links: [a('https://esports.streamerosai.com', 'Live'), a(`${GH}/esports-frontend`, 'Frontend'), a(`${GH}/esports-backend`, 'API')],
  },
  {
    name: 'SpotAI', what: 'AI gym app for Indian gyms, members and owners in one app', stack: 'Vue 3, Capacitor, NestJS, PostgreSQL, MediaPipe, NATS',
    text: 'Squat form check runs on the phone: frames never leave it, only rep counts and flags reach the API. Row-level security per gym, tested with two gyms side by side. 190 API tests and accessibility checks on every screen.',
    links: [a('https://spotai.streamerosai.com/#download', 'Android and iPhone apps'), a(`${SITE}/products/spotai/`, 'Case study')],
  },
  {
    name: 'FitRank', what: 'Typed AI decisions for staffing', stack: 'FastAPI, PostgreSQL and pgvector, PyTorch, React, Docker',
    text: 'A 23M-parameter MiniLM model, distilled from a 9B teacher, returns a probability for every option; a manager makes every final call. Against a rules-only baseline on 35 held-out tasks: hit@5 94% vs 91%, and hit@1 54% vs 74%, which is why it shortlists rather than assigns. 93.5% backend test coverage, GitHub Actions CI.',
    links: [a('https://fitrank.streamerosai.com', 'Live'), a(`${SITE}/products/fitrank/`, 'Case study')],
  },
  {
    name: 'streamerOS', what: 'Rust and Tauri 2 streaming cockpit, built with Claude Code', stack: 'Rust, Tauri 2, OBS WebSocket, Next.js, Hono, Upstash Vector',
    text: 'Reads chat on the streamer’s own PC and switches OBS scenes when chat spikes, with no account and no cloud. 306 Rust tests, reviewed and tested by me. The Next.js site and its support agent (Hono on Cloudflare Workers, Upstash Vector, Gemini) are public; the app repository is private.',
    links: [a('https://streamerosai.com', 'Website'), a(`${GH}/streamer-os-website`, 'Site and agent source')],
  },
  {
    name: 'Path Saathi LMS', what: 'Client project, free vocational-skilling platform', stack: 'Next.js, React, Tailwind CSS, TypeScript',
    text: 'The brief and an MVP sketch arrived on a Monday; auth, course delivery for the client’s videos and PDFs, and a self-paced flow were live on the dev environment the next day.',
    links: [a('https://devlms.pathsaathi.in/login', 'Live (dev)')],
  },
];

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Yaseen Khatib - Full Stack AI Developer (MERN, LLM, RAG, Agents)</title>
<style>
  @page { size: A4; margin: 11mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Arial, Helvetica, sans-serif; font-size: 9.8pt; line-height: 1.36; color: #15171c; margin: 0; }
  a { color: #0b5d70; text-decoration: none; }
  .bar { height: 5px; margin: -2mm 0 9px; background: linear-gradient(90deg, #0b5d70, #14a3c7 60%, #7c5cff); border-radius: 3px; }
  h1 { font-size: 24pt; line-height: 1.05; margin: 0; letter-spacing: 0.2px; color: #0b2f3a; }
  .title { font-size: 12.2pt; font-weight: 700; color: #0b5d70; margin: 4px 0 5px; }
  .strip { margin-top: 6px; padding: 4px 8px; background: #eef6f8; border-left: 3px solid #0b5d70; font-size: 9.2pt; color: #0b2f3a; }
  .strip i { font-style: normal; color: #7c8a92; padding: 0 2px; }
  b { font-weight: 700; color: #0b2f3a; }
  .contact { font-size: 9.2pt; color: #2a2f38; line-height: 1.5; }
  .contact span { white-space: nowrap; }
  .open { margin-top: 5px; font-size: 9.2pt; color: #2a2f38; }
  h2 { font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; color: #0b5d70; border-bottom: 1.4px solid #0b5d70; margin: 11px 0 5px; padding-bottom: 2px; }
  p { margin: 0 0 4px; }
  .skill { margin: 0 0 3px; }
  .skill .k { font-weight: 700; color: #0b5d70; }
  .job { margin-top: 8px; page-break-inside: avoid; }
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
<div class="bar"></div>
<h1>Yaseen Khatib</h1>
<div class="title">Full Stack AI Developer · MERN · LLM apps, RAG and AI agents</div>
<div class="contact">
  <span>Hyderabad, India</span> · <span>${a('mailto:yaseenkhatib04@gmail.com', 'yaseenkhatib04@gmail.com')}</span> · <span>${a('tel:+918208335028', '+91 8208335028')}</span> ·
  <span>${a('https://www.linkedin.com/in/yaseen-yk', 'linkedin.com/in/yaseen-yk')}</span> · <span>${a(GH, 'github.com/Yaseenyk')}</span> · <span>${a(SITE, 'yk.streamerosai.com')}</span>
</div>
<div class="strip"><b>Core:</b> MERN <i>|</i> TypeScript <i>|</i> Next.js <i>|</i> LLM apps <i>|</i> RAG <i>|</i> AI agents <i>|</i> MCP <i>|</i> Python and FastAPI <i>|</i> System design <i>|</i> CI/CD</div>
<div class="open"><b>Open to:</b> Full Stack AI Developer roles · Hyderabad, Pune, Mumbai, Bangalore or remote India</div>

<h2>Summary</h2>
<p>${kw('Full Stack AI Developer with five years shipping production web systems on the MERN stack with TypeScript and Next.js: hospital information systems, analytics dashboards and, since 2025, the AI tooling layer at Sparity: a hybrid RAG system with measured retrieval quality, an MCP server and an AI code-review service. I build the parts around the model that make AI usable: RAG pipelines, agents where a person approves every change, MCP servers, evals, and cost-aware routing between models. Made dashboards 1.5 to 2x faster by profiling MongoDB aggregation pipelines; moved a team from JavaScript to TypeScript and Next.js. Shipped several products solo, each live with a public link or case study, and a client learning platform live one day after the brief.')}</p>

<h2>Skills</h2>
${SKILLS.map(([k, v]) => `<p class="skill"><span class="k">${k}:</span> ${v}</p>`).join('\n')}

<h2>Experience</h2>
${JOBS.map((j) => `<div class="job">
  <div class="row"><div class="t">${j.title}, <i>${j.org}</i></div><div class="dates">${j.dates}</div></div>
  <div class="meta">${j.meta}</div>
  <ul>${j.bullets.map((b) => `<li>${kw(b)}</li>`).join('')}</ul>
  <div class="stack"><b>Stack:</b> ${j.stack}</div>
</div>`).join('\n')}

<div class="page2"></div>
<h2 style="margin-top:0">Selected projects</h2>
<p style="font-size:9.2pt;color:#4a505b">Built and shipped solo unless marked client. Links checked on 14 Nov 2026.</p>
${PROJECTS.map((p) => `<div class="proj">
  <div class="row"><div class="t">${p.name} <span>· ${p.what}</span></div><div class="links">${p.links.join(' · ')}</div></div>
  <p style="margin:1px 0 1px">${kw(p.text)}</p>
  <div class="stack"><b>Stack:</b> ${p.stack}</div>
</div>`).join('\n')}
<p class="more"><b>Also:</b> Portfolio Concierge, a grounded RAG API and public <b>MCP</b> server that refuses to answer below a similarity threshold (${a(`${SITE}/#rag-concierge`, 'try it')}) · IntegrateX, a React Flow and MongoDB workflow engine (${a(`${SITE}/sandbox/`, 'sandbox')}) · Sable, a local-first AI finance agent where only a person commits (${a(`${SITE}/products/sable/`, 'case study')}) · ShelfSight AI, FastAPI and YOLOv8, 650 tests (${a(`${GH}/Shelfsight-AI-real-time-planogram-and-inventory-intelligence-be`, 'code')}). All projects: ${a(`${SITE}/projects/`, 'yk.streamerosai.com/projects')}.</p>

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
