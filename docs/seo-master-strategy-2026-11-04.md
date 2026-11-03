# SEO and AI-search master strategy, 4 November 2026

One plan for all five sites, built on what we measured (30 Oct and 3 Nov keyword passes, 4 Nov AI-visibility
baseline, Search Console inspection) plus what the 2026 research says gets pages cited by AI assistants.
New treg research this pass: 15 keyword-idea calls, **$0.20** (tool `dataforseo.google.keywords.ideas`, 15 seeds; volumes are monthly Google searches, KD is DataForSEO difficulty 0 to 100).

## 1. What the evidence says (so we do not chase myths)

| Finding | Source | What we do with it |
|---|---|---|
| Cited pages are often not in the Google top 10: one 2026 study of 153k citations found 77% were outside it; another (Ahrefs, 2025) found 76% of AI Overview citations were inside it. Studies disagree, so rank and citation are two jobs. | [Everything PR roundup of six studies](https://everything-pr.com/how-ai-engines-cite-the-web-the-six-studies-that-define-the-2026-evidence-base) | Do both: rankable pages, plus pages written to be quoted. |
| Perplexity cites about 16 sources per answer, Google about 12, ChatGPT about 7. | [arXiv 2604.25707](https://arxiv.org/html/2604.25707) (602 prompts) | Perplexity is the easiest assistant to appear in; check it first when we measure. |
| Cited URLs are about 26% fresher than Google organic results. | Ahrefs, via [crowdo](https://crowdo.net/blog/?p=2755) | Visible "updated" dates, and real updates, not date bumps. |
| Statistics, sourced numbers and original data raise citation odds. | Princeton GEO paper (2024), Semrush analysis | Every story carries one number only we have (our own commits, logs, Search Console). |
| Schema markup shows **no meaningful citation lift** (Ahrefs, 1,885 pages, May 2026). | [alexcloudstar summary](https://alexcloudstar.com/blog/generative-engine-optimization-geo-2026/) | Keep the JSON-LD we have (it helps Google rich results); do not add more expecting AI gains. |
| Reddit is a leading source for Perplexity and Google AI Overviews (shares reported at 47% and 21%, from secondary summaries; unverified). | Otterly and Wellows, via blog summaries | Genuine answers under the user's own account, never promotion. |
| A few strong third-party mentions beat many directory entries; a consistent entity name matters. | [AEO small business playbook](https://tsm-astro-website.pages.dev/blog/aeo-strategy-small-business-playbook) | One name per site everywhere; five good mentions, not fifty listings. |

Caveat: most of 2026's "AEO" writing is vendor blogs citing each other. Treat numbers as direction, not law.
Our own baseline (0 of 19 questions name us) is the only number that matters; we re-measure it.

## 2. Which sites to push, and why

Ranked by (demand we can reach) x (our right to win) x (value of a visit).

| # | Site | Verdict | Reason |
|---|---|---|---|
| 1 | **DefendIt** (campus) | Push hardest | Biggest reachable demand: BCA/MCA project terms at KD 0. A real 21-page sample report, an 83-question viva bank and per-project pages that competitors (filemakr, nevonprojects) do not have. |
| 2 | **streamerOS** | Push | Already ranks 11 keywords, one at position 1. Terms with real volume at KD 0 to 20. Product and audience match. |
| 3 | **SpotAI** | Push selectively | Small market but a reachable bar (gymforce.in at DA 9). Utility pages (calculators) are the proven play; two already built. |
| 4 | **Portfolio** | Protect and convert | Low volume, high value per visit. Goal is hiring intent and AI citation, not traffic. Indexing is the blocker (3 of 56). |
| 5 | **FitRank** | Hold | Hospital scheduling is dominated by Deputy, QGenda, UKG. Keep the existing pages and tools; no new content bet until the others show results. |

## 3. Shared principles (all sites)

1. **One page, one job, one keyword.** A near-duplicate page is a "do not index" signal. Never add a page that
   a sibling already answers; improve the sibling.
2. **Story as the wrapper, answer as the core.** Open with a 2 to 3 sentence direct answer (the thing an AI
   quotes), then the first-person episode, then the steps. Use the structure: answer box, what happened
   (dated, with evidence), what I would do again, FAQ.
3. **Own evidence.** Each page contains at least one fact nobody else can publish: a commit, a log, a measured
   number, a screenshot, a count. No invented customers, quotes or metrics (site rule).
4. **Pace.** At most two new pages a week per site. The July 2026 de-index came from publishing floods.
5. **Entity consistency.** Names: "Yaseen Khatib", "streamerOS", "DefendIt", "FitRank", "SpotAI". Same one-line
   description everywhere (site footer, GitHub README, LinkedIn, directory listings, `llms.txt`).
6. **Measure monthly.** Search Console + the dashboard for rank; `gsc/out/ai-visibility-2026-11-04/run.py`
   for AI answers (cap $0.50). Compare 18 Nov, 16 Dec, 15 Jan.

## 4. Site plans

### 4.1 DefendIt (campus.streamerosai.com): pillar and cluster

Positioning: **"build it, understand it, defend it."** The story: a student who can explain every line passes
the viva; copy-paste projects fail it.

New data (India, KD 0 unless noted):

| Keyword | Vol | Covered today? | Action |
|---|---|---|---|
| what is a viva | 2,400 | **no** | Pillar explainer: what a viva is, what examiners test, how to prepare. Link to the 83-question bank. Story: what the examiner actually asked. |
| what is viva exam | 880 | no | Same page (secondary keyword). |
| bca project / bca project topics / bca final year project topics | 480 / 390 / 390 | `bca-topics` guide | Retitle and refresh this guide around "bca project topics", add the sample-report link. |
| mca project | 320 | partly (`/for/mca`, degree comparison) | Strengthen one MCA topics guide; do not add a second. |
| bca final year project pdf / with documentation | 210 / 140 | sample report page | Make `/sample-project-report/` the PDF-intent landing page, with a clear download. |
| project viva | 210 (KD 2) | viva questions guide | Already adjacent; tighten title. |
| practical viva questions | 170 | no | One section inside the viva pillar, not a new page. |
| hospital management system project | 1,300 | no guide | One build story with source-code angle. |
| face recognition attendance system | 4,400 | no | One build story; real build or skip. |

Structure (hub and spokes): `Viva hub` -> {what is a viva, viva questions by subject, how to answer "explain
your project", mistakes}; `Topics hub` -> {BCA, MCA, B.Tech CSE, B.Sc IT}; `Report hub` -> {format, sample,
synopsis}. Each spoke links to its hub and to two siblings. Six `/for/<degree>` pages overlap 70 to 97%:
keep them noindex until each has its own topic list and a degree-specific example.

Story angles (true or labelled hypothetical): "the question that sank a project I built myself", "what a
viva panel looks for in the first two minutes", "I rewrote one student project three ways; here is what each
version could and could not defend".

### 4.2 streamerOS: own the "OBS problem" searches

Positioning: the honest local-first alternative for streamers on low-end PCs.

| Keyword | Vol | KD | Covered? | Action |
|---|---|---|---|---|
| obs encoding overloaded (+ fix) | 1,600 + 110 | 0 | yes, page exists | Already our best; add fresh data (a measured before/after) and a visible update date. |
| streamlabs vs obs | 1,000 | 0 | **no** | One honest comparison: where each fits, where ours fits. |
| best obs settings for streaming / obs settings for streaming | 390 + 260 | 0 | bitrate page exists | Merge intent: an "OBS settings by PC class" page linking the specialised ones. |
| streamlabs alternative | 140 | 2 | yes | Keep; refresh. |
| streamelements shutting down | 720 | 0 | **verify first** | Only if true and sourced; check news before writing anything. |
| twitch alerts | 1,600 | 3 | partly | Hold; broad intent. |
| obs scene switcher | 110 | 0 | yes | Keep. |

Do not chase "obs" (201k, KD 49) or "streamelements" (90k): navigational intent, other companies' brands.
AI angle: assistants cite obsproject.com and meldstudio.co; earn a mention on the OBS forum/resources and
r/obs by answering real questions, with a disclosed link only where it solves the asker's problem.

### 4.3 SpotAI: utility pages and one honest listicle

| Keyword | Vol | KD | Action |
|---|---|---|---|
| gym management software | 1,300 | 27 | `/for-gym-owners/` retitled around it (done earlier); add what it costs, from site facts only. |
| gym software | 720 | 22 | Story guide scheduled 8 Nov. |
| gym software india | 70 | 52 | Hold; covered by the same pages. |
| 1RM calculator | 5,400 per variant | 15 to 21 | Built (`/guides/one-rep-max-calculator/`); keep improving, it is the link magnet. |
| gym membership fees | 480 | 6 | Fee calculator built. |
| best gym management software in India | 110 | n/a | **Comparison listicle** naming only competitors described from their public pages; AI assistants quote these. |

Off-site: three real directory listings (Capterra India, GetApp, SoftwareSuggest) and the listicles that
assistants cited (orderitnow.in, clubzo.app) are where mentions come from.

### 4.4 Portfolio: be the answer for "hire" questions

| Keyword | Vol | KD | Action |
|---|---|---|---|
| hire ai engineer | 210 | 14 | `/hire/` is the page; sharpen the first paragraph into a quotable answer (who, what, price model, how to start). |
| ai engineer jobs | 12,100 | 0 | Wrong intent (job seekers); ignore. |
| rag developer | 20 | 74 | Too small and hard; the RAG story post covers it. |

The portfolio wins by proof, not volume: the dashboard page, the RAG post, the MCP post, the repos. AI
assistants cite github.com for these questions, so keep READMEs tight and linked to the posts. Once the
profile README repo exists, link the five products from it.

### 4.5 FitRank: hold

No new content. Keep what exists, make sure it stays indexed, revisit after the 18 Nov check.

## 5. Calendar (next 6 weeks)

| When | Do |
|---|---|
| 5 to 24 Nov | Scheduled stories release (SpotAI/FitRank 5, 8, 11, 14, 17; portfolio 6, 12, 17, 20, 24). Verify each returns 200 and is submitted. |
| Week of 9 Nov | DefendIt: "what is a viva" pillar; retitle the BCA topics guide. streamerOS: "streamlabs vs obs". |
| Week of 16 Nov | SpotAI: "best gym management software in India" comparison. DefendIt: sample report landing page tidy. |
| 18 Nov | First read of Search Console and the dashboard for the 25 stories. Re-run AI visibility (Perplexity first). |
| Week of 23 Nov | Double down on the format and keywords that moved; pause the ones that did not. |
| 16 Dec | Second read; decide which sites keep getting content. |

## 6. What not to do

- Do not publish more than two pages a week per site.
- Do not add schema hoping for AI gains; do not stuff FAQ blocks.
- Do not target navigational brand terms (obs, streamelements) or wrong-intent heads (ai engineer jobs).
- Do not buy links or mass-submit directories; five real mentions beat fifty listings.
- Do not claim features, customers or numbers the repos do not show.
