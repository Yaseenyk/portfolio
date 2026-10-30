# Keyword research, competitor analysis and gaps, 30 October 2026

Four properties, one pass through treg.to (DataForSEO Labs, Moz, SE Ranking, crawl4ai SERPs),
plus our own Search Console data via the service account. 92 API calls, $0.76 spent, cap was $3.
Raw responses: `gsc/out/treg-2026-10-30/` (gitignored). Rerun recipe at the end.

Volumes are monthly Google searches for the stated country (US unless noted, India for campus).
KD is DataForSEO keyword difficulty 0–100; a blank KD means the provider has not computed one,
which only happens on low-volume terms. CPC is the Google Ads cost per click, a proxy for how
commercial the query is. SERP rows came back partial for some queries (4 to 10 results).

## Where we stand, all four sites

| Site | Indexed (GSC) | Keywords ranked (DataForSEO, top 100) | Impressions, 90 days | Referring domains (Moz) | Domain authority |
|---|---|---|---|---|---|
| Portfolio | 0 / 52 | 0 | 0 | 2 | 3 |
| streamerOS | 57 / 78 | 14 | 328 (12 clicks) | 5 | 3 |
| Campus | 51 / 56 | 0 | 5 | 0 | 3 |
| FitRank | 36 / 39 | 0 | 2 | 0 | 3 |

Comparable competitors found in the live SERPs, same metrics:

| Competitor | Niche | Keywords ranked | Referring domains | DA | What they win with |
|---|---|---|---|---|---|
| zenvanriel.com | solo AI engineer portfolio | 1,242 | 43 | 25 | AI-engineering explainers on one blog |
| localhostlabs.tech | tiny "hire RAG developers" page | 1 | 6 | 2 | ranks #2 for "hire rag developer" with almost nothing |
| streamscheme.com | streamer guides | 8,342 | 299 | 40 | Twitch slang, Nightbot commands, chat logs, net-worth pages |
| instreamly.com | streamer sponsorship platform | 1,528 | 36 | 14 | "how to stream on twitch", "twitch banned words" |
| takeoffprojects.com | final year projects, India | 652 | 305 | 26 | one listicle per branch and degree |
| nevonprojects.com | final year projects, India | 1,741 | 452 | 35 | one page per project title, thousands of them |
| workeen.ai | AI employee scheduling | 270 | 36 | 14 | rostering and shift-pattern explainers |
| muchskills.com | skills matrix SaaS | 1,719 | 281 | 30 | team-building and growth-goal playbooks |

The pattern across every niche: the small competitors that beat us have 36 to 50 referring
domains and a few hundred ranked keywords. None of them got there through their product pages.
They got there through a body of informational pages at KD 0 to 20.

---

## 1. Portfolio, yaseenkhatib.streamerosai.com (US)

**Status.** Zero indexed pages since the June rebuild (blank-render snapshot, fixed 22 Oct, see
`seo-status-2026-10-27.md`). Nothing below matters until Google re-fetches the 52 URLs, so keep
doing the ten Request Indexing a day. The research is for what to build in the meantime.

**Hiring-intent keywords.** Volumes are small and CPCs are high, which is what a recruiting niche
looks like. The job-seeker terms ("ai engineer jobs", 12,100) are not our intent and are skipped.

| Keyword | Vol | KD | CPC | Intent | Page on our side |
|---|---|---|---|---|---|
| hire ai engineer | 210 | 14 | $53 | commercial | `/hire/` exists, title does not say "hire an AI engineer" |
| mern stack developer | 170 | 11 | $15 | navigational | `/about/` or `/hire/` |
| ai chatbot development company | 390 | 21 | $6.5 | commercial | `/solutions/ai-chatbot/` exists |
| generative ai development services | 590 | 23 | $24 | commercial | none |
| ai development services | 1,600 | 33 | $36 | commercial | none |
| custom ai agent development services | 70 | 0 | $44 | commercial | none |
| hire rag developer | n/a | low | high | commercial | none; SERP has 5 results, one is a DA 2 site |
| ai engineer portfolio examples | low | blank | – | informational | the site itself |
| mern stack developer vs full stack developer | 10 | blank | – | informational | none |

**Who ranks.** "hire full stack ai engineer": Bacancy, Andersen, LetsRemotify, Upwork, ZipRecruiter.
"senior full stack ai engineer": LinkedIn job ads and two individual sites (zenvanriel.com,
deeplearning.ai forum). "hire rag developer": Relevance Lab, Localhost Labs, two job boards,
Bacancy. The agencies hold the head terms, but the long tail is thin enough that single pages
from small sites sit in the top five.

**What zenvanriel.com does that we do not.** Same profile as Yaseen, one person, portfolio plus
blog, 43 referring domains. All 1,242 keywords come from `/ai-engineer-blog/` explainers:

