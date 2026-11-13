// scripts/generate-resume-ats.js
//
// A plain, one-page, single-column résumé for application portals (applicant tracking systems) and for a recruiter's seven-second
// screen: name, title and company, dates, in the order they are read. Every fact below is already on the designed résumé
// (scripts/generate-resume.js); nothing new is claimed here. Output: public/Resume-ATS.pdf.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Yaseen Khatib - Senior Full-Stack AI Engineer</title>
<style>
  @page { size: A4; margin: 11mm 13mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 9.4pt; line-height: 1.32; color: #111; margin: 0; }
  h1 { font-size: 19pt; margin: 0; letter-spacing: 0.2px; }
  .title { font-size: 11pt; font-weight: 700; margin: 2px 0 3px; }
  .contact { font-size: 9.2pt; color: #222; margin-bottom: 7px; }
  h2 { font-size: 9.6pt; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #111; margin: 8px 0 4px; padding-bottom: 1px; }
  p { margin: 0 0 4px; }
  .row { display: flex; justify-content: space-between; gap: 12px; margin-top: 5px; }
  .row b { font-size: 10.2pt; }
  .dates { white-space: nowrap; }
  ul { margin: 2px 0 3px; padding-left: 15px; }
  li { margin-bottom: 1.5px; }
  .muted { color: #333; }
</style></head><body>
<h1>Yaseen Khatib</h1>
<div class="title">Senior Full-Stack AI Engineer · React, Node.js, TypeScript · LLM and RAG systems in production</div>
<div class="contact">Hyderabad, India (remote, hybrid or on-site) · yaseenkhatib04@gmail.com · +91 8208335028 · linkedin.com/in/yaseen-yk · github.com/Yaseenyk · yk.streamerosai.com</div>

<h2>Summary</h2>
<p>Senior full-stack engineer with 5 years shipping production web systems in React, Next.js, Node.js, TypeScript and MongoDB or PostgreSQL. Since 2025 I own the LLM and agent layer of production MERN systems at Sparity: RAG pipelines, function-calling agents and MCP servers. Cut dashboard response times 1.5 to 2x by profiling MongoDB aggregations; moved a team from JavaScript to TypeScript and Next.js. I own a system from database schema to deployed UI, including a client learning platform that was live one day after the brief. Open to senior full-stack, GenAI and forward-deployed engineering roles.</p>

<h2>Experience</h2>
<div class="row"><b>Senior Software Developer, Sparity</b><span class="dates">06/2025 – Present</span></div>
<div class="muted">Hyderabad · Hybrid</div>
<ul>
  <li>Own the LLM and agentic layer of production MERN systems end to end: architecture, orchestration and deployment.</li>
  <li>Ship agentic RAG services with schema-validated outputs, guardrails and cost-aware routing between models.</li>
</ul>
<div class="row"><b>Full Stack Developer, MSA Software</b><span class="dates">01/2023 – 05/2025</span></div>
<div class="muted">Remote</div>
<ul>
  <li>Cut dashboard response times 1.5 to 2x by profiling slow MongoDB aggregation pipelines, adding a caching layer and lazy-loading heavy panels.</li>
  <li>Moved the team's legacy JavaScript to TypeScript and Next.js, removing a class of type-related production bugs.</li>
  <li>Migrated shared state from hand-rolled Redux to Redux Toolkit slices.</li>
</ul>
<div class="row"><b>Software Developer (SDE 1), Manorama Infosolutions</b><span class="dates">09/2021 – 01/2023</span></div>
<div class="muted">Healthcare software · Remote</div>
<ul>
  <li>Built REST routing layers for hospital information systems on ASP.NET and React; 2x payload throughput on the hot paths.</li>
  <li>Moved tangled request handling into MVC and hardened it for concurrent user sessions.</li>
</ul>

<h2>Selected projects (each live; links on yk.streamerosai.com/products)</h2>
<ul>
  <li><b>Esports Hub</b>, tournament platform built with Claude Code (Next.js 14, React, TypeScript, Hono on Cloudflare Workers, D1): sign-ups, brackets, ID cards and live screens; Google sign-in and email confirmation; about 640 browser tests and 600 API tests.</li>
  <li><b>SpotAI</b>, AI gym app for Indian gyms (Vue 3, Capacitor, NestJS, PostgreSQL): squat form check runs on the phone and never uploads a frame; row-level security per gym; 190 API tests.</li>
  <li><b>FitRank</b>, typed AI decisions for staffing (FastAPI, PostgreSQL + pgvector, PyTorch): a 23M-parameter MiniLM model distilled from a 9B teacher, beats a rules-only baseline on hit@5 (94% vs 91%), served on CPU; 93.5% backend test coverage; Docker and GitHub Actions CI.</li>
  <li><b>streamerOS</b>, Rust and Tauri 2 desktop app for streamers, built with Claude Code: switches OBS scenes when chat spikes, no account and no cloud; 306 Rust tests.</li>
  <li><b>Path Saathi LMS</b>, client project (Next.js, React, TypeScript): working platform with login and course delivery on the dev environment the day after the brief arrived.</li>
</ul>

<h2>Skills</h2>
<p><b>Frontend:</b> React, Next.js, TypeScript, JavaScript, Redux Toolkit, Zustand, React Native, Tailwind CSS. <b>Backend:</b> Node.js, Express, REST, WebSockets, JWT auth, Python, FastAPI, Java, Spring Boot, ASP.NET. <b>Data:</b> MongoDB, PostgreSQL, SQL Server, Redis, SQLite, pgvector. <b>AI:</b> LLM integration, RAG, embeddings and vector search, function calling, agents, MCP, prompt engineering, fine-tuning and distillation, LLM evals, OpenAI, Gemini and Claude APIs, PyTorch, Ollama. <b>Delivery:</b> Git, GitHub Actions, CI/CD, Docker, Cloudflare Workers, unit and integration testing, system design, Agile.</p>

<h2>Education</h2>
<p>B.E. Computer Science, D. Y. Patil College of Engineering, 2021 · Diploma in Computer Science, D. Y. Patil Polytechnic, 2018 · Coding Ninjas: Front End Architecture, React Production Development, Advanced Backend Systems</p>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(HTML, { waitUntil: 'load' });
  const out = path.join(__dirname, '../public/Resume-ATS.pdf');
  await page.pdf({ path: out, format: 'A4', printBackground: false, preferCSSPageSize: true });
  await browser.close();
  console.log('Wrote ' + out + ' (' + fs.statSync(out).size + ' bytes)');
})().catch((e) => { console.error(e); process.exit(1); });
