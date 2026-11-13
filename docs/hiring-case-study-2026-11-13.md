# Hiring case study, 13 Nov 2026: why recruiters and clients are not responding

Goal: permanent roles and freelance work, from recruiters and buyers worldwide.
Method: read the resume (`public/Resume.pdf`), the live site, GitHub and LinkedIn; pulled 75 live LinkedIn postings
and search demand through treg (about $0.11 of the $1 budget); web searches on recruiter behaviour.
Everything marked MEASURED comes from data pulled that day. Everything marked READ is what is on the page. Anything
else is labelled as an opinion.

## 1. The finding that explains most of it

**MEASURED. Nobody finds the portfolio through Google, so it never gets the chance to impress.**
Search Console, last 3 months, `yk.streamerosai.com`: 0 clicks, 80 impressions, average position 39.8. The 80
impressions are for the wrong things: "billing software", "meal kit delivery app development", Spanish and German
delivery-app queries, "crm pricing". No query contains hire, freelance, engineer or developer.
Whoever reaches the site is someone you sent there. So the funnel is: resume, then LinkedIn, then outreach. The
portfolio only has to convert people who arrive, and today the resume decides whether they ever click.
(GA4 visitor numbers were unavailable that day, so how many arrive is unmeasured.)

## 2. What the market asks for (MEASURED, 75 postings, 13 Nov 2026)

Three searches of 25 postings: Hyderabad senior AI/full-stack, India-remote AI/React/Node, Hyderabad full-stack.

