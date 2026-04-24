"use client"

/**
 * ThemeProvider — wraps `next-themes` with our conventions.
 *
 * Applies the theme class to `<html>` via `attribute="class"`, defaulting to
 * the user's system preference. `disableTransitionOnChange` prevents the
 * brief transition flash when the .dark class toggles — every component
 * re-renders simultaneously, so animating that flip looks glitchy.
 *
 * Usage: already mounted at the root layout. Consumers shouldn't import this
 * directly — use `useTheme()` from `next-themes` instead.
 */

import type { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
