# Is it growing or stuck? SEO status, 27 October 2026

Follow-up to `indexing-audit-2026-10-01.md`. Four properties now, all on the
registrable domain `streamerosai.com`, each a separate site to Google:

| property | what it is | since |
| --- | --- | --- |
| `streamerosai.com` | streamerOS product site | June 2026 |
| `yaseenkhatib.streamerosai.com` | portfolio | July 2026 |
| `campus.streamerosai.com` | DefendIt, the student portal (moved out of the portfolio) | 22 Oct 2026 |
| `fitrank.streamerosai.com` | FitRank product site | 9 Oct 2026 |

Every number below is measured. Where a number is missing it is because the
data does not exist on this machine, and that gap is itself a finding.

---

## 1. Verdict

| property | verdict | basis |
| --- | --- | --- |
| streamerOS | **clicks creeping up, visibility shrinking** | Search Console export to 11 Oct |
| portfolio | **stuck** | GoatCounter to 27 Oct; no Search Console export since 1 Oct |
| campus | **too early to say** | 5 days old; analytics merged into the portfolio's |
| FitRank | **unmeasurable** | 18 days old; no analytics tag at all |

Nothing is in a penalty. Nothing technical is broken. The sites that have had
time are hitting the same wall the October audit named: Google crawls, then
declines, because nobody links to them.

---

## 2. streamerOS — the only property with real search data

Source: Search Console exports pulled through sitedx on 15–16 Oct
(`../sitedx-next/testdata/streamerosai-before` for 13 Aug–11 Sep, and the
16 Oct run for 12 Sep–11 Oct). Web search only.

### Weekly trend, 60 days

```
week of      clicks  impressions  avg position
2026-08-17      1       466          8.4
2026-08-24      1       441          8.4
2026-08-31      2       445          8.4
2026-09-07      2       511          9.1
2026-09-14      4       433          9.8
2026-09-21      2       422          7.8
2026-09-28      4       250          8.6
2026-10-05      5       200         10.7
```

Two things are happening at once:

- **Clicks are growing, a little.** 5 clicks in the 30 days to 11 Sep, 17 in the
  30 days to 11 Oct. That is 1 a week becoming 4 to 5 a week. Small, but it is
  the right direction and it survived the content pruning.
- **Impressions fell by more than half** from the mid-September peak: 511 in the
  week of 7 Sep to 200 in the week of 5 Oct. Daily average 65 in the first
  window, 50 in the second, and the last two weeks are running at about 30.

### Why impressions fell

Indexed pages went **63 → 60 (19 Sep) → 52 (22 Sep) → 49 (5 Oct)**. The first
two drops predate the 1 October trailing-slash cleanup, so they are Google's
own decisions, not ours. The index-reasons export says what it decided:

```
Crawled - currently not indexed     17 pages   validation FAILED
Discovered - currently not indexed   6 pages
Not found (404)                      2 pages   (ours, retired URLs)
Page with redirect                   1 page    (ours)
```

Seventeen pages Google fetched, judged, and dropped; a validation was requested
and failed, meaning it re-checked and declined again. sitedx's engine labels
this "authority ceiling", severity High, confidence High, and that reading is
consistent with everything else here.

The impressions came from a handful of informational OBS posts, and those are
the ones losing ground:

| page | impressions | clicks | CTR | position |
| --- | --- | --- | --- | --- |
| /blog/obs-psycho-visual-tuning-explained | 436 | 2 | 0.46% | 8.0 |
| /blog/obs-encoding-overloaded-fix | 236 | 2 | 0.85% | 9.5 |
| /blog/obs-cpu-usage-preset-explained | 158 | 0 | 0% | 7.9 |
| /blog/best-obs-settings-for-low-cpu-streaming | 120 | 0 | 0% | 8.6 |
| /blog/auto-switch-obs-scenes-guide | 111 | 3 | 2.70% | 9.5 |
| /download | 45 | 4 | 8.89% | 16.4 |
| / | 34 | 3 | 8.82% | 3.7 |

Page-one positions with near-zero CTR means the titles are being shown and not
chosen. The 22–23 Oct rewrite (search-result titles, author boxes, citations,
WebP, LCP fix) targets exactly this, but it landed after this export, so its
effect is not yet visible.

### Other reads

- **Desktop carries it now:** 1,132 of 1,505 impressions, 15 of 17 clicks. The
  October audit's "mobile converts" finding has reversed; mobile CTR is 0.54%.
- **Geography:** US 595 impressions, UK 110, Canada 87, India 44. India has the
  best CTR (11%) on tiny volume, which is the brand query "streamer os".
- **AI features:** 3 impressions on 11 Oct, 0 before. Google's AI surfaces have
  only just started showing the site.
- **The brand query works:** "streamer os" is the only query with clicks (4 of
  9 impressions). Everything else is OBS informational traffic.

---

## 3. Portfolio — stuck

### What Search Console said last

The 1 October audit: 16 of 203 indexed, 86 discovered and never crawled. After
the prune, the indexing queue document counted 7 of 108. **There is no export
after 1 October.** The `gsc/` folder is gitignored and no longer on disk, and
sitedx has never been run against this property. The audit's checkpoint was
mid-November, judged on "discovered, never crawled" falling.

### What GoatCounter shows (the only live signal)

Pageviews per week, portfolio (plus campus since 22 Oct, see section 4):

