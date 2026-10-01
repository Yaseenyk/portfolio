# Request-indexing queue

Google has indexed 7 of 108 sitemap URLs. The rest are waiting on crawl budget
that does not exist yet. **Request indexing** in Search Console bypasses that
for a single URL, which makes it the only free, same-day lever available.

Roughly 10 submissions a day are allowed per property. This is the order worth
spending them in, and the reasoning behind it.

---

## How to do it

Search Console → **URL inspection** → paste the URL → **Request indexing**.
About 30 seconds each. Do the day-one batch, then come back in a fortnight.

Submitting a page twice does nothing. Submitting a page that is already indexed
wastes the slot.

---

## Day one — the pages that have to exist

These are the pages a human reaches for when they already know who you are: a
recruiter following a CV link, a student sent to the portal, a lead from
LinkedIn. If any single page should be findable, it is these.

1. `/about/`
2. `/hire/`
3. `/final-year-projects/`
4. `/solutions/`
5. `/products/`
6. `/projects/`
7. `/interview/`
8. `/blog/`
9. `/final-year-projects/guides/`
10. `/final-year-projects/question-bank/`

Hubs first, deliberately. A crawled hub gives Google a path to everything
beneath it, so these ten are also the cheapest way to get the rest discovered.

---

## Day two — the pages with genuine search demand

The campus pages target queries Indian students actually type, with far less
competition than anything in `/blog/`. This is the half of the site most likely
to earn an impression.

11. `/final-year-projects/templates/`
12. `/final-year-projects/planner/`
13. `/final-year-projects/find-my-project/`
14. `/final-year-projects/cost-estimator/`
15. `/final-year-projects/custom/`
16. `/final-year-projects/colleges/`
17. `/final-year-projects/journey/`
18. `/final-year-projects/ai-college-assistant/`
19. `/final-year-projects/ecommerce-mern/`
20. `/final-year-projects/blood-bank-management/`

---

## Day three — the writing that already proved itself

Google kept five blog posts, and all five are first-person and specific. These
are the surviving posts closest to that pattern, so they are the ones most
likely to be kept if they are ever fetched.

21. `/blog/shipped-5-products-solo-12-months/`
22. `/blog/linkedin-pipeline-job-search-runs-itself/`
23. `/blog/the-94-percent-decision-integratex/`
24. `/blog/sable-ai-agent-never-touches-money/`
25. `/blog/one-architect-claude-mcp-full-squad/`
26. `/blog/ai-finops-playbook-stop-burning-money/`
27. `/blog/zero-dollar-content-engine/`
28. `/blog/payload-compression-serialization-patterns/`
29. `/blog/websocket-telemetry-at-scale/`
30. `/blog/chatgpt-changed-full-stack-engineering/`

---

## What not to bother submitting

- **Anything already indexed.** The seven in the audit. Wasted slot.
- **The remaining campus project pages** beyond the three above. If the hub gets
  crawled, Google finds them; submitting fifty near-identical project pages by
  hand is a poor use of a daily limit and looks like what it is.
- **Redirect stubs.** They are not meant to be indexed.

---

## What to expect

Request indexing gets a URL **crawled**, usually within a day or two. It does
not guarantee it gets **indexed** — Google still decides whether the page is
worth storing, and that decision is the one driven by links and demand.

So the realistic outcome is that most of these get fetched, and some fraction
stay. The useful part is the diagnosis either way:

- **Crawled and indexed** → the page was fine, it was never being reached.
  Crawl budget is the whole problem, and the fix is links.
- **Crawled and still not indexed** → Google fetched it and declined. That is a
  judgement about the page, and no amount of crawl budget fixes it.

That second outcome is worth knowing. It is the difference between "nobody is
looking" and "they looked and said no", and only this test separates them.

---

## The honest caveat

Thirty manual submissions is not a strategy. It is a diagnostic, and a way to
get the handful of pages that must be findable into the index while the real
work — referring domains — takes its months.

Do not repeat this monthly. If pages are still falling out after being
submitted, the answer is upstream.
