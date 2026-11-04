# Brief for the sites-lab session: keyword gaps, speed and tracking (4 November 2026)

Owner of this repo: the session working in `D:\Streamer OS\sites-lab` (images / calc / math / tools). This brief comes from a read-only audit; nothing in sites-lab was edited. Follow `STANDARDS.md` and the repo's existing page patterns. Do not add new apps: everything below is pages and fixes inside the four existing sites.

## 1. Evidence (DataForSEO via treg, 4 Nov 2026; volumes are monthly Google searches, KD is DataForSEO difficulty 0 to 100; India for images/calc/math, US for tools)
The SERPs for these terms are full of small single-purpose pages with the exact term in the title ("Resize Image to 20KB"), not big brands. Search Console shows no impressions for any of these four sites yet (days old), so these are bets, not results. Volumes are estimates; the huge generic ones (for example "age calculator" at 9.1M) are not realistic targets.

### images.streamerosai.com (India)
| Keyword | Volume | KD | Page today | Do |
|---|---|---|---|---|
| compress image to 20kb | 60,500 | 0 | `/compress-image-to-20kb` | Title/H1 must lead with the exact term; add the exam-form use (photo, signature) and a "what size does my form need" table. |
| compress image to 30kb | 6,600 | 0 | none | NEW page |
| 30 kb photo size jpg | 4,400 | 0 | none | cover on the 30 kb page (H2 + FAQ) |
| compress image to 10kb | 4,400 | 0 | none | NEW page |
| compress image to 15kb | 4,400 | 0 | none | NEW page |
| image to 20 kb / photo convert into 20 kb jpeg | 5,400 / 3,600 | 0 | covered by the 20 kb page | add as H2/FAQ phrasing |
| jpg to png converter | 60,500 | 27 | `/jpg-to-png` | harder (KD 27); polish title only |
Generate the new size pages from the existing 20/50/100 kb template. One page, one job: do not publish near-duplicate copies that differ only in the number; each needs its own intro, its own examples (what typically needs that size) and its own FAQ.

### calc.streamerosai.com (India)
| Keyword | Volume | KD | Page today | Do |
|---|---|---|---|---|
| in hand salary calculator | 33,100 | 20 | none (US-style paycheck tools) | NEW India page: CTC to in-hand (PF, professional tax, income tax slab as of FY 2026-27: source every rate with a URL and checked date). |
| salary hike calculator | 27,100 | 0 | `/pay-raise-calculator` | Retitle/H1 to "Salary hike calculator" (keep the old term in the text); India framing (hike %, new CTC). |
| ctc to in-hand salary calculator | 6,600 | 0 | none | cover on the in-hand page, or a separate page only if the intent differs enough |
| pay raise calculator | 6,600 | 0 | `/pay-raise-calculator` | keep |
| monthly salary calculator india | 1,300 | 3 | `/salary-calculator` | India angle |

### math.streamerosai.com (India)
| Keyword | Volume | KD | Page today | Do |
|---|---|---|---|---|
| percentage of marks calculator | 49,500 | 0 | none | NEW page for Indian students (marks to percentage, CGPA to percentage with the university's stated formula, sourced). |
| age calculator by date of birth | 135,000 | 12 | `/age-calculator` | retitle with "by date of birth"; keep the page's tool first. |
| date of birth calculator | 368,000 | 19 | none | cover on the age page, do not create a near-duplicate |
| how to calculate percentage | 165,000 | 8 | `/guides/percentage-formulas` | strengthen the guide (worked examples), link to the tool. |
| hours calculator | 110,000 | 19 | `/hours-calculator` | keep |

### tools.streamerosai.com (US)
| Keyword | Volume | KD | Page today | Do |
|---|---|---|---|---|
| base64 decode | 60,500 | 23 | `/base64-decode` | retitle on the exact term; add worked examples and the "decode to file/PDF" variants only if the tool really does it. |
| json compare / compare json | 9,900 | 11 to 13 | `/json-compare` | keep and enrich with examples; check the SERP titles first. |
| json to csv converter | 1,600 | 8 | `/json-to-csv` | keep |
| json schema generator | 880 | 22 | none | only if it is a real tool; do not build a stub. |

## 2. Pace and risk
- At most two NEW pages a week per site (the portfolio lost its index in July 2026 to a publishing flood). Order of value: images 30kb, images 10kb, images 15kb, calc India in-hand, math percentage of marks.
- Every number on a page (tax slabs, PF rates, formulas, exam size limits) needs a source URL and a checked date. No invented data.
- Do not publish AdSense placeholders to production pages where they add layout shift or push the tool below the first screen; keep the tool first on mobile.

## 3. Speed and tracking (applies to all four sites)
Lighthouse mobile (simulated phone), 4 Nov: tools home 83 (TBT 655 ms), calc 75 (LCP 2.0 s, **CLS 0.25**, TBT 477 ms), images and math not measured yet. Findings and requested changes:
1. Fix the layout shift on calc (0.25 is the worst measured): reserve space for the tool and ad areas, size images/fonts, no late-injected blocks above the fold.
2. Load gtag.js (177 KB) and Clarity after the first user interaction, or after `load` plus `requestIdleCallback` (timeout 3 s), or 4 s after load, whichever comes first. Keep the small GA bootstrap (dataLayer, gtag stub, `gaEvent`, click listener) inline and immediate so no event is lost.
3. Extend the click listener: link inside `header`/`nav` sends `nav_click`, inside `footer` sends `footer_click`, any other same-origin link sends `internal_link_click` (params `cta_text` max 60 chars, `link_url` path only). Existing events unchanged.
4. First screen first: lazy-load below-the-fold code in one batched step (a single dynamic import after first paint or when the user nears it), and add CSS-only skeletons with reserved height wherever something appears late.
Reference implementation of (2) and (3): `D:\Streamer OS\solar-site\src\app\layout.tsx` (`analyticsScript`). Verified: page_view, nav_click, internal_link_click and footer_click all reach GA with the deferred loader.

## 4. Measure
Re-check Search Console impressions for these pages on 18 Nov and 16 Dec; run Lighthouse before and after the speed changes and report both.
