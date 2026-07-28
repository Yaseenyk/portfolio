import { REFERRAL, whatsappHref } from "@/lib/campus";

/**
 * Referral offer. Students come in batches, so a classmate is the highest-yield
 * channel. No coupon system — the discount is claimed by naming each other on
 * WhatsApp, which keeps it honest and also drops the lead straight into chat.
 */
export default function ReferralBand() {
  if (REFERRAL.discountPercent <= 0) return null;

  const wa = whatsappHref(
    "Hi Yaseen, I want to refer a classmate for a final year project — how does the referral discount work?",
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        Bring a classmate
      </span>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
        Refer a classmate, you both save {REFERRAL.discountPercent}%
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Final year projects happen in batches — half your class needs one. Refer
        a classmate and when you both book, you each get {REFERRAL.discountPercent}
        % off. No codes and no accounts: just name each other on WhatsApp and it
        is applied to both installments. (Different projects, of course — seats
        stay capped per college.)
      </p>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.03]"
      >
        Refer on WhatsApp
      </a>
    </section>
  );
}
