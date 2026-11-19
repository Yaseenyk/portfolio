# AdSense revamp, yk.streamerosai.com (19 Nov 2026)

Follows `docs/adsense-changes-2026-11-16.md` (policy basis: `docs/adsense-readiness-2026-11-16.md`). The owner lifted the
content freeze on 19 Nov 2026. AdSense rejected streamerosai.com for "Low-value content" on 16 Nov 2026, and the review
covers every `*.streamerosai.com` site together. Ads stay OFF: no ad code added, `verify-no-ads` passes.

Rule for every change: only facts read from the product repositories in `D:\Streamer OS\` (code, README, CLAUDE.md,
package.json, workflows, each repo's own 19 Nov change log) and dates read from `git log`. No numbers were invented.
Where a page could not be deepened honestly it was taken out of search instead.

Words are counted inside `<main>` of the built `out/` HTML. *The 16 Nov audit gave the five product pages only as a range (300 to 500 words), so no per-page figure is claimed.

## Page by page

| Page | Words before | Words after | Robots | What changed and why |
| --- | --- | --- | --- | --- |
| /products/defendit/ | 300-500* | 844 | index | Rewritten for the offer as it stands today (campus-site commit of 19 Nov 2026): project classes, built together in live classes, the student writes part of every module. "Built and then explained line by line" removed. New "A class, not a delivery" decision, the three tiers (Starter, Guided, Mentored) and what each includes, session policy (daily, 60 minutes, Google Meet, after 8 PM IST), noindex-until-own-content rule for the 11 project listings, UPI or bank payment with no checkout, 31 free guides, a limit on college rules about outside help, and a timeline from git log (22 Oct to 19 Nov 2026). |
| /products/exam-dates/ | 300-500* | 792 | index | Added how it works, from the exams repo: facts as typed blocks, the build check against official domains (36 blocks), the daily notice watcher that opens issues and never edits the site, the daily rebuild and the 30-day stale warning, the thin-section noindex rule. Honest limits: UPSC and two NTA sites returned HTTP 403 on 19 Nov so those blocks keep their 10 Nov date; three fee pages stay noindex. Timeline from git log. |
| /products/tool-sites/ | 300-500* | 793 | index | "Built" now lists the real tools in each of the four apps (read from their `src/app` folders). The advert decision was out of date (said a labelled box shows; since 16 Nov the slot renders nothing until approval) and was corrected. Added how it works (client-side tools, strict TypeScript and CI, where adverts may go, the 16 Nov rebuild, the dated GST correction) and a timeline. |
| /products/solar-guide/ | 300-500* | 861 | index | Fact count corrected 34 to 35 and sitemap 169 to 172 URLs (from solar-site's 19 Nov log). Added how the calculator computes (one pure function, the guidelines' own worked example, payback and the n/a case), the benchmark comparison, the 19 Nov move of four trade-publication citations to official guideline sections, English-only new sections, and two honest limits. Timeline from git log. |
| /products/esports-hub/ | 300-500* | 967 | index | "48 migrations" corrected to "about 50" (repo CLAUDE.md). Added how it works: in-browser QR and OCR with only the last four digits kept, the owner's hard limits (free plans, no money, 18+, no ID numbers stored, DNT/GPC), the single HTTP client, the three-layer rule enforced by a CI lint, noindex app routes. Limit added: v3 features are behind flags that default off. Timeline from both repos' git logs. |
| /uses/ | 286 | 809 | index | Rewritten. The old page listed a 16-inch MacBook Pro, dual 4K displays and other hardware that nothing in the repos supports (the dev machine is Windows 11), Cursor and Copilot (not verifiable), and a "roughly 10x engineering velocity" claim with no measurement. All removed. New page lists only tools a repository shows in use, with real counts: 1,132 of 1,455 commits across 14 local repos carry a Claude co-author line (git log, 19 Nov 2026); which sites run which framework; test counts already published on the product pages; hosting and automation; the retired AI blogger and why. `dateModified` 2026-11-19. |
| /interview/ | 245 | 235 | **noindex, follow** | A short brief for interviewers who already have the link; it repeats /about/ and /hire/ and has no substance of its own to add honestly. Removed from the sitemap (still linked from the nav and footer). Job title made consistent with the rest of the site ("Full Stack AI Developer" instead of "Lead MERN / AI Systems Architect"). |
| Home (Shots caption), /llms.txt, `public/ai-briefing.json` | - | - | - | DefendIt description changed to project classes, matching the campus site. |

Rendering: `app/products/[slug]/page.tsx` gained two optional sections drawn from `lib/work.ts`: "How it works" (read
from the code) and "Timeline" (dates from the git history). The `Study` type has the two new optional fields.

Sitemap: 78 URLs (interview out; the count is unchanged because a scheduled post went live).

## Blog

- Thin posts: none. The shortest indexable post is 699 words in `<main>` (`optimizing-mongodb-aggregation`); every other
  is above 750, and the 16 Nov audit found the same. Nothing was changed.
- Scheduled queue: 17, 20, 24, 26 Nov and 1, 3, 8, 10 Dec 2026, two a week, each about 960 to 1,300 words with its own
  source brief. Within the cap; not changed. `npm run check:schedule` passes.

## Gates

`npm run lint` clean; `npm run build` incl. verify-sitemap (78 URLs), verify-links (303 pages) and verify-no-ads (523
files) OK; `npm run check:schedule` OK. Checked in `out/`: the five product pages and /uses are `index, follow` and in
the sitemap; /interview is `noindex, follow` and not in the sitemap; no "built and explained" DefendIt wording left.

## What remains (needs the owner)

- Outcome numbers. The product pages still have no user or revenue numbers because none are published anywhere; they say
  so. Real numbers (event counts on Esports Hub, solar leads, tool-site visits) would be the strongest addition.
- The test counts on /uses and the product pages (640, 600, 284, 306) were checked on 14 Nov 2026, not re-run today.
  Running the tool-site tests from the monorepo root without the per-app config gives false failures; re-count per app.
- /uses says the dev machine is Windows 11 with VS Code; add hardware back only if you want it and it is true.
- /interview: if you want it indexed again, it needs real substance (for example the questions you have actually been
  asked and your answers), not more of the same summary.
- A personal portfolio adds little to a domain-level AdSense case; the guide sites carry it. Wait for a recrawl (2 to 3
  weeks) before requesting review.

## Privacy and crawl audit (19 Nov 2026)

Method: live pages loaded in headless Chromium (home, /contact/, /blog/, two product pages) with every third-party request
and cookie recorded, plus the layout code read for lazily injected scripts.

- Loaded on yk.streamerosai.com: Google Analytics 4 (googletagmanager.com, analytics.google.com, stats.g.doubleclick.net;
  cookies `_ga`, `_ga_XNCMTGDG3N`), Microsoft Clarity (clarity.ms, c.bing.com; cookies `_clck`, `_clsk`, plus Microsoft's
  `MUID`/`MR`/`SM` on clarity.ms and bing.com), Pulse (pulse.yaseenyk.workers.dev, no cookies), GoatCounter (gc.zgo.at,
  yaseen.goatcounter.com), Ahrefs Web Analytics (analytics.ahrefs.com), EmailJS (only when a form is sent), the concierge
  Worker (only when a question is asked). No AdSense, no Google Fonts request (fonts are self-hosted by next/font).
- Privacy page fixed: it did not name Ahrefs Web Analytics at all, and the Pulse text missed what it records (country,
  network name, clicks, form name on submit), the daily-rotating visitor code and 90-day deletion. Rewritten as one list
  per service with what it collects, its cookies and the opt-out (GA opt-out add-on, Microsoft privacy statement, DNT/GPC
  for Pulse). AdSense "future use" paragraph kept.
- Crawl: robots.txt allows crawling and names the sitemap. All 78 sitemap URLs return 200, none redirects, none is
  noindex, every canonical matches its URL, none is blocked by robots.txt.
- Raw HTML: the main text is in the static HTML on every sampled page (home about 1,600 words, /blog/ about 1,900).
