"use client"

/**
 * SubscriberPlanCard — the subscriber's plan on the jobs dashboard (Figma
 * Self-checkout › Subscription-upgrade): an OfferBar on top, then
 * "apna Unlimited", the plan's end date and four numbers.
 *
 * The bar on top is one of OFFER_BANNERS (offer-banners.tsx): tenure
 * upgrades, extra slots, a database top-up, auto-pay off and the rebuys.
 * Which one shows is passed in. The jobs page shows none until a rule picks one.
 */

import {
  Briefcase,
  CalendarClock,
  Card,
  CircleAlert,
  CircleCheck,
  FileText,
  LogoApnaUnlimited,
  UserSearch,
} from "@apna/design-system"
import { OFFER_BANNERS, OfferBannerFor, type OfferBannerCase } from "@/components/apnahire/offer-banners"
import { cn } from "@/lib/utils"

const STATS: { icon: typeof Briefcase; label: string; short?: string; value: string }[] = [
  { icon: Briefcase, label: "Jobs posted", value: "8" },
  // Phones: too long for a half-width tile beside its icon, so the short form.
  { icon: FileText, label: "Applications received", short: "Applications", value: "640" },
  { icon: CircleCheck, label: "Shortlisted", value: "120" },
  { icon: UserSearch, label: "Database unlocks", value: "520" },
]

/** The bars that sit on the plan card: everything but credits and festive. */
export const PLAN_CARD_BARS = (Object.keys(OFFER_BANNERS) as OfferBannerCase[]).filter((k) => !k.startsWith("credits-") && !k.startsWith("festive-"))

export function SubscriberPlanCard({
  template,
  validTill = "18 Oct 2026",
  className,
}: {
  /** The bar on top; none, and the card starts at its plan row. */
  template?: OfferBannerCase | null
  validTill?: string
  className?: string
}) {
  const t = template ? OFFER_BANNERS[template] : null
  // A rebuy bar: the plan has already ended.
  const ended = t !== null && "tone" in t && t.tone === "renew"
  return (
    <Card padding="none" className={cn("gap-0 overflow-visible", className)}>
      {template && <OfferBannerFor bar={template} className="rounded-b-none" />}
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <LogoApnaUnlimited variant="theme" className="h-4 w-auto text-foreground md:h-5" />
          <span className="flex items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
            {ended ? (
              <CircleAlert className="size-4 text-destructive" aria-hidden />
            ) : (
              <CalendarClock className="size-4" aria-hidden />
            )}
            {ended ? (
              <span className="font-medium text-destructive">Expired on {validTill}</span>
            ) : (
              <>
                Valid till <span className="font-medium text-foreground">{validTill}</span>
              </>
            )}
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map(({ icon: Icon, label, short, value }) => (
            // Compact (Figma): number over its label, the icon top right.
            <div key={label} className="flex items-start justify-between gap-2 rounded-card-nested bg-muted px-4 py-3">
              <div className="flex min-w-0 flex-col-reverse">
                <dt className="text-sm whitespace-nowrap text-muted-foreground">
                  {short ? (
                    <>
                      <span className="sm:hidden">{short}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </>
                  ) : (
                    label
                  )}
                </dt>
                <dd className="text-xl font-semibold tabular-nums text-foreground">{value}</dd>
              </div>
              <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            </div>
          ))}
        </dl>
      </div>
    </Card>
  )
}

