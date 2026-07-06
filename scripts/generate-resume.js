// scripts/generate-resume.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    console.log('Generating high-density, 2-column executive resume...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // All projects live on page 2.
    const PROJECTS = [
      {
        name: 'Sable',
        badge: 'Flagship Product',
        desc: 'A local-first AI financial agent (React Native / Expo). Keeps 100% of financial data on-device in SQLite with no cloud backend; an OpenAI function-calling agent tracks peer-to-peer debts and pushes proactive briefings, with every database mutation gated behind a Review & Confirm boundary. Automated bank-SMS ingestion uses the Adapter Pattern and a p-queue to serialize SQLite writes.',
        tags: ['Local-First / On-Device AI', 'React Native / Expo', 'SQLite', 'OpenAI Function Calling', 'Local RAG'],
        links: [
          { label: 'Case Study', url: 'https://yaseenkhatib.streamerosai.com/products/sable' },
          { label: 'Code', url: 'https://github.com/Yaseenyk/sable' },
        ],
      },
      {
        name: 'streamerOS',
        badge: 'Flagship Deployment',
        desc: 'A Rust-powered desktop cockpit for streaming professionals, engineered via modular Claude orchestrations. Handles live system telemetry feeds, multi-platform chat velocity streams, and real-time automated OBS scene synchronization.',
        tags: ['AI-Architected', 'Rust / Next.js', 'Live Telemetry', 'WebSockets', 'Claude AI'],
        links: [
          { label: 'Live Demo', url: 'https://streamerosai.com' },
          { label: 'Code', url: 'https://github.com/Yaseenyk/streamerOS' },
          { label: 'Website', url: 'https://github.com/Yaseenyk/streamer-os-website' },
        ],
      },
      {
        name: 'Police Agentic RAG System (POSCO Matrix)',
        desc: 'An autonomous agentic RAG engine for law-enforcement workflows. Scans massive multi-format legal archives with custom vector embeddings to trace, evaluate, and output secure, court-admissible verdict matrices.',
        tags: ['Agentic AI', 'Vector Retrieval', 'LLM Orchestration', 'Python'],
      },
      {
        name: 'IntegrateX Automation Core',
        desc: 'A node-routing workflow-automation environment with responsive connectors, processing layers, and directional edge bindings. A custom state Serialization Adapter compresses graph definitions over the wire.',
        tags: ['94% Payload Compression', 'React Flow', 'Zustand', 'TypeScript'],
      },
      {
        name: 'Automated LinkedIn Pipeline',
        desc: 'A Python autonomous agent on GitHub Actions that drafts and publishes technical LinkedIn content on a cron via the Gemini API — zero servers, zero manual posting.',
        tags: ['Autonomous Agent', 'Python', 'GitHub Actions', 'Gemini API', 'Cron'],
        links: [
          { label: 'Code', url: 'https://github.com/Yaseenyk/linkedin-bot' },
        ],
      },
      {
        name: 'Zero-Cost AI Blog Writer',
        desc: 'A native Next.js pipeline that autonomously writes, formats, and deploys Markdown articles to this site — Gemini drafts the MDX, GitHub Actions commits it, and GitHub Pages ships it at $0 runtime cost.',
        tags: ['Autonomous Pipeline', 'Next.js', 'MDX', 'google-genai', 'GitHub Actions'],
        links: [
          { label: 'Case Study', url: 'https://yaseenkhatib.streamerosai.com/products/ai-blogger' },
          { label: 'Code', url: 'https://github.com/Yaseenyk/portfolio' },
        ],
      },
    ];

    const tagSpan = (t) =>
      `<span class="bg-cyan-50 text-cyan-700 border border-cyan-100 px-1.5 py-0.5 rounded text-[10px] font-medium">${t}</span>`;

    const projectsHtml = PROJECTS.map((p) => `
          <div>
            <div class="flex justify-between items-baseline font-semibold text-zinc-900 text-[13px]">
              <h3>${p.name}${p.badge ? ` <span class="text-[11px] font-medium text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded ml-1">${p.badge}</span>` : ''}</h3>
            </div>
            <p class="text-zinc-600 text-[12px] mt-0.5">${p.desc}</p>
            <div class="flex flex-wrap gap-1 mt-1.5">${p.tags.map(tagSpan).join('')}</div>
            ${p.links ? `<div class="flex flex-wrap gap-x-3 mt-1.5 text-[10px]">${p.links.map((l) => `<a href="${l.url}" class="text-cyan-700 font-medium">${l.label} ↗</a>`).join('')}</div>` : ''}
          </div>`).join('');

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Yaseen Khatib - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      -webkit-print-color-adjust: exact;
    }
  </style>
