import * as React from "react"
import { Check, X, Flame, Clock, Building, ShieldCheck, Sparkles, Headphones } from "lucide-react"
import { Button, Badge } from "@apna/design-system"
import { cn } from "@/lib/utils"

export interface PricingFeature {
  label: string
  included: boolean
  boldPrefix?: string
  highlightIcon?: "whatsapp" | "flame"
}

export interface SingleJobPlan {
  id: string
  title: string
  originalPrice: number
  currentPrice: number
  oldUserPrice: number
  actionLabel: string
  isPopular?: boolean
  features: PricingFeature[]
}

export interface SingleJobPricingProps extends React.HTMLAttributes<HTMLDivElement> {
  plans?: SingleJobPlan[]
  showMonthlyCard?: boolean
  oldUserPricingEnabled?: boolean
  onSelectPlan?: (plan: SingleJobPlan) => void
  onSelectMonthly?: () => void
  onExploreUnlimited?: () => void
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

const DEFAULT_PLANS: SingleJobPlan[] = [
  {
    id: "classic",
    title: "Classic job",
    originalPrice: 999,
    currentPrice: 999,
    oldUserPrice: 699,
    actionLabel: "Get classic job",
    features: [
      { label: "Job will be active for 15 days", included: true },
      { label: "Higher visibility to candidates", included: false },
      { label: "WhatsApp job notify", included: false, highlightIcon: "whatsapp" },
      { label: "Urgently hiring tag", included: false, highlightIcon: "flame" },
      { label: "Top placements in job listings", included: false },
    ],
  },
  {
    id: "premium",
    title: "Premium job",
    originalPrice: 1999,
    currentPrice: 1999,
    oldUserPrice: 1399,
    actionLabel: "Get premium job",
    isPopular: true,
    features: [
      { label: "Job will be active for 15 days", included: true },
      { label: "Higher visibility to candidates", included: true },
      { label: "WhatsApp job notify", included: true, highlightIcon: "whatsapp" },
      { label: "Urgently hiring tag", included: true, highlightIcon: "flame" },
      { label: "Top placements in job listings", included: false },
    ],
  },
  {
    id: "super-premium",
    title: "Super premium job",
    originalPrice: 2999,
    currentPrice: 2999,
    oldUserPrice: 2799,
    actionLabel: "Get super premium job",
    features: [
      { label: "Job will be active for 15 days", included: true },
      { label: "more visibility to candidates", included: true, boldPrefix: "2x" },
      { label: "WhatsApp job notify", included: true, boldPrefix: "2x", highlightIcon: "whatsapp" },
      { label: "Urgently hiring tag", included: true, highlightIcon: "flame" },
      { label: "Top placements in job listings", included: true },
    ],
  },
]

export function SingleJobPricing({
  plans = DEFAULT_PLANS,
  showMonthlyCard = true,
  oldUserPricingEnabled = false,
  onSelectPlan,
  onSelectMonthly,
  onExploreUnlimited,
  className,
  ...props
}: SingleJobPricingProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Single Job Postings Section */}
        <div
          className={cn(
            "rounded-2xl border border-border bg-muted/20 p-5 sm:p-6",
            showMonthlyCard ? "lg:col-span-8" : "lg:col-span-12"
          )}
        >
          <div className="mb-5 flex items-center gap-2 font-heading text-base font-semibold text-foreground">
            <Clock className="size-5 text-muted-foreground" />
            <span>Single job posting</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {plans.map((plan) => {
              const activePrice = oldUserPricingEnabled ? plan.oldUserPrice : plan.currentPrice
              const showStrikeOff = oldUserPricingEnabled

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md",
                    plan.isPopular && !showMonthlyCard
                      ? "border-primary ring-1 ring-primary/20"
                      : "border-border"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {plan.title}
                    </h3>
                    {plan.isPopular && !showMonthlyCard && (
                      <Badge variant="default" className="text-2xs uppercase">
                        Popular
                      </Badge>
                    )}
                  </div>

                  <div className="my-4 flex items-baseline gap-0.5">
                    <span className="text-2xl font-bold text-foreground">
                      ₹{activePrice.toLocaleString()}*
                    </span>
                    {showStrikeOff && (
                      <span className="text-xs font-medium text-muted-foreground line-through ml-1">
                        ₹{plan.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <Button
                    variant={plan.isPopular ? "default" : "outline"}
                    className="w-full justify-center font-semibold mb-5"
                    onClick={() => onSelectPlan?.(plan)}
                  >
                    {plan.actionLabel}
                  </Button>

                  <div className="h-px w-full bg-border/60 mb-4" />

                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="mt-0.5 size-4 shrink-0 text-success" />
                        ) : (
                          <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
                        )}
                        <span
                          className={cn(
                            "text-xs leading-snug",
                            feature.included
                              ? "text-foreground font-medium"
                              : "text-muted-foreground/60"
                          )}
                        >
                          {feature.boldPrefix && (
                            <span className="font-bold mr-1">{feature.boldPrefix}</span>
                          )}
                          {feature.label}
                        </span>
                        {feature.highlightIcon === "whatsapp" && (
                          <WhatsappIcon
                            className={cn(
                              "mt-0.5 size-3.5 shrink-0",
                              feature.included ? "text-success" : "text-muted-foreground/40"
                            )}
                          />
                        )}
                        {feature.highlightIcon === "flame" && (
                          <Flame
                            className={cn(
                              "mt-0.5 size-3.5 shrink-0",
                              feature.included ? "text-destructive" : "text-muted-foreground/40"
                            )}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Monthly Plan (apna Unlimited) Card */}
        {showMonthlyCard && (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6 lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <Badge variant="info" className="gap-1 font-semibold">
                  <Sparkles className="size-3.5" />
                  apna Unlimited
                </Badge>
              </div>

              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                Monthly plan
              </h3>

              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">₹2,499*</span>
                <span className="text-xs text-muted-foreground font-medium">/month</span>
              </div>

              <Button
                variant="default"
                className="w-full justify-center font-semibold mb-5 shadow-sm"
                onClick={onSelectMonthly}
              >
                Get apna unlimited
              </Button>

              <div className="h-px w-full bg-border/60 mb-4" />

              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <Building className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    <strong className="font-bold">1</strong> Active job slot for{" "}
                    <strong className="font-bold">30 days</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>Unlimited free reposts on job expiry</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    <strong className="font-bold">200</strong> database unlocks{" "}
                    <span className="text-muted-foreground italic">worth ₹2,000</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <WhatsappIcon className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>WhatsApp boost for more applications</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <Headphones className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 flex flex-col gap-2">
              <p className="text-2xs text-muted-foreground">
                Note: This plan is valid in a single city.
              </p>
              <button
                type="button"
                onClick={onExploreUnlimited}
                className="text-xs font-semibold text-primary underline underline-offset-4 text-left hover:opacity-80"
              >
                Other unlimited plans →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
