"""Generate social posts + share images for the Final Year Projects portal.

Produces, per item: a LinkedIn post, an Instagram caption, a WhatsApp broadcast
message, and a Reel/Short hook — written to docs/social-posts/<slug>.md — plus
brand-locked wordless share images in public/social/.

Idempotent: existing images are skipped, so re-running only fills gaps. Copy is
always regenerated (it is cheap); pass --no-copy to skip it.

Usage:
    python scripts/campus_social.py                 # copy + both image ratios
    python scripts/campus_social.py --dry-run       # copy only, no image spend
    python scripts/campus_social.py --only viva     # slug substring filter
    python scripts/campus_social.py --square        # square images only
    python scripts/campus_social.py --no-copy       # images only

Key:  OPENAI_API_KEY from the environment, ./.env, or ../linkedin-bot/.env.
Cost: ~$0.06-0.07 per image (gpt-image-1, medium) + pennies of text tokens.
"""

import argparse
import base64
import io
import json
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "public" / "social"
COPY_DIR = ROOT / "docs" / "social-posts"

load_dotenv(ROOT / ".env")
load_dotenv(ROOT.parent / "linkedin-bot" / ".env")

TEXT_MODEL = "gpt-5.5"
IMAGE_MODEL = "gpt-image-1"
IMAGE_QUALITY = "medium"
JPEG_QUALITY = 85
SITE = "https://yaseenkhatib.streamerosai.com"

# Keep in sync with src/lib/guides.ts and src/lib/campus.ts. The generator is
# deliberately manifest-driven rather than parsing TypeScript — a wrong slug
# here produces an orphan file, not a broken build.
ITEMS = [
    {
        "slug": "viva-questions",
        "path": "/final-year-projects/guides/final-year-project-viva-questions/",
        "kind": "guide",
        "title": "Final year project viva questions — and how to actually answer them",
        "hook": (
            "Panels do not test what your project does; they test whether you built "
            "it. Six categories of question, including the one nobody prepares for: "
            "what happens when it goes wrong. The advice is to say 'I do not know' "
            "and reason out loud rather than bluff."
        ),
        "audience": "final year students weeks away from their viva, anxious about it",
    },
    {
        "slug": "mca-topics",
        "path": "/final-year-projects/guides/mca-final-year-project-topics/",
        "kind": "guide",
        "title": "MCA final year project topics, with the stack and the honest difficulty",
        "hook": (
            "Twenty MCA topics across AI, full-stack, real-time, vision and mobile. "
            "Every one lists the viva question it will attract, so choosing a topic "
            "means choosing which question you will have to answer. Difficulty "
            "ratings are honest rather than encouraging."
        ),
        "audience": "MCA students choosing a topic before the approval deadline",
    },
    {
        "slug": "bca-topics",
        "path": "/final-year-projects/guides/bca-final-year-project-topics/",
        "kind": "guide",
        "title": "BCA final year project topics you can actually finish",
        "hook": (
            "Sixteen ideas filtered for one thing: finishable. The common BCA "
            "failure is picking something ambitious and submitting it eighty per "
            "cent done with a report describing features that do not exist."
        ),
        "audience": "BCA and B.Sc IT students picking a project",
    },
    {
        "slug": "btech-topics",
        "path": "/final-year-projects/guides/btech-cse-final-year-project-topics/",
        "kind": "guide",
        "title": "B.Tech CSE topics that survive a review panel",
        "hook": (
            "B.Tech projects are team-built and judged across staged reviews. The "
            "key insight: split by vertical slice, not by layer — if one member "
            "does all the frontend, three members cannot defend the project."
        ),
        "audience": "B.Tech CSE/IT teams planning their final year project",
    },
    {
        "slug": "report-format",
        "path": "/final-year-projects/guides/final-year-project-report-format/",
        "kind": "guide",
        "title": "Final year project report format, chapter by chapter",
        "hook": (
            "What belongs in each of the eight chapters, which diagrams are "
            "required, and the five mistakes that cost marks — the worst being an "
            "ER diagram that does not match the actual database. Panels check."
        ),
        "audience": "students writing their report in the weeks before submission",
    },
    {
        "slug": "how-to-choose",
        "path": "/final-year-projects/guides/how-to-choose-a-final-year-project/",
        "kind": "guide",
        "title": "How to choose a final year project without regretting it in March",
        "hook": (
            "Start by counting the weeks you actually have: subtract a four-week "
            "buffer, exams, and placement drives. Most students who think they "
            "have twenty-four weeks have about eleven."
        ),
        "audience": "students at the very start, before topic approval",
    },
    {
        "slug": "portal",
        "path": "/final-year-projects/",
        "kind": "offer",
        "title": "I build your final year project. Then I teach you every line of it.",
        "hook": (
            "The project is built end to end — code, database, report, diagrams, "
            "deployment. The student writes none of it. Then daily live sessions "
            "after 8 PM walk through the code line by line, ending in a mock viva, "
            "so they can defend work they did not write. Direct payment in monthly "
            "installments, no gateway. Each project capped per college."
        ),
        "audience": "final year students who need a project and cannot build one",
    },
    {
        "slug": "colleges",
        "path": "/final-year-projects/colleges/",
        "kind": "offer",
        "title": "Your batch submits fifteen versions of the same project",
        "hook": (
            "For HODs and placement cells: a free workshop for the batch, projects "
            "allocated so no two students build the same system, and a written "
            "scope to the department of what was external. Openness is the point."
        ),
        "audience": "heads of department, project guides and placement cells",
    },
]

