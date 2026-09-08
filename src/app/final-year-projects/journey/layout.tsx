import PresentMode from "@/components/journey/PresentMode";

/** Journey chapters double as slides for the live sessions. The article is
 *  the page; PresentMode builds a deck from it on demand. */
export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <PresentMode />
    </>
  );
}
