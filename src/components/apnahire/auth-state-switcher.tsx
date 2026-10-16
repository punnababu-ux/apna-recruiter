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

import { ExitOfferControls, PrototypeOption, PrototypeSection, PrototypeSettings } from "@/components/apnahire/prototype-settings"
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
  return (
    <PrototypeSettings label={`Preview settings · ${LABELS[current]}`}>
      <PrototypeSection title="Auth state">
        {STATES.map((state) => (
          <PrototypeOption key={state} href={ROUTES[state]} active={state === current}>
            {LABELS[state]}
          </PrototypeOption>
        ))}
      </PrototypeSection>
      {offer && <ExitOfferControls offer={offer} />}
    </PrototypeSettings>
  )
}
