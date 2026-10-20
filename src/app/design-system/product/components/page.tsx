/**
 * Product › Component catalog — every component built on the design system
 * for the website and the apps: what it is, where it's used, its rules, and
 * a link to see it live. Data: ../catalog.ts.
 */

import Link from "next/link"
import { Button } from "@apna/design-system"
import { PRODUCT_CATALOG } from "../catalog"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../showcase-blocks"

export default function ProductComponentsPage() {
  return (
    <ShowcasePage
      category="Product"
      title="Component catalog"
      description="Every component the website and the apps are built from, on top of the design system. Before building something new, find it here. A new product component gets an entry in catalog.ts in the same change."
    >
      {PRODUCT_CATALOG.map((group) => (
        <div key={group.title} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-h5 text-foreground">{group.title}</h2>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {group.entries.map((e) => (
              <ShowcaseEntry
                key={e.name}
                title={e.name}
                component={`src/components/${e.file}`}
                where={e.where}
                actions={
                  e.live ? (
                    <Button variant="outline" size="sm" nativeButton={false} render={<Link href={e.live} />}>
                      See it live
                    </Button>
                  ) : undefined
                }
              >
                <p className="text-sm text-foreground">{e.what}</p>
                <RuleList rules={e.rules} />
              </ShowcaseEntry>
            ))}
          </div>
        </div>
      ))}
    </ShowcasePage>
  )
}
