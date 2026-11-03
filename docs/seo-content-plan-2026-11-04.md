# Story-format content experiment, portfolio, 4 November 2026

One of five parallel sites in an experiment: five first-person posts built as stories (real scene,
problem, chapters, turning point, copyable list, answer box, FAQ), each aimed at one search keyword.
Goal: see in Search Console and GA4 whether the format earns impressions and clicks where the
standard explainer format has not. Audience: US hiring intent plus engineers.

Research cost **$0.20** of a $0.40 cap (treg.to, 28 calls). Volumes are monthly Google searches in
the US, KD is DataForSEO keyword difficulty 0 to 100. Raw responses were kept out of the repo.

## Seeds searched

| Seed | Cost | Result |
|---|---|---|
| hire rag developer | $0.012 | no related terms returned (volume below tool floor) |
| rag chatbot cloudflare | $0.012 | none returned |
| website deindexed google | $0.012 | none returned |
| cost to hire ai engineer | $0.012 | none returned |
| ai agent guardrails human in the loop | $0.012 | none returned |
| nextjs static export seo | $0.012 | none returned |
| ai agent development | $0.0145 | 21 terms, see table |
| crawled currently not indexed | $0.0128 | head term 320, KD 20 |
| rag chatbot | $0.0132 | head term 2,900, KD 12 |
| mcp server | $0.0168 | 25 terms, head 60,500 |
| ai blog automation | $0.0121 | 10 searches, dropped |
| why is my website not indexed by google | $0.0156 | only head tools (Search Console 450,000, KD 76), off target |

Empty results mean the long phrase sits below the tool's volume floor, not that nobody searches it.
SERPs (13 queries at $0.00015) and ranked keywords for three domains ($0.042) took the rest.

## Keyword table

| Keyword | Vol | KD | CPC | Intent | Who ranks (4 Nov SERP) | Story |
|---|---|---|---|---|---|---|
| rag chatbot | 2,900 | 12 | $26 | navigational | GitHub topics, tutorials, one first-person Medium story | 3 |
| how to create mcp server | 210 | 7 | $9.5 | informational | Reddit "everything I learned building a remote MCP server" at 1, Medium and GoPenAI first-person builds, Cloudflare docs at 10 | 4 |
| mcp server | 60,500 | 34 | $16 | navigational | too hard, head term | 4 (secondary) |
| mcp vs rag | 720 | 3 | $1.7 | informational | not checked | none yet |
| crawled currently not indexed | 320 | 20 | $16 | informational | Google Search Central forum threads at 1 to 3 | 2 |
| custom ai agent development | 90 | 17 | $42 | commercial | agency service pages (anfloy, rishabhsoft, hso, deviniti) | 5 |
| ai agent consultant | 140 | 2 | $36 | commercial | not checked | 5 (secondary) |
| ai agent development | 480 | 26 | $23 | commercial | agencies | 5 (secondary) |
| ai agent development company | 590 | 9 | $43 | navigational | agencies | skipped, wrong intent |
| website deindexed after publishing ai content | n/a | n/a | n/a | informational | LinkedIn post, Facebook group, Reddit r/SEO, Quora, Google forum, YouTube | 1 |
| hire rag developer | n/a | low | high | commercial | 4 Nov SERP is all definitions (AWS, Wikipedia, IBM); the 30 Oct one had agencies | folded into CTAs |
| human in the loop ai agent | n/a | n/a | n/a | informational | LinkedIn, Reddit, Medium first-person | 5 (secondary) |

## SERP findings (first-person format)

First-person and forum pages already rank for four of the five targets: Reddit and Medium
build-diaries for "how to create mcp server" and "rag chatbot", a LinkedIn post and r/SEO thread for
the de-indexing query, Google support threads for "crawled currently not indexed". Commercial
queries ("custom ai agent development") are agency service pages with no stories, so story format
is a differentiator there, not the norm. The weakest bet is story 5: "human in the loop ai agent"
volume is unmeasured and the commercial head is agency territory.

## Competitor analysis

Ranked keywords, treg `domain.ranked_keywords`, US, 4 Nov 2026:

| Domain | Keywords ranked | What they win with | Gap |
|---|---|---|---|
| zenvanriel.com | 1,213 | AI-engineering explainers: claude certification (12,100, pos 41), ollama vs lm studio (2,900, pos 7), what is an ai token (5,400, pos 48). Most positions are 17 to 75, so the count is large and the traffic modest. | Explainers, no failures or first-hand incident write-ups; nothing on indexing, RAG or MCP builds. |
| localhostlabs.tech | 1 | "what is langgraph vs langchain" (30, pos 8). A tiny hire-RAG page was #2 on 30 Oct; it is not in any top 10 on 4 Nov. | Nothing story-shaped. The hire-RAG SERP is currently open. |
| sagartamang.com | 57 | One solo-developer blog: docker on android (320 per variant, pos 10), kali on android (880, pos 24 to 27). Tutorial-with-a-twist posts, page-one for several variants. | Shows that a solo blog with one concrete build per topic ranks on many variants of one keyword. |

Three findings:

1. The solo competitor with 1,213 keywords sits mostly at positions 17 to 75. Breadth without a
   point of view gets impressions, not clicks. A story is a point of view.
2. Engineers searching build questions get Reddit and Medium diaries on page one, so Google
   already accepts first-person for this intent.
3. Nobody in these SERPs publishes an indexing post-mortem with their own Search Console numbers.
   That is the one thing here that cannot be looked up.

## The five stories

