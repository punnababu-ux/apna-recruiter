"use client"

import * as React from "react"
import { Alert, AlertTitle } from "./alert"
import { XIcon } from "@/icons/icons"
import { cn } from "@/lib/utils"

export interface AlertBannerProps extends Omit<React.ComponentProps<typeof Alert>, "title"> {
  /** Optional icon to display on the left. E.g., <CreditCardIcon className="size-4" /> */
  icon?: React.ReactNode
  /** Main message text */
  title: React.ReactNode
  /** Action link configurations */
  action?: {
    label: React.ReactNode
    onClick: () => void
  }
  /** If provided, renders a close icon on the right */
  onClose?: () => void
  /** Defaults to true. Removes the prominent border from the alert for a clean banner look. */
  borderless?: boolean
  /** Style appearance. 'secondary' is subtle background, 'primary' is solid gradient */
  appearance?: "primary" | "secondary"
  /** Collapsed icon-only mode for compact containers like sidebars */
  collapsed?: boolean
}

const accentColorMap: Record<string, string> = {
  default: "text-foreground",
  destructive: "text-destructive",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
}

const primaryBgMap: Record<string, string> = {
  default: "bg-gradient-banner-default text-white",
  destructive: "bg-gradient-banner-destructive text-white",
  success: "bg-gradient-banner-success text-white",
  warning: "bg-gradient-banner-warning text-gray-950",
  info: "bg-gradient-banner-info text-white",
}

const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  (
    {
      className,
      variant,
      icon,
      title,
      action,
      onClose,
      borderless = true,
      appearance = "secondary",
      collapsed = false,
      ...props
    },
    ref
  ) => {
    const isPrimary = appearance === "primary"
    const safeVariant = variant || "default"
    const accentColor = isPrimary ? "text-white" : accentColorMap[safeVariant]
    const textColor = isPrimary ? "text-white" : "text-foreground"

    if (collapsed) {
      return (
        <Alert
          ref={ref}
          variant={isPrimary ? undefined : variant}
          className={cn(
            "flex size-10 items-center justify-center p-0 rounded-xl transition-all duration-200 shrink-0 mx-auto",
            borderless && "border-transparent shadow-none",
            isPrimary && cn("bg-transparent", primaryBgMap[safeVariant]),
            className
          )}
          {...props}
        >
          {icon && (
            <div className={cn("flex items-center justify-center [&>svg]:size-4", accentColor)}>
              {icon}
            </div>
          )}
        </Alert>
      )
    }

    return (
      <Alert
        ref={ref}
        variant={isPrimary ? undefined : variant}
        className={cn(
          "relative flex items-center justify-between gap-2.5 py-2.5 px-3 rounded-lg text-left",
          borderless && "border-transparent shadow-none",
          isPrimary && cn("bg-transparent", primaryBgMap[safeVariant]),
          className
        )}
        {...props}
      >
        <div className="flex flex-1 items-center gap-2.5 min-w-0">
          {icon && (
            <div className={cn("shrink-0 flex items-center justify-center [&>svg]:size-4", accentColor)}>
              {icon}
            </div>
          )}
          <div className="flex-1 text-xs leading-normal min-w-0">
            <AlertTitle className={cn("inline font-medium !mb-0 mr-1.5 leading-normal", textColor)}>
              {title}
            </AlertTitle>
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  "group inline-flex items-center font-semibold underline underline-offset-4 hover:opacity-80 focus-visible:outline-none rounded-sm align-baseline cursor-pointer whitespace-nowrap",
                  accentColor
                )}
              >
                {action.label}
              </button>
            )}
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer -mr-1",
              textColor
            )}
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </Alert>
    )
  }
)

AlertBanner.displayName = "AlertBanner"

export { AlertBanner }
