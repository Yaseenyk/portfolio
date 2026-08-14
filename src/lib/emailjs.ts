/**
 * EmailJS credentials — one place, because every form on the site shares one
 * service. When the Gmail OAuth grant expired, all four forms failed at once
 * and the IDs were copy-pasted across four files; rotating the service should
 * be a single edit, not a search-and-replace with one easy miss.
 *
 * These are publishable values — the public key is designed to ship in the
 * browser bundle, and EmailJS restricts sending by allowed origin rather than
 * by key secrecy.
 */
export const EMAILJS = {
  service: "service_560nh3i",
  template: "template_dyb1k4x",
  publicKey: "mB56akvK2qStLNadU",
  /** Where every form delivers. */
  contactEmail: "contact@streamerosai.com",
} as const;
