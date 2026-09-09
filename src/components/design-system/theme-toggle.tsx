"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "@apna/design-system"
import { Button } from "@apna/design-system"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="xs" className="w-24 opacity-0" aria-label="Toggle Theme">
        Theme
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="xs"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="gap-1.5 cursor-pointer font-mono text-2xs"
    >
      {isDark ? (
        <>
          <Sun className="size-3.5 text-amber-400" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="size-3.5 text-slate-700" />
          <span>Dark Mode</span>
        </>
      )}
    </Button>
  )
}
