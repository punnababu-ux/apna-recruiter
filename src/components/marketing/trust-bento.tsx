/**
 * TrustBento — ALTERNATE (not on any page; kept 2026-10-24). A trust band
 * for the homepage in place of TrustedByBand, after the Clay homepage's: one muted panel in its own white band,
 * a two-line sentence, then a gliding bento of white tiles three rows
 * high. Tiles mix the kinds of proof we have, so the row reads as evidence
 * rather than a logo strip:
 *
 *   logo     a client's logo alone (one or two to a row slot)
 *   result   a client's logo and their outcome in a few words (HOME_TRUST)
 *   metric   one of our outcome numbers and what it counts
 *
 * No full quotes (those live in "Why hire from apna?") and no press.
 *
 * The bento is a run of columns of different widths, each holding two or
 * three tiles of different heights, so nothing lines up across columns. It glides like LogoWall's marquee (pauses on hover; reduced motion:
 * a plain scrollable row).
 *
 * Copy: content/home.ts (HOME_TRUST, HOME_PROOF), content/logos.ts.
 */

import { Card } from "@apna/design-system"
import { HOME_PROOF, HOME_TRUST } from "@/content/home"
import { CLIENT_LOGOS } from "@/content/logos"
import { cn } from "@/lib/utils"

const LOGO = Object.fromEntries(CLIENT_LOGOS.map((l) => [l.name, l]))
const RESULT = Object.fromEntries(HOME_TRUST.results.map((r) => [r.company, r]))
const METRIC = HOME_PROOF.why.stats

/** A tile's height: "s" 80px, "m" 112px, "l" 144px, "fill" whatever its
 *  column has left. Columns mix them (and differ in width), so no row lines
 *  up with the next column's: an uneven bento, not a grid. */
type Size = "s" | "m" | "l" | "fill"

type Tile = { size: Size } & (
  | { kind: "logos"; names: string[] }
  | { kind: "result"; company: string }
  | { kind: "metric"; index: number }
)

const SIZE: Record<Size, string> = { s: "h-20", m: "h-28", l: "h-36", fill: "flex-1" }

/** The run of columns, each the same total height (h-90), in five widths. */
const COLUMNS: { width: string; tiles: Tile[] }[] = [
  { width: "w-96", tiles: [{ size: "l", kind: "result", company: "Shadowfox" }, { size: "fill", kind: "logos", names: ["Paytm", "Jio"] }, { size: "s", kind: "logos", names: ["Flipkart"] }] },
  { width: "w-56", tiles: [{ size: "s", kind: "logos", names: ["Swiggy"] }, { size: "fill", kind: "result", company: "Tata 1mg" }] },
  { width: "w-80", tiles: [{ size: "m", kind: "logos", names: ["Axis Bank", "HDFC Bank"] }, { size: "fill", kind: "metric", index: 1 }, { size: "s", kind: "logos", names: ["Zomato"] }] },
  { width: "w-64", tiles: [{ size: "fill", kind: "metric", index: 0 }, { size: "l", kind: "logos", names: ["Uber"] }] },
  { width: "w-96", tiles: [{ size: "s", kind: "logos", names: ["Urban Company", "Tech Mahindra"] }, { size: "l", kind: "result", company: "Nizams" }, { size: "fill", kind: "logos", names: ["BigBasket"] }] },
  { width: "w-60", tiles: [{ size: "m", kind: "logos", names: ["Aditya Birla Capital"] }, { size: "fill", kind: "metric", index: 2 }, { size: "s", kind: "logos", names: ["Bajaj Allianz"] }] },
]

// eslint-disable-next-line @next/next/no-img-element
const Logo = ({ name }: { name: string }) => <img src={LOGO[name].src} alt={name} height={28} width={LOGO[name].width} className="h-7 w-auto" />

const TILE = "flex rounded-card-nested bg-card p-4"

function TileView({ tile }: { tile: Tile }) {
  const height = SIZE[tile.size]
  // Tall enough to stack its logo over the result rather than beside it.
  const tall = tile.size === "fill" || tile.size === "l"
  switch (tile.kind) {
    case "logos":
      return (
        <div className={cn("flex gap-3", height)}>
          {tile.names.map((name) => (
            <div key={name} className={cn(TILE, "flex-1 items-center justify-center")}>
              <Logo name={name} />
            </div>
          ))}
        </div>
      )
    case "result": {
      // The customer's outcome, Clay's way: their logo, then the number
      // and what it counts (beside it on a wide tile, under it on a tall one).
      const r = RESULT[tile.company]
      return (
        <div className={cn(TILE, height, tall ? "flex-col justify-between" : "items-center justify-between gap-4")}>
          <span className="flex shrink-0 items-center">
            <Logo name={tile.company} />
          </span>
          <span className={cn("flex flex-col gap-1", !tall && "items-end text-right")}>
            <span className="text-h4 font-semibold text-foreground tabular-nums">{r.value}</span>
            <span className="max-w-48 text-overline text-muted-foreground">{r.label}</span>
          </span>
        </div>
      )
    }
    case "metric": {
      const m = METRIC[tile.index]
      return (
        <div className={cn(TILE, height, "flex-col justify-center gap-1")}>
          <span className="text-h3 font-semibold text-foreground tabular-nums">{m.value}</span>
          <span className="text-overline text-muted-foreground line-clamp-2">{m.label}</span>
        </div>
      )
    }
  }
}

function Run({ copy }: { copy: number }) {
  return (
    <div aria-hidden={copy > 0 || undefined} className="flex shrink-0 gap-3 pr-3 motion-reduce:[&:not(:first-child)]:hidden">
      {COLUMNS.map((column, i) => (
        <div key={i} className={cn("flex h-90 flex-col gap-3", column.width)}>
          {column.tiles.map((tile, j) => (
            <TileView key={j} tile={tile} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function TrustBento() {
  return (
    <Card tone="muted" padding="none" className="flex flex-col gap-8 overflow-hidden py-10">
      <p className="mx-auto max-w-xl px-6 text-center text-lg text-pretty text-foreground">
        Trusted by India&apos;s leading employers, from neighbourhood shops to{" "}
        <span className="font-semibold">enterprises</span>. Proven by their{" "}
        <span className="font-semibold">hires</span>.
      </p>
      <div className="no-scrollbar w-full overflow-hidden mask-x-from-90% mask-x-to-100% motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee">
          <Run copy={0} />
          <Run copy={1} />
        </div>
      </div>
    </Card>
  )
}
