/**
 * /onlyrounds — sub-brand root layout.
 *
 * Wraps every OnlyRounds surface in the `.theme-onlyrounds` class so the
 * gradient tokens (`--gradient-primary` / `--gradient-accent`) retune via
 * the CSS cascade. Product surfaces nest a sidebar shell under
 * `(product)/layout.tsx`; the `/tokens` showcase renders without a shell.
 */

export default function OnlyRoundsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="theme-onlyrounds min-h-full">{children}</div>
}
