#!/usr/bin/env python3
"""Autonomous AI blog writer.

Reads the top topic from ``topics.txt``, asks Gemini to write a deeply technical,
developer-focused article in strict Markdown, then writes it to
``src/content/blog/<slug>.mdx`` with frontmatter the Next.js site understands.
On success the used topic is removed from ``topics.txt``.

Env:
  GEMINI_API_KEY  (required)  Google AI Studio API key.
  GEMINI_MODEL    (optional)  Defaults to ``gemini-2.5-flash`` (free tier).
"""

from __future__ import annotations

import datetime
import os
import pathlib
import re
import sys

import yaml
from google import genai

SCRIPTS_DIR = pathlib.Path(__file__).resolve().parent
ROOT = SCRIPTS_DIR.parent
TOPICS_FILE = SCRIPTS_DIR / "topics.txt"
OUT_DIR = ROOT / "src" / "content" / "blog"

# Local convenience: load GEMINI_API_KEY from a gitignored .env if present.
# In CI the key comes from the environment (GitHub secret), so this is a no-op.
try:
    from dotenv import load_dotenv

    load_dotenv(ROOT / ".env")
    load_dotenv(SCRIPTS_DIR / ".env")
except ImportError:
    pass

AUTHOR = {"name": "Yaseen Khatib", "role": "MERN + AI Architect"}


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")[:80] or "post"


def read_top_topic() -> str | None:
    if not TOPICS_FILE.exists():
        return None
    for line in TOPICS_FILE.read_text(encoding="utf-8").splitlines():
        if line.strip():
            return line.strip()
    return None


def remove_topic(topic: str) -> None:
    lines = TOPICS_FILE.read_text(encoding="utf-8").splitlines()
    remaining = [ln for ln in lines if ln.strip() != topic]
    # Keep a trailing newline for clean diffs.
    TOPICS_FILE.write_text(
        "\n".join(remaining).rstrip("\n") + ("\n" if remaining else ""),
        encoding="utf-8",
    )


def build_prompt(topic: str) -> str:
    return f"""You are a principal MERN + AI engineer writing for a senior developer audience.

Write a highly technical, opinionated, practical article on this topic:
"{topic}"

Output requirements (follow EXACTLY):
- Begin the response with a YAML frontmatter block delimited by triple dashes (---).
- Frontmatter keys (and ONLY these): title, description, tags, keywords, takeaways.
  - title: a specific, punchy title (string).
  - description: one sentence, <=160 chars, no quotes inside.
  - tags: a YAML list of 2-4 short topic tags (e.g. AI, Backend, RAG).
  - keywords: a YAML list of 4-8 SEO keywords.
  - takeaways: a YAML list of 3-4 direct, declarative bullet sentences (the TL;DR).
- After the closing --- of the frontmatter, write the article body in GitHub-Flavored Markdown.
- The body MUST be technical and concrete: use ## and ### headings, fenced code blocks
  with language hints (```ts, ```python, ```bash), tables where useful, and at least
  two substantial, correct code examples.
- Do NOT include an H1 (#) heading in the body (the title is rendered from frontmatter).
- Do NOT wrap the whole response in a markdown code fence.
- Do NOT add any commentary before the frontmatter or after the article.
- Target 900-1400 words.
"""


def strip_outer_fence(text: str) -> str:
    """Remove an accidental ```markdown ... ``` wrapper around the whole response."""
    stripped = text.strip()
    m = re.match(r"^```[a-zA-Z]*\n(.*)\n```$", stripped, re.DOTALL)
    return m.group(1).strip() if m else stripped


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Split a frontmatter+body document. Returns (meta, body)."""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            try:
                meta = yaml.safe_load(parts[1]) or {}
            except yaml.YAMLError:
                meta = {}
            return (meta if isinstance(meta, dict) else {}, parts[2].strip())
    return {}, text.strip()


def reading_minutes(body: str) -> int:
    words = len(re.findall(r"\S+", body))
    return max(1, round(words / 200))


def as_list(value) -> list[str]:
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    if isinstance(value, str) and value.strip():
        return [p.strip() for p in value.split(",") if p.strip()]
    return []


def generate(topic: str) -> str:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit("ERROR: GEMINI_API_KEY is not set.")
    model_name = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")

    client = genai.Client(api_key=api_key)
    resp = client.models.generate_content(
        model=model_name, contents=build_prompt(topic)
    )
    text = (resp.text or "").strip()
    if not text:
        sys.exit("ERROR: Gemini returned an empty response.")
    return text


def main() -> None:
    topic = read_top_topic()
    if not topic:
        print("No topics left in topics.txt — nothing to write.")
        return

    print(f"Topic: {topic}")
    raw = strip_outer_fence(generate(topic))
    meta, body = parse_frontmatter(raw)

    title = str(meta.get("title") or topic).strip()
    slug = slugify(str(meta.get("slug") or title))
    today = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")

    if not body.strip():
        sys.exit("ERROR: generated article body is empty.")

    # Build a clean, deterministic frontmatter block (we own slug/date/reading time).
    frontmatter = {
        "title": title,
        "slug": slug,
        "date": today,
        "description": str(meta.get("description") or "").strip(),
        "tags": as_list(meta.get("tags")) or ["AI", "Engineering"],
        "keywords": as_list(meta.get("keywords")) or as_list(meta.get("tags")),
        "readingMinutes": reading_minutes(body),
        "takeaways": as_list(meta.get("takeaways")),
        "author": AUTHOR,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"{slug}.mdx"
    if out_path.exists():
        slug = f"{slug}-{today}"
        frontmatter["slug"] = slug
        out_path = OUT_DIR / f"{slug}.mdx"

    fm = yaml.safe_dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
    out_path.write_text(f"---\n{fm}\n---\n\n{body}\n", encoding="utf-8")
    print(f"Wrote {out_path.relative_to(ROOT)}")

    remove_topic(topic)
    print("Removed topic from topics.txt")


if __name__ == "__main__":
    main()
