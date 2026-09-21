/**
 * Homepage content.
 *
 * Copy lives here, not in the page. Numbers in particular: they are claims,
 * they change, and marketing must be able to correct one without a component
 * diff.
 *
 * Source: the employer prototype (self-checkout-five.vercel.app/employer)
 * and the AI-native positioning line from the prioritization sheet.
 *
 * Hero only, deliberately: the remaining bands (suite, trust stats,
 * testimonials, FAQ, CTA) are being designed and approved one at a time
 * rather than built ahead of that — add their content here in the same
 * commit as the band itself.
 */

export interface Stat {
  value: string
  label: string
}

export const HOME_HERO = {
  eyebrow: "India's #1 Hiring Platform",
  /** The headline is JSX in the page — one word is colour-accented. */
  description: "Streamlining end-to-end hiring, from first post to signed offer.",
  stats: [
    { value: "6 Cr+", label: "Candidates" },
    { value: "7 L+", label: "Businesses and enterprises" },
    { value: "7,200+", label: "Towns & cities covered" },
  ] satisfies Stat[],
}