</head>
<body class="bg-white text-zinc-900 p-8 antialiased max-w-[210mm] mx-auto text-[13px] leading-relaxed">

  <!-- Header -->
  <div class="flex justify-between items-start border-b border-zinc-200 pb-5">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-zinc-900">Yaseen Khatib</h1>
      <p class="text-md font-medium text-cyan-600 mt-0.5">Senior Full-Stack AI Engineer · Builds &amp; Ships AI Products</p>
      <p class="text-zinc-600 max-w-xl mt-3 text-[12px] leading-normal">
        Senior Full-Stack AI Engineer with 4.5+ years building and shipping autonomous AI products — Agentic RAG, LLM orchestration, and OpenAI function-calling agents on scalable MERN foundations. Open to remote roles.
      </p>
    </div>
    <div class="text-right text-zinc-600 text-[12px] space-y-1 bg-zinc-50 p-3 rounded-lg border border-zinc-100 min-w-[220px]">
      <div><a href="mailto:yaseenkhatib04@gmail.com" class="text-zinc-600">yaseenkhatib04@gmail.com</a></div>
      <div><a href="tel:+918208335028" class="text-zinc-600">+91 8208335028</a></div>
      <div><a href="https://www.linkedin.com/in/yaseen-yk" class="text-cyan-700 font-medium">linkedin.com/in/yaseen-yk</a></div>
      <div><a href="https://github.com/Yaseenyk" class="text-zinc-600">github.com/Yaseenyk</a></div>
      <div><a href="https://yaseenkhatib.streamerosai.com/" class="text-cyan-700 font-medium">yaseenkhatib.streamerosai.com</a></div>
      <div><a href="https://github.com/Yaseenyk/portfolio" class="text-zinc-600">github.com/Yaseenyk/portfolio</a></div>
      <div class="text-[11px] text-zinc-400 mt-1 font-medium tracking-wider uppercase">Hyderabad, INDIA · Open to Remote</div>
    </div>
  </div>

  <!-- Main Split Grid Configuration -->
  <div class="grid grid-cols-12 gap-6 mt-5">

    <!-- LEFT SIDE COLUMN: Core Experience Narrative -->
    <div class="col-span-8 space-y-5">

      <div>
        <h2 class="text-[14px] font-bold tracking-wider uppercase text-zinc-900 border-b border-zinc-200 pb-1 mb-3">
          Work Experience
        </h2>

        <div class="space-y-4">
          <!-- Position 0: Sparity -->
          <div class="relative pl-4 border-l-2 border-cyan-500/30">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-500"></div>
            <div class="flex justify-between items-baseline font-semibold text-zinc-900">
              <h3 class="text-[13px]">Senior Software Developer</h3>
              <span class="text-[11px] text-zinc-500 font-normal">06/2025 – Present</span>
            </div>
            <div class="flex justify-between text-[11px] font-medium text-zinc-600 mb-2">
              <span>Sparity</span>
              <span class="italic">Hyderabad, India (Hybrid)</span>
            </div>
            <ul class="list-disc pl-4 text-zinc-600 space-y-1 text-[12px]">
              <li><strong class="text-zinc-800">AI Framework Orchestration:</strong> Engineering complex Agentic RAG models and sovereign system integrations inside enterprise MERN architecture.</li>
              <li><strong class="text-zinc-800">Workflow Compilations:</strong> Overseeing system transition paths to use highly optimized prompt logic and automated logic layers.</li>
            </ul>
          </div>

          <!-- Position 1: MSA Software -->
          <div class="relative pl-4 border-l-2 border-zinc-200">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-300"></div>
            <div class="flex justify-between items-baseline font-semibold text-zinc-900">
              <h3 class="text-[13px]">Full Stack Developer</h3>
              <span class="text-[11px] text-zinc-500 font-normal">01/2023 – 05/2025</span>
            </div>
            <div class="flex justify-between text-[11px] font-medium text-zinc-600 mb-2">
              <span>MSA Software</span>
              <span class="italic">Remote</span>
            </div>
            <ul class="list-disc pl-4 text-zinc-600 space-y-1 text-[12px]">
              <li>Accelerated system dashboard response speeds by <strong class="text-zinc-800">1.5x to 2x</strong> implementing strict structural caching layers and lazy loading protocols.</li>
              <li>Successfully migrated sprawling legacy JavaScript codebases into safe, strictly structured <strong class="text-zinc-800">TypeScript</strong> pipelines.</li>
              <li>Refactored shared context state parameters from Redux into clean <strong class="text-zinc-800">Redux Toolkit slice configurations</strong>.</li>
            </ul>
          </div>

          <!-- Position 2: Manorama Infosolutions -->
          <div class="relative pl-4 border-l-2 border-zinc-200">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-300"></div>
            <div class="flex justify-between items-baseline font-semibold text-zinc-900">
              <h3 class="text-[13px]">Software Developer (SDE 1)</h3>
              <span class="text-[11px] text-zinc-500 font-normal">09/2021 – 01/2023</span>
            </div>
            <div class="flex justify-between text-[11px] font-medium text-zinc-600 mb-2">
              <span>Manorama Infosolutions Pvt Ltd.</span>
              <span class="italic">Remote</span>
            </div>
            <ul class="list-disc pl-4 text-zinc-600 space-y-1 text-[12px]">
              <li>Engineered custom REST routing layers inside ASP.NET environments, delivering a confirmed <strong class="text-zinc-800">2x boost in wire payload processing throughput</strong>.</li>
              <li>Restructured system communication parameters cleanly into rigorous Model-View-Controller patterns.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <!-- RIGHT SIDE COLUMN: Skills, Credentials, Education -->
    <div class="col-span-4 space-y-5">

      <!-- Core Technology Tags -->
      <div>
        <h2 class="text-[14px] font-bold tracking-wider uppercase text-zinc-900 border-b border-zinc-200 pb-1 mb-3">
          Technical Skills
        </h2>
        <div class="space-y-3">
          <div>
            <h4 class="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">AI Engineering</h4>
            <div class="flex flex-wrap gap-1">
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">Agentic RAG</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">OpenAI Function Calling</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">Local / On-Device RAG</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">Claude / GPT</span>
            </div>
          </div>
          <div>
            <h4 class="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">Frontend Mastery</h4>
            <div class="flex flex-wrap gap-1">
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">React.js</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">TypeScript</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">Next.js App Router</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">React Native / Expo</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">Redux Toolkit</span>
            </div>
          </div>
          <div>
            <h4 class="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">Backend & Data</h4>
            <div class="flex flex-wrap gap-1">
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">Node.js / Express</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">MongoDB</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">Redis Cache</span>
              <span class="bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">SQL Server</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div>
        <h2 class="text-[14px] font-bold tracking-wider uppercase text-zinc-900 border-b border-zinc-200 pb-1 mb-2.5">
          Education
        </h2>
        <div class="space-y-3">
          <div>
            <div class="flex justify-between font-semibold text-zinc-800 text-[12px]">
              <span>B.E (Computer Science)</span>
              <span class="text-zinc-500 font-normal">2021</span>
            </div>
            <p class="text-[11px] text-zinc-600">D. Y. Patil College of Eng.</p>
          </div>
          <div>
            <div class="flex justify-between font-semibold text-zinc-800 text-[12px]">
              <span>Diploma (CS)</span>
              <span class="text-zinc-500 font-normal">2018</span>
            </div>
            <p class="text-[11px] text-zinc-600">D. Y. Patil Polytechnic</p>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <h2 class="text-[14px] font-bold tracking-wider uppercase text-zinc-900 border-b border-zinc-200 pb-1 mb-2.5">
          Certifications
        </h2>
        <ul class="space-y-1.5 text-zinc-600 text-[11px] font-medium">
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span>Front End Architecture — Coding Ninjas</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span>React Production Development — Coding Ninjas</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span>Advanced Backend Systems — Coding Ninjas</span>
          </li>
        </ul>
      </div>

    </div>
  </div>

  <!-- ============================ PAGE 2: PROJECTS ============================ -->
  <div class="pt-2" style="page-break-before: always;">
    <div class="flex items-baseline justify-between border-b border-zinc-200 pb-2 mb-4">
      <h1 class="text-xl font-bold tracking-tight text-zinc-900">Yaseen Khatib</h1>
      <span class="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Selected Projects</span>
    </div>
    <h2 class="text-[14px] font-bold tracking-wider uppercase text-zinc-900 border-b border-zinc-200 pb-1 mb-3">
      AI &amp; Full Stack Projects
    </h2>
    <div class="space-y-4">
      ${projectsHtml}
    </div>
  </div>

</body>
</html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const outputDirectory = path.join(__dirname, '../public');
    if (!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const outputPdfPath = path.join(outputDirectory, 'Resume.pdf');
    await page.pdf({
      path: outputPdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm'
      }
    });

    await browser.close();
    console.log('Success! Resume generated at: ' + outputPdfPath);
  } catch (error) {
    console.error('Error generating resume:', error);
    process.exit(1);
  }
})();
