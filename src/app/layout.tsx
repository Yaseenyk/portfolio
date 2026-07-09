import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { SITE_URL, SITE_DESCRIPTION, VERIFICATION } from "@/lib/site";
import { siteGraphJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import MotionProvider from "@/components/MotionProvider";
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

const TITLE_DEFAULT = "Yaseen Khatib | Full-Stack AI Engineer";
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
    canonical: SITE_URL,
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
    ...(VERIFICATION.bing
      ? { other: { "msvalidate.01": VERIFICATION.bing } }
      : {}),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="font-sans">
        {/* AEO: sitewide entity graph — Person + WebSite with stable @ids
            that every page-level schema block references instead of
            redeclaring. */}
        <JsonLd data={siteGraphJsonLd} />
        <MotionProvider>
          {children}
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
      </body>
    </html>
  );
}
