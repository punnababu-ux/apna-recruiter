import type { SubscriptionPlanId } from "@/content/subscriptions"

/** GST on every apna purchase. The one place the rate lives. */
export const GST_RATE = 0.18

export const withGst = (amount: number) => amount + Math.round(amount * GST_RATE)

/** A paid total back into sub total + GST. Exact for any total withGst
 *  made: GST's rounding moves the total by at most 0.5, which divided back
 *  by 1.18 is under 0.5, so the round lands on the original sub total. */
export function splitGst(total: number) {
  const subtotal = Math.round(total / (1 + GST_RATE))
  return { subtotal, gst: total - subtotal }
}

/**
 * The order summary's bill (Figma maths): items, minus the upgrade proration
 * credit, minus the capped coupon, then GST on what is left ("Sub total").
 * `lineCoupon` splits the coupon across the lines, so each item row can show
 * its price after every discount.
 */
export function computeBill(
  lines: { price: number; mrp?: number }[],
  prorationAmount: number,
  coupon: { discountPct: number; maxDiscount: number } | null,
) {
  const itemsNet = lines.reduce((sum, l) => sum + l.price, 0)
  const itemsMrp = lines.reduce((sum, l) => sum + (l.mrp ?? l.price), 0)
  const prorationCredit = Math.min(prorationAmount, itemsNet)
  const couponDiscount = coupon
    ? Math.min(Math.round(((itemsNet - prorationCredit) * coupon.discountPct) / 100), coupon.maxDiscount)
    : 0
  const subtotal = itemsNet - prorationCredit - couponDiscount
  const gst = Math.round(subtotal * GST_RATE)
  // The coupon covers the whole cart, so each line carries its share (by
  // price; the last line takes the rounding) and shows what it now costs.
  let left = couponDiscount
  const lineCoupon = lines.map((l, i) => {
    const share = i === lines.length - 1 ? left : itemsNet ? Math.round((couponDiscount * l.price) / itemsNet) : 0
    left -= share
    return share
  })
  return { itemsNet, itemsMrp, prorationCredit, couponDiscount, lineCoupon, subtotal, gst, total: subtotal + gst }
}

/* ── Plan changes (Manage plan, plan-change.tsx) ──────────────────────── */

const TERM_ORDER: SubscriptionPlanId[] = ["monthly", "quarterly", "annual"]

/** Moving to `plan`: the same plan, an upgrade (instant), or a downgrade
 *  (at the cycle's end). Anything less — a shorter term or fewer slots,
 *  even with more of the other — is a downgrade. */
export function changeKindOf(
  sub: { term: SubscriptionPlanId; total: number },
  plan: { id: SubscriptionPlanId; slots: number },
) {
  const term = TERM_ORDER.indexOf(plan.id) - TERM_ORDER.indexOf(sub.term)
  const slots = plan.slots - sub.total
  if (term === 0 && slots === 0) return "same" as const
  return term >= 0 && slots >= 0 ? ("upgrade" as const) : ("downgrade" as const)
}

/** An upgrade's price: the unused part of this cycle's payment (paid × days
 *  left ÷ the term's days) comes off the new plan. `listPrice` stands in
 *  when nothing was recorded as paid. */
export function prorationOf(
  sub: { paid?: number; daysLeft: number; termDays: number },
  newPrice: number,
  listPrice: number,
) {
  const paid = sub.paid ?? listPrice
  const credit = Math.min(newPrice, Math.round((paid * sub.daysLeft) / sub.termDays))
  return { credit, payToday: newPrice - credit }
}
