"use client"

/**
 * PrototypeSettings — the floating gear (bottom-left) that opens the
 * prototype's review controls: states with no real data source yet (auth
 * state, plan layout, credit balance) and the exit offer's demo buttons.
 * One shell for every page that has such controls, so they look and behave
 * the same; remove a page's controls once real data drives that state.
 *
 *   <PrototypeSettings label="Preview settings">
 *     <PrototypeSection title="Auth state">
 *       <PrototypeOption active href="/apnahire/credits">Logged in</PrototypeOption>
 *     </PrototypeSection>
 *     <ExitOfferControls offer={offer} />
 *   </PrototypeSettings>
 *
 * Composition only: Popover and Button from the design system.
 */

import * as React from "react"
import Link from "next/link"
import { Button, Popover, PopoverContent, PopoverTrigger, Settings } from "@apna/design-system"

export function PrototypeSettings({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="fixed bottom-6 left-6 z-overlay print:hidden">
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon-lg" className="rounded-full shadow-popover" aria-label={label}>
              <Settings className="size-5" aria-hidden />
            </Button>
          }
        />
        <PopoverContent side="top" align="start" aria-label={label} className="flex w-64 flex-col gap-2 divide-y divide-border p-3">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function PrototypeSection({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 pb-2 last:pb-0">
      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}

/** One choice or action: a button, or a link when it changes the route. */
export function PrototypeOption({
  active = false,
  href,
  onClick,
  disabled,
  children,
}: {
  active?: boolean
  href?: string
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      className="justify-start text-sm font-medium"
      aria-current={active ? "true" : undefined}
      disabled={disabled}
      onClick={onClick}
      nativeButton={!href}
      render={href ? <Link href={href} /> : undefined}
    >
      {children}
    </Button>
  )
}

/** The 10% exit offer's demo controls, shared by every checkout page. */
export function ExitOfferControls({
  offer,
}: {
  offer: { claimed: boolean; onExpireSoon: () => void; onReset: () => void }
}) {
  return (
    <PrototypeSection title={`10% exit offer · ${offer.claimed ? "claimed" : "not claimed"}`}>
      <PrototypeOption disabled={!offer.claimed} onClick={offer.onExpireSoon}>
        Expire in 5 seconds
      </PrototypeOption>
      <PrototypeOption onClick={offer.onReset}>Reset offer and exit nudge</PrototypeOption>
    </PrototypeSection>
  )
}
