// Run: node --test src/lib/mobile-number.test.ts
import assert from "node:assert/strict"
import { test } from "node:test"

import { mobileDigits } from "./mobile-number.ts"

test("a pasted or autofilled number loses its country code or leading 0, not its last digits", () => {
  for (const raw of [
    "+91 98765 43210",
    "919876543210",
    "09876543210", // what Chrome's autofill writes into a tel-national field
    "98765 43210",
    "0091 98765 43210",
    "+91-098765-43210",
    "9876543210",
  ]) {
    assert.equal(mobileDigits(raw), "9876543210", raw)
  }
})

test("a country code before a number that itself starts with 91", () => {
  assert.equal(mobileDigits("+91 91234 56789"), "9123456789")
})

test("ten digits or fewer stay as typed, also when they start with 91 or 0", () => {
  assert.equal(mobileDigits("9123456789"), "9123456789")
  assert.equal(mobileDigits("0987654321"), "0987654321") // ten digits: nothing says the 0 is a prefix
  assert.equal(mobileDigits("91"), "91")
  assert.equal(mobileDigits("98765"), "98765")
  assert.equal(mobileDigits("98a7 6-5"), "98765")
  assert.equal(mobileDigits(""), "")
})

/** What the field holds after each key, as the form does it: the new text through mobileDigits. */
const typed = (keys: string) => [...keys].reduce((field, key) => mobileDigits(field + key), "")

test("typing one digit at a time is unchanged, and an eleventh digit is ignored", () => {
  assert.equal(typed("9876543210"), "9876543210")
  assert.equal(typed("98765432109"), "9876543210")
  assert.equal(typed("98765"), "98765")
})

test("typed with the country code or a leading 0, the number comes right once every digit is in", () => {
  assert.equal(typed("919876543210"), "9876543210")
  assert.equal(typed("09876543210"), "9876543210")
})
