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

import { ContactSection } from "@/components/marketing/contact-section"
import { SettleIn } from "@/components/marketing/settle-in"
import { HeaderSlotProvider } from "@/components/marketing/header-slot"
import { MotherPreview } from "@/components/marketing/mother-preview"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Provides the seam a page uses to publish a secondary bar (the pricing
    // tab switcher) up into SiteHeader — see header-slot.tsx. Wraps SiteHeader
    // too, since SiteHeader is the thing reading the published value.
    <HeaderSlotProvider>
      {/* The canvas: the homepage's mesh gradient, or a product page's own
          re-tint of it (semantic.css, [data-slot=marketing-canvas]). */}
      {/* text-foreground: the canvas sets its own text colour, so a dark
          context on it resolves to dark-theme text, not the body's. */}
      <div data-slot="marketing-canvas" data-voice="editorial" className="flex min-h-dvh flex-col text-foreground">
        <MotherPreview />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        {/* The one contact band, the same on every marketing page, sitting
            with the footer on the canvas (every "Contact us" lands here). */}
        {/* Skipped on a page that brings its own closing card (ClosingBand). */}
        {/* The page's foot (contact band + footer) is one gradient band. */}
        {/* The contact card and the footer's columns settle into place as
            you reach them (SettleIn), each on its own cue. */}
        <div data-slot="marketing-foot">
          <SettleIn className="[[data-slot=marketing-canvas]:has([data-closing-band])_&]:hidden">
            <ContactSection />
          </SettleIn>
          <div className="px-4 sm:px-8 lg:px-12">
            <SettleIn className="mx-auto max-w-band">
              <SiteFooter />
            </SettleIn>
          </div>
        </div>
      </div>
    </HeaderSlotProvider>
  )
}
