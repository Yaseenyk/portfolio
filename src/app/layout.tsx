import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { SITE_URL, personJsonLd } from "@/lib/site";
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
const DESCRIPTION =
  "Yaseen Khatib — Senior Full-Stack AI Engineer who builds and ships autonomous AI products: Agentic RAG, LLM orchestration, and scalable MERN systems. Open to remote roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Yaseen Khatib",
  },
  description: DESCRIPTION,
  keywords: [
    "Yaseen Khatib",
    "MERN Stack Developer",
    "AI Systems Engineer",
    "Solutions Architect",
    "Agentic RAG",
    "LLM Orchestration",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Next.js",
  ],
  authors: [{ name: "Yaseen Khatib", url: SITE_URL }],
  creator: "Yaseen Khatib",
  alternates: {
    canonical: SITE_URL,
    // AEO: standalone machine-readable manifest for AI recruiter agents.
    types: { "application/ld+json": `${SITE_URL}/ai-briefing.json` },
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
};

// AEO: WebSite entity, authored by the Person — anchors the site in the entity graph.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yaseen Khatib",
  url: SITE_URL,
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Yaseen Nurmahammad Khatib", url: SITE_URL },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="font-sans">
        {/* AEO: sitewide Person + WebSite entities */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
