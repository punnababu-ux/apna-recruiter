"use client"

/**
 * Product › Surfaces — the glass surfaces (white and dark) and the plan
 * card that sits in them, live on the checkout gradient, with the rules for
 * which surface goes where.
 */

import * as React from "react"
import { Badge, Button, Card, ClockFading, PricingCard } from "@apna/design-system"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../showcase-blocks"

/** A plan card exactly as the Jobs tab draws it: solid plan-card fill,
 *  transparent border, no resting shadow. */
function PlanCard({ recommended = false, credits, price, mrp, off, perCredit, days }: {
  recommended?: boolean
  credits: number
  price: string
  mrp: string
  off: string
  perCredit: string
  days: number
}) {
  return (
    <PricingCard
      className="flex-1 border-transparent bg-plan-card"
      onClick={() => {}}
      ribbon={
        recommended ? (
          <Badge variant="ribbon" size="ribbon">
            Recommended
          </Badge>
        ) : undefined
      }
      title={`${credits} Job credits`}
      meta={
        <>
          <ClockFading aria-hidden /> Valid for {days} days
        </>
      }
      price={price}
      mrp={mrp}
      badge={<Badge variant="discount">{off}</Badge>}
      priceSuffix={perCredit}
      cta={
        <Button variant={recommended ? "checkout" : "outline"} className="h-10 w-full font-semibold">
          Buy now
        </Button>
      }
    />
  )
}

/** The checkout page's own gradient, so the glass has something to show. */
function Canvas({ children }: { children: React.ReactNode }) {
  return <div className="bg-gradient-checkout-hero flex flex-col gap-6 rounded-card-nested p-4 sm:p-8">{children}</div>
}

export default function SurfacesPage() {
  return (
    <ShowcasePage
      category="Product"
      title="Surfaces · glass and plan cards"
      description="Two glass surfaces, white and dark, and the solid plan card. Glass only makes sense over a gradient: the gradient is what shows through. Pick the surface by what sits on it, never by eye."
    >
      <ShowcaseEntry
        title="Dark glass · the panel that holds plan cards"
        component="surface-glass-dark"
        where="Job credits panel (Jobs tab), Database and Subscription panels, the pricing tab bar, the % OFF pill (--checkout-discount-bg)"
      >
        <Canvas>
          <div className="surface-glass-dark flex flex-col gap-4 rounded-card p-4">
            <p className="text-sm font-semibold text-checkout-hero-fg">Job credits</p>
            <div className="grid gap-4 md:grid-cols-3">
              <PlanCard credits={3} price="₹1,949" mrp="₹2,499" off="22% OFF" perCredit="₹650 /credit" days={30} />
              <PlanCard recommended credits={6} price="₹3,649" mrp="₹4,194" off="13% OFF" perCredit="₹608 /credit" days={90} />
              <PlanCard credits={13} price="₹7,099" mrp="₹8,999" off="21% OFF" perCredit="₹546 /credit" days={180} />
            </div>
          </div>
        </Canvas>
        <RuleList
          rules={[
            "A smoked pane (8% black, blurred, hairline light edge) that groups white plan cards. It's a recess, not a card.",
            "Only on a gradient (the checkout hero). On a white page it reads as a gray box: use the muted fill instead.",
            "Holds plan cards and the tab bar. Never text-only content, never another glass panel.",
            "Change its tone through --surface-glass-dark in semantic.css, never per page.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Plan card · solid, borderless"
        component="PricingCard + bg-plan-card border-transparent"
        where="Every plan and pricing card: job credits, Database, apna Unlimited, Enterprise, both checkouts"
      >
        <RuleList
          rules={[
            "Solid white (bg-plan-card), transparent border so sizes don't shift. Never glass, never a gray outline.",
            "No shadow at rest. A clickable card lifts on hover (card-hover-lift) onto shadow-elevated.",
            "On a selectable phone row, only the selected card gets a border, and it's green.",
            "Corner: rounded-card-nested inside a panel, rounded-card when it sits on the page.",
            "In a row, prices, notes and CTAs sit level (data-compare + scripts/check-alignment.js).",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="White glass · cards on a gradient"
        component="surface-frosted · bg-surface-glass backdrop-blur-xl"
        where="Marketing cards on gradient bands, the homepage login card, the nav pill and docked header"
      >
        <Canvas>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="surface-frosted" padding="lg">
              <p className="text-base font-semibold text-foreground">surface-frosted</p>
              <p className="text-sm text-muted-foreground">Cards in a grid or list on a gradient band.</p>
            </Card>
            <div className="flex flex-col gap-1 rounded-card bg-surface-glass p-6 backdrop-blur-xl">
              <p className="text-base font-semibold text-foreground">bg-surface-glass backdrop-blur-xl</p>
              <p className="text-sm text-muted-foreground">A hand-rolled surface (header pill, login card).</p>
            </div>
          </div>
        </Canvas>
        <RuleList
          rules={[
            "Card at 80% plus a blur (--surface-glass). On marketing pages a plain Card turns glass by itself.",
            "On a white band it would vanish: surface-frosted switches to the muted fill there automatically.",
            "Not glass: plan and pricing cards, small tiles inside illustrations, buttons and chips.",
            "Never hand-mix bg-card/70 backdrop-blur-*. Use the utility.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Feature and band surfaces · marketing"
        component="surface-feature · surface-band"
        where="surface-feature: the one standout card of a band (lead story, Enterprise playbook). surface-band: the closing contact band only."
      >
        <RuleList
          rules={[
            "surface-feature: frosted on a gradient band; on a white band it takes the mother gradient instead.",
            "surface-band: only the closing \"Your next hire could apply today.\" band, the same on every page.",
            "One standout card per band. Everything else in the band is surface-frosted.",
          ]}
        />
      </ShowcaseEntry>
    </ShowcasePage>
  )
}
