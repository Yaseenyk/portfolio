# Growth Playbook — Distribution & Authority

Internal ops doc (not a site route, not published). The content and tools are
already built; this is the copy-paste kit for getting them in front of people.
Everything here is honest, value-first, and points at pages that already exist.

- **Funnel A** — final-year students (India)
- **Funnel B** — recruiters & clients / domain authority
- **Measure with** — GoatCounter `evt-*` events (dashboard: yaseen.goatcounter.com)
- **Attribution rule** — every link you share carries `?ref=<channel>` (whatsapp, instagram,
  reddit, quora, telegram, youtube…). Messaging apps strip referrers; the tag survives.
  It shows up in GoatCounter AND is stamped onto lead records in /leads ("← whatsapp").

SEO is too slow for FYP submission season and too weak on a young domain to fix
authority alone. These channels beat organic search on speed.

---

## FUNNEL A — Student distribution

**Goal:** drive students to the free tools — Find-My-Project quiz, cost
estimator, report/synopsis templates — and let those convert to WhatsApp.

### 1. Channels, ranked by intent × speed

| # | Channel | Why | Speed |
|---|---------|-----|-------|
| 1 | **WhatsApp & Telegram college groups** | Batch/department groups, "final year project" groups. Highest intent, instant reach. Ask a senior or class rep to drop the link. | Fastest |
| 2 | **Instagram Reels + YouTube Shorts** | Where this audience discovers. Short "how to pick a project / avoid rejection" hooks → link in bio to the quiz. | Fast |
| 3 | **Reddit — Indian dev/college subs** | r/developersIndia, r/BTechtards, r/CollegeIndia, r/india. Answer real "what project should I do" threads. | Medium |
| 4 | **Quora** | Evergreen "final year project ideas for BCA/MCA/B.Tech" questions rank for years. One good answer keeps pulling traffic. | Compounding |
| 5 | **YouTube long-form + referral offer** | Project walkthroughs; pair with the 15% referral discount so happy students bring batchmates. | Slow build |

### 2. Copy blocks — paste, tweak one detail, send

All links are live pages. Keep your own voice; these are scaffolds, not scripts
to read robotically.

#### WhatsApp / Telegram broadcast

```
Final year project stress is real. I put together some free stuff that actually helps:

• A 4-question quiz that matches you to a project that fits your course + how much time you have
• A cost estimator so you know the real price range before anyone quotes you
• Ready report + synopsis templates (the format examiners expect)

No sign-up, no spam: https://yaseenkhatib.streamerosai.com/final-year-projects/?ref=whatsapp

If you want it built or mentored, message me from there — batch referrals get 15% off.
```

#### Instagram Reel / YT Short — "rejection" hook

```
[HOOK · 0–3s, on camera]
Your final year project won't get rejected for the code. It gets rejected for the synopsis.

[VALUE · 3–18s, screen recording of the templates page]
Examiners want a specific format — problem statement, objectives, methodology, timeline.
Most students guess it. I made a free template that lays out every section with a prompt
for what goes where.

[CTA · 18–22s]
It's free, link in bio. Same page has a project-matcher quiz if you haven't picked yet.

[CAPTION]
Free FYP report + synopsis templates 👇 no email needed.
yaseenkhatib.streamerosai.com/final-year-projects/templates/?ref=instagram
```

#### Instagram Reel / YT Short — "which project" hook

```
[HOOK · 0–3s]
Stop copying the same library-management project as 40 other students.

[VALUE · 3–17s]
I built a 4-question quiz — your course, what excites you, how much time you have, your
goal — and it matches you to a project you can actually finish and defend. AI, web, or mobile.

[CTA · 17–22s]
Free, no login. Link in bio.

[CAPTION]
Find your final year project in 4 questions 👇
yaseenkhatib.streamerosai.com/final-year-projects/find-my-project/?ref=instagram
```

#### Reddit reply — to a "what project should I do" thread

```
Depends on three things: your course, how much time is left, and whether you want marks,
a job, or research out of it.

Quick filter that helps —
- If you want it to help you get hired, build something in the stack you'll interview in
  (MERN or a small AI/RAG app), not whatever's easiest to demo.
- Scope to your timeline honestly. An "advanced" project you don't finish scores worse
  than a solid standard one you defend well.

I maintain a free matcher quiz + a catalog for exactly this (Indian FYP context,
BCA/MCA/B.Tech): https://yaseenkhatib.streamerosai.com/final-year-projects/find-my-project/?ref=reddit
— full disclosure, it's my site and I do offer paid builds, but the quiz, templates and
guides are free and no-signup, so use those regardless.

Happy to sanity-check your idea if you drop it here.
```

#### Quora answer — "best FYP ideas for [course]"

```
The best final year project isn't the most impressive one — it's the one you can finish
and defend in a viva. So pick against your own constraints, not a trends list.

A framework I use with students:
1. Course + examiner expectations (a BCA panel and a B.Tech panel want different depth).
2. Time left — be brutally honest; half the marks are lost to unfinished scope.
3. Your goal — top marks, a job in that stack, or research.

I put the whole thing into a free 4-question matcher plus report/synopsis templates and
topic-wise guides here: https://yaseenkhatib.streamerosai.com/final-year-projects/?ref=quora — it's
my site and paid builds are an option, but the tools are free and need no sign-up.

If you tell me your course and how many weeks you have, I'll suggest a couple of concrete
directions.
```

