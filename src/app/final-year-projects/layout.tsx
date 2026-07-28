import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/campus/FloatingWhatsApp";

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
