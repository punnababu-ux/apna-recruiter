import { SectionChips } from "@/components/apnahire/mobile-chip-row"

/** Phones: the bottom bar's Database tab opens the section; these chips move
 *  between its pages (the sidebar lists them from md). */
const DATABASE_PAGES = [
  { href: "/apnahire/database/search-candidates", label: "Search candidates" },
  { href: "/apnahire/database/saved-searches", label: "Saved searches" },
  { href: "/apnahire/database/unlocked-candidates", label: "Unlocked candidates" },
]

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionChips items={DATABASE_PAGES} />
      {children}
    </>
  )
}
