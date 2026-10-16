"use client"

import * as React from "react"
import { Briefcase, CreditCard, Database, HelpCircle, IndianRupee, Mail, BarChart2, Trophy } from "@apna/design-system"

import {
  ReusableSidebar,
  ApnaLogo,
  LogoApnaHire,
  LogoApnaWordmark,
  type SidebarWorkspace,
  type SidebarNavItem,
} from "@apna/design-system"
import { Badge } from "@apna/design-system"
import { useActiveSubscription } from "@/hooks/use-active-subscription"
import { ACCOUNT_ALERT, useAccountAlert } from "@/hooks/apnahire/use-account-alert"

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
    // Usage, invoices and credit history (not built yet), never checkout:
    // only "View plans" / "Manage plans" below lead to buying.
    href: "/apnahire/usage",
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
  /** Overrides the account's subscription state (the specs page's toggle). */
  hasActiveSubscription?: boolean
}

export function ApnaHireSidebar({
  activeWorkspaceId: controlledId,
  onWorkspaceChange,
  // Account-level: shown on every product page until verified.
  showAlert = true,
  alertTitle = ACCOUNT_ALERT.title,
  alertCtaText = ACCOUNT_ALERT.ctaText,
  alertVariant = ACCOUNT_ALERT.variant,
  alertAppearance = ACCOUNT_ALERT.appearance,
  alertShowClose = true,
  hasActiveSubscription,
}: ApnaHireSidebarProps) {
  const subscribed = useActiveSubscription()
  // Shared with the phone More card: dismissing here clears it there.
  const account = useAccountAlert()
  const hasPlan = hasActiveSubscription ?? subscribed
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
        // The apna Hire wordmark expanded, "apna" alone collapsed. `!`
        // because the sidebar's menu button sizes every svg to 20px.
        wordmark: <LogoApnaHire className="h-6! w-auto!" />,
        // 40px: the collapsed rail's tile width, its widest.
        collapsedLogo: <LogoApnaWordmark className="h-auto! w-10!" />,
        href: "/apnahire/dashboard",
      }}
      workspaces={WORKSPACES}
      activeWorkspaceId={activeWorkspaceId}
      onWorkspaceChange={handleWorkspaceChange}
      navItems={NAV}
      alertBanner={
        showAlert && account.alert
          ? {
              id: `ah-alert-${alertVariant}-${alertAppearance}`,
              title: alertTitle,
              ctaText: alertCtaText || undefined,
              variant: alertVariant,
              appearance: alertAppearance,
              showClose: alertShowClose,
              onDismiss: account.dismiss,
            }
          : undefined
      }
      // Under the banner: plans, always one tap away. With an active
      // subscription it manages that plan instead of selling one.
      bottomCta={
        hasPlan
          ? { label: "Manage plans", icon: IndianRupee, href: "/apnahire/credits" }
          : { label: "View plans", icon: IndianRupee, href: "/pricing" }
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

