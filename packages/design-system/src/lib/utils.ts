import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge doesn't know our custom `text-*` utilities, so it reads
 *  them as text *colours* — and `cn("text-h3", "text-foreground")` silently
 *  dropped the type preset. Registering them as font sizes keeps both. */
const twMerge = extendTailwindMerge({
  extend: {
    // Semantic radius roles (`rounded-surface`, `rounded-hero`, …). Unknown
    // to tailwind-merge, `cn("rounded-surface", "rounded-3xl")` kept both
    // and the stylesheet order picked the winner — a card's corner override
    // silently did nothing.
    theme: {
      radius: ["field", "control", "surface", "card", "card-nested", "overlay", "hero", "pill"],
    },
    classGroups: {
      "font-size": [
        {
          text: [
            "3xs",
            "2xs",
            "display-lg",
            "display",
            "editorial-display",
            "editorial-h1",
            "editorial-h2",
            "quote-md",
            "quote-lg",
            "watermark",
            "display-fluid",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "body",
            "body-sm",
            "caption",
            "lead",
            "quote",
            "overline",
            "plan-name",
            "plan-price",
            "plan-price-compact",
            "plan-unit",
            "plan-strike",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Capitalise the first character of a string. */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
