// Run: node --test src/lib/apnahire/credit-plan.test.ts
import assert from "node:assert/strict"
import { test } from "node:test"

import { withExtraOff } from "../../content/offers.ts"
import { creditPlan, hasAnyCredits } from "./credit-plan.ts"

const single = { price: 650, mrp: 899 }
const tier = (kind: "job" | "ai-calling", count: number) => ({ credit: { kind, count } }) as Parameters<typeof creditPlan>[0]
const premium = tier("job", 2)
const premiumAi = tier("ai-calling", 1)

test("job credits: none, short, covered", () => {
  assert.deepEqual(creditPlan(premium, { job: 0, "ai-calling": 0 }, single), { state: "none" })
  assert.deepEqual(creditPlan(premium, { job: 1, "ai-calling": 0 }, single), {
    state: "partial", held: 1, shortfall: 1, price: 650, mrp: 899,
  })
  assert.deepEqual(creditPlan(premium, { job: 4, "ai-calling": 0 }, single), { state: "covered" })
})

test("an AI job (P+AI) credit pays only for the P+AI card", () => {
  const onlyAi = { job: 0, "ai-calling": 1 }
  assert.deepEqual(creditPlan(premiumAi, onlyAi, single), { state: "covered" })
  assert.deepEqual(creditPlan(premium, onlyAi, single), { state: "none" })
  assert.equal(hasAnyCredits(onlyAi), true)
  assert.equal(hasAnyCredits({ job: 0, "ai-calling": 0 }), false)
})

test("the 10% offer rounds to the rupee", () => {
  assert.equal(withExtraOff(1399), 1259)
  assert.equal(withExtraOff(699), 629)
})
