/**
 * Company-page illustrations, in the homepage product cards' language: a
 * pastel tile (IllustrationTile) with crisp floating snippets of apna's own
 * UI on it. Names and numbers in the snippets are illustrative, except the
 * headline stats, which are the content files' own.
 *
 *   BridgeIllustration  About hero: a job seeker and a business, matched
 *                       through apna, with the platform's three big numbers
 *   SeekerIllustration  "For job seekers": a nearby job, interview prep, the
 *                       application on WhatsApp
 *
 * Decorative (`aria-hidden` on the tile). Inside a `group` the snippets
 * lift a little on hover.
 */

import {
  ApnaLogo,
  Avatar,
  AvatarFallback,
  Badge,
  Building2,
  CheckCircle2,
  MapPin,
  Sparkles,
  WhatsApp,
} from "@apna/design-system"
import { Float, IllustrationTile, Lines } from "@/components/marketing/product-illustrations"
import { cn } from "@/lib/utils"

export function BridgeIllustration({ className }: { className?: string }) {
  return (
    <IllustrationTile tone="green" size="lg" className={className}>
      <div className="flex w-72 flex-col gap-3">
        <Float className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>PS</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-semibold text-foreground">Priya S.</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              Nashik
            </span>
          </div>
          <Badge variant="outline" className="shrink-0">Job seeker</Badge>
        </Float>

        {/* The bridge: apna in the middle, the match on it. */}
        <div className="flex items-center gap-2 self-center">
          <span className="h-px w-8 bg-primary/40" />
          <Float className="flex items-center gap-2 rounded-full px-3 py-1.5">
            <ApnaLogo className="size-5" />
            <Badge variant="success">
              <CheckCircle2 />
              Matched
            </Badge>
          </Float>
          <span className="h-px w-8 bg-primary/40" />
        </div>

        <Float className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
            <Building2 className="size-4" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">Hiring 12 roles</span>
            <Lines widths={["w-20"]} />
          </div>
          <Badge variant="outline" className="shrink-0">Business</Badge>
        </Float>
      </div>
    </IllustrationTile>
  )
}

export function SeekerIllustration({ className }: { className?: string }) {
  return (
    <IllustrationTile tone="sky" size="lg" className={className}>
      <div className="flex w-64 flex-col gap-2">
        <Float className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-foreground">Customer Support Executive</span>
            <Badge variant="outline" className="shrink-0">
              <MapPin />2 km
            </Badge>
          </div>
          <span className="text-xs font-medium text-foreground">₹18,000 – ₹25,000 /month</span>
          <Lines widths={["w-28", "w-20"]} />
        </Float>
        <Float className={cn("ml-6 flex items-center gap-2 py-2")}>
          <Sparkles className="size-4 shrink-0 text-primary" />
          <span className="text-xs font-semibold text-foreground">Interview prep · 8/10 ready</span>
        </Float>
        <Float className="flex items-center gap-2 self-start py-2">
          <WhatsApp className="size-4 shrink-0 text-primary" />
          <span className="text-xs font-semibold text-foreground">Application sent</span>
        </Float>
      </div>
    </IllustrationTile>
  )
}