All five are MDX posts in `src/content/blog/`, dated to respect the site's own guard in
`scripts/check-schedule.mjs`: at most two posts per ISO week (the July flood is post 1's subject),
every number checked against a brief in `scripts/post-briefs.json`, no more than one question in the
prose. The owner asked for one post every three days from 5 November. The guard allows two a week
and blocks the build otherwise, so the schedule is the closest legal one:

| # | Publish | Slug | Primary keyword |
|---|---|---|---|
| 1 | 2026-11-06 | website-deindexed-after-publishing-ai-content | website deindexed after publishing ai content |
| 2 | 2026-11-12 | crawled-currently-not-indexed-blank-render-bug | crawled currently not indexed |
| 3 | 2026-11-17 | rag-chatbot-cloudflare-workers-where-it-broke | rag chatbot |
| 4 | 2026-11-20 | how-to-create-an-mcp-server-portfolio-lessons | how to create mcp server |
| 5 | 2026-11-24 | custom-ai-agent-development-agent-that-never-touches-money | custom ai agent development |

### 1. De-indexed after publishing AI content

- Secondary: google deindexed my site, ai content deindexed, scaled content abuse, recover from google deindexing.
- Episode: 88 indexed pages on 10 Jul 2026, 25 on 11 Jul, 0 impressions by 24 Jul. Cause history: 71 content
  files in five days after the 6 Jun rebuild, 28 "autonomous post via ChatGPT" commits, failed rewrites, the
  100 to 52 prune on 8 Aug, the review-gated drafter of 23 Oct. Admits the blank-render bug confounds it.
- Proof: `docs/seo-recovery.md`, `docs/seo-status-2026-10-27.md`, commits `620c8a4`, `260761e`, `git log --grep "autonomous post"`.
- Why it can win: it carries real Search Console numbers and a control site, which the page-one LinkedIn and forum
  results lack. Risk: the query is long-tail, volume unmeasured.

### 2. Crawled, currently not indexed: the blank-render bug

- Secondary: crawled currently not indexed fix, framer motion seo, nextjs page not indexed, google chose different canonical.
- Episode: Google's chosen canonical for two posts was a cinema chain's 403 page; 21 elements at opacity 0 in the
  home page HTML; fix `f285c2b` live 10:09 UTC 22 Oct; two of 52 pages re-fetched by 27 Oct; zero ranked keywords on 3 Nov.
- Proof: `docs/seo-status-2026-10-27.md` (section on the portfolio), `git show f285c2b`, `docs/seo-keyword-research-2026-11-03.md`.
- Why it can win: head term 320 at KD 20 with forum threads at 1 to 3; ours is the only page with a diagnosis, a control and a fix.

### 3. RAG chatbot on Cloudflare Workers

- Secondary: rag chatbot cloudflare workers, cloudflare vectorize rag, workers ai rag chatbot, grounded rag chatbot.
- Episode: three commits in 19 minutes on 10 Jul (`8a4b06d`, `a61fee8`, `6d4349f`), deprecated model AiError 5028,
  22 Jul free-tier cap from re-indexing every deploy (`ff617a8`), and a live curl test on 4 Nov (refusal at 0.54 against a 0.55 gate,
  a passed-gate answer saying the context lacked the answer, stale old-host sources, no delete step in the indexer).
- Proof: `worker/src/index.ts`, `worker/scripts/index-corpus.mjs`, the three commits, live endpoint.
- Why it can win: KD 12 on a 2,900 head term; most results are tutorials, ours is a failure log with real scores.

### 4. How to create an MCP server

- Secondary: mcp server example, remote mcp server, mcp server cloudflare workers, build mcp server typescript.
- Episode: one POST endpoint, four JSON-RPC methods, three tools; the 23 Oct fact-drift commit (`4ee1949`: six vs five products,
  a merged-post link, a 404 source link); the still-stale "95-article" description, left in the post on purpose.
- Proof: `worker/src/index.ts` MCP section, `worker/README.md`, `git show 4ee1949`, live curl on 4 Nov (tools/list, 202).
- Why it can win: KD 7 and first-person builds already rank; we add working method list, status codes and an honest flaw.

### 5. Custom AI agent development

- Secondary: human in the loop ai agent, ai agent consultant, ai agent guardrails, local-first ai agent.
- Episode: Sable's propose-and-confirm boundary (added 6 Jul, written up 7 Jul), opened on the 23 Oct dead-link commit, tied to
  the PR-gated drafter and the 0.55 refusal gate. The invoice example is labelled hypothetical.
- Proof: `src/content/posts/sable-ai-agent-never-touches-money.tsx`, `git show 4ee1949`, `git show 260761e`.
- Why it can win: commercial query where agencies publish service pages and no stories. Weakest evidence of the five: the Sable
  repo is private and I verified the design only from the existing write-up and commits, not from the code. Link to `/solutions/ai-agents/`.

## What was not verified

- Sable code (private). Claims are limited to the published write-up and commits.
- Search volume for the long phrases in stories 1 and 5 (below the tool floor).
- How the posts will perform. This file is the baseline: compare Search Console impressions and GA4 landing-page sessions for these five URLs from about 3 weeks after each publish date.

## Code changes that ship with the posts

- `src/lib/mdx.ts` parses a trailing `## FAQ` section (### question, paragraph answer) into `faq`.
- `src/app/blog/[slug]/page.tsx` emits `FAQPage` JSON-LD from it. The visible FAQ and the markup come from the same text.
- Five covers via `scripts/post-cover.py`, five briefs in `scripts/post-briefs.json` (status `scheduled`, so the weekly drafter never picks them).
