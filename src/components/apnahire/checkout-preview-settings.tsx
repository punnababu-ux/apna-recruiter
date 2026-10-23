"use client"

/**
 * CheckoutPreviewSettings — the self-checkout page's floating gear
 * (bottom-left): the apna Unlimited tab's look (wordmark, or icon + label)
 * and the 10% exit offer's demo controls, the same section as express
 * checkout's JobPlanPreviewSwitcher.
 *
 * It used to flip the page between its logged-in and logged-out states too.
 * That's gone (user call, 2026-10-16): each state now has its real path —
 * logged out, the homepage's Pricing link (/pricing); logged in, Login →
 * the credits page (/apnahire/credits) — and a signed-in recruiter is never
 * shown the logged-out page.
 *
 * A *prototype* control, not product UI: remove once real offer rules are
 * wired up.
 */

import { useUnlimitedWordmark } from "@/components/apnahire/pricing-hero"
import { sampleSubscription, setJobSlots } from "@/hooks/use-job-slots"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { setJobCredits, usePlansIngress } from "@/hooks/use-plans-ingress"
import { replayTopUpCredits } from "@/components/apnahire/available-credits-button"
import {
  ExitOfferControls,
  PricingPhaseControls,
  PrototypeOption,
  PrototypeSection,
  PrototypeSettings,
} from "@/components/apnahire/prototype-settings"

export function CheckoutPreviewSettings({
  offer,
}: {
  offer: { claimed: boolean; onExpireSoon: () => void; onReset: () => void }
}) {
  const [wordmark, setWordmark] = useUnlimitedWordmark()
  const plans = usePlansIngress()
  const catalog = usePlans()
  // How the app's nav shows Plans (usePlansIngress): set the account state
  // behind each look, then open the app to see it.
  const setPlans = (credits: number, subscribed: boolean) => {
    setJobCredits(credits)
    // A subscription is its slots (setJobSlots keeps the flag in step).
    setJobSlots(sampleSubscription(subscribed ? "free" : "none", catalog.plan("monthly", catalog.slotCounts[1])))
  }
  return (
    <PrototypeSettings label="Preview settings">
      {/* Every pricing tab bar: desktop row, sticky bars, phone chips. */}
      <PrototypeSection title="apna Unlimited tab">
        <PrototypeOption active={wordmark} onClick={() => setWordmark(true)}>
          Wordmark
        </PrototypeOption>
        <PrototypeOption active={!wordmark} onClick={() => setWordmark(false)}>
          Icon + &ldquo;Unlimited&rdquo;
        </PrototypeOption>
      </PrototypeSection>
      <PrototypeSection title="Plans in the app's nav">
        <PrototypeOption active={plans === "promote"} onClick={() => {
            setPlans(0, false)
            // Show the top bar's ring-and-flip again on the next app page.
            replayTopUpCredits()
          }}>
          Low credits · highlighted
        </PrototypeOption>
        <PrototypeOption active={plans === "item"} onClick={() => setPlans(13, false)}>
          Just bought credits · plain
        </PrototypeOption>
        <PrototypeOption active={plans === "quiet"} onClick={() => setPlans(13, true)}>
          Subscribed · beside Support
        </PrototypeOption>
      </PrototypeSection>
      <PricingPhaseControls />
      <ExitOfferControls offer={offer} />
    </PrototypeSettings>
  )
}
