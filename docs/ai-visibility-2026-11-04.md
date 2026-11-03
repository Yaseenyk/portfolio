# AI visibility check, 4 November 2026

19 questions across the five sites, asked of ChatGPT, Perplexity and Gemini through treg (cloro providers),
from the US or India depending on the site. Raw answers: `gsc/out/ai-visibility-2026-11-04/` (gitignored).
Cost $0.16 in total. 41 of 57 answers came back: ChatGPT 19, Gemini 19, Perplexity 3. The other 16 Perplexity calls
failed on treg's own "database pool saturated" 503 after seven retries, so Perplexity is not covered yet.

## Result

None of our sites was named in an answer or cited as a source, for any of the 19 questions. Expected: the sites are
new, the portfolio has no indexed pages yet, and the other four have 0 to 22 Google clicks a month.

A single run is a snapshot. AI answers vary from run to run, so treat this as a baseline to compare against, not a
verdict.

## Who the assistants cite instead (the sites to earn a mention from, or to out-write)

| Site | Questions | Most cited sources |
|---|---|---|
| Portfolio | hire a senior full-stack AI engineer, hire a RAG developer, AI engineer portfolio examples, custom AI agent development | upwork.com (3), github.com (3), linkedin.com (2), toptal.com (2) |
| DefendIt | BCA and MCA project topics with source code, report format, viva help | github.com (3), filemakr.com (2), collegeproject.in, collegeprojectexpert.in, codeassists.com |
| streamerOS | OBS scene switcher alternative, low-end PC settings, Streamlabs alternative, Twitch chat overlay | obsproject.com (4), meldstudio.co (3), itechguides.com (2), streamer.bot, touch-portal.com |
| FitRank | hospital scheduling, free schedule generator, AI staff scheduling | deputy.com (3), qgenda.com (2), healthstream.com (2), ukg.com (2), symplr.com (2); named: QGenda, XShift AI |
| SpotAI | gym management software India, WhatsApp fee reminders, AI form check, attendance and dues | orderitnow.in (3), coachfit.in (2), g10fitness.com (2), clubzo.app (2), play.google.com (2) |

## What this suggests

- GitHub is cited for the portfolio and for DefendIt. A public repo with a clear README that targets the question
  ("BCA final year project with source code", "RAG chatbot example") is the cheapest place to get cited.
- For SpotAI, listicles such as "best gym management software in India" (orderitnow.in, clubzo.app) are what the
  assistants quote. Being listed on those, or publishing a comparison of our own, is how to get named.
- For streamerOS, the OBS forum and plugin pages are cited. A listing or a mention there matters more than a blog post.

## Rerun

`python gsc/out/ai-visibility-2026-11-04/run.py` (budget capped at $0.50, writes `results.json`, retries treg 503s).
