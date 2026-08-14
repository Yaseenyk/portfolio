-- D1 schema for the lead pipeline (POST /api/lead).
--
-- Apply with:
--   npx wrangler d1 create yaseen-leads
--   npx wrangler d1 execute yaseen-leads --remote --file=./schema.sql
--
-- Then uncomment the [[d1_databases]] block in wrangler.toml and paste the
-- database_id printed by `d1 create`.

CREATE TABLE IF NOT EXISTS leads (
  id          TEXT PRIMARY KEY,
  created_at  TEXT NOT NULL,          -- ISO 8601, UTC
  source      TEXT NOT NULL,          -- 'solutions' | 'campus' | 'unknown'
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  org         TEXT,                   -- company, institution or college
  interest    TEXT,                   -- service selected, or course
  budget      TEXT,                   -- budget band, where asked
  context     TEXT,                   -- project title / tier / page context
  message     TEXT NOT NULL,
  page        TEXT,                   -- path the enquiry came from
  user_agent  TEXT
);

-- Newest-first listing is the only read pattern that matters day to day.
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);

-- Spotting a repeat enquirer before replying is worth the index.
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- Splitting student from business enquiries in a single query.
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads (source, created_at DESC);

-- Signed agreement PDFs, stored here rather than in R2 so the feature needs no
-- billing setup. A signed agreement is ~8KB, ~11KB base64 encoded — far inside
-- D1's 1MB row limit, and a few thousand of them barely dent the 10GB ceiling.
-- If volume ever makes this the wrong call, move to R2 and keep the same URL
-- shape (/agreements/<uuid>.pdf) so nothing else changes.
CREATE TABLE IF NOT EXISTS agreement_pdfs (
  id              TEXT PRIMARY KEY,   -- uuid, also the URL segment
  created_at      TEXT NOT NULL,
  filename        TEXT NOT NULL,
  size_bytes      INTEGER NOT NULL,
  content_base64  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_agreement_pdfs_created
  ON agreement_pdfs (created_at DESC);
