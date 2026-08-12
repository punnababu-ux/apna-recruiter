"use client"

import * as React from "react"
import {
  Briefcase,
  CreditCard,
  Database,
  HelpCircle,
  Mail,
  BarChart2,
  Trophy,
} from "lucide-react"

import {
  ReusableSidebar,
  ApnaLogo,
  type SidebarWorkspace,
  type SidebarNavItem,
} from "@apna/design-system"
import { Badge } from "@apna/design-system"

const WORKSPACES: SidebarWorkspace[] = [
  {
    id: "ah-corp",
    name: "Rohini Enterprises",
    subtext: "Company",
    fallbackLetter: "R",
  },
  {
    id: "ah-tech",
    name: "Beta Tech Group",
    subtext: "Growth Tier",
    fallbackLetter: "B",
  },
]

const NAV: SidebarNavItem[] = [
  {
    href: "/apnahire/jobs",
    label: "Jobs",
    icon: Briefcase,
  },
  {
    label: "Database",
    icon: Database,
    items: [
      { href: "/apnahire/database/search-candidates", label: "Search Candidates" },
      { href: "/apnahire/database/saved-searches",    label: "Saved Searches" },
      { href: "/apnahire/database/unlocked-candidates", label: "Unlocked Candidates" },
    ],
  },
  {
    label: "Invite Centre",
    icon: Mail,
    items: [
      { href: "/apnahire/invite-centre/database-wa-invites", label: "Database WA Invites" },
      { href: "/apnahire/invite-centre/job-wa-connects",     label: "Job WA Connects" },
    ],
  },
  {
    href: "/apnahire/reports",
    label: "Reports",
    icon: BarChart2,
  },
  {
    href: "/apnahire/campus-ai",
    label: "Campus AI",
    icon: Trophy,
    badge: <Badge variant="info" className="ml-auto text-2xs px-1.5 py-0">New</Badge>,
  },
  {
    href: "/apnahire/credits",
    label: "Credits & Usage",
    icon: CreditCard,
  },
]

export interface ApnaHireSidebarProps {
  activeWorkspaceId?: string
  onWorkspaceChange?: (w: SidebarWorkspace) => void
  showAlert?: boolean
  alertTitle?: string
  alertCtaText?: string
  alertVariant?: "warning" | "info" | "destructive" | "success" | "default"
  alertAppearance?: "primary" | "secondary"
  alertShowClose?: boolean
}

export function ApnaHireSidebar({
  activeWorkspaceId: controlledId,
  onWorkspaceChange,
  showAlert = false,
  alertTitle = "Verify Identity: Complete tax verification to post jobs.",
  alertCtaText = "Verify",
  alertVariant = "warning",
  alertAppearance = "secondary",
  alertShowClose = true,
}: ApnaHireSidebarProps) {
  const [internalId, setInternalId] = React.useState(WORKSPACES[0].id)
  const activeWorkspaceId = controlledId ?? internalId
  const handleWorkspaceChange = (w: SidebarWorkspace) => {
    setInternalId(w.id)
    onWorkspaceChange?.(w)
  }

  return (
    <ReusableSidebar
      brand={{
        name: "Hire",
        logo: <ApnaLogo className="size-10! shrink-0" />,
        href: "/apnahire/dashboard",
      }}
      workspaces={WORKSPACES}
      activeWorkspaceId={activeWorkspaceId}
      onWorkspaceChange={handleWorkspaceChange}
      navItems={NAV}
      alertBanner={
        showAlert
          ? {
              id: `ah-alert-${alertVariant}-${alertAppearance}`,
              title: alertTitle,
              ctaText: alertCtaText || undefined,
              variant: alertVariant,
              appearance: alertAppearance,
              showClose: alertShowClose,
            }
          : undefined
      }
      footerItems={[
        {
          href: "/apnahire/support",
          label: "Support",
          icon: HelpCircle,
        },
      ]}
    />
  )
}

