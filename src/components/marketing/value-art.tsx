/**
 * ValueArt — a stack card's 3D clay picture (Culture's values, Join us's
 * Life at apna, the Lounge's How it works): its 3D clay object
 * (public/images/company/values/<name>.png) once generated. Until then, a
 * stand-in of the same size and weight: the value's icon on a large
 * frosted disc, so the card's layout is final and the swap is one line
 * (READY below).
 */

import type { ComponentType } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Award,
  Info,
  CircleAlert,
  IndianRupee,
  Wallet,
  PhoneCall,
  Ban,
  UserCheck,
  MapPin,
  Pencil,
  Clock,
  Briefcase,
  CheckCircle2,
  Flag,
  BarChart2,
  Building2,
  CalendarCheck,
  DoorOpen,
  GraduationCap,
  Headset,
  HeartHandshake,
  KeyRound,
  Landmark,
  MessagesSquare,
  Rocket,
  Scale,
  Search,
  Share2,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  Wrench,
  Zap,
} from "@apna/design-system"

export type ValueName =
  | "ownership"
  | "customer-obsession"
  | "empathy"
  | "transparency"
  // Life at apna (Join us)
  | "momentum"
  | "ownership-over-hierarchy"
  | "raise-the-bar"
  // The Lounge's audiences
  | "student"
  | "university"
  | "government"
  // The Lounge's How it works
  | "deploy"
  | "access"
  | "practise"
  | "improve"
  | "track"
  // Enterprise: the exclusive features, then "Plus you will get"
  | "employer-branding"
  | "team-management"
  | "enterprise"
  | "ats-integrations"
  | "reports"
  | "power-features"
  | "dedicated-support"
  | "smart-inbound"
  | "database-search"
  | "walk-ins"
  // About: the mission band
  | "mission"
  // The contact pop-up, beside "Get in touch with us"
  | "contact"
  // The product's emotional beats (the only clay inside the product):
  // a success moment, an empty search, a page still to come
  | "success"
  | "no-results"
  | "coming-soon"
  // Pop-ups: one object beside the title
  | "job-types"
  | "draft"
  | "city-lock"
  | "lounge-access"
  // Not allowed / no access (not used yet)
  | "restricted"
  // AI calling agent (not used yet)
  | "ai-calling"
  // Balance, payments (not used yet)
  | "wallet"
  | "coin"
  | "alert"
  | "info"
  | "expired"

const ICON: Record<ValueName, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  ownership: KeyRound,
  "customer-obsession": Target,
  empathy: HeartHandshake,
  transparency: Scale,
  momentum: Rocket,
  "ownership-over-hierarchy": KeyRound,
  "raise-the-bar": TrendingUp,
  student: GraduationCap,
  university: Building2,
  government: Landmark,
  deploy: Wrench,
  access: DoorOpen,
  practise: MessagesSquare,
  improve: TrendingUp,
  track: BarChart2,
  "employer-branding": Award,
  "team-management": Users,
  enterprise: Building2,
  "ats-integrations": Share2,
  reports: BarChart2,
  "power-features": Zap,
  "dedicated-support": Headset,
  "smart-inbound": UserPlus,
  "database-search": Search,
  "walk-ins": CalendarCheck,
  mission: Flag,
  contact: MessagesSquare,
  success: CheckCircle2,
  "no-results": Search,
  "coming-soon": Rocket,
  "job-types": Briefcase,
  draft: Pencil,
  "city-lock": MapPin,
  "lounge-access": UserCheck,
  restricted: Ban,
  "ai-calling": PhoneCall,
  wallet: Wallet,
  coin: IndianRupee,
  alert: CircleAlert,
  info: Info,
  expired: Clock,
}

/** Values whose clay image is in public/images/company/values. */
const READY = new Set<ValueName>([
  "enterprise",
  "ownership",
  "customer-obsession",
  "empathy",
  "transparency",
  "momentum",
  "ownership-over-hierarchy",
  "raise-the-bar",
  "student",
  "university",
  "government",
  "deploy",
  "access",
  "practise",
  "improve",
  "track",
  // Enterprise — PROTOTYPE renders: each has its file name engraved on it
  // (a generator slip); Punna will regenerate without the names.
  "employer-branding",
  "team-management",
  "ats-integrations",
  "reports",
  "power-features",
  "dedicated-support",
  "smart-inbound",
  "database-search",
  "walk-ins",
  "mission",
  "contact",
  "success",
  "coming-soon",
  "no-results",
  "job-types",
  "draft",
  "city-lock",
  "lounge-access",
  "restricted",
  "ai-calling",
  "wallet",
  "coin",
  "alert",
  "info",
  "expired",
])

/** sm: a picture at the top of a grid card (Enterprise's features).
 *  xs: beside a heading (the contact pop-up's title). */
export function ValueArt({ name, size = "lg" }: { name: ValueName; size?: "xs" | "sm" | "md" | "lg" }) {
  if (READY.has(name)) {
    return (
      <Image
        src={`/images/company/values/${name}.png`}
        alt=""
        width={320}
        height={320}
        // Served as-is: Next's re-encode (WebP/AVIF at q75) smears the
        // transparent edges into a visible fringe. The PNGs are 640px already.
        unoptimized
        className={cn(
          "object-contain",
          size === "xs" ? "size-16 shrink-0" : size === "sm" ? "size-32" : size === "md" ? "size-48 sm:size-56" : "size-56 md:size-72 lg:size-80"
        )}
      />
    )
  }
  const Icon = ICON[name]
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full border border-card/60 bg-surface-glass shadow-card backdrop-blur-xl",
        size === "xs" ? "size-14 shrink-0" : size === "sm" ? "size-20" : size === "md" ? "size-32" : "size-48 md:size-64"
      )}
    >
      <Icon
        className={cn("text-foreground", size === "xs" ? "size-6" : size === "sm" ? "size-8" : size === "md" ? "size-12" : "size-16 sm:size-20")}
        aria-hidden
      />
    </span>
  )
}
