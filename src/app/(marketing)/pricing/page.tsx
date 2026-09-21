/**
 * /pricing — self-checkout in its logged-out state: apna's public pricing
 * page. Same body as the logged-in /apnahire/credits; this route sits under
 * the `(marketing)` group so it gets SiteHeader/SiteFooter for free instead
 * of drawing its own. Figma: 881:11579.
 */

import type { Metadata } from "next"
import { SelfCheckout } from "@/components/apnahire/self-checkout"

// A short, literal title — the root layout's "%s · apna for employers"
// template supplies the suffix.
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Job credits, database credits, Unlimited subscriptions and enterprise plans — everything you need to hire on apna.",
}

export default function PricingPage() {
  return <SelfCheckout authState="logged-out" />
}