```
2026-07-13   60
2026-07-20   91   <- peak, the July crawl
2026-07-27   64
2026-08-03   18   <- de-index lands
2026-08-10   30
2026-08-17    5
2026-08-24   16
2026-08-31   18
2026-09-07   21
2026-09-14   15
2026-09-21   21
2026-09-28    6
2026-10-05   13
2026-10-12    2
2026-10-19   29   <- LinkedIn topic post + campus launch traffic
```

Search-engine referrals per fortnight:

```
08 Jul – 21 Jul   20
22 Jul – 04 Aug    9
05 Aug – 18 Aug    1
19 Aug – 01 Sep    1
02 Sep – 15 Sep    0
16 Sep – 29 Sep   11   <- one blip, coincides with the DEV.to cross-posts
30 Sep – 13 Oct    0
14 Oct – 27 Oct    0
```

Zero search visits in the last four weeks. The late-September blip did not hold.
Referrers in the last 30 days: 10 from Google (all before 30 Sep), 1 LinkedIn,
1 ChatGPT, 36 direct. "Stuck" is the only honest word.

### What changed since the last audit, and whether it could have moved this

All of it is correct, none of it is the lever:

- 1 Oct: 19 posts deleted, titles and descriptions fitted, tag pages blocked.
- 7 Oct: Ahrefs verification and two inbound-link fixes.
- 22 Oct: campus moved out (sitemap 109 → 52, every near-duplicate pair gone);
  content made visible in server HTML (reveal animations had hidden it).
- 23 Oct: claims and counts corrected, chatbot service page with prices,
  keyword research committed, AI blogger revived as a PR-gated weekly draft.

The site is smaller, more honest, and topically coherent for the first time.
That is the precondition for recovery, not recovery. Whether Google has noticed
is unknowable until a fresh export.

---

## 4. Campus — too early, and the analytics are wrong

Live since 22 Oct: 56 URLs, Search Console verified, IndexNow on deploy,
Service and FAQ schema, all 11 projects opened to indexing with deep dives on
23 Oct. The 63 old portfolio URLs redirect to their new addresses with matching
canonicals (spot-checked three).

Two problems:

1. **The GoatCounter tag is the portfolio's.** `data-goatcounter` points at
   `yaseen.goatcounter.com`, so campus hits land in the portfolio's dashboard
   and paths like `/guides/` and `/colleges/` collide with nothing to tell them
   apart. Campus needs its own GoatCounter site (free), or at minimum a path
   prefix.
2. **It is a new subdomain with 56 pages and zero links.** That is the exact
   shape of the July portfolio launch. Expect "discovered, never crawled" to
   appear in its Search Console within a month. The deep dives help the
   duplicate problem; they do not create crawl budget.

---

## 5. FitRank — cannot be measured

Live since 9 Oct: 39 URLs, Search Console verified 22 Oct, page and image
sitemaps, SoftwareApplication and FAQ schema, per-page share cards, canonicals
on https. Technically fine.

**There is no analytics tag of any kind** — no GoatCounter, Plausible or Ahrefs.
A visitor today leaves no trace. There is also no keyword research for it in
`docs/keywords/`, and its 19 feature pages and 9 use-case pages pair up on the
same topics (bench management, hire-or-move, decision API, skill gap), which on
a zero-authority subdomain is a thin-content risk rather than coverage.

---

## 6. What this means

- **Growth is real on exactly one property and it is single digits a week.**
  streamerOS clicks went from ~1/week to ~4–5/week over 60 days. Impressions
  fell, so the gain is from better-chosen pages, not more reach.
- **The portfolio has had zero organic visits for a month.** The cleanups are
  done; there is nothing left to tidy. The next signal is a Search Console
  export, not another code change.
- **Two new subdomains restarted the authority clock.** Each needs its own
  referring domains. Splitting was right for topical clarity and it has this
  cost.
- **Every lever that remains is off-site:** DEV.to is the only earned-link
  source in play; the Founding Streamers outreach kit, the OBS forum resource,
  directory listings and the GitHub README copy are all written and waiting to
  be posted.

---

## 7. Do next, in order

1. **Export Search Console for all four properties** into `gsc/` (gitignored),
   or configure sitedx's Google connector (`GOOGLE_CLIENT_ID` and secret) and
   let it pull on a schedule. streamerOS now, to confirm the October rewrite
   moved CTR. Portfolio around 15 November, per the audit's checkpoint.
2. **Give campus its own GoatCounter site code.** One-line change in
   `campus-site`.
3. **Add an analytics tag to FitRank.** GoatCounter, same as the others.
4. **Post the outreach that is already written.** `docs/growth-playbook.md`
   here, `docs/launch-copy.md` in the product repo. This is the only thing on
   the list that changes the numbers in section 2 and 3.
5. **Stop adding pages** to any of the four until each has a crawl-budget
   signal that is not falling.

---

## 8. Limits of this read

- Bing and Google `site:` counts could not be obtained; the search tools here
  do not honour the operator.
- Plausible (streamerOS analytics) and Ahrefs Webmaster Tools (portfolio
  backlinks and Domain Rating) are not readable from this machine.
- The streamerOS Search Console data ends 11 October, before the 22–23 Oct
  rewrite.
- GoatCounter counts pageviews from humans with JavaScript; it undercounts but
  does not invent, so "zero search referrals" means zero.
