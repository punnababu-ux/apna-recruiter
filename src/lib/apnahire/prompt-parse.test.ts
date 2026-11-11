import assert from "node:assert/strict"
import { test } from "node:test"
import { parsePrompt } from "./prompt-parse.ts"

test("experience: freshers welcome is 'any'; only 'freshers only' shuts experienced people out", () => {
  assert.equal(parsePrompt("delivery executive in HSR. Freshers are fine.").experienceType, "any")
  assert.equal(parsePrompt("telecaller, freshers can apply").experienceType, "any")
  assert.equal(parsePrompt("helper, freshers only").experienceType, "fresher")
  assert.equal(parsePrompt("only freshers for data entry").experienceType, "fresher")
})

test("title: the narrower sales roles win over field sales", () => {
  assert.equal(parsePrompt("inside sales executive in Pune").category, "Inside Sales")
  assert.equal(parsePrompt("business development executive").category, "Business Development")
  assert.equal(parsePrompt("loan sales officer, bike must").category, "Loan Sales")
  assert.equal(parsePrompt("field sales executive").category, "Field Sales")
  assert.equal(parsePrompt("waiter for a cafe in Indiranagar").category, "Restaurant Staff")
  assert.equal(parsePrompt("receptionist, 12th pass").category, "Front Office")
  assert.equal(parsePrompt("warehouse picker in Bhiwandi").category, "Warehouse & Logistics")
  assert.equal(parsePrompt("delivery executive in HSR").category, "Delivery")
})

test("education: 'any' only when the recruiter says it does not matter", () => {
  assert.equal(parsePrompt("delivery boy in HSR, no education needed").education, "any")
  assert.equal(parsePrompt("helper, education not required").education, "any")
  assert.equal(parsePrompt("telecaller, graduate, good english").education, "graduate")
  assert.equal(parsePrompt("driver in Pune, 10th pass").education, "10th")
  assert.equal(parsePrompt("cook in Whitefield").education, undefined)
})
