/**
 * Homepage content.
 *
 * Copy lives here, not in the page. Numbers in particular: they are claims,
 * they change, and marketing must be able to correct one without a component
 * diff.
 *
 * Sourcing, field by field — worth being exact about, since it's easy to
 * blur "what a reference actually showed" with "what I wrote to fill a gap".
 * Every line below was re-verified against the live reference (not from
 * memory) after an earlier draft's `description` turned out to be partly
 * invented:
 *   - eyebrow, stats: verbatim from self-checkout-five.vercel.app/employer,
 *     confirmed via get_page_text, 2026-09-21.
 *   - headline ("India's Largest AI-Native Early Talent Platform"): also
 *     verbatim from that same reference, and matches the positioning line
 *     from the prioritization sheet.
 *   - description, tagline: verbatim from the Lovable prototype, confirmed
 *     via get_page_text against the live preview, 2026-09-21.
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
  description: "Streamlining end-to-end hiring process",
  /** Closing line under the stats — a mission statement, not a CTA. */
  tagline: "Building Bharat's workforce in the AI Economy.",
  stats: [
    { value: "6 Cr+", label: "Candidates" },
    { value: "7 L+", label: "Businesses and Enterprises" },
    { value: "7,200+", label: "Towns & Cities Covered" },
  ] satisfies Stat[],
}
