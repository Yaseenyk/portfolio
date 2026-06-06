import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { SITE_URL, personJsonLd } from "@/lib/site";
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
  "Yaseen Khatib is a Senior MERN Stack & AI Systems Engineer specializing in Agentic RAG pipelines, LLM orchestration, and high-throughput backend scaling — architecting and shipping production systems at AI-speed.";

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
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Yaseen Khatib",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    creator: "@yaseenyk",
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
      </body>
    </html>
  );
}
