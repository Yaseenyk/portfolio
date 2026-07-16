#!/usr/bin/env python3
"""Rewrite AI-generated MDX post bodies into a human engineering voice.

Prose-only rewrite: frontmatter, ## / ### heading text, code fences, and
tables are preserved verbatim (headings carry SEO anchors; code must stay
byte-identical). A post is skipped — never half-written — if the rewrite
changes the fence count, drops headings, or shrinks the body suspiciously.

Idempotent via scripts/humanized.json. Re-run to continue after interrupts.

Env: OPENAI_API_KEY (also read from .env / ../linkedin-bot/.env),
     OPENAI_MODEL (default gpt-5), HUMANIZE_WORKERS (default 4).
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

from openai import OpenAI

SCRIPTS_DIR = pathlib.Path(__file__).resolve().parent
ROOT = SCRIPTS_DIR.parent
POSTS_DIR = ROOT / "src" / "content" / "blog"
LEDGER = SCRIPTS_DIR / "humanized.json"

try:
    from dotenv import load_dotenv

    load_dotenv(ROOT / ".env")
    load_dotenv(SCRIPTS_DIR / ".env")
    load_dotenv(ROOT.parent / "linkedin-bot" / ".env")
except ImportError:
    pass

PROMPT = """Rewrite the following technical article body so it reads like a \
senior engineer writing from experience — not like generated content.

HARD CONSTRAINTS (violating any of these makes the output unusable):
- Keep every ## and ### heading line EXACTLY as it is, character for character.
- Keep every fenced code block (``` ... ```) EXACTLY as it is, byte for byte.
- Keep markdown tables and their values unchanged.
- Keep all facts, numbers, names, and technical claims — change wording, never meaning.
- Do not add new sections, code blocks, or facts. Do not invent anecdotes or benchmarks.
- Return ONLY the rewritten markdown body. No preamble, no fences around the whole thing.

REWRITE THE PROSE to remove machine-generated tells:
- Break the uniform rhythm: some paragraphs long and dense, some short. No drumbeat of tidy 2-sentence paragraphs.
- Cut em-dashes down to a few per article. Replace "this isn't just X — it's Y" constructions entirely.
- At most one rhetorical question in the whole piece. Delete filler like "Let's dive in", "In conclusion", "game-changer", "delve".
- Prefer concrete, plain sentences over aphorisms. It's fine to be a little dry.
- Where the text hedges vaguely, commit to an opinion; where it's grandiose, flatten it.

ARTICLE BODY:
"""


def load_ledger() -> dict:
    if LEDGER.exists():
        return json.loads(LEDGER.read_text(encoding="utf-8"))
    return {}


def save_ledger(ledger: dict) -> None:
    LEDGER.write_text(json.dumps(ledger, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def split_frontmatter(text: str) -> tuple[str, str] | None:
    m = re.match(r"^(---\n.*?\n---\n)(.*)$", text, re.DOTALL)
    return (m.group(1), m.group(2)) if m else None


def headings_of(body: str) -> list[str]:
    return [l.strip() for l in body.splitlines() if re.match(r"^#{2,3} ", l)]


def rewrite(client: OpenAI, model: str, body: str) -> str:
    resp = client.responses.create(
        model=model,
        input=PROMPT + body,
        max_output_tokens=int(os.environ.get("OPENAI_MAX_TOKENS", "16384")),
    )
    return (resp.output_text or "").strip()


def process(client: OpenAI, model: str, path: pathlib.Path) -> tuple[str, str]:
    text = path.read_text(encoding="utf-8")
    parts = split_frontmatter(text)
    if not parts:
        return (path.stem, "skip: no frontmatter")
    fm, body = parts

    new_body = rewrite(client, model, body)
    if not new_body:
        return (path.stem, "skip: empty response")
    if new_body.count("```") != body.count("```"):
        return (path.stem, "skip: code-fence count changed")
    if headings_of(new_body) != headings_of(body):
        return (path.stem, "skip: headings changed")
    if len(new_body) < 0.55 * len(body):
        return (path.stem, "skip: rewrite too short")

    path.write_text(fm + new_body.rstrip() + "\n", encoding="utf-8")
    return (path.stem, "rewritten")


def main() -> None:
    api_key = (os.environ.get("OPENAI_API_KEY") or "").strip()
    if not api_key:
        sys.exit("ERROR: OPENAI_API_KEY is not set.")
    model = os.environ.get("OPENAI_MODEL", "gpt-5").strip()
    client = OpenAI(api_key=api_key)

    ledger = load_ledger()
    targets = [p for p in sorted(POSTS_DIR.glob("*.mdx")) if p.stem not in ledger]
    print(f"{len(targets)} posts to humanize ({len(ledger)} already done)")

    workers = int(os.environ.get("HUMANIZE_WORKERS", "4"))
    done = 0
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(process, client, model, p): p for p in targets}
        for fut in as_completed(futures):
            slug, status = fut.result()
            done += 1
            print(f"[{done}/{len(targets)}] {slug}: {status}")
            if status == "rewritten":
                ledger[slug] = True
                save_ledger(ledger)

    print("done")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
