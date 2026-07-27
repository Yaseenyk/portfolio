import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import {
  CUSTOM_BUILD_RANGE,
  PAYMENT_POLICY,
  SESSION_POLICY,
  formatInr,
} from "@/lib/campus";
import { breadcrumbJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusLeadForm from "@/components/campus/CampusLeadForm";

const DESCRIPTION = `Get a custom final year project built to your approved problem statement — any stack, ${formatInr(
  CUSTOM_BUILD_RANGE.min
)} to ${formatInr(
  CUSTOM_BUILD_RANGE.max
)} depending on scope, with daily live sessions explaining the code and payment in monthly installments.`;

export const metadata: Metadata = {
  title: "Custom Final Year Project — Built to Your Problem Statement",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/custom/` },
  openGraph: {
    type: "website",
    title: "Custom Final Year Project | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/custom/`,
    siteName: "Yaseen Khatib",
  },
};

const SCOPE = [
  {
    band: `${formatInr(10000)} – ${formatInr(20000)}`,
    title: "Single-stack CRUD or ML demo",
    body: "One database, one frontend, one model or one workflow. Report and deck included.",
  },
  {
    band: `${formatInr(20000)} – ${formatInr(35000)}`,
    title: "Multi-module system",
    body: "Auth, roles, dashboards, a third-party API or a trained model wired into a real UI, deployed live.",
  },
  {
    band: `${formatInr(35000)} – ${formatInr(50000)}`,
    title: "Agentic / RAG / real-time systems",
    body: "LLM orchestration, vector search, websockets, or mobile + backend together. The kind of thing that gets asked about after the viva.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Final Year Project Development",
  serviceType: "Bespoke academic software development with code mentorship",
  description: DESCRIPTION,
  provider: personRef,
  areaServed: { "@type": "Country", name: "India" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: CUSTOM_BUILD_RANGE.min,
    highPrice: CUSTOM_BUILD_RANGE.max,
  },
};

export default function CustomBuildPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd
        data={[
          serviceJsonLd,
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Custom Build", path: "/final-year-projects/custom" },
          ]),
        ]}
      />

      <header>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/final-year-projects/custom
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Built to your problem statement
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-400">
          Your guide approved a topic that is not in the catalog. Send it here. It
          gets built to spec, with the same {SESSION_POLICY.cadence.toLowerCase()}{" "}
          sessions after {SESSION_POLICY.startsAfter} and the same installment
          structure — {PAYMENT_POLICY.method.toLowerCase()}, no gateway, no
          subscription.
        </p>
      </header>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          What scope costs
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          Quoted after reading your brief — these bands are what past scopes map to,
          not a fixed price list.
        </p>
        <div className="mt-8 space-y-4">
          {SCOPE.map((s) => (
            <div
              key={s.band}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-start sm:gap-6"
            >
              <span className="shrink-0 font-mono text-sm text-ice sm:w-44">
                {s.band}
              </span>
              <div>
                <h3 className="text-base font-medium text-zinc-50">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <CampusLeadForm
          heading="Send the brief"
          intro="Paste the problem statement exactly as your guide gave it, plus your submission deadline. You get a scope, a price, and an installment split back — usually within a day."
          messageLabel="Problem statement + deadline"
          messagePlaceholder="Paste the approved problem statement, any stack your college mandates, and your submission date…"
        />
      </div>
    </div>
  );
}
