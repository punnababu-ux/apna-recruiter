"use client"

/**
 * SplitButton — primary action paired with a dropdown of related actions.
 *
 * Composition of ButtonGroup + DropdownMenu. The main label/handler drives
 * the left side; the right side opens the overflow menu. Used for the
 * "Share Job ▾" header pattern in the Jobs list.
 */

import { ChevronDown } from "lucide-react"

import { Button, type buttonVariants } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { VariantProps } from "class-variance-authority"

type ButtonVariantProps = VariantProps<typeof buttonVariants>

export function SplitButton({
  children,
  onClick,
  menu,
  variant = "default",
  size = "default",
}: {
  children: React.ReactNode
  onClick?: () => void
  menu: React.ReactNode
  variant?: ButtonVariantProps["variant"]
  size?: ButtonVariantProps["size"]
}) {
  return (
    <ButtonGroup>
      <Button variant={variant} size={size} onClick={onClick}>
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant={variant}
              size={size}
              aria-label="More actions"
              className="px-2"
            >
              <ChevronDown className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
