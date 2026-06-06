import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaseenkhatib.dev"
  ),
  title: "Yaseen Khatib — Senior MERN Stack Developer & AI Solutions Architect",
  description:
    "Senior MERN Stack Developer and AI-Accelerated Solutions Architect. Architecting scalable systems and delivering production-grade products at AI-speed.",
  keywords: [
    "MERN Stack Developer",
    "Solutions Architect",
    "AI-Accelerated Development",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Next.js",
    "AI Orchestration",
  ],
  authors: [{ name: "Yaseen Khatib" }],
  openGraph: {
    title: "Yaseen Khatib — Senior MERN Stack Developer & AI Solutions Architect",
    description:
      "Architecting Scalable Systems. Delivering at AI-Speed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
