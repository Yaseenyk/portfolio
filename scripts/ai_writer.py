#!/usr/bin/env python3
"""AI blog drafter: writes one post from a researched brief, for human review.

Takes the first brief with status "ready" in ``scripts/post-briefs.json``, asks
Claude to write the post from ONLY the facts in that brief, checks the draft
(banned phrases, em dashes, rhetorical questions, and every number against the
brief), and writes:

  src/content/blog/<slug>.mdx   the post, with frontmatter the site reads
  public/og/<slug>.jpg          a brand cover drawn with Pillow (no image API)
  .ai-draft/pr-body.md          the review checklist for the pull request

The brief is marked "drafted". The workflow opens a pull request; nothing
reaches main until a person merges it. Auto-publishing is what cost this site
its index in July 2026 (see .github/workflows/ai_blogger.yml).

Env:
  ANTHROPIC_API_KEY  (required)  Claude API key.
  CLAUDE_MODEL       (optional)  Defaults to claude-opus-5-5.
"""

from __future__ import annotations

import datetime
import json
import os
import pathlib
import re
import sys
import textwrap
import urllib.request

import anthropic
import yaml
from PIL import Image, ImageDraw, ImageFont

SCRIPTS_DIR = pathlib.Path(__file__).resolve().parent
ROOT = SCRIPTS_DIR.parent
BRIEFS_FILE = SCRIPTS_DIR / "post-briefs.json"
OUT_DIR = ROOT / "src" / "content" / "blog"
OG_DIR = ROOT / "public" / "og"
PR_DIR = ROOT / ".ai-draft"

try:
    from dotenv import load_dotenv

    load_dotenv(ROOT / ".env")
except ImportError:
    pass

MODEL = os.environ.get("CLAUDE_MODEL", "claude-opus-5-5").strip()
AUTHOR = {"name": "Yaseen Khatib", "role": "Full-Stack AI Engineer"}

BANNED = [
    "delve", "game-changer", "game changer", "in conclusion", "let's dive",
    "let us dive", "in today's fast-paced", "unlock the power", "seamless",
    "it's not just", "isn't just", "not only", "revolutionize", "elevate your",
]
MAX_EM_DASHES = 3

SYSTEM_PROMPT = """You write blog posts for yaseenkhatib.streamerosai.com, the site of Yaseen Khatib, a freelance full-stack and AI engineer in Hyderabad, India. The site's whole thesis is honesty: real artifacts over claims. A post that invents a fact damages the business more than no post at all.

You receive a brief as JSON. Write the post from it.

FACTS
- Every number, price, percentage, date and named fact in the post must come from the brief's "facts" or "computed" entries, or from the exchange rate it gives. If a point needs a number the brief does not have, make the point without a number.
- Never invent clients, case studies, testimonials, results, quotes or personal anecdotes. You may describe an illustrative scenario if you label it as one.
- Name sources in the text where a reader would want them ("on Zoho's India pricing page, checked 23 October 2026").
- Include everything in "must_say". Respect every "must_not".

ANGLE AND STRUCTURE
- Open with a bolded one or two sentence answer to the searcher's question, then explain.
- Write for the brief's audience: a business decision-maker, not a developer, unless the brief says otherwise.
- Be fair to the alternative. Say clearly when the reader should not buy what Yaseen sells.
- Use H2 (##) and H3 (###) headings only. Use GitHub-flavoured Markdown tables where a comparison helps. No HTML, no JSX, no images.
- Link only to the brief's "internal_links", with exactly those hrefs. End with one short paragraph that links to the brief's "cta". No other calls to action.
- Length: 1,200 to 1,900 words.

VOICE
- Plain, specific and calm, like a senior engineer explaining a decision to a client. Mix longer explanatory paragraphs with short ones.
- First person is fine for opinions ("I'd pick the free edition here").
- At most one rhetorical question in the whole post. At most three em dashes; prefer commas, colons or full stops.
- Never use: "delve", "game-changer", "in conclusion", "let's dive in", "seamless", "unlock", "elevate", "revolutionize", "in today's fast-paced world", or the "this isn't just X, it's Y" construction.

OUTPUT
Return JSON matching the schema. body_markdown is the post body only, without the title or frontmatter. description is 140 to 160 characters and contains the main keyword. title is under 60 characters and contains the main keyword. takeaways are 3 or 4 one-sentence direct answers that use only facts from the brief."""

OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}},
        "keywords": {"type": "array", "items": {"type": "string"}},
        "takeaways": {"type": "array", "items": {"type": "string"}},
        "body_markdown": {"type": "string"},
    },
    "required": ["title", "description", "tags", "keywords", "takeaways", "body_markdown"],
    "additionalProperties": False,
}


