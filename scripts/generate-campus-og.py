"""Generate OG share images for the /final-year-projects surface.

Idempotent like generate-og-images.py: skips any target that already exists in
public/og/campus/, so re-running only fills gaps. Same art-director -> render ->
clean-JPEG pipeline, same brand-locked IMAGE_STYLE_RULES (keep in sync with
generate-og-images.py and ai_writer.py — see CLAUDE.md).

Why it exists: WhatsApp groups are the #1 student distribution channel, and the
campus pages currently share with no preview image at all. The earlier attempt
(portal-wide.jpg) failed the style contract — the render put currency glyphs on
coins — so the art-director pass here explicitly forbids money imagery.

Usage:  python scripts/generate-campus-og.py
Key:    OPENAI_API_KEY from the environment, ./.env, or ../linkedin-bot/.env.
"""

import base64
import io
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "og" / "campus"

load_dotenv(ROOT / ".env")
load_dotenv(ROOT.parent / "linkedin-bot" / ".env")

TEXT_MODEL = "gpt-5.5"
IMAGE_MODEL = "gpt-image-1"
IMAGE_SIZE = "1536x1024"
IMAGE_QUALITY = "medium"
JPEG_QUALITY = 85

# One image per campus surface, plus one per project category (the 11 catalog
# listings share their category's cover rather than getting 11 bespoke renders).
SURFACES = [
    {
        "name": "hub",
        "title": "Final Year Projects",
        "hook": "A catalog of buildable final-year projects: a constellation or grid of connected project nodes with one node highlighted — choice, not overwhelm.",
    },
    {
        "name": "find-my-project",
        "title": "Find Your Project Quiz",
        "hook": "Four branching questions narrowing to one right answer: forking paths that converge onto a single highlighted node.",
    },
    {
        "name": "cost-estimator",
        "title": "Project Cost Estimator",
        "hook": "Transparent scoping: a geometric slider or balance-beam metaphor settling into equilibrium. STRICTLY no coins, no currency, no money imagery of any kind.",
    },
    {
        "name": "templates",
        "title": "Report & Synopsis Templates",
        "hook": "Ready structure: layered document sheets with clean rectangular section blocks arranged in order, one sheet lifting away from the stack.",
    },
    {
        "name": "planner",
        "title": "Timeline Planner",
        "hook": "A semester mapped honestly: horizontal timeline bars of different lengths with milestone ticks, one bar reaching a terminal marker.",
    },
    {
        "name": "question-bank",
        "title": "Viva Question Bank",
        "hook": "Practice until calm: a fanned deck of flash cards, the front card highlighted, suggesting readiness for questioning.",
    },
    {
        "name": "guides",
        "title": "Project Guides",
        "hook": "A route through unfamiliar territory: a stylised map line winding between geometric waypoints toward a flag-like terminal shape.",
    },
    {
        "name": "colleges",
        "title": "For Colleges & Departments",
        "hook": "A cohort, not an individual: rows of small identical geometric figures or seats facing a single raised podium shape.",
    },
    {
        "name": "custom",
        "title": "Custom Built Project",
        "hook": "Built to your problem statement: a blueprint-style wireframe of an abstract structure, half schematic and half solid, on a subtle grid.",
    },
    {
        "name": "cat-ai-ml",
        "title": "AI & Machine Learning Projects",
        "hook": "Machine learning as geometry: an abstract layered network of connected nodes resolving from scattered points into an ordered lattice.",
    },
    {
        "name": "cat-web",
        "title": "Web Development Projects",
        "hook": "The web app as artifact: a minimal abstract browser frame holding clean geometric layout blocks, one element actively highlighted.",
    },
    {
        "name": "cat-mobile",
        "title": "Mobile App Projects",
        "hook": "The app in hand: a minimal abstract phone silhouette with flat geometric interface shapes, screen glowing softly in palette colours only.",
    },
]

# Brand contract — matches the site's "streamerOS Signal Kit" theme
# (ink #05070A background, cyan #22D3EE / violet #A855F7 accents).
# KEEP BYTE-IDENTICAL with generate-og-images.py / ai_writer.py (CLAUDE.md).
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


def client():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY not found in env, ./.env, or ../linkedin-bot/.env"
        )
    return OpenAI(api_key=api_key)


def image_brief(oai, title, hook):
    prompt = (
        "You are an art director for a student-facing education portal that "
        "shares its pages into WhatsApp groups. Write ONE vivid "
        "image-generation prompt (max 100 words) for a scroll-stopping "
        "OpenGraph cover thumbnail.\n"
        "- The cover is WORDLESS. Never ask for a headline, caption, label, "
        "digits, or any lettering — describe only what is drawn.\n"
        "- NEVER include coins, banknotes, currency symbols, or any money "
        "imagery, regardless of the topic.\n"
        "- Build the scene around ONE concrete visual metaphor for the page's "
        "purpose, expressed in flat geometric shapes. Be specific to THIS "
        "page — never a generic laptop, circuit board, or glowing cube, and "
        "never a realistic person, animal, or character.\n"
        "- Flat 2D vector illustration on a uniform near-black navy background "
        "using only cyan and violet accents on navy/slate; one clear focal "
        "subject with generous negative space, readable as a small thumbnail. "
        "No glow, no 3D, no warm colours.\n"
        "Return only the prompt text.\n\n"
        f"Page title: {title}\n\nPage purpose: {hook}"
    )
    resp = oai.chat.completions.create(
        model=TEXT_MODEL, messages=[{"role": "user", "content": prompt}]
    )
    return (resp.choices[0].message.content or "").strip()


def render(oai, brief):
    result = oai.images.generate(
        model=IMAGE_MODEL,
        prompt=f"{brief}\n\n{IMAGE_STYLE_RULES}",
        size=IMAGE_SIZE,
        quality=IMAGE_QUALITY,
    )
    return base64.b64decode(result.data[0].b64_json)


def to_clean_jpeg(png_bytes):
    """Re-encode to JPEG, dropping every metadata chunk (incl. C2PA)."""
    img = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=JPEG_QUALITY)
    return buf.getvalue()


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    oai = client()
    done, skipped, failed = 0, 0, []

    for surface in SURFACES:
        target = OUT_DIR / f"{surface['name']}.jpg"
        if target.exists():
            print(f"skip (exists): {target.name}")
            skipped += 1
            continue
        try:
            print(f"brief: {surface['name']}")
            brief = image_brief(oai, surface["title"], surface["hook"])
            print(f"  -> {brief[:120]}...")
            print(f"render: {surface['name']}")
            target.write_bytes(to_clean_jpeg(render(oai, brief)))
            kb = target.stat().st_size // 1024
            print(f"  -> saved {target.name} ({kb} KB)")
            done += 1
        except Exception as exc:
            print(f"  !! failed for {surface['name']}: {exc}")
            failed.append(surface["name"])

    print(f"\ngenerated={done} skipped={skipped} failed={len(failed)}")
    if failed:
        print("failed surfaces (re-run to retry):", ", ".join(failed))
        sys.exit(1)


if __name__ == "__main__":
    main()
