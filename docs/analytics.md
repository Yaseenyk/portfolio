# Analytics — how this site measures itself

Everything reports to **GoatCounter** (dashboard: https://yaseen.goatcounter.com —
cookieless, no consent banner needed). Four signal layers, one Excel report.

## The four layers

| Layer | What it answers | Where it lives |
|---|---|---|
| **Pageviews + referrers** | Who visits, from where, on what device | GoatCounter dashboard (automatic) |
| **Conversion events** `evt-*` | Which CTA actually converts | `track()` in [src/lib/analytics.ts](../src/lib/analytics.ts) |
| **Read depth** `read:<slug>:<25\|50\|75\|100>` | Which posts get read vs bounced | [src/components/ReadDepth.tsx](../src/components/ReadDepth.tsx) (100% requires 8s+ on page) |
| **Lead attribution** | Which channel produced each enquiry | `<FirstTouch />` + `recordLead()` → `/leads` inbox shows `"/page ← whatsapp"` |

## Event names currently firing

- `fyp-whatsapp-float`, `fyp-sticky-whatsapp`, `fyp-sticky-enquire` — WhatsApp taps
- `fyp-estimator-lock` — cost-estimator quote → WhatsApp
- `fyp-templates-unlock`, `fyp-template-download`, `fyp-templates-whatsapp` — template gate funnel
- `fyp-quiz-complete`, `fyp-quiz-whatsapp` — Find-My-Project quiz
- `fyp-lead-submit`, `fyp-college-lead-submit`, `fyp-lead-whatsapp` — campus lead form
- `contact-submit` — homepage + /hire contact form
- solutions form events — see [SolutionsLeadForm.tsx](../src/components/solutions/SolutionsLeadForm.tsx)

## The one rule: tag every shared link

Messaging apps (WhatsApp, Telegram, Instagram) strip the Referer header, so
untagged shares all show as "(unknown)". **Every link shared anywhere carries
`?ref=<channel>`** — `?ref=whatsapp`, `?ref=instagram`, `?ref=reddit`,
`?ref=quora`, `?ref=telegram`, `?ref=youtube`. GoatCounter records the tag as
the referrer/campaign, and `<FirstTouch />` stamps it onto any lead the visit
produces. Copy blocks in [growth-playbook.md](growth-playbook.md) are pre-tagged.

## Excel report (GoatCounter API)

```bash
python scripts/goatcounter-report.py             # last 30 days
python scripts/goatcounter-report.py --days 90   # longer window
```

Writes `analytics-report.xlsx` (gitignored — analysis, not source) with tabs:

- **Overview** — visits per day + totals
- **Pages** — per-path visits (events stripped out)
- **Conversions** — every `evt-*` ranked by count
- **Read depth** — per post: 25/50/75/100% milestones + completion rate (100÷25)
- **Referrers / Campaigns / Locations / Browsers / Systems / Screen sizes**

Setup (once): create an API token at https://yaseen.goatcounter.com/user/api
("Read statistics" permission), then add to `.env`:

```
GOATCOUNTER_API_TOKEN=...
```

## Reading it — the questions that matter

1. **Which channel converts?** Conversions tab + Referrers tab; leads in `/leads`
   carry their channel directly.
2. **Which posts work?** Read-depth completion rate — a post with high traffic
   and low completion has a title problem; high completion and low traffic has
   a distribution problem.
3. **Is the funnel leaking?** Compare `fyp-templates-unlock` → `fyp-template-download`
   → `fyp-templates-whatsapp` — each step's drop-off is a specific fix.
