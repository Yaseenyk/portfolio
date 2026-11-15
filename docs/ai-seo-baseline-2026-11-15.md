# AI search baseline (15 Nov 2026)

What ChatGPT, Gemini and Google AI Mode say for prompts our sites should win. 9 prompts x 3 engines = 27 answers, each run once
(treg scrapers, country IN or US, about $0.06). AI answers vary between runs; treat this as a baseline, not a verdict.

| Site | Prompt | ChatGPT | Gemini | AI Mode |
|---|---|---|---|---|
| Portfolio | Who is Yaseen Khatib, a Full Stack AI Developer from Hyderabad? | knows him, cites yk.streamerosai.com (3 URLs) | knows him, cites yk (6 of 7 sources) | knows him, cites LinkedIn only |
| Portfolio | Best MERN developer with RAG/LLM experience to hire in Hyderabad | no | no | no |
| Portfolio | Hybrid RAG over a codebase (BM25, vectors, reranker, Recall@k, MRR) | no | no | no (post goes live 26 Nov) |
| DefendIt | Best website for MCA final year project ideas, report format, source code | no | no | no |
| DefendIt | How to write an MCA/BCA project synopsis with sample and template | no | no | no |
| Esports Hub | Free bracket maker and points table for a college BGMI/Free Fire event | no | no | no |
| streamerOS | Best OBS CPU usage preset | cites /blog/obs-cpu-usage-preset-explained | no | no |
| streamerOS | NVENC vs x264 | no | no | no |
| Math | Free percentage increase calculator with worked examples | no | no | no |

Real mentions or citations: 4 of 27 (3 entity answers about the author, 1 OBS citation). Baseline for the 9 content prompts: 1 of 27.

## Findings
1. **Entity recognition works, with stale details.** All three engines know the author and cite the portfolio, dev.to and LinkedIn, but call him
   "Senior Full-Stack AI Engineer" (ChatGPT, Gemini) or "Senior AI Systems Architect" (AI Mode) and list Rust and Vue. The current title is
   Full Stack AI Developer. The old title was still on DefendIt and FitRank (fixed 15 Nov: campus-site 724afa5, fitrank-website 8ba0528) and is
   probably still on dev.to and LinkedIn (owner to update; the portfolio's Person schema already lists LinkedIn, GitHub and dev.to in sameAs).
2. **No site blocks AI crawlers** (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and others were checked in
   robots.txt on all 12 sites).
3. **llms.txt missing** on tools, calc, images, math and exams; **IndexNow missing** on sites-lab, exams and spotai (Bing feeds ChatGPT search).
   Both are being added. llms.txt has no confirmed effect on any engine; it is cheap, not a lever.
4. **First real AI citation:** ChatGPT cites the OBS CPU preset page that was retitled on 15 Nov.
5. **Who AI engines cite for the DefendIt prompts:** github.com (4), filemakr.com (3), geeksforgeeks, projectnet.in, kashipara, upGrad and university
   pages. Pages that answer the whole question in one place and sit on GitHub get cited; the new MCA/BCA guides are too new to show.

## Re-measure
28 Nov and 12 Dec: re-run the same 9 prompts on the 3 engines (about $0.06) and the esports ID card prompts in the case-study workbook (about $0.03).
Targets: author title correct in all three answers; at least 3 of the 9 content prompts cite one of our pages.
