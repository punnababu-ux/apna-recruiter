/**
 * check-alignment — the one-to-one comparison rule, measured (AGENTS.md:
 * "Side-by-side choices compare one to one").
 *
 * Run it in the browser on any page with plan cards or upsell tiles (paste
 * into the console, or via an agent's page-eval tool). It finds every
 * [data-compare-card] on screen, groups the cards that sit side by side (same
 * top), and checks each marked line — [data-compare="price"],
 * "price-suffix", "cta", and the upsell rows — starts at the same height in
 * every card of the group. Returns { ok, problems }.
 *
 * PricingCard and OfferChoice carry the marks; a new comparison surface
 * adds data-compare-card / data-compare="…" the same way.
 */
;(() => {
  const TOL = 2 // px
  const visible = (el) => {
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"
  }
  const cards = [...document.querySelectorAll("[data-compare-card]")].filter(visible)
  // Group by visual row: cards that overlap vertically by at least half of
  // the shorter one sit side by side (a card can start lower, under a logo
  // row, and still be in the row).
  const overlap = (a, b) => {
    const ra = a.getBoundingClientRect()
    const rb = b.getBoundingClientRect()
    const shared = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)
    return shared >= 0.5 * Math.min(ra.height, rb.height) && (ra.right <= rb.left || rb.right <= ra.left)
  }
  const groups = []
  for (const card of cards) {
    const g = groups.find((x) => x.cards.some((c) => overlap(c, card)))
    if (g) g.cards.push(card)
    else groups.push({ cards: [card] })
  }
  const problems = []
  for (const { cards: row } of groups.filter((g) => g.cards.length > 1)) {
    const own = (card, key) =>
      [...card.querySelectorAll(`[data-compare="${key}"]`)].find(
        (el) => el.closest("[data-compare-card]") === card && visible(el)
      )
    const keys = new Set(row.flatMap((c) => [...c.querySelectorAll("[data-compare]")].map((e) => e.dataset.compare)))
    for (const key of keys) {
      const tops = row.map((card) => {
        const el = own(card, key)
        return el ? Math.round(el.getBoundingClientRect().top) : null
      })
      const present = tops.filter((t) => t != null)
      const label = (card) => (card.querySelector("p,h3")?.textContent || "card").trim().slice(0, 30)
      if (present.length && present.length < tops.length && key !== "price-suffix") {
        problems.push(`"${key}" missing in: ${row.filter((_, i) => tops[i] == null).map(label).join(", ")}`)
      }
      if (present.length > 1 && Math.max(...present) - Math.min(...present) > TOL) {
        problems.push(`"${key}" not level: ${row.map((c, i) => `${label(c)} @${tops[i]}`).join(" | ")}`)
      }
    }
  }
  return { ok: problems.length === 0, groups: groups.filter((g) => g.cards.length > 1).length, problems }
})()
