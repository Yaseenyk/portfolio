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

const TITLE_DEFAULT = "Yaseen Khatib | AI + MERN Architect";
const DESCRIPTION =
  "Yaseen Nurmahammad Khatib is a Senior Full-Stack AI Engineer building with Next.js, LangGraph, AI FinOps, and Scalable Architecture — specializing in Agentic RAG pipelines, LLM orchestration, and high-throughput backend scaling at AI-speed.";

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
    creator: "@yaseenyk",
    images: [`${SITE_URL}/og-lockup.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
        {/* AEO: sitewide Person entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
