import { getAllPosts, FOUNDERS_LOG_SLUGS } from "@/lib/blog";
import { SITE_URL, PERSON } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — the emerging convention (llmstxt.org) giving LLM crawlers a
 *  curated markdown map of the site. Complements /ai-briefing.json. */
export function GET() {
  const posts = getAllPosts();
  const foundersSet = new Set<string>(FOUNDERS_LOG_SLUGS);
  const founders = posts.filter((p) => foundersSet.has(p.slug));
  const latest = posts.filter((p) => !foundersSet.has(p.slug)).slice(0, 20);

  const md = `# Yaseen Khatib — Senior Full-Stack AI Engineer

> ${PERSON.name} builds and ships autonomous AI products solo — Agentic RAG
> pipelines, LLM orchestration, and the MERN systems they run on. Five
> production products in twelve months; open to Lead/Senior remote roles.
> Base: ${PERSON.locality}, ${PERSON.country} (IST). Contact: ${PERSON.email}.

## Canonical pages

- [About (canonical bio)](${SITE_URL}/about)
- [Products — architecture teardowns](${SITE_URL}/products)
- [Interview brief for engineering leadership](${SITE_URL}/interview)
- [Infrastructure & Resiliency Lab (FinOps simulator, chaos toggle)](${SITE_URL}/sandbox)
- [Tooling stack](${SITE_URL}/uses)
- [Machine-readable profile (JSON)](${SITE_URL}/ai-briefing.json)

## Founder's Log — vision series

${founders.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join("\n")}

## Recent articles

${latest.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join("\n")}

## Full archives

- [Full article corpus, plain text](${SITE_URL}/llms-full.txt)
- [Blog index](${SITE_URL}/blog)
- [RSS feed](${SITE_URL}/rss.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(md, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
