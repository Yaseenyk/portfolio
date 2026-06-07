import { GithubIcon } from "@/components/Icons";

/** Stylized cyan→purple gradient-border button linking to a product's repo. */
export default function RepoButton({
  href,
  label = "View source on GitHub",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan to-purple p-px shadow-[0_0_28px_-8px_rgba(34,211,238,0.55)] transition-shadow duration-300 hover:shadow-[0_0_34px_-6px_rgba(168,85,247,0.6)]"
    >
      <span className="inline-flex items-center gap-2.5 rounded-[11px] bg-ink px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-colors duration-300 group-hover:bg-ink/80">
        <GithubIcon className="h-[18px] w-[18px] text-cyan" />
        {label}
      </span>
    </a>
  );
}
