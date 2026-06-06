import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBackground />
      <Navbar />
      <div className="mx-auto max-w-3xl px-6">
        <main className="pt-28">{children}</main>

        <footer className="border-t border-zinc-800/70 py-10 text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
            &amp; Framer Motion, delivered at AI-speed.
          </p>
        </footer>
      </div>
    </>
  );
}
