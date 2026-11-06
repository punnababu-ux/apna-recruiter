import { test, expect, type Page } from "@playwright/test"
import { open, settle, expectNoCollapsedButtons, expectNoHorizontalOverflow } from "./helpers"

// Layout tests for the recruiter app (src/app/apnahire): the jobs list, the ECC job page and its states,
// the job states, chats and every other product route. Checkout and job posting live in their own specs.
// Each screen: no sideways scroll, no collapsed buttons; phones also at 320px.

const ECC = "/apnahire/jobs/telecaller-koramangala"

const isDesktop = () => test.info().project.name === "desktop"
const isPhone = () => !isDesktop()

/** The checks every screen has to pass. */
async function expectLayout(page: Page, label: string) {
  await expectNoHorizontalOverflow(page, label)
  await expectNoCollapsedButtons(page)
}

/** Scroll to the bottom and back: sticky bars (match sections, results bar, docked header) engage on the way. */
async function scrollThrough(page: Page, label: string) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await settle(page, 500)
  await expectLayout(page, `${label} (scrolled to the bottom)`)
  await page.evaluate(() => window.scrollTo(0, 0))
  await settle(page, 500)
  await expectLayout(page, `${label} (back at the top)`)
}

/** Park the mouse in a corner (hover states) and let motion settle before a shot. */
async function rest(page: Page, ms = 1200) {
  const size = page.viewportSize()!
  await page.mouse.move(size.width - 2, size.height - 2)
  await settle(page, ms)
}

type Screen = {
  name: string
  path: string
  prepare?: (page: Page) => Promise<void>
  desktopOnly?: boolean
  scroll?: boolean
  /** A real product bug at 320px, not yet fixed: what, where, by how many px. */
  fixme320?: string
}

/** Every screen gets the same three tests: its layout, its layout at 320px (phone only), and the scroll round trip. */
function screens(group: string, list: Screen[]) {
  test.describe(group, () => {
    for (const s of list) {
      test(s.name, async ({ page }) => {
        test.skip(!!s.desktopOnly && isPhone(), "desktop only")
        if (s.scroll) test.slow()
        await open(page, s.path)
        await s.prepare?.(page)
        await expectLayout(page, s.name)
        if (s.scroll) await scrollThrough(page, s.name)
      })

      test(`${s.name} at 320px`, async ({ page }) => {
        test.skip(isDesktop() || !!s.desktopOnly, "phone width only")
        test.fixme(!!s.fixme320, s.fixme320)
        if (s.scroll) test.slow()
        await page.setViewportSize({ width: 320, height: 640 })
        await open(page, s.path)
        await s.prepare?.(page)
        await expectLayout(page, `${s.name} at 320px`)
        if (s.scroll) await scrollThrough(page, `${s.name} at 320px`)
      })
    }
  })
}

// ── Jobs list ───────────────────────────────────────────────────────────────

const search = (page: Page, text: string) => page.getByPlaceholder("Search by job title…").filter({ visible: true }).first().fill(text)

/** Opens the Filters control (a popover on desktop, a bottom sheet on phones), ticks `option`, applies it. */
async function applyFilter(page: Page, option: string) {
  await page.getByRole("button", { name: /^Filters/ }).filter({ visible: true }).first().click()
  await settle(page)
  await page.getByText(option, { exact: true }).filter({ visible: true }).first().click()
  await settle(page)
  if (isPhone()) await page.getByRole("button", { name: "Apply filters" }).click()
  else await page.keyboard.press("Escape")
  await settle(page, 800)
}

screens("jobs list", [
  { name: "all jobs", path: "/apnahire/jobs", scroll: true },
  { name: "active", path: "/apnahire/jobs?tab=active" },
  { name: "under review", path: "/apnahire/jobs?tab=under_review" },
  { name: "draft", path: "/apnahire/jobs?tab=draft" },
  { name: "expired", path: "/apnahire/jobs?tab=expired" },
  {
    name: "search with matches",
    path: "/apnahire/jobs",
    prepare: async (page) => {
      await search(page, "sales")
      await settle(page, 800)
    },
  },
  {
    name: "search with no match",
    path: "/apnahire/jobs",
    prepare: async (page) => {
      await search(page, "zzzz")
      await settle(page, 800)
    },
  },
  {
    name: "location filter applied",
    path: "/apnahire/jobs",
    prepare: (page) => applyFilter(page, "Bengaluru"),
  },
])

// ── ECC job page ────────────────────────────────────────────────────────────

async function pickView(page: Page, view: "Detailed cards" | "Compact list" | "Table") {
  await page.getByRole("button", { name: view }).filter({ visible: true }).first().click()
  await settle(page, 800)
}

