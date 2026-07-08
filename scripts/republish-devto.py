"""Republish blog posts to dev.to with canonical URLs pointing home.

Cross-posting to dev.to borrows its domain authority while canonical_url
keeps the SEO credit on the portfolio. Posts are created as DRAFTS so you
can eyeball each one on dev.to and hit publish yourself.

Usage:  python scripts/republish-devto.py [slug ...]
        (no args = the 10 Founder's Log posts)
Env:    DEVTO_API_KEY — create at dev.to Settings → Extensions → API keys;
        read from the environment, ./.env, or scripts/.env.
State:  scripts/devto-published.json records slug → dev.to id (idempotent).
"""

import json
import os
import re
import sys
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
STATE_FILE = ROOT / "scripts" / "devto-published.json"
SITE = "https://yaseenkhatib.streamerosai.com"

load_dotenv(ROOT / ".env")
load_dotenv(ROOT / "scripts" / ".env")

FOUNDERS_LOG = [
    "shipped-5-products-solo-12-months",
    "vision-over-syntax-architecture-first",
    "one-architect-claude-mcp-full-squad",
    "ai-finops-playbook-stop-burning-money",
    "linkedin-pipeline-job-search-runs-itself",
    "zero-dollar-content-engine",
    "sable-ai-agent-never-touches-money",
    "streameros-rust-over-electron",
    "the-94-percent-decision-integratex",
    "hire-my-head-not-my-hands",
]


def html_to_markdown(el) -> str:
    """Convert the article's simple HTML (p/h2/h3/ul/blockquote/a/code) to MD."""
    out = []
    for node in el.children:
        name = getattr(node, "name", None)
        if name is None:
            continue
        text = _inline(node)
        if name == "p":
            out.append(text)
        elif name in ("h2", "h3"):
            out.append(("## " if name == "h2" else "### ") + text)
        elif name in ("ul", "ol"):
            bullet = "-" if name == "ul" else "1."
            out.extend(f"{bullet} {_inline(li)}" for li in node.find_all("li", recursive=False))
        elif name == "blockquote":
            out.append("> " + text)
        elif name == "pre":
            out.append(f"```\n{node.get_text()}\n```")
    return "\n\n".join(x for x in out if x.strip())


def _inline(node) -> str:
    def walk(n) -> str:
        name = getattr(n, "name", None)
        if name is None:
            return str(n)
        inner = "".join(walk(c) for c in n.children)
        if name in ("strong", "b"):
            return f"**{inner}**"
        if name in ("em", "i"):
            return f"*{inner}*"
        if name == "code":
            return f"`{n.get_text()}`"
        if name == "a":
            href = n.get("href", "")
            if href.startswith("/"):
                href = SITE + href
            return f"[{inner}]({href})"
        return inner

    text = "".join(walk(c) for c in node.children)
    return re.sub(r"\s+", " ", text).strip()


def fetch_post(slug: str) -> dict:
    url = f"{SITE}/blog/{slug}/"
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    title = soup.h1.get_text(strip=True)
    desc = soup.find("meta", attrs={"name": "description"})
    description = desc["content"] if desc else ""
    og = soup.find("meta", attrs={"property": "og:image"})
    cover = og["content"] if og else None

    article = soup.find("div", class_=re.compile(r"prose"))
    body_md = html_to_markdown(article)

    footer = (
        f"\n\n---\n\n*Originally published on [my portfolio]({url}) — "
        f"where you can also query my experience through a RAG terminal, "
        f"or explore the [product teardowns]({SITE}/products).*"
    )
    return {
        "title": title,
        "description": description,
        "cover": cover,
        "markdown": body_md + footer,
        "canonical": url,
    }


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")


def publish(api_key: str, post: dict) -> int:
    payload = {
        "article": {
            "title": post["title"],
            "published": False,  # draft — review on dev.to, then publish
            "body_markdown": post["markdown"],
            "canonical_url": post["canonical"],
            "description": post["description"][:150],
            "tags": ["ai", "webdev", "architecture", "career"],
            **({"main_image": post["cover"]} if post["cover"] else {}),
        }
    }
    resp = requests.post(
        "https://dev.to/api/articles",
        headers={"api-key": api_key, "Content-Type": "application/json"},
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["id"]


def main() -> None:
    api_key = (os.environ.get("DEVTO_API_KEY") or "").strip()
    if not api_key:
        sys.exit(
            "ERROR: DEVTO_API_KEY is not set.\n"
            "Create one at https://dev.to/settings/extensions (API Keys), "
            "then add DEVTO_API_KEY=... to .env and re-run."
        )

    slugs = sys.argv[1:] or FOUNDERS_LOG
    state = load_state()

    for slug in slugs:
        if slug in state:
            print(f"skip (already on dev.to as draft/article {state[slug]}): {slug}")
            continue
        print(f"fetch: {slug}")
        post = fetch_post(slug)
        article_id = publish(api_key, post)
        state[slug] = article_id
        save_state(state)
        print(f"  -> dev.to draft created (id {article_id}): {post['title']}")
        time.sleep(31)  # dev.to allows roughly one article creation per 30s

    print("\nDone. Review the drafts in https://dev.to/dashboard and publish.")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
