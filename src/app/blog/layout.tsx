import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
// Syntax-highlight theme for AI-generated MDX code blocks (rehype-highlight).
import "highlight.js/styles/github-dark.css";

export default function BlogLayout({
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
