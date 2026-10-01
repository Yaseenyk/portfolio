# Why one site indexes and the other does not

Audit of `yaseenkhatib.streamerosai.com` against `streamerosai.com`, 1 Oct 2026.
Every number below comes from the Search Console exports in `gsc/` or from the
built output in `out/` — where something is inference rather than measurement,
it says so.

---

## 1. The gap

| | streamerOS | portfolio |
| --- | --- | --- |
| Indexed | **67 of 167 — 40%** | **16 of 203 — 8%** |
| Discovered, never crawled | 7 | **86** |
| Impressions/day | ~22 | 0 |

Same host, same owner, same deploy pipeline, same registrable domain. A five-fold
difference in indexing rate is not Google being arbitrary. The sites differ
structurally, and the differences are measurable.

---

## 2. What the timeline actually shows

From `gsc/Chart (3).csv` — the "Discovered, never crawled" series:

```
2026-08-05     0
2026-08-29    70      <- backlog appears
2026-09-05    69
2026-09-15    86      <- +17
```

Against the repository history:

- **2026-07-09** — Google's one substantial crawl. 70 pages fetched, almost none
  indexed. 70 of the 87 currently in "crawled, not indexed" were last fetched
  this month and never again.
- **2026-07-27** — the final-year-projects portal ships: 62 pages, close to
  doubling the site in one commit.
- **2026-08-29** — those pages surface in Search Console as discovered and never
  crawled. Google knew about them for a month and did not fetch them.
- **2026-09-15** — plus 17, which is the content rewrite of 9 September.

**Conclusion:** the backlog is not caused by any single change. The site grew
faster than its crawl budget, twice. The campus portal accounts for roughly 70 of
it; the September rewrite added 17. Writing more pages has been making the
number worse, not better.

---

## 3. Difference one — half the URLs are worthless to a crawler

```
                 built   sitemap   stubs   noindex   junk : real
portfolio          256       133      74        49     1 : 1.1
streamerOS         156        64      26         2     1 : 2.3
```

Of the portfolio's 49 noindex pages, **45 are blog tag pages**. Google fetches a
tag page, is told not to index it, and that crawl is spent. Repeat 45 times.

The cost is visible in the report rather than theoretical: **49 of the 87
crawled-but-not-indexed URLs are redirect stubs.** More than half of all crawl
effort on this domain goes to pages whose only content is a redirect.

streamerOS has two noindex pages, and its stubs were only introduced in
September.

---

## 4. Difference two — the portfolio has no single topic

```
portfolio    /final-year-projects 62 · /blog 54 · /products 5 · /solutions 3 · 5 singles
streamerOS   /blog 41 · /features 10 · /docs 2 · /vs 1
```

streamerOS is entirely about live streaming; every page reinforces every other.

The portfolio is at once a React/Node engineering blog, a final-year-project
sales funnel aimed at Indian students, a B2B consultancy page and a product
showcase. Those are four audiences with no topical overlap.

Consistent with that: **53 of the 86 never-crawled pages are
`/final-year-projects`** — the largest section is the one least connected to the
rest of the site.

---

## 5. What is *not* the problem

Worth stating, because these are the usual suspects and the data rules them out:

- **Not thin content.** Median length is 1,534 words in `/final-year-projects`
  and 1,273 in `/blog`. One page sitewide is under 300 words.
- **Not duplicate content.** Measured earlier at 2 near-duplicate pairs in 63.
- **Not broken markup.** Sitemap valid, canonicals correct, `lastmod` accurate
  since September, nothing accidentally `noindex`, robots.txt clean.
- **Not the rewrite.** The backlog predates it by three weeks.

The site is technically sound. It is structurally diluted and nobody links to it.

---

## 6. What is working, and what it teaches

From the streamerOS performance export:

| finding | number |
| --- | --- |
| One post carries the site | `best-obs-settings-for-low-cpu-streaming` — **471 of ~1,700 impressions** |
| Mobile converts, desktop does not | CTR **2.33%** mobile vs **0.21%** desktop |
| Mobile ranks far better | position **11.5** mobile vs **25.5** desktop |
| The conversion page works | `/download` — 11.76% CTR at position 9 |

Two lessons transfer directly:

1. **One genuinely useful problem-solving post outperforms forty mediocre ones.**
   28% of all impressions come from a single OBS settings guide.
2. **Mobile is where this domain can rank today.** Position 11.5 is page one or
   two; 25.5 is nowhere. Any content decision should be checked on a phone first.

