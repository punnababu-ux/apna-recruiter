"use client"

/**
 * ThemeToggle — three-state theme switch (light / dark / system).
 *
 * Renders a DropdownMenu of options. Uses a Sun icon that rotates-out when
 * dark, a Moon icon that rotates-in — classic shadcn pattern. Avoids
 * hydration mismatch by gating on `mounted`: until the client hydrates,
 * `next-themes` doesn't know which theme to serve, so we render a stable
 * placeholder.
 *
 * API:
 *   <ThemeToggle />
 *
 * a11y: the trigger button has an aria-label; the dropdown items describe
 * the current state via a checkmark on the active option.
 */

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const EMPTY_SUBSCRIBE = () => () => {}
/** True after client hydration; false during SSR and first paint. */
function useMounted(): boolean {
  return useSyncExternalStore(
    EMPTY_SUBSCRIBE,
    () => true,
    () => false,
  )
}

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  // Stable placeholder during SSR / first paint — avoids icon flicker.
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Toggle theme"
        data-slot="theme-toggle"
      >
        <Sun className="size-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Toggle theme"
            data-slot="theme-toggle"
          >
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {theme === "light" && "✓ "}Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {theme === "dark" && "✓ "}Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {theme === "system" && "✓ "}System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
