import { TESTIMONIALS } from "@/lib/testimonials";

/** Social-proof strip — renders nothing until lib/testimonials.ts has
 *  real, verifiable quotes. Server component: zero client-bundle cost. */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" className="scroll-mt-24 py-24">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
        ~/signal-from-others
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6 backdrop-blur-md"
          >
            <blockquote className="flex-1 text-sm leading-relaxed text-zinc-300">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-zinc-800/60 pt-4 text-sm">
              {t.url ? (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-100 transition-colors hover:text-cyan"
                >
                  {t.name} ↗
                </a>
              ) : (
                <span className="font-medium text-zinc-100">{t.name}</span>
              )}
              <span className="mt-0.5 block text-xs text-zinc-500">
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
