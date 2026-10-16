/**
 * Number and price formatting — the one place the product formats them.
 *
 *   num(200000)  → "2,00,000"   Indian digit grouping
 *   inr(200000)  → "₹2,00,000"  every rupee amount on screen
 */

export const num = (n: number) => n.toLocaleString("en-IN")

export const inr = (n: number) => `₹${num(n)}`
