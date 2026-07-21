# Yaseen Khatib — Portfolio & AI Systems Lab

[![Live](https://img.shields.io/badge/Live-yaseenkhatib.streamerosai.com-06B6D4?style=for-the-badge)](https://yaseenkhatib.streamerosai.com)
[![Next.js 14](https://img.shields.io/badge/Next.js_14-App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

The production portfolio of a Senior Full-Stack AI Engineer — and itself a
working AI system: the site writes part of its own content, generates its own
cover art, distributes itself to LinkedIn, and answers questions about its
author through a real RAG pipeline.

## 🤖 Interview this portfolio via MCP

Add the concierge to Claude as a custom connector and interrogate the
portfolio from inside your own AI:

```
https://yaseen-concierge.yaseenyk.workers.dev/mcp
```

Tools: `search_portfolio` (semantic search over the 95-article corpus),
`get_products`, `get_availability`. The same Worker powers the homepage's
terminal concierge — grounded RAG over Cloudflare Vectorize + Workers AI,
with a hard refusal below the similarity threshold. Source in
[`worker/`](worker/).

## 🧪 The Engineering Lab — [/sandbox](https://yaseenkhatib.streamerosai.com/sandbox)

Interactive exhibits that prove the site's claims instead of stating them:

- **Serialization Live Bench** — drag nodes on a real React Flow canvas and
  watch raw state vs. schema-aware struct payloads reprice, live (the 94%
  claim, measured in front of you).
- **AI FinOps Cost Simulator** — the cache → flash → frontier routing cascade
  and its economics.
- **Chaos Toggle** — synthetic 504s/latency to validate retry + graceful
  degradation.
- **RAG Trace Waterfall** — span-by-span pipeline timing with a semantic-cache
  comparison.
- **Guardrail Playground** — try to jailbreak a four-layer deterministic
  defense.
- **Live Core Web Vitals** — this page's real LCP/CLS/INP, measured in your
  browser.

## ⚙️ The autonomous content machine

- **AI Blogger** (`scripts/ai_writer.py` + Actions cron) — writes a technical
  article Mon/Wed/Fri under a strict human-voice contract, generates a
  brand-locked cover with gpt-image-1, commits, and deploys.
- **Corpus loop** — every deploy regenerates `llms.txt` / `llms-full.txt` and
  re-embeds the corpus into Vectorize, so the concierge knows each new post
  the day it ships. IndexNow pings Bing on every deploy.
- **LinkedIn pipeline** (separate repo) — publishes the queue daily with UTM
  attribution.

## 📚 Content

~95 articles across the [Founder's Log](https://yaseenkhatib.streamerosai.com/#founders-log)
vision series, three roadmap masterclasses (AI Systems Architect, Claude
Code efficiency, Anthropic/Claude development), and deep product teardowns
in [/products](https://yaseenkhatib.streamerosai.com/products) — streamerOS
(Rust/Tauri), IntegrateX (React Flow + the 94% serialization adapter), Sable
(local-first AI finance agent), and the pipelines above.

## 🛠 Development

```bash
npm install
npm run dev               # http://localhost:3000
npm run build             # static export → ./out (+ llms-full.txt)
npm run lint
python scripts/generate-og-images.py   # regenerate cover art
```

Docs live in [`docs/`](docs/README.md). Deployment: static export → GitHub
Pages via Actions; the Worker deploys separately via `worker.yml`.

---

Open to Lead/Senior Full-Stack & AI Engineering roles — remote, hybrid, or
on-site — based in Hyderabad (IST). Start with the
[interview brief](https://yaseenkhatib.streamerosai.com/interview) or
[/about](https://yaseenkhatib.streamerosai.com/about).
