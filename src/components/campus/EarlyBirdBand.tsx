import { EARLY_BIRD, whatsappHref } from "@/lib/campus";

/**
 * Stands in for the testimonials this page does not have yet, without
 * inventing any. Real discount, real cap, and it retires itself when
 * EARLY_BIRD.seats hits zero rather than going stale on the page.
 */
export default function EarlyBirdBand() {
  if (EARLY_BIRD.seats <= 0) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-cyan/[0.04] p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice">
            Opening {EARLY_BIRD.seats} seats
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
            This page has no reviews on it yet. Be the reason it does.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            The first {EARLY_BIRD.seats} students get{" "}
            <span className="font-semibold text-ice">
              {EARLY_BIRD.discountPercent}% off
            </span>{" "}
            {EARLY_BIRD.condition}. Same build, same sessions, same handover —
            the discount is the price of going first, and it is not coming back
            once those seats are gone.
          </p>
        </div>

        <a
          href={whatsappHref(
            `Hi Yaseen, I want one of the ${EARLY_BIRD.seats} opening seats for a final year project.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl bg-[#25D366] px-6 py-3.5 text-center text-sm font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.03]"
        >
          Claim a seat on WhatsApp
        </a>
      </div>
    </section>
  );
}
