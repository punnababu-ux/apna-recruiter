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
import { ApnaLogo } from "@apna/design-system"
import { cn } from "@/lib/utils"
import {
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  copyrightLine,
  type SocialIconName,
} from "@/content/footer"
import {
  FacebookMark,
  InstagramMark,
  LinkedinMark,
  XMark,
  YoutubeMark,
} from "@/components/apnahire/social-icons"

const SOCIAL_MARKS: Record<SocialIconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  facebook: FacebookMark,
  linkedin: LinkedinMark,
  x: XMark,
  instagram: InstagramMark,
  youtube: YoutubeMark,
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer data-slot="site-footer" className={cn("pt-20 pb-8", className)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-6 lg:col-span-1">
          <Link href="/" aria-label="apna for employers, home" className="w-fit">
            <ApnaLogo className="size-14" />
          </Link>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(({ label, href, icon }) => {
              const Mark = SOCIAL_MARKS[icon]
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-foreground transition-opacity hover:opacity-70"
                >
                  <Mark />
                </a>
              )
            })}
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              {column.heading}
            </h2>
            {column.links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-foreground transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-foreground transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        ))}
      </div>

      <div className="mt-15 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground">{copyrightLine()}</p>
        <div className="flex flex-wrap items-center gap-4">
          {LEGAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs text-foreground transition-opacity hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
