import { expect, test, type Locator, type Page } from "@playwright/test"
import { JOB_POST, expectNoCollapsedButtons, expectNoHorizontalOverflow, open, settle } from "./helpers"

/**
 * The job-posting wizard (/apnahire/jobs/new): one question per screen, from
 * "Describe the job" to the plans step. The AI fill is not used in the walk
 * (no API key here); the flow is filled by hand. Screens and labels come from
 * SCREENS in src/components/apnahire/post-job/wizard-screens.tsx.
 */

const PLANS = "/apnahire/jobs/new/plans"
const DRAFT_KEY = "apnahire:job-draft"

type Step = {
  /** The screen's id in SCREENS (also the visual baseline's name). */
  id: string
  /** The question, as the page's one h1. */
  heading: RegExp
  /** The minimum valid answer. Leaves the screen ready for the footer button. */
  answer: (page: Page) => Promise<void>
}

const pick = (page: Page, group: string, option?: string) => {
  const radios = page.getByRole("radiogroup", { name: group }).getByRole("radio")
  return (option ? radios.filter({ hasText: option }) : radios).first().click()
}

const STEPS: Step[] = [
  { id: "describe", heading: /^Describe the job$/, answer: async () => {} },
  { id: "manual-intro", heading: /^Post a job in 4 steps$/, answer: async () => {} },
  {
    id: "title",
    heading: /job title\?$/,
    answer: (page) => page.getByRole("textbox", { name: "Job title" }).fill("Delivery executive"),
  },
  { id: "category", heading: /job role\?$/, answer: (page) => pick(page, "Job role", "Delivery") },
  { id: "industry", heading: /^Which industry is it in\?$/, answer: (page) => pick(page, "Industry") },
  { id: "job-type", heading: /^What type of job is it\?$/, answer: (page) => pick(page, "Job type", "Full time") },
  { id: "workplace", heading: /^Where will they work\?$/, answer: (page) => pick(page, "Workplace", "Work from office") },
  {
    id: "location",
    heading: /^Where.s the office\?$/,
    answer: async (page) => {
      // The first popular place sets the area and its city together.
      await page.getByRole("button", { pressed: false }).filter({ hasText: /, \w+/ }).first().click()
      await expect(page.getByRole("button", { name: "Change", exact: true })).toBeVisible()
    },
  },
  {
    id: "salary",
    heading: /^How will you pay\?$/,
    answer: async (page) => {
      await pick(page, "Pay type", "Fixed only")
      await page.getByLabel("From", { exact: true }).fill("15000")
      await page.getByLabel("To (monthly)").fill("20000")
    },
  },
  { id: "perks", heading: /^Any extra perks\?$/, answer: async () => {} },
  { id: "education", heading: /^What.s the minimum education\?$/, answer: (page) => pick(page, "Minimum education", "12th pass") },
  { id: "english", heading: /^How much English is needed\?$/, answer: (page) => pick(page, "English level", "Basic English") },
  { id: "experience", heading: /^How much experience do they need\?$/, answer: (page) => pick(page, "Experience", "Freshers only") },
  { id: "preferences", heading: /^Anyone you.d prefer\?$/, answer: async () => {} },
  { id: "screening", heading: /^Any questions for applicants\?$/, answer: async () => {} },
  {
    id: "description",
    heading: /^How does the description read\?$/,
    answer: async (page) => {
      // The screen writes a description on arrival; wait for it, then make sure there is one.
      await expect(page.getByRole("button", { name: "Stop", exact: true })).toHaveCount(0, { timeout: 15_000 })
      const box = page.getByRole("textbox", { name: "Description" })
      if (!(await box.inputValue()).trim()) {
        await box.fill("Deliver orders on time in the city. Own a bike and a smartphone. Weekly payout.")
      }
    },
  },
  {
    id: "interview",
    heading: /^Is this a walk-in interview\?$/,
    answer: (page) => pick(page, "Interview type", "No, I"),
  },
  {
    id: "contact",
    heading: /^Can candidates call you after applying\?$/,
    answer: (page) => pick(page, "Candidate contact", "Yes, me"),
  },
  { id: "review", heading: /^Review$/, answer: async () => {} },
]

