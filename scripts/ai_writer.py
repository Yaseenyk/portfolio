#!/usr/bin/env python3
"""Autonomous AI blog writer.

Reads the top topic from ``topics.txt``, asks ChatGPT (OpenAI) to write a deeply
technical, developer-focused article in strict Markdown, then writes it to
``src/content/blog/<slug>.mdx`` with frontmatter the Next.js site understands.
On success the used topic is removed from ``topics.txt``.

After the article is written, a matching OG cover is generated to
``public/og/<slug>.jpg`` (the blog template attaches it automatically).
Cover generation is best-effort: any failure logs and the post still ships.

Env:
  OPENAI_API_KEY     (required)  OpenAI API key.
  OPENAI_MODEL       (optional)  Defaults to ``gpt-5``.
  OPENAI_MAX_TOKENS  (optional)  Output token cap. Defaults to 16384.
  OPENAI_IMAGE_MODEL (optional)  Cover model. Defaults to ``gpt-image-1``.
  SKIP_COVER         (optional)  Set to "1" to skip cover generation.
"""

from __future__ import annotations

import base64
import datetime
import io
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
OG_DIR = ROOT / "public" / "og"

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

VOICE — this is the most important requirement. Write like a tired senior
engineer sharing hard-won specifics, NOT like a content writer:
- Concrete over rhetorical: real commands, actual error messages, specific
  version numbers, realistic latency/size/cost figures (clearly framed as
  typical/illustrative, never presented as your own measured benchmarks).
- Vary the rhythm: mix long technical paragraphs with short ones. Do NOT
  write in a steady drumbeat of punchy two-sentence paragraphs.
- At most ONE rhetorical question in the whole article. No "Let's dive in",
  no "In conclusion", no "game-changer", no "delve", and never the
  "this isn't just X — it's Y" construction.
- Use em-dashes sparingly (a few per article, not per paragraph).
- Include at least one honest limitation, failure mode, or "when NOT to do
  this" — real engineering writing always has tradeoffs.
- First person is fine for opinions ("I'd reach for X here"), but do not
  invent personal war stories, clients, or specific past incidents.

THEME — this blog's focus is production full-stack engineering (React,
Node.js, TypeScript, Python) and the applied AI systems built on top of it.
Treat AI as applied full-stack work, not a separate magic discipline. Stay
concrete and practical for working senior engineers.

SIGNATURE PATTERNS — available, but use with restraint. ONLY reference these
when the topic is genuinely about frontend/state/serialization/real-time
full-stack architecture. In most posts you will NOT mention them at all;
never force them, and never present the coined term as an industry standard:
- "Trinity Architecture" — the author's OWN coined term (write it as "a
  pattern I call Trinity Architecture"). A strict three-layer split:
  (1) Presentation — declarative reactive views (React components / React
  Flow nodes) that only render from state and dispatch events; (2) Reactive
  State / Orchestration — client state managers or state machines (Zustand,
  RTK Query, event buses) holding the runtime source of truth and cross-module
  orchestration; (3) Data / Serialization Adapter — the bridge transforming
  rich in-memory state into lean wire payloads. Boundary rule: no layer talks
  past its neighbor.
- "Serialization Adapter" — stripping non-essential UI metadata from rich
  client state before persistence to cut payload size dramatically.
- Real shipped projects you MAY reference by name only where directly relevant
  (invent no new incidents, metrics, or clients): IntegrateX (React Flow
  workflow engine; a serialization adapter cut its graph payloads ~94%),
  streamerOS (real-time streaming telemetry/chat), Path Saathi (a client LMS
  taken from brief to live in a day).

Field requirements (ALL fields are mandatory — never leave one empty):
- title: a specific title a human would write (<=65 chars): plain words, at
  most one colon, no keyword-stuffing — say the one thing the article proves.
