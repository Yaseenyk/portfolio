# Use-case pages for India: research and plan, 4 November 2026

People in India who want an app or website built search for the thing itself ("grocery delivery app development",
"hire app developer india"), not for the portfolio of an engineer. These ten pages under `/solutions/<slug>/` target
those searches. 45 treg calls, **$0.47** in total (cap was $3): 28 keyword-idea seeds, 12 SERPs, 3 competitor
ranked-keyword pulls, 2 backlink summaries. Volumes are monthly Google searches in India; KD is DataForSEO keyword
difficulty 0 to 100. Raw files are in the session scratchpad (not committed).

## What the SERPs look like

| Search | Who ranks |
|---|---|
| hire app developer india | freelancer sites (gaurav.mobi), agencies (valuecoders, iroidtechnologies), marketplaces (freelancer.in, upwork), indiamart |
| website developer freelancer | fiverr, upwork, behance. Only three results, no agency pages |
| mobile app development cost india | agency pricing guides (corewave.io, betatestsolutions.com) |
| grocery / food delivery app development | agencies (suffescom, w2ssolutions, orangemantra, tvisha) |
| ecommerce website development india | agencies (orangemantra, foduu, zerozilla) and fiverr |
| clinic management software india | products (doctorsapp.in, docdaily.in, easyclinic.io) |
| billing software for small business india | products (vyaparapp.in, mybillbook.in, khatabilling.com): strong, so the page leads with "buy it" |
| ngo website development india | agencies (techiesgateway, winggosoft, sevenwebtech) |

**The useful finding:** a single freelancer's site (gaurav.mobi) holds positions 10 to 34 for the hire and freelance
app-developer cluster with only 16 ranked keywords and about 86 pages linking to it. A personal site can compete in
this cluster. Agency pages win the "company" and city searches, which this portfolio does not target.

## Keywords chosen

| Page | Primary phrase | Volume | KD | Notes |
|---|---|---|---|---|
| hire-app-developer-india | hire app developer india | 390 (hire app developer 1,300) | 8 (25) | CPC about $1.7 to $2.4 |
| freelance-website-developer | website developer freelancer | 1,300 | 7 | CPC $2.94; the SERP has three results |
| app-development-cost-india | mobile app development cost india | 720 | 0 | plus app development cost 2,400 (KD 26), how much to make a website in india 480 (KD 1) |
| grocery-app-development | grocery delivery app development | 260 | 4 | plus grocery app development 320 (KD 7), online grocery delivery app 1,900 (KD 45) |
| ecommerce-website-development-india | ecommerce website development | 1,300 | 40 | ecommerce website development company in india 880 (KD 15) |
| food-delivery-app-development | food delivery app development | 480 | 0 | |
| billing-software-for-small-business | billing software for small business | 1,000 | 37 | best billing software in india 1,000 (KD 17), free gst billing software 1,600 (KD 18) |
| clinic-management-software | clinic management software | 1,600 | 43 | doctor appointment booking app 210 (KD 33) |
| ngo-website-development | ngo website | 2,400 | 62 | CPC $15.5 (the highest found); ngo website template 720 (KD 0) |
| taxi-booking-app-development | taxi app development company | 1,000 | 12 | CPC $4.02 |

Dropped: school management app, coaching institute app, whatsapp ordering app and app maker for small business
returned no measurable volume. Salon booking app (480, KD 41) and hotel booking website (8,100, KD 47, mostly
consumers) are candidates for a later batch.

## Rules the pages follow

- Each page has its own decisions, its own "this is not for you if" and its own FAQ. They share a template, not text.
- **Prices come from `lib/solutions.ts`** (SERVICES and HOSTED_TIERS), rendered through the template, so there are no
  numbers invented for these pages. Nothing states what a competitor charges.
- Each page says what has and has not been built. Grocery, food, taxi, clinic, NGO and billing are things the site has
  not shipped as products, and the pages say so and link the real, related work (SpotAI, Hospital-API, the real-time
  write-up, IntegrateX, Sable).
- Where a ready-made product is the better answer (billing, standard online stores, clinics), the page says to buy it.

## Release schedule

Pages release through the same daily deploy as scheduled blog posts (`releaseOn`, UTC; `POSTS_NOW` overrides). An
unreleased page is not built, listed, in the sitemap or in `llms-full.txt`.

| Release | Pages |
|---|---|
| 3 Nov (live on the next deploy) | hire-app-developer-india, freelance-website-developer, app-development-cost-india, grocery-app-development |
| 9 Nov | ecommerce-website-development-india, food-delivery-app-development, billing-software-for-small-business |
| 13 Nov | clinic-management-software, ngo-website-development, taxi-booking-app-development |

Why not all ten at once: the portfolio has 3 of its 56 pages indexed and lost its index in July after an auto-publishing
flood. Four, then three, then three is what the site can absorb. To release everything now, set every `releaseOn` in
`src/lib/usecases.ts` to today. At least one page must always have a release date in the past, or the static export
fails (Next treats an empty parameter list as missing).

## After release

1. Request indexing for the hub and each new page (about 10 a day).
2. Check Search Console on 18 Nov and 16 Dec: impressions for the primary phrases above.
3. Add real proof as it exists. Every "What I have not built" line should shrink as the site ships those things.
4. Candidates for a second batch: salon booking app, real estate app, gym app (SpotAI covers it), inventory app,
   school and coaching apps once a volume source exists.
