import Image from "next/image";
import type { ProductMeta } from "@/lib/products";
import { ExternalLinkIcon } from "@/components/Icons";

/**
 * "What it looks like today": real screenshots of the live product, with a link to it. Shown on every product page that
 * has screenshots (lib/products.ts `shots`). A product with no public build (Sable, the pipelines) shows nothing here,
 * because there is nothing honest to show. Images are lazy-loaded and have their size set.
 */
export default function ProductShots({ product }: { product: ProductMeta }) {
  const desktop = product.shots?.desktop ?? [];
  const phone = product.shots?.phone ?? [];
  if (!desktop.length && !phone.length) return null;
  const host = product.liveUrl ? new URL(product.liveUrl).hostname : "";
  return (
    <section aria-label={`${product.name} screenshots`} className="mt-12 border-t border-white/10 pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="text-lg font-semibold text-zinc-50">What it looks like today</h2>
        {product.liveUrl && (
          <a href={product.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan underline-offset-4 hover:underline">
            <ExternalLinkIcon className="h-4 w-4" /> Open {host}
          </a>
        )}
      </div>
      <p className="mt-1 text-sm text-zinc-500">Real screenshots of the live product, not mock-ups.</p>

      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-6">
          {desktop.map((id) => (
            <a key={id} href={product.liveUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-white/10 bg-black transition-colors hover:border-cyan/50">
              <Image src={`/shots/${id}.webp`} alt={`${product.name} on a desktop, live screenshot`} width={1280} height={800} loading="lazy" decoding="async" sizes="(min-width: 1024px) 60vw, 100vw" className="h-auto w-full" />
            </a>
          ))}
        </div>
        {phone.length > 0 && (
          <div className="flex gap-4 lg:w-[420px]">
            {phone.map((id) => (
              <span key={id} className="block flex-1 overflow-hidden rounded-lg border border-white/10 bg-black">
                <Image src={`/shots/${id}.webp`} alt={`${product.name} on a phone, live screenshot`} width={520} height={1125} loading="lazy" decoding="async" sizes="(min-width: 1024px) 200px, 46vw" className="h-auto w-full" />
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
