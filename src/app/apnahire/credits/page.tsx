/**
 * /apnahire/credits — self-checkout in its logged-in state, reached from
 * the dashboard. The public (logged-out) twin lives at /apnahire/pricing;
 * both render the same `SelfCheckout` body so they can't drift.
 */

import { SelfCheckout } from "@/components/apnahire/self-checkout"

export default function CreditsPage() {
  return <SelfCheckout authState="logged-in" />
}
