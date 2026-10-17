/**
 * Product pages — /products/smart-jobs, /database, /ai-calling-agent,
 * /unlimited. One entry per page, rendered by `ProductPage`.
 *
 * Sourcing: every heading, step, feature and stat below is verbatim from
 * employer.apna.co's product sections, read live via get_page_text on
 * 2026-10-17 (the Lovable prototype, apnatime.lovable.app, has no product
 * pages: its one route is the homepage). Two exceptions, both noted inline:
 * the "calls made" stat is the Lovable homepage's, and each hero's one-line
 * description (where there is one) is the product's tagline from HOME_SUITE (content/home.ts).
 *
 * `product` keys the illustration (ProductIllustration) and must match a
 * HOME_SUITE item name. Icons are design-system icon names, resolved in the
 * page so this file stays plain data.
 */

export type ProductIconName =
  | "filter"
  | "sparkles"
  | "whatsapp"
  | "users"
  | "list"
  | "zap"
  | "search"
  | "map"
  | "eye"
  | "file"
  | "sliders"
  | "phone"
  | "trending"
  | "clock"
  | "briefcase"
  | "refresh"
  | "database"

export interface ProductPageFeature {
  icon: ProductIconName
  title: string
  description: string
}

export interface ProductPageContent {
  slug: string
  product: "Smart Jobs" | "AI Calling Agent" | "Hyperlocal Database" | "apna Unlimited"
  /** Page <title>. */
  metaTitle: string
  metaDescription: string
  eyebrow: string
  heading: string
  /** One line under the heading — left out where it would only repeat it. */
  description?: string
  /** The hero's one primary action. Logged-out visitors go through login. */
  cta: { label: string; href: string }
  stats?: { value: string; label: string }[]
  /** How it works, step by step — shown first, in the same card grid as
   *  the features, under the eyebrow `title` ("How it works"). */
  steps?: { title: string; items: { icon: ProductIconName; title: string; description: string }[] }
  features: { title: string; items: ProductPageFeature[] }
}

const login = (next: string) => `/login?next=${encodeURIComponent(next)}`

