# AdSense readiness changes, yk.streamerosai.com (16 Nov 2026)

Policy basis: `docs/adsense-readiness-2026-11-16.md`. Audit of the built `out/` (301 HTML files; 175 indexable before, 173 after).

## Audit result

- 96 files are 7-word redirect stubs for old blog slugs (`<title>Moved</title>`, canonical to the new URL, not in the sitemap). They are redirects, not content pages. Kept.
- Every real blog post (38 live) and solution/use-case page has more than 500 words of body text. No placeholder text, no "under construction", no dangling internal links (`verify-links` OK across 301 pages).
- Footer on every page already linked About and Privacy. No Terms page and no Contact page existed (contact was only a home-page anchor).

## Page-by-page

| Page | Before | After |
| --- | --- | --- |
| /terms/ | did not exist | new: who runs it, content use, no warranty, enquiries, links, contact; in sitemap |
| /contact/ | only `/#contact` anchor | new: email, LinkedIn, GitHub, what to include for hiring or a project, corrections; in sitemap |
| /privacy/ | 281 words; no pulse counter, no ad statement | adds first-party visit counter (no cookie, no IP, honours DNT/GPC), cookies, AI concierge, Advertising (no ads today, AdSense possible later, opt-out links), other sites; in sitemap |
| Footer (every page) | About missing from the legal row, Contact was an anchor | About, Contact, Privacy, Terms in the bottom row; Contact column link points to /contact/ |
| /roadmap/ | about 105 words, a link hub, in sitemap | `noindex, follow`, removed from sitemap |
| /anthropic-roadmap/ | about 100 words, a link hub, in sitemap | `noindex, follow`, removed from sitemap |
| /about/ | 486 words, names Yaseen, Hyderabad | unchanged |

Sitemap: 77 to 78 URLs (-2 roadmaps, +3 trust pages).

## Gates

`npm run lint` clean, `npm run check:schedule` OK, `npm run build` incl. verify-sitemap, verify-links and verify-no-ads OK. Ads remain off.

## Remaining weaknesses (honest)

- /interview/ (245 words), /uses/ (286) and the product pages (/products/defendit, exam-dates, tool-sites, solar-guide, esports-hub: 300 to 500 words) are short. They are real, but thin by the "substantial" standard. Deepen with real outcomes once the owner supplies numbers.
- A personal portfolio is not a content publisher; AdSense on it adds little. The strongest case for the domain rests on the guide sites, not this one.
- The cadence of blog posts (two a week cap, five scheduled 26 Nov to 10 Dec) is moderate. The 2026 history of de-indexing after AI-assisted publishing remains a context a reviewer cannot see but search systems can.
- Terms are written by the owner, not a lawyer.
