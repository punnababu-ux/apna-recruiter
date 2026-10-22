"use client"

/**
 * usePlans — the plan catalog for the pricing phase picked in the preview
 * settings (content/plan-catalog.ts). Every component that shows or sells a
 * plan reads its figures here, so one switch reprices the whole product.
 */

import { planCatalog, type PlanCatalog } from "@/content/plan-catalog"
import { usePricingPhase } from "@/hooks/use-pricing-phase"

export function usePlans(): PlanCatalog {
  return planCatalog(usePricingPhase())
}
