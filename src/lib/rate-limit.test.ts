// Run: node --test src/lib/rate-limit.test.ts
import assert from "node:assert/strict"
import { test } from "node:test"

import { MAX_CALLS_PER_MINUTE, underRateLimit } from "./rate-limit.ts"

test("the AI routes cap calls per address per minute", () => {
  const t = 1_000_000
  for (let i = 0; i < MAX_CALLS_PER_MINUTE; i++) assert.equal(underRateLimit("a", t), true)
  assert.equal(underRateLimit("a", t), false) // over the cap
  assert.equal(underRateLimit("b", t), true) // another address is not affected
  assert.equal(underRateLimit("a", t + 60_001), true) // a minute later it frees up
})
