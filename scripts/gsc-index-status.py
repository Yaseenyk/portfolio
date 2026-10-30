# Index status for every URL in a property's live sitemap, via the URL
# Inspection API (2,000 calls/day per property).
#
#   python scripts/gsc-index-status.py https://yaseenkhatib.streamerosai.com/
#
# Writes gsc/out/<property>/inspection.csv and prints a verdict table.
# Read-only: this API cannot request indexing. Never commit gsc/.

import csv
import re
import sys
import time
from collections import Counter
from pathlib import Path

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account

HERE = Path(__file__).resolve().parent.parent / "gsc"  # gitignored: key + output
KEY = HERE / "service-account.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters"]
INSPECT = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"


def token() -> str:
    creds = service_account.Credentials.from_service_account_file(KEY, scopes=SCOPES)
    creds.refresh(Request())
    return creds.token


def sitemap_urls(site: str) -> list[str]:
    xml = requests.get(f"{site.rstrip('/')}/sitemap.xml", timeout=30).text
    return re.findall(r"<loc>(.*?)</loc>", xml)


def inspect(tok: str, site: str, url: str, tries: int = 0) -> dict:
    r = requests.post(
        INSPECT,
        headers={"Authorization": f"Bearer {tok}"},
        json={"inspectionUrl": url, "siteUrl": site},
        timeout=60,
    )
    if r.status_code == 429 or r.status_code >= 500:
        if tries >= 5:
            r.raise_for_status()
        time.sleep(10 * (tries + 1))
        return inspect(tok, site, url, tries + 1)
    r.raise_for_status()
    res = r.json().get("inspectionResult", {}).get("indexStatusResult", {})
    return {
        "url": url,
        "verdict": res.get("verdict", ""),
        "coverage": res.get("coverageState", ""),
        "last_crawl": (res.get("lastCrawlTime") or "")[:10],
        "crawled_as": res.get("crawledAs", ""),
        "robots": res.get("robotsTxtState", ""),
        "indexing_allowed": res.get("indexingState", ""),
        "google_canonical": res.get("googleCanonical", ""),
        "referring": len(res.get("referringUrls", []) or []),
    }


def main() -> None:
    site = sys.argv[1]
    urls = sitemap_urls(site)
    tok = token()
    out = HERE / "out" / site.replace("https://", "").strip("/")
    out.mkdir(parents=True, exist_ok=True)
    rows = []
    for i, url in enumerate(urls, 1):
        row = inspect(tok, site, url)
        rows.append(row)
        print(f"{i:3d}/{len(urls)}  {row['coverage'][:38]:38s} {row['last_crawl']:10s} {url.replace(site.rstrip('/'), '')}")
        time.sleep(0.4)
    with (out / "inspection.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print("\nSummary:")
    for k, v in Counter(r["coverage"] for r in rows).most_common():
        print(f"  {v:3d}  {k}")
    print(f"written to {out / 'inspection.csv'}")


if __name__ == "__main__":
    main()