/** The sticky footer and its primary button: the last button in it, whatever the platform. */
const footer = (page: Page) => page.locator("[data-slot=wizard-footer]")
const primary = (page: Page): Locator => footer(page).getByRole("button").last()

/** A fresh post: the seeded draft is discarded through the "Continue your draft?" prompt. */
async function startFresh(page: Page) {
  await open(page, JOB_POST)
  await page.getByRole("alertdialog").getByRole("button", { name: "Start new" }).click()
  await expect(page.getByRole("alertdialog")).toHaveCount(0)
  await settle(page, 500)
}

/** Every screen has to pass these. */
async function expectScreenLayout(page: Page, id: string) {
  await expectNoHorizontalOverflow(page, id)
  await expectNoCollapsedButtons(page)
  const button = primary(page)
  await expect(button, `${id}: primary button`).toBeVisible()
  const box = (await button.boundingBox())!
  const view = page.viewportSize()!
  expect(box.x, `${id}: button left of screen`).toBeGreaterThanOrEqual(0)
  expect(box.y, `${id}: button above screen`).toBeGreaterThanOrEqual(0)
  expect(box.x + box.width, `${id}: button past right edge`).toBeLessThanOrEqual(view.width)
  expect(box.y + box.height, `${id}: button below the fold`).toBeLessThanOrEqual(view.height)
}

/** Waits for the screen's question, lets the entrance finish, then runs the layout checks. */
async function arrive(page: Page, step: Step) {
  await expect(page.getByRole("heading", { level: 1, name: step.heading }), `${step.id}: heading`).toBeVisible()
  await settle(page, 450)
  await expectScreenLayout(page, step.id)
}

/** Fills each screen with its minimum answer and moves on, checking every one, up to the plans step. */
async function walk(page: Page) {
  await startFresh(page)
  for (const step of STEPS) {
    await arrive(page, step)
    await step.answer(page)
    if (step.id === "describe") {
      await page.getByRole("button", { name: "Fill manually" }).click()
    } else {
      await primary(page).click()
    }
  }
  await expect(page).toHaveURL(new RegExp(`${PLANS}$`))
  await expect(page.getByRole("heading", { name: "Select a job type" }).or(page.getByText("Select a job type")).first()).toBeVisible()
  await settle(page, 600)
  await expectNoHorizontalOverflow(page)
  await expectNoCollapsedButtons(page)
}

test.describe("job posting: walk-through", () => {
  test("every screen fits and its primary button is reachable, to the plans step", async ({ page }) => {
    test.setTimeout(120_000)
    await walk(page)
  })

  test("320px phone: no screen scrolls sideways", async ({ page }) => {
    test.skip(test.info().project.name !== "phone", "320px is a phone width")
    test.setTimeout(120_000)
    await page.setViewportSize({ width: 320, height: 640 })
    await startFresh(page)
    for (const step of STEPS) {
      await expect(page.getByRole("heading", { level: 1, name: step.heading }), `${step.id}: heading`).toBeVisible()
      await settle(page, 450)
      await expectNoHorizontalOverflow(page, step.id)
      await expectNoCollapsedButtons(page)
      await step.answer(page)
      if (step.id === "describe") await page.getByRole("button", { name: "Fill manually" }).click()
      else await primary(page).click()
    }
    await expect(page).toHaveURL(new RegExp(`${PLANS}$`))
    await settle(page, 600)
    await expectNoHorizontalOverflow(page, "plans")
  })

  test("320px phone: the plans step does not scroll sideways", async ({ page }) => {
    test.skip(test.info().project.name !== "phone", "320px is a phone width")
    await page.setViewportSize({ width: 320, height: 640 })
    await open(page, PLANS)
    await settle(page, 800)
    await expectNoHorizontalOverflow(page, "plans")
  })

  test("describe screen: the idle halo does not widen the page", async ({ page }) => {
    test.skip(test.info().project.name !== "phone", "the halo only pokes out past the phone's screen edge")
    await startFresh(page)
    await expect(page.getByRole("heading", { level: 1, name: /^Describe the job$/ })).toBeVisible()
    await settle(page, 450)
    await expectNoHorizontalOverflow(page, "describe")
  })
})

