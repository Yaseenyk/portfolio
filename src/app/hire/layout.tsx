import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";

export default function HireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-28">{children}</main>
    </>
  );
}
