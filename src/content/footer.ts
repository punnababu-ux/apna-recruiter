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
      { label: "WhatsApp Fast Recruit", href: "/products/whatsapp-fast-recruit" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Get to know us",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Looking for a job?", href: "https://apna.co", external: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "apna Help Center",
        href: "https://employer-help-centre.apna.co/support/home",
        external: true,
      },
      { label: "Blog", href: "/resources/blog" },
      { label: "Trust & safety", href: "/trust-and-safety" },
    ],
  },
]

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
  { label: "Privacy Policy", href: "https://apna.co/privacy", external: true },
  { label: "Terms & Conditions", href: "https://apna.co/user-agreement", external: true },
  { label: "Terms of service", href: "https://apna.co/terms-of-service", external: true },
  {
    label: "Disclosure Policy",
    href: "https://apna.co/vulnerability-disclosure-policy",
    external: true,
  },
]

/** Computed, so the footer doesn't quietly go stale on 1 January. */
export const copyrightLine = () =>
  `© ${new Date().getFullYear()} Apna | All rights reserved.`
