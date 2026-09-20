/**
 * Site navigation — the public header's link tree.
 *
 * Content, not markup. Pages and components never hardcode a label or an
 * href; they read from here. That is the seam a CMS slots into later: this
 * module becomes a loader with the same return type and nothing downstream
 * changes.
 *
 * Scope note: candidate-facing destinations (job search, resume tools) are
 * deliberately absent. This is the employer site; candidate journeys live on
 * apna.co and are linked out to, once, from `LOOKING_FOR_A_JOB`.
 */

export interface NavLink {
  label: string
  href: string
  /** Second line in a mega-menu panel. Omitted for plain links. */
  description?: string
  /** Leaves the employer site — renders an outbound affordance. */
  external?: boolean
}

export interface NavGroup {
  label: string
  /** Present = renders as a mega-menu panel. Absent = a plain top-level link. */
  items?: NavLink[]
  href?: string
}

/**
 * Product panel. Descriptions are the one-line "what is this" the employer
 * prototype shows under each item — they do real work in a mega menu, so
 * they're required content rather than decoration.
 */
export const PRODUCT_LINKS: NavLink[] = [
  {
    label: "Smart Jobs",
    href: "/products/smart-jobs",
    description: "Classic & Premium job postings",
  },
  {
    label: "AI Calling Agent",
    href: "/products/ai-calling-agent",
    description: "24/7 automated candidate interviews",
  },
  {
    label: "Hyperlocal Database",
    href: "/products/database",
    description: "5Cr+ verified candidate profiles",
  },
  {
    label: "apna Unlimited",
    href: "/products/unlimited",
    description: "Unlimited jobs in one flat monthly plan",
  },
]

export const MAIN_NAV: NavGroup[] = [
  { label: "Product", items: PRODUCT_LINKS },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Blogs", href: "/resources/blog" },
  { label: "Pricing", href: "/pricing" },
]

export const LOOKING_FOR_A_JOB: NavLink = {
  label: "Looking for a job?",
  href: "https://apna.co",
  external: true,
}

export const HEADER_ACTIONS = {
  secondary: { label: "Contact us", href: "/contact-us" } satisfies NavLink,
  primary: { label: "Post a Job", href: "/post-a-job" } satisfies NavLink,
}
