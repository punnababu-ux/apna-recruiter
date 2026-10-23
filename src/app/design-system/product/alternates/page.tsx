/**
 * Product › Alternates — finished components that aren't on any page yet,
 * kept so a design can swap them in. Each entry says what it replaces.
 */

import { TrustBento } from "@/components/marketing/trust-bento"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../showcase-blocks"

export const metadata = { title: "Alternates" }

export default function AlternatesPage() {
  return (
    <ShowcasePage
      category="Product"
      title="Alternates"
      description="Finished components that are not on any page. Each one is a drop-in alternative to a live component; swap it in where it says, and the live one comes out."
    >
      <ShowcaseEntry
        title="Trust bento"
        component='import { TrustBento } from "@/components/marketing/trust-bento"'
        where="Homepage, in place of TrustedByBand — as its own white band: <Section tone=&quot;card&quot; size=&quot;none&quot; className=&quot;pb-16&quot;><TrustBento /></Section>"
      >
        <TrustBento />
        <RuleList
          rules={[
            "Mixes client logos, client results (HOME_TRUST) and our numbers, so the row reads as evidence, not a logo strip.",
            "Glides like LogoWall and pauses on hover; reduced motion gets a plain scrollable row.",
            "Copy lives in content/home.ts (HOME_TRUST) and content/logos.ts.",
          ]}
        />
      </ShowcaseEntry>
    </ShowcasePage>
  )
}
