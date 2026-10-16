import { SectionChips } from "@/components/apnahire/mobile-chip-row"

/** Phones: the bottom bar's Invite tab opens the section; these chips move
 *  between its pages (the sidebar lists them from md). */
const INVITE_PAGES = [
  { href: "/apnahire/invite-centre/database-wa-invites", label: "Database WA invites" },
  { href: "/apnahire/invite-centre/job-wa-connects", label: "Job WA connects" },
]

export default function InviteCentreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionChips items={INVITE_PAGES} />
      {children}
    </>
  )
}
