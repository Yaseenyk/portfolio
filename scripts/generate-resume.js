// scripts/generate-resume.js
//
// Every number and link in this file was verified against the repo, the live
// site, or GitHub on 2026-10-21. Private repositories get no "Code" link —
// a 404 on a résumé costs more than the link is worth. Metrics that could not
// be verified (the old CMZ / Hospital-API / TV-suite percentages) are left out.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SITE = 'https://yaseenkhatib.streamerosai.com';
const GH = 'https://github.com/Yaseenyk';
const MCP = 'https://yaseen-concierge.yaseenyk.workers.dev/mcp';

(async () => {
  try {
    console.log('Generating 3-page résumé…');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Page 1 strip: the four pieces of work a reader must meet in the first
    // seven seconds. One hard fact each; the full write-ups live on page 2.
    const HIGHLIGHTS = [
      {
        name: 'FitRank',
        kicker: 'Applied ML · Live',
        fact: '23M MiniLM student distilled from a 9B teacher. Beats a rules-only baseline on hit@5 and pairwise ordering, served on CPU at $0 per decision.',
        link: { label: 'fitrank.streamerosai.com', url: 'https://fitrank.streamerosai.com' },
      },
      {
        name: 'streamerOS',
        kicker: 'Desktop · Rust',
        fact: 'Rust + Tauri 2 desktop cockpit for streamers, written with Claude Code. 24k lines of Rust, 306 Rust tests, OBS automation, local LLM. Launching November 2026.',
        link: { label: 'streamerosai.com', url: 'https://streamerosai.com' },
      },
    ];

    // Page 2: products designed, built and shipped solo.
    const PRODUCTS = [
      {
        name: 'FitRank',
        sub: 'Typed AI decisions for staffing',
        badge: 'Applied ML · Live',
        desc:
          'Ranks people for open tasks with typed decisions instead of a chatbot\'s opinion. Code applies the hard rules; a 23M-parameter MiniLM-L6 student with five linear heads — distilled from Qwen3.5-9B with a KL loss against the teacher\'s full distributions — returns a probability for every option; thresholds band each person shortlist / review / hidden, and a manager makes every final call. Managers\' accepts and rejects become the next model\'s training data.',
        proof:
          'Evaluated against a code-only baseline on every release (35 held-out tasks, synthetic data): <b>hit@5 94% vs 91%</b>, <b>pairwise 0.88 vs 0.86</b>, NDCG@10 0.89 vs 0.89 — and <b>hit@1 54% vs 74%</b>, which is why it shortlists rather than assigns. FastAPI router → service → repository, Postgres + pgvector, Alembic, JWT + refresh-cookie auth with roles, rate limits, a budget guard, Docker, GitHub Actions CI, <b>93.5% backend test coverage</b>.',
        tags: ['Knowledge Distillation', 'MiniLM / PyTorch', 'FastAPI', 'Postgres + pgvector', 'React + TypeScript', 'Docker · CI'],
        links: [
          { label: 'Live', url: 'https://fitrank.streamerosai.com' },
          { label: 'Case study', url: `${SITE}/products/fitrank/` },
        ],
      },
      {
        name: 'streamerOS',
        sub: 'Local-first streaming cockpit',
        badge: 'Desktop · Rust',
        desc:
          'A Rust + Tauri 2 desktop app for Twitch and YouTube streamers. Chat is read locally, velocity and sentiment are scored in Rust off the UI thread against the channel\'s own baseline, and scene automation drives OBS over WebSocket v5 — no account, no cloud, pull the network cable and it keeps working. Rust-core-to-webview IPC is batched MessagePack rather than per-event JSON; the assistant runs on Ollama at 127.0.0.1.',
        proof:
          'Rust written with Claude Code, reviewed and tested by me. <b>187 commits</b> since May 2026, 70 Rust files / <b>24,292 lines of Rust</b>, 42,733 lines of TypeScript, <b>306 Rust tests</b>. The app repository is private; the marketing site and its Tier-1 support agent — a Hono router on Cloudflare Workers that embeds the product docs into Upstash Vector and streams a gemini-flash answer constrained to that context — are public.',
        tags: ['Rust', 'Tauri 2', 'OBS WebSocket v5', 'MessagePack IPC', 'Ollama', 'Next.js'],
        links: [
          { label: 'Website', url: 'https://streamerosai.com' },
          { label: 'Case study', url: `${SITE}/products/streameros/` },
          { label: 'Site + agent source', url: `${GH}/streamer-os-website` },
        ],
      },
      {
        name: 'Portfolio Concierge',
        sub: 'Grounded RAG API + MCP server',
        badge: 'AI Infrastructure · Live',
        desc:
          'One zero-dependency Cloudflare Worker, two interfaces. A grounded RAG API answers questions about my work from a Vectorize index of the site\'s 80-document corpus (34 articles, 46 project pages) and refuses below a similarity threshold rather than guess. A public MCP server exposes search_portfolio, get_products and get_availability — any recruiter can add the URL to Claude and interview this résumé from inside their own AI. The corpus re-embeds automatically after every deploy.',
        tags: ['Cloudflare Workers', 'Vectorize', 'Workers AI', 'MCP', 'Grounded RAG', 'TypeScript'],
        links: [
          { label: 'Try it', url: `${SITE}/#rag-concierge` },
          { label: 'MCP', url: MCP },
          { label: 'Code', url: `${GH}/portfolio/tree/main/worker` },
        ],
      },
      {
        name: 'IntegrateX',
        sub: 'Workflow automation engine',
        badge: 'React Flow · Live Sandbox',
        desc:
          'A node-based workflow canvas — triggers, processing layers, directional edge bindings — backed by a Zustand store. The naive design stored the React Flow render model; a custom Serialization Adapter separates the view from the transport record and cut stored payloads by <b>94%</b>, round-trip lossless. The architecture runs live in the browser: drag nodes, rewire the graph, watch the serialization bench.',
        tags: ['React Flow', 'Zustand', 'TypeScript', 'Serialization Adapter', 'MongoDB'],
        links: [
          { label: 'Live sandbox', url: `${SITE}/sandbox/` },
          { label: 'Write-up', url: `${SITE}/blog/94-percent-payload-reduction-react-flow/` },
        ],
      },
      {
        name: 'Sable',
        sub: 'Local-first AI financial agent',
        badge: 'Mobile · AI Agent',
        desc:
          'A React Native / Expo personal-finance agent where the model is structurally incapable of touching the money. 100% of financial data stays on-device in SQLite with no cloud backend; an OpenAI function-calling agent tracks peer-to-peer debts and pushes proactive briefings, and every database mutation renders as a Review & Confirm card — it proposes, only a human commits. Bank-SMS ingestion uses the Adapter pattern with a p-queue serialising SQLite writes.',
        tags: ['React Native / Expo', 'SQLite', 'OpenAI Function Calling', 'Local RAG', 'TypeScript'],
        links: [{ label: 'Case study', url: `${SITE}/products/sable/` }],
      },
    ];

    // Page 3: applied, client and open-source work with public artefacts.
    const APPLIED = [
      {
        name: 'ShelfSight AI',
        sub: 'Retail vision for a kirana shop',
        badge: 'Computer Vision · Open Source',
        desc:
          'Four retail vision problems in one on-premise system: phantom stock, planogram compliance, produce freshness and expiry-date OCR. A manager lays out a rack once; after that a photo counts every facing and staff are told which shelf to walk to. Its most useful property is what it refuses to claim — the detector localises products without naming them, so the planogram endpoint returns 409 rather than a score it cannot support. <b>650 tests</b>.',
        tags: ['FastAPI', 'YOLOv8', 'MobileNetV2', 'Next.js 14', 'Docker', 'Ollama'],
        links: [
          { label: 'Backend', url: `${GH}/Shelfsight-AI-real-time-planogram-and-inventory-intelligence-be` },
          { label: 'Dashboard', url: `${GH}/Shelfsight-AI-real-time-planogram-and-inventory-intelligence` },
        ],
      },
      {
        name: 'AISA',
        sub: 'Student association platform',
        badge: 'Full-Stack · Live',
        desc:
          'Arrived as one 4,019-line HTML file with a live Firebase key in the source and every permission decided in the browser. Rebuilt as a Next.js static export on GitHub Pages and a Spring Boot 3 / Java 25 API on Render, both on Firestore. Firebase Auth answers who you are; the server decides what you may do — the half the original had backwards. Five auth states, <b>29 tests</b>.',
        tags: ['Next.js', 'Java 25', 'Spring Boot 3', 'Firestore', 'Firebase Auth'],
        links: [
          { label: 'Live', url: 'https://yaseenyk.github.io/SIT-FE/' },
          { label: 'Frontend', url: `${GH}/SIT-FE` },
          { label: 'Backend', url: `${GH}/SIT-BE` },
        ],
      },
      {
        name: 'Path Saathi LMS',
        sub: 'Vocational-skilling platform',
        badge: 'Client · 1-Day Delivery',
        desc:
          'A free vocational-skilling LMS for a client sitting on a library of course videos and PDFs. Brief and MVP sketch arrived on a Monday; a working platform — auth, course delivery, self-paced flow — was live on the dev environment the next day.',
        tags: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
        links: [{ label: 'Live (dev)', url: 'https://devlms.pathsaathi.in/login' }],
      },
      {
        name: 'Autonomous Content Machine',
        sub: 'Three pipelines, zero servers',
        badge: 'Pipelines · $0 Infra',
        desc:
          'Three cooperating pipelines on GitHub Actions, running unattended at no cost: an AI writer that drafts a technical article with a brand-locked cover on Mon/Wed/Fri, commits it and deploys the static site; a LinkedIn agent that turns each post into scheduled, UTM-tracked content Tue–Thu with its state ledger committed to Git; and a nightly DEV.to syndicator that cross-posts with canonical URLs pointing home.',
        tags: ['GitHub Actions', 'Python', 'Next.js', 'DEV.to API', 'Zero-Cost Infra'],
        links: [
          { label: 'Case study', url: `${SITE}/products/ai-blogger/` },
          { label: 'LinkedIn agent', url: `${GH}/linkedin-bot` },
        ],
      },
    ];

    const WRITING = [
      {
        label: 'Engineering blog',
        stat: '34 articles',
        text: 'First-person write-ups of the systems above — serialization adapters, grounded RAG, agent tracing with OpenTelemetry, prompt caching, WebSocket telemetry at scale.',
        link: { label: 'Read the blog', url: `${SITE}/blog/` },
      },
      {
        label: 'DEV.to',
        stat: '35 articles',
        text: 'Syndicated automatically every night with canonical URLs pointing home.',
        link: { label: 'dev.to/yaseenyk04', url: 'https://dev.to/yaseenyk04' },
      },
      {
        label: 'AI Engineering Journey',
        stat: '16 days · 64 hours',
        text: 'A curriculum I authored — embeddings, vector search, RAG, agents, evaluation, fine-tuning, production — as 16 interactive chapters with diagrams and a built-in presentation mode.',
        link: { label: 'Open the curriculum', url: `${SITE}/final-year-projects/journey/` },
      },
      {
        label: 'Open source',
        stat: '54 public repos',
        text: 'Since 2022, including the full source of this portfolio, its RAG/MCP worker, the content pipelines, ShelfSight and AISA.',
        link: { label: 'github.com/Yaseenyk', url: GH },
      },
    ];

    // Every term here is backed by something in the repos or the roles above —
    // these are the keywords an ATS matches on, so they are spelled the way
    // job descriptions spell them.
    const SKILLS = [
      ['AI engineering', ['Generative AI', 'LLMs', 'RAG', 'Embeddings & vector search', 'Prompt engineering', 'Fine-tuning / distillation', 'Agentic workflows', 'Function calling', 'MCP', 'LLM evals', 'OpenAI · Gemini · Claude APIs', 'PyTorch', 'Computer vision (YOLOv8)', 'Ollama', 'pgvector · Vectorize']],
      ['Frontend', ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Redux Toolkit', 'Zustand', 'React Flow', 'React Native / Expo', 'Tailwind CSS', 'HTML / CSS']],
      ['Backend & data', ['Node.js', 'Express', 'REST APIs', 'Python', 'FastAPI', 'Rust / Tauri 2 (using Claude Code)', 'Java / Spring Boot', 'ASP.NET', 'MongoDB', 'PostgreSQL', 'SQL Server', 'SQLite', 'Firestore', 'Redis', 'WebSockets', 'JWT auth']],
      ['Delivery', ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Cloudflare Workers', 'GitHub Pages', 'Unit & integration testing', 'System design', 'Agile delivery']],
    ];

    const EXPERIENCE = [
      {
        role: 'Senior Software Developer',
        company: 'Sparity',
        where: 'Hyderabad · Hybrid',
        period: '06/2025 – Present',
        bullets: [
          'Own the <b>LLM and agentic layer</b> of production MERN systems end to end — architecture, orchestration, deployment.',
          'Ship <b>Agentic RAG services</b> with schema-validated outputs, guardrails, and cost-aware routing between models.',
        ],
      },
      {
        role: 'Full Stack Developer',
        company: 'MSA Software',
        where: 'Remote',
        period: '01/2023 – 05/2025',
        bullets: [
          'Cut dashboard response times <b>1.5–2x</b> by profiling slow MongoDB aggregation pipelines, adding a caching layer, and lazy-loading heavy panels.',
          'Moved the team\'s legacy JavaScript to <b>TypeScript and Next.js</b>, removing a whole class of type-related production bugs.',
          'Migrated shared state from hand-rolled Redux to <b>Redux Toolkit slices</b>.',
        ],
      },
      {
        role: 'Software Developer (SDE 1)',
        company: 'Manorama Infosolutions',
        where: 'Healthcare software · Remote',
        period: '09/2021 – 01/2023',
        bullets: [
          'Built REST routing layers for hospital information systems on <b>ASP.NET + React</b>; <b>2x</b> payload throughput on the hot paths.',
          'Moved tangled request handling into MVC and hardened it for concurrent user sessions.',
        ],
      },
    ];

    // ---- rendering helpers -------------------------------------------------
    const ICON = {
      mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
      phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>',
      github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>',
      globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
      pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    };
    const contact = (icon, label, url, accent) =>
      `<span class="inline-flex items-center gap-1.5 ${accent ? 'text-cyan-700' : 'text-zinc-600'}"><span class="w-[11px] h-[11px] text-zinc-400">${ICON[icon]}</span>${url ? `<a href="${url}">${label}</a>` : label}</span>`;

    const a = (l) => `<a href="${l.url}" class="text-cyan-700 font-semibold whitespace-nowrap">${l.label}&nbsp;↗</a>`;
    const pill = (t) =>
      `<span class="inline-block bg-zinc-100 text-zinc-700 border border-zinc-200 px-1.5 py-[1px] rounded text-[9px] font-medium leading-[1.5]">${t}</span>`;
    const h2 = (t, extra = '') =>
      `<div class="flex items-center gap-2.5 mb-3"><span class="w-1.5 h-1.5 rounded-sm bg-cyan-500"></span><h2 class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-800">${t}</h2>${extra ? `<span class="text-[9.5px] text-zinc-400">${extra}</span>` : ''}<span class="flex-1 h-px bg-zinc-200"></span></div>`;
    const badge = (t) =>
      `<span class="text-[9px] font-semibold text-cyan-700 bg-cyan-50 border border-cyan-100 px-2 py-[2px] rounded-full whitespace-nowrap">${t}</span>`;

    const card = (p) => `
      <div class="break-inside-avoid rounded-lg border border-zinc-200 bg-white px-4 py-3 border-l-[3px] border-l-cyan-500">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-bold text-[13px] text-zinc-900 leading-tight">${p.name} <span class="font-normal text-zinc-500">— ${p.sub}</span></h3>
          </div>
          <div class="flex items-center gap-2 shrink-0">${badge(p.badge)}</div>
        </div>
        <p class="text-[11px] text-zinc-600 mt-1.5 leading-[1.55]">${p.desc}</p>
        ${p.proof ? `<div class="mt-2 rounded-md bg-zinc-50 border border-zinc-100 px-3 py-2 text-[10.5px] text-zinc-700 leading-[1.5]"><span class="font-bold uppercase tracking-wider text-[8.5px] text-cyan-700 mr-1.5">Proof</span>${p.proof}</div>` : ''}
        <div class="flex items-center justify-between gap-4 mt-2.5">
          <div class="flex flex-wrap gap-1.5">${p.tags.map(pill).join('')}</div>
          <div class="text-[9.5px] shrink-0 space-x-3">${p.links.map(a).join('')}</div>
        </div>
      </div>`;

    const highlight = (h) => `
      <div class="rounded-lg border border-zinc-200 bg-zinc-50/70 px-3.5 py-2.5">
        <div class="flex items-baseline justify-between gap-3">
          <h3 class="font-bold text-[12px] text-zinc-900">${h.name}</h3>
          <span class="text-[8.5px] font-semibold uppercase tracking-wider text-cyan-700">${h.kicker}</span>
        </div>
        <p class="text-[10.5px] text-zinc-600 mt-1 leading-[1.5]">${h.fact}</p>
        <p class="text-[9.5px] mt-1.5">${a(h.link)}</p>
      </div>`;

    const job = (j, last) => `
      <div class="relative pl-5 ${last ? '' : 'pb-3'}">
        <span class="absolute left-0 top-[5px] w-[9px] h-[9px] rounded-full bg-white border-2 border-cyan-500"></span>
        ${last ? '' : '<span class="absolute left-[4px] top-[14px] bottom-0 w-px bg-zinc-200"></span>'}
        <div class="flex items-baseline justify-between gap-3">
          <h3 class="font-bold text-[12.5px] text-zinc-900">${j.role}</h3>
          <span class="text-[9.5px] font-medium text-zinc-500 whitespace-nowrap">${j.period}</span>
        </div>
        <p class="text-[10.5px] text-cyan-700 font-semibold">${j.company} <span class="font-normal text-zinc-400">· ${j.where}</span></p>
        <ul class="mt-1.5 space-y-1 text-[10.5px] text-zinc-600 leading-[1.5]">${j.bullets.map((b) => `<li class="flex gap-2"><span class="mt-[7px] w-1 h-1 rounded-full bg-zinc-400 shrink-0"></span><span>${b}</span></li>`).join('')}</ul>
      </div>`;

    const skillPanel = ([group, items]) => `
      <div class="rounded-lg border border-zinc-200 overflow-hidden h-full">
        <div class="flex items-center gap-2 bg-zinc-50 border-b border-zinc-200 px-3 py-1.5">
          <span class="w-1.5 h-1.5 rounded-sm bg-cyan-500"></span>
          <h3 class="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-800">${group}</h3>
        </div>
        <p class="px-3 py-2 text-[10.5px] text-zinc-700 leading-[1.65]">${items.map((t) => `<span class="whitespace-nowrap">${t}</span>`).join('&nbsp;<span class="text-zinc-300">·</span> ')}</p>
      </div>`;

    const writingCard = (w) => `
      <div class="rounded-lg border border-zinc-200 px-3.5 py-3">
        <div class="flex items-baseline justify-between gap-3">
          <h3 class="font-bold text-[12px] text-zinc-900">${w.label}</h3>
          <span class="text-[9px] font-semibold text-cyan-700 bg-cyan-50 border border-cyan-100 px-2 py-[2px] rounded-full whitespace-nowrap">${w.stat}</span>
        </div>
        <p class="text-[10.5px] text-zinc-600 mt-1 leading-[1.5]">${w.text}</p>
        <p class="text-[9.5px] mt-1.5">${a(w.link)}</p>
      </div>`;

    const running = (label) => `
      <div class="flex items-baseline justify-between border-b border-zinc-200 pb-2 mb-4">
        <span class="text-[13px] font-bold tracking-tight text-zinc-900">Yaseen Khatib <span class="font-normal text-zinc-400">· Senior Full-Stack AI Engineer</span></span>
        <span class="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-semibold">${label}</span>
      </div>`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Yaseen Khatib - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    b { font-weight: 600; color: #18181b; }
    svg { width: 100%; height: 100%; }
  </style>
</head>
<body class="bg-white text-zinc-900 antialiased max-w-[210mm] mx-auto">

  <!-- ============================ PAGE 1 ============================ -->
  <header class="relative">
    <div class="absolute -top-[12mm] -left-[13mm] -right-[13mm] h-[6px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-violet-500"></div>
    <div class="flex items-end justify-between">
      <div>
        <h1 class="text-[30px] font-extrabold tracking-tight text-zinc-900 leading-none">Yaseen Khatib</h1>
        <p class="mt-1.5 text-[13px] font-semibold text-cyan-700">Senior Full-Stack AI Engineer</p>
      </div>
      <div class="text-right text-[10px] text-zinc-500 leading-[1.6]">
        <div>${contact('pin', 'Hyderabad, India')}</div>
        <div>Remote · Hybrid · On-site</div>
      </div>
    </div>
    <div class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10px]">
      ${contact('mail', 'yaseenkhatib04@gmail.com', 'mailto:yaseenkhatib04@gmail.com')}
      ${contact('phone', '+91 8208335028', 'tel:+918208335028')}
      ${contact('linkedin', 'linkedin.com/in/yaseen-yk', 'https://www.linkedin.com/in/yaseen-yk', true)}
      ${contact('github', 'github.com/Yaseenyk', GH, true)}
      ${contact('globe', 'yaseenkhatib.streamerosai.com', `${SITE}/`, true)}
    </div>
    <p class="mt-3 text-[11px] text-zinc-700 leading-[1.5] border-t border-zinc-200 pt-3">
      Five years building web products end to end, now building the AI inside them: systems that answer from real documents instead of guessing, models trained to make bounded decisions a manager signs off, and agents that propose rather than act. Stack: React, Next.js, Node.js, TypeScript, Python, Rust (using Claude Code); RAG, LLM orchestration, function calling, MCP. Shipped solo in the last twelve months: <b>FitRank, streamerOS, Sable, IntegrateX</b> and two autonomous content pipelines — each with a public link you can open.
    </p>
  </header>

  <section class="mt-4">
    ${h2('Selected work', 'full write-ups on pages 2–3')}
    <div class="grid grid-cols-2 gap-3">${HIGHLIGHTS.map(highlight).join('')}</div>
  </section>

  <section class="mt-4">
    ${h2('Skills')}
    <div class="grid grid-cols-2 gap-3">${SKILLS.map(skillPanel).join('')}</div>
  </section>

  <div class="grid grid-cols-12 gap-x-7 mt-4">
    <section class="col-span-8">
      ${h2('Experience')}
      <div>${EXPERIENCE.map((j, i) => job(j, i === EXPERIENCE.length - 1)).join('')}</div>
    </section>

    <aside class="col-span-4">
      ${h2('Education')}
      <div class="text-[10.5px] leading-[1.5] space-y-2.5">
        <div><p class="font-bold text-zinc-900">B.E. Computer Science <span class="font-medium text-zinc-400">· 2021</span></p><p class="text-zinc-600">D. Y. Patil College of Engineering</p></div>
        <div><p class="font-bold text-zinc-900">Diploma, Computer Science <span class="font-medium text-zinc-400">· 2018</span></p><p class="text-zinc-600">D. Y. Patil Polytechnic</p></div>
        <div class="pt-1.5 border-t border-zinc-200 text-[10px] text-zinc-500 leading-[1.5]"><span class="font-bold text-zinc-700">Certifications</span><br/>Coding Ninjas — Front End Architecture · React Production Development · Advanced Backend Systems</div>
      </div>
    </aside>
  </div>

  <!-- ============================ PAGE 2: PRODUCTS ============================ -->
  <div style="page-break-before: always;">
    ${running('Products — designed, built and shipped solo')}
    <div class="space-y-3">${PRODUCTS.map(card).join('')}</div>
  </div>

  <!-- ============================ PAGE 3: APPLIED WORK, WRITING ============================ -->
  <div style="page-break-before: always;">
    ${running('Applied & client work · Writing & teaching')}
    ${h2('Applied & client work')}
    <div class="space-y-3">${APPLIED.map(card).join('')}</div>
    <section class="mt-6">
      ${h2('Writing & teaching')}
      <div class="grid grid-cols-2 gap-3">${WRITING.map(writingCard).join('')}</div>
    </section>
    <p class="mt-6 text-[8.5px] text-zinc-400 leading-snug text-center">Every link in this document was checked on the date of generation. Repositories not linked are private. Metrics are the latest published evaluation, including where the model loses.</p>
  </div>

</body>
</html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const outputDirectory = path.join(__dirname, '../public');
    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory, { recursive: true });

    const outputPdfPath = path.join(outputDirectory, 'Resume.pdf');
    await page.pdf({
      path: outputPdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '12mm', bottom: '12mm', left: '13mm', right: '13mm' },
    });

    await browser.close();
    console.log('Success! Resume generated at: ' + outputPdfPath);
  } catch (error) {
    console.error('Error generating resume:', error);
    process.exit(1);
  }
})();
