import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge doesn't know our custom `text-*` utilities, so it reads
 *  them as text *colours* — and `cn("text-h3", "text-foreground")` silently
 *  dropped the type preset. Registering them as font sizes keeps both. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "3xs",
            "2xs",
            "display-lg",
            "display",
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
