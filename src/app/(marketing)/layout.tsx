/**
 * (marketing) — the public site shell.
 *
 * Header, footer and the page canvas, for every employer-facing marketing
 * page. The route group keeps the segment out of URLs, so `/`, `/about` and
 * `/pricing` are exactly that.
 *
 * The canvas is the same ambient-mesh gradient the self-checkout pages use.
 * That is deliberate: the pricing page is a marketing page that happens to
 * take payment, and having it sit on a different background from the homepage
 * is how a site starts to feel like two sites.
 *
 * Pages paint their own bands on top with `<Section tone="card">` etc.; where
 * a band is transparent, this gradient shows through.
 */

import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-checkout-hero flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-band">
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