# Voice contract. Mirrors the ban list in ai_writer.py — the audience is Indian
# students, who scroll past marketing language faster than anyone.
VOICE_RULES = """
VOICE — non-negotiable:
- Plain, direct, specific. Short sentences. Write like a working engineer
  talking to a student, not like a brand.
- Lead with the single most useful or surprising fact. Never open with a
  question, never open with "In today's world" or any scene-setting.
- Concrete over abstract. Numbers, real examples, actual viva questions.
- NEVER claim results, marks, placements, guarantees, or student counts.
  Nothing has been sold yet — inventing social proof is forbidden.
BANNED words and constructions: game-changer, unlock, unleash, dive in, delve,
elevate, revolutionise, transform your, supercharge, "in today's world",
"the truth is", "here's the thing", "let that sink in", "trust me",
"you won't believe", hustle, grind, 10x, "as an AI", rhetorical-question
openers, and any sentence built on "It's not X, it's Y".
NO emoji in the LinkedIn post. Instagram may use at most two, never in a row.
"""

IMAGE_STYLE_RULES = (
    "Style: minimal, flat, 2D vector editorial illustration for a premium "
    "developer portfolio. Background: uniform matte near-black navy ink "
    "(#05070A), edge to edge. "
    "PALETTE — use ONLY these: deep navy blues, cyan (#22D3EE), violet "
    "(#A855F7), and muted slate grey. A thin off-white (#F4F1EA) line or "
    "shape may be used sparingly as an accent. No other colours exist. "
    "Composition: ONE clear focal geometric metaphor, clean crisp shapes, "
    "flat fills, generous negative space, instantly readable as a small "
    "thumbnail. "
    "ABSOLUTELY NO TEXT: no words, letters, numbers, captions, labels, "
    "headlines, typography, watermarks, signatures, logos, UI text, or "
    "lettering of any kind anywhere in the image. The image must be purely "
    "pictorial. "
    "STRICTLY FORBIDDEN: any warm colour (orange, red, amber, gold, yellow, "
    "brown, peach, copper), green, neon glow, bloom, light bursts, lens "
    "flares, glowing auras or halos, gradients blowing out to white, drop "
    "shadows, photorealism, 3D renders, clay or plastic textures, "
    "skeuomorphism, realistic animals or creatures, busy backgrounds, "
    "collages, and stock-photo looks."
)

COPY_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["linkedin", "instagram", "whatsapp", "reel_hook", "hashtags"],
    "properties": {
        "linkedin": {
            "type": "string",
            "description": "120-200 words. First line is a standalone hook under 12 words. Blank line between paragraphs. No hashtags in the body. No link in the body — it goes in the first comment.",
        },
        "instagram": {
            "type": "string",
            "description": "60-120 words, short lines with breaks, scannable on a phone. Ends with a plain call to action pointing at the link in bio.",
        },
        "whatsapp": {
            "type": "string",
            "description": "Under 60 words. Written to be forwarded inside a college batch group by a student, not broadcast by a seller. Includes the URL inline.",
        },
        "reel_hook": {
            "type": "string",
            "description": "One spoken line under 12 words for the first three seconds of a Reel or Short.",
        },
        "hashtags": {
            "type": "array",
            "items": {"type": "string"},
            "description": "6-10 hashtags relevant to Indian final year students. No spaces, include the # prefix.",
        },
    },
}


def client():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY not found in env, ./.env, or ../linkedin-bot/.env"
        )
    return OpenAI(api_key=api_key)


def write_copy(oai, item):
    url = f"{SITE}{item['path']}"
    prompt = (
        "You write social posts for an independent engineer in India who builds "
        "final year projects for students and then teaches them the code in daily "
        "live sessions.\n"
        f"{VOICE_RULES}\n"
        f"Target audience: {item['audience']}.\n"
        f"Item type: {item['kind']} (a guide is free content — promote the "
        "usefulness, not the service; an offer may state what is sold, plainly).\n"
        f"Title: {item['title']}\n"
        f"What it covers: {item['hook']}\n"
        f"URL: {url}\n\n"
        "Write the four posts. Each must be able to stand alone."
    )
    resp = oai.chat.completions.create(
        model=TEXT_MODEL,
        messages=[{"role": "user", "content": prompt}],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "social_copy",
                "strict": True,
                "schema": COPY_SCHEMA,
            },
        },
    )
    return json.loads(resp.choices[0].message.content or "{}")


