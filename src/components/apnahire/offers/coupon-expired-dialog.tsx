"use client"

/**
 * CouponExpiredDialog — shown at checkout when the claimed 10% offer runs
 * out while the order summary is open (Figma 2525:25446, Mweb 2525:25517).
 * A centred dialog from md and a bottom sheet below it, matching the offer
 * pop-ups.
 */

import * as React from "react"
import {
  Button,
  CircleAlert,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@apna/design-system"
import { useIsMobile } from "@/hooks/use-mobile"

export function CouponExpiredDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const isMobile = useIsMobile()
  const Title = isMobile ? SheetTitle : DialogTitle
  const Description = isMobile ? SheetDescription : DialogDescription

  const body = (
    <div className="flex flex-col items-center gap-8 p-6 text-center">
      <div className="flex flex-col items-center gap-5">
        <span className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-destructive-subtle text-destructive">
          <CircleAlert className="size-7" aria-hidden />
        </span>
        <div className="flex flex-col gap-2">
          <Title className="text-xl font-semibold text-foreground">Coupon expired</Title>
          <Description className="text-sm text-foreground">
            This coupon has expired and is no longer valid
          </Description>
        </div>
      </div>
      <Button type="button" variant="checkout" size="lg" className="w-full" onClick={onClose}>
        Okay, got it
      </Button>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
        <SheetContent side="bottom" className="gap-0 rounded-t-2xl data-[side=bottom]:border-t-0 p-0 pb-safe">
          {body}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="gap-0 rounded-2xl p-0 sm:max-w-md">{body}</DialogContent>
    </Dialog>
  )
}