| Their keyword | Vol | KD | Their position |
|---|---|---|---|
| ollama vs lm studio / lm studio vs ollama | 2,900 + 1,600 | 0 | 7 to 9 |
| claude certification / anthropic certification | 9,900 + 5,400 | 13 to 40 | 18 to 41 |
| what is ai inference | 2,900 | 23 | 48 to 57 |
| ai tokens / what is a token in ai | 5,400 + 3,600 | 12 to 18 | 42 to 53 |
| claude code workflow | 1,900 | 27 | 30 |
| building ai agents / how to build ai agents | 2,400 + 1,600 | 20 to 41 | 63 |
| ai pair programming | 2,400 | 12 | 44 |
| product engineer | 1,900 | 11 | 40 |

Our blog is written for hiring managers and ships one post a week. His is written for engineers
searching how-to questions. That is the whole difference in traffic.

**Posts and pages to build, portfolio.**

1. Retitle `/hire/` to carry "Hire a senior full-stack AI engineer" and add a short "hire a RAG
   developer" section or a sub-page. The RAG SERP is the softest commercial term found anywhere
   in this research.
2. Add "custom AI agent development" to `/solutions/` as its own page (KD 0, CPC $44). Reuse the
   Sable and concierge case material; no new claims needed.
3. Make `/solutions/ai-chatbot/` answer "ai chatbot development company" in the title and first
   paragraph (390, KD 21).
4. Start a how-to track on the blog, one explainer a week, chosen from zenvanriel's KD 0 to 20 list
   where Yaseen has first-hand material: Ollama vs LM Studio (he has an Ollama-on-Windows post on
   streamerOS already), what AI inference costs in production, Claude Code workflow, how to build
   an agent that never touches money (Sable). These are AI Blogger briefs: add them to
   `scripts/post-briefs.json` with sourced numbers.
5. "MERN stack developer vs full stack developer" and "AI engineer portfolio examples" are tiny
   but exactly on-intent; one post each, link them to `/hire/`.

**Where we are lacking.** Not indexed (in progress). Two referring domains against his 43. No
informational content for engineers, so no way to earn links or rank for anything above KD 20.
Commercial pages exist but their titles do not contain the commercial keywords.

---

## 2. streamerOS, streamerosai.com (US)

**Status.** The only site with real rankings: 14 keywords, best is "obs tuning" at position 2 from
the psycho-visual-tuning post. Search Console confirms it: 328 impressions in 90 days, nearly all
from OBS settings queries at positions 6 to 12. "streamlabs alternative" gets impressions at
position 11.6 with no page targeting it.

**Keywords with volume where a product page or post is missing.**

| Keyword | Vol | KD | Intent | Our rank | Gap |
|---|---|---|---|---|---|
| twitch chat overlay | 1,900 | 7 | informational | none | SERP has 4 weak results (streamdesignz, own3d, nerdordie) |
| obs chat overlay | 880 | 0 | navigational | none | no page |
| obs scene switcher | 110 | 0 | transactional | 41 | post exists, needs a feature page |
| obs automatic scene switcher | 110 | – | – | 35 | same post |
| obs advanced scene switcher plugin | 90 | 0 | informational | none | comparison page vs the plugin |
| obs timer plugin | 140 | 2 | transactional | none | no page |
| obs scripts | 110 | 3 | informational | none | no page |
| transparent chat overlay | 110 | 5 | informational | none | no page |
| kick chat overlay | 110 | 0 | navigational | none | no page |
| obs replay | 110 | 0 | informational | none | no page |
| obs chat dock / obs chat dock missing | 70 + 50 | 0 | navigational | none | troubleshooting post |
| streamlabs alternative | GSC: 18 impr | – | commercial | 11.6 | no page, we are already on page 2 |
| combine twitch and youtube chat | low | – | – | none | SERP has 4 results, but streamerOS monitors one chat source at a time (verified in the product repo, 30 Oct), so no page was built |
| adaptive quantization obs on or off | GSC: 45 impr | – | – | 9.3 | existing post, push to top 5 with an answer box |
| best obs settings for low end pc | GSC: 2 impr | – | – | 9.0 | existing post, same |

**Who ranks.** obsproject.com forums take "obs scene switcher" and "obs automation" outright
(10 of 17 results). "twitch chat overlay" and "combine twitch and youtube chat" are the open
ones: four organic results each, all from small sites.

**What streamscheme (DA 40) and instreamly (DA 14) do.** Neither ranks for product terms. Their
traffic is glossary and how-to: "kekw", "poggers", "sadge" (9,900 to 12,100, KD 0), "nightbot custom
commands" (12,100, KD 2), "twitch chat logs" (9,900, KD 3), "how to stream on twitch" (9,900, KD 7,
instreamly at 13 to 22), "twitch banned words" (5,400, KD 4), "how to get more viewers on twitch"
(1,600, KD 1). instreamly's DA 14 with 36 referring domains is enough to hold those.

