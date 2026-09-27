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

export interface ProductFeature {
  title: string
  description: string
}

export interface ProductDetailRow {
  /** Must match a `HOME_SUITE.items[].name` — the row reuses that item's
   *  icon and its `PRODUCT_LINKS` href rather than declaring its own. */
  name: string
  eyebrow: string
  heading: string
  features: ProductFeature[]
}

/**
 * Product suite — alternating detail rows, one per product, below the
 * compact grid above (both stay; the grid is the overview, this is the
 * detail). Modeled on gomotive.com's per-product layout, per the approved
 * wireframe (2026-09-28).
 *
 * Smart Jobs, AI Calling Agent and Hyperlocal Database: eyebrow, heading
 * and every feature title/description below are verbatim from
 * employer.apna.co, re-confirmed live via get_page_text on 2026-09-28 (not
 * from memory of an earlier fetch). Two features shown per product; the
 * live page lists more under each (e.g. Smart Jobs also has "AI-Suggested
 * Candidates", "Customized Lead Management", "Job Post Boosts") — trimmed
 * to the first two for this layout, not dropped because they were weaker.
 *
 * apna Unlimited has no matching section on employer.apna.co under that
 * name (the live page's own "Post unlimited jobs in one plan" banner is a
 * different, shorter pitch). Its heading and features are cross-referenced
 * from copy already shipped in this repo's own checkout flow instead —
 * `unlimited-side-card.tsx` and `subscription-plans.tsx` — rather than
 * written fresh for this section.
 *
 * The media side of every row is a placeholder (a tinted icon panel, same
 * visual language as the grid cards above) standing in for a real product
 * screenshot or recording — explicit product-owner call, 2026-09-28, since
 * no such asset exists in this repo yet. Swap `HomeProductRows`' media slot
 * for a real image/video per product once one is supplied; nothing here
 * should be mistaken for the real thing.
 */
export const HOME_PRODUCT_DETAILS: ProductDetailRow[] = [
  {
    name: "Smart Jobs",
    eyebrow: "Smart job posting",
    heading: "Get applications from relevant, high-intent candidates",
    features: [
      {
        title: "Advanced Job Filters & Smart Matching",
        description:
          "Use advanced filters and automated assessments to attract the most relevant candidates",
      },
      {
        title: "Smart AI Lead Management",
        description:
          "Boost recruiter productivity by automatically categorizing leads into matched and non-matched candidates",
      },
    ],
  },
  {
    name: "AI Calling Agent",
    eyebrow: "Job with AI Calling Agent",
    heading: "AI Calling Agent interviews and shortlists candidates 24/7",
    features: [
      {
        title: "Inbound & Outbound AI Calling",
        description: "AI interviews all job applicants 24/7 & shortlists only the best candidates",
      },
      {
        title: "80% response rate with AI",
        description: "Compared to just 30% call connection rate in manual hiring",
      },
    ],
  },
  {
    name: "Hyperlocal Database",
    eyebrow: "apna Database",
    heading: "Quickly hire active jobseekers around your office.",
    features: [
      {
        title: "AI Powered Search",
        description: "Instantly turn your job descriptions into candidate searches using apnaAI",
      },
      {
        title: "Area-based Search",
        description: "Effortlessly locate candidates within a 5km radius to optimize your hiring.",
      },
    ],
  },
  {
    name: "apna Unlimited",
    eyebrow: "apna Unlimited",
    heading: "Unlimited job posting flexibility, predictable hiring cost.",
    features: [
      {
        title: "Unlimited job posts",
        description: "Free job reposts and swapping",
      },
      {
        title: "WhatsApp outreach",
        description: "To matched candidates for more applications",
      },
    ],
  },
]

/**
 * In the Press. The three outlets (ET HRWorld, The Hindu BusinessLine,
 * Manufacturing Today) DID genuinely cover apna — confirmed via web search,
 * 2026-09-22. The pull-quote text was placeholder as of that date (this
 * tooling can't fetch any of the three original articles directly), but
 * the user supplied the real, verbatim quotes via a screenshot on
 * 2026-09-23 — that replaces the earlier dummy copy below. `href` is each
 * article's real URL, found via web search 2026-09-22 (not re-verified by
 * fetching the article body, since that's exactly what's blocked).
 */
export const HOME_PRESS = {
  title: "In the press",
  items: [
    {
      outlet: "ET HRWorld",
      headline:
        "Apna's platform powered a 25% jump in MSME hiring in FY25, connecting small businesses across India directly to sales-ready talent.",
      href: "https://hr.economictimes.indiatimes.com/news/hrtech/talent-acquisition-and-management/msme-hiring-rises-25-in-fy25-sales-roles-dominate-demand-report/132010148",
    },
    {
      outlet: "The Hindu BusinessLine",
      headline:
        "Apna eyes ₹150 crore in revenue as its AI-led hiring push scales access to opportunity for 300 million Indian workers.",
      href: "https://www.thehindubusinessline.com/info-tech/apna-eyes-150-crore-revenue-from-ai-led-push-for-indias-300-million-blue-collar-workers/article71072753.ece",
    },
    {
      outlet: "Manufacturing Today",
      headline: "Apna launches India's first AI Interview Preparation Lounge.",
      href: "https://www.manufacturingtodayindia.com/apna-ai-interview-lounge",
    },
  ] as const,
}
