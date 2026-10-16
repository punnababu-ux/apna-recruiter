import type { Metadata } from "next"
import { Suspense } from "react"
import { RequireSession } from "@/components/apnahire/require-session"

/**
 * /apnahire — Apna Hire sub-brand root layout.
 *
 * All Apna Hire surfaces render as children here. Product pages nest the
 * sidebar shell inside `(product)/layout.tsx`; spec/showcase pages like
 * `/apnahire/sidebar-specs` render without a shell.
 *
 * Typeface: Inter, inherited from the design system's `--font-body` /
 * `--font-heading` roles — no scope-local override. The typeface is set once,
 * globally (root layout + `--font-family-sans`), never per surface.
 *
 * This is the authenticated in-product surface (dashboard, jobs, credits —
 * reached from a session, not from search), so it's excluded from indexing
 * here rather than per-page. `/pricing`, the public twin of `/apnahire/
 * credits`, is NOT under this layout — it's under `(marketing)`, where the
 * root's default (indexable) metadata applies.
 *
 * Signed-out visits go to /login and come back (RequireSession).
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ApnaHireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-full">
      <Suspense fallback={null}>
        <RequireSession>{children}</RequireSession>
      </Suspense>
    </div>
  )
}
