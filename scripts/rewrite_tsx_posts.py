#!/usr/bin/env python3
"""Rewrite retained TSX blog posts for a senior-engineer storytelling voice,
weaving in Yaseen's Trinity Architecture + Serialization Adapter where they
genuinely fit, anchored in his real projects.

TSX posts are React components, so a broken rewrite breaks the build. This
script is safe-by-construction: after each rewrite it verifies the slug,
heading count, and code/component-tag counts are unchanged; if anything
drifts it SKIPS that file (keeps the original) rather than risk a break.
Founder's Log posts are excluded (already hand-written narratives).

Idempotent via scripts/rewritten_tsx.json.
Usage: python scripts/rewrite_tsx_posts.py [slug ...]   (no args = all eligible)
Env:   OPENAI_API_KEY, OPENAI_MODEL (default gpt-5), REWRITE_WORKERS (default 3),
       REWRITE_LIMIT (cap number processed this run).
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

from openai import OpenAI

SCRIPTS = pathlib.Path(__file__).resolve().parent
ROOT = SCRIPTS.parent
POSTS = ROOT / "content" if False else ROOT / "src" / "content" / "posts"
LEDGER = SCRIPTS / "rewritten_tsx.json"

try:
    from dotenv import load_dotenv

    load_dotenv(ROOT / ".env")
    load_dotenv(SCRIPTS / ".env")
    load_dotenv(ROOT.parent / "linkedin-bot" / ".env")
except ImportError:
    pass

# Founder's Log — already personal narratives; never re-machine them.
SKIP_SLUGS = {
    "my-journey-web-developer-to-ai-engineer",
    "shipped-5-products-solo-12-months",
    "vision-over-syntax-architecture-first",
    "one-architect-claude-mcp-full-squad",
    "ai-finops-playbook-stop-burning-money",
    "linkedin-pipeline-job-search-runs-itself",
    "zero-dollar-content-engine",
    "sable-ai-agent-never-touches-money",
    "streameros-rust-over-electron",
    "the-94-percent-decision-integratex",
    "hire-my-head-not-my-hands",
}

INSTRUCTIONS = """You are rewriting ONE blog post that is a TypeScript React \
component (.tsx) exporting a BlogPost object. Rewrite ONLY the human-readable \
prose inside the JSX for a senior full-stack engineer's storytelling voice.

HARD RULES — breaking any makes the output unusable:
- Output the COMPLETE file as valid, compilable TSX. No commentary, no code fences around it.
- Keep every import line EXACTLY as-is.
- Keep the exported `export const <name>: BlogPost = { ... }` metadata block \
EXACTLY: slug, title, description, keywords, publishedAt, updatedAt, \
readingMinutes, author, tags, takeaways. Do NOT change the slug, title, or dates.
- Keep every JSX tag and component exactly: <Terminal>, <Diagram>, <GradientText>, \
<pre>, <code>, <ul>, <ol>, <li>, <blockquote>, <a href=...>, etc. Preserve tag \
nesting, {" "} spacers, and entities like &apos; &quot; &mdash;.
- Keep the TEXT of every <h2> and <h3> heading unchanged (they are SEO anchors).
- Keep everything inside <pre>, <code>, and <Terminal> byte-for-byte identical.

REWRITE THE PROSE (the sentences inside <p>, <li>, <blockquote>) so it reads like \
a senior engineer telling the story from experience:
- Concrete and direct. Real constraints as narrative drivers: payload bloat, \
state-synchronization lag, real-time streaming backpressure, render thrash.
- Where GENUINELY relevant to THIS post's topic (frontend, React/React Flow, \
state management, serialization, real-time, full-stack architecture), weave in \
ONE or both of Yaseen's patterns — never forced, never in unrelated posts:
  * "Trinity Architecture" — HIS OWN coined term (always frame it as "the pattern \
I call Trinity Architecture" / "my Trinity split", NEVER as an industry standard). \
It is a strict three-layer separation: (1) Presentation — declarative, reactive \
views (React components, React Flow nodes) that only render from state and \
dispatch events, zero data/persistence logic; (2) Reactive State / Orchestration \
— client state managers or state machines (Zustand, RTK Query, event buses) that \
hold the runtime source of truth, optimistic updates, and cross-module event \
orchestration; (3) Data / Serialization Adapter — the bridge that transforms rich \
in-memory state into lean wire payloads. Boundary rule: no layer talks past its \
neighbor — the UI never formats DB schemas; the adapter never mutates UI state \
directly, only through the orchestrator.
  * "Serialization Adapter" — real result: on IntegrateX it stripped non-essential \
