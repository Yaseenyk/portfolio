# Read Search Console with the service account in gsc/service-account.json.
#
#   python scripts/gsc-pull.py                                  -> list the properties the account can read
#   python scripts/gsc-pull.py sc-domain:example.com [days]     -> queries / pages / dates for the last N days (default 28)
#
# Output lands in gsc/out/<property>/ as JSON rows and as CSVs shaped exactly
# like the Search Console UI exports, so sitedx (or any script that reads
# those exports) can take them unchanged. Never commit gsc/ — it is ignored.

import csv
import json
import sys
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import quote

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account

HERE = Path(__file__).resolve().parent.parent / "gsc"  # gitignored: key + output
KEY = HERE / "service-account.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
API = "https://www.googleapis.com/webmasters/v3"


def token() -> str:
    creds = service_account.Credentials.from_service_account_file(KEY, scopes=SCOPES)
    creds.refresh(Request())
    return creds.token


def get(path: str):
    r = requests.get(f"{API}{path}", headers={"Authorization": f"Bearer {token()}"}, timeout=60)
    r.raise_for_status()
    return r.json()


def query(site: str, body: dict) -> list:
    r = requests.post(
        f"{API}/sites/{quote(site, safe='')}/searchAnalytics/query",
        headers={"Authorization": f"Bearer {token()}"},
        json=body,
        timeout=60,
    )
    if r.status_code == 403:
        raise SystemExit(
            f"403 for {site}: the service account is not a user on this property.\n"
            "Search Console -> Settings -> Users and permissions -> Add user -> the account's email, Full."
        )
    r.raise_for_status()
    return r.json().get("rows", [])


HEADERS = {
    "query": ("Top queries", "performance-queries.csv"),
    "page": ("Top pages", "performance-pages.csv"),
    "date": ("Date", "performance-dates.csv"),
}


def write_csv(path: Path, first: str, rows: list) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, quoting=csv.QUOTE_ALL)
        w.writerow([first, "Clicks", "Impressions", "CTR", "Position"])
        for r in rows:
            w.writerow([r["keys"][0], r["clicks"], r["impressions"], f"{r['ctr'] * 100:.2f}%", f"{r['position']:.2f}"])


def main() -> None:
    if not KEY.exists():
        raise SystemExit(f"missing {KEY}")
    if len(sys.argv) < 2:
        sites = get("/sites").get("siteEntry", [])
        if not sites:
            print("The account can see no properties yet. Add its email as a user in Search Console (Settings -> Users and permissions).")
        for s in sites:
            print(f"{s['siteUrl']:45s} {s['permissionLevel']}")
        return

    site = sys.argv[1]
    days = int(sys.argv[2]) if len(sys.argv) > 2 else 28
    end = date.today() - timedelta(days=2)  # Search Console data lags about two days
    start = end - timedelta(days=days - 1)
    out = HERE / "out" / site.replace("sc-domain:", "").replace("https://", "").replace("http://", "").strip("/").replace("/", "_")
    out.mkdir(parents=True, exist_ok=True)
    print(f"{site}: {start} to {end}")
    for dim, (first, name) in HEADERS.items():
        rows = query(site, {"startDate": str(start), "endDate": str(end), "dimensions": [dim], "rowLimit": 1000, "dataState": "final"})
        if dim == "date":
            rows.sort(key=lambda r: r["keys"][0])
        (out / f"{dim}s.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")
        write_csv(out / name, first, rows)
        total = sum(r["impressions"] for r in rows)
        print(f"  {dim:5s} {len(rows):4d} rows  {total:6d} impressions  -> {name}")
    print(f"written to {out}")


if __name__ == "__main__":
    main()
