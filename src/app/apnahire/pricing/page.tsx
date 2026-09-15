/**
 * /apnahire/pricing — self-checkout in its logged-out state: apna's public
 * pricing page. Same body as the logged-in /apnahire/credits, wearing the
 * marketing nav + footer instead of the product chrome. Figma: 881:11579.
 */

import { SelfCheckout } from "@/components/apnahire/self-checkout"

export const metadata = {
  title: "Pricing | apna for employers",
  description:
    "Job credits, database credits, Unlimited subscriptions and enterprise plans — everything you need to hire on apna.",
}

export default function PricingPage() {
  return <SelfCheckout authState="logged-out" />
}
