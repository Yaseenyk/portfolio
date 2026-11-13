import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { ExternalLinkIcon, GithubIcon } from "@/components/Icons";
import { breadcrumbJsonLd } from "@/lib/seo";
import { seoDescription } from "@/lib/seoText";
import { SITE_URL } from "@/lib/site";
import { getWork, studies } from "@/lib/work";

/**
 * Case-study pages for the products that had none (lib/work.ts entries with a `study`): Esports Hub, the solar guide,
 * exam dates, the tool sites and DefendIt. The older products keep their hand-written pages in sibling folders, which
 * take priority over this route. One shape for every study: the problem, what was built, the decisions and their
 * reasons, what a stranger can verify, and the honest limits.
 */
export const dynamicParams = false;
export function generateStaticParams() {
  return studies().map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const w = getWork(params.slug);
  if (!w?.study) return {};
  const url = `${SITE_URL}/products/${w.slug}/`;
  const title = `${w.name}: case study`;
  return {
    title,
    description: seoDescription(w.line),
    alternates: { canonical: url },
    openGraph: { type: "article", title: `${title} | Yaseen Khatib`, description: seoDescription(w.line), url, siteName: "Yaseen Khatib", ...(w.shot ? { images: [{ url: `${SITE_URL}/shots/${w.shot}.webp`, width: 1280, height: 800 }] } : {}) },
  };
}

const h2 = "text-xl font-semibold tracking-tight text-zinc-50";
const eyebrow = "font-mono text-[11px] uppercase tracking-[0.22em] text-cyan";
const isExternal = (h: string) => h.startsWith("http");

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const w = getWork(params.slug);
  if (!w?.study) notFound();
  const s = w.study;
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Products", path: "/products" }, { name: w.name, path: `/products/${w.slug}` }])} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-zinc-500">
        <Link href="/" className="hover:text-cyan">Home</Link><span className="text-zinc-700">/</span>
        <Link href="/projects/" className="hover:text-cyan">Projects</Link><span className="text-zinc-700">/</span>
        <span className="truncate text-zinc-400">{w.name}</span>
      </nav>

      <header className="mt-8">
        <p className={eyebrow}>{w.kind} · case study</p>
        <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">{w.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-300">{w.line}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {w.live && (
            <a href={w.live} target={isExternal(w.live) ? "_blank" : undefined} rel={isExternal(w.live) ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 font-semibold text-ink">
              <ExternalLinkIcon className="h-4 w-4" /> Visit the live site
            </a>
          )}
          {(w.code ?? []).map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-cyan">
              <GithubIcon className="h-4 w-4" /> {label}
            </a>
          ))}
        </div>
      </header>

      {w.shot && (
        <a href={w.live ?? "#"} target="_blank" rel="noopener noreferrer" className="mt-10 block overflow-hidden rounded-lg border border-white/10 bg-black transition-colors hover:border-cyan/50">
          <Image src={`/shots/${w.shot}.webp`} alt={`${w.name}, live screenshot`} width={1280} height={800} priority sizes="(min-width: 1024px) 960px, 100vw" className="h-auto w-full" />
        </a>
      )}
      {w.shot && <p className="mt-2 text-[12.5px] text-zinc-500">A real screenshot of the live site, taken in November 2026.</p>}

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-2">
        <section>
          <p className={eyebrow}>01 · The problem</p>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-300">{s.problem}</p>
        </section>
        <section>
          <p className={eyebrow}>02 · What I built</p>
          <p className="mt-3 text-[16px] leading-relaxed text-zinc-300">{s.built}</p>
        </section>
      </div>

      <section className="mt-14 border-t border-white/10 pt-10">
        <p className={eyebrow}>03 · Decisions, and why</p>
        <h2 className={`${h2} mt-3`}>The choices that shaped it</h2>
        <ol className="mt-6 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {s.decisions.map(([title, text], i) => (
            <li key={title} className="border-t border-white/10 pt-5">
              <p className="font-mono text-xs text-cyan">0{i + 1}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-zinc-50">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-2">
        <section>
          <p className={eyebrow}>04 · What you can check</p>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-300">
            {s.proof.map((p) => <li key={p} className="flex gap-3"><span aria-hidden="true" className="mt-[10px] h-1 w-1 flex-none rounded-full bg-cyan" />{p}</li>)}
          </ul>
        </section>
        {s.limits && (
          <section>
            <p className={eyebrow}>05 · Honest limits</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-400">
              {s.limits.map((p) => <li key={p} className="flex gap-3"><span aria-hidden="true" className="mt-[10px] h-1 w-1 flex-none rounded-full bg-zinc-600" />{p}</li>)}
            </ul>
          </section>
        )}
      </div>

      <section className="mt-14 border-t border-white/10 pt-8">
        <p className={eyebrow}>Stack</p>
        <p className="mt-3 text-[15px] text-zinc-300">{w.stack.join(" · ")}</p>
        <p className="mt-8"><Link href="/projects/" className="text-sm font-medium text-cyan underline-offset-4 hover:underline">← All projects</Link></p>
      </section>
    </article>
  );
}
