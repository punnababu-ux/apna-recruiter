"use client"

/**
 * RenewalBanner — a richer sibling of `AlertBanner`: icon + headline/subline
 * on the left, a checklist + price row + CTA on the right.
 *
 * Sourced from recurring "renew your plan" banners already live across the
 * product (self-checkout credits running low, subscription about to lapse)
 * — those were each hand-styled as a die-cut coupon/ticket shape with
 * inconsistent colors. This keeps their content and anchoring (icon,
 * headline + subline, credit/validity checklist, price + MRP + discount,
 * CTA) but drops the ticket notches for the same plain rounded-card chrome
 * as every other `Alert`-based component, so tone comes from the shared
 * `variant`/`appearance` system instead of one-off hex picks per call site.
 * `appearance` mirrors `AlertBanner` exactly (same shared tone maps, see
 * the shared tone-map module): `"secondary"` (default) is a subtle tint, `"primary"`
 * is the solid gradient treatment for a higher-emphasis promo placement.
 *
 * `badge` (discount pill), `cta` and `icon` are passed as pre-styled nodes
 * rather than styled by this component — the same "pass pre-styled nodes"
 * rule `PricingCard` and `LogoWall` already follow, so this component owns
 * layout only and never a parallel colour palette. For `badge`, prefer a
 * translucent neutral overlay over an opaque or tone-coloured chip: the card
 * itself already sits on a subtle (or, in `primary`, saturated) tint of the
 * same tone, so a same-tone badge washes out, and a solid white/black chip
 * reads as a stark block dropped on top rather than part of the surface.
 * `bg-foreground/15 text-foreground` (secondary) and `bg-white/15 text-white`
 * (primary) — as in the example below — soften or lighten the card locally
 * instead, the same overlay logic `appearance="primary"` itself uses for text.
 * For `cta`, prefer `variant="secondary"` on the Button regardless of tone:
 * the default (solid green) fights a red or amber card the same way a
 * tone-coloured badge would.
 *
 * API
 *   <RenewalBanner
 *     variant="destructive"                         // tone — same as <Alert>
 *     appearance="secondary"                        // default; or "primary" for solid gradient
 *     icon={<RefreshCw />}
 *     title="0 job credits remaining."
 *     subtitle="Renew now! Same discount applied!"
 *     items={[{ label: "6 Job credits" }, { label: "90 days validity" }]}
 *     price="₹3,649"
 *     mrp="₹4,306"                                   // optional, line-through
 *     badge={<Badge variant="outline" className="border-transparent bg-foreground/15 text-foreground">22% OFF</Badge>}
 *     cta={<Button variant="secondary" trailingIcon={<ArrowRight />}>Renew now</Button>}
 *   />
 */

import * as React from "react"
import { Alert, AlertTitle } from "./alert"
import { Check } from "@/icons/icons"
import { cn } from "@/lib/utils"
import { bannerAccentColorMap, bannerPrimaryBgMap } from "../../lib/banner-tone"

export interface RenewalBannerItem {
  label: React.ReactNode
}

// Same border colours as each Alert variant's own `border-*` class (see
// alert.tsx), reused here for the internal divider so it reads clearly
// against a tinted secondary card instead of washing out like a neutral
// `border-border` would.
const dividerBorderColorMap: Record<string, string> = {
  default: "border-border",
  destructive: "border-destructive/20",
  success: "border-success/20",
  warning: "border-warning/40",
  info: "border-info/20",
}

export interface RenewalBannerProps extends Omit<React.ComponentProps<typeof Alert>, "title"> {
  /** Optional icon to the left of the headline. E.g. <RefreshCw /> */
  icon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  /** Short checklist facts — e.g. credits remaining, validity window. */
  items: RenewalBannerItem[]
  price: React.ReactNode
  mrp?: React.ReactNode
  badge?: React.ReactNode
  cta: React.ReactNode
  /** Style appearance. 'secondary' (default) is a subtle tint, 'primary' is a solid gradient. */
  appearance?: "primary" | "secondary"
}

