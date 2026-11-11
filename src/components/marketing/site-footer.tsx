/**
 * SiteFooter — the public footer for every marketing page.
 *
 * Same layout as the checkout page's footer (Figma 881:11947), but reading
 * from `src/content/footer.ts` instead of holding its own copy with every
 * href set to "#", and computing the year rather than hardcoding 2024.
 *
 * Server component: it has no interactivity, and the copyright year is
 * evaluated per request rather than at hydration.
 */

import Link from "next/link"
import { FooterWatermark } from "@/components/marketing/footer-watermark"
import { cn } from "@/lib/utils"
import {
  APP_STORE_LINKS,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  copyrightLine,
  type SocialIconName,
} from "@/content/footer"
import {
  AppleMark,
  FacebookMark,
  GooglePlayMark,
  InstagramMark,
  LinkedinMark,
  XMark,
  YoutubeMark,
} from "@/components/marketing/social-icons"

const SOCIAL_MARKS: Record<SocialIconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  facebook: FacebookMark,
  linkedin: LinkedinMark,
  x: XMark,
  instagram: InstagramMark,
  youtube: YoutubeMark,
}

const STORE_MARKS = { apple: AppleMark, "google-play": GooglePlayMark }

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer data-slot="site-footer" className={cn("pt-20", className)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-12">
        <div data-settle-item className="col-span-2 flex flex-col gap-6 lg:col-span-4">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon }) => {
              const Mark = SOCIAL_MARKS[icon]
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ink press relative flex size-10 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-interactive hover:bg-muted"
                >
                  <Mark />
                </a>
              )
            })}
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-overline text-muted-foreground">
              Download apna recruiter app
            </h2>
            <div className="flex items-center gap-6">
              {APP_STORE_LINKS.map(({ label, href, icon }) => {
                const Mark = STORE_MARKS[icon]
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-foreground transition-interactive hover:opacity-70"
                  >
                    <Mark />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.heading} data-settle-item aria-label={column.heading} className="flex flex-col gap-4 lg:col-span-2">
            <h2 className="text-overline text-muted-foreground">
              {column.heading}
            </h2>
            {column.links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-foreground transition-interactive hover:opacity-70"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-foreground transition-interactive hover:opacity-70"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        ))}
      </div>

      <FooterWatermark />

      <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground">{copyrightLine()}</p>
        <div className="flex flex-wrap items-center gap-4">
          {LEGAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs text-foreground transition-interactive hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}
