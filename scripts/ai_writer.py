#!/usr/bin/env python3
"""Autonomous AI blog writer.

Reads the top topic from ``topics.txt``, asks ChatGPT (OpenAI) to write a deeply
technical, developer-focused article in strict Markdown, then writes it to
``src/content/blog/<slug>.mdx`` with frontmatter the Next.js site understands.
On success the used topic is removed from ``topics.txt``.

Env:
  OPENAI_API_KEY     (required)  OpenAI API key.
  OPENAI_MODEL       (optional)  Defaults to ``gpt-5``.
  OPENAI_MAX_TOKENS  (optional)  Output token cap. Defaults to 16384.
"""

from __future__ import annotations

import datetime
import json
import os
import pathlib
import re
import sys

import yaml
from openai import OpenAI

SCRIPTS_DIR = pathlib.Path(__file__).resolve().parent
ROOT = SCRIPTS_DIR.parent
TOPICS_FILE = SCRIPTS_DIR / "topics.txt"
OUT_DIR = ROOT / "src" / "content" / "blog"

# Local convenience: load OPENAI_API_KEY from a gitignored .env if present.
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

Field requirements (ALL fields are mandatory — never leave one empty):
- title: a specific, punchy, keyword-rich title (<=70 chars).
- description: one compelling meta-description sentence, 120-160 chars, plain text, no quotes.
- tags: 2-4 short topic tags (e.g. AI, Backend, RAG).
- keywords: 5-8 specific, long-tail SEO keywords/phrases a developer would actually search.
- takeaways: 3-4 direct, declarative TL;DR sentences.
- body_markdown: the full article in GitHub-Flavored Markdown. Requirements:
  - Do NOT include an H1 (#) heading; the title is rendered separately. Use ## and ### headings.
  - Be technical and concrete: fenced code blocks with language hints (```ts, ```python, ```bash),
    tables where useful, and at least two substantial, correct code examples.
  - Do NOT wrap the whole body in a markdown code fence. No commentary before or after the article.
  - Target 900-1400 words.
"""


# Structured-output contract: every SEO field is required, so the model cannot
# silently omit description/keywords/takeaways the way free-form frontmatter allowed.
POST_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}},
        "keywords": {"type": "array", "items": {"type": "string"}},
        "takeaways": {"type": "array", "items": {"type": "string"}},
        "body_markdown": {"type": "string"},
    },
    "required": [
        "title",
        "description",
        "tags",
        "keywords",
        "takeaways",
        "body_markdown",
    ],
    "additionalProperties": False,
}


def reading_minutes(body: str) -> int:
    words = len(re.findall(r"\S+", body))
    return max(1, round(words / 200))


def as_list(value) -> list[str]:
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    if isinstance(value, str) and value.strip():
        return [p.strip() for p in value.split(",") if p.strip()]
    return []


def generate(topic: str) -> dict:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        sys.exit("ERROR: OPENAI_API_KEY is not set.")
    model_name = os.environ.get("OPENAI_MODEL", "gpt-5")
    max_tokens = int(os.environ.get("OPENAI_MAX_TOKENS", "16384"))

    client = OpenAI(api_key=api_key)
    resp = client.responses.create(
        model=model_name,
        input=build_prompt(topic),
        max_output_tokens=max_tokens,
        text={
            "format": {
                "type": "json_schema",
                "name": "blog_post",
                "strict": True,
                "schema": POST_SCHEMA,
            }
        },
    )
    if getattr(resp, "status", None) == "incomplete":
        sys.exit("ERROR: response truncated — raise OPENAI_MAX_TOKENS.")

    text = (resp.output_text or "").strip()
    if not text:
        sys.exit("ERROR: OpenAI returned an empty response.")
    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        sys.exit(f"ERROR: could not parse structured output: {exc}")


def main() -> None:
    topic = read_top_topic()
    if not topic:
        print("No topics left in topics.txt — nothing to write.")
        return

    print(f"Topic: {topic}")
    data = generate(topic)
    body = str(data.get("body_markdown") or "").strip()

    title = str(data.get("title") or topic).strip()
    slug = slugify(title)
    today = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")

    if not body:
        sys.exit("ERROR: generated article body is empty.")

    # Build a clean, deterministic frontmatter block (we own slug/date/reading time).
    frontmatter = {
        "title": title,
        "slug": slug,
        "date": today,
        "description": str(data.get("description") or "").strip(),
        "tags": as_list(data.get("tags")) or ["AI", "Engineering"],
        "keywords": as_list(data.get("keywords")) or as_list(data.get("tags")),
        "readingMinutes": reading_minutes(body),
        "takeaways": as_list(data.get("takeaways")),
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
