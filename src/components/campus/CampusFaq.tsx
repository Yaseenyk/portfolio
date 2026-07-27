import type { FaqItem } from "@/lib/seo";

/** Renders the same array that feeds `faqPageJsonLd` — markup must match the
 *  visible text for Google to honour the rich result. */
export default function CampusFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="border-t border-white/5 pt-12">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        Questions students ask
      </h2>
      <dl className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((f) => (
          <div
            key={f.question}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
          >
            <dt className="text-sm font-medium text-zinc-100">{f.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
