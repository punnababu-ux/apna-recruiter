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
import {
  ExitOfferControls,
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
  return (
    <PrototypeSettings label="Preview settings">
      {/* Every pricing tab bar: desktop row, sticky bars, phone chips. */}
      <PrototypeSection title="apna Unlimited tab">
        <PrototypeOption active={wordmark} onClick={() => setWordmark(true)}>
          Wordmark
        </PrototypeOption>
        <PrototypeOption active={!wordmark} onClick={() => setWordmark(false)}>
          Icon + &ldquo;apna Unlimited&rdquo;
        </PrototypeOption>
      </PrototypeSection>
      <ExitOfferControls offer={offer} />
    </PrototypeSettings>
  )
}
