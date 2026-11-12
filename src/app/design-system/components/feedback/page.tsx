"use client"

import Image from "next/image"
import * as React from "react"
import {
  Bell,
  MoreHorizontal, AlertBanner, OfferBar, OfferBarAccent, Meter, Button, Badge, Switch, Label } from "@apna/design-system"
import { toast } from "sonner"
import { AlertCircle, Info, CreditCard, ChevronRight, Sparkles } from "@apna/design-system"
import { cn } from "@/lib/utils"

export default function FeedbackComponentsPage() {
  const [showIcon, setShowIcon] = React.useState(true)
  const [showCTA, setShowCTA] = React.useState(true)
  const [showClose, setShowClose] = React.useState(true)
  const [appearance, setAppearance] = React.useState<"primary" | "secondary">("secondary")

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="destructive">Category 6</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          6. Feedback & Status Banners
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Static alert banners and transient toast notifications.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Alert, AlertBanner, toast } from "@apna/design-system"'}</code>
      </div>

      {/* Configurable Alert Banner */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground font-heading">
              Configurable Alert Banner
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-prose">
              AlertBanner&apos;s appearance=&quot;primary&quot; | &quot;secondary&quot; system: the toggles below drive every banner in this card.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="toggle-appearance" checked={appearance === "primary"} onCheckedChange={(c) => setAppearance(c ? "primary" : "secondary")} />
              <Label htmlFor="toggle-appearance">Primary Style</Label>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Switch id="toggle-icon" checked={showIcon} onCheckedChange={setShowIcon} />
              <Label htmlFor="toggle-icon">Icon</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="toggle-cta" checked={showCTA} onCheckedChange={setShowCTA} />
              <Label htmlFor="toggle-cta">CTA Link</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="toggle-close" checked={showClose} onCheckedChange={setShowClose} />
              <Label htmlFor="toggle-close">Close Button</Label>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 bg-background space-y-4">
          <AlertBanner
            variant="info"
            appearance={appearance}
            icon={showIcon ? <Info /> : undefined}
            title="Information: Your candidate credits will renew at the beginning of next month."
            action={showCTA ? { label: <span className="flex items-center">View details <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          <AlertBanner
            variant="warning"
            appearance={appearance}
            icon={showIcon ? <CreditCard /> : undefined}
            title="Alert: Plan expires in 7 days, auto-payment is disabled."
            action={showCTA ? { label: <span className="flex items-center">Enable now <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          <AlertBanner
            variant="destructive"
            appearance={appearance}
            icon={showIcon ? <AlertCircle /> : undefined}
            title="Warning: Job posting expired due to missing budget authorization."
            action={showCTA ? { label: <span className="flex items-center">Renew posting <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          <AlertBanner
            variant="success"
            appearance={appearance}
            icon={showIcon ? <Info /> : undefined}
            title="Positive: Candidate status updated successfully."
            action={showCTA ? { label: <span className="flex items-center">View candidate <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          {/* muted: a neutral note inside a form step. */}
          <AlertBanner
            variant="muted"
            appearance={appearance}
            icon={showIcon ? <Info /> : undefined}
            title="Note: a neutral message that needs no action."
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          <AlertBanner
            variant="success"
            appearance={appearance}
            icon={
              showIcon ? (
                <Badge
                  size="lg"
                  variant="outline"
                  className={cn(
                    "bg-transparent font-bold",
                    appearance === "primary" ? "border-white/40 text-white" : "border-success/30 text-success-subtle-foreground"
                  )}
                >
                  <Sparkles /> Special offer for you
                </Badge>
              ) : undefined
            }
            title={
              <span
                className={cn(
                  "text-base font-bold",
                  // Tied to the banner's own appearance, not the app theme:
                  // yellow on the solid gradient, black/foreground on the
                  // subtle tint. Known caveat — on the light-theme gradient
                  // (green-500->700) gold only clears ~2.1-2.8:1 contrast,
                  // below the 3:1 floor even for large bold text; it only
                  // passes comfortably (~4.6-5.5:1) once the gradient is the
                  // darker green-700->900 dark-theme pairing.
                  appearance === "primary" ? "text-highlight" : "text-foreground"
                )}
              >
                Upgrade to the annual plan at the price of 4 months!
              </span>
            }
            cta={showCTA ? <Button variant="secondary" size="sm">Upgrade @ ₹9,999 /year</Button> : undefined}
          />

        </div>
      </div>

      {/* OfferBar: the one rebuy / upgrade / credit banner (2026-11-12) */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="border-b border-border/60 pb-2 text-h6 text-foreground">Offer bar</h2>
        <p className="text-sm text-muted-foreground">
          One banner for every rebuy, upgrade and credit nudge. surface follows the pop-up the CTA opens (subscription,
          credits, urgent, festive); tone colours the badge dot. Time goes between price and CTA, never in the badge.
          Every case: /apnahire/banners.
        </p>
        <OfferBar
          art={<Image src="/images/company/values/annual.png" alt="" width={96} height={96} unoptimized />}
          badge="Plan ends in 5 days"
          headline={<>Hire all year for just <OfferBarAccent>₹787/month</OfferBarAccent></>}
          sub="1 live job for 365 days · 2,400 database credits"
          price={{ amount: "₹9,443", strike: "₹11,110" }}
          deadline="Limited time offer"
          cta={<Button variant="emphasis">Upgrade to annual</Button>}
        />
        <OfferBar
          surface="credits"
          tone="warning"
          art={<Image src="/images/company/values/wallet.png" alt="" width={96} height={96} unoptimized />}
          badge="1 job credit left"
          headline={<>Get 6 job credits at <OfferBarAccent>₹608 each</OfferBarAccent></>}
          sub="Valid for 90 days"
          price={{ amount: "₹3,649", strike: "₹4,306" }}
          cta={<Button variant="emphasis">Buy 6 credits</Button>}
        />
        <OfferBar
          surface="urgent"
          tone="urgent"
          art={<Image src="/images/company/values/wallet.png" alt="" width={96} height={96} unoptimized />}
          badge="0 job credits left"
          headline={<>Get 6 job credits at <OfferBarAccent>₹608 each</OfferBarAccent></>}
          sub="Valid for 90 days"
          price={{ amount: "₹3,649", strike: "₹4,306" }}
          cta={<Button variant="emphasis">Buy 6 credits</Button>}
        />
        <OfferBar
          surface="festive"
          art={<Image src="/images/company/values/exit-offer.png" alt="" width={96} height={96} unoptimized />}
          badge="Hiring Utsav"
          headline={<>22 job credits at just <OfferBarAccent>₹455 each</OfferBarAccent></>}
          sub="Valid for 365 days"
          price={{ amount: "₹9,999", strike: "₹15,383" }}
          deadline="Limited time offer"
          cta={<Button variant="emphasis">Buy job credits</Button>}
        />
        <OfferBar
          tone="renew"
          art={<Image src="/images/company/values/expired.png" alt="" width={96} height={96} unoptimized />}
          badge="Your plan ended"
          headline={<>Renew at your <OfferBarAccent>old price</OfferBarAccent></>}
          sub="1 live job for 30 days · 200 database credits"
          price={{ amount: "₹2,249", strike: "₹2,499" }}
          cta={<Button variant="emphasis">Renew plan</Button>}
        />
        <OfferBar
          art={<Image src="/images/company/values/alert.png" alt="" width={96} height={96} unoptimized />}
          badge="Auto-pay is off"
          headline="Keep hiring without a break"
          sub="Your plan ends in 9 days"
          cta={<Button variant="emphasis">Turn on auto-pay</Button>}
        />
      </div>

      {/* Count / attention badges */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="border-b border-border/60 pb-2 text-h6 text-foreground">Unread count &amp; attention dot</h2>
        <div className="flex items-center gap-8">
          <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-border">
            <Bell className="size-5" aria-hidden />
            <Badge variant="count" size="count" className="absolute -top-1.5 -right-1.5 ring-2 ring-card">3</Badge>
          </span>
          <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-border">
            <MoreHorizontal className="size-5" aria-hidden />
            <Badge variant="count" size="dot" className="absolute top-0.5 right-0.5 ring-2 ring-card" />
          </span>
          <span className="text-xs text-muted-foreground">{'variant="count" with size="count" or size="dot"; ring it in the surface beneath.'}</span>
        </div>
      </div>

      {/* Sonner Toasts */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Transient Toast Notifications
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Candidate status updated successfully!")}
          >
            Trigger Success Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.error("Failed to connect to candidate database.")}
          >
            Trigger Error Toast
          </Button>
        </div>
      </div>

      {/* Meter */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6">
          <h2 className="text-base font-semibold text-foreground font-heading">Meter</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-prose">
            A quiet usage bar: slots in use, credits left, days left in a cycle. The caller decides when a reading is low.
          </p>
        </div>
        <div className="flex flex-col gap-6 bg-background p-4 sm:p-6">
          <Meter label="Days left in this cycle" size="lg" value={18} max={30} />
          <Meter label="Jobs live" value={1} max={2} />
          <Meter label="Database credits left" value={40} max={500} tone="warning" />
          <Meter label="Database credits left" value={0} max={500} tone="destructive" />
        </div>
      </div>
    </div>
  )
}
