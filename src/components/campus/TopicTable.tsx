export interface Topic {
  title: string;
  stack: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Very hard";
  why: string;
  /** The question a panel will open with. Choosing a topic is choosing this. */
  question: string;
}

const DIFFICULTY_COLOR: Record<Topic["difficulty"], string> = {
  Easy: "text-zinc-500",
  Moderate: "text-zinc-400",
  Hard: "text-ice",
  "Very hard": "text-purple-400",
};

export default function TopicTable({ topics }: { topics: Topic[] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th scope="col" className="py-2.5 pr-4 font-normal text-zinc-500">
              Project
            </th>
            <th scope="col" className="w-52 px-3 py-2.5 font-normal text-zinc-500">
              Stack
            </th>
            <th scope="col" className="w-28 px-3 py-2.5 font-normal text-zinc-500">
              Difficulty
            </th>
          </tr>
        </thead>
        <tbody>
          {topics.map((t) => (
            <tr key={t.title} className="border-b border-white/5 align-top">
              <th scope="row" className="py-3.5 pr-4 font-normal">
                <span className="block font-medium text-zinc-100">{t.title}</span>
                <span className="mt-1 block leading-relaxed text-zinc-400">
                  {t.why}
                </span>
                <span className="mt-1.5 block text-xs text-zinc-500">
                  Viva question it attracts: &ldquo;{t.question}&rdquo;
                </span>
              </th>
              <td className="px-3 py-3.5 text-zinc-400">{t.stack}</td>
              <td className={`px-3 py-3.5 ${DIFFICULTY_COLOR[t.difficulty]}`}>
                {t.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
