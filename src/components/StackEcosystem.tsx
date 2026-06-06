import SectionLabel from "./SectionLabel";

interface StackLayer {
  layer: string;
  tech: string;
  ai: string;
}

const STACK: StackLayer[] = [
  {
    layer: "Frontend",
    tech: "React · Next.js · TypeScript · Tailwind",
    ai: "AI-assisted component architecture and structural refactoring keep the UI layer clean, typed, and consistent as it scales.",
  },
  {
    layer: "Backend",
    tech: "Node.js · Express · REST APIs",
    ai: "AI orchestration accelerates endpoint design, validation, and refactoring — turning API surfaces into production-ready services in hours, not weeks.",
  },
  {
    layer: "Database",
    tech: "MongoDB · Mongoose",
    ai: "Schema modeling and query paths are pressure-tested with AI to balance flexibility against performance from day one.",
  },
  {
    layer: "AI Orchestration",
    tech: "Claude · Agentic Tooling",
    ai: "Models drive code refactoring, structural optimization, and rapid deployment across every layer — the accelerant on the entire stack.",
  },
];

export default function StackEcosystem() {
  return (
    <section id="stack" className="border-t border-zinc-800 py-24">
      <SectionLabel index="02" title="MERN Stack Ecosystem" />

      <p className="mt-12 max-w-2xl text-lg leading-relaxed text-zinc-400">
        A full-stack capability set where AI is woven into the workflow itself —
        not bolted on. Every layer benefits from automated refactoring,
        structural optimization, and rapid, repeatable deployment.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
        {STACK.map((item) => (
          <div
            key={item.layer}
            className="bg-zinc-950 p-8 transition-colors duration-200 hover:bg-zinc-900"
          >
            <h3 className="text-lg font-medium text-zinc-50">{item.layer}</h3>
            <p className="mt-2 text-sm text-zinc-500">{item.tech}</p>
            <p className="mt-5 text-sm leading-relaxed text-zinc-400">
              {item.ai}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
