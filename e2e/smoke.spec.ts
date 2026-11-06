import { expect, test } from "@playwright/test"
import { SELF, open } from "./helpers"

test("self-checkout opens signed in", async ({ page }) => {
  await open(page, SELF)
  await expect(page.getByText("*GST applicable", { exact: true }).filter({ visible: true }).first()).toBeVisible()
})
