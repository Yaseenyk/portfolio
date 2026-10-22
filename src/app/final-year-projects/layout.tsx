import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/campus/FloatingWhatsApp";
import type { Metadata } from "next";

// The campus portal is moving to its own site so the portfolio and the
// student business are each judged on one purpose. Until the move, keep it
// out of the index; follow stays on so link equity still flows.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-28">{children}</main>
      <FloatingWhatsApp />
    </>
  );
}
