/**
 * Index the live article corpus into Cloudflare Vectorize.
 *
 * Fetches /llms-full.txt from the deployed site, chunks each article on
 * paragraph boundaries, embeds via Workers AI REST, and upserts into the
 * `portfolio-corpus` index the Worker queries. Idempotent: vector ids are
 * stable (slug + chunk index), so re-runs overwrite in place.
 *
 * Env: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, SITE_URL (optional).
 */

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID;
const SITE = process.env.SITE_URL ?? "https://yaseenkhatib.streamerosai.com";
const INDEX = "portfolio-corpus";
const EMBED_MODEL = "@cf/baai/bge-base-en-v1.5";
const API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}`;

if (!TOKEN || !ACCOUNT) {
  console.error("CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID not set — skipping reindex.");
  process.exit(0);
}

const headers = { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };

async function ensureIndex() {
  const res = await fetch(`${API}/vectorize/v2/indexes`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: INDEX,
      description: "Yaseen Khatib portfolio article corpus",
      config: { dimensions: 768, metric: "cosine" },
    }),
  });
  if (res.ok) {
    console.log("created index", INDEX);
  } else {
    const body = await res.text();
    if (!/already exists|duplicate/i.test(body) && res.status !== 409) {
      throw new Error(`index create failed (${res.status}): ${body.slice(0, 300)}`);
    }
    console.log("index exists", INDEX);
  }
}

function chunkArticle(section) {
  const lines = section.trim().split("\n");
  const title = (lines[0] ?? "").replace(/^#\s*/, "").trim();
  const url = (lines.find((l) => l.startsWith("URL: ")) ?? "").slice(5).trim();
  const body = lines
    .filter((l) => !l.startsWith("URL: ") && !l.startsWith("Summary: ") && !l.startsWith("# "))
    .join("\n");

  const paragraphs = body.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const chunks = [];
  let current = "";
  for (const p of paragraphs) {
    if (current.length + p.length > 1400 && current) {
      chunks.push(current.trim());
      current = "";
    }
    current += p + "\n\n";
  }
  if (current.trim()) chunks.push(current.trim());
  return { title, url, chunks };
}

async function embedBatch(texts) {
  const res = await fetch(`${API}/ai/run/${EMBED_MODEL}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ text: texts }),
  });
  const json = await res.json();
  if (!res.ok || !json.result?.data) {
    throw new Error(`embed failed (${res.status}): ${JSON.stringify(json).slice(0, 300)}`);
  }
  return json.result.data;
}

async function upsert(vectors) {
  const ndjson = vectors.map((v) => JSON.stringify(v)).join("\n");
  const res = await fetch(`${API}/vectorize/v2/indexes/${INDEX}/upsert`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/x-ndjson" },
    body: ndjson,
  });
  if (!res.ok) {
    throw new Error(`upsert failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
}

const corpusRes = await fetch(`${SITE}/llms-full.txt`);
if (!corpusRes.ok) {
  console.error(`could not fetch corpus (${corpusRes.status}) — is the site deployed?`);
  process.exit(1);
}
const corpus = await corpusRes.text();
const sections = corpus.split(/\n---\n/).slice(0); // first block is the header
await ensureIndex();

let total = 0;
let pending = [];

for (const section of sections) {
  const { title, url, chunks } = chunkArticle(section);
  if (!title || !url || chunks.length === 0) continue;
  const slug = url.split("/blog/")[1]?.replaceAll("/", "") ?? title.slice(0, 40);
  chunks.forEach((text, i) => {
    pending.push({
      id: `${slug}-${i}`.slice(0, 64),
      title,
      url,
      text: `${title}\n${text}`.slice(0, 8000),
    });
  });
}

console.log(`corpus: ${pending.length} chunks from ${sections.length} sections`);

for (let i = 0; i < pending.length; i += 40) {
  const batch = pending.slice(i, i + 40);
  const embeddings = await embedBatch(batch.map((b) => b.text));
  await upsert(
    batch.map((b, j) => ({
      id: b.id,
      values: embeddings[j],
      metadata: { title: b.title, url: b.url, text: b.text },
    })),
  );
  total += batch.length;
  console.log(`indexed ${total}/${pending.length}`);
}

console.log("reindex complete");
