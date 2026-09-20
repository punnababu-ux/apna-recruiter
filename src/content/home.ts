/**
 * Homepage content.
 *
 * Copy lives here, not in the page. Numbers in particular: they are claims,
 * they change, and marketing must be able to correct one without a component
 * diff.
 *
 * Source: the employer prototype's hero (self-checkout-five.vercel.app/employer)
 * and the AI-native positioning line from the prioritization sheet.
 */

export interface Stat {
  value: string
  label: string
}

export const HOME_HERO = {
  eyebrow: "India's #1 Hiring Platform",
  /** The headline is JSX in the page — one word is colour-accented. */
  description: "Streamlining end-to-end hiring, from first post to signed offer.",
  primaryCta: "Post a Job",
  secondaryCta: "See pricing",
  stats: [
    { value: "6 Cr+", label: "Candidates" },
    { value: "7 L+", label: "Businesses and enterprises" },
    { value: "7,200+", label: "Towns & cities covered" },
  ] satisfies Stat[],
}
