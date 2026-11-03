import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UseCasePage from "@/components/solutions/UseCasePage";
import { seoDescription } from "@/lib/seoText";
import { SITE_URL } from "@/lib/site";
import { getLiveUseCases, getUseCase, caseUrl } from "@/lib/usecases";

// Only released use cases are built. The daily deploy releases the next ones on their `releaseOn` day.
export const dynamicParams = false;

export function generateStaticParams() {
  return getLiveUseCases().map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const u = getUseCase(params.slug);
  if (!u) return {};
  const url = `${SITE_URL}${caseUrl(u.slug)}`;
  return {
    title: u.title,
    description: seoDescription(u.description),
    keywords: [u.keyword],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${u.title} | Yaseen Khatib`,
      description: seoDescription(u.description),
      url,
      siteName: "Yaseen Khatib",
    },
  };
}

export default function UseCaseRoute({ params }: { params: { slug: string } }) {
  const u = getUseCase(params.slug);
  if (!u) notFound();
  return <UseCasePage u={u} />;
}
