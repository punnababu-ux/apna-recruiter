"use client"

/**
 * HeroPostJob — PREVIEW (`/?hero=post-job`, 2026-10-23). The homepage hero
 * with one "Post a job" button in place of the phone sign-up card. It goes
 * to the login page, then on to posting. Like the card's CTA, it hands its
 * green to the header once it scrolls away (useTrackHeroCta).
 */

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Button } from "@apna/design-system"
import { useTrackHeroCta } from "@/hooks/use-hero-cta-hidden"

export function HeroPostJob({ href }: { href: string }) {
  const ref = React.useRef<HTMLAnchorElement>(null)
  useTrackHeroCta(ref)
  return (
    <Button
      size="lg"
      className="w-full sm:w-fit"
      nativeButton={false}
      render={<Link ref={ref} href={href} />}
      trailingIcon={<ArrowRight aria-hidden />}
    >
      Post a job
    </Button>
  )
}
