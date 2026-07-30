import Link from "next/link";
import { CASE_STUDIES, SERVICES } from "@/lib/solutions";

/**
 * Problem → decision → outcome, one per service. This is the section a B2B
 * buyer actually reads: not what is promised but how a comparable problem was
 * handled. Every claim links to its write-up — same contract as EvidenceGrid,
 * narrative instead of catalogue.
 */
export default function CaseStudies() {
  const serviceName = (id: string) =>
    SERVICES.find((s) => s.id === id)?.name ?? "";

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          How comparable problems actually went
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
          One case per service. The only number quoted anywhere is real, and
          every claim opens into its full write-up.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {CASE_STUDIES.map((c) => (
          <article
            key={c.id}
            className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                {c.system}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                proves · {serviceName(c.serviceId)}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-50">
              {c.headline}
            </h3>

            <dl className="mt-5 space-y-4 text-sm leading-relaxed">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  The problem
                </dt>
                <dd className="mt-1.5 text-zinc-400">{c.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  The decision
                </dt>
                <dd className="mt-1.5 text-zinc-400">{c.decision}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice">
                  What it bought
                </dt>
                <dd className="mt-1.5 text-zinc-300">{c.outcome}</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {c.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-zinc-500"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
              {c.proof.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="text-xs text-ice underline decoration-cyan/30 underline-offset-4 transition-colors hover:decoration-cyan"
                >
                  {p.label} →
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
