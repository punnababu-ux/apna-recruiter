"use client"

import * as React from "react"
import {
  Briefcase,
  CreditCard,
  HelpCircle,
  Plus,
  Settings,
  Users,
} from "lucide-react"

import { OnlyRoundsLogoMark } from "@/components/ui/logo-onlyrounds"
import {
  ReusableSidebar,
  type SidebarWorkspace,
  type SidebarNavItem,
} from "@/components/ui/app-sidebar"

const WORKSPACES: SidebarWorkspace[] = [
  {
    id: "gamma",
    name: "Gamma Workspace",
    subtext: "Free Tier",
    fallbackLetter: "G",
  },
  {
    id: "talentpass",
    name: "Apna TalentPass",
    subtext: "Enterprise Plan",
    fallbackLetter: "A",
    logoUrl: "/vercel.svg",
  },
  {
    id: "beta",
    name: "Beta Design System",
    subtext: "Pro Plan",
    fallbackLetter: "B",
  },
]

const NAV: SidebarNavItem[] = [
  {
    href: "/onlyrounds/jobs",
    label: "Jobs",
    icon: Briefcase,
    items: [
      { href: "/onlyrounds/jobs", label: "All Jobs" },
      { href: "/onlyrounds/jobs/new", label: "Create Job" },
    ],
  },
  { href: "/onlyrounds/clients", label: "Clients", icon: Users },
  { href: "/onlyrounds/credits", label: "Credits", icon: CreditCard },
  { href: "/onlyrounds/sidebar-showcase", label: "Sidebar Specs", icon: Settings },
]

export function OnlyRoundsSidebar() {
  const [activeWorkspaceId, setActiveWorkspaceId] = React.useState<string>(WORKSPACES[0].id)

  const handleWorkspaceChange = (w: SidebarWorkspace) => {
    setActiveWorkspaceId(w.id)
  }

  return (
    <ReusableSidebar
      brand={{
        name: "OnlyRound AI",
        logo: <OnlyRoundsLogoMark className="-ml-1 size-7!" />,
        href: "/onlyrounds/jobs",
      }}
      workspaces={WORKSPACES}
      activeWorkspaceId={activeWorkspaceId}
      onWorkspaceChange={handleWorkspaceChange}
      navItems={NAV}
      bottomCta={{
        label: "Create Job",
        icon: Plus,
        href: "/onlyrounds/jobs/new",
      }}
      alertBanner={{
        id: "onlyrounds-upgrade-alert",
        title: "Upgrade Account",
        description: "Get access to advanced matching filters.",
        ctaText: "Learn more",
      }}
      footerItems={[
        {
          href: "/onlyrounds/settings",
          label: "Settings",
          icon: Settings,
        },
        {
          href: "/onlyrounds/help",
          label: "Help",
          icon: HelpCircle,
        },
      ]}
    />
  )
}
