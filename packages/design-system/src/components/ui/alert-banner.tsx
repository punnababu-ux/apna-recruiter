"use client"

import * as React from "react"
import { Alert, AlertTitle } from "./alert"
import { XIcon } from "lucide-react"
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
}

const accentColorMap: Record<string, string> = {
  default: "text-foreground",
  destructive: "text-destructive",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
}

const primaryBgMap: Record<string, string> = {
  default: "bg-gradient-to-r from-muted to-muted/80",
  destructive: "bg-gradient-to-r from-destructive to-destructive/80",
  success: "bg-gradient-to-r from-success to-success/80",
  warning: "bg-gradient-to-r from-warning to-warning/80",
  info: "bg-gradient-to-r from-info to-info/80",
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
      ...props
    },
    ref
  ) => {
    const isPrimary = appearance === "primary"
    const safeVariant = variant || "default"
    const accentColor = isPrimary ? "text-white" : accentColorMap[safeVariant]
    const textColor = isPrimary ? "text-white" : "text-foreground"

    return (
      <Alert
        ref={ref}
        variant={isPrimary ? undefined : variant} // Remove variant class if primary so we can inject our own bg without conflict
        className={cn(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-2.5 px-3",
          borderless && "border-transparent shadow-none",
          onClose && "pr-8 sm:pr-3",
          isPrimary && primaryBgMap[safeVariant],
          className
        )}
        {...props}
      >
        <div className="flex flex-1 items-start sm:items-center gap-2">
          {icon && (
            <div className={cn("mt-0.5 shrink-0 sm:mt-0 flex items-center justify-center [&>svg]:size-4", accentColor)}>
              {icon}
            </div>
          )}
          <div className="flex-1 text-sm leading-snug pt-0.5 sm:pt-0">
            <AlertTitle className={cn("inline font-medium !mb-0 mr-1.5", textColor)}>
              {title}
            </AlertTitle>
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  "group inline-flex items-center font-semibold underline underline-offset-4 hover:opacity-80 focus-visible:outline-none rounded-sm align-baseline",
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
              "absolute right-2 top-2.5 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:static sm:right-auto sm:top-auto sm:-mr-1",
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
