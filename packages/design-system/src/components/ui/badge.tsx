import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent font-medium whitespace-nowrap transition-interactive focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        info:
          "bg-info/10 text-info focus-visible:ring-info/20 dark:bg-info/20 dark:focus-visible:ring-info/40 [a]:hover:bg-info/20",
        success:
          "bg-success/10 text-success focus-visible:ring-success/20 dark:bg-success/20 dark:focus-visible:ring-success/40 [a]:hover:bg-success/20",
        warning:
          "bg-warning-subtle text-warning-subtle-foreground focus-visible:ring-warning/20 dark:bg-warning/20 dark:focus-visible:ring-warning/40 [a]:hover:bg-warning/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        /* The two checkout/pricing-card pills. Both sit on surfaces that stay
         * light in either theme, so they use the fixed checkout-* roles rather
         * than --info / --success, which remap in dark. Pair `ribbon` with
         * size="ribbon" for the corner treatment. */
        // --ribbon-fill / --ribbon-fg: solid blue on light; on dark the
        // sidebar "New" tag's tint, opaque (see semantic.css).
        ribbon:
          "bg-ribbon-fill font-semibold text-ribbon-fg",
        discount:
          "bg-checkout-discount-bg font-semibold text-checkout-discount-fg",
        /* Unread / attention marker on an icon: a solid red count (size
         * "count") or a bare dot (size "dot"). Ring it in the surface it sits
         * on (`ring-2 ring-card`) so it cuts out of the icon. */
        count: "bg-destructive font-semibold text-destructive-foreground",
        /* Translucent pills that tint the surface under them instead of
         * sitting on it as a block: `on-dark` lightens a dark/gradient
         * surface (offer headers, solid banners), `on-tint` darkens a light
         * tinted one (and lightens it in dark mode, as foreground flips). */
        "on-dark": "bg-surface-inverted-fg/15 font-semibold text-surface-inverted-fg",
        "on-tint": "bg-foreground/15 font-semibold text-foreground",
      },
      size: {
        default: "h-5 px-2 py-0.5 text-xs",
        sm: "h-4 px-1.5 py-0 text-2xs",
        /* Marketing "eyebrow" pills sit above a headline and need to read at
         * arm's length, unlike the in-table and in-card badges above. */
        lg: "h-7 gap-1.5 px-3 py-1 text-xs [&>svg]:size-3.5!",
        /* Card corner ribbon: square except for the inside corner, so it sits
         * flush in the card's top-right. The card must clip it
         * (`overflow-hidden`). Deliberately no `[&>svg]:size-*` override —
         * the base's 12px is what the designs draw, and a second !important
         * size here would just fight it. */
        ribbon: "h-5 rounded-none rounded-bl-xl px-4 py-0.5 text-xs",
        count: "h-4 min-w-4 rounded-full px-1 py-0 text-2xs leading-none",
        dot: "size-2.5 rounded-full p-0",
      },
    },
    compoundVariants: [
      /* The % OFF pill has one size everywhere (plan cards, upsell tiles,
       * phone rows, the order summary): the small one, so it sits beside a
       * price and its struck price without wrapping them (plan type scale,
       * styles/index.css). */
      { variant: "discount", size: "default", class: "h-4 px-1.5 py-0 text-2xs" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }
