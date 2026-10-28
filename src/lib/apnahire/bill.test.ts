// Run: node --test src/lib/apnahire/bill.test.ts
import assert from "node:assert/strict"
import { test } from "node:test"

import { changeKindOf, computeBill, prorationOf, splitGst, withGst } from "./bill.ts"

const STAY20 = { discountPct: 20, maxDiscount: 300 }

test("Figma frames: ₹5,999 plan", () => {
  assert.equal(computeBill([{ price: 5999 }], 0, null).total, 7079)
  assert.equal(computeBill([{ price: 5999 }], 0, STAY20).total, 6725) // coupon capped at ₹300
  assert.equal(withGst(5999), 7079) // renewal ignores the coupon
})

test("proration never makes the bill negative", () => {
  const bill = computeBill([{ price: 1000 }], 5000, STAY20)
  assert.deepEqual([bill.prorationCredit, bill.couponDiscount, bill.total], [1000, 0, 0])
})

test("the receipt splits any charged total back exactly", () => {
  // The coupon case: ₹5,999 − ₹300 = ₹5,699 sub total, ₹1,026 GST.
  assert.deepEqual(splitGst(computeBill([{ price: 5999 }], 0, STAY20).total), { subtotal: 5699, gst: 1026 })
  for (let subtotal = 0; subtotal <= 50000; subtotal++) {
    assert.equal(splitGst(withGst(subtotal)).subtotal, subtotal)
  }
})

test("plan changes: longer or bigger is an upgrade, anything less waits", () => {
  const monthly2 = { term: "monthly" as const, total: 2 }
  assert.equal(changeKindOf(monthly2, { id: "quarterly", slots: 2 }), "upgrade")
  assert.equal(changeKindOf(monthly2, { id: "monthly", slots: 3 }), "upgrade")
  assert.equal(changeKindOf(monthly2, { id: "monthly", slots: 2 }), "same")
  assert.equal(changeKindOf({ term: "quarterly", total: 2 }, { id: "monthly", slots: 2 }), "downgrade")
  // More slots on a shorter term is still less: a downgrade, never charged now.
  assert.equal(changeKindOf({ term: "annual", total: 1 }, { id: "monthly", slots: 3 }), "downgrade")
})

test("upgrade credit: the unused days of what was paid, never more than the new plan", () => {
  // Half of a ₹4,499 monthly left: ₹2,250 off a ₹9,999 plan.
  assert.deepEqual(prorationOf({ paid: 4499, daysLeft: 15, termDays: 30 }, 9999, 4499), { credit: 2250, payToday: 7749 })
  // Nothing recorded as paid: the list price stands in.
  assert.equal(prorationOf({ daysLeft: 30, termDays: 30 }, 9999, 2499).credit, 2499)
  // A credit bigger than the new plan is capped: never a negative charge.
  assert.deepEqual(prorationOf({ paid: 9999, daysLeft: 365, termDays: 365 }, 4499, 9999), { credit: 4499, payToday: 0 })
})
