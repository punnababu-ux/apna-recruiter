/**
 * Site navigation — the public header's link tree.
 *
 * Content, not markup. Pages and components never hardcode a label or an
 * href; they read from here. That is the seam a CMS slots into later: this
 * module becomes a loader with the same return type and nothing downstream
 * changes.
 *
 * Structure follows the apnatime.lovable.app prototype (user call,
 * 2026-10-16): About Us · Product · apna In The News · Resources · Customer
 * Stories, each menu split into labelled sections, then our own "Looking
 * for a job?" link (kept on purpose). Its own header actions
 * ("Sign Up" menu, "Get In Touch") are NOT taken: the right side stays
 * Contact us + Login/Sign up (`HEADER_ACTIONS`).
 *
 * Hrefs: where the prototype linked somewhere real (apna.co candidate tools,
 * the help centre, the career-central blogs) the same URL is used. Every
 * other item points at the route its page will live on; those pages aren't
 * built yet (see sitemap.ts — they're added there as they ship).
 */

export interface NavLink {
  label: string
  href: string
  /** Second line under the label — the home page's product grid uses it. */
  description?: string
  /** Leaves the employer site — renders an outbound affordance. */
  external?: boolean
}

/** Icon names, mapped to glyphs in SiteHeader (content stays icon-free). */
export type NavIcon =
  | "building"
  | "people"
  | "recruiters"
  | "candidates"
  | "universities"
  | "newsroom"
  | "recognition"
  | "job-seekers"
  | "support"

/** One labelled column of a menu: "For Recruiters", "Support", … */
export interface NavSection {
  heading: string
  icon: NavIcon
  items: NavLink[]
  /** A further labelled cluster under the items ("Resume tools"). */
  subgroups?: { label: string; items: NavLink[] }[]
}

export interface NavGroup {
  label: string
  /** Present = opens a menu. Absent = a plain top-level link. */
  sections?: NavSection[]
  href?: string
}

/**
 * The four employer products. The home page cross-references these by
 * label for its "Learn more" links, so this stays the one place a product's
 * href is defined; the Product menu's recruiter column reads the same hrefs.
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

const productHref = (label: string) => PRODUCT_LINKS.find((p) => p.label === label)!.href

const HELP_CENTRE = "https://employer-help-centre.apna.co/support/home"

export const MAIN_NAV: NavGroup[] = [
  {
    label: "About Us",
    sections: [
      {
        heading: "Company",
        icon: "building",
        items: [
          { label: "Overview", href: "/about" },
          { label: "Our Cultures and Values", href: "/about/culture" },
          { label: "apna By The Numbers", href: "/about/numbers" },
        ],
      },
      {
        heading: "People",
        icon: "people",
        items: [
          { label: "Our Leadership", href: "/about/leadership" },
          { label: "Management Team", href: "/about/management" },
          { label: "Join Us", href: "/careers" },
        ],
      },
    ],
  },
  {
    label: "Product",
    sections: [
      {
        heading: "For Recruiters",
        icon: "recruiters",
        items: [
          { label: "Smart Job Posting", href: productHref("Smart Jobs") },
          { label: "apna Database", href: productHref("Hyperlocal Database") },
          { label: "AI Calling Agent", href: productHref("AI Calling Agent") },
          { label: "apna Unlimited", href: productHref("apna Unlimited") },
        ],
      },
      {
        heading: "For Candidates",
        icon: "candidates",
        items: [{ label: "Find Your Dream Job", href: "https://apna.co/jobs", external: true }],
        subgroups: [
          {
            label: "Resume tools",
            items: [
              { label: "AI Resume Builder", href: "https://apna.co/resume-builder", external: true },
              { label: "AI Resume Checker", href: "https://apna.co/resume-checker", external: true },
              { label: "AI Cover Letter Generator", href: "https://apna.co/cover-letter", external: true },
            ],
          },
        ],
      },
      {
        heading: "For Universities",
        icon: "universities",
        items: [{ label: "AI Interview Preparation Lounge", href: "/interview-prep-lounge" }],
      },
    ],
  },
  {
    label: "apna In The News",
    sections: [
      {
        heading: "Newsroom",
        icon: "newsroom",
        items: [
          { label: "Press Releases", href: "/newsroom" },
          { label: "Events", href: "/newsroom/events" },
        ],
      },
      {
        heading: "Recognition",
        icon: "recognition",
        items: [{ label: "Awards and Certifications", href: "/newsroom/awards" }],
      },
    ],
  },
  {
    label: "Resources",
    sections: [
      {
        heading: "For Recruiters",
        icon: "recruiters",
        items: [
          {
            label: "Blogs",
            href: "https://apna.co/career-central/category/hiring-advice/",
            external: true,
          },
          { label: "Product Guides", href: "/resources/product-guides" },
          { label: "Reports and Insights", href: "/resources/reports" },
        ],
      },
      {
        heading: "For Job Seekers",
        icon: "job-seekers",
        items: [
          { label: "Blogs", href: "https://apna.co/career-central/", external: true },
          { label: "Community", href: "/resources/community" },
        ],
      },
      {
        heading: "Support",
        icon: "support",
        items: [
          { label: "Help Center", href: HELP_CENTRE, external: true },
          { label: "FAQs", href: "/resources/faqs" },
          { label: "Trust & Safety", href: "/trust-and-safety" },
        ],
      },
    ],
  },
  { label: "Customer Stories", href: "/customer-stories" },
]

/** The candidate ingress — kept after the prototype's menus (user call,
 *  2026-10-16): job seekers who land here go to apna.co in one click. */
export const LOOKING_FOR_A_JOB: NavLink = {
  label: "Looking for a job?",
  href: "https://apna.co",
  external: true,
}

export const HEADER_ACTIONS = {
  secondary: { label: "Contact us", href: "/contact-us" } satisfies NavLink,
  // The live site's header login entry (employer.apna.co).
  primary: { label: "Login/Sign up", href: "/login" } satisfies NavLink,
}
