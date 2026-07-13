/**
 * /apnahire — Apna Hire sub-brand root layout.
 *
 * All Apna Hire surfaces render as children here. Product pages nest the
 * sidebar shell inside `(product)/layout.tsx`; spec/showcase pages like
 * `/apnahire/sidebar-specs` render without a shell.
 *
 * Font override: Apna Hire uses Inter instead of the system-wide Figtree.
 * We override the two semantic font-role tokens AND set font-family
 * explicitly on this div — because `body { font-family: var(--font-body) }`
 * in globals.css resolves at the body level and doesn't re-resolve when
 * --font-body is overridden deeper in the tree. Setting font-family here
 * re-roots inheritance so every element inside picks up Inter.
 */

export default function ApnaHireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-full"
      style={{
        // token-lint-ignore: CSS custom-property re-root for Apna Hire font scope.
        // --font-inter is loaded via next/font on <html>. We override the token
        // vars so text presets pick up Inter, and set fontFamily to break the
        // Figtree inheritance propagated from body { font-body }.
        ["--font-body" as string]:    "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        ["--font-heading" as string]: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif", // token-lint-ignore: scoped font-family re-root via CSS var, not a raw literal
      }}
    >
      {children}
    </div>
  )
}
