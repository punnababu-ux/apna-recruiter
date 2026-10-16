/** /products/database — content/products.ts, rendered by ProductPage. */

import type { Metadata } from "next"
import { ProductPage } from "@/components/marketing/product-page"
import { PRODUCT_PAGES } from "@/content/products"

const content = PRODUCT_PAGES["database"]

export const metadata: Metadata = { title: content.metaTitle, description: content.metaDescription }

export default function Page() {
  return <ProductPage content={content} />
}