def load_briefs() -> dict:
    return json.loads(BRIEFS_FILE.read_text(encoding="utf-8"))


def next_brief(data: dict) -> dict | None:
    return next((b for b in data["briefs"] if b.get("status") == "ready"), None)


def usd_inr_rate() -> tuple[float, str] | None:
    """Today's USD to INR rate, so dollar prices can be compared with rupee ones."""
    try:
        with urllib.request.urlopen("https://open.er-api.com/v6/latest/USD", timeout=15) as r:
            payload = json.loads(r.read())
        return float(payload["rates"]["INR"]), payload.get("time_last_update_utc", "")
    except Exception as exc:  # the post can be written without it
        print(f"Exchange rate unavailable ({exc}); dollar prices stay in dollars.")
        return None


def with_exchange_rate(brief: dict, today: str) -> dict:
    brief = json.loads(json.dumps(brief))
    rate = usd_inr_rate()
    if rate:
        inr, stamp = rate
        brief.setdefault("computed", []).append(
            f"Exchange rate on {today}: $1 = ₹{inr:.2f} (open.er-api.com, updated {stamp}). "
            f"So $2,000 is about ₹{round(2000 * inr, -3):,.0f} and $800 is about ₹{round(800 * inr, -3):,.0f}; "
            "say these are approximate and depend on the day's rate."
        )
    return brief


def call_claude(client: anthropic.Anthropic, messages: list) -> tuple[dict, list]:
    with client.beta.messages.stream(
        model=MODEL,
        max_tokens=32000,
        betas=["server-side-fallback-2026-07-01"],
        system=[{"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}],
        messages=messages,
        output_config={"effort": "high", "format": {"type": "json_schema", "schema": OUTPUT_SCHEMA}},
        extra_body={"fallbacks": "default"},
    ) as stream:
        message = stream.get_final_message()

    if message.stop_reason == "refusal":
        sys.exit(f"ERROR: the model declined the brief ({message.stop_details}).")
    if message.stop_reason == "max_tokens":
        sys.exit("ERROR: the draft hit max_tokens before finishing.")

    text = next(b.text for b in message.content if b.type == "text")
    print(f"Model: {message.model} | input {message.usage.input_tokens} / output {message.usage.output_tokens} tokens")
    return json.loads(text), message.content


NUMBER = re.compile(r"\d[\d,]*(?:\.\d+)?")


def numbers_in(text: str) -> set[str]:
    return {n.replace(",", "").rstrip(".") for n in NUMBER.findall(text)}


def check_draft(draft: dict, brief: dict) -> list[str]:
    body = draft["body_markdown"]
    prose = re.sub(r"```[\s\S]*?```", "", body)
    issues = []

    lowered = (prose + " " + draft["title"] + " " + draft["description"]).lower()
    for phrase in BANNED:
        if phrase in lowered:
            issues.append(f'Banned phrase: "{phrase}"')

    dashes = prose.count("—")
    if dashes > MAX_EM_DASHES:
        issues.append(f"{dashes} em dashes (limit {MAX_EM_DASHES})")

    questions = len(re.findall(r"\w\?", re.sub(r"^#+ .*$", "", prose, flags=re.M)))
    if questions > 1:
        issues.append(f"{questions} questions in the prose (limit 1, headings excluded)")

    allowed = numbers_in(json.dumps(brief, ensure_ascii=False))
    for n in sorted(numbers_in(prose + " " + " ".join(draft["takeaways"]) + " " + draft["description"])):
        small = n.isdigit() and int(n) <= 12
        year = n.isdigit() and 2020 <= int(n) <= 2030
        if n not in allowed and not small and not year:
            issues.append(f"Number not in the brief: {n}")

    allowed_links = {link["href"] for link in brief.get("internal_links", [])} | {brief["cta"]["href"]}
    for href in re.findall(r"\]\((/[^)\s]*)\)", body):
        if href not in allowed_links:
            issues.append(f"Internal link not in the brief: {href}")

    words = len(prose.split())
    if not 1100 <= words <= 2100:
        issues.append(f"{words} words (target 1,200 to 1,900)")
    if len(draft["title"]) > 65:
        issues.append(f"Title is {len(draft['title'])} characters")
    return issues


FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "C:/Windows/Fonts/segoeuib.ttf",
]


def font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size)


