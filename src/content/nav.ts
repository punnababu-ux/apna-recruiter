/**
 * Site navigation — the public header's link tree.
 *
 * Content, not markup. Pages and components never hardcode a label or an
 * href; they read from here. That is the seam a CMS slots into later: this
 * module becomes a loader with the same return type and nothing downstream
 * changes.
 *
 * Structure follows the apnatime.lovable.app prototype (user call,
 * 2026-10-16): About Us · Product · News · Resources · Customer
 * Stories, each menu split into labelled sections (Product and Resources
 * without the prototype's "For Candidates" / "For Job Seekers" columns, and "News" for "Apna In The News" —
 * user calls, 2026-10-16), then our own "Looking
 * for a job?" link (kept on purpose). Its own header actions
 * ("Sign Up" menu, "Get In Touch") are NOT taken: the right side stays
 * Login (`HEADER_ACTIONS`).
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
  | "overview"
  | "culture"
  | "numbers"
  | "leadership"
  | "management"
  | "join"
  | "unlimited"
  | "ai-calling"
  | "jobs"
  | "database"
  | "enterprise"
  | "lounge"
  | "press"
  | "awards"
  | "help"
  | "blog"

/** One labelled column of a menu: "Company", "Newsroom", … */
export interface NavSection {
  heading: string
  items: (NavLink & { icon: NavIcon; description: string })[]
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

export const HELP_CENTRE = "https://employer-help-centre.apna.co/support/home"

export const MAIN_NAV: NavGroup[] = [
  {
    label: "About us",
    sections: [
      {
        heading: "Company",
        items: [
          { label: "Overview", href: "/about", icon: "overview", description: "Who we are and why we exist" },
          { label: "Our culture and values", href: "/about/culture", icon: "culture", description: "The values that shape how we build" },
          { label: "Apna by the numbers", href: "/about/numbers", icon: "numbers", description: "Our impact on India's workforce, in numbers" },
          { label: "Our leadership", href: "/about/leadership", icon: "leadership", description: "The board guiding apna" },
          { label: "Management team", href: "/about/management", icon: "management", description: "The people running apna every day" },
          { label: "Join us", href: "/careers", icon: "join", description: "Build what millions run on" },
        ],
      },
    ],
  },
  {
    label: "Product",
    sections: [
      {
        heading: "Solutions",
        items: [
          { label: "Apna unlimited", href: productHref("apna Unlimited"), icon: "unlimited", description: "Post unlimited jobs in one plan" },
          { label: "Job with AI calling agent", href: productHref("AI Calling Agent"), icon: "ai-calling", description: "AI calling agent interviews and shortlists candidates 24/7" },
          { label: "Smart jobs", href: productHref("Smart Jobs"), icon: "jobs", description: "Post your job and get qualified candidates" },
          { label: "Hyperlocal database", href: productHref("Hyperlocal Database"), icon: "database", description: "Instantly match and connect with verified candidates" },
          { label: "Apna enterprise", href: "/enterprise", icon: "enterprise", description: "Hiring at scale, with a team behind you" },
          { label: "AI Interview Preparation Lounge", href: "/interview-prep-lounge", icon: "lounge", description: "AI mock interviews for campuses and students" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    sections: [
      {
        heading: "Newsroom",
        items: [
          { label: "Press releases", href: "/newsroom", icon: "press", description: "News and media coverage of apna" },
          { label: "Awards and certifications", href: "/newsroom/awards", icon: "awards", description: "Recognition for how we hire and build" },
        ],
      },
      {
        heading: "Help and insights",
        items: [
          { label: "Help center", href: HELP_CENTRE, external: true, icon: "help", description: "Guides and answers for recruiters" },
          {
            label: "Blog",
            href: "https://apna.co/career-central/category/hiring-platform/",
            external: true,
            icon: "blog",
            description: "Hiring tips and insights",
          },
        ],
      },
    ],
  },
  { label: "Customer Stories", href: "/customer-stories" },
  // Not in the prototype's nav, but the logged-out pricing page is the way
  // into checkout — it stays one click from every page (user call,
  // 2026-10-16).
  { label: "Pricing", href: "/pricing" },
]

/** The candidate ingress — kept after the prototype's menus (user call,
 *  2026-10-16): job seekers who land here go to apna.co in one click. */
export const LOOKING_FOR_A_JOB: NavLink = {
  label: "Looking for a job?",
  href: "https://apna.co",
  external: true,
}

export const HEADER_ACTIONS = {
  secondary: { label: "Contact us", href: "/#contact-us" } satisfies NavLink,
  // The live site's header login entry (employer.apna.co).
  // "Login / Sign up" (user call, 2026-10-19): the same /login flow signs new
  // recruiters up too, so the label says so. Contact sales lives on the
  // homepage Enterprise stacking card, not in the header.
  primary: { label: "Login / Sign up", href: "/login" } satisfies NavLink,
}