> Every one of these links fires a page-view, and the WhatsApp/quiz/template CTAs on those
> pages fire `evt-*` events. So a week after you start posting, GoatCounter will tell you
> which **channel** (via referrer) and which **tool** actually convert — post more of what works.

### 3. A sustainable weekly cadence

Low enough to keep up solo through submission season. Batch the filming — record
3 Reels in one sitting.

| Day | Action | Channel |
|-----|--------|---------|
| Mon | 1 Reel / Short from the script bank | Instagram + YouTube |
| Tue | Answer 2 real threads (value first, link once) | Reddit |
| Wed | 1 Reel / Short (different hook) | Instagram + YouTube |
| Thu | Answer 1–2 questions | Quora |
| Fri | Drop the broadcast blurb in 1–2 new groups | WhatsApp / Telegram |
| Sun | Check GoatCounter — which evt converted? Double down next week | Review |

---

## FUNNEL B — Backlinks & authority

**Goal:** young-domain authority was a named cause of the de-indexing. More
on-site pages won't fix it — **real inbound links and citations from places
Google already trusts** will. Everything here is value-first; none of it is link
spam, which backfires on a personal brand.

### 1. Tactics, ranked by effort × payoff

- **Contextual answers** on Stack Overflow / Reddit (r/webdev, r/node, r/reactjs, r/LocalLLaMA) / Quora — link a specific blog post *only when it genuinely answers*. Highest trust-per-link.
- **Canonical cross-posts** to Hashnode & Medium with the canonical tag pointed at your domain. You already do DEV.to — same pattern, more surface, no duplicate-content penalty.
- **GitHub presence** — profile README linking the site + the roadmap; pin the real repos (streamerOS, IntegrateX). Dev recruiters check GitHub first.
- **One genuine "Show HN"** for a real, usable thing — the live RAG concierge or the sandbox. One shot, must be real; HN punishes marketing.
- **Dev communities & directories** — Indie Hackers, lobste.rs (strict, contribute first), read.cv / Polywork-style profiles that link back.
- **Podcasts / guest posts** on Indian dev + AI channels once you have one proof asset to point to.

### 2. Answer templates — engineer side

#### Stack Overflow / Reddit — a RAG or LLM-latency question

```
The thing that bit us in production wasn't retrieval quality — it was latency and payload
size on the hot path. Two fixes that moved the needle:

1. Retrieve in parallel and stream the first token instead of waiting for the full
   generation — perceived latency drops even when total time doesn't.
2. Stop persisting your render/UI state. We split the transport record from the view model
   with a serialization adapter and the payload fell dramatically, which fixed the sync lag
   under bursts.

I wrote up the reasoning (with the trade-offs) here: [link the exact post — e.g.
/blog/latency-first-ai-serverless-hono or /blog/custom-serialization-adapters]. Happy to go
deeper on your specific setup.
```

#### Reddit r/webdev — "is MERN dead / what to learn" thread

```
MERN isn't dead, the job changed. The scaffolding (schemas, controllers, CRUD, forms) is
what AI absorbs now; the value moved to architecture, data flow, and the AI integration
layer on top of the same stack.

I shipped several products solo on exactly this — MERN core with an AI/RAG nervous system
bolted on — and wrote about which parts to leave boring vs. rebuild:
[link /blog/ai-native-dev-stack-rethinking-mern]. Not a course pitch, just the honest
version of what shifted.
```

### 3. Where to point them — best posts to link

| Page | Use for |
|------|---------|
| `/blog/the-94-percent-decision-integratex` | Flagship, concrete, honest metric |
| `/blog/latency-first-ai-serverless-hono` | Edge/RAG latency questions |
| `/blog/ai-native-dev-stack-rethinking-mern` | "MERN + AI" threads |
| `/roadmap` & `/anthropic-roadmap` | Claude / agent-engineering readers |
| `/hire` | Only in a bio / profile, never in an answer body |
| `/sandbox` | The "Show HN" candidate — it's live |

---

## Ground rules (the whole thing dies without these)

- **Value before link, every time.** Answer the actual question first; the link is a footnote. A comment that's only a link gets removed and can get the domain flagged — the opposite of what we want.
- **Disclose that it's your site.** One honest line ("full disclosure, it's mine") builds more trust than pretending to be a neutral stranger — and it's on-brand for a site whose thesis is honesty.
- **One link per answer, max.** Deep-link to the exact page that helps, never the homepage.
- **No fabricated numbers, still.** Same rule as the site: only real figures (the 94%, "five products in twelve months"). Don't let a Reddit comment invent a stat.
- **Match the room.** lobste.rs and HN punish self-promotion hard — contribute genuinely for weeks first, or skip them.
- **Read the referrer report.** GoatCounter shows which platform sent real visitors. Kill channels that don't convert after a fair trial; pour time into the ones that do.

---

**Next:** pick 2 channels from Funnel A and run the weekly cadence for two weeks,
then read the `evt-*` report.
