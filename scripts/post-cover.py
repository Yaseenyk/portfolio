#!/usr/bin/env python3
"""Draw a brand cover for a post: python scripts/post-cover.py "<title>" <slug>

Writes public/og/<slug>.jpg. Flat vector on ink #05070A, cyan and violet only,
no glows, no warm hues, no image API. Same drawing the old ai_writer.py used,
kept as its own script now that posts are written in Claude Code sessions.
"""

from __future__ import annotations

import os
import pathlib
import sys
import textwrap

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OG_DIR = ROOT / "public" / "og"

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
    y = 220
    for line in textwrap.wrap(title, width=24)[:4]:
        d.text((96, y), line, font=title_font, fill=text)
        y += 108
    d.text((96, h - 140), "yk.streamerosai.com", font=font(34), fill=cyan)

    OG_DIR.mkdir(parents=True, exist_ok=True)
    target = OG_DIR / f"{slug}.jpg"
    img.save(target, format="JPEG", quality=88)
    return target


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit('usage: python scripts/post-cover.py "<title>" <slug>')
    print(draw_cover(sys.argv[1], sys.argv[2]))
