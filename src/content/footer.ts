/**
 * Site footer content.
 *
 * Lifted out of `marketing-footer.tsx`, which held these as module consts with
 * every href set to "#" and the year hardcoded to 2024.
 */

import type { NavLink } from "./nav"

export interface FooterColumn {
  heading: string
  links: NavLink[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Job posting", href: "/products/smart-jobs" },
      { label: "Database", href: "/products/database" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Pricing", href: "/pricing" },
      { label: "AI Interview Preparation Lounge", href: "/interview-prep-lounge" },
    ],
  },
  {
    heading: "About us",
    links: [
      { label: "Overview", href: "/about" },
      { label: "Our culture and values", href: "/about/culture" },
      { label: "Apna by the numbers", href: "/about/numbers" },
      { label: "Our leadership", href: "/about/leadership" },
      { label: "Join us", href: "/careers" },
    ],
  },
  {
    heading: "Get to know us",
    links: [
      { label: "Careers", href: "/careers" },
      {
        label: "Contact support",
        href: "https://apna.co/contact-us",
        external: true,
      },
      { label: "Contact sales", href: "https://employer.apna.co/contact-us", external: true },
      { label: "Looking for a job", href: "https://apna.co", external: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "Apna help center",
        href: "https://employer-help-centre.apna.co/support/home",
        external: true,
      },
      // External, as on employer.apna.co — we don't build a blog.
      { label: "Blog", href: "https://apna.co/career-central/category/hiring-platform/", external: true },
      { label: "Press releases", href: "/newsroom" },
      { label: "Awards and certifications", href: "/newsroom/awards" },
    ],
  },
]

/** One smart link for both stores: it opens the right store for the device. */
const RECRUITER_APP_LINK = "https://apna-emp.app.link/vRKt90Ne36b"

export const APP_STORE_LINKS = [
  { label: "Download on the App Store", href: RECRUITER_APP_LINK, external: true, icon: "apple" },
  { label: "Get it on Google Play", href: RECRUITER_APP_LINK, external: true, icon: "google-play" },
] as const

export const SOCIAL_LINKS = [
  { label: "apna on Facebook", href: "https://www.facebook.com/apnahq", icon: "facebook" },
  { label: "apna on LinkedIn", href: "https://www.linkedin.com/company/apnahq/", icon: "linkedin" },
  { label: "apna on X", href: "https://x.com/apnahq", icon: "x" },
  { label: "apna on Instagram", href: "https://www.instagram.com/apnahq/", icon: "instagram" },
  {
    label: "apna on YouTube",
    href: "https://www.youtube.com/channel/UCl-retoBiPxEqXMxxIhBt7A",
    icon: "youtube",
  },
] as const

export type SocialIconName = (typeof SOCIAL_LINKS)[number]["icon"]

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy policy", href: "https://apna.co/privacy", external: true },
  { label: "Terms & Conditions", href: "https://apna.co/user-agreement", external: true },
  { label: "Terms of service", href: "https://apna.co/terms-of-service", external: true },
  {
    label: "Disclosure policy",
    href: "https://apna.co/vulnerability-disclosure-policy",
    external: true,
  },
]

/** Computed, so the footer doesn't quietly go stale on 1 January. */
export const copyrightLine = () =>
  `© ${new Date().getFullYear()} Apna | All rights reserved.`

