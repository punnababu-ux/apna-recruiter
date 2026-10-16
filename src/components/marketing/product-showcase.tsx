"use client"

/**
 * ProductShowcase — the homepage's "apna hiring suite": one interactive
 * showcase in place of the old product grid + alternating detail rows
 * (which said the same four things twice, over placeholder icons).
 *
 *   ≥ lg   StoryTabs: the four products as tabs on the left — the active
 *          one opens its heading, two features and "Learn more" — beside a
 *          live demo. Advances by itself, story-style, until the viewer
 *          picks a product.
 *   < lg   the products as the house segmented switcher / phone chip row
 *          (SegmentedTabSwitcher, checkout look), the demo, then the
 *          active product's details under it. Phones switch by tapping —
 *          the demos themselves keep the motion.
 *
 * Copy: HOME_SUITE (names, taglines, icons) + HOME_PRODUCT_DETAILS
 * (headings, features), unchanged; hrefs from nav.ts PRODUCT_LINKS.
 */

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  InfinityIcon,
  PhoneCall,
  Search,
  SegmentedTabSwitcher,
  StoryTabs,
  type IconComponent,
} from "@apna/design-system"
import { HOME_PRODUCT_DETAILS, HOME_SUITE } from "@/content/home"
import { PRODUCT_LINKS } from "@/content/nav"
import { AiCallingDemo, DatabaseDemo, SmartJobsDemo, UnlimitedDemo } from "@/components/marketing/showcase-demos"

type ProductName = (typeof HOME_SUITE.items)[number]["name"]

const ICONS: Record<(typeof HOME_SUITE.items)[number]["icon"], IconComponent> = {
  briefcase: Briefcase,
  phone: PhoneCall,
  search: Search,
  infinity: InfinityIcon,
}

const DEMOS: Record<ProductName, React.ComponentType> = {
  "Smart Jobs": SmartJobsDemo,
  "AI Calling Agent": AiCallingDemo,
  "Hyperlocal Database": DatabaseDemo,
  "apna Unlimited": UnlimitedDemo,
}

/** Phone chips can't fit four full names. */
const SHORT_LABELS: Partial<Record<ProductName, string>> = {
  "AI Calling Agent": "AI Calling",
  "Hyperlocal Database": "Database",
  "apna Unlimited": "Unlimited",
}

const hrefFor = (name: string) => PRODUCT_LINKS.find((p) => p.label === name)?.href ?? "#"

function ProductDetails({ name }: { name: ProductName }) {
  const product = HOME_PRODUCT_DETAILS.find((p) => p.name === name)!
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-medium text-foreground">{product.heading}</p>
      <ul className="flex flex-col gap-3">
        {product.features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-foreground">{feature.title}</p>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link
        href={hrefFor(name)}
        className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary"
      >
        Learn more <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  )
}

export function ProductShowcase() {
  const [value, setValue] = React.useState<ProductName>(HOME_SUITE.items[0].name)

  return (
    <div className="flex flex-col gap-6">
      <SegmentedTabSwitcher
        className="lg:hidden"
        appearance="checkout"
        items={HOME_SUITE.items.map((item) => {
          const Icon = ICONS[item.icon]
          return {
            value: item.name,
            label: item.name,
            shortLabel: SHORT_LABELS[item.name],
            description: item.tagline,
            icon: <Icon aria-hidden />,
          }
        })}
        value={value}
        onValueChange={setValue}
        mobileBleedClassName="-mx-4 sm:-mx-8"
        mobileGutterClassName="px-4 sm:px-8"
      />

      <StoryTabs
        label="apna products"
        value={value}
        onValueChange={setValue}
        listClassName="max-lg:hidden"
        items={HOME_SUITE.items.map((item) => {
          const Icon = ICONS[item.icon]
          return {
            value: item.name,
            title: item.name,
            description: item.tagline,
            icon: <Icon />,
            details: <ProductDetails name={item.name} />,
          }
        })}
        renderPanel={(name) => {
          const Demo = DEMOS[name]
          return <Demo />
        }}
      />

      <div className="lg:hidden">
        <ProductDetails name={value} />
      </div>
    </div>
  )
}