const RenewalBanner = React.forwardRef<HTMLDivElement, RenewalBannerProps>(
  (
    { className, variant, icon, title, subtitle, items, price, mrp, badge, cta, appearance = "secondary", ...props },
    ref
  ) => {
    const isPrimary = appearance === "primary"
    const safeVariant = variant || "default"
    const accentColor = isPrimary ? "text-white" : bannerAccentColorMap[safeVariant]
    const textColor = isPrimary ? "text-white" : "text-foreground"
    const mutedTextColor = isPrimary ? "text-white/70" : "text-muted-foreground"
    // Mirrors the border colour each Alert variant already uses on its own
    // outer border (see alert.tsx's cva), not the neutral `border-border` —
    // on a tinted secondary card (e.g. destructive-subtle), a plain grey
    // border/fill barely registers against a background that's already a
    // tint of the same hue. `isPrimary` still gets a white overlay, same
    // logic as the badge and text above.
    const dividerBorderColor = isPrimary ? "border-white/20" : dividerBorderColorMap[safeVariant]

    return (
      <Alert
        ref={ref}
        variant={isPrimary ? undefined : variant}
        className={cn(
          // @container: a CSS container query can't be evaluated against the
          // element that declares it — only its descendants can query it —
          // so the container lives on the Alert root and the actual
          // flex-direction switch below lives on a child of it, not here.
          // This is deliberately a container query rather than a viewport
          // breakpoint (e.g. `lg:`): this row packs headline + checklist +
          // price + CTA and needs real width to share, and a viewport
          // breakpoint fires based on the whole browser window — wrong
          // signal for a card that's often docked next to a sidebar or
          // nested in a narrower column, where it'd either squeeze the
          // headline to near-zero on a "wide" viewport that doesn't
          // actually give this card much room, or sit stacked on a wide,
          // roomy one.
          "@container/renewal-banner rounded-xl border-0 p-4 text-left shadow-none",
          isPrimary && cn("bg-transparent", bannerPrimaryBgMap[safeVariant]),
          className
        )}
        {...props}
      >
        <div className="flex flex-col flex-wrap gap-4 @5xl/renewal-banner:flex-row @5xl/renewal-banner:items-center @5xl/renewal-banner:gap-8">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {icon && (
              <div className={cn("flex shrink-0 items-center justify-center [&>svg]:size-8", accentColor)}>
                {icon}
              </div>
            )}
            <div className="flex min-w-0 flex-col gap-1">
              <AlertTitle className={cn("!mb-0 text-base font-semibold", textColor)}>{title}</AlertTitle>
              {subtitle && <p className={cn("text-sm", textColor)}>{subtitle}</p>}
            </div>
          </div>

          <div
            className={cn(
              // Horizontal rule above the detail block when stacked
              // (container narrower than @5xl), vertical rule to its left
              // once the row goes horizontal — a card needs *some*
              // separator at every width, not just once it's wide. Within
              // the detail block itself, the checklist and the price/CTA
              // row are just stacked with a gap — no divider between them
              // (matches Figma: node 2499:18959, "rebuy-receipt-card").
              "flex flex-col gap-3 border-t pt-4 @5xl/renewal-banner:flex-1 @5xl/renewal-banner:border-t-0 @5xl/renewal-banner:border-l @5xl/renewal-banner:pt-0 @5xl/renewal-banner:pl-8",
              dividerBorderColor
            )}
          >
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {items.map((item, i) => (
                <li key={i} className={cn("flex items-center gap-1.5 text-sm", textColor)}>
                  <Check className={cn("size-4 shrink-0", mutedTextColor)} aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="flex w-full flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("text-2xl leading-tight font-semibold", textColor)}>{price}</span>
                {mrp && <span className={cn("text-sm line-through", mutedTextColor)}>{mrp}</span>}
                {badge && <div className="shrink-0">{badge}</div>}
              </div>
              <div className="shrink-0">{cta}</div>
            </div>
          </div>
        </div>
      </Alert>
    )
  }
)

RenewalBanner.displayName = "RenewalBanner"

export { RenewalBanner }
