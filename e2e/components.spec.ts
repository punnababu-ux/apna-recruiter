import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { expectNoCollapsedButtons, expectNoHorizontalOverflow, settle } from "./helpers"

/**
 * Per-component browser tests: every design-system category page and the product pop-ups page, in light and in
 * dark, on phone and desktop. Three checks per page and theme:
 *   layout   no sideways scroll, no collapsed buttons          (CI)
 *   a11y     axe WCAG 2.1 A/AA, with the KNOWN list below        (CI)
 *   @visual  full-page screenshot, desktop only                (macOS locally, Linux in CI)
 *
 * Dark mode: ThemeProvider (next-themes, attribute="class", storageKey "theme") puts `class="dark"` on <html>.
 * We seed `localStorage.theme` before the page loads and assert the class, so a run never depends on the
 * machine's colour scheme.
 */

const PAGES = [
  { name: "actions", path: "/design-system/components/actions" },
  { name: "data-layout", path: "/design-system/components/data-layout" },
  { name: "display", path: "/design-system/components/display" },
  { name: "feedback", path: "/design-system/components/feedback" },
  { name: "inputs", path: "/design-system/components/inputs" },
  { name: "marketing", path: "/design-system/components/marketing" },
  { name: "navigation", path: "/design-system/components/navigation" },
  { name: "overlays", path: "/design-system/components/overlays" },
  { name: "product pop-ups", path: "/design-system/product/pop-ups" },
]

const THEMES = ["light", "dark"] as const
type Theme = (typeof THEMES)[number]

/**
 * Known axe violations on the component pages, found 2026-11-06. Each entry names ONE shared cause and is matched
 * per node (rule + the node's selector and HTML), so the same rule failing on any other element still fails the
 * test, and so does a known cause that spreads to a new rule. `nodes` is the most nodes one page shows
 * (phone / desktop); `theme` says where it shows. Fix the cause, then delete the entry.
 */
type Known = { rule: string; match: RegExp; theme: "light" | "dark" | "both"; nodes: string; what: string }

const KNOWN: Known[] = []

const isDesktop = () => test.info().project.name === "desktop"

/** Loads a page with the theme chosen before first paint, and with the dev badge and caret hidden (as `open` does). */
async function load(page: Page, path: string, theme: Theme) {
  await page.addInitScript((theme) => {
    localStorage.setItem("theme", theme)
    const style = () => {
      const s = document.createElement("style")
      s.textContent = "nextjs-portal{display:none!important} *{caret-color:transparent!important}"
      document.head.appendChild(s)
    }
    if (document.head) style()
    else document.addEventListener("DOMContentLoaded", style)
  }, theme)
  await page.goto(path, { waitUntil: "networkidle" })
  await page.waitForTimeout(800)
  await expect(page.locator("html")).toHaveClass(theme === "dark" ? /(^|\s)dark(\s|$)/ : /^(?!.*\bdark\b)/)
}

/** The colour pair axe measured on a contrast failure, as `#fg>#bg`: it names the cause better than a selector. */
const colors = (n: { any: { data?: { fgColor?: string; bgColor?: string } }[] }) => {
  const d = n.any.find((c) => c.data?.fgColor)?.data
  return d ? `${d.fgColor}>${d.bgColor}` : ""
}

/** axe (WCAG 2.1 A/AA); fails on every node that is not KNOWN for this theme, as `id (impact): target`. */
async function expectAccessible(page: Page, theme: Theme) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude("nextjs-portal")
    .analyze()
  const fresh = violations.flatMap((v) =>
    v.nodes
      .filter(
        (n) =>
          !KNOWN.some(
            (k) =>
              k.rule === v.id &&
              (k.theme === "both" || k.theme === theme) &&
              k.match.test(`${n.target.join(" ")} ${n.html} ${colors(n)}`),
          ),
      )
      .map((n) => `${v.id} (${v.impact}): ${n.target.join(" ")} — ${n.html.slice(0, 120)} ${colors(n)}`),
  )
  expect(fresh, "new accessibility violations (not in KNOWN)").toEqual([])
}

/** Park the mouse in a corner so nothing is hovered while we measure or shoot. */
async function rest(page: Page) {
  const size = page.viewportSize()!
  await page.mouse.move(size.width - 2, size.height - 2)
  await settle(page, 600)
}

// The dev server compiles each page on first hit, and a long page under 7 workers can pass 30s.
test.describe.configure({ timeout: 90_000 })

for (const theme of THEMES) {
  test.describe(`components, ${theme} mode`, () => {
    for (const { name, path } of PAGES) {
      test(`${name}: layout`, async ({ page }) => {
        await load(page, path, theme)
        await rest(page)
        await expectNoHorizontalOverflow(page, `${name} (${theme})`)
        await expectNoCollapsedButtons(page)
      })

      test(`${name}: accessibility`, async ({ page }) => {
        await load(page, path, theme)
        await rest(page)
        await expectAccessible(page, theme)
      })

      test(`@visual ${name}`, async ({ page }) => {
        test.skip(!isDesktop(), "desktop only: phone screenshots of long demo pages add noise, not coverage")
        await load(page, path, theme)
        await rest(page)
        await expect(page).toHaveScreenshot(`${name.replace(/\s+/g, "-")}-${theme}.png`, {
          fullPage: true,
          // Animated demos: spinners, skeleton shimmers, the logo marquee.
          mask: [
            page.locator('[data-slot="spinner"], [data-slot="skeleton"], [data-slot="logo-wall"]'),
          ],
        })
      })
    }
  })
}
