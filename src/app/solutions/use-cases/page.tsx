import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { seoDescription } from "@/lib/seoText";
import { SITE_URL } from "@/lib/site";
import { getLiveUseCases, caseUrl } from "@/lib/usecases";

const DESCRIPTION =
  "Apps and websites built by one engineer in India: hiring a developer, what an app costs, grocery, food, clinic, billing, NGO and ecommerce use cases.";

export const metadata: Metadata = {
  title: "App and Website Use Cases for Small Business in India",
  description: seoDescription(DESCRIPTION),
  alternates: { canonical: `${SITE_URL}/solutions/use-cases/` },
  openGraph: {
    type: "website",
    title: "App and Website Use Cases | Yaseen Khatib",
    description: seoDescription(DESCRIPTION),
    url: `${SITE_URL}/solutions/use-cases/`,
    siteName: "Yaseen Khatib",
  },
};

export default function UseCasesHub() {
  const items = getLiveUseCases();
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Solutions", path: "/solutions" },
            { name: "Use cases", path: "/solutions/use-cases" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: items.map((u, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}${caseUrl(u.slug)}`,
              name: u.title,
            })),
          },
        ]}
      />
      <Link href="/solutions/" className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan">
        ← Solutions
      </Link>
      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Use cases · India</span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          What people ask me to build, and what I tell them first
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-300">
          Each page covers one kind of app or website: what the first version contains, what can wait, what it costs, and
          what I have and have not built. Prices are mine and come from the same list as the rest of this site.
        </p>
      </header>
      <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((u) => (
          <li key={u.slug}>
            <Link href={caseUrl(u.slug)} className="block h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan/40">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">{u.eyebrow}</span>
              <h2 className="mt-2 text-base font-medium text-zinc-50">{u.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{u.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-zinc-500">
        Something not listed? <Link href="/solutions/small-business/" className="text-zinc-300 underline decoration-cyan/40 underline-offset-4 hover:text-cyan">Hosted small-business tools</Link> and the{" "}
        <Link href="/solutions/" className="text-zinc-300 underline decoration-cyan/40 underline-offset-4 hover:text-cyan">full solutions list</Link> cover the rest.
      </p>
    </div>
  );
}
