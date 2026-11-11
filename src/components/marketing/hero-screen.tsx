/**
 * HeroScreen — the product under the homepage hero's form: a real capture of
 * a job's candidates page, on a soft green-and-sky light (`hero-glow`).
 * Desktop only: phones show no screen. The bottom fades into the page. No play button until there is a demo video.
 *
 * Capture: public/images/home/hero-dashboard-desktop.png (2x, lossless; served at quality 95 so text stays crisp), taken from
 * /apnahire/jobs/telecaller-koramangala (signed-in seed). Retake them when
 * that page changes.
 */

import Image from "next/image"
import { cn } from "@/lib/utils"

const ALT = "A job's candidates in apna: each applicant's experience, salary, AI match and a call button"

export function HeroScreen({ className }: { className?: string }) {
  return (
    // Desktop only (Punna, 2026-11-11): phones keep the hero to the form.
    <div className={cn("relative isolate hidden w-full md:block", className)}>
      <span aria-hidden className="hero-glow" />
      {/* A sheer glass frame (40%, light blur), the screen inset in it; the
          glow shows through. A deeper top edge (40px) reads as an empty
          browser bar, without fake dots or a URL. Flat at rest: the glass
          and glow give the lift, no shadow. */}
      <div className="mx-auto max-h-170 w-full max-w-6xl overflow-hidden rounded-card border border-card/60 bg-surface-glass-faint p-3 pt-10 backdrop-blur-md mask-b-from-70%">
        <div className="overflow-hidden rounded-card-nested border border-border bg-card">
          <Image src="/images/home/hero-dashboard-desktop.png" alt={ALT} width={2880} height={1800} sizes="(min-width: 1280px) 1152px, 90vw" quality={95} className="w-full" />
        </div>
      </div>
    </div>
  )
}