async function openSideFilters(page: Page) {
  await page.getByRole("button", { name: /^Filters/ }).filter({ visible: true }).first().click()
  await settle(page, 800)
}

screens("ECC job page", [
  { name: "default", path: ECC, scroll: true },
  { name: "no applicants (active leads)", path: `${ECC}?applicants=0`, scroll: true },
  { name: "database tab", path: `${ECC}?tab=database` },
  { name: "profile sheet open", path: `${ECC}?leadId=aditi` },
  { name: "side filter panel, closed", path: `${ECC}?filters=side`, desktopOnly: true },
  {
    name: "side filter panel, open",
    path: `${ECC}?filters=side`,
    desktopOnly: true,
    prepare: openSideFilters,
    scroll: true,
  },
  {
    name: "compact view",
    path: ECC,
    prepare: (page) => pickView(page, "Compact list"),
    scroll: true,
  },
  {
    name: "table view",
    path: ECC,
    desktopOnly: true,
    prepare: (page) => pickView(page, "Table"),
    scroll: true,
  },
  {
    name: "filter applied (results bar)",
    path: ECC,
    prepare: async (page) => {
      await applyFilter(page, "Graduate")
      await expect(page.getByText(/Showing \d+ of \d+/).filter({ visible: true }).first()).toBeVisible()
    },
    scroll: true,
    fixme320:
      "Results bar, 'Showing N of M' + '· 1 filter  Clear' (jobs/[id]/page.tsx DockingBar): at 320px the nowrap " +
      "'· 1 filter / Clear' span ends 16px past the screen, Clear is cut off and the page scrolls sideways",
  },
  {
    name: "pipeline: shortlisted",
    path: ECC,
    prepare: async (page) => {
      await page.getByText(/^Shortlisted \(\d+\)/).filter({ visible: true }).first().click()
      await settle(page, 800)
    },
  },
])

// ── Other job states ────────────────────────────────────────────────────────

screens("job states", [
  { name: "expired job", path: "/apnahire/jobs/field-sales-expired" },
  { name: "under review job", path: "/apnahire/jobs/field-sales-pune-review" },
  { name: "draft job", path: "/apnahire/jobs/customer-support-draft" },
  { name: "active job, other", path: "/apnahire/jobs/delivery-andheri" },
])

// ── Chats (the Express inbox) ───────────────────────────────────────────────

screens("chats", [
  { name: "inbox", path: "/apnahire/chats", scroll: true },
  { name: "thread", path: "/apnahire/chats/t-ravi" },
  { name: "thread not found", path: "/apnahire/chats/nobody" },
])

// ── Every other product route ───────────────────────────────────────────────

screens("product routes", [
  { name: "dashboard", path: "/apnahire/dashboard" },
  { name: "campus AI", path: "/apnahire/campus-ai" },
  { name: "settings", path: "/apnahire/settings" },
  { name: "profile", path: "/apnahire/profile" },
  { name: "support", path: "/apnahire/support" },
  { name: "plan", path: "/apnahire/plan" },
  { name: "usage", path: "/apnahire/usage" },
  { name: "reports", path: "/apnahire/reports" },
  { name: "notifications", path: "/apnahire/notifications" },
  { name: "database: search candidates", path: "/apnahire/database/search-candidates" },
  { name: "database: unlocked candidates", path: "/apnahire/database/unlocked-candidates" },
  { name: "database: saved searches", path: "/apnahire/database/saved-searches" },
  { name: "invite centre: database WhatsApp invites", path: "/apnahire/invite-centre/database-wa-invites" },
  { name: "invite centre: job WhatsApp connects", path: "/apnahire/invite-centre/job-wa-connects" },
  { name: "new interview round", path: "/apnahire/jobs/rounds/new" },
  { name: "sidebar specs", path: "/apnahire/sidebar-specs" },
  { name: "sidebar specs, interactive", path: "/apnahire/sidebar-specs/interactive" },
])

// ── Screenshots (local only) ────────────────────────────────────────────────

test.describe("screenshots", () => {
  test("@visual jobs list", async ({ page }) => {
    await open(page, "/apnahire/jobs")
    await rest(page)
    await expect(page).toHaveScreenshot("app-jobs.png", { fullPage: true })
  })

  test("@visual ECC job page", async ({ page }) => {
    await open(page, ECC)
    await rest(page)
    await expect(page).toHaveScreenshot("app-ecc.png", { fullPage: true })
  })

  test("@visual ECC job page, no applicants", async ({ page }) => {
    await open(page, `${ECC}?applicants=0`)
    await rest(page)
    await expect(page).toHaveScreenshot("app-ecc-no-applicants.png", { fullPage: true })
  })
})
