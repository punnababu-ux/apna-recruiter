import type { Metadata } from "next"

/**
 * Installing apna Recruiter on a phone ("Add to Home Screen" / "Install
 * app") from the product or its login: the home-screen icon is the apna
 * Recruiter app icon, not the website's apna icon. The browser tab keeps
 * the apna favicon. Assets in public/recruiter/:
 *   apple-touch-icon.png   180, full-bleed square (iOS rounds it)
 *   icon-192 / icon-512    the icon as drawn (Android's install list)
 *   icon-maskable-512      padded square (launchers that crop to a shape)
 */
export const RECRUITER_INSTALL: Pick<Metadata, "manifest" | "appleWebApp" | "icons"> = {
  manifest: "/recruiter/manifest.webmanifest",
  appleWebApp: { capable: true, title: "apna Recruiter", statusBarStyle: "default" },
  icons: { apple: "/recruiter/apple-touch-icon.png" },
}
