"""Crawl a live site and flag everything that tells Google "do not index this" or makes a page look low value.

    python scripts/seo-audit.py https://yk.streamerosai.com/ [--max 600]

Starts from the sitemap (following sitemap indexes), then follows internal links. For every page it checks status,
redirects, noindex (meta and header), canonical, title and description, headings, visible word count (thin pages),
near-duplicate text, structured data, hreflang, orphan status, broken internal links, redirect stubs in the
sitemap, and soft-404 patterns. Writes gsc/out/audit/<host>.json and prints a summary. Read-only; never commit gsc/.
"""
import collections, concurrent.futures as cf, hashlib, json, re, sys, time
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

OUT = Path(__file__).resolve().parent.parent / 'gsc' / 'out' / 'audit'
UA = {'User-Agent': 'Mozilla/5.0 (compatible; seo-audit/1.0; +https://yk.streamerosai.com)'}
S = requests.Session()
S.headers.update(UA)


def get(url, allow=True):
    for i in range(3):
        try:
            return S.get(url, timeout=30, allow_redirects=allow)
        except requests.RequestException:
            time.sleep(1 + i)
    return None


def sitemap_urls(base):
    seen, out = set(), []

    def walk(u):
        if u in seen:
            return
        seen.add(u)
        r = get(u)
        if not r or r.status_code != 200:
            return
        locs = re.findall(r'<loc>(.*?)</loc>', r.text)
        if '<sitemapindex' in r.text:
            for c in locs:
                walk(c)
        else:
            out.extend(locs)

    walk(base.rstrip('/') + '/sitemap.xml')
    if not out:
        walk(base.rstrip('/') + '/sitemap-index.xml')
    return out


def norm(u):
    u, _ = urldefrag(u)
    return u


def words_of(soup):
    root = soup.find('main') or soup.find('article') or soup.body or soup
    for t in root(['script', 'style', 'noscript', 'nav', 'footer', 'header', 'svg']):
        t.decompose()
    text = re.sub(r'\s+', ' ', root.get_text(' ', strip=True))
    return text


