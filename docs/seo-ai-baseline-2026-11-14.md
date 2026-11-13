# SEO and AI-search baseline, 14 Nov 2026

Measured through treg (about $0.03 of a $0.50 cap): 10 Google result pages, 5 ChatGPT answers with web search, 20 local keywords.
One run is a snapshot. Re-run the same questions on 28 Nov and 12 Dec and compare.

## Where the portfolio stands

**Google index:** 68 of 77 sitemap pages are indexed (URL Inspection, 13 Nov). The home, about and hire pages are in.
The five new case studies had not been checked by Google yet.

**Google positions (top 20 checked):**

| Search | Country | Result |
|---|---|---|
| Yaseen Khatib | India | Not in the top 19. Other people with similar names fill the page. |
| Yaseen Khatib full stack AI engineer | India | A LinkedIn post of mine at 4. The portfolio itself is not in the top 10. |
| MERN stack developer vs full stack developer | US | My DEV.to copy at 8. The original on the portfolio is not indexed yet. |
| AI developer Hyderabad, freelance AI developer Hyderabad, freelance full stack developer Hyderabad, hire MERN stack developer Hyderabad | India | Not in the top 20. Job boards and agencies hold these. |
| AI engineer portfolio examples, senior full stack AI engineer portfolio | US | Not in the top 20. |
| RAG chatbot developer India fixed price | India | Not in the top 20. Agencies. |

**ChatGPT (with web search):**

| Question | Result |
|---|---|
| Who is Yaseen Khatib, the full-stack AI engineer from Hyderabad? | Correct answer: role, city, Sparity, earlier jobs, stack. Cites yk.streamerosai.com. |
| I need a senior MERN developer who also builds LLM and RAG systems, remote from India. Can you name any? | Names me third of its suggestions ("Good full-stack AI match") and cites the portfolio. |
| Freelance AI developers in Hyderabad for chatbots and agents | Not mentioned. Cites Clutch, Contra and local agencies. |
| Who can I hire in India for a fixed-price document chatbot? | Not mentioned. Cites agencies and one independent developer's site. |
| Good examples of AI engineer portfolio websites | Not mentioned. Cites personal sites and GitHub Pages portfolios. |

On 4 Nov the same kind of check found no mention anywhere, so the two hits are new.

**Local search demand (India, monthly):** "website developer in hyderabad" 1,300; "full stack developer portfolio" 320;
"hire react developer india" 90; "hire full stack developer india" 50. "AI developer in Hyderabad", "freelance AI developer
Hyderabad", "MERN stack developer Hyderabad" and "chatbot developer Hyderabad" returned no measurable volume.
So there is nothing to win by stuffing "AI developer Hyderabad" into titles.

## What was changed on 14 Nov

- Person markup now says which Yaseen Khatib this is: short name, role, employer (Sparity), city, and a third profile link (DEV.to).
- `/llms.txt` opens with plain facts an assistant can quote, then lists every project with its result, stack and links (from `lib/work.ts`).
- `/ai-briefing.json` was dated June; it now carries the current project list and date.
- `/hire/` has six plain questions and answers with FAQ markup.
- Five new case-study pages and a rebuilt Projects page, all in the sitemap (77 URLs). Every product page links to its live site.

## What moves it from here (none of this can be bought for $0.50)

1. **Links from places that already rank.** The assistants cited Clutch, Contra, Upwork, GitHub and LinkedIn. A profile on Contra
   and Upwork, a GitHub profile README linking the portfolio, and the portfolio link in the LinkedIn Featured section are the
   highest-return steps, and only you can create those accounts.
2. **Your name.** Use "Yaseen Khatib, Senior Full-Stack AI Engineer" identically on LinkedIn, GitHub, DEV.to and the resume, each
   linking to yk.streamerosai.com. That is how Google learns this page is the one for that name.
3. **Time.** The domain is young. Google took days to weeks to index earlier pages.
4. **Request indexing** in Search Console for the home page, `/hire/`, `/projects/` and the five new case studies (a few a day).
