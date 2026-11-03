import Link from "next/link";
import { HOSTED_POLICY, HOSTED_TIERS, SERVICES, formatInr } from "@/lib/solutions";
import { getLiveUseCases, caseUrl, type OfferId, type UseCase } from "@/lib/usecases";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import { seoDescription } from "@/lib/seoText";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import SolutionsLeadForm from "@/components/solutions/SolutionsLeadForm";

const custom = SERVICES.find((s) => s.id === "custom-build")!;
const review = SERVICES.find((s) => s.id === "architecture")!;
const starter = HOSTED_TIERS.find((t) => t.id === "starter")!;
const growth = HOSTED_TIERS.find((t) => t.id === "growth")!;

/** The price blocks come from lib/solutions.ts, so a number changed there changes here. */
function offerBlock(id: OfferId) {
  switch (id) {
    case "review":
      return { name: review.name, price: `${formatInr(review.priceFrom)} to ${formatInr(review.priceTo)}`, detail: `${review.timeline}. A written design and an honest cost range. It is yours whoever builds it.` };
    case "custom-build":
      return { name: "Fixed-scope build", price: `${formatInr(custom.priceFrom)} to ${formatInr(custom.priceTo)}`, detail: `${custom.timeline}. Written scope, fixed price, staged payments, source code in your repository.` };
    case "hosted-starter":
      return { name: "Hosted · Starter", price: `from ${formatInr(starter.monthly)}/month`, detail: `Setup from ${formatInr(starter.setupFrom)}. ${starter.best}` };
    case "hosted-growth":
      return { name: "Hosted · Growth", price: `from ${formatInr(growth.monthly)}/month`, detail: `Setup from ${formatInr(growth.setupFrom)}. ${growth.best}` };
  }
}

function Bullets({ items, tone = "cyan" }: { items: string[]; tone?: "cyan" | "muted" }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
          <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${tone === "cyan" ? "bg-cyan" : "bg-zinc-600"}`} />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function UseCasePage({ u }: { u: UseCase }) {
  const url = `${SITE_URL}${caseUrl(u.slug)}`;
  const live = getLiveUseCases();
  const related = u.related.map((s) => live.find((x) => x.slug === s)).filter((x): x is UseCase => !!x);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: u.h1,
      serviceType: u.keyword,
      description: seoDescription(u.description),
      provider: personRef,
      areaServed: { "@type": "Country", name: "India" },
      url,
    },
    faqPageJsonLd(u.faq),
    breadcrumbJsonLd([
      { name: "Solutions", path: "/solutions" },
      { name: "Use cases", path: "/solutions/use-cases" },
      { name: u.title, path: `/solutions/${u.slug}` },
    ]),
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd data={jsonLd} />

      <Link href="/solutions/use-cases/" className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan">
        ← All use cases
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">{u.eyebrow}</span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">{u.h1}</h1>
        <div className="mt-6 rounded-2xl border border-cyan/25 bg-cyan/[0.04] p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">The short answer</p>
          <p className="mt-2 text-lg leading-relaxed text-zinc-200">{u.answer}</p>
        </div>
        {u.intro.map((p) => (
          <p key={p} className="mt-5 leading-relaxed text-zinc-400">{p}</p>
        ))}
      </header>

      <section className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-base font-medium text-zinc-50">This is for you if</h2>
          <Bullets items={u.forYou} />
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-base font-medium text-zinc-50">This is not for you if</h2>
          <Bullets items={u.notForYou} tone="muted" />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">{u.v1Heading}</h2>
        <Bullets items={u.v1} />
        <h3 className="mt-8 text-sm font-medium uppercase tracking-[0.15em] text-zinc-500">Waits for version two</h3>
        <Bullets items={u.later} tone="muted" />
      </section>

      {u.sections.map((s) => (
        <section key={s.h2} className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">{s.h2}</h2>
          {s.body.map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-zinc-400">{p}</p>
          ))}
          {s.bullets && <Bullets items={s.bullets} />}
        </section>
      ))}

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">What it costs</h2>
        <p className="mt-4 leading-relaxed text-zinc-400">{u.offerNote}</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {u.offers.map((id) => {
            const o = offerBlock(id);
            return (
              <div key={id} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-medium text-zinc-50">{o.name}</h3>
                <p className="mt-2 font-mono text-xl tabular-nums text-zinc-50">{o.price}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{o.detail}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-zinc-500">These are my own prices. Cancel any month on hosted plans. {HOSTED_POLICY.ownership}</p>
      </section>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-50">Related work you can open</h2>
        <ul className="mt-5 space-y-4">
          {u.proof.map((p) => (
            <li key={p.label} className="text-sm leading-relaxed text-zinc-400">
              {p.href.startsWith("http") ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-200 underline decoration-cyan/40 underline-offset-4 hover:text-cyan">{p.label}</a>
              ) : (
                <Link href={p.href} className="font-medium text-zinc-200 underline decoration-cyan/40 underline-offset-4 hover:text-cyan">{p.label}</Link>
              )}{" "}
              <span>{p.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-zinc-400">
          <span className="text-zinc-200">What I have not built.</span> {u.honest}
        </p>
      </section>

      <section className="mt-16 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Common questions</h2>
        <dl className="mt-8 space-y-6">
          {u.faq.map((f) => (
            <div key={f.question} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <dt className="font-medium text-zinc-100">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-16" id="enquire">
        <SolutionsLeadForm
          heading="Tell me what you want built"
          intro="A few lines is enough. You get an honest opinion on whether it is worth building, a written scope and a fixed price, usually within a day."
          messageLabel="What you want built"
          messagePlaceholder={u.placeholder}
          defaultInterest={u.interest}
          compact
          submitLabel="Send, I reply within a day"
        />
      </div>

      {related.length > 0 && (
        <nav className="mt-16 border-t border-white/5 pt-10" aria-label="Related use cases">
          <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-500">Related</h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={caseUrl(r.slug)} className="text-zinc-300 underline decoration-cyan/40 underline-offset-4 hover:text-cyan">{r.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

