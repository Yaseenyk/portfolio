import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { SITE_URL, SITE_DESCRIPTION, VERIFICATION } from "@/lib/site";
import { siteGraphJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FirstTouch from "@/components/FirstTouch";
import MotionProvider from "@/components/MotionProvider";
import SiteFooter from "@/components/SiteFooter";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const TITLE_DEFAULT = "Yaseen Khatib | Senior Full-Stack AI Engineer";
const DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Yaseen Khatib",
  },
  description: DESCRIPTION,
  // Keywords phrased as the queries people actually type, not abstract labels.
  keywords: [
    "Yaseen Khatib",
    "hire full-stack AI engineer",
    "senior MERN stack developer for hire",
    "AI systems engineer remote",
    "RAG pipeline consultant",
    "LLM orchestration engineer",
    "TypeScript consultant",
    "Next.js developer",
    "Agentic RAG",
    "Node.js",
    "MongoDB",
  ],
  authors: [{ name: "Yaseen Khatib", url: SITE_URL }],
  creator: "Yaseen Khatib",
  alternates: {
    // Slash-terminated to match `trailingSlash: true` and the sitemap entry.
    canonical: `${SITE_URL}/`,
    // AEO: standalone machine-readable manifest for AI recruiter agents.
    types: {
      "application/ld+json": `${SITE_URL}/ai-briefing.json`,
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Yaseen Khatib",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-lockup.png`,
        alt: "Circuit Y mark — Yaseen Khatib, Senior Full-Stack AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-lockup.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    other: {
      ...(VERIFICATION.bing ? { "msvalidate.01": VERIFICATION.bing } : {}),
      ...(VERIFICATION.ahrefs
        ? { "ahrefs-site-verification": VERIFICATION.ahrefs }
        : {}),
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        {/* Google tag (GA4). A plain tag in the server-rendered head so Google's tag checker finds it
            in the HTML; next/script would inject it client-side and the checker misses it. Unlike
            GoatCounter and Ahrefs below, GA4 sets cookies. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XNCMTGDG3N" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var w=window,d=document,q=new URLSearchParams(location.search),st=null;try{st=w.localStorage}catch(e){}function g(k){return q.get(k)||''}var ref=g('ref'),hasUtm=!!g('utm_source');var ft=null;try{ft=JSON.parse(st.getItem('ga_ft')||'null')}catch(e){}if(!ft){var rh='';try{rh=d.referrer?new URL(d.referrer).hostname:''}catch(e){}ft={s:g('utm_source')||ref||rh||'direct',m:g('utm_medium')||(ref?'share':(rh?'referral':'none')),c:g('utm_campaign')||(ref?'ref-tag':'(not set)')};try{st.setItem('ga_ft',JSON.stringify(ft))}catch(e){}}w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}w.gtag=gtag;gtag('js',new Date());var cfg={};if(!hasUtm&&ref){cfg.campaign_source=ref;cfg.campaign_medium='share';cfg.campaign_name='ref-tag'}gtag('config','G-XNCMTGDG3N',cfg);w.gaEvent=function(n,p){try{p=p||{};p.first_source=ft.s;p.first_medium=ft.m;p.first_campaign=ft.c;p.cta_page=p.cta_page||location.pathname;gtag('event',n,p)}catch(e){}};d.addEventListener('click',function(e){try{var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'',n='';if(/^(https?:)?\\/\\/(wa\\.me|api\\.whatsapp\\.com)|^whatsapp:/i.test(h))n='whatsapp_click';else if(/^mailto:/i.test(h))n='email_click';else if(/^tel:/i.test(h))n='phone_click';else if(/\\.(apk|ipa)([?#]|$)/i.test(h))n='app_download';else if(/\\.md([?#]|$)/i.test(h))n='template_download';if(n)w.gaEvent(n,{cta_text:(a.textContent||'').trim().slice(0,60),link_url:h.slice(0,100)});}catch(x){}},true);})();",
          }}
        />
        {/* Microsoft Clarity: free heatmaps and session replay. Forms carry data-clarity-mask, so typed text is hidden. Not loaded on the private /leads and /outreach tools. */}
        <script dangerouslySetInnerHTML={{ __html: 'var p=location.pathname;if(p.indexOf("/leads")!==0&&p.indexOf("/outreach")!==0){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","z8axnsi8h4");}' }} />
      </head>
      <body className="font-sans">
        {/* AEO: sitewide entity graph — Person + WebSite with stable @ids
            that every page-level schema block references instead of
            redeclaring. */}
        <JsonLd data={siteGraphJsonLd} />
        <FirstTouch />
        <MotionProvider>
          {children}
          <SiteFooter />
          <CommandPalette />
        </MotionProvider>
        {/* GoatCounter — privacy-friendly, cookieless page analytics.
            Skips localhost automatically; dashboard at
            https://yaseen.goatcounter.com */}
        <script
          data-goatcounter="https://yaseen.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
        />
        {/* Ahrefs Web Analytics — cookieless, and the key is per-site, so this
            tag belongs to yk.streamerosai.com alone. Pairs with
            Ahrefs Webmaster Tools, which is where the backlink profile lives. */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="BZB0ZG8j3Gs022MHXqStJg"
          async
        />
      </body>
    </html>
  );
}
