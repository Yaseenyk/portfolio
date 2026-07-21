import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import OutreachTool from "./OutreachTool";

// Private utility — keep it out of search indexes entirely.
export const metadata: Metadata = {
  title: "Outreach",
  robots: { index: false, follow: false },
};

export default function OutreachPage() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-20">
        <OutreachTool />
      </main>
    </>
  );
}
