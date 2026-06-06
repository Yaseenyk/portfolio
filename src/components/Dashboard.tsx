import { WindowControls } from "./Icons";
import Signal from "./Signal";
import Projects from "./Projects";
import Experience from "./Experience";

/** Mocked-up premium desktop UI window ("mission control") housing the main content. */
export default function Dashboard() {
  return (
    <section id="dashboard" className="scroll-mt-6 pb-28">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-ink/80 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
        {/* Window top bar */}
        <div className="relative flex items-center border-b border-zinc-800 bg-white/[0.02] px-5 py-4">
          <WindowControls />
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-500">
            portfolio -- interactive-mode
          </span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            <Signal />
            live
          </span>
        </div>

        {/* Window body */}
        <div className="space-y-24 p-8 sm:p-10 lg:p-12">
          <Projects />
          <Experience />
        </div>
      </div>
    </section>
  );
}
