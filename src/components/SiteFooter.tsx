import Link from "next/link";
import { PERSON, SOCIALS } from "@/lib/site";

const COLUMNS: { heading: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/products", label: "Products" },
      { href: "/sandbox", label: "Sandbox / Lab" },
      { href: "/uses", label: "Stack" },
    ],
  },
  {
    heading: "Writing",
    links: [
      { href: "/blog", label: "Field Notes (blog)" },
      { href: "/#founders-log", label: "Founder's Log" },
      { href: "/roadmap", label: "AI Systems Roadmap" },
      { href: "/claude-code", label: "Claude Code Roadmap" },
      { href: "/anthropic-roadmap", label: "Anthropic Roadmap" },
    ],
  },
  {
    heading: "For recruiters",
    links: [
      { href: "/interview", label: "Interview brief" },
      { href: "/Resume.pdf", label: "Résumé (PDF)", external: true },
      { href: "/#rag-concierge", label: "Ask the concierge" },
      { href: "/#contact", label: "Contact" },
      { href: SOCIALS.linkedin, label: "LinkedIn", external: true },
      { href: SOCIALS.github, label: "GitHub", external: true },
    ],
  },
  {
    heading: "Machines",
    links: [
      { href: "/rss.xml", label: "RSS feed", external: true },
      { href: "/llms.txt", label: "llms.txt", external: true },
      { href: "/ai-briefing.json", label: "ai-briefing.json", external: true },
      {
        href: "https://yaseen-concierge.yaseenyk.workers.dev/mcp",
        label: "MCP endpoint",
        external: true,
      },
      {
        href: "https://github.com/Yaseenyk/portfolio",
        label: "Site source",
        external: true,
      },
    ],
  },
];

/** Global site map — rendered on every page from the root layout, so no
 *  page is ever more than one scroll from anywhere else. */
export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-zinc-800/60 bg-ink/60 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {col.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) =>
                  l.external ? (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        {...(l.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-zinc-400 transition-colors hover:text-cyan"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-zinc-400 transition-colors hover:text-cyan"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/60 pt-6 text-xs text-zinc-600">
          <p>
            © {new Date().getFullYear()} {PERSON.name} — everything linked
            above is real and running.
          </p>
          <p className="font-mono">
            built at AI-speed · Hyderabad (IST) · remote / hybrid / on-site
          </p>
        </div>
      </div>
    </footer>
  );
}
