# AdSense readiness: what Google says and what to do (16 Nov 2026)

Verdict seen on 16 Nov 2026 for **streamerosai.com**: "Your site isn't ready to show ads. We found some policy violations: Low-value content."
Google's text: a site must provide substantial unique value, show ongoing curation and structural maintenance, and generate and sustain genuine user interest.
Before resubmitting it should: provide authentic, high-quality information, tools or services; exhibit ongoing curation and structural maintenance; generate and sustain genuine user interest.
The review is of the DOMAIN. Subdomains (esports., spotai., solar., tools., calc., math., images., exams., campus., fitrank., yk.) are very likely judged with the root.

## Sources read (official)
- AdSense Program policies: https://support.google.com/adsense/answer/48182
- Eligibility: https://support.google.com/adsense/answer/9724 (original, high-quality content that attracts an audience; access to the source code; 18+)
- Inventory value / low-value screens and replicated content: https://support.google.com/adsense/answer/10502938 (ads are not allowed on screens without publisher content or with low-value content, screens under construction, screens with copied content without added commentary, screens with more ads than content)
- Make sure your pages are ready: https://support.google.com/adsense/answer/7299563 (unique content relevant to visitors, great user experience, finished site not a bare template, full sentences and paragraphs not only headlines or images)
- Valuable inventory / templated pages (secondary): https://www.monetizemore.com/blog/how-deal-with-valuable-inventory-templated-page-violation-adsense

## What the policies mean for us (checklist every site is held to)
1. Every indexable page has substantial, original, useful text written for people: full sentences, real detail, examples, sources. No page that is only a heading, a widget, a template with swapped words, or a stub.
2. Templated or near-duplicate pages (glossary stubs, per-keyword landing pages, "vs" and "for" pages that differ by a word) are either deepened until each stands on its own, merged into a stronger page with a redirect or link, or set to `noindex` and left out of the sitemap. Do not delete pages that have inbound links without a redirect or a kept page.
3. No page "under construction", no placeholder text, no broken or irrelevant links, no links to nonexistent content.
4. Easy navigation: header and footer on every page link to Home, the main sections, About, Contact, Privacy, Terms. A visitor can reach every important page in two clicks.
5. Trust pages that are real: About (who runs it, what it is, why it exists; honest, no invented credentials), Contact (a working way to reach the owner), Privacy Policy (what is collected: analytics, Microsoft Clarity, the first-party visit counter, cookies; third parties incl. Google AdSense once ads run; how to opt out; contact), Terms. All sites show them.
6. No ads outnumbering content, no misleading labels, no encouraging clicks, no deceptive navigation, no pop-ups. Ads are NOT turned on by this work: AdSense code stays off until approval; the `verify-no-ads` tripwire stays.
7. `ads.txt` at the root domain contains the publisher line (ca-pub-9421223162668437): `google.com, pub-9421223162668437, DIRECT, f08c47fec0942fa0`.
8. Content language is a supported language, and honest: no invented dates, testimonials, metrics, reviews, or statistics. Facts carry a source. Do not add AI-spun filler to add words: a page gets longer only by gaining real information.
9. Original value over volume: fewer, deeper pages beat many thin ones. Mass-published templated pages across the domain family are a risk to a domain-level review.
10. Google spam policies (thin content, scaled content abuse) apply too: https://developers.google.com/search/docs/essentials/spam-policies

## Hard rules for the agents
- Honest content only. Nothing fabricated. No keyword stuffing. No hidden text. No cloaking. No fake traffic, no click activity of any kind.
- Do NOT enable AdSense or any ad code. Do NOT click anything in the owner's AdSense or Google accounts. The owner requests the review.
- Respect each repo's own CLAUDE.md, tests and build gates (voice rules, source checks, schedule tests, verify-no-ads). Do not weaken a test to get a build through.
- Git: `git pull --rebase --autostash origin main` first; another session (pulse visit tracker) edits files in these repos at the same time. Commit only your own files. Conventional commits ending with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. One push per repo at a time, then wait for the Pages deploy to succeed before the next push (GitHub Pages hangs when several commits land within minutes).
- treg (SEO data API) budget: at most USD 0.15 per agent, ledger kept, only if it changes a decision.
- Write a change log to `docs/adsense-changes-2026-11-16.md` in each repo you touch: what was audited, what was deepened, merged, noindexed or added, and what is still weak.