- description: one compelling meta-description sentence, 120-160 chars, plain text, no quotes.
- tags: 2-4 short topic tags (e.g. AI, Backend, RAG).
- keywords: 5-8 specific, long-tail SEO keywords/phrases a developer would actually search.
- takeaways: 3-4 direct, declarative TL;DR sentences.
- body_markdown: the full article in GitHub-Flavored Markdown. Requirements:
  - Do NOT include an H1 (#) heading; the title is rendered separately. Use ## and ### headings.
  - SEO/AEO: phrase at least TWO of the ## headings as the exact question a developer
    would type into a search engine (e.g. "## How do you X without Y?"), and open each
    with a direct 40-60 word answer before elaborating — featured-snippet style.
  - Be technical and concrete: fenced code blocks with language hints (```ts, ```python, ```bash),
    tables where useful, and at least two substantial, correct code examples.
  - Do NOT wrap the whole body in a markdown code fence. No commentary before or after the article.
  - Target 1100-1600 words — depth over volume.
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
    # .strip() guards against a trailing newline/space in the key (a common
    # paste artifact in CI secrets) that makes httpx reject the auth header.
    api_key = (os.environ.get("OPENAI_API_KEY") or "").strip()
    if not api_key:
        sys.exit("ERROR: OPENAI_API_KEY is not set.")
    model_name = os.environ.get("OPENAI_MODEL", "gpt-5").strip()
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


# Same style contract as scripts/generate-og-images.py so every cover on the
# site reads as one brand.
IMAGE_STYLE_RULES = (
    "Style: minimal, flat, vector-style editorial illustration for a premium "
    "developer portfolio. Background: near-black dark navy ink (#05070A), "
    "uniform and matte. Restrained palette ONLY: deep navy blues, one cyan "
    "accent (#22D3EE), one violet accent (#A855F7), and warm off-white "
    "(#F4F1EA) for the headline. Clean geometric shapes, crisp edges, subtle "
    "flat shading, generous negative space, one clear focal illustration. "
    "STRICTLY FORBIDDEN: neon glow effects, light bursts, lens flares, "
    "glowing auras or halos behind text, gradients that blow out to white, "
    "photorealism, 3D renders, busy backgrounds, saturated orange/red/green. "
    "The headline text must appear exactly once, spelled exactly as quoted, "
    "in massive bold clean sans-serif type in flat off-white, set directly "
    "on the dark background — never inside a glow, badge, panel, or box. "
    "No other text, watermarks, or logos anywhere."
)


def generate_cover(client: OpenAI, title: str, takeaways: list[str], slug: str) -> None:
    """Best-effort OG cover → public/og/<slug>.jpg. Never blocks publishing."""
    if os.environ.get("SKIP_COVER") == "1":
        print("SKIP_COVER=1 — skipping cover generation.")
        return
    try:
        from PIL import Image
    except ImportError:
        print("Pillow not installed — skipping cover generation.")
        return
    try:
        brief_prompt = (
            "You are an art director for a software engineering blog. Write ONE "
            "vivid image-generation prompt (max 100 words) for a scroll-stopping "
            "OpenGraph cover thumbnail.\n"
            "- Distill the article into a punchy 3-6 word HEADLINE (plain ASCII). "
            "Put it in double quotes and state it must be rendered exactly once, "
            "spelled exactly as given, in huge bold sans-serif type dominating "
            "the layout.\n"
            "- Build the scene around ONE concrete visual metaphor specific to "
            "THIS article — never a generic laptop, circuit board, or glowing "
            "cube.\n"
            "- Flat editorial-illustration scene on a near-black navy "
            "background with cyan and violet accents only; one focal "
            "subject, readable as a small thumbnail. No glow effects. "
            "No other text or lettering.\n"
            "Return only the prompt text.\n\n"
            f"Article title: {title}\n\nKey takeaways:\n"
            + "\n".join(f"- {t}" for t in takeaways)
        )
        brief = (
            client.responses.create(
                model=os.environ.get("OPENAI_MODEL", "gpt-5").strip(),
                input=brief_prompt,
            ).output_text
            or ""
        ).strip()
        print(f"Cover brief: {brief[:120]}...")

        result = client.images.generate(
            model=os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-1").strip(),
            prompt=f"{brief}\n\n{IMAGE_STYLE_RULES}",
            size="1536x1024",
            quality="medium",
        )
        png = base64.b64decode(result.data[0].b64_json)

        # Re-encode to JPEG: drops every metadata chunk (incl. C2PA) and
        # shrinks the ~2 MB PNG before it gets committed.
        img = Image.open(io.BytesIO(png)).convert("RGB")
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=85)

        OG_DIR.mkdir(parents=True, exist_ok=True)
        target = OG_DIR / f"{slug}.jpg"
        target.write_bytes(buf.getvalue())
        print(f"Wrote {target.relative_to(ROOT)} ({target.stat().st_size // 1024} KB)")
    except Exception as exc:
        print(f"Cover generation failed ({exc}) — publishing without a cover.")


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

    # Cover last: the post is already on disk, so a cover failure costs nothing.
    api_key = (os.environ.get("OPENAI_API_KEY") or "").strip()
    generate_cover(OpenAI(api_key=api_key), title, frontmatter["takeaways"], slug)


if __name__ == "__main__":
    main()
