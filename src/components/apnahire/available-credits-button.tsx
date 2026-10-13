"use client"

/**
 * AvailableCreditsButton — the "Available credits" action in every checkout
 * / job-posting top bar. One component so it can't drift between flows: the
 * same small outline button as the wizard's "Save & exit", with its own
 * fill, so it reads as a button on the self-checkout gradient instead of a
 * border-less label floating on it.
 */

import { Button, Wallet } from "@apna/design-system"

export function AvailableCreditsButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick}>
      <Wallet className="size-4" aria-hidden />
      Available credits
    </Button>
  )
}
