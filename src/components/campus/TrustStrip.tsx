import Link from "next/link";
import { PERSON, SOCIALS } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

interface Proof {
  label: string;
  value: string;
  detail: string;
  href: string;
  external?: boolean;
}

/**
 * The honest answer to "who am I sending money to". Every card links to
 * something already public on this site or on GitHub — no claims that need
 * to be taken on faith, because that is exactly what the audience is
 * worried about.
 */
const PROOF: Proof[] = [
  {
    label: "Who builds it",
    value: PERSON.jobTitle,
    detail: `${PERSON.locality}, ${PERSON.country}. Full background, work history and CV.`,
    href: "/about/",
  },
  {
    label: "Shipped, not claimed",
    value: `${PRODUCTS.length} products`,
    detail: "Built solo and deployed. Architecture teardowns for each one.",
    href: "/products/",
  },
  {
    label: "Code in the open",
    value: "Public repos",
    detail: "The same hands that write your project. Read it before you pay.",
    href: SOCIALS.github,
    external: true,
  },
  {
    label: "Professional record",
    value: "LinkedIn",
    detail: "Verifiable employment history, not an anonymous seller account.",
    href: SOCIALS.linkedin,
    external: true,
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-white/5 py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-lg text-2xl font-semibold tracking-tight text-zinc-50">
          You are about to send money to a stranger on the internet.
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
          Fair. So here is everything you need to check who I am — all of it public,
          all of it older than this page.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {PROOF.map((p) => {
          const inner = (
            <>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {p.label}
              </span>
              <span className="mt-3 block text-lg font-semibold text-zinc-50">
                {p.value}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-zinc-400">
                {p.detail}
              </span>
              <span className="mt-4 block text-xs text-ice">
                Check it {p.external ? "↗" : "→"}
              </span>
            </>
          );

          const className =
            "flex h-full flex-col bg-ink p-6 transition-colors duration-300 hover:bg-white/[0.03]";

          return p.external ? (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          ) : (
            <Link key={p.label} href={p.href} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
