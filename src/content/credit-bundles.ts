/**
 * Credit bundles — self-checkout's Jobs and Database tabs, the single job
 * credit and the upsell pack, for today's plans and the new plans. Which
 * set sells is the pricing phase (content/plan-catalog.ts): read them
 * through usePlans(), never from here.
 */

export interface Bundle {
  id: string
  credits: number
  subcopy: string
  validDays: number
  price: number
  mrp: number
  discountPct: number
  pricePerCredit: number
  /** Price from Jan 1, 2027, while it is announced (content/price-change.ts). */
  janPrice?: number
  recommended?: boolean
}

export type BundleId = Bundle["id"]

/** Database credit bundles have no Jan price: unchanged on Jan 1. */
export type DbBundle = Omit<Bundle, "janPrice">
export type DbBundleId = DbBundle["id"]

/** The upsell from the biggest job bundle. Not a card on the page — only
 *  offered in the pop-up. */
export interface UpsellPack {
  credits: number
  price: number
  mrp: number
  validDays: number
  janPrice?: number
}

const SUBCOPY = ["Ideal for small teams", "Perfect for growing businesses", "Best fit for larger hiring needs"]

/* ───────────────────────────────────── new plans ──────────────────────── */
/* The proposed online plans sheet (2026-10-22). Job credits: struck at the
 * ₹699 single-credit price; % OFF and per-credit are the sheet's, rounded to
 * whole numbers (22 credits: ₹454.50 → ₹455). Database credits: struck at
 * ₹14 each; per-credit is the sheet's own figure. */

export const JOB_BUNDLES: Bundle[] = [
  { id: "3", credits: 3, subcopy: SUBCOPY[0], validDays: 30, price: 1999, janPrice: 2099, mrp: 2097, discountPct: 5, pricePerCredit: 666 },
  { id: "6", credits: 6, subcopy: SUBCOPY[1], validDays: 90, price: 3649, janPrice: 3999, mrp: 4194, discountPct: 13, pricePerCredit: 608, recommended: true },
  { id: "22", credits: 22, subcopy: SUBCOPY[2], validDays: 365, price: 9999, janPrice: 10999, mrp: 15378, discountPct: 35, pricePerCredit: 455 },
]

/** Single job credit, reached via "I need a single job credit". */
export const SINGLE_CREDIT: Bundle = {
  id: "1",
  credits: 1,
  subcopy: "Buy exactly what you need",
  validDays: 30,
  price: 699,
  janPrice: 749,
  mrp: 899,
  discountPct: 22,
  pricePerCredit: 699,
}

/** The sheet's "Upsell" pack, offered from the 22-credit bundle: 47 job
 *  credits for ₹19,999 (₹426 /credit, valid 360 days). Struck at ₹699 a
 *  credit, like the bundles (derived; the sheet gives none). No Jan price. */
export const UPSELL_PACK: UpsellPack = { credits: 47, price: 19999, mrp: 47 * 699, validDays: 360 }

export const DB_BUNDLES: DbBundle[] = [
  { id: "200", credits: 200, subcopy: SUBCOPY[0], validDays: 30, price: 1999, mrp: 2800, discountPct: 29, pricePerCredit: 10 },
  { id: "450", credits: 450, subcopy: SUBCOPY[1], validDays: 90, price: 3649, mrp: 6300, discountPct: 42, pricePerCredit: 8.1, recommended: true },
  { id: "1600", credits: 1600, subcopy: SUBCOPY[2], validDays: 365, price: 9999, mrp: 22400, discountPct: 55, pricePerCredit: 6.25 },
]

/* ───────────────────────────────────── today ──────────────────────────── */
/* The plans live before the sheet (git, 2026-10-22). */

export const TODAY_JOB_BUNDLES: Bundle[] = [
  { id: "3", credits: 3, subcopy: SUBCOPY[0], validDays: 30, price: 1949, mrp: 2499, discountPct: 22, pricePerCredit: 650 },
  { id: "6", credits: 6, subcopy: SUBCOPY[1], validDays: 90, price: 3649, mrp: 4194, discountPct: 13, pricePerCredit: 608, recommended: true },
  { id: "13", credits: 13, subcopy: SUBCOPY[2], validDays: 180, price: 7099, mrp: 8999, discountPct: 21, pricePerCredit: 546 },
]

export const TODAY_SINGLE_CREDIT: Bundle = { ...SINGLE_CREDIT, janPrice: undefined }

/** Offered from the 13-credit bundle. */
export const TODAY_UPSELL_PACK: UpsellPack = { credits: 22, price: 9999, mrp: 15378, validDays: 360 }

export const TODAY_DB_BUNDLES: DbBundle[] = [
  { id: "170", credits: 170, subcopy: SUBCOPY[0], validDays: 30, price: 1949, mrp: 3170, discountPct: 38, pricePerCredit: 11.5 },
  { id: "380", credits: 380, subcopy: SUBCOPY[1], validDays: 90, price: 3649, mrp: 6840, discountPct: 46, pricePerCredit: 9.6, recommended: true },
  { id: "900", credits: 900, subcopy: SUBCOPY[2], validDays: 180, price: 7099, mrp: 15750, discountPct: 54, pricePerCredit: 7.9 },
]
