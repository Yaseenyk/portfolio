"""Generate OG cover images for blog posts with gpt-image-1.

One-time (idempotent) generator: skips any slug that already has an image in
public/og/, so re-running only fills gaps. Mirrors the linkedin-bot cover
pipeline: an art-director text pass writes a bespoke brief per post, the image
model renders it, and the result is re-encoded to metadata-free JPEG.

Usage:  python scripts/generate-og-images.py
Key:    OPENAI_API_KEY from the environment, ./.env, or ../linkedin-bot/.env.
Cost:   ~$0.06-0.07 per image (gpt-image-1, medium, 1536x1024) + pennies of
        text tokens for the briefs.
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
OUT_DIR = ROOT / "public" / "og"

load_dotenv(ROOT / ".env")
load_dotenv(ROOT.parent / "linkedin-bot" / ".env")

TEXT_MODEL = "gpt-5.5"
IMAGE_MODEL = "gpt-image-1"
IMAGE_SIZE = "1536x1024"
IMAGE_QUALITY = "medium"
JPEG_QUALITY = 85

# The Founder's Log series (title + hook drive the art direction).
POSTS = [
    {
        "slug": "my-journey-web-developer-to-ai-engineer",
        "title": "How I Went From My First Dev Job to Building AI Systems",
        "hook": "Five years honestly told: an ASP.NET healthcare backend in 2021, full-stack MERN through the ChatGPT shift, nights of embeddings homework, then five AI products shipped solo. A road/journey metaphor fits.",
    },
    {
        "slug": "shipped-5-products-solo-12-months",
        "title": "I Shipped 5 Products in 12 Months — Solo, Unfunded, and Faster Than Most Teams Ship One",
        "hook": "One engineer, five production systems in a year: a Rust desktop cockpit, a workflow engine, a local-first AI finance agent, and two autonomous pipelines.",
    },
    {
        "slug": "vision-over-syntax-architecture-first",
        "title": "Vision Over Syntax: I Design the Entire Product in My Head Before the First Commit",
        "hook": "Architecture-first thinking: the whole system — data flow, trust boundaries, cost curve — is seen and priced before any code exists.",
    },
    {
        "slug": "one-architect-claude-mcp-full-squad",
        "title": "One Architect + Claude + MCP = A Full Engineering Squad",
        "hook": "A three-layer operating model: a human architect owning contracts and review, Claude Code executing, MCP servers wiring the model to Postgres, the browser, and Git.",
    },
    {
        "slug": "ai-finops-playbook-stop-burning-money",
        "title": "Your Company Is Overpaying for AI by 80%",
        "hook": "Most LLM traffic is simple or repetitive yet billed at frontier prices. A cache -> flash -> frontier routing cascade fixes the economics.",
    },
    {
        "slug": "linkedin-pipeline-job-search-runs-itself",
        "title": "My Networking Runs Itself",
        "hook": "An autonomous pipeline turns real work into scheduled LinkedIn posts and commits its own state ledger to Git — consistency as a systems property.",
    },
    {
        "slug": "zero-dollar-content-engine",
        "title": "The $0 Content Engine",
        "hook": "A blog that writes, commits, and deploys itself twice a week. No CMS, no server, no database — the whole stack is a Git repository.",
    },
    {
        "slug": "sable-ai-agent-never-touches-money",
        "title": "An AI Money Agent That Can't Touch the Money",
        "hook": "Local-first finance: all data in on-device SQLite, and a Review & Confirm boundary where the model proposes but only a human commits.",
    },
    {
        "slug": "streameros-rust-over-electron",
        "title": "Everyone Said 'Just Use Electron.' I Chose Rust.",
        "hook": "A streaming cockpit must be weightless on a PC already running a game, an encoder, and OBS — the native Rust core is the product decision.",
    },
    {
        "slug": "the-94-percent-decision-integratex",
        "title": "The 94% Decision",
        "hook": "Persisting the view nearly sank the product. A serialization boundary between UI model and domain model cut payloads 94% and made the canvas instant.",
    },
    {
        "slug": "hire-my-head-not-my-hands",
        "title": "Hire My Head, Not My Hands",
        "hook": "AI made hands abundant; heads stayed scarce. Five solo products as evidence of the judgment a resume can't show.",
    },
]

# Brand contract — matches the site's "streamerOS Signal Kit" theme
# (ink #05070A background, cyan #22D3EE / violet #A855F7 accents).
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


def client():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY not found in env, ./.env, or ../linkedin-bot/.env"
        )
    return OpenAI(api_key=api_key)


def image_brief(oai, title, hook):
    prompt = (
        "You are an art director for a software engineering blog. Write ONE "
        "vivid image-generation prompt (max 100 words) for a scroll-stopping "
        "LinkedIn/OpenGraph cover thumbnail.\n"
        "- Distill the article into a punchy 3-6 word HEADLINE (plain ASCII, "
        "may include one number if it is the key result). Put the headline in "
        "double quotes and state it must be rendered exactly once, spelled "
        "exactly as given, in huge bold sans-serif type dominating the layout.\n"
        "- Build the scene around ONE concrete, creative visual metaphor for "
        "the article's core idea. Be specific to THIS article — never a "
        "generic laptop, circuit board, or glowing cube.\n"
        "- Flat editorial-illustration scene on a near-black navy background "
        "with cyan and violet accents only; one clear focal subject, "
        "readable as a small thumbnail. No glow effects.\n"
        "- Besides the quoted headline, no other text or lettering anywhere.\n"
        "Return only the prompt text.\n\n"
        f"Article title: {title}\n\nArticle hook: {hook}"
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

    for post in POSTS:
        target = OUT_DIR / f"{post['slug']}.jpg"
        if target.exists():
            print(f"skip (exists): {target.name}")
            skipped += 1
            continue
        try:
            print(f"brief: {post['slug']}")
            brief = image_brief(oai, post["title"], post["hook"])
            print(f"  -> {brief[:120]}...")
            print(f"render: {post['slug']}")
            target.write_bytes(to_clean_jpeg(render(oai, brief)))
            kb = target.stat().st_size // 1024
            print(f"  -> saved {target.name} ({kb} KB)")
            done += 1
        except Exception as exc:
            print(f"  !! failed for {post['slug']}: {exc}")
            failed.append(post["slug"])

    print(f"\ngenerated={done} skipped={skipped} failed={len(failed)}")
    if failed:
        print("failed slugs (re-run to retry):", ", ".join(failed))
        sys.exit(1)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
