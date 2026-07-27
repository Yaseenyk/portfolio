/** `true` = yes, `false` = no, a string = a qualified yes rendered verbatim. */
type Cell = boolean | string;

const ROWS: { criterion: string; zip: Cell; shop: Cell; mine: Cell }[] = [
  { criterion: "You get working code", zip: true, shop: true, mine: true },
  { criterion: "Someone explains it to you", zip: false, shop: false, mine: true },
  { criterion: "Report, deck and diagrams", zip: "sometimes", shop: true, mine: true },
  { criterion: "Limited per college", zip: false, shop: false, mine: true },
  { criterion: "Built around your problem statement", zip: false, shop: "sometimes", mine: true },
  { criterion: "You can answer viva questions on it", zip: false, shop: false, mine: true },
  { criterion: "Mock viva before submission", zip: false, shop: false, mine: true },
  { criterion: "Changes your guide asks for", zip: false, shop: "extra cost", mine: true },
  { criterion: "You know who built it", zip: false, shop: "sometimes", mine: true },
];

function Mark({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="text-ice" aria-label="yes">
        ●
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-zinc-700" aria-label="no">
        —
      </span>
    );
  }
  return <span className="text-[11px] leading-tight text-zinc-500">{value}</span>;
}

/**
 * The objection that loses the most students is "I can get this for ₹2,000".
 * It is answered head-on rather than avoided — including conceding the row
 * where the cheap option genuinely wins.
 */
export default function PriceComparison() {
  return (
    <section className="py-4">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        &ldquo;I can get a project for ₹2,000&rdquo;
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
        You can, and sometimes that is the right call. If you already understand the
        code and only need something to submit, buy the cheap one — genuinely. This
        is for the situation where you have to stand in front of a panel and answer
        for it.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th scope="col" className="py-3 pr-4 text-sm font-normal text-zinc-500">
                What you actually need
              </th>
              <th
                scope="col"
                className="w-28 px-3 py-3 text-center text-xs font-normal uppercase tracking-[0.15em] text-zinc-500"
              >
                ₹2k zip
              </th>
              <th
                scope="col"
                className="w-28 px-3 py-3 text-center text-xs font-normal uppercase tracking-[0.15em] text-zinc-500"
              >
                Local shop
              </th>
              <th
                scope="col"
                className="w-32 rounded-t-lg bg-cyan/[0.06] px-3 py-3 text-center text-xs font-normal uppercase tracking-[0.15em] text-ice"
              >
                Here
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.criterion} className="border-b border-white/5">
                <th
                  scope="row"
                  className="py-3 pr-4 text-sm font-normal leading-snug text-zinc-300"
                >
                  {row.criterion}
                </th>
                <td className="px-3 py-3 text-center">
                  <Mark value={row.zip} />
                </td>
                <td className="px-3 py-3 text-center">
                  <Mark value={row.shop} />
                </td>
                <td className="bg-cyan/[0.06] px-3 py-3 text-center">
                  <Mark value={row.mine} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-500">
        The cheap option is cheap because it is sold to everyone and explained to
        nobody. Every row above is the difference between owning your project and
        hoping the panel does not ask.
      </p>
    </section>
  );
}
