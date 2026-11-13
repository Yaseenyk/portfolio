import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { ShotImage } from "@/components/home/Shots";
import { ArrowRightIcon } from "@/components/Icons";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { GROUPS, WORK, type Work } from "@/lib/work";

/*
 * Everything I have built, grouped so a reader can stop after the first group. Drawn from lib/work.ts, which is plain data,
 * so this page is a server component and the count below is computed, never typed (a hand-written count once drifted).
 * Each card: a real screenshot where the thing is live, one sentence, the result, the stack, and its links.
 */
const DESCRIPTION =
  "Everything Yaseen Khatib has built: flagship products, full-stack platforms, free tool sites, client work and earlier enterprise systems. Each with a real screenshot, its result, its stack and its links.";

export const metadata: Metadata = {
  title: "Projects",
  description: seoDescription(DESCRIPTION),
  alternates: { canonical: `${SITE_URL}/projects/` },
  openGraph: { type: "website", title: "Projects | Yaseen Khatib", description: seoDescription(DESCRIPTION), url: `${SITE_URL}/projects/`, siteName: "Yaseen Khatib" },
};

const isExternal = (h: string) => h.startsWith("http");
const linkCls = "inline-flex items-center gap-1 text-sm font-medium text-cyan underline-offset-4 hover:underline";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return isExternal(href)
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>{children}</a>
    : <Link href={href} className={linkCls}>{children}</Link>;
}

function Card({ w, eager }: { w: Work; eager: boolean }) {
  const main = w.caseStudy ?? w.live;
  return (
    <article id={w.slug} className="flex scroll-mt-28 flex-col border-t border-white/10 pt-5">
      {w.shot && main && (
        isExternal(main)
          ? <a href={main} target="_blank" rel="noopener noreferrer" aria-label={`Open ${w.name}`}><ShotImage id={w.shot} alt={`${w.name}, live screenshot`} eager={eager} className="mb-5 transition-colors hover:border-cyan/50" /></a>
          : <Link href={main} aria-label={`Open ${w.name}`}><ShotImage id={w.shot} alt={`${w.name}, live screenshot`} eager={eager} className="mb-5 transition-colors hover:border-cyan/50" /></Link>
      )}
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{w.kind}</p>
      <h3 className="mt-2 text-xl font-semibold text-zinc-50">{w.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{w.line}</p>
      {w.result && <p className="mt-3 text-[15px] leading-relaxed text-zinc-200"><span className="font-semibold text-cyan">Result: </span>{w.result}</p>}
      <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-zinc-500">{w.stack.join(" · ")}</p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {w.caseStudy && <Ext href={w.caseStudy}>Case study <ArrowRightIcon className="h-3.5 w-3.5" /></Ext>}
        {w.live && <Ext href={w.live}>{isExternal(w.live) ? "Live site" : "Open it"} <ArrowRightIcon className="h-3.5 w-3.5" /></Ext>}
        {(w.code ?? []).map(([label, href]) => <Ext key={href} href={href}>{label} <ArrowRightIcon className="h-3.5 w-3.5" /></Ext>)}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const live = WORK.filter((w) => w.live && isExternal(w.live)).length;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])} />
      <GridBackground />
      <Navbar />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
        <main className="pb-16 pt-28">
          <header className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">Projects</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">Everything I have built.</h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              {WORK.length} projects, {live} of them live on the web right now. Screenshots are real, and every card links to the
              thing itself. Start with the flagship products; the rest is here if you want depth.
            </p>
            <nav aria-label="Jump to a group" className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {GROUPS.map((g) => <a key={g.id} href={`#${g.id}`} className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-cyan">{g.title}</a>)}
            </nav>
          </header>

          {GROUPS.map((g, gi) => {
            const list = WORK.filter((w) => w.group === g.id);
            return (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-28 pt-16 sm:pt-20">
                <h2 id={`${g.id}-h`} className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{g.title}</h2>
                <p className="mt-2 text-[15px] text-zinc-500">{g.note}</p>
                <div className={`mt-8 grid grid-cols-1 gap-x-8 gap-y-12 ${g.id === "earlier" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {list.map((w) => <Card key={w.slug} w={w} eager={gi === 0} />)}
                </div>
              </section>
            );
          })}

          <section className="mt-20 border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold text-zinc-50">Want one of these for your team or your business?</h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-zinc-400">I am open to senior full-stack and AI engineer roles, and I take fixed-price builds.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/hire/" className="inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 font-semibold text-ink">Hire me</Link>
              <Link href="/solutions/" className="inline-flex items-center font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-cyan">Services and prices</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
