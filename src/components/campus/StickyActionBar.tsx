"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/campus";
import { track } from "@/lib/analytics";

/**
 * Thumb-reachable action bar, mobile only. This audience browses on a phone
 * and closes on WhatsApp, so the two actions stay pinned rather than living
 * at the bottom of a long page. Appears once the hero is scrolled past so it
 * never covers the headline at first paint.
 */
export default function StickyActionBar({ context }: { context?: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = context
    ? `Hi Yaseen, I'm interested in the "${context}" final year project.`
    : "Hi Yaseen, I want to know about the final year projects.";

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3 py-3">
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("fyp-sticky-whatsapp")}
          tabIndex={shown ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#04220F]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.44 1.32-1.99 1.4-.53.08-1.19.11-1.92-.12a17.5 17.5 0 0 1-1.74-.64c-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.56c.28-.31.61-.38.81-.38h.58c.19 0 .44-.07.69.53.25.6.86 2.08.94 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.61.18.3.79 1.3 1.69 2.11 1.16 1.03 2.14 1.35 2.44 1.5.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.23.58.35.07.13.07.73-.18 1.42Z" />
          </svg>
          WhatsApp
        </a>
        <a
          href="#enquire"
          onClick={() => track("fyp-sticky-enquire")}
          tabIndex={shown ? 0 : -1}
          className="flex-1 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 text-center text-sm font-semibold text-ice"
        >
          Enquire
        </a>
      </div>
    </div>
  );
}
