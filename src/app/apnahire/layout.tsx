import type { Metadata } from "next"

/**
 * /apnahire — Apna Hire sub-brand root layout.
 *
 * All Apna Hire surfaces render as children here. Product pages nest the
 * sidebar shell inside `(product)/layout.tsx`; spec/showcase pages like
 * `/apnahire/sidebar-specs` render without a shell.
 *
 * Typeface: Figtree, inherited from the design system's `--font-body` /
 * `--font-heading` roles — no scope-local override. Apna Hire's Figma files
 * are drawn in Inter and this layout used to re-root the font tokens to
 * match them, but the brand typeface is the source of truth; if Inter wins
 * that argument it should change globally in the token layer, not here.
 *
 * This is the authenticated in-product surface (dashboard, jobs, credits —
 * reached from a session, not from search), so it's excluded from indexing
 * here rather than per-page. `/pricing`, the public twin of `/apnahire/
 * credits`, is NOT under this layout — it's under `(marketing)`, where the
 * root's default (indexable) metadata applies.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ApnaHireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-full">{children}</div>
}
