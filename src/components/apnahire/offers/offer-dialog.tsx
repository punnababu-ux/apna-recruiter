"use client"

/**
 * OfferDialog — the shell every upsell and exit-loop pop-up shares
 * (Figma "Playful upsell popup": 2472:21302, 2525:34839, 2565:21021).
 *
 *   Header  a dark brand sweep with a 3D illustration, an eyebrow line and
 *           either a headline ("Order now to get 10% extra off") or a price
 *           drop ("₹1,399 /job → ₹1,099 /job", with the new price in gold)
 *   Body    white panel. Usually OfferChoice, the two option tiles.
 *
 * Tones:
 *   brand    the apna-green sweep (`bg-gradient-offer`): job bundles,
 *            credit packs and the exit nudge
 *   premium  a gold bloom on plum (`bg-gradient-offer-premium`), the
 *            Unlimited card and logo's colours, plus a "Special upgrade
 *            offer" tag: every subscription upgrade — the subscription
 *            upsell and the "All job slots are in use" slot upgrade, so the
 *            two read as one family
 * Both are dark: white text, the old price struck through in soft white,
 * the new price in gold.
 *
 * `headerFooter` adds a block under a divider at the header's foot (the
 * slot upgrade's plan on offer and its CTA).
 *
 * Responsive like the board's Mweb frames: a centred dialog from md, a
 * bottom sheet below it, with the same content in both. The close control
 * is the system CloseBubble that both primitives render outside the card,
 * not a button of this component's own.
 */

import * as React from "react"
import Image from "next/image"
import {
  ArrowRight,
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetTitle,
} from "@apna/design-system"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const ILLUSTRATIONS = {
  wallet: "/illustrations/offer-wallet.png",
  party: "/illustrations/offer-party-popper.png",
  briefcase: "/illustrations/offer-briefcase.png",
} as const

export interface OfferDialogProps {
  open: boolean
  /** Called with `false` for the close (X) button and Escape. */
  onOpenChange: (open: boolean) => void
  tone?: "brand" | "premium"
  illustration: keyof typeof ILLUSTRATIONS
  /** Corner ribbon on the header's top-right, e.g. "Special upgrade offer". */
  tag?: React.ReactNode
  eyebrow: string
  headline?: React.ReactNode
  priceDrop?: { from: string; to: string; unit: string }
  /** Under a divider at the header's foot. */
  headerFooter?: React.ReactNode
  /** "sm" the compact exit nudge, "md" the two-tile upsells, "lg" the slot
   *  upgrade's list of jobs (672px). */
  size?: "sm" | "md" | "lg"
  /** The 672px width of "lg" without its smaller header type — for a
   *  two-tile upsell whose CTAs need the room (the annual upgrade). */
  wide?: boolean
  children: React.ReactNode
}

export function OfferDialog({
  open,
  onOpenChange,
  tone = "brand",
  illustration,
  tag,
  eyebrow,
  headline,
  priceDrop,
  headerFooter,
  size = "md",
  wide = false,
  children,
}: OfferDialogProps) {
  const isMobile = useIsMobile()
  const Title = isMobile ? SheetTitle : DialogTitle
  // Both tones are dark headers; kept as a flag so a light tone can come
  // back without re-plumbing every colour below.
  const dark = true

  const body = (
    <>
      <div
        // Dark header: `emphasis` buttons in it render white (Button RULE).
        data-surface={dark ? "dark" : undefined}
        className={cn(
          // rounded-t: the bottom sheet can't clip (its close bubble sits
          // outside it), so the header rounds its own top corners.
          "relative flex flex-col gap-3 rounded-t-2xl border-b border-border px-5 pt-5 pb-6 sm:px-6 sm:pt-6 sm:pb-7",
          dark ? "border-transparent text-surface-inverted-fg" : "text-foreground",
          tone === "premium" ? "bg-gradient-offer-premium" : "bg-gradient-offer"
        )}
      >
        {/* Corner ribbon, the same shape and spot as the option tiles'
            "8 MONTHS FREE" ribbon: flush with the card's top-right corner (rounded
            to match it on the sheet, clipped by the dialog), out of the
            illustration row so long tag copy never pushes it around. */}
        {tag && (
          // Taller than a card ribbon (it sits in a 20px-padded header) and
          // rounded into the sheet's own top-right corner.
          <Badge
            variant={dark ? "on-dark" : "on-tint"}
            size="ribbon"
            className="absolute top-0 right-0 h-7 gap-1.5 rounded-tr-2xl px-3"
          >
            {tag}
          </Badge>
        )}
        <Image src={ILLUSTRATIONS[illustration]} alt="" width={56} height={56} className="size-14" />
        <Title
          className={cn(
            // "lg" (the slot upgrade) carries the most below it, so its
            // eyebrow steps down on phones to keep the sheet short.
            "font-body font-regular sm:text-xl",
            size === "lg" ? "text-base" : "text-lg",
            dark ? "text-surface-inverted-fg" : "text-muted-foreground"
          )}
        >
          {eyebrow}
        </Title>
        {headline && (
          <p className={cn("text-2xl font-semibold", size === "md" && "sm:text-3xl")}>{headline}</p>
        )}
        {priceDrop && (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {/* The old price is struck through so the saving reads at a
                glance. */}
            <span className={cn("flex items-baseline gap-1.5", dark ? "text-surface-inverted-fg/70" : "text-muted-foreground")}>
              <span className="text-2xl font-semibold line-through decoration-1 sm:text-3xl">
                {priceDrop.from}
              </span>
              <span className="text-sm sm:text-base">{priceDrop.unit}</span>
            </span>
            <ArrowRight className={cn("size-6", dark ? "text-surface-inverted-fg/70" : "text-muted-foreground")} aria-label="now" />
            <span className={cn("flex items-baseline gap-1.5", dark ? "text-highlight" : "text-checkout-primary")}>
              <span className="text-3xl font-bold sm:text-4xl">{priceDrop.to}</span>
              <span className="text-sm sm:text-base">{priceDrop.unit}</span>
            </span>
          </p>
        )}
        {headerFooter && (
          <div className="flex flex-col gap-4 border-t border-surface-inverted-fg/15 pt-4">{headerFooter}</div>
        )}
      </div>
      {/* The frame is transparent (no white hairline peeking above the
          header at its edge and corners); the body paints its own white. */}
      <div className="bg-card p-4 sm:p-6">{children}</div>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="gap-0 rounded-t-2xl data-[side=bottom]:border-t-0 bg-transparent p-0"
        >
          {/* The sheet is capped below the viewport (so its close bubble
              stays on screen) and can't clip; the content scrolls in here
              instead when a short phone or a long job list needs it. */}
          <div className="min-h-0 overflow-y-auto overscroll-contain rounded-t-2xl bg-card pb-safe">{body}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("gap-0 overflow-hidden rounded-2xl bg-transparent p-0 shadow-dialog ring-0 data-open:slide-in-from-bottom-16 data-closed:slide-out-to-bottom-16 data-open:zoom-in-100 data-closed:zoom-out-100 duration-sheet ease-carousel", size === "sm" ? "sm:max-w-md" : size === "lg" || wide ? "sm:max-w-2xl" : "sm:max-w-xl")}
      >
        {body}
      </DialogContent>
    </Dialog>
  )
}