def image_brief(oai, item):
    prompt = (
        "You are an art director. Write ONE vivid image-generation prompt (max "
        "100 words) for a wordless share graphic aimed at engineering students.\n"
        "- The graphic is WORDLESS. Never ask for a headline, caption, label or "
        "any lettering — describe only what is drawn.\n"
        "- Build the scene around ONE concrete visual metaphor for the idea "
        "below, in flat geometric shapes. Be specific to THIS idea — never a "
        "generic laptop, graduation cap, circuit board or glowing cube, and "
        "never a realistic person or creature.\n"
        "- Flat 2D vector on a uniform near-black navy background, cyan and "
        "violet accents on navy and slate only. One focal subject, generous "
        "negative space, readable as a small thumbnail. No glow, no 3D, no warm "
        "colours.\n"
        "Return only the prompt text.\n\n"
        f"Title: {item['title']}\n\nIdea: {item['hook']}"
    )
    resp = oai.chat.completions.create(
        model=TEXT_MODEL, messages=[{"role": "user", "content": prompt}]
    )
    return (resp.choices[0].message.content or "").strip()


def render(oai, brief, size):
    result = oai.images.generate(
        model=IMAGE_MODEL,
        prompt=f"{brief}\n\n{IMAGE_STYLE_RULES}",
        size=size,
        quality=IMAGE_QUALITY,
    )
    return base64.b64decode(result.data[0].b64_json)


def to_clean_jpeg(png_bytes):
    """Re-encode to JPEG, dropping every metadata chunk (incl. C2PA)."""
    img = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=JPEG_QUALITY)
    return buf.getvalue()


def copy_markdown(item, copy):
    url = f"{SITE}{item['path']}"
    tags = " ".join(copy.get("hashtags", []))
    return f"""# {item['title']}

**URL:** {url}
**Images:** `public/social/{item['slug']}-wide.jpg` (LinkedIn) ·
`public/social/{item['slug']}-square.jpg` (Instagram, WhatsApp)

## LinkedIn

> Post the URL as the FIRST COMMENT, not in the body — LinkedIn demotes posts
> that link off-platform.

{copy.get('linkedin', '').strip()}

**First comment:** {url}

## Instagram

{copy.get('instagram', '').strip()}

{tags}

## WhatsApp — forward into batch groups

{copy.get('whatsapp', '').strip()}

## Reel / Short hook (first 3 seconds)

{copy.get('reel_hook', '').strip()}
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="copy only, no images")
    ap.add_argument("--no-copy", action="store_true", help="images only")
    ap.add_argument("--only", default="", help="slug substring filter")
    ap.add_argument("--square", action="store_true", help="square images only")
    ap.add_argument("--wide", action="store_true", help="wide images only")
    args = ap.parse_args()

    items = [i for i in ITEMS if args.only in i["slug"]]
    if not items:
        print(f"no items match --only {args.only!r}")
        sys.exit(1)

    ratios = []
    if not args.square:
        ratios.append(("wide", "1536x1024"))
    if not args.wide:
        ratios.append(("square", "1024x1024"))

    IMG_DIR.mkdir(parents=True, exist_ok=True)
    COPY_DIR.mkdir(parents=True, exist_ok=True)
    oai = client()
    wrote, rendered, skipped, failed = 0, 0, 0, []

    for item in items:
        slug = item["slug"]
        try:
            if not args.no_copy:
                print(f"copy: {slug}")
                copy = write_copy(oai, item)
                (COPY_DIR / f"{slug}.md").write_text(
                    copy_markdown(item, copy), encoding="utf-8"
                )
                wrote += 1

            if args.dry_run:
                continue

            brief = None
            for name, size in ratios:
                target = IMG_DIR / f"{slug}-{name}.jpg"
                if target.exists():
                    print(f"  skip (exists): {target.name}")
                    skipped += 1
                    continue
                if brief is None:
                    brief = image_brief(oai, item)
                    print(f"  brief -> {brief[:110]}...")
                print(f"  render: {target.name}")
                target.write_bytes(to_clean_jpeg(render(oai, brief, size)))
                print(f"    -> saved ({target.stat().st_size // 1024} KB)")
                rendered += 1
        except Exception as exc:
            print(f"  !! failed for {slug}: {exc}")
            failed.append(slug)

    print(f"\ncopy={wrote} images={rendered} skipped={skipped} failed={len(failed)}")
    if failed:
        print("failed slugs (re-run to retry):", ", ".join(failed))
        sys.exit(1)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