def analyse(url, host):
    r = get(url, allow=False)
    rec = {'url': url, 'issues': []}
    if r is None:
        rec['issues'].append(('critical', 'unreachable'))
        return rec, []
    hops, cur = 0, r
    while cur is not None and cur.status_code in (301, 302, 303, 307, 308) and hops < 6:
        hops += 1
        loc = urljoin(cur.url, cur.headers.get('Location', ''))
        cur = get(loc, allow=False)
    rec['status'] = cur.status_code if cur is not None else 0
    rec['hops'] = hops
    rec['final'] = cur.url if cur is not None else url
    if hops:
        rec['issues'].append(('warn' if hops == 1 else 'high', f'redirects {hops}x to {rec["final"]}'))
    if cur is None or cur.status_code != 200:
        rec['issues'].append(('critical', f'status {rec["status"]}'))
        return rec, []
    html = cur.text
    soup = BeautifulSoup(html, 'html.parser')
    xrobots = cur.headers.get('X-Robots-Tag', '')
    robots_meta = ' '.join(m.get('content', '') for m in soup.find_all('meta', attrs={'name': re.compile('^(robots|googlebot)$', re.I)}))
    if 'noindex' in (xrobots + robots_meta).lower():
        rec['issues'].append(('critical', 'noindex'))
    rec['noindex'] = 'noindex' in (xrobots + robots_meta).lower()
    refresh = soup.find('meta', attrs={'http-equiv': re.compile('refresh', re.I)})
    stub = bool(refresh) or bool(re.search(r'location\.replace\(', html)) and len(html) < 2500
    rec['stub'] = stub
    if stub:
        rec['issues'].append(('high', 'redirect stub page (meta refresh or JS redirect)'))
    can = soup.find('link', rel='canonical')
    can_url = can.get('href') if can else None
    rec['canonical'] = can_url
    if not can_url:
        rec['issues'].append(('high', 'no canonical'))
    else:
        cn = norm(urljoin(url, can_url))
        if urlparse(cn).netloc != urlparse(url).netloc:
            rec['issues'].append(('high', f'canonical points to another host: {cn}'))
        elif cn.rstrip('/') != norm(rec['final']).rstrip('/'):
            rec['issues'].append(('high', f'canonical differs from URL: {cn}'))
        elif cn != norm(rec['final']):
            rec['issues'].append(('warn', f'canonical trailing-slash differs: {cn}'))
    title = (soup.title.string.strip() if soup.title and soup.title.string else '')
    md = soup.find('meta', attrs={'name': 'description'})
    desc = (md.get('content', '').strip() if md else '')
    rec['title'], rec['desc'] = title, desc
    if not title:
        rec['issues'].append(('high', 'no title'))
    elif len(title) > 70:
        rec['issues'].append(('warn', f'title long ({len(title)})'))
    elif len(title) < 15:
        rec['issues'].append(('warn', f'title short ({len(title)})'))
    if not desc:
        rec['issues'].append(('high', 'no meta description'))
    elif len(desc) > 165:
        rec['issues'].append(('warn', f'description long ({len(desc)})'))
    elif len(desc) < 60:
        rec['issues'].append(('warn', f'description short ({len(desc)})'))
    h1 = soup.find_all('h1')
    rec['h1'] = len(h1)
    if len(h1) != 1:
        rec['issues'].append(('warn', f'{len(h1)} h1 tags'))
    if not soup.find('meta', attrs={'name': 'viewport'}):
        rec['issues'].append(('high', 'no viewport meta'))
    if not (soup.html and soup.html.get('lang')):
        rec['issues'].append(('warn', 'no html lang'))
    imgs = soup.find_all('img')
    noalt = [i for i in imgs if i.get('alt') is None]
    if noalt:
        rec['issues'].append(('warn', f'{len(noalt)} images without alt'))
    # structured data
    ld_types, ld_bad = [], 0
    for s in soup.find_all('script', type='application/ld+json'):
        try:
            d = json.loads(s.string or '')
            items = d.get('@graph', [d]) if isinstance(d, dict) else d
            for it in items:
                t = it.get('@type') if isinstance(it, dict) else None
                ld_types += t if isinstance(t, list) else [t]
        except Exception:
            ld_bad += 1
    rec['ld'] = sorted({str(t) for t in ld_types if t})
    if ld_bad:
        rec['issues'].append(('high', f'{ld_bad} invalid JSON-LD block(s)'))
    if not ld_types:
        rec['issues'].append(('warn', 'no structured data'))
    # hreflang
    alts = {a.get('hreflang'): a.get('href') for a in soup.find_all('link', rel='alternate') if a.get('hreflang')}
    rec['hreflang'] = len(alts)
    # text
    links = []
    for a in soup.find_all('a', href=True):
        h = a['href']
        if h.startswith(('mailto:', 'tel:', 'javascript:', '#', 'whatsapp:')):
            continue
        full = norm(urljoin(cur.url, h))
        if urlparse(full).netloc == host and not re.search(r'\.(png|jpe?g|webp|svg|gif|pdf|zip|md|csv|xlsx?|apk|ipa|ico|xml|txt|json|webmanifest)(\?|$)', full, re.I):
            links.append(full)
    text = words_of(soup)
    wc = len(text.split())
    rec['words'] = wc
    rec['bytes'] = len(html)
    if wc < 120:
        rec['issues'].append(('high', f'very thin ({wc} words)'))
    elif wc < 300:
        rec['issues'].append(('warn', f'thin ({wc} words)'))
    if re.search(r'(not found|404|page does not exist)', title, re.I):
        rec['issues'].append(('critical', 'soft 404 title'))
    if len(html) > 1_500_000:
        rec['issues'].append(('warn', f'heavy page {len(html)//1024} KB'))
    rec['shingles'] = list({hashlib.md5(' '.join(w).encode()).hexdigest()[:10] for w in zip(*[text.lower().split()[i:] for i in range(5)])}) if wc >= 60 else []
    return rec, links


