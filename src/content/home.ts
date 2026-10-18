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
    { value: "7 L+", label: "Businesses & Enterprises" },
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
 * The hiring suite section: its heading, plus the four products' names,
 * taglines and icon keys. The section shows one illustrated card per product
 * (HOME_PRODUCT_DETAILS below); the overview card grid that used to sit
 * above them was removed on 2026-10-16 as repetitive. Only the names
 * are read today (to type the cards); taglines and icon keys are kept for
 * the product pages the nav already links to.
 *
 * Heading and item taglines are verbatim from
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
    // AI calling is an add-on on any job (not a premium job type).
    eyebrow: "AI Calling Agent",
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

/**
 * The proof the live homepage (employer.apna.co, read 2026-10-19) carries
 * and the redesign had dropped: "Why hire from apna?" outcome stats,
 * customer testimonials and the FAQ. Copy is the live site's, verbatim
 * (only "Apna" → "apna", and the FAQ's candidate and city counts set to
 * the hero's 6 crore+ / 7,200+, so the site states one set of numbers); the Tata 1mg quote drops its dated
 * last clause, "especially during the present times"; companies for the first two quotes are the brands
 * the live carousel shows beside them.
 */
export const HOME_PROOF = {
  why: {
    title: "Why hire from apna?",
    description:
      "From startups to SMEs to established enterprises, apna revolutionizes the way businesses find high-quality talent quickly & effortlessly.",
    stats: [
      { value: "2 Lakhs+", label: "New candidates join apna every month." },
      { value: "160+", label: "Job categories to publish your job." },
      { value: "60%", label: "of businesses get qualified candidates within 24 hrs" },
    ],
  },
  testimonials: {
    items: [
      {
        quote:
          "We are closely working with apna for talent discovery and hiring across job families. Their quickest turn-around time is enabling us to uninterruptedly continue our daily functions and services.",
        name: "Dr Varun",
        role: "SVP, Medical Affairs · Tata 1mg",
      },
      {
        quote:
          "Team apna has provided us with great support. 75% of our job fulfillment for delivery personnel has been through apna. I love the skill tag feature as we don't have to manually type requirements.",
        name: "Neraj Gupta",
        role: "City Head of Supply, Mumbai · Shadowfox",
      },
      {
        quote:
          "Before hearing about apna from a friend, I had doubts about tech solutions, but it proved to be beneficial to me. I added a listing, received 30-40 candidates, and was able to hire 3 people. These folks will now be trained and ramp up!",
        name: "Kabir Chugh",
        role: "Restaurateur, Owner Nizams",
      },
    ],
  },
  faqs: [
    {
      value: "why-apna",
      question: "Why should I use apna over others?",
      answer:
        "apna boasts the largest pool of active candidates, achieving a candidate base of over 6 crore. The platform personalizes the hiring experience, allowing you to opt for callbacks from relevant candidates, send bulk WhatsApp messages, or use the dashboard to shortlist candidates effectively. Additionally, you can enhance your job visibility by posting premium or super premium jobs, tailored to meet your specific hiring needs.",
    },
    {
      value: "not-enough-candidates",
      question: "What happens if I don't receive enough candidates?",
      answer:
        "You can always chat with apna Support team for any help regarding your job posting. On a single click, our Support team will be available to guide you on ways to increase the application rate and close your hiring faster.",
    },
    {
      value: "cities",
      question: "In which cities can I hire via apna?",
      answer:
        "apna is now LIVE in 7,200+ towns and cities across India. You can easily find candidates from any city just by posting the job or searching candidates in apna Database for that city.",
    },
    {
      value: "bulk",
      question: "I want to hire more than 10 candidates, do you have any bulk-hiring plans?",
      answer:
        "Yes, we offer bulk-hiring plans personalised for your needs at discounted prices. You can request a callback from our Sales team by clicking on Contact us.",
    },
  ],
} as const
