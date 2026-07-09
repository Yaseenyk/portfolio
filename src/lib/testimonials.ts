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

// LOCAL PREVIEW ONLY — sample entries to see the section's design.
// Replace with real, verifiable quotes before committing this file.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sample testimonial — this is placeholder text to preview the layout. Replace it with a real LinkedIn recommendation before publishing.",
    name: "Sample Colleague",
    role: "Placeholder — Engineering Manager",
  },
  {
    quote:
      "Sample testimonial — a second placeholder so you can see how the grid balances with multiple quotes of different lengths on desktop and mobile.",
    name: "Sample Client",
    role: "Placeholder — Founder",
  },
  {
    quote:
      "Sample testimonial — third placeholder. Cards link to the person's LinkedIn when a url is provided, which is what makes the proof verifiable.",
    name: "Sample Peer",
    role: "Placeholder — Senior Engineer",
    url: "https://www.linkedin.com/",
  },
];