**Posts and pages to build, streamerOS.**

1. `/features/chat-overlay/` targeting "twitch chat overlay" and "obs chat overlay" together.
   The two softest keywords with real volume in this whole research (2,780 combined, KD 0 to 7).
2. `/compare/streamlabs-alternative/`. Already at 11.6 without a page.
3. `/features/scene-switcher/` plus a post "streamerOS vs OBS Advanced Scene Switcher plugin".
4. Dropped: "Combine Twitch and YouTube chat" is not a real feature (one source at a time), and the product renders no chat overlay either, so item 1 shipped as a how-to guide at /blog/twitch-chat-overlay-obs rather than a feature page.
5. Troubleshooting posts at KD 0: "OBS chat dock missing", "OBS replay buffer", "OBS timer plugin
   options", "OBS scripts: what they are and five to install".
6. A streamer glossary section, one page per term, starting with the KD 0 to 4 terms above. This is
   the instreamly play and it is the fastest route to the 30 to 40 referring domains the others have.
7. Add answer boxes to the psycho-visual-tuning and low-end-PC posts; both already sit at 6 to 9.

**Where we are lacking.** Zero feature pages aimed at search terms; all 14 rankings come from blog
posts. No glossary or beginner track, which is where every competitor's links and volume come from.
Five referring domains.

---

## 3. Campus, campus.streamerosai.com (India)

**Status.** Indexed in five days, 5 impressions, 0 ranked keywords, 0 referring domains. Search
Console shows "bca project topics" at 86 and "final year project ppt" at 33, so the pages exist
but are not competitive yet.

**Keywords.** Almost everything in this niche is KD 0. The constraint is page count, not authority.

| Keyword (India) | Vol | KD | Intent | Our page |
|---|---|---|---|---|
| bca final year project | 880 | 0 | informational | weak (pos 89 for "bca project") |
| unique project ideas for final year students | 720 | 0 | informational | none |
| list of projects for computer science students | 720 | 0 | informational | none |
| mern stack projects github | 480 | 0 | navigational | none |
| bca final year project topics | 390 | 0 | informational | pos 86 |
| bca project topics list | 320 | 0 | informational | none |
| mern stack projects with source code | 260 | 0 | navigational | none |
| mern stack projects ideas | 260 | 0 | informational | none |
| top 10 projects in computer science | 210 | 0 | informational | none |
| bca final year project pdf | 210 | 0 | informational | none |
| mca final year project pdf | 140 | – | informational | none |
| bca final year project with full documentation free download pdf | 140 | 0 | transactional | none |
| final year projects with source code | 110 | 0 | informational | none |
| final year project ideas for bca students | 110 | – | informational | none |
| final year project ideas computer science artificial intelligence | 70 | – | informational | none |
| best mern stack projects for resume | 30 | – | informational | none |

**Who ranks.** nevonprojects, takeoffprojects, projectmart, jpinfotech, plus GitHub lists and
Scribd PDFs. "hospital management system project" is all PDFs and GitHub repos (ResearchGate,
SSRN, phpgurukul), a report-download intent.

**What takeoffprojects (DA 26) and nevonprojects (DA 35) do.** Takeoff ranks one listicle per
degree and branch: "final year project ideas for cse" (2,400, KD 0, position 14), "mini project
ideas" (3,600, KD 0), "cse final year projects" (2,900, KD 0), "java project topics list" (2,900).
Nevon ranks one page per project title, thousands of them: "ai projects" (6,600, KD 15, position
17), "project ideas" (8,100, KD 15, position 4), "bus pass system", "railway ticket booking qr".

**Posts and pages to build, campus.**

1. A hub per degree: "BCA final year project topics 2026", "MCA final year project topics",
   "B.Tech CSE final year projects". Each lists every campus project with one line and a link.
2. "MERN stack project ideas with source code" and "unique final year project ideas" listicles.
   Both KD 0, 260 to 720 each.
3. A downloadable sample project report (PDF) with its own page, to catch the "pdf" and "full
   documentation free download" cluster (about 500 searches combined). This is a real artifact the
   site can honestly offer since the service includes the report.
4. "AI projects for final year students" listicle (nevon holds 6,600 at KD 15 with position 17).
5. Per-project pages already exist (11). Keep adding one per title; that is nevon's entire model.

**Where we are lacking.** Zero referring domains, zero hub pages, and the existing project pages
are not organised under the degree-name keywords students actually type.

---

## 4. FitRank, fitrank.streamerosai.com (US)

**Status.** Indexed, 2 impressions, 0 ranked, 0 referring domains.

