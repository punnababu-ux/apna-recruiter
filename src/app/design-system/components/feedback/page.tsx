"use client"

import * as React from "react"
import {
  Bell,
  MoreHorizontal, AlertBanner, RenewalBanner, Button, Badge, Switch, Label } from "@apna/design-system"
import { toast } from "sonner"
import { AlertCircle, Info, CreditCard, ChevronRight, RefreshCw, Sparkles, InfinityIcon, ArrowUp, Clock } from "@apna/design-system"
import { cn } from "@/lib/utils"

// Badge's translucent tones: `on-tint` softly darkens a light tint card (and
// lightens a dark one, as foreground flips), `on-dark` lightens a solid or
// gradient surface, instead of either sitting on it as an opaque block.
function DiscountBadge({
  appearance,
  children = "22% OFF",
}: {
  appearance: "primary" | "secondary"
  children?: React.ReactNode
}) {
  return appearance === "primary" ? (
    <Badge variant="on-dark">
      {children}
    </Badge>
  ) : (
    <Badge variant="on-tint">
      {children}
    </Badge>
  )
}

// Same translucent-overlay logic as DiscountBadge, in the ribbon's corner shape.
function RibbonBadge({
  appearance,
  children,
}: {
  appearance: "primary" | "secondary"
  children: React.ReactNode
}) {
  return appearance === "primary" ? (
    <Badge size="ribbon" variant="on-dark">
      {children}
    </Badge>
  ) : (
    <Badge size="ribbon" variant="on-tint">
      {children}
    </Badge>
  )
}

export default function FeedbackComponentsPage() {
  const [showIcon, setShowIcon] = React.useState(true)
  const [showCTA, setShowCTA] = React.useState(true)
  const [stackItems, setStackItems] = React.useState(true)
  const [premiumSurface, setPremiumSurface] = React.useState(false)
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
              AlertBanner and RenewalBanner share one appearance=&quot;primary&quot; | &quot;secondary&quot; system
              — the toggles below drive every banner in this card, RenewalBanner included.
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
                    appearance === "primary" ? "border-white/40 text-white" : "border-success/30 text-success"
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
                Upgrade to 12 months at the price of 4!
              </span>
            }
            cta={showCTA ? <Button variant="secondary" size="sm">Upgrade @ ₹9,999/yr</Button> : undefined}
          />

          <RenewalBanner
            variant="destructive"
            appearance={appearance}
            icon={showIcon ? <RefreshCw /> : undefined}
            title="0 job credits remaining."
            subtitle="Renew now! Same discount applied!"
            items={[{ label: "6 Job credits" }, { label: "90 days validity" }]}
            price="₹3,649"
            mrp="₹4,306"
            badge={<DiscountBadge appearance={appearance} />}
            cta={<Button variant="secondary" trailingIcon={<ChevronRight />}>Renew now</Button>}
          />

          <RenewalBanner
            variant="warning"
            appearance={appearance}
            icon={showIcon ? <RefreshCw /> : undefined}
            title="Just 1 job credit remaining."
            subtitle="Renew now - same price as before!"
            items={[{ label: "6 Job credits" }, { label: "90 days validity" }]}
            price="₹3,649"
            mrp="₹4,306"
            badge={<DiscountBadge appearance={appearance} />}
            cta={<Button variant="secondary" trailingIcon={<ChevronRight />}>Renew now</Button>}
          />

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="toggle-stack" checked={stackItems} onCheckedChange={setStackItems} />
              <Label htmlFor="toggle-stack">Checklist on its own lines (itemsLayout=&quot;stacked&quot;)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="toggle-premium" checked={premiumSurface} onCheckedChange={setPremiumSurface} />
              <Label htmlFor="toggle-premium">Unlimited gradient (surface=&quot;premium&quot;)</Label>
            </div>
          </div>
          {/* Fixed single-state exception to the "both appearances" rule —
              a deliberately dark, premium promo treatment, not a tone that's
              meant to flip with the toggle. See the file header's note. */}
          <RenewalBanner
            variant="default"
            appearance="primary"
            icon={
              <div className="flex size-14 items-center justify-center rounded-full bg-highlight/15">
                <InfinityIcon className="size-8 text-highlight" />
              </div>
            }
            itemsLayout={stackItems ? "stacked" : "inline"}
            surface={premiumSurface ? "premium" : "default"}
            title="Unlimited hiring for 3 months."
            subtitle="0 job credits left. Repost any job, any time."
            items={[{ label: "1 Active job slot for 3 months" }, { label: "600 database credits" }]}
            price="₹5,400"
            mrp="₹5,999"
            badge={<DiscountBadge appearance="primary">10% OFF</DiscountBadge>}
            priceCaption="For 3 months · That's just ₹1,800 /month"
            ribbon={<RibbonBadge appearance="primary"><Clock className="size-3.5" /> Offer ends in 4 days</RibbonBadge>}
            cta={<Button variant="secondary" trailingIcon={<ChevronRight />}>Buy now</Button>}
          />

          <RenewalBanner
            variant="success"
            appearance={appearance}
            icon={showIcon ? <ArrowUp /> : undefined}
            title="Get 3 classic jobs"
            subtitle="Same job type, lower price per job."
            items={[{ label: "3 Job credits" }, { label: "180 days validity" }]}
            price="₹1,949"
            mrp="₹2,499"
            badge={<DiscountBadge appearance={appearance} />}
            ribbon={<RibbonBadge appearance={appearance}><Clock className="size-3.5" /> Offer ends in 4 days</RibbonBadge>}
            cta={<Button variant="secondary" trailingIcon={<ChevronRight />}>Buy now</Button>}
          />
        </div>
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
    </div>
  )
}
