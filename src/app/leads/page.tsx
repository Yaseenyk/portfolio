import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import LeadsInbox from "./LeadsInbox";

// Private utility — keep it out of search indexes entirely (same contract as
// /outreach; also disallowed in robots.ts and absent from the sitemap).
export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-20">
        <LeadsInbox />
      </main>
    </>
  );
}
