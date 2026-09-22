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
 * Sections are added one at a time, approved, then built — not ahead of
 * that. Each section's content sourcing is noted where it's declared below.
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

/**
 * "TRUSTED BY / Top Hiring Partners": verbatim from the Lovable prototype
 * (confirmed via get_page_text, 2026-09-21). Its subtitle ("Click on any
 * company logo below to view their live job openings!") and per-logo
 * "View Jobs →" links are deliberately dropped — that implies live,
 * per-company job listings this site doesn't have. The logos themselves
 * are `CLIENT_LOGOS` (content/logos.ts), our own vetted roster, not the
 * different set (Zomato, Amazon, Reliance, …) shown on that prototype.
 */
export const HOME_TRUSTED_BY = {
  eyebrow: "Trusted by",
  title: "Top Hiring Partners",
}

/**
 * Product offerings grid. Requested "like" a competitor's (Naukri's)
 * equivalent section — its 2×3 illustrated-card layout is the reference for
 * STRUCTURE only. Two deliberate departures, not oversights:
 *   - 4 cards, not 6: apna's real product lineup (nav.ts PRODUCT_LINKS),
 *     not Naukri's.
 *   - No bespoke mockup illustrations: those are a competitor's own product
 *     UI, not something to imitate. Each card gets a plain tinted block with
 *     an icon instead — Briefcase / PhoneCall / Search / InfinityIcon are
 *     already the icon language for these same four products in
 *     pricing-hero.tsx's PRICING_TABS.
 *
 * Heading and item taglines ARE sourced, verbatim, from
 * self-checkout-five.vercel.app/employer's own "hiring suite" section
 * (confirmed via get_page_text, 2026-09-21) — not written for this pass.
 */
export const HOME_SUITE = {
  eyebrow: "The apna hiring suite",
  title: "A single platform for every hiring need",
  description: "Choose the exact recruitment solution suited for your role urgency and scale.",
  items: [
    { name: "Smart Jobs", tagline: "Post Classic & Premium jobs", icon: "briefcase" },
    { name: "AI Calling Agent", tagline: "24/7 candidate interviews", icon: "phone" },
    { name: "Hyperlocal Database", tagline: "Direct 5Cr+ verified profiles", icon: "search" },
    { name: "apna Unlimited", tagline: "Post unlimited jobs in one plan", icon: "infinity" },
  ] as const,
}

/**
 * In the Press. The three outlets here (ET HRWorld, The Hindu BusinessLine,
 * Manufacturing Today) DID genuinely cover apna — confirmed via web search,
 * 2026-09-22 — but the headline/pull-quote text below is DUMMY PLACEHOLDER
 * COPY, not the real article text: the live articles sit behind a paywall
 * or a domain this tooling can't fetch, so no verbatim quote could be
 * pulled. Explicit user instruction to placeholder this rather than block
 * on it, 2026-09-22 — replace `headline` with the real pull-quote and
 * `href` with the real article URL before this ships.
 */
export const HOME_PRESS = {
  title: "In the press",
  items: [
    {
      outlet: "ET HRWorld",
      headline: "Placeholder headline — replace with the verified pull-quote.",
      href: "#",
    },
    {
      outlet: "The Hindu BusinessLine",
      headline: "Placeholder headline — replace with the verified pull-quote.",
      href: "#",
    },
    {
      outlet: "Manufacturing Today",
      headline: "Placeholder headline — replace with the verified pull-quote.",
      href: "#",
    },
  ] as const,
}
