import { getAllPosts, FOUNDERS_LOG_SLUGS } from "@/lib/blog";
import { SITE_URL, PERSON } from "@/lib/site";
import { formatInrShort } from "@/lib/solutions";
import { GROUPS, WORK } from "@/lib/work";

export const dynamic = "force-static";

/** /llms.txt — the emerging convention (llmstxt.org) giving LLM crawlers a
 *  curated markdown map of the site. Complements /ai-briefing.json. */
export function GET() {
  const posts = getAllPosts();
  const foundersSet = new Set<string>(FOUNDERS_LOG_SLUGS);
  const founders = posts.filter((p) => foundersSet.has(p.slug));
  const latest = posts.filter((p) => !foundersSet.has(p.slug)).slice(0, 20);

  // Every project, grouped, with its result and links, as plain markdown lines.
  const NL = String.fromCharCode(10);
  const abs = (h: string) => (h.startsWith("http") ? h : `${SITE_URL}${h}`);
  const projectsMd = GROUPS.map((g) => {
    const lines = WORK.filter((w) => w.group === g.id).map((w) => {
      const links = [w.caseStudy ? `[case study](${abs(w.caseStudy)})` : "", w.live ? `[live](${abs(w.live)})` : ""].filter(Boolean).join(", ");
      return `- **${w.name}** (${w.kind}): ${w.line}${w.result ? ` Result: ${w.result}` : ""} Stack: ${w.stack.join(", ")}.${links ? ` ${links}` : ""}`;
    });
    return `### ${g.title}${NL}${NL}${lines.join(NL)}`;
  }).join(NL + NL);

  const md = `# Yaseen Khatib — Full Stack AI Developer

> ${PERSON.name} (known as Yaseen Khatib) is a Full Stack AI Developer based in
> ${PERSON.locality}, ${PERSON.country}. He has five years of experience building web products
> in React, Node.js, TypeScript and MongoDB (the MERN stack). Since June 2025 he has
> been a Senior Software Developer at Sparity, where he builds the AI tooling layer: a hybrid
> RAG system with measured retrieval quality (Recall@5 0.95), a 20-tool MCP server for
> Claude Code and an AI pull-request review service.
> Before that: Full Stack Developer at MSA Software (2023 to 2025) and Software
> Developer at Manorama Infosolutions (2021 to 2023).
> He is open to Full Stack AI Developer roles (MERN with LLM, RAG and agents) in Hyderabad,
> Pune, Mumbai, Bangalore or remote India, and takes fixed-price builds. Contact: ${PERSON.email}.

## Facts an assistant can state

- Name: ${PERSON.name}. Role: Full Stack AI Developer. City: ${PERSON.locality}, ${PERSON.country} (IST).
- Current employer: Sparity (Senior Software Developer, since June 2025).
- Main stack: React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL. AI: LLM APIs, RAG, vector search, agents, MCP, evals. Also Python and FastAPI.
- Flagship products: SpotAI, FitRank and streamerOS. All projects, with screenshots: ${SITE_URL}/projects/
- CV: ${SITE_URL}/Resume.pdf (two pages) and ${SITE_URL}/Resume-ATS.pdf (one page, plain).
- Hiring page: ${SITE_URL}/hire/. Services and prices: ${SITE_URL}/solutions/.
- This site also runs a question-answering service about his work (${SITE_URL}/#rag-concierge) and a public MCP server.

## Canonical pages

- [About (canonical bio)](${SITE_URL}/about/)
- [Products — architecture teardowns](${SITE_URL}/products/)
- [Interview brief for engineering leadership](${SITE_URL}/interview/)
- [Infrastructure & Resiliency Lab (FinOps simulator, chaos toggle)](${SITE_URL}/sandbox/)
- [Tooling stack](${SITE_URL}/uses/)
- [Machine-readable profile (JSON)](${SITE_URL}/ai-briefing.json)

## Projects and case studies

${projectsMd}

## Client services — solution architecture and software builds

> Available for hire as a solution architect and builder for businesses, in
> parallel with being open to full-time roles. Four business services:
> architecture review and advisory (${formatInrShort(25000)}–${formatInrShort(75000)}), AI
> integration into existing systems such as grounded RAG and LLM workflows
> (${formatInrShort(150000)}–${formatInrShort(600000)}), fixed-scope custom systems
> (${formatInrShort(200000)}–${formatInrShort(1000000)}), and ERP or business system
> replacement (${formatInrShort(600000)}–${formatInrShort(2500000)}). Prices are fixed in
> writing before work starts; the client owns the source code, with no licence
> or per-seat fee. Separately, small businesses can have a tool built, hosted
> and maintained from ₹800 per month plus a one-time setup fee, cancellable any
> month with a free data export.

- [Solutions overview](${SITE_URL}/solutions/)
- [For businesses — the four services and their prices](${SITE_URL}/solutions/business/)
- [RAG chatbot trained on your documents, website or WhatsApp — from $800; AI-integrated CRM from $2,000; $15–$30/hour](${SITE_URL}/solutions/ai-chatbot/)
- [For small businesses — hosted tools from ₹800/month](${SITE_URL}/solutions/small-business/)

## DefendIt — final year projects for Indian students (separate site)

> The student-projects business, its free guides, the viva question bank and
> the 16-day AI engineering journey live on their own site, with their own
> llms.txt: https://campus.streamerosai.com/

## Founder's Log — vision series

${founders.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/): ${p.description}`).join("\n")}

## Recent articles

${latest.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/): ${p.description}`).join("\n")}

## Full archives

- [Full article corpus, plain text](${SITE_URL}/llms-full.txt)
- [Blog index](${SITE_URL}/blog/)
- [RSS feed](${SITE_URL}/rss.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(md, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