test.describe("job posting: drafts", () => {
  test("a saved draft asks before it is used; Continue draft keeps it, Start new drops it", async ({ page }) => {
    await open(page, JOB_POST)
    const dialog = page.getByRole("alertdialog")
    await expect(dialog.getByText("Continue your draft?")).toBeVisible()
    await expect(dialog.getByText("Delivery executive")).toBeVisible()
    // Two buttons, side by side, equal halves: secondary first, primary last.
    const start = dialog.getByRole("button", { name: "Start new" })
    const keep = dialog.getByRole("button", { name: "Continue draft" })
    const [a, b] = [(await start.boundingBox())!, (await keep.boundingBox())!]
    expect(Math.abs(a.y - b.y), "buttons share a row").toBeLessThanOrEqual(1)
    expect(a.x, "Start new comes first").toBeLessThan(b.x)
    await expectNoHorizontalOverflow(page)
    await expectNoCollapsedButtons(page)

    await keep.click()
    await expect(dialog).toHaveCount(0)
    // The seeded draft has no screen saved, so it opens on Describe, with the answers kept.
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "{}"), DRAFT_KEY)
    expect(saved.draft.title).toBe("Delivery executive")

    await page.reload({ waitUntil: "networkidle" })
    await page.getByRole("alertdialog").getByRole("button", { name: "Start new" }).click()
    await expect(page.getByRole("alertdialog")).toHaveCount(0)
    const cleared = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "{}"), DRAFT_KEY)
    expect(cleared.draft?.title ?? "").toBe("")
  })

  test("?resume=1 skips the prompt and opens the saved screen", async ({ page }) => {
    await open(page, JOB_POST)
    await seedFlow(page, "salary")
    await page.goto(`${JOB_POST}?resume=1`, { waitUntil: "networkidle" })
    await expect(page.getByRole("alertdialog")).toHaveCount(0)
    await expect(page.getByRole("heading", { level: 1, name: "How will you pay?" })).toBeVisible()
    await expectScreenLayout(page, "salary")
  })

  test("Back steps to the previous screen and keeps the answer", async ({ page }) => {
    await open(page, JOB_POST)
    await seedFlow(page, "industry")
    await page.goto(`${JOB_POST}?resume=1`, { waitUntil: "networkidle" })
    await expect(page.getByRole("heading", { level: 1, name: "Which industry is it in?" })).toBeVisible()
    // On phones Back is the icon beside Next; from sm it is the outline button on the left.
    await footer(page).getByRole("button", { name: "Back" }).filter({ visible: true }).click()
    await expect(page.getByRole("heading", { level: 1, name: /job role\?$/ })).toBeVisible()
    await expect(page.getByRole("radiogroup", { name: "Job role" }).getByRole("radio", { checked: true })).toContainText(
      "Delivery",
    )
  })

  test("a screen's own error shows when its answer is missing", async ({ page }) => {
    await startFresh(page)
    await page.getByRole("button", { name: "Fill manually" }).click()
    await primary(page).click()
    await expect(page.getByRole("heading", { level: 1, name: /job title\?$/ })).toBeVisible()
    await primary(page).click()
    await expect(page.getByRole("alert").filter({ hasText: "Add a job title" })).toBeVisible()
    await settle(page, 400)
    await expectScreenLayout(page, "title (error)")
  })
})

