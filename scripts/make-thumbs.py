"""Small WebP card thumbnails from public/og/*.jpg -> public/og/thumb/<slug>.webp (640 px wide, q75).
Usage: python scripts/make-thumbs.py [slug ...]   (no args = every cover)"""
import pathlib, sys
from PIL import Image

OG = pathlib.Path(__file__).resolve().parent.parent / "public" / "og"
THUMB = OG / "thumb"
W = 640

def make_thumb(src: pathlib.Path) -> pathlib.Path:
    THUMB.mkdir(parents=True, exist_ok=True)
    out = THUMB / f"{src.stem}.webp"
    im = Image.open(src).convert("RGB")
    h = round(im.height * W / im.width)
    im.resize((W, h), Image.LANCZOS).save(out, "WEBP", quality=75, method=6)
    return out

if __name__ == "__main__":
    slugs = sys.argv[1:]
    files = [OG / f"{s}.jpg" for s in slugs] if slugs else sorted(OG.glob("*.jpg"))
    for f in files:
        if f.exists():
            print(make_thumb(f))
