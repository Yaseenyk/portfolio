// Tailored résumé: Technical Associate, IQVIA (via First Meridian). Same template and layout as portfolio/scripts/generate-resume.js.
// Every fact is from the main résumé, the live sites or the work history. Nothing invented: Power Automate, Power BI and
// SharePoint are listed as upskilling, next to the comparable hands-on work. Run: node generate-aws-resume.js
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const SITE = 'https://yk.streamerosai.com';
const GH = 'https://github.com/Yaseenyk';
const a = (url, label) => `<a href="${url}">${label}</a>`;
// Same styles as the main résumé, read from its generator so the two never drift apart.
const main = fs.readFileSync(path.join(__dirname, 'generate-resume.js'), 'utf8');
const STYLE = main.slice(main.indexOf('<style>'), main.indexOf('</style>') + 8);

const KEYWORDS = [
  'Full-Stack Engineer', 'Technology Solutions', 'end-to-end SDLC', 'PoC', 'PoCs', 'MVP', 'MVPs', 'rapid prototypes', 'production-ready',
  'workflow automation', 'workflow automations', 'system integrations', 'integrations', 'REST APIs', 'webhooks', 'visual workflow builder',
  'executive dashboards', 'dashboards', 'data visualization', 'analytics', 'KPIs', 'Azure AD', 'MSAL', 'single sign-on', 'CI/CD', 'GitHub Actions',
  'RAG', 'LLM workflows', 'AI agents', 'AI agent', 'MCP server', 'intelligent automation', 'automated pipelines', 'stakeholders', 'requirements',
  'TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Docker', 'Cloudflare Workers',
  '1.5 to 2x', '2x', '94%', 'Recall@5 0.95', 'MRR 0.83', '20 tools', '13 sites', '173 automated tests', '640 browser tests', '600 API tests', 'next day',
];
const KW_RE = new RegExp('(?<![A-Za-z0-9])(' + KEYWORDS.sort((x, y) => y.length - x.length).map((k) => k.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')).join('|') + ')(?![A-Za-z0-9])', 'g');
const kw = (t) => t.replace(KW_RE, '<b>$1</b>');

const SKILLS = [
  ['Full-Stack Development', '<b>JavaScript, TypeScript, React, Next.js, Node.js</b>, Express, <b>Python</b> (FastAPI), NestJS, ASP.NET MVC, <b>REST APIs</b>, WebSockets, Redux Toolkit, Tailwind CSS'],
  ['Technology Solutions and SDLC', 'Requirements gathering with stakeholders, solution architecture, <b>rapid prototyping, PoCs and MVPs</b>, unit, integration and end-to-end testing (Vitest, Playwright), deployment, technical documentation, production troubleshooting, Agile delivery'],
  ['Workflow Automation and Integrations', '<b>REST API and webhook integrations</b> (GitLab, Google Analytics, Search Console, OpenAI, Gemini), event-driven and scheduled <b>automated pipelines</b> (GitHub Actions), a <b>visual workflow builder</b> (React Flow), OAuth, JWT and role-based access'],
  ['Data Visualization and Dashboards', '<b>Executive and analytics dashboards</b> (React, charting, KPI tiles), MongoDB aggregation pipelines, caching and lazy loading for fast dashboards, GA4 and Search Console reporting'],
  ['Cloud and Enterprise', '<b>Azure AD / Entra ID (MSAL) single sign-on</b>, Cloudflare Workers, D1 and KV, <b>Docker</b>, <b>GitHub Actions CI/CD</b>, GitLab, PostgreSQL, MongoDB, SQL Server, Redis'],
  ['AI-Enabled Applications', '<b>RAG</b>, <b>LLM workflows</b>, <b>AI agents</b> with human approval, MCP servers, embeddings and vector search, LLM evals, intelligent automation'],
  ['Microsoft Power Platform', '<b>Power Automate, Power BI, SharePoint</b>: currently upskilling, building on hands-on equivalents above (workflow automation and integrations, executive dashboards, Azure AD SSO)'],
];

const JOBS = [
  {
    title: 'Senior Software Developer', org: 'Sparity', meta: 'Hyderabad · Hybrid', dates: '06/2025 – Present',
    bullets: [
      'Turned an open-ended ask from engineering leads (help engineers find project context fast) into a PoC, then a production-ready local hybrid RAG system: dense plus BM25 retrieval, rank fusion, a reranker and incremental ingestion. Recall@5 0.95 and MRR 0.83, with an eval harness that fails CI below its thresholds.',
      'Integrated it into the team’s daily workflow through an MCP server with 20 tools, packaged so any team can drop it into its own project.',
      'Built an AI pull-request review service that automates the review workflow: GitLab webhooks, Azure AD (MSAL) single sign-on, internal JWTs and role-checked REST APIs.',
      'Took an HR resource-to-task matching pilot (FitRank) from a manager’s request to a working MVP demonstrated to managers: requirements gathered with stakeholders, ranked shortlists, a person approves every decision.',
    ],
    stack: 'Python, Node.js, TypeScript, React, FastAPI, Azure AD (MSAL), GitLab, Docker',
  },
  {
    title: 'Full Stack Developer', org: 'MSA Software', meta: 'Remote', dates: '01/2023 – 05/2025',
    bullets: [
      'Made business analytics dashboards 1.5 to 2x faster by profiling slow MongoDB aggregation pipelines, adding a caching layer and lazy-loading heavy panels.',
      'Moved the team’s legacy JavaScript to TypeScript and Next.js, removing a class of type-related production bugs and making the codebase easier to maintain.',
      'Migrated shared application state from hand-rolled Redux to Redux Toolkit for predictable, maintainable data flow.',
    ],
    stack: 'React, Node.js, TypeScript, Next.js, MongoDB, Redux Toolkit',
  },
  {
    title: 'Software Developer (SDE 1)', org: 'Manorama Infosolutions', meta: 'Healthcare software · Remote', dates: '09/2021 – 01/2023',
    bullets: [
      'Built REST integration and routing layers for enterprise hospital information systems on ASP.NET and React; 2x payload throughput on the hot paths.',
      'Restructured tangled request handling into MVC and hardened it for many concurrent user sessions.',
    ],
    stack: 'ASP.NET, MVC, React, REST APIs, SQL Server',
  },
];

const PROJECTS = [
  {
    name: 'Analytics and Lead Dashboard', what: 'Executive dashboard for 13 sites, with a lead inbox', stack: 'Next.js, TypeScript, Cloudflare Workers, D1, KV, GA4 Data API, Search Console API',
    text: 'One dashboard for traffic, sources, search queries, indexing and KPIs across 13 sites, with quota-aware refresh of Google data. A form inbox captures every lead from every site with status tracking (new, replied, won) and the channel each lead came from, so sales follow-up no longer depends on email. 173 automated tests.',
    links: [a('https://analytics.streamerosai.com', 'Live')],
  },
  {
    name: 'IntegrateX', what: 'Visual workflow automation builder', stack: 'React Flow, Zustand, TypeScript, MongoDB',
    text: 'Drag-and-drop workflow canvas, comparable in concept to Power Automate flows. A serialization adapter separates what the screen needs from what the database stores: stored payloads cut by 94% with nothing lost on reload.',
    links: [a(`${SITE}/sandbox/`, 'Sandbox'), a(`${SITE}/blog/94-percent-payload-reduction-react-flow/`, 'Write-up')],
  },
  {
    name: 'Path Saathi LMS', what: 'Client MVP, vocational-skilling platform', stack: 'Next.js, React, Tailwind CSS, TypeScript',
    text: 'The brief and an MVP sketch arrived on a Monday; sign-in, course delivery for the client’s videos and PDFs, and a self-paced flow were live on the dev environment the next day.',
    links: [a('https://devlms.pathsaathi.in/login', 'Live (dev)')],
  },
  {
    name: 'Esports Hub', what: 'Tournament platform for organisers', stack: 'Next.js 14, React, TypeScript, Hono on Cloudflare Workers, D1, Playwright',
    text: 'Sign-ups, brackets, points tables, ID cards, live TV screens and gate check-in, with organisations and roles and Google sign-in. About 640 browser tests and 600 API tests run on every push through CI/CD.',
    links: [a('https://esports.streamerosai.com', 'Live'), a(`${GH}/esports-frontend`, 'Code')],
  },
  {
    name: 'FitRank', what: 'AI decision support for staffing', stack: 'FastAPI, PostgreSQL and pgvector, PyTorch, React, Docker',
    text: 'Ranks people for open tasks and returns a probability for every option; a manager makes every final call. Built as an MVP from a business request and shown to managers on dummy data.',
    links: [a('https://fitrank.streamerosai.com', 'Live'), a(`${SITE}/products/fitrank/`, 'Case study')],
  },
];

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Yaseen Khatib - Full-Stack Engineer, Technology Solutions Developer</title>
${STYLE}</head><body>
<div class="bar"></div>
<h1>Yaseen Khatib</h1>
<div class="title">Full-Stack Engineer · Technology Solutions Developer · Automation, Cloud and AI</div>
<div class="contact">
  <span>Hyderabad, India</span> · <span>${a('mailto:yaseenkhatib04@gmail.com', 'yaseenkhatib04@gmail.com')}</span> · <span>${a('tel:+918208335028', '+91 8208335028')}</span> ·
  <span>${a('https://www.linkedin.com/in/yaseen-yk', 'linkedin.com/in/yaseen-yk')}</span> · <span>${a(GH, 'github.com/Yaseenyk')}</span> · <span>${a(SITE, 'yk.streamerosai.com')}</span>
</div>
<div class="strip"><b>Core:</b> Full-stack (React, Next.js, Node.js, Python) <i>|</i> PoC to production <i>|</i> Workflow automation <i>|</i> API integrations <i>|</i> Dashboards <i>|</i> Azure AD <i>|</i> CI/CD <i>|</i> RAG and AI agents</div>
<div class="open"><b>Applying for:</b> Technical Associate · Full-Stack, Automation, Cloud and AI Solutions</div>

<h2>Summary</h2>
<p>${kw('Pragmatic Full-Stack Engineer with five years delivering production web systems with JavaScript, TypeScript, React, Next.js, Node.js and Python. I partner with business and technical stakeholders to turn ambiguous requirements into rapid prototypes, PoCs and MVPs, then scale them into production-ready, maintainable applications, workflow automations and integrations. Recent work: a client MVP live the next day after the brief; an HR resource-matching pilot taken from request to manager demo; an AI code-review service integrating GitLab webhooks with Azure AD single sign-on; a hybrid RAG system with measured quality; and an executive analytics and lead dashboard across 13 sites. Earlier: enterprise hospital information systems and business dashboards made 1.5 to 2x faster. Comfortable owning the end-to-end SDLC independently, from requirements to deployment and support.')}</p>

<h2>Skills</h2>
${SKILLS.map(([k, v]) => `<p class="skill"><span class="k">${k}:</span> ${v}</p>`).join('\n')}

<h2>Experience</h2>
${JOBS.map((j) => `<div class="job">
  <div class="row"><div class="t">${j.title}, <i>${j.org}</i></div><div class="dates">${j.dates}</div></div>
  <div class="meta">${j.meta}</div>
  <ul>${j.bullets.map((b) => `<li>${kw(b)}</li>`).join('')}</ul>
  <div class="stack"><b>Stack:</b> ${j.stack}</div>
</div>`).join('\n')}

<h2>Selected projects</h2>
<p style="font-size:9.2pt;color:#4a505b">Built and shipped solo unless marked client. Each has a live link or case study.</p>
${PROJECTS.map((p) => `<div class="proj">
  <div class="row"><div class="t">${p.name} <span>· ${p.what}</span></div><div class="links">${p.links.join(' · ')}</div></div>
  <p style="margin:1px 0 1px">${kw(p.text)}</p>
  <div class="stack"><b>Stack:</b> ${p.stack}</div>
</div>`).join('\n')}
<p class="more"><b>Also:</b> automated pipelines that publish scheduled content and LinkedIn posts through GitHub Actions with no servers · Portfolio Concierge, a grounded RAG API and public MCP server (${a(`${SITE}/#rag-concierge`, 'try it')}) · SpotAI, an AI gym app with on-device pose checks and per-gym data isolation (${a(`${SITE}/products/spotai/`, 'case study')}). All projects: ${a(`${SITE}/projects/`, 'yk.streamerosai.com/projects')}.</p>

<h2>Education</h2>
<p><b>B.E. Computer Science</b>, D. Y. Patil College of Engineering, 2021 · <b>Diploma, Computer Science</b>, D. Y. Patil Polytechnic, 2018<br>
Certifications (Coding Ninjas): Front End Architecture, React Production Development, Advanced Backend Systems</p>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  const out = path.join(__dirname, '../public/Yaseen-IQVIA-Resume.pdf');
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('Saved ' + out + ' (' + fs.statSync(out).size + ' bytes)');
})();
