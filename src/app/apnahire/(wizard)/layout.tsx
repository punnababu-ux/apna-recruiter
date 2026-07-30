/**
 * /apnahire/(wizard) — distraction-free layout.
 *
 * Intentionally has NO sidebar and NO product top bar.
 * The wizard itself provides its own sticky top bar with a back link and
 * the step-progress rail.
 */

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
