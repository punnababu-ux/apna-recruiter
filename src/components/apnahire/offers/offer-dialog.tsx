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
 *   brand    light ambient mesh (`bg-gradient-offer`), the checkout page's
 *            own voice: dark text, the new price in checkout green. Job
 *            bundles and the exit nudge.
 *   premium  the Unlimited card's plum (`bg-gradient-checkout-unlimited`),
 *            white text, gold price, "Special upgrade offer" tag:
 *            subscription upgrades, so they match the card they upsell
 *
 * Responsive like the board's Mweb frames: a centred dialog from md, a
 * bottom sheet below it, with the same content in both.
 */

import * as React from "react"
import Image from "next/image"
import {
  ArrowRight,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetTitle,
  X,
} from "@apna/design-system"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const ILLUSTRATIONS = {
  wallet: "/illustrations/offer-wallet.png",
  party: "/illustrations/offer-party-popper.png",
} as const

export interface OfferDialogProps {
  open: boolean
  /** Called with `false` for the close (X) button and Escape. */
  onOpenChange: (open: boolean) => void
  tone?: "brand" | "premium"
  illustration: keyof typeof ILLUSTRATIONS
  /** Top-right pill in the header, e.g. "Special upgrade offer". */
  tag?: React.ReactNode
  eyebrow: string
  headline?: string
  priceDrop?: { from: string; to: string; unit: string }
  /** "sm" for the compact exit nudge, "md" for the two-tile upsells. */
  size?: "sm" | "md"
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
  size = "md",
  children,
}: OfferDialogProps) {
  const isMobile = useIsMobile()
  const Title = isMobile ? SheetTitle : DialogTitle
  const dark = tone === "premium"

  const body = (
    <>
      <div
        className={cn(
          "flex flex-col gap-3 border-b border-border px-5 pt-5 pb-6 sm:px-6 sm:pt-6 sm:pb-7",
          dark
            ? "border-transparent bg-gradient-checkout-unlimited text-surface-inverted-fg"
            : "bg-gradient-offer text-foreground"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <Image src={ILLUSTRATIONS[illustration]} alt="" width={56} height={56} className="size-14" />
          <div className="flex items-center gap-2">
            {tag && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm",
                  dark ? "bg-surface-inverted-fg/10" : "bg-card/70"
                )}
              >
                {tag}
              </span>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className={cn(
                dark
                  ? "text-surface-inverted-fg hover:bg-surface-inverted-fg/10 hover:text-surface-inverted-fg"
                  : "text-muted-foreground hover:bg-card/70 hover:text-foreground"
              )}
            >
              <X />
            </Button>
          </div>
        </div>
        <Title
          className={cn(
            "font-body text-lg font-regular sm:text-xl",
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
            {/* The old price is struck through on the light tone so the
                saving reads at a glance; on plum it stays white. */}
            <span className={cn("flex items-baseline gap-1.5", !dark && "text-muted-foreground")}>
              <span className={cn("text-2xl font-semibold sm:text-3xl", !dark && "line-through decoration-1")}>
                {priceDrop.from}
              </span>
              <span className="text-sm sm:text-base">{priceDrop.unit}</span>
            </span>
            <ArrowRight className={cn("size-6", !dark && "text-muted-foreground")} aria-label="now" />
            <span className={cn("flex items-baseline gap-1.5", dark ? "text-highlight" : "text-checkout-primary")}>
              <span className="text-3xl font-bold sm:text-4xl">{priceDrop.to}</span>
              <span className="text-sm sm:text-base">{priceDrop.unit}</span>
            </span>
          </p>
        )}
      </div>
      <div className="bg-card p-4 sm:p-6">{children}</div>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="gap-0 overflow-hidden rounded-t-2xl border-t-0 p-0 pb-safe"
        >
          {body}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn("gap-0 overflow-hidden rounded-2xl p-0 shadow-dialog", size === "sm" ? "sm:max-w-md" : "sm:max-w-xl")}
      >
        {body}
      </DialogContent>
    </Dialog>
  )
}
