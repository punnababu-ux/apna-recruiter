/**
 * usePlanCardStyle — the phone plan cards' look (both checkouts:
 * MobilePlanRow, MobileUnlimitedCard), fixed since the prototype switch was
 * removed (user call, 2026-11-02):
 *
 *   layout     "line"   every card lists what it includes in one line;
 *                       nothing opens or closes.
 *   selection  "check"  green edge and a tick in the corner.
 *
 * The "expand", "tint", "right" and "left" branches in mobile-plan-row.tsx
 * are no longer reachable. shortcut: kept as hooks returning the final
 * values so callers need no change; inline them when those branches go.
 */

export type PlanCardLayout = "line" | "expand"
export type PlanCardSelection = "right" | "left" | "tint" | "check"

export const usePlanCardLayout = (): PlanCardLayout => "line"
export const usePlanCardSelection = (): PlanCardSelection => "check"
