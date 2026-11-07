import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { expectNoCollapsedButtons, expectNoHorizontalOverflow, settle } from "./helpers"

/**
 * Per-component browser tests: every design-system category page and the product pop-ups page, in light and in
 * dark, on phone and desktop. Three checks per page and theme:
 *   layout   no sideways scroll, no collapsed buttons          (CI)
 *   a11y     axe WCAG 2.1 A/AA, with the KNOWN list below        (CI)
 *   @visual  full-page screenshot, desktop only                (local only, macOS baselines)
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

const KNOWN: Known[] = [
  // ── Parked: white text on the dark green (docs/status/TODO.md, \"Express\" > Dark mode contrast) ───────────
  {
    rule: "color-contrast",
    match: /#(fafafa|ffffff)>#00a86b/,
    theme: "dark",
    nodes: "~12 (actions), 2-6 elsewhere",
    what: "Dark --primary / --checkout-primary is green-500 with white text: 2.95:1 and 3.08:1, under 4.5:1. Every solid green Button, Badge `default` and Avatar fallback, on actions, data-layout, display, marketing, overlays. Product-wide token decision, parked 2026-11-04.",
  },
  // ── Light and dark: tinted fills carry role-coloured text that is too faint ──────────────────────────────
  {
    rule: "color-contrast",
    match: /#dc2626>#fce9e9/,
    theme: "light",
    nodes: "3",
    what: "Button `destructive` (soft: text-destructive on destructive/10) on the actions page: 4.13:1.",
  },
  {
    rule: "color-contrast",
    match: /#226cca>#e7eef8/,
    theme: "light",
    nodes: "1",
    what: "Badge `info` size sm (10px, text-info on info/10): 4.42:1.",
  },
  {
    rule: "color-contrast",
    match: /#f59e0b>#ffffff/,
    theme: "light",
    nodes: "1",
    what: "Display page demo \"6 pending feedback\": text-warning (amber-500) on white is 2.14:1. Demo-only: the warning role colour is for fills, not text.",
  },
  {
    rule: "color-contrast",
    match: /#009966>#(d9f5ec|182e2c)/,
    theme: "both",
    nodes: "1",
    what: "Display page \"JD\" avatar fallback hand-painted with bg-emerald-500/15 + a raw emerald text (3.17:1 light, 3.92:1 dark). A demo that bypasses the Avatar tones; use the success role.",
  },
  {
    rule: "color-contrast",
    match: /#1f8268>#f4f4f5/,
    theme: "light",
    nodes: "1",
    what: "Marketing page eyebrow `text-overline text-primary` on the muted band: 4.29:1 (AGENTS.md says eyebrows are gray, not green).",
  },
  {
    rule: "color-contrast",
    match: /#1f8268>#f4f9f7/,
    theme: "light",
    nodes: "1",
    what: "Navigation page link chip (text-primary on primary/5, to /apnahire/sidebar-specs/interactive): 4.43:1.",
  },
  {
    rule: "color-contrast",
    match: /#418573>#e6f7f0/,
    theme: "light",
    nodes: "1",
    what: "Inputs page selectable-card description (text-accent-foreground/80 on the accent fill): 3.92:1.",
  },
  {
    rule: "color-contrast",
    match: /#(dc2626>#fee2e2|f87171>#7f1d1d)/,
    theme: "both",
    nodes: "2-3",
    what: "Outline and banner text in the destructive colour on the destructive tint: 3.95:1 light / 3.62:1 dark.",
  },
  {
    rule: "color-contrast",
    match: /data-variant="outline"[\s\S]*#(1f8268>#c6efe0|00a86b>#0e4134)/,
    theme: "both",
    nodes: "1",
    what: "Outline Badge `lg` in text-success on the success tint (feedback page): 3.77:1 light / 3.73:1 dark. Banner links on that tint are fixed; this badge is not.",
  },
  {
    rule: "color-contrast",
    match: /#(6b6b74>#(fee2e2|c6efe0)|a1a1aa>#(7f1d1d|78350f|0e4134))/,
    theme: "both",
    nodes: "2-3",
    what: "Struck-out price (line-through text-muted-foreground) on the destructive / warning / success banner tints, feedback page and the dark warning tint on navigation: 3.5-4.5:1.",
  },
  {
    rule: "color-contrast",
    match: /#09090b>#78350f/,
    theme: "dark",
    nodes: "1",
    what: "Navigation page \"Verify Identity\" banner: text-warning-foreground (near-black) on the dark warning tint (amber-900) is 2.19:1. The -foreground token is for solid fills (AGENTS.md), not tints.",
  },
]

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
