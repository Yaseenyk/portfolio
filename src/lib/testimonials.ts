/**
 * Real endorsements only — each entry should correspond to a verifiable
 * source (a LinkedIn recommendation, a public comment, a client email you
 * have permission to quote). The home-page section renders nothing while
 * this array is empty, so it can ship dark and light up when quotes land.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Link that lets a reader verify the person (LinkedIn profile, etc.). */
  url?: string;
}

// Empty = the section renders nothing. Add real, verifiable quotes
// (name, role, LinkedIn url) and it appears on the next build.
export const TESTIMONIALS: Testimonial[] = [
  // {
  //   quote: "…",
  //   name: "Full Name",
  //   role: "Title, Company",
  //   url: "https://www.linkedin.com/in/…",
  // },
];
