// Run: node --test src/lib/apnahire/bill.test.ts
import assert from "node:assert/strict"
import { test } from "node:test"

import { computeBill, withGst } from "./bill.ts"

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
