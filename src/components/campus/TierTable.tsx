import { emiPerMonth, formatInr, type CampusTier } from "@/lib/campus";

export default function TierTable({ tiers }: { tiers: CampusTier[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {tiers.map((tier) => {
        const featured = tier.id === "mentored";
        return (
          <div
            key={tier.id}
            className={`flex flex-col rounded-2xl border p-6 ${
              featured
                ? "border-cyan/40 bg-cyan/[0.04] shadow-[0_0_40px_-20px_rgba(34,211,238,0.6)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-50">{tier.name}</h3>
              {featured && (
                <span className="rounded-full border border-cyan/40 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-ice">
                  Most picked
                </span>
              )}
            </div>

            <p className="mt-4 text-3xl font-semibold text-zinc-50">
              {formatInr(tier.price)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {tier.emiMonths > 1
                ? `or ${formatInr(emiPerMonth(tier))}/month × ${tier.emiMonths}`
                : "single payment"}
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
              className={`mt-8 rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors duration-200 ${
                featured
                  ? "bg-gradient-to-r from-cyan to-purple text-ink"
                  : "border border-white/10 text-zinc-300 hover:border-cyan/60 hover:text-zinc-50"
              }`}
            >
              Enquire about {tier.name}
            </a>
          </div>
        );
      })}
    </div>
  );
}