React Flow UI metadata from graph state before persistence to cut payloads 94%.
- Anchor anecdotes ONLY in these real projects, using only the real facts given — \
invent NO other incidents, clients, metrics, dates, or benchmarks:
  * IntegrateX — React Flow workflow-automation canvas; real-time node execution; \
Zustand state; the 94% serialization-adapter payload reduction; state-sync challenges.
  * streamerOS — real-time system telemetry and multi-platform chat streaming; \
backpressure and 60fps render constraints.
  * Path Saathi — a client LMS taken from Monday brief to live-on-dev in one day.
  * SANKALP — a delivered project (reference by name only; do not fabricate details).
- If none of the patterns or projects fit this post's topic (e.g. a pure Rust/Tauri, \
Claude-prompting, or infra post), DO NOT shoehorn them — just sharpen the voice.
- Keep the length within ~15% of the original. No LLM tells ("delve", "in conclusion", \
em-dash chains, "this isn't just X, it's Y").

Return ONLY the full rewritten file content.
"""


def load_ledger() -> dict:
    return json.loads(LEDGER.read_text(encoding="utf-8")) if LEDGER.exists() else {}


def save_ledger(d: dict) -> None:
    LEDGER.write_text(json.dumps(d, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def slug_of(text: str) -> str | None:
    m = re.search(r'slug:\s*"([^"]+)"', text)
    return m.group(1) if m else None


def structure_sig(text: str) -> tuple:
    """Counts that must survive a rewrite untouched."""
    return (
        slug_of(text),
        len(re.findall(r"<h2", text)),
        len(re.findall(r"<h3", text)),
        len(re.findall(r"<pre", text)),
        len(re.findall(r"<code", text)),
        len(re.findall(r"<Terminal", text)),
        len(re.findall(r"<Diagram", text)),
        len(re.findall(r'^import ', text, re.MULTILINE)),
        re.search(r'title:\s*"[^"]+"', text).group(0) if re.search(r'title:\s*"[^"]+"', text) else "",
    )


def process(client: OpenAI, model: str, path: pathlib.Path) -> tuple[str, str]:
    original = path.read_text(encoding="utf-8")
    resp = client.responses.create(
        model=model,
        input=INSTRUCTIONS + "\n\n=== FILE ===\n" + original,
        max_output_tokens=int(os.environ.get("OPENAI_MAX_TOKENS", "16384")),
    )
    out = (resp.output_text or "").strip()
    # Strip an accidental code fence if the model added one.
    if out.startswith("```"):
        out = re.sub(r"^```[a-z]*\n", "", out)
        out = re.sub(r"\n```$", "", out)
    if not out or not out.startswith("import"):
        return (path.stem, "skip: no/!import output")
    if "BlogPost = {" not in out:
        return (path.stem, "skip: lost BlogPost export")
    if structure_sig(out) != structure_sig(original):
        return (path.stem, "skip: structure drift (headings/code/slug/title)")
    if len(out) < 0.6 * len(original):
        return (path.stem, "skip: too short")
    path.write_text(out.rstrip() + "\n", encoding="utf-8")
    return (path.stem, "rewritten")


def main() -> None:
    key = (os.environ.get("OPENAI_API_KEY") or "").strip()
    if not key:
        sys.exit("ERROR: OPENAI_API_KEY not set.")
    model = os.environ.get("OPENAI_MODEL", "gpt-5").strip()
    client = OpenAI(api_key=key)
    ledger = load_ledger()

    only = set(sys.argv[1:])
    files = []
    for p in sorted(POSTS.glob("*.tsx")):
        s = slug_of(p.read_text(encoding="utf-8"))
        if not s or s in SKIP_SLUGS:
            continue
        if only and s not in only and p.stem not in only:
            continue
        if p.stem in ledger:
            continue
        files.append(p)

    limit = int(os.environ.get("REWRITE_LIMIT", "0"))
    if limit:
        files = files[:limit]
    print(f"{len(files)} posts to rewrite ({len(ledger)} already done)")

    workers = int(os.environ.get("REWRITE_WORKERS", "3"))
    done = 0
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futs = {pool.submit(process, client, model, p): p for p in files}
        for fut in as_completed(futs):
            slug, status = fut.result()
            done += 1
            print(f"[{done}/{len(files)}] {slug}: {status}")
            if status == "rewritten":
                ledger[slug] = True
                save_ledger(ledger)
    print("done")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
