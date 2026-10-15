"use client"

/**
 * AuthStateSwitcher — floating bottom-left control for flipping the
 * self-checkout surface between its logged-in and logged-out states, the
 * same affordance the source prototype uses (self-checkout-five.vercel.app).
 *
 * This is a *prototype* control, not product UI: in a real app the auth
 * state comes from the session, and this component simply wouldn't be
 * mounted. It exists so the two Figma states can be compared side by side
 * without editing code or hand-typing URLs. It also carries the 10% exit
 * offer's demo controls, the same section as express checkout's
 * JobPlanPreviewSwitcher.
 */

import * as React from "react"
import Link from "next/link"
import { Settings } from "@apna/design-system"
import { cn } from "@/lib/utils"
import type { CheckoutAuthState } from "@/components/apnahire/self-checkout"

const ROUTES: Record<CheckoutAuthState, string> = {
  "logged-in": "/apnahire/credits",
  "logged-out": "/pricing",
}

const LABELS: Record<CheckoutAuthState, string> = {
  "logged-in": "Logged in",
  "logged-out": "Logged out",
}

const STATES: CheckoutAuthState[] = ["logged-in", "logged-out"]

export function AuthStateSwitcher({
  current,
  offer,
}: {
  current: CheckoutAuthState
  /** 10% exit-offer demo controls. Omit to hide the section. */
  offer?: { claimed: boolean; onExpireSoon: () => void; onReset: () => void }
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 print:hidden">
      {open && (
        <div
          role="group"
          aria-label="Preview settings"
          className="flex w-64 flex-col gap-3 rounded-xl border border-border bg-popover p-3 shadow-lg"
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-muted-foreground">Auth state</p>
            {STATES.map((state) => (
              <Link
                key={state}
                href={ROUTES[state]}
                aria-current={state === current ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-left text-sm font-medium whitespace-nowrap transition-colors",
                  state === current
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {LABELS[state]}
              </Link>
            ))}
          </div>

          {offer && (
            <div className="flex flex-col gap-1 border-t border-border pt-2">
              <p className="text-xs font-semibold text-muted-foreground">
                10% exit offer · {offer.claimed ? "claimed" : "not claimed"}
              </p>
              <button
                type="button"
                disabled={!offer.claimed}
                onClick={offer.onExpireSoon}
                className="rounded-lg px-3 py-1.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                Expire in 5 seconds
              </button>
              <button
                type="button"
                onClick={offer.onReset}
                className="rounded-lg px-3 py-1.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Reset offer and exit nudge
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Preview auth state: ${LABELS[current]}`}
        className="flex size-10 items-center justify-center rounded-full border border-border bg-popover text-muted-foreground shadow-lg transition-colors hover:text-foreground"
      >
        <Settings className="size-5" aria-hidden />
      </button>
    </div>
  )
}
