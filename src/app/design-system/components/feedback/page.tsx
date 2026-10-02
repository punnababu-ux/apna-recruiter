"use client"

import * as React from "react"
import { AlertBanner, RenewalBanner, Button, Badge, Switch, Label } from "@apna/design-system"
import { toast } from "sonner"
import { AlertCircle, Info, CreditCard, ChevronRight, RefreshCw, Sparkles } from "@apna/design-system"
import { cn } from "@/lib/utils"

// A translucent overlay rather than an opaque chip — `bg-foreground/15` reads
// as "black at ~15% opacity" in light mode and "white at ~15% opacity" in
// dark mode (foreground flips with theme), so the pill softly darkens a
// light tint card or lightens a dark one instead of sitting on top of it as
// a stark white/black block. `bg-white/15` is used on the primary (solid
// gradient) appearance instead, matching the gradient's own fixed white text.
function DiscountBadge({ appearance }: { appearance: "primary" | "secondary" }) {
  return appearance === "primary" ? (
    <Badge variant="outline" className="border-transparent bg-white/15 text-white">
      22% OFF
    </Badge>
  ) : (
    <Badge variant="outline" className="border-transparent bg-foreground/15 text-foreground">
      22% OFF
    </Badge>
  )
}

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