**The positioning problem.** "AI staffing" means recruiting to Google. The "ai staffing software"
SERP is ten recruiting tools (Zoho Recruit, Metaview, Juicebox). The term has 20 searches a month.
FitRank's own vocabulary (staff allocation, task assignment, fit ranking) has no measurable volume
and the "task assignment" SERP is to-do apps (Motion, Teamwork). Search demand in this space is
all under the word "scheduling".

| Keyword | Vol | KD | CPC | Intent | Who holds it |
|---|---|---|---|---|---|
| staff scheduling software | 12,100 | 54 | $50 | commercial | Homebase, Deputy, Sling, When I Work |
| employee scheduling app | 8,100 | 35 | $50 | commercial | same |
| scheduling software for healthcare | 590 | 1 | $66 | commercial | open |
| best employee scheduling app | 320 | 10 | $56 | commercial | listicles |
| workforce scheduling software | 260 | 26 | $49 | commercial | listicles |
| free automatic schedule generator online | 140 | 13 | $18 | commercial | tools |
| hospital scheduling software | 110 | 6 | $76 | commercial | open |
| employee schedule template excel | 480 | 9 | $10 | informational | template sites |
| work schedule template excel free download | 480 | 2 | $11 | transactional | template sites |
| automated employee scheduling excel | 50 | 7 | $36 | informational | open |
| staffing and scheduling | 8,100 | 6 | – | informational | workeen.ai at 17 |
| ai schedule maker | 480 | 11 | – | – | workeen.ai at 57 |
| ai staffing software | 20 | – | – | commercial | recruiting tools |

**What workeen.ai (DA 14, 36 referring domains) does.** Same size as us, ranks #2 for "workforce
scheduling ai" and holds 270 keywords, nearly all from rostering explainers: "what is rostering",
"rotating shifts meaning", "8 hour shift schedule", "12 hour rotating shift schedule" (all KD 0,
590 to 3,600 each). muchskills (DA 30) does the same with team-building and growth-goal playbooks.

**Posts and pages to build, FitRank.**

1. Decide the vertical. "scheduling software for healthcare" (590, KD 1, CPC $66) and "hospital
   scheduling software" (110, KD 6, CPC $76) are the two most valuable open keywords in this
   entire research. If FitRank can honestly serve a clinic or ward, build that landing page first.
2. Rename the category on the site from "staffing" to "scheduling" wherever it describes the job,
   while keeping "staffing" for the recruiting-adjacent meaning only.
3. A free tool page: "automatic schedule generator" (140, KD 13). Matches the free-tools approach
   that worked on campus, and FitRank's engine is the tool.
4. A free Excel template page: "employee schedule template" (480, KD 9) with the template to
   download, and a post on "automated employee scheduling in Excel, and where it breaks" (50, KD 7)
   that hands off to FitRank.
5. Rostering explainers, workeen's list, one a week: what is rostering, rotating shift schedules,
   8 and 12 hour patterns. All KD 0.

**Where we are lacking.** The product vocabulary has no search demand, no page targets any term
with volume, and the head terms (KD 35 to 54, CPC $50) are out of reach at DA 3. The reachable
money is healthcare scheduling and template or tool pages.

---

## Cross-site priorities

1. Portfolio: finish the re-index (user side, Request Indexing), retitle `/hire/` and
   `/solutions/ai-chatbot/`, add an AI-agent services page, start the engineer-facing explainer
   track through the AI Blogger briefs.
2. streamerOS: chat overlay feature page and the Streamlabs alternative page this week. They are
   the two cheapest wins found anywhere.
3. Campus: three degree hubs plus the MERN ideas listicle. Everything is KD 0.
4. FitRank: pick healthcare or not, then the schedule generator tool page.
5. All four: referring domains are 0 to 5 against 36 to 50 for the competitors that match our
   size. The glossary and template pages above are what earned those competitors their links.

## Rerun

```
treg catalog get dataforseo.google.keywords.ideas
python gsc/out/treg-2026-10-30/tcall.py <name> <tool-id> '<json>' [max_cost]   # ledger-capped runner, $3 budget
```

Tools used and prices paid: `dataforseo.google.keywords.ideas` ($0.012 to $0.015 per seed, depth 2),
`dataforseo.google.domain.ranked_keywords` ($0.012 to $0.03), `dataforseo.x.dataforseo-labs-google-competitors-domain-live`
($0.012), `treg.google.serp.organic` ($0.00015), `treg.web.backlinks.summary` (Moz, $0.013),
`treg.web.url.metrics` (SE Ranking, $0.003). The token is the signed-in treg CLI on this machine,
team connectmazjid. Search Console figures came from `scripts/gsc-pull.py` and
`scripts/gsc-index-status.py`.

## Shipped, 30 October 2026

Portfolio a63d472, streamerOS 8a567d4, campus 9dbcf26 and 4415190, FitRank 013c58a. Items not built and why are recorded in the per-site sections above.