- **Crowded lane:** Hyderabad full-stack roles show a median of 200 applicants (LinkedIn's ceiling); 16 of 25 are over 100.
  Plain "MERN full-stack" competes with everyone. Applicant counts are rough: LinkedIn caps at 200 and shows 25 when it
  does not know.
- **Asked for beyond React/Node** (share of the 25 senior AI/full-stack postings that mention it): testing 19, leadership
  or mentoring 19, CI/CD 17, system design 15, end-to-end ownership 11, agents 9, AWS 8, Azure 7, LLM 7, RAG 6.
  In the Hyderabad full-stack list: React 13, Node 10, Python 10, Azure 10, AWS 9, Docker 9, Kubernetes 7, LLM 8.
- **Titles worth searching:** "Forward Deployed Engineer" (twice), "Full Stack Developer, GenAI", "Full stack Native AI, Node & React",
  "AI Native Software Engineer". A secondary source (a video, not verified) claims forward-deployed postings grew 350% in a year.
  The role is an engineer who embeds with a customer and owns an AI system end to end. That is close to what Path Saathi
  (live one day after the brief) and your solo products show.
- Only 2 of 75 postings show a salary.

## 3. What people search when they want to hire (MEASURED, Serpstat, monthly, US / India)

| Search | US | India |
|---|---|---|
| ai engineer jobs | 12,100 | 9,900 |
| full stack developer jobs | 2,900 | 5,400 |
| hire react developer | 1,000 | 880 |
| ai chatbot development services | 880 | 590 |
| ai agent development company | 720 | 1,900 |
| hire full stack developer | 720 | 720 |
| full stack developer for hire | 720 | 720 |
| mvp development services | 590 | 720 |
| custom ai solutions | 590 | 260 |
| hire ai developer | 590 | no data |
| hire node js developer | 390 | 320 |
| hire ai engineer | 320 | no data |

Near zero (about 150 or fewer): hire rag developer, hire llm developer, hire mern stack developer, freelance ai developer, freelance ai engineer.
**Buyers search for the outcome (chatbot, agent, MVP), not the technique (RAG, MCP, LLM).** The cost-per-click column
returned absurd values for some rows, so ignore it.

## 4. Where the profile is losing people

### a. It says four different things (READ, verified)
- Titles: resume "Senior MERN Stack Developer · AI Systems"; site "Senior Full-Stack AI Engineer"; LinkedIn About "Senior AI
  Systems Architect and Full-Stack Developer"; employer title "Senior Software Developer".
- Product count: resume "seven", site "six", blog "five", home page "17 builds".
- A recruiter who sees two numbers for the same thing stops trusting both.

### b. The resume is built for admiration, not for a 7-second screen
- An eye-tracking study (TheLadders, 2018) found recruiters spend about 7.4 seconds on a first pass, almost 80% of it on name,
  current title and company, previous title and company, and dates.
- Yours opens with a coloured band of five statistics (5+, 7, 94%, 2x, "34 articles"). "34 articles" reads as content marketing.
- Personal products come before the job history, and the current job (Sparity) has two lines with no numbers. It is your
  strongest line and it is the thinnest.
- Proof is effort, not outcome: "190 API tests", "24,292 lines of Rust", "306 tests". Hiring managers read outcomes: users,
  money, time saved. Nowhere on the resume or site is a user count, a client, a revenue figure or a saved-hours figure.
- Three pages. Layout is two-column with a colour band and text boxes. Sources disagree on whether that parses in ATS software
  (one test site says fine, three say two columns are the top breaker), so keep a plain single-column version for online applications.
- Against the postings: no cloud provider (AWS, Azure, GCP) anywhere, no mention of mentoring or leading, no CI/CD or system
  design owned at a job. If those are true, they must be on the page. If they are not true, do not add them.

### c. GitHub looks empty at a glance (MEASURED via the GitHub API)
64 public repos, 0 stars on every one, 5 followers, many with no description (erp-be, SIT-FE, jev-ai-fe, bsit-college, ...).
Recruiters open GitHub late in the process; the first screen is a pile of clutter.

### d. LinkedIn
1,525 followers, 500+ connections: a good base. I could not read the headline, so check it and Open to Work yourself.
The About section is the third title variant. The profile also advertises an automated posting pipeline; some readers see
automation as spam. Keep it as an engineering case study, not as the feed's main voice.

### e. The home page: the structure is right, the wording is the problem
The hero already has two clear doors ("Need it built?" and "Hiring?"), which is the right design for both goals. What was
wrong was the language and the price: the freelance price was in rupees only, the copy used terms buyers do not search ("RAG
pipelines", "agent orchestration"), and the home page read at college level (Flesch reading ease 38; the hire page and
articles score 54 to 60, and the plain-English pages are easier for a 7-second skim).

### f. Content check with treg (MEASURED)
treg has no AI-text detector or writing grader, so this used its page audit and live search results, plus a manual read.
- On-page audit scores are high (home 97, hire 100, articles 100, products 98, solutions 96): titles, descriptions, canonicals,
  no broken links. Technical SEO is not the problem.
- Two titles were off: Products was too short (24 characters) and Solutions too long (71).
- The audit flagged "no image alt" and "misspelling". Both are false alarms: the home images use empty alt on purpose
  (decorative, inside links that already have text), and the "misspellings" are MERN, LLM and names.
- Reading level: home page is the hardest page on the site. Fixed in the hero and the /hire/ page.
- **Search results for the head terms are agencies.** For "ai chatbot development services" and "ai agent development company"
  the first page is all agency pages and "Top 10 companies" lists; for "hire full stack developer" it is agencies, Reddit, Upwork
  and Indeed. A solo site will not outrank those soon. For freelance work, the faster routes are Upwork or similar profiles,
  directory listings and direct outreach, with the site as the place the lead lands.
- "Forward deployed engineer" searches return roadmaps and explainers, not portfolios: an opening for a clear portfolio page.

## 5. Words to use

One headline everywhere (resume, LinkedIn, GitHub, site). The pairing is what recruiters type into search:
> **Senior Full-Stack AI Engineer · React, Node.js, TypeScript · LLM and RAG systems in production**
>
> (Chosen because the site, GitHub and most job titles already say "Full-Stack AI Engineer"; the resume and LinkedIn were the odd ones out.)

Resume summary (every fact is already in the current resume):
> Senior full-stack engineer with 5 years shipping production web systems in React, Next.js, Node.js, TypeScript and MongoDB or
> PostgreSQL. Since 2025 I own the LLM and agent layer of production MERN systems at Sparity: RAG pipelines, function-calling agents,
> MCP servers. Cut dashboard response times 1.5 to 2x by profiling MongoDB aggregations; moved a team from JavaScript to TypeScript
> and Next.js. Own a system from schema to deployed UI, including a client learning platform live one day after the brief.
> Open to senior full-stack, GenAI and forward-deployed engineering roles: remote, hybrid or Hyderabad.

For buyers, lead with the outcome and a fixed offer, in dollars (fill the bracketed numbers only with real ones):
> **AI chatbot for your business, answering from your own documents. Fixed price from $[x], live in [n] weeks.**
> **Your MVP as a working web app, not a slide deck. From $[x].**
> **An AI agent that does [one named job] inside your tools, with a person approving every action.**

Use "AI chatbot", "AI agent" and "MVP" in titles and headings. Keep "RAG" and "MCP" in the body for people who know them.

## 6. What to do, in order

**This week**
1. Pick one title and one product count (count what is live and linkable) and apply them to resume, LinkedIn About, GitHub bio,
   site hero, meta tags and the blog posts that say "five".
2. New resume, one page, single column: name, headline, 4-line summary, **experience first** (Sparity with 4 to 5 bullets,
   each with a number you can defend), then 3 projects with one outcome each, then skills grouped by what postings ask for.
   Keep today's design as a "designed" version to send to people, not to upload to application portals.
3. Gather real outcomes: users, usage, hours saved, requests served, anything a stranger could verify. One measured sentence
   beats "190 tests".
4. LinkedIn: headline from section 5, About rewritten, Open to Work set to recruiters only, three Featured items (best
   case study, CV, live demo), top skills React, Node.js, TypeScript, LLM, RAG, and ask two former colleagues for recommendations.
5. GitHub: pin 6 repos with descriptions and a screenshot, make the rest private or archive them.

**Next two weeks**
6. Apply by hand to 10 to 15 well-matched roles a week, early. LinkedIn can filter to jobs posted in the last 24 hours and to
   under 10 applicants (the search tool used here supports both). Target the titles in section 2. Send the one-page resume plus
   one project link, not the whole site.
7. Home page: one hero, two plain buttons ("I'm hiring" and "I need something built"), proof line with an outcome, Download CV,
   "Book 20 minutes". Move the long catalogue lower.
8. Freelance: three fixed-price offer pages (chatbot, MVP, one agent) with a price in dollars, steps, what you need from the
   client, and a FAQ. Use no testimonials until you have real ones; ask the Path Saathi client and MSA colleagues now.
   Open an Upwork profile titled for one offer, not for the whole stack.

**This month**
9. If Google traffic still matters: three pages aimed at "AI chatbot development services", "AI agent development", "MVP
   development services" (590 to 1,900 searches a month each). Skip "RAG developer": nobody searches it.
10. Outreach: find the hiring manager or founder at 30 target companies and write 4 lines with one relevant project. This is where
    the rest of the treg budget (about $0.89 left) is best spent, on contact lookup, not on more research.

## 7. What this cannot tell you
- Whether recruiters are opening the resume or the site: GA4 was unavailable, and opens in the inbox are invisible.
- Your LinkedIn headline, Open to Work state and search appearances.
- Whether the roles you applied to were a fit. The postings here show demand, not how your applications were received.

## 8. Ready to paste (LinkedIn and GitHub)

I cannot edit LinkedIn or pin GitHub repos from here. Every fact below is already on your resume or site.

**LinkedIn headline**
> Senior Full-Stack AI Engineer · React, Node.js, TypeScript · LLM and RAG systems in production · Open to senior roles and freelance builds

**LinkedIn About** (the first three lines are what shows before "see more")
> I build web products from database to screen, then put AI inside them.
>
> For five years I have shipped full-stack systems in React, Node.js, TypeScript and MongoDB: hospital information systems, analytics
> dashboards and, since 2025 at Sparity, the LLM and agent layer of production MERN systems (RAG pipelines, function-calling agents, MCP servers).
>
> On my own I have shipped six products you can open: an AI gym app whose form check runs on the phone, a distilled AI decision model
> that beats a rules-only baseline, a Rust desktop app for streamers, and more. A client learning platform of mine was live one day
> after the brief.
>
> Looking for: senior full-stack, GenAI or forward-deployed engineering roles (remote, hybrid or Hyderabad). I also take fixed-price
> builds: AI chatbots on your documents, agents and MVPs.
>
> Portfolio: yk.streamerosai.com

**LinkedIn Featured:** plain CV (`/Resume-ATS.pdf`), `/hire/`, the SpotAI case study, the FitRank case study.
**Top skills (pin 5):** React, Node.js, TypeScript, Large Language Models, Retrieval-Augmented Generation.
**Open to Work:** recruiters only, with the titles "Full Stack Engineer", "AI Engineer", "Forward Deployed Engineer".
**GitHub pins (6):** portfolio, fitrank-website, spotai-website, streamer-os-website, analytics-dashboard, linkedin-bot. Give each a one-line
description and a screenshot. Repos with no description and no stars (erp-be, erp-fe, SIT-FE, SIT-BE, bsit-college, jev-ai-fe, the site-*
repos) are best made private or archived. That is your call, so I did not touch them.

## 9. What was changed on 13 Nov 2026

Done in the repo:
- `public/Resume.pdf` regenerated (the old file still showed an outdated domain). Title is now "Senior Full-Stack AI Engineer", the
  product count is six everywhere, and the "34 articles" stat is replaced by "client MVP live in 1 day".
- New `public/Resume-ATS.pdf`: one page, single column, plain text, experience first. Linked from the hero and /hire/ as "Plain CV for
  application forms".
- Home hero and /hire/ rewritten in plain words, buyer-first ("AI chatbots, agents and web apps for your business"), price shown as
  about US$300 next to the rupee figure.
- Products and Solutions page titles fixed.

Not done, needs you:
- Real outcomes for the Sparity bullets (users, hours saved, requests served). I did not invent any.
- LinkedIn and GitHub edits (section 8).
- Your real dollar rates for international clients.
- Testimonials: none are on the site, and none should be added until they are real.
