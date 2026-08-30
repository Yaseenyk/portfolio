import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  HOSTED_POLICY,
  HOSTED_TIERS,
  formatInr,
} from "@/lib/solutions";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import SolutionsLeadForm from "@/components/solutions/SolutionsLeadForm";

const DESCRIPTION =
  "Custom software for small businesses without enterprise pricing — a booking page, invoicing, stock tracking or an enquiry system, built once then hosted and maintained from ₹800 a month. Cancel any month, data exported free.";

export const metadata: Metadata = {
  title: "Small Business Software From ₹800/month — Built, Hosted, Maintained",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/solutions/small-business/` },
  openGraph: {
    type: "website",
    title: "Small Business Software from ₹800/month | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/solutions/small-business/`,
    siteName: "Yaseen Khatib",
  },
};

const EXAMPLES = [
  {
    t: "Bookings and appointments",
    b: "A page customers book through, with slots that cannot double-book and reminders that actually go out. Clinics, salons, tutors, service visits.",
  },
  {
    t: "Invoicing and payment tracking",
    b: "Generate invoices, track what is paid and what is overdue, and export for your accountant at year end.",
  },
  {
    t: "Stock and inventory",
    b: "What you have, what is moving, what to reorder — with a history you can audit rather than a spreadsheet three people overwrite.",
  },
  {
    t: "Enquiries and follow-ups",
    b: "Every enquiry captured in one place with an owner and a status, so nothing is lost in a WhatsApp thread.",
  },
];

const FAQ = [
  {
    question: "Why is this so much cheaper than a software company?",
    answer:
      "Because it is one engineer with no sales team, no account manager, and no office to fund — and because the applications are small. A booking system for one business is a few weeks of work, not a product launch. The setup fee covers building it; the monthly covers hosting, backups and small changes.",
  },
  {
    question: "What happens to my data if I stop paying?",
    answer:
      "You get a full export in a standard format within seven days, at no charge. If you would rather keep running the application yourself, the source code and deployment can be handed over for a one-time fee. There is no scenario where your data is held to make you stay.",
  },
  {
    question: "Is there a contract or minimum term?",
    answer:
      "No minimum term on the monthly fee — cancel any month. The setup fee is one-time and paid before the build, because that is real work delivered whether or not you continue afterwards.",
  },
  {
    question: "What if something breaks at 2am?",
    answer:
      "It gets fixed in the morning. This is one engineer, not a support desk, and the response times quoted are real working-hours commitments. If your business genuinely needs overnight cover, you need a company with a rota, and you should not buy that promise from any individual.",
  },
  {
    question: "Can you take over something I already have?",
    answer:
      "Sometimes. If it is built on a stack I work in and the code is available, it can be reviewed and taken on. If it is an abandoned system with no source, rebuilding is usually cheaper than reverse-engineering it — and you will get an honest answer on which after a look.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hosted small business software",
  description: DESCRIPTION,
  provider: personRef,
  areaServed: { "@type": "Country", name: "India" },
  offers: HOSTED_TIERS.map((t) => ({
    "@type": "Offer",
    name: t.name,
    priceCurrency: "INR",
    price: t.monthly,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: t.monthly,
      priceCurrency: "INR",
      unitText: "MONTH",
      billingIncrement: 1,
    },
    description: t.best,
  })),
};

export default function SmallBusinessPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd
        data={[
          jsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Solutions", path: "/solutions" },
            { name: "Small Business", path: "/solutions/small-business" },
          ]),
        ]}
      />

      <Link
        href="/solutions/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← Solutions
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/solutions/small-business
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Software for your business, for less than your phone bill
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-300">
          You do not need an enterprise system. You need one thing to stop being
          done on paper, or in a spreadsheet three people overwrite, or in a
          WhatsApp thread where enquiries go to die.
        </p>
        <p className="mt-4 leading-relaxed text-zinc-400">
          It gets built once, then I host it, back it up, and keep it running.{" "}
          {formatInr(HOSTED_TIERS[0].monthly)} a month.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          What people usually ask for
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {EXAMPLES.map((e) => (
            <div
              key={e.t}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <h3 className="text-base font-medium text-zinc-50">{e.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{e.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Not on this list? It is a short conversation to find out whether it fits.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Plans</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {HOSTED_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-2xl border p-6 ${
                tier.featured
                  ? "border-cyan/40 bg-cyan/[0.04] shadow-[0_0_40px_-20px_rgba(34,211,238,0.6)]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-50">{tier.name}</h3>
                {tier.featured && (
                  <span className="rounded-full border border-cyan/40 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-ice">
                    Most picked
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{tier.best}</p>

              <p className="mt-6 font-mono text-3xl tabular-nums text-zinc-50">
                {formatInr(tier.monthly)}
                <span className="text-base text-zinc-500">/month</span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                plus one-time setup from {formatInr(tier.setupFrom)}
              </p>

              <ul className="mt-6 space-y-2.5">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-zinc-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#enquire"
                className={`mt-8 rounded-xl px-4 py-2.5 text-center text-sm font-medium transition-colors duration-200 ${
                  tier.featured
                    ? "bg-gradient-to-r from-cyan to-purple text-ink"
                    : "border border-white/10 text-zinc-300 hover:border-cyan/60 hover:text-zinc-50"
                }`}
              >
                Ask about {tier.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-50">
          Three things stated plainly
        </h2>
        <ul className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-400">
          <li>
            <span className="text-zinc-200">You can leave.</span>{" "}
            {HOSTED_POLICY.cancel}
          </li>
          <li>
            <span className="text-zinc-200">You are not locked in.</span>{" "}
            {HOSTED_POLICY.ownership}
          </li>
          <li>
            <span className="text-zinc-200">You are hiring a person.</span>{" "}
            {HOSTED_POLICY.honest}
          </li>
        </ul>
      </section>

      <section className="mt-16 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Common questions
        </h2>
        <dl className="mt-8 space-y-6">
          {FAQ.map((f) => (
            <div
              key={f.question}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <dt className="font-medium text-zinc-100">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-16">
        <SolutionsLeadForm
          heading="Tell me what you need"
          intro="What is being done on paper or in a spreadsheet right now, and how many people touch it. You'll get a plan, a setup price, and a monthly figure — usually within a day."
          messageLabel="What you want to stop doing manually"
          messagePlaceholder="What the process is today, how many staff use it, and roughly how many customers or records a month…"
          defaultInterest="Hosted tool subscription (small business)"
        />
      </div>
    </div>
  );
}
