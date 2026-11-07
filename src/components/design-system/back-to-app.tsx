"use client"

import Link from "next/link"
import { ArrowLeft, Button } from "@apna/design-system"

/** The docs header's way back to the product.
 *  A `<Link>` element passed as `render` loses its children: Base UI merges
 *  the button's empty children over them, so the label never shows and the
 *  link has no name. A render function puts the label on the link itself. */
export function BackToApp() {
  return (
    <Button
      variant="outline"
      size="xs"
      render={(props) => (
        <Link {...props} href="/apnahire/jobs">
          <ArrowLeft className="mr-1 size-3.5" aria-hidden />
          Back to apna Recruiter
        </Link>
      )}
    />
  )
}