def main():
    base = sys.argv[1].rstrip('/') + '/'
    cap = int(sys.argv[sys.argv.index('--max') + 1]) if '--max' in sys.argv else 600
    host = urlparse(base).netloc
    sm = [norm(u) for u in sitemap_urls(base)]
    todo = collections.deque(sm or [base])
    seen, recs, inbound = set(), {}, collections.Counter()
    page_links = {}
    with cf.ThreadPoolExecutor(8) as ex:
        while todo and len(seen) < cap:
            batch = []
            while todo and len(batch) < 24 and len(seen) + len(batch) < cap:
                u = todo.popleft()
                if u not in seen:
                    seen.add(u); batch.append(u)
            for u, (rec, links) in zip(batch, ex.map(lambda x: analyse(x, host), batch)):
                recs[u] = rec
                page_links[u] = links
                for l in set(links):
                    inbound[l] += 1
                    if l not in seen and l not in todo:
                        todo.append(l)
    # cross-page checks
    tcount = collections.Counter(r.get('title') for r in recs.values() if r.get('title'))
    dcount = collections.Counter(r.get('desc') for r in recs.values() if r.get('desc'))
    smset = set(sm)
    for u, r in recs.items():
        if r.get('title') and tcount[r['title']] > 1:
            r['issues'].append(('high', f'duplicate title x{tcount[r["title"]]}'))
        if r.get('desc') and dcount[r['desc']] > 1:
            r['issues'].append(('warn', f'duplicate description x{dcount[r["desc"]]}'))
        if sm and u not in smset and r.get('status') == 200 and not r.get('noindex') and not r.get('stub'):
            r['issues'].append(('warn', 'indexable page missing from sitemap'))
        if u in smset and inbound[u] == 0 and u.rstrip('/') != base.rstrip('/'):
            r['issues'].append(('warn', 'orphan: in sitemap but no internal link points to it'))
        if u in smset and (r.get('noindex') or r.get('stub') or r.get('hops')):
            r['issues'].append(('critical', 'sitemap lists a URL that redirects, is a stub or is noindex'))
        for l in set(page_links.get(u, [])):
            lr = recs.get(l)
            if lr and lr.get('status') not in (200, None) and lr.get('status') not in (301, 302):
                r['issues'].append(('high', f'links to broken page {l} ({lr.get("status")})'))
    # near-duplicate pages (5-word shingles, Jaccard)
    items = [(u, set(r['shingles'])) for u, r in recs.items() if r.get('shingles')]
    dups = []
    for i in range(len(items)):
        a_u, a = items[i]
        for j in range(i + 1, len(items)):
            b_u, b = items[j]
            inter = len(a & b)
            if inter and inter / len(a | b) > 0.7:
                dups.append((a_u, b_u, round(inter / len(a | b), 2)))
    for a_u, b_u, s in dups:
        recs[a_u]['issues'].append(('high', f'near-duplicate of {b_u} ({s})'))
        recs[b_u]['issues'].append(('high', f'near-duplicate of {a_u} ({s})'))
    for r in recs.values():
        r.pop('shingles', None)
    # site-level
    rb = get(base + 'robots.txt')
    site = {'robots_status': rb.status_code if rb else None, 'robots_blocks_all': bool(rb and re.search(r'^Disallow:\s*/\s*$', rb.text, re.M)),
            'robots_sitemap': bool(rb and re.search(r'^Sitemap:', rb.text, re.M | re.I)), 'sitemap_urls': len(sm),
            'http_to_https': None, 'www': None, 'not_found_status': None}
    h = get(base.replace('https://', 'http://'), allow=False)
    site['http_to_https'] = (h.status_code, h.headers.get('Location')) if h else None
    nf = get(base + 'this-page-should-not-exist-seo-audit/', allow=False)
    site['not_found_status'] = nf.status_code if nf else None
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f'{host}.json').write_text(json.dumps({'site': site, 'pages': recs}, indent=1), encoding='utf-8')
    # summary
    sev = collections.Counter()
    kinds = collections.defaultdict(list)
    for u, r in recs.items():
        for s, m in r['issues']:
            sev[s] += 1
            kinds[(s, re.sub(r'[\d,]+', 'N', re.sub(r'https?://\S+', 'URL', m)))].append(u)
    print(f'\n=== {host}: {len(recs)} pages crawled, {len(sm)} in sitemap | critical {sev["critical"]}, high {sev["high"]}, warn {sev["warn"]}')
    print('site:', site)
    order = {'critical': 0, 'high': 1, 'warn': 2}
    for (s, m), us in sorted(kinds.items(), key=lambda kv: (order[kv[0][0]], -len(kv[1]))):
        print(f'  [{s:8}] {len(us):4d} x {m}   e.g. {us[0].replace(base, "/")}')
    wc = sorted((r.get('words', 0) for r in recs.values() if r.get('status') == 200))
    if wc:
        print(f'  words: median {wc[len(wc)//2]}, min {wc[0]}, pages under 300: {sum(1 for w in wc if w < 300)}')


if __name__ == '__main__':
    main()
