import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";

/** Custom 404 — GitHub Pages serves this as 404.html for any unknown path.
 *  A dead end with exits beats a bare error for both visitors and crawlers. */
export default function NotFound() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center px-6 pt-28">
        <div className="max-w-lg text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            HTTP 404 · route not found
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            The URL may have changed, or the link was wrong. Everything worth
            reading is one hop away:
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
            <Link
              href="/"
              className="rounded-lg bg-cyan px-5 py-2.5 font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]"
            >
              Home
            </Link>
            <Link href="/blog" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-cyan">
              Field notes
            </Link>
            <Link href="/products" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-cyan">
              Products
            </Link>
            <Link href="/sandbox" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-cyan">
              Sandbox
            </Link>
            <Link href="/about" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-cyan">
              About
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
