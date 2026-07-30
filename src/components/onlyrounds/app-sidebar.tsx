"use client"

import * as React from "react"
import {
  Briefcase,
  CreditCard,
  HelpCircle,
  Settings,
  Users,
} from "lucide-react"

import {
  ReusableSidebar,
  ApnaLogo,
  type SidebarWorkspace,
  type SidebarNavItem,
} from "@apna/design-system"

const WORKSPACES: SidebarWorkspace[] = [
  {
    id: "gamma",
    name: "Gamma Workspace",
    fallbackLetter: "G",
  },
  {
    id: "beta",
    name: "Beta Design System",
    fallbackLetter: "B",
  },
]

const NAV: SidebarNavItem[] = [
  { href: "/onlyrounds/jobs", label: "Jobs", icon: Briefcase },
  { href: "/onlyrounds/clients", label: "Clients", icon: Users },
  { href: "/onlyrounds/credits", label: "Credits", icon: CreditCard },
]

export interface OnlyRoundsSidebarProps {
  activeWorkspaceId?: string
  onWorkspaceChange?: (w: SidebarWorkspace) => void
}

export function OnlyRoundsSidebar({
  activeWorkspaceId: propActiveWorkspaceId,
  onWorkspaceChange,
}: OnlyRoundsSidebarProps) {
  const [internalActiveWorkspaceId, setInternalActiveWorkspaceId] = React.useState<string>(
    WORKSPACES[0].id
  )

  const activeWorkspaceId =
    propActiveWorkspaceId !== undefined ? propActiveWorkspaceId : internalActiveWorkspaceId

  const handleWorkspaceChange = (w: SidebarWorkspace) => {
    if (onWorkspaceChange) {
      onWorkspaceChange(w)
    } else {
      setInternalActiveWorkspaceId(w.id)
    }
  }

  return (
    <ReusableSidebar
      dropdownClassName="theme-onlyrounds"
      brand={{
        name: "Apna Hire",
        logo: <ApnaLogo className="size-8! shrink-0" />,
        href: "/apnahire/jobs",
      }}
      workspaces={WORKSPACES}
      activeWorkspaceId={activeWorkspaceId}
      onWorkspaceChange={handleWorkspaceChange}
      navItems={NAV}
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
