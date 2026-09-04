import * as React from "react"
import { Building, Sparkles, ShieldCheck, Headphones, Check } from "lucide-react"
import { Button, Badge } from "@apna/design-system"
import { cn } from "@/lib/utils"

export interface UnlimitedPlan {
  id: string
  name: string
  monthlyRate: number
  upfrontPrice: number
  durationDays: number
  unlocksCount: number
  unlocksValue: number
  isHighlighted?: boolean
}

export interface UnlimitedPlansProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectPlan?: (plan: UnlimitedPlan) => void
}

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  )
}

const DEFAULT_UNLIMITED_PLANS: UnlimitedPlan[] = [
  {
    id: "yearly",
    name: "Yearly plan",
    monthlyRate: 1333,
    upfrontPrice: 15999,
    durationDays: 365,
    unlocksCount: 1000,
    unlocksValue: 10000,
  },
  {
    id: "quarterly",
    name: "Quarterly plan",
    monthlyRate: 1999,
    upfrontPrice: 5999,
    durationDays: 90,
    unlocksCount: 600,
    unlocksValue: 6000,
    isHighlighted: true,
  },
  {
    id: "monthly",
    name: "Monthly plan",
    monthlyRate: 2499,
    upfrontPrice: 2499,
    durationDays: 30,
    unlocksCount: 200,
    unlocksValue: 2000,
  },
]

export function UnlimitedPlans({
  onSelectPlan,
  className,
  ...props
}: UnlimitedPlansProps) {
  const [cityScope, setCityScope] = React.useState<"single" | "pan_india">("single")
  const [activeSlots, setActiveSlots] = React.useState<number>(1)

  return (
    <div className={cn("space-y-8", className)} {...props}>
      {/* Header controls & City toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <Badge variant="info" className="gap-1 font-semibold mb-1">
            <Sparkles className="size-3.5" />
            apna Unlimited
          </Badge>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Unlimited hiring @ just <span className="text-primary font-extrabold">₹1,333*</span> /month
          </h2>
        </div>

        {/* City Toggle */}
        <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setCityScope("single")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              cityScope === "single"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Single City
          </button>
          <button
            type="button"
            onClick={() => setCityScope("pan_india")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              cityScope === "pan_india"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Pan-India
          </button>
        </div>
      </div>

      {/* Benefits Banner Pills */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-medium">
          <Check className="size-3.5 text-success" />
          Unlimited job posting flexibility
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-medium">
          <Check className="size-3.5 text-success" />
          Predictable hiring cost
        </div>
      </div>

      {/* Active Job Slots Tab Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground mr-2">Active slots:</span>
        {[1, 2, 3].map((slots) => (
          <button
            key={slots}
            type="button"
            onClick={() => setActiveSlots(slots)}
            className={cn(
              "rounded-lg border px-4 py-2 text-xs font-semibold transition-all",
              activeSlots === slots
                ? "border-primary bg-primary/10 text-primary font-bold shadow-2xs"
                : "border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground"
            )}
          >
            {slots} {slots === 1 ? "Active job slot" : "Jobs"}
          </button>
        ))}
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {DEFAULT_UNLIMITED_PLANS.map((plan) => {
          const slotsMultiplier = activeSlots
          const finalMonthlyRate = plan.monthlyRate * slotsMultiplier
          const finalUpfront = plan.upfrontPrice * slotsMultiplier

          return (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md",
                plan.isHighlighted
                  ? "border-primary ring-2 ring-primary/20 bg-card relative"
                  : "border-border"
              )}
            >
              <div className="flex flex-col gap-4">
                {/* Header: title + badge */}
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {plan.name}
                  </h3>
                  {plan.isHighlighted && (
                    <Badge variant="default" className="text-2xs font-semibold uppercase">
                      Recommended
                    </Badge>
                  )}
                </div>

                {/* Price block: rate + upfront */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-foreground">
                      ₹{finalMonthlyRate.toLocaleString()}*
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">/month</span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Pay upfront ₹{finalUpfront.toLocaleString()}
                  </p>
                </div>

                {/* Action CTA */}
                <Button
                  variant={plan.isHighlighted ? "default" : "outline"}
                  className="w-full justify-center font-semibold"
                  onClick={() => onSelectPlan?.(plan)}
                >
                  Get {plan.name.toLowerCase()}
                </Button>

                <div className="h-px w-full bg-border/60" />

                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                    <Building className="size-4 shrink-0 text-primary" />
                    <span>
                      {activeSlots} Active job slot for{" "}
                      <strong className="font-bold">{plan.durationDays} days</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                    <Sparkles className="size-4 shrink-0 text-primary" />
                    <span>Unlimited free reposts on job expiry</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                    <ShieldCheck className="size-4 shrink-0 text-primary" />
                    <span>
                      <strong className="font-bold">
                        {(plan.unlocksCount * activeSlots).toLocaleString()}
                      </strong>{" "}
                      database unlocks{" "}
                      <span className="text-muted-foreground italic">
                        worth ₹{(plan.unlocksValue * activeSlots).toLocaleString()}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                    <WhatsappIcon className="size-4 shrink-0 text-success" />
                    <span>WhatsApp boost for more applications</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                    <Headphones className="size-4 shrink-0 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-border/40 text-2xs text-muted-foreground">
                Note: This plan is valid in {cityScope === "single" ? "a single city" : "all Pan-India cities"}.
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
