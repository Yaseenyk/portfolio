# Portfolio Concierge — grounded RAG + MCP server

One Cloudflare Worker, two interfaces:

| Endpoint | What it does |
| --- | --- |
| `POST /api/chat` | Grounded RAG for the site's terminal concierge: embeds the query (Workers AI), retrieves from a Vectorize index of the 95-article corpus, generates an answer constrained to that context — and **refuses** when retrieval confidence is below threshold. |
| `POST /mcp` | An MCP server (Streamable HTTP). Add the URL to Claude as a custom connector and interrogate the portfolio from inside your own AI: `search_portfolio`, `get_products`, `get_availability`. |

The corpus is the site's own `/llms-full.txt`; `scripts/index-corpus.mjs`
chunks, embeds, and upserts it into Vectorize. The `reindex` job in
`.github/workflows/worker.yml` re-runs it after every Pages deploy, so the
concierge automatically knows each day's new post.

## One-time setup (owner)

1. Create a free Cloudflare account → note the **Account ID** (dashboard → Workers & Pages, right sidebar).
2. Create an API token: *My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template*, then add the **Vectorize Edit** and **Workers AI Read** permissions.
3. Add both as GitHub repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
4. Push anything under `worker/` (or run the *Concierge Worker* workflow manually) — the deploy job publishes the worker and prints its `workers.dev` URL.
5. Run the workflow's `reindex` job once (manual dispatch) to build the index.
6. Put the worker URL into `deploy.yml` as `NEXT_PUBLIC_CONCIERGE_URL` — the site's terminal switches from mock to real RAG on the next deploy.

Until the secrets exist, both jobs no-op politely; the site's terminal keeps
using its offline mock. Free-tier allowances (100k requests/day, Workers AI
neurons, Vectorize) comfortably cover portfolio traffic.

## Local development

```bash
cd worker
npm install
npx wrangler login
npm run dev        # local worker on :8787
npm run reindex    # needs CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID in env
```
