import { getAllPosts, FOUNDERS_LOG_SLUGS } from "@/lib/blog";
import { SITE_URL, PERSON } from "@/lib/site";
import {
  CAMPUS_PROJECTS,
  CUSTOM_BUILD_RANGE,
  SESSION_POLICY,
  formatInr,
} from "@/lib/campus";
import { GUIDES } from "@/lib/guides";
import { formatInrShort } from "@/lib/solutions";
import { VIVA_QUESTIONS } from "@/lib/vivaQuestions";

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
> production products in twelve months; open to Lead/Senior roles —
> remote, hybrid, or on-site.
> Base: ${PERSON.locality}, ${PERSON.country} (IST). Contact: ${PERSON.email}.

## Canonical pages

- [About (canonical bio)](${SITE_URL}/about/)
- [Products — architecture teardowns](${SITE_URL}/products/)
- [Interview brief for engineering leadership](${SITE_URL}/interview/)
- [Infrastructure & Resiliency Lab (FinOps simulator, chaos toggle)](${SITE_URL}/sandbox/)
- [Tooling stack](${SITE_URL}/uses/)
- [Machine-readable profile (JSON)](${SITE_URL}/ai-briefing.json)

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
- [For small businesses — hosted tools from ₹800/month](${SITE_URL}/solutions/small-business/)

## Final year projects for Indian students (BCA / MCA / B.Tech)

> Final year projects built end to end for the student — code, database,
> report, diagrams, deck and deployment. The student writes none of it. Any
> idea can be commissioned, not only the listed ones: an approved problem
> statement or the student's own concept, in any stack, quoted
> ${formatInr(CUSTOM_BUILD_RANGE.min)}–${formatInr(CUSTOM_BUILD_RANGE.max)}
> by scope.
> After delivery there are ${SESSION_POLICY.cadence.toLowerCase()} live
> ${SESSION_POLICY.platform} sessions after ${SESSION_POLICY.startsAfter} where
> the code is explained line by line, ending in a mock viva, so the student can
> defend work they did not write.
> Payment is direct (UPI / bank transfer) in monthly installments — there is no
> checkout, gateway or subscription. Each listing is capped to a small number of
> students per college per year.

- [Catalog — all final year projects](${SITE_URL}/final-year-projects/)
- [Custom project built to your problem statement](${SITE_URL}/final-year-projects/custom/)
- [For colleges — workshops and cohort mentoring](${SITE_URL}/final-year-projects/colleges/)
- [Terms — payment, delivery, cancellation](${SITE_URL}/final-year-projects/terms/)
- [Free tool: timeline planner — usable weeks before a submission date](${SITE_URL}/final-year-projects/planner/)
- [Free tool: viva question bank — ${VIVA_QUESTIONS.length} questions, filterable, with what each one tests](${SITE_URL}/final-year-projects/question-bank/)
${GUIDES.map(
  (g) => `- [${g.meta.title}](${SITE_URL}/final-year-projects/guides/${g.meta.slug}/): ${g.meta.description}`,
).join("\n")}
${CAMPUS_PROJECTS.map(
  (p) =>
    `- [${p.title}](${SITE_URL}/final-year-projects/${p.slug}/): ${p.summary} Suits ${p.degrees.join(", ")}. Stack: ${p.stack.join(", ")}. From ${formatInr(p.prices.source)}.`,
).join("\n")}

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
