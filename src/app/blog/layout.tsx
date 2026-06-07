import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
// Syntax-highlight theme for AI-generated MDX code blocks (rehype-highlight).
import "highlight.js/styles/github-dark.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-28">{children}</main>

      <footer className="mx-auto max-w-6xl border-t border-zinc-800/70 px-6 py-10 text-sm text-zinc-500">
        <p>
          © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
          &amp; Framer Motion, delivered at AI-speed.
        </p>
      </footer>
    </>
  );
}
