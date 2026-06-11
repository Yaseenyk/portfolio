# Yaseen Khatib — Senior AI Systems Architecture

[![Live Deployment](https://img.shields.io/badge/Live_Deployment-yaseenyk.github.io-06B6D4?style=for-the-badge)](https://yaseenyk.github.io/portfolio)
[![Next.js 14](https://img.shields.io/badge/Next.js_14-App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

This repository houses my production portfolio and **AI Infrastructure Lab**, demonstrating enterprise-grade frontend architecture, LLM cost governance, and system resiliency.

## 🧪 The Infrastructure & Resiliency Lab
A live, interactive sandbox demonstrating how to harden AI applications for production.
👉 **[Experience the Lab Live](https://yaseenyk.github.io/portfolio/sandbox)**

* **AI FinOps Cost Simulator:** A live token-physics engine demonstrating how cascading model routing (Semantic Cache → Flash → Frontier) reduces monthly LLM infrastructure deficits by 80%+.
* **Chaos Engineering Degrader:** An interactive client-side network interceptor. Injects synthetic 3.5s latency and `504 Gateway Timeouts` to validate exponential backoff retry loops and graceful UI fallback states.
* **AEO Machine-Readable Manifest:** A strictly typed JSON-LD endpoint (`/ai-briefing.json`) designed for AI Recruiter Agents and Answer Engines (Perplexity, GPTBot) to parse stack architecture.

## 🤖 streamerOS: RAG Terminal Concierge
The homepage features a custom Unix-style terminal UI wrapped around a Hybrid RAG pipeline. It simulates real-time execution traces (`[Vector Search: 42ms]`, `[Guardrail Check: Passed]`) and enforces structured Zod-schema outputs to eliminate hallucination when querying my resume data.

## 📊 Key Engineering Metrics
* **94% Payload Compression:** Designed a lossless, schema-aware serialization adapter for the *IntegrateX Workflow Engine*. Transformed rich UI node models (React Flow/Zustand) into delta-encoded structs, drastically reducing TTFB and database storage overhead.
* **Zero-Leak React State:** Deep interval cleanup and strict state-machine implementations guarantee zero memory leaks across all streaming UI components.

## 🛠 Local Development
```bash
# Clone the repository
git clone https://github.com/Yaseenyk/portfolio.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open to Lead/Senior Full-Stack and AI Engineering roles. Reach out on LinkedIn or via the Terminal Concierge on the live site.
