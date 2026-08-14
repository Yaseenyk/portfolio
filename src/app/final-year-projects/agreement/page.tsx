import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { AGREEMENT_VERSION, CLAUSES } from "@/lib/agreement";
import ConsentForm from "@/components/campus/ConsentForm";

export const metadata: Metadata = {
  title: "Student Agreement",
  description:
    "Onboarding agreement for students enrolled on a final year project — what is delivered, what both sides commit to, and the terms around stopping, resale and disclosure.",
  alternates: { canonical: `${SITE_URL}/final-year-projects/agreement/` },
  // Onboarding document, not a marketing page. Keeping it out of the index
  // avoids students landing here from search before they have spoken to anyone.
  robots: { index: false, follow: false },
};

export default function AgreementPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 print:max-w-none print:px-0 print:py-0">
      <Link
        href="/final-year-projects"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan print:hidden"
      >
        ← Final year projects
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan print:text-zinc-600">
          Agreement v{AGREEMENT_VERSION}
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl print:text-3xl print:text-black">
          Student agreement
        </h1>
        <p className="mt-6 leading-relaxed text-zinc-400 print:text-zinc-700">
          Read this before you consent. It is short on purpose and there is
          nothing buried in it — every clause is something that has actually
          come up, written the way it will be applied.
        </p>
        <p className="mt-4 leading-relaxed text-zinc-400 print:text-zinc-700">
          It sits alongside the public{" "}
          <Link
            href="/final-year-projects/terms"
            className="text-cyan underline-offset-4 hover:underline"
          >
            terms
          </Link>
          . Where anything differs, whatever we agreed in writing over email or
          WhatsApp holds.
        </p>
      </header>

      <div className="mt-14 space-y-10">
        {CLAUSES.map((clause) => (
          <section key={clause.n}>
            <h2 className="flex gap-3 text-xl font-semibold tracking-tight text-zinc-50 print:text-black">
              <span className="font-mono text-sm text-cyan print:text-zinc-500">
                {clause.n}
              </span>
              {clause.title}
            </h2>
            <div className="mt-3 space-y-3 pl-9">
              {clause.body.map((p) => (
                <p
                  key={p}
                  className="leading-relaxed text-zinc-400 print:text-zinc-700"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 print:hidden">
        <ConsentForm />
      </div>

      <p className="mt-10 text-xs leading-relaxed text-zinc-600 print:mt-6 print:text-zinc-500">
        Questions about any clause are welcome before you consent, not after.
        Ask on WhatsApp and you will get a written answer.
      </p>
    </div>
  );
}