export const PRODUCT_PAGES = {
  "smart-jobs": {
    slug: "smart-jobs",
    product: "Smart Jobs",
    metaTitle: "Smart Job Posting",
    metaDescription: "Get applications from relevant, high-intent candidates with apna's smart job posting.",
    eyebrow: "Smart job posting",
    heading: "Get applications from relevant, high-intent candidates",
    description: "Post Classic & Premium jobs",
    cta: { label: "Post a smart-AI job", href: login("/apnahire/jobs/new") },
    features: {
      title: "Everything a job post needs to bring the right people",
      items: [
        {
          icon: "filter",
          title: "Advanced Job Filters & Smart Matching",
          description: "Use advanced filters and automated assessments to attract the most relevant candidates",
        },
        {
          icon: "sparkles",
          title: "Smart AI Lead Management",
          description:
            "Boost recruiter productivity by automatically categorizing leads into matched and non-matched candidates",
        },
        {
          icon: "whatsapp",
          title: "Inbound Calls & WhatsApp Alerts",
          description:
            "Stay informed on the go with real-time candidate calls and application alerts directly on WhatsApp.",
        },
        {
          icon: "users",
          title: "AI-Suggested Candidates",
          description: "Get AI-recommended candidates from our database matching to your job postings.",
        },
        {
          icon: "list",
          title: "Customized Lead Management",
          description: "Manage leads efficiently with ATS integration, CSV access, dashboard tracking, and WhatsApp alerts.",
        },
        {
          icon: "zap",
          title: "Job Post Boosts",
          description: "Enhance visibility with walk-in and premium job post boosts.",
        },
      ],
    },
  },
  "ai-calling-agent": {
    slug: "ai-calling-agent",
    product: "AI Calling Agent",
    metaTitle: "AI Calling Agent",
    metaDescription: "apna's AI Calling Agent interviews and shortlists candidates 24/7.",
    // AI calling is an add-on on any job (not a premium job type).
    eyebrow: "AI Calling Agent",
    heading: "AI Calling Agent interviews and shortlists candidates 24/7",
    cta: { label: "Post a job now", href: login("/apnahire/jobs/new") },
    stats: [
      { value: "80%", label: "Response rate with AI" },
      { value: "50%", label: "Less time to hire" },
      // From the Lovable homepage's "Apna index", not employer.apna.co.
      { value: "50,00,000+", label: "Calls made by the AI Calling Agent" },
    ],
    steps: {
      title: "How it works",
      items: [
        {
          icon: "sliders",
          title: "Talk to the AI agent and set your hiring criteria",
          description: "AI agent creates expert, role-specific questions",
        },
        {
          icon: "phone",
          title: "AI agent calls candidates on your behalf 24/7",
          description:
            "Interviews all interested candidates. Follows up 5 times via call, whatsapp & email even after work hours",
        },
        {
          icon: "list",
          title: "Gives you a ready shortlist of top candidates",
          description: "Get a dashboard with candidates pre-sorted by job fit whom you can interview",
        },
      ],
    },
    features: {
      title: "Screening that never clocks off",
      items: [
        {
          icon: "phone",
          title: "Inbound & Outbound AI Calling",
          description: "AI interviews all job applicants 24/7 & shortlists only the best candidates",
        },
        {
          icon: "trending",
          title: "80% response rate with AI",
          description: "Compared to just 30% call connection rate in manual hiring",
        },
        {
          icon: "clock",
          title: "Reduce hiring time by 50%",
          description: "AI does initial screening & shortlisting of candidates with whom you can do final interview",
        },
      ],
    },
  },
  database: {
    slug: "database",
    product: "Hyperlocal Database",
    metaTitle: "apna Database",
    metaDescription: "Quickly hire active jobseekers around your office with apna Database.",
    eyebrow: "apna Database",
    heading: "Quickly hire active jobseekers around your office.",
    description: "Direct 5Cr+ verified profiles",
    cta: { label: "Search candidates", href: login("/apnahire/database/search-candidates") },
    features: {
      title: "Find, filter and reach candidates near you",
      items: [
        {
          icon: "sparkles",
          title: "AI Powered Search",
          description: "Instantly turn your job descriptions into candidate searches using apnaAI",
        },
        {
          icon: "map",
          title: "Area-based Search",
          description: "Effortlessly locate candidates within a 5km radius to optimize your hiring.",
        },
        {
          // A free feature, not a product of its own (Punna, 2026-10-17).
          // Copy from employer.apna.co's WhatsApp Fast Recruit section.
          icon: "whatsapp",
          title: "WhatsApp Fast Recruit",
          // Also folds in the old "Bulk WhatsApp Invites" card (one feature).
          description:
            "Skip endless calls: send custom WhatsApp invites to up to 320 candidates daily, free, in a single click, with saved templates to collect CVs, schedule walk-ins and send assessments.",
        },
        {
          icon: "eye",
          title: "Unlimited Profile Views",
          description: "Review endless profiles free-of-cost. Pay only when you want to contact suitable candidates",
        },
        {
          icon: "file",
          title: "Auto Generated Resumes",
          description: "Effortlessly generate downloadable resumes from apna profiles for seamless candidate review.",
        },
        {
          icon: "sliders",
          title: "Precision Filtering",
          description: "Use 22+ advanced filters to fine-tune candidate searches.",
        },
      ],
    },
  },
  unlimited: {
    slug: "unlimited",
    product: "apna Unlimited",
    metaTitle: "apna Unlimited",
    metaDescription: "Post unlimited jobs in one plan with apna Unlimited.",
    eyebrow: "apna Unlimited",
    heading: "Post unlimited jobs in one plan",
    description: "Post 3+ roles every month. Fill them. Move on.",
    cta: { label: "Subscribe now", href: "/pricing" },
    stats: [
      { value: "3,500+", label: "Businesses hiring — 9 in 10 within their first week" },
      { value: "7 in 10", label: "Premium roles filled, without the wait" },
      { value: "90%", label: "Fulfilment rate" },
    ],
    features: {
      title: "One plan for every role you hire",
      items: [
        {
          icon: "briefcase",
          title: "Hire across roles and sectors",
          description: "Use your active slots for as many roles and departments, across your city",
        },
        {
          icon: "refresh",
          title: "Reuse slots the moment a role closes",
          description: "Fulfilled a position? Expire the job and post the next one instantly",
        },
        {
          icon: "database",
          title: "Reach the right candidates faster",
          description:
            "Discover and unlock profiles with up to 4,000 database access and find your best-matched candidates surfaced first",
        },
      ],
    },
  },
} satisfies Record<string, ProductPageContent>

export type ProductSlug = keyof typeof PRODUCT_PAGES
