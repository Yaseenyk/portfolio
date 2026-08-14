"use client";

import { whatsappHref } from "@/lib/campus";
import { track } from "@/lib/analytics";

/**
 * Persistent WhatsApp tap-target on every FYP page. Desktop only (md+) — the
 * mobile StickyActionBar already pins WhatsApp at the bottom of the screen, so
 * this fills the gap on larger screens where nothing is pinned.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(
        "Hi Yaseen, I want to know about the final year projects.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("fyp-whatsapp-float")}
      aria-label="Chat about final year projects on WhatsApp"
      data-print="hide"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-[#04220F] shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-105 md:flex"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.44 1.32-1.99 1.4-.53.08-1.19.11-1.92-.12a17.5 17.5 0 0 1-1.74-.64c-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.56c.28-.31.61-.38.81-.38h.58c.19 0 .44-.07.69.53.25.6.86 2.08.94 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.61.18.3.79 1.3 1.69 2.11 1.16 1.03 2.14 1.35 2.44 1.5.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.23.58.35.07.13.07.73-.18 1.42Z" />
      </svg>
      Chat on WhatsApp
    </a>
  );
}
