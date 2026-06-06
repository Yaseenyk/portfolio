# Deployment & Local Development

## Scripts

```bash
npm run dev               # dev server, http://localhost:3000
npm run build             # static export → ./out
npm run start             # serve a production build (non-export)
npm run lint              # next lint
npm run generate:resume   # regenerate public/Resume.pdf (local only; needs puppeteer)
```

## Static export

`next.config.mjs`:

```js
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const nextConfig = {
  output: "export",               // static HTML → ./out
  images: { unoptimized: true },  // GitHub Pages has no Next image optimization
  trailingSlash: true,            // /route/index.html → reliable Pages routing
  ...(basePath && { basePath }),
};
```

The app is fully static-export compatible: client-only contact form, blog
`[slug]` pre-rendered via `generateStaticParams`, no server actions/route
handlers. `sitemap.ts`/`robots.ts` emit static files.

## Environment variables

| Var | Purpose | Value (production) |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | URL subpath for a **project** GitHub Pages site | `/portfolio` |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/JSON-LD/sitemap base | `https://yaseenyk.github.io/portfolio` |

Both are set in the CI build step. Locally, leave them unset to run at the root
(`localhost:3000`). Defaults live in `src/lib/site.ts` and `next.config.mjs`.

> **basePath gotchas.** `next/link` and Next-generated asset URLs auto-prefix
> the basePath. **Raw** paths do not — e.g. the Download CV link in `Hero.tsx`
> is `` `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Resume.pdf` `` precisely
> because a plain `<a href="/Resume.pdf">` would 404 under `/portfolio`.

## GitHub Pages CI/CD

Workflow: `.github/workflows/deploy.yml`. On push to `main` (or manual dispatch):
`configure-pages` (with `enablement: true`, so Pages auto-enables) →
`npm ci` (with `PUPPETEER_SKIP_DOWNLOAD: true`, so CI never downloads Chromium)
→ `npm run build` (with the basePath/site-url env) → `upload-pages-artifact`
(`./out`) → `deploy-pages`. Permissions: `contents: read`, `pages: write`,
`id-token: write`; concurrency group `pages`.

**Pages settings:** Settings → Pages → Source = **GitHub Actions** (the
`enablement: true` step sets this automatically on first run).

### ⚠️ Two Pages workflows present
The repo currently has **both** `deploy.yml` (the maintained one, basePath-aware)
and `nextjs.yml` (GitHub's sample "Deploy Next.js site to Pages", added via the
Pages UI). Both trigger on push to `main` and deploy to the same `pages`
concurrency group, so they queue against each other and one will redundantly
redeploy. **Recommendation: delete `nextjs.yml`** and keep `deploy.yml` (it is
the one configured with `NEXT_PUBLIC_BASE_PATH`/`NEXT_PUBLIC_SITE_URL`). The
sample workflow uses `configure-pages` auto-basePath, which can diverge from the
explicit values used here.

## Resume PDF engine

`scripts/generate-resume.js` (Puppeteer) renders a 2-page A4 resume to
`public/Resume.pdf`. `puppeteer` is a committed devDependency but CI skips its
Chromium download (`PUPPETEER_SKIP_DOWNLOAD`). Run locally (`npm run
generate:resume`) and commit the PDF; it is not generated in CI. Needs network
(Tailwind CDN + Google Fonts) at render time.

## Troubleshooting

- **`bg-cyan` / class "does not exist" 500 in `next dev`** — a stale dev server
  is serving an old Tailwind config from memory. Kill leftover `next dev`
  processes (Windows: they survive `pkill`; find by port and `Stop-Process`) and
  restart. Config changes (new theme colors) require a dev restart.
- **`/404` prerender error on `next build`** — usually a transient Windows
  file-lock from a leftover `out/`. Re-run after `rm -rf .next out`.
- **`/portfolio` mangled to a Windows path** when setting `NEXT_PUBLIC_BASE_PATH`
  in Git Bash — MSYS path conversion. Prefix with `MSYS_NO_PATHCONV=1`, or set it
  in PowerShell/CI (Ubuntu) where it does not occur.
- **LF→CRLF warnings on commit** — harmless Git line-ending normalization on
  Windows.
- **Download CV serves the old PDF after deploy** — Pages/browser cache; hard
  refresh (Ctrl+Shift+R).
