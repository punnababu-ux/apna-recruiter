/**
 * Button — base interactive surface.
 *
 * API
 *   <Button variant="default|outline|secondary|ghost|destructive|success|link|checkout|checkout-inset|emphasis"
 *           size="xs|sm|default|lg|icon|icon-xs|icon-sm|icon-lg"
 *           leadingIcon={<Plus />}     // optional leading icon
 *           trailingIcon={<ArrowRight />} // optional trailing icon
 *           loading         // shows spinner, disables pointer events
 *           loadingText />  // optional replacement label during loading
 *
 * Interaction (live surfaces — see styles/index.css):
 *   - `ink`: a press spreads an ink from the touch point that settles into
 *     the hover state. `press`: compresses to --press-scale while held.
 *   - `transition-interactive`: colour, border, shadow and focus ring ease
 *     instead of snapping.
 *
 * RULE — one primary CTA per screen. `default` / `checkout` (green) is the
 * single action the screen exists for: "Proceed to pay", "Post job", the
 * recommended plan's "Buy now". When something else on the same screen
 * must still be pushed hard — an add-on or upsell ("Add AI calling agent",
 * database credits' "Add") — use `variant="emphasis"` (dark gray), never a
 * second green button. `emphasis` is only ever a companion: never the only
 * CTA on a screen and never more than one per section; anything less
 * important than that is `outline`.
 *
 * Exception — step-by-step flows (WizardFooter): every step's CTA ("Next",
 * "Get started", "Draft my job") is `emphasis`, even as the screen's only
 * CTA, and green is kept for the single action that commits (post / pay).
 * A flow of twenty green "Next"s would leave the commit nothing to stand
 * out with.
 *
 * Loading behaviour:
 *   - A Spinner renders in the leading icon slot.
 *   - `aria-busy="true"` is set so assistive tech announces the state.
 *   - Pointer events are blocked via `disabled`, so no extra guard needed
 *     in parent click handlers.
 *   - If `loadingText` is provided it replaces `children` for the duration
 *     of the loading state — useful when the default label would still
 *     read as "Submit" while the action is in flight.
 */

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

const buttonVariants = cva(
  "group/button ink press relative inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-heading whitespace-nowrap transition-interactive outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xs active:bg-primary/95 aria-expanded:bg-primary/90",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/60 hover:bg-secondary/70 hover:border-border hover:shadow-2xs active:bg-secondary/90 aria-expanded:bg-secondary/80 dark:border-border/30 dark:hover:bg-secondary/80",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 hover:border-destructive/40 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        success:
          "bg-success/10 text-success border border-success/30 hover:bg-success/20 hover:border-success/50 focus-visible:border-success/50 focus-visible:ring-success/20 dark:bg-success/20 dark:hover:bg-success/30 dark:focus-visible:ring-success/40",
        // A text link has no surface to fill — no ink, no compression.
        link: "text-primary underline-offset-4 hover:underline before:hidden active:scale-100",
        /* Self-checkout CTAs. `--checkout-primary` is fixed across themes
         * (--primary brightens a step in dark), matching a surface that is
         * deliberately light in both. */
        checkout:
          "bg-checkout-primary text-checkout-primary-foreground hover:bg-checkout-primary-hover active:bg-checkout-primary-hover",
        /* The secondary CTA on a fixed-white inset card — e.g. the white box
         * inside the always-dark Unlimited card. `outline` cannot be used
         * there: it carries dark: overrides that would paint a dark button on
         * a box that stays white. */
        "checkout-inset":
          "border-checkout-inset-border bg-checkout-inset text-checkout-inset-fg hover:bg-checkout-inset-hover",
        /* "Plans": the promoted way to buy — the gold-on-plum offer gradient
         * (the subscription offer's), white label, a gold `Coin` icon. Same
         * look as the bottom bar's raised Plans tile and the sidebar's
         * plans link. For that one destination only. */
        premium:
          "bg-gradient-offer-premium text-surface-inverted-fg shadow-xs hover:shadow-sm hover:brightness-110 active:brightness-95",
        /* Dark-gray push for a screen whose green primary is already taken
         * (add-ons, upsells) — see the one-primary RULE above. */
        emphasis:
          "bg-cta-emphasis text-cta-emphasis-foreground hover:bg-cta-emphasis-hover active:bg-cta-emphasis-hover",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 text-sm font-semibold font-heading has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2 text-xs font-semibold font-heading in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-2.5 text-xs font-semibold font-heading in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-4 text-base font-medium font-heading has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-9",
        "icon-xs":
          "size-6 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Show a spinner and block interaction. Sets aria-busy for a11y. */
    loading?: boolean
    /** Optional label to replace children while loading. */
    loadingText?: React.ReactNode
    /** Optional icon element to render before children. Mutually exclusive with trailingIcon. */
    leadingIcon?: React.ReactNode
    /** Optional icon element to render after children. Mutually exclusive with leadingIcon. */
    trailingIcon?: React.ReactNode
  }

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  loadingText,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  ...props
}: ButtonProps) {
  // Mutually exclusive rule: A button can have either leadingIcon OR trailingIcon, never both.
  // leadingIcon takes precedence if both are provided.
  const activeTrailingIcon = leadingIcon ? undefined : trailingIcon

  const renderedLeadingIcon = React.isValidElement(leadingIcon)
    ? React.cloneElement(leadingIcon as React.ReactElement<{ "data-icon"?: string }>, {
        "data-icon": "inline-start",
      })
    : leadingIcon

  const renderedTrailingIcon = React.isValidElement(activeTrailingIcon)
    ? React.cloneElement(activeTrailingIcon as React.ReactElement<{ "data-icon"?: string }>, {
        "data-icon": "inline-end",
      })
    : activeTrailingIcon

  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={props.nativeButton ?? (props.render ? false : undefined)}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <>
          <Spinner data-icon="inline-start" />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {renderedLeadingIcon}
          {children}
          {renderedTrailingIcon}
        </>
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