def draw_cover(title: str, slug: str) -> pathlib.Path:
    """Flat brand cover: ink background, cyan and violet only, no glows."""
    w, h = 1536, 1024
    ink, cyan, violet, text = "#05070A", "#22D3EE", "#A855F7", "#F4F4F5"
    img = Image.new("RGB", (w, h), ink)
    d = ImageDraw.Draw(img)

    d.rectangle([96, 120, 96 + 160, 120 + 10], fill=cyan)
    d.rectangle([96 + 176, 120, 96 + 240, 120 + 10], fill=violet)
    for i in range(6):
        x = w - 380 + i * 52
        d.rectangle([x, h - 260 - i * 34, x + 30, h - 150], fill=cyan if i % 2 == 0 else violet)

    title_font = font(84)
    lines = textwrap.wrap(title, width=24)[:4]
    y = 220
    for line in lines:
        d.text((96, y), line, font=title_font, fill=text)
        y += 108
    d.text((96, h - 140), "yaseenkhatib.streamerosai.com", font=font(34), fill=cyan)

    OG_DIR.mkdir(parents=True, exist_ok=True)
    target = OG_DIR / f"{slug}.jpg"
    img.save(target, format="JPEG", quality=88)
    return target


def reading_minutes(body: str) -> int:
    return max(1, round(len(body.split()) / 200))


def write_post(draft: dict, brief: dict, today: str) -> pathlib.Path:
    slug = brief["slug"]
    frontmatter = {
        "title": draft["title"].strip(),
        "slug": slug,
        "date": today,
        "description": draft["description"].strip(),
        "tags": draft["tags"][:4],
        "keywords": draft["keywords"],
        "readingMinutes": reading_minutes(draft["body_markdown"]),
        "takeaways": draft["takeaways"],
        "author": AUTHOR,
    }
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{slug}.mdx"
    fm = yaml.safe_dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
    out.write_text(f"---\n{fm}\n---\n\n{draft['body_markdown'].strip()}\n", encoding="utf-8")
    return out


def write_pr_body(draft: dict, brief: dict, issues: list[str]) -> None:
    lines = [
        f"Draft written by `scripts/ai_writer.py` ({MODEL}) from the `{brief['slug']}` brief.",
        "",
        f"**Target keyword:** {brief['keyword']}  ",
        f"**Research:** {brief.get('research', '')}",
        "",
        "## Automatic checks",
        "",
    ]
    lines += [f"- [ ] {i}" for i in issues] if issues else ["- All checks passed."]
    lines += [
        "",
        "## Facts the post was allowed to use",
        "",
        "Check each claim in the post against these before merging.",
        "",
    ]
    lines += [f"- {f['claim']} ([source]({f['source'].split(' ')[0]}), checked {f['checked']})" for f in brief["facts"]]
    lines += ["", "## Before merging", "",
              "- [ ] Every price and number matches a fact above",
              "- [ ] The honest counter-case (when not to buy) is in the post",
              "- [ ] Read the cover image and the rendered page in the PR preview or `npm run dev`",
              "", "🤖 Generated with [Claude Code](https://claude.com/claude-code)"]
    PR_DIR.mkdir(exist_ok=True)
    (PR_DIR / "pr-body.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (PR_DIR / "title.txt").write_text(f"content(blog): draft {draft['title'].strip()}\n", encoding="utf-8")
    (PR_DIR / "slug.txt").write_text(brief["slug"] + "\n", encoding="utf-8")


def main() -> None:
    data = load_briefs()
    brief = next_brief(data)
    if not brief:
        print("No brief with status 'ready' in post-briefs.json; nothing to write.")
        return

    today = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    brief_for_model = with_exchange_rate(brief, today)
    print(f"Brief: {brief['slug']} ({brief['keyword']})")

    client = anthropic.Anthropic()
    messages = [{"role": "user", "content": "Brief:\n" + json.dumps(brief_for_model, ensure_ascii=False, indent=2)}]
    draft, content = call_claude(client, messages)
    issues = check_draft(draft, brief_for_model)

    if issues:
        print("Revising once for:", *issues, sep="\n  ")
        messages += [
            {"role": "assistant", "content": content},
            {"role": "user", "content": "Fix these problems and return the full post again. Remove any number you cannot source from the brief.\n- " + "\n- ".join(issues)},
        ]
        draft, _ = call_claude(client, messages)
        issues = check_draft(draft, brief_for_model)

    post = write_post(draft, brief, today)
    cover = draw_cover(draft["title"], brief["slug"])
    write_pr_body(draft, brief_for_model, issues)

    brief["status"] = "drafted"
    brief["drafted"] = today
    BRIEFS_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Wrote {post.relative_to(ROOT)} and {cover.relative_to(ROOT)}")
    print("Remaining issues for the reviewer:", issues or "none")


if __name__ == "__main__":
    main()
