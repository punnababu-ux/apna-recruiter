"use client"

/**
 * AuthStateSwitcher — floating bottom-left control for flipping the
 * self-checkout surface between its logged-in and logged-out states, the
 * same affordance the source prototype uses (self-checkout-five.vercel.app).
 *
 * This is a *prototype* control, not product UI: in a real app the auth
 * state comes from the session, and this component simply wouldn't be
 * mounted. It exists so the two Figma states can be compared side by side
 * without editing code or hand-typing URLs.
 */

import * as React from "react"
import Link from "next/link"
import { Settings } from "@apna/design-system"
import { cn } from "@/lib/utils"
import type { CheckoutAuthState } from "@/components/apnahire/self-checkout"

const ROUTES: Record<CheckoutAuthState, string> = {
  "logged-in": "/apnahire/credits",
  "logged-out": "/apnahire/pricing",
}

const LABELS: Record<CheckoutAuthState, string> = {
  "logged-in": "Logged in",
  "logged-out": "Logged out",
}

const STATES: CheckoutAuthState[] = ["logged-in", "logged-out"]

export function AuthStateSwitcher({ current }: { current: CheckoutAuthState }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 print:hidden">
      {open && (
        <div
          role="group"
          aria-label="Preview auth state"
          className="flex flex-col gap-1 rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          {STATES.map((state) => (
            <Link
              key={state}
              href={ROUTES[state]}
              aria-current={state === current ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                state === current
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {LABELS[state]}
            </Link>
          ))}
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
