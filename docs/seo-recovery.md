# SEO recovery — August 2026

What happened, what was changed on 2026-08-08, and what still needs doing by
hand. Read this before adding content or re-enabling any automation.

## What happened

Google demoted the domain on **2026-07-11**. Both hostnames, same day.

Domain property (`streamerosai.com`, covers both hosts):

| Date | Indexed | Not indexed | Impressions |
|---|---|---|---|
| Jul 10 | 127 | 101 | 366 |
| Jul 11 | **66** | **164** | 212 |
| Aug 05 | 67 | 100 | 22 |

Subdomain property (`yaseenkhatib.streamerosai.com`):

| Date | Indexed | Not indexed | Impressions |
|---|---|---|---|
| Jul 10 | 88 | 86 | 178 |
| Jul 11 | **25** | **151** | 50 |
| Jul 24 | 25 | 151 | **0** |

Subtracting the two separates the damage:

- **streamerosai.com never lost indexation** — 39 → 41 indexed, stable since.
  It kept its pages and lost its *rankings*: ~188 impressions/day → ~22.
- **This subdomain lost 72% of indexed pages overnight** and went to zero
  impressions. It lost both.

The shape — broad indexing and an impression spike Jul 8–10, then a hard cut on
Jul 11 — is Google's initial-evaluation pattern on a new site. It indexed the
corpus, tested it in live results for three days, judged it, and dropped it.

### Why

Not a crawl or config problem. Every sitemap URL returned 200, robots.txt was
permissive, and the sitemap was valid. The not-indexed buckets say what
happened:

- `Discovered – currently not indexed`: **72** — Google read these URLs in the
  sitemap and declined to spend a crawl on them at all.
- `Crawled – currently not indexed`: **66** — fetched, read, rejected.

138 of ~165 URLs. About 90% of the site.

The cause is in the git history. This site was rebuilt 2026-06-06 and **71
content files landed in the first five days** on a hostname with no history,
followed by a daily `autonomous post via ChatGPT` cron and 31 more pages on
Jul 27–28. 130 content files total. `streamerosai.com` ran the same pipeline at
3 posts/week. That is what Google's scaled-content-abuse policy targets.

The July remediation attempts — `humanize all 20 AI-written posts`,
three `senior-voice rewrite` passes, `wave 1–5 reposition 40 posts`, and
`stamp updatedAt on the 40 repositioned posts for re-crawl` — did not work.
Rewriting the same corpus doesn't change its classification, and forcing
re-crawl on a host Google had already decided not to crawl spent budget that
wasn't there. Impressions were 0 before that work started and 0 after.

## What changed on 2026-08-08

### Content: 100 posts → 52

Kept:

- all 26 `src/content/blog/*.mdx` — first-hand Rust/Tauri/streamerOS
  engineering with concrete measured targets
- 21 `src/content/posts/*.tsx` covering own shipped work, product decisions and
  the Founder's Log narrative
- 5 posts earning ≥10 impressions

Deleted: **48 commodity explainers** — "what is MCP", "what is RAG", prompt-
engineering fundamentals, generic MERN/React pieces. Between them they earned
**91 impressions and 0 clicks in three months**, and Google had already
explicitly rejected most of them. They are recoverable from git history.

Their URLs now 404. That is intentional and is not a penalty — it is the
correct signal for content that was retired on purpose. GSC will report them
under `Not found (404)`; leave them there and do not "fix" them.

### Consequences of the prune, handled

- **`/claude-code` deleted.** It fronted a 13-lesson curriculum of which 12 were
  `coming-soon` and the 1 published lesson was pruned — a page promising
  content that does not exist. Its nav, footer, `about` and in-post links were
  removed with it.
- **`/roadmap` and `/anthropic-roadmap` kept**, now showing only lessons whose
  posts still exist. `/anthropic-roadmap` was ranking position 1.5 for
  "anthropic claude enterprise roadmap", so it was worth preserving.
- **`BLOG_REDIRECTS` emptied.** All 10 of its targets were themselves pruned, so
  keeping them would have pointed ten redirect stubs at ten deleted pages —
  worse than a clean 404. The mechanism stays for genuine successors.
- **14 dangling internal links repaired** across posts, hub lesson lists and
  `solutions.ts` proof entries.

### Automation stopped

Both `AI Blogger` crons are disabled — here and in `streamer-os-website`.
`workflow_dispatch` is kept so the script can still be run by hand.

**Do not re-enable the schedule.** Publishing more is the signal that caused
this. Recovery requires the corpus to shrink and stay first-hand.

### Technical fixes

- **`/docs` and `/docs/installation` 404'd in production for a month**
  (`streamer-os-website`). `actions/configure-pages` with
  `static_site_generator: next` doesn't recognise `next.config.ts`, so it wrote
  its own `next.config.js`, which Next resolved first — dropping
  `pageExtensions` and the MDX plugin, and silently removing both `page.mdx`
  routes from the export. See actions/configure-pages#107. The option is now
  removed and the workflow runs `npm run build` so the guards execute in CI.
- **Redirect stubs no longer emit `noindex`.** `noindex` plus `rel=canonical` is
  contradictory: Google honours the noindex, drops the URL and discards the
  consolidation signal. That combination is why those URLs showed as
  `Page with redirect` with validation **Failed**.
- **Homepage sitemap entry now matches its canonical** on both sites (slash-
  terminated here where `trailingSlash: true`, bare origin on the main site
  where Next normalises it that way).

### Build guards added to both repos

`npm run build` now fails if:

- `scripts/verify-sitemap.mjs` — any sitemap URL has no file in `out/`, is
  `noindex`, or is a redirect stub
- `scripts/verify-links.mjs` — any internal link points at a page the export
  doesn't contain

The `/docs` 404 survived a month because nothing checked. It cannot recur
silently now.

## Still to do — needs your hands

These cannot be done from the repo.

1. **Split the domains.** `streamerosai.com` currently hosts three unrelated
   things: OBS streaming software, a personal dev portfolio, and
   `/final-year-projects/` (a student-project service for a different audience
   and geography). Google computes site-level quality per registrable domain,
   so the weakest host drags all three. Move the portfolio to its own domain
   and `/final-year-projects/` to a third. This is the single highest-value
   remaining action and the one this repo cannot perform.

2. **Fix the `www` certificate.** `https://www.streamerosai.com` fails TLS —
   the certificate doesn't cover the `www` host, so it hard-fails instead of
   redirecting. Add a `www` DNS record pointing at GitHub Pages and let it
   provision, or drop `www` entirely.

3. **In Search Console**, after the next deploy:
   - Resubmit both sitemaps (they shrank: 164 → 115 here, and the main site's
     two 404s are gone).
   - Do **not** request indexing on the deleted URLs.
   - Use *Validate Fix* on `Page with redirect` once the noindex-free stubs are
     live.

4. **Then wait.** Site-level quality recovery runs on a months-long cycle and
   only begins after the corpus has actually changed. Track the indexed count
   on the remaining 52 posts, not impressions — indexation moves first.

## Rules going forward

- No scheduled content generation.
- A post ships only if it contains something that cannot be looked up: your own
  measurements, your own architecture decisions, your own failures.
- Publishing an explainer of someone else's product ("what is MCP") competes
  with that product's own documentation and cannot win.
- Prefer improving a post that already earns impressions over writing a new one.
