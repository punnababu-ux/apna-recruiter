"use client"

import * as React from "react"
import { Alert, AlertTitle } from "./alert"
import { XIcon } from "@/icons/icons"
import { cn } from "@/lib/utils"
import { bannerAccentColorMap, bannerPrimaryBgMap } from "../../lib/banner-tone"

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
  /** Standalone CTA rendered at the end of the banner (e.g. a `<Button>`).
   *  Use this instead of `action` when the call-to-action needs its own
   *  visual weight rather than an inline underlined link — e.g. a promo
   *  banner's "Upgrade @ ₹9,999/yr" button. The banner doesn't style it;
   *  pass a pre-styled Button the same way `PricingCard`'s `cta` works. */
  cta?: React.ReactNode
  /** If provided, renders a close icon on the right */
  onClose?: () => void
  /** Defaults to true. Removes the prominent border from the alert for a clean banner look. */
  borderless?: boolean
  /** Style appearance. 'secondary' is subtle background, 'primary' is solid gradient */
  appearance?: "primary" | "secondary"
  /** Collapsed icon-only mode for compact containers like sidebars */
  collapsed?: boolean
}

const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  (
    {
      className,
      variant,
      icon,
      title,
      action,
      cta,
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
    const accentColor = isPrimary ? "text-white" : bannerAccentColorMap[safeVariant]
    const textColor = isPrimary ? "text-white" : "text-foreground"
    // A standalone `cta` (a Button) is a fixed-width block, unlike `action`'s
    // inline underlined link which flows with the text — on a narrow card it
    // can't share a row with an icon pill and a headline without overflowing
    // or crushing the text. Stack icon → title → cta instead, keyed to the
    // card's own width (`@container`, not a viewport breakpoint) since this
    // banner is often docked somewhere narrower than the browser window.
    const hasCta = Boolean(cta)

    if (collapsed) {
      return (
        <Alert
          ref={ref}
          variant={isPrimary ? undefined : variant}
          className={cn(
            "flex size-10 items-center justify-center p-0 rounded-xl transition-all duration-200 shrink-0 mx-auto",
            borderless && "border-0 shadow-none",
            isPrimary && cn("bg-transparent", bannerPrimaryBgMap[safeVariant]),
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
          // @container: a container query can't be evaluated against the
          // element that declares it — only its descendants can query it —
          // so the container lives on the Alert root and the actual
          // flex-direction switch lives on a child of it, below.
          "@container/alert-banner relative py-2.5 px-3 rounded-lg text-left",
          borderless && "border-0 shadow-none",
          isPrimary && cn("bg-transparent", bannerPrimaryBgMap[safeVariant]),
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex gap-2.5",
            hasCta
              ? "flex-col items-start gap-3 @lg/alert-banner:flex-row @lg/alert-banner:items-center @lg/alert-banner:justify-between"
              : "items-center justify-between"
          )}
        >
          <div
            className={cn(
              "flex min-w-0 items-center gap-2.5",
              hasCta ? "flex-col items-start gap-2 @lg/alert-banner:flex-1 @lg/alert-banner:flex-row @lg/alert-banner:items-center" : "flex-1"
            )}
          >
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

          {cta && <div className="shrink-0">{cta}</div>}

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
        </div>
      </Alert>
    )
  }
)

AlertBanner.displayName = "AlertBanner"

export { AlertBanner }