test.describe("job posting: leaving", () => {
  test("Save & exit saves the draft and goes back to the jobs list", async ({ page }) => {
    await open(page, JOB_POST)
    await seedFlow(page, "category")
    await page.goto(`${JOB_POST}?resume=1`, { waitUntil: "networkidle" })
    await expect(page.getByRole("heading", { level: 1, name: /job role\?$/ })).toBeVisible()
    await page.getByRole("button", { name: /^Save/ }).filter({ visible: true }).click()
    await expect(page).toHaveURL(/\/apnahire\/jobs$/)
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "{}"), DRAFT_KEY)
    expect(saved.screen).toBe("category")
    expect(saved.draft.title).toBe("Delivery executive")
  })

  test("the back arrow in the header leaves without a prompt", async ({ page }) => {
    await open(page, JOB_POST)
    await seedFlow(page, "category")
    await page.goto(`${JOB_POST}?resume=1`, { waitUntil: "networkidle" })
    await page.getByRole("button", { name: "Back to jobs" }).click()
    await expect(page).toHaveURL(/\/apnahire\/jobs$/)
  })
})

// ── Screenshots ─────────────────────────────────────────────────────────────

/** A complete job, so any screen can be opened on its own. */
const FULL_DRAFT = {
  hiringFor: "own",
  clientCompany: "",
  title: "Delivery executive",
  category: "Delivery",
  industry: "E-commerce & Logistics",
  jobType: "full_time",
  nightShift: false,
  locationType: "office",
  city: "Bengaluru",
  area: "Koramangala 5th Block",
  relocation: false,
  payType: "fixed",
  salaryMin: 15000,
  salaryMax: 20000,
  incentive: null,
  perks: ["Overtime pay"],
  joiningFee: false,
  joiningFeeAnswered: true,
  joiningFeeDetails: { amount: null, reason: "" },
  education: "12th",
  english: "basic",
  experienceType: "fresher",
  minExperienceYears: null,
  maxExperienceYears: null,
  strictness: { education: "must", english: "must", experience: "must" },
  languages: ["Hindi"],
  skills: [],
  degrees: [],
  assets: ["Bike / two-wheeler"],
  gender: "any",
  ageMin: null,
  ageMax: null,
  walkIn: false,
  walkInDetails: { address: "", startDate: "", endDate: "", startTime: "10:00", endTime: "16:00", instructions: "" },
  contact: "self",
  otherRecruiter: { name: "", phone: "", email: "" },
  whoCanContact: "all",
  screeningQuestions: [],
  description:
    "Deliver food and parcels around Koramangala on time.\n\nResponsibilities:\n- Pick up and deliver orders\n- Keep customers updated\n- Handle cash and UPI payments\n\nRequirements:\n- Own a bike and a smartphone\n- Know the city's roads",
}

/** Saves a complete draft on `screen` (needs the page already open, so the e2e seed has run). */
async function seedFlow(page: Page, screen: string) {
  await page.evaluate(
    ({ key, screen, draft }) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          screen,
          prompt: "",
          // Drafted, so titles show whole instead of typing in.
          draftedPrompt: "Delivery executive in Koramangala",
          draft,
          aiFilled: [],
          returnTo: null,
          descriptionBasis: "",
        }),
      )
    },
    { key: DRAFT_KEY, screen, draft: FULL_DRAFT },
  )
}

test.describe("job posting: screens @visual", () => {
  for (const step of STEPS) {
    test(`@visual ${step.id}`, async ({ page }) => {
      await open(page, JOB_POST)
      await seedFlow(page, step.id)
      await page.goto(`${JOB_POST}?resume=1`, { waitUntil: "networkidle" })
      await expect(page.getByRole("heading", { level: 1, name: step.heading })).toBeVisible()
      // `open` hid the Next dev badge on the first load only; this is a second one.
      await page.addStyleTag({ content: "nextjs-portal{display:none!important} *{caret-color:transparent!important}" })
      // Let the entrance, the idle glow and the map settle.
      await settle(page, 1200)
      await page.mouse.move(0, 0)
      await expect(page).toHaveScreenshot(`${step.id}.png`, {
        mask: [page.locator(".ai-idle, .ai-wash, .ai-backdrop, .loading-ring, iframe")],
      })
    })
  }
})
