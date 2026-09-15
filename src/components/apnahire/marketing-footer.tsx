"use client"

/**
 * MarketingFooter — public site footer, shown only in the logged-out
 * (pricing page) state. Figma: 92gU18d45olE04ATyhhVHD → 881:11947.
 *
 * Has no background of its own in Figma, so it sits directly on the page's
 * ambient gradient and uses the same fixed-light `checkout-hero-fg` roles
 * as the rest of that canvas rather than the theme-flipping `foreground`.
 */

import * as React from "react"
import { ApnaLogo } from "@apna/design-system"
import { cn } from "@/lib/utils"
import {
  FacebookMark,
  InstagramMark,
  LinkedinMark,
  XMark,
  YoutubeMark,
} from "@/components/apnahire/social-icons"

interface FooterColumn {
  heading: string
  links: string[]
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: ["Job posting", "Database", "WhatsApp Fast Recruit", "Enterprise", "Pricing"],
  },
  {
    heading: "Get to know us",
    links: ["Careers", "Contact us", "Contact sales", "Looking for a job?"],
  },
  {
    heading: "Resources",
    links: ["apna Help Center", "Blog"],
  },
]

const SOCIALS = [
  { label: "apna on Facebook", Icon: FacebookMark },
  { label: "apna on LinkedIn", Icon: LinkedinMark },
  { label: "apna on X", Icon: XMark },
  { label: "apna on Instagram", Icon: InstagramMark },
  { label: "apna on YouTube", Icon: YoutubeMark },
]

const LEGAL = ["Privacy Policy", "Terms & Conditions", "Terms of service", "Disclosure Policy"]

export function MarketingFooter({ className }: { className?: string }) {
  return (
    <footer data-slot="marketing-footer" className={cn("pb-8 pt-20", className)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
          <ApnaLogo className="size-14" />
          <div className="flex items-center gap-6">
            {SOCIALS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-checkout-hero-fg transition-opacity hover:opacity-70"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-checkout-hero-fg">
              {column.heading}
            </h2>
            {column.links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-checkout-hero-fg transition-opacity hover:opacity-70"
              >
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="mt-15 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-checkout-hero-fg">© 2024 Apna | All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          {LEGAL.map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-checkout-hero-fg transition-opacity hover:opacity-70"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
