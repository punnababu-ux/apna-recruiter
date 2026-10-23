/** GST on every apna purchase. The one place the rate lives. */
export const GST_RATE = 0.18

export const withGst = (amount: number) => amount + Math.round(amount * GST_RATE)

/**
 * The order summary's bill (Figma maths): items, minus the upgrade proration
 * credit, minus the capped coupon, then GST on what is left ("Sub total").
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
  return { itemsNet, itemsMrp, prorationCredit, couponDiscount, subtotal, gst, total: subtotal + gst }
}
