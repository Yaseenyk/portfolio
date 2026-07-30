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