---

## 7. The backlink position

DEV.to is live and working: **53 articles published 19–23 September** under
`dev.to/yaseenyk04`, canonical URLs pointing home, roughly **10 links back per
article**. The nightly job has run 23 times without intervention.

This is too recent to have moved anything. Google has to crawl DEV.to, find the
links, and re-evaluate — weeks at minimum. It is the only lever in play that can
raise crawl budget, and it has not had time.

---

## 8. Plan

Ordered by evidence of impact, not effort.

### Now — recover the wasted crawl budget

1. **Disallow `/blog/tag/` in robots.txt.** 45 pages Google is currently fetching
   and forbidden to index. Removing them from the crawl path is the single
   cleanest win available, and it costs nothing — they are already noindex, so
   no ranking is lost.
2. **Audit the 74 redirect stubs.** They exist because retired URLs are linked
   from LinkedIn and DEV.to cross-posts, which is a real reason. But 49 are
   consuming crawl budget. Worth checking which still receive traffic and
   retiring the rest.
3. **Trim the sitemap.** 133 URLs compete for a crawl budget that fetched ~10
   pages in September. Submitting the 25–30 pages that genuinely matter
   concentrates what little attention the site gets.

### Next — fix the topical split

`/final-year-projects` is 62 of 133 sitemap URLs, 53 of 86 never-crawled, and a
different audience from everything else on the domain. Three honest options:

- **Move it to its own domain.** Cleanest. It gets a topic, and so does the
  portfolio.
- **Commit to it.** Accept the site is a student-projects business with an
  engineering blog attached, and make the homepage say so.
- **Leave it.** Then expect both halves to keep underperforming, because neither
  can tell Google what the site is about.

This is a business decision, not a technical one, and it is the largest single
factor after links.

### Ongoing — referring domains

DEV.to is running. Add a second source with the same canonical pattern —
Hashnode reuses the existing pipeline almost unchanged. Then stop: two working
syndication channels beats five half-configured ones.

### Free and immediate

Request indexing manually in Search Console for the ten pages that matter most.
It bypasses crawl budget for those URLs, and ten is the realistic daily limit.

### Stop doing

**Writing more pages.** There are 53 blog posts Google will not read and 86
pages it has never fetched. Page 54 changes nothing until crawl budget exists.

---

## 9. What this audit cannot tell you

Being explicit about the limits:

- **Which 16 pages are indexed** is inferred by subtracting the not-indexed
  reports from the sitemap, which leaves ~13. Search Console does not export the
  indexed set directly.
- **Whether DEV.to will work** is unknown until Google recrawls it. The links
  exist and are correctly formed; the outcome is not yet observable.
- **Why Google chose this crawl budget** is not observable at all. The
  correlation with zero referring domains is strong and is the standard
  explanation, but it remains inference.

---

## 10. What changed on 1 October, after this audit

Recorded here so the numbers above are not read as current.

| | before | after |
| --- | --- | --- |
| Blog posts | 53 | **34** |
| Sitemap URLs | 127 | **108** |
| Titles over 60 characters | 76 | **0** |
| Descriptions over 160 | 105 | **1** |
| `/blog/tag/` crawled | yes | **disallowed in robots.txt** |

**Nineteen posts deleted** — the React and Node rewrites of 9 September. They
were written without access to any real incident, measurement or decision, so
they read as interchangeable with ten thousand other tutorials from domains with
actual authority. Seventeen of the nineteen were never crawled. Every retired
slug now redirects in one hop to the nearest surviving first-person post, so the
Rust-era URLs linked from LinkedIn and DEV.to still land somewhere real.

**On streamerOS**, the trailing-slash fix was serving a second full copy of
every page. Replaced with redirect stubs: indexable pages 128 → 73, duplicate
titles and descriptions 126 → 0.

**Technical SEO now passes every check on both sites** — titles, descriptions,
canonicals, OG and Twitter tags, viewport, `lang`, a single `<h1>`, JSON-LD,
image alt text, sitemap declared in robots, `lastmod` on every URL, HTTPS
redirect. The only markup gap left is 20 portfolio pages without an `og:image`.

**None of this will show in Search Console quickly.** Every change needs a
recrawl to register, and slow recrawling is the problem being fixed. Read the
numbers again in 4–6 weeks, and judge them on *discovered-never-crawled falling*
rather than *indexed rising* — that is the leading indicator. If it has not
moved by mid-November, the answer is not more technical work; it is that the
referring domains still are not there.
