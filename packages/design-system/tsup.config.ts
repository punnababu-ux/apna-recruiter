import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: false,
  sourcemap: true,
  skipNodeModulesBundle: true,
  // Consumer-app-relative asset reference in the checkout-hero gradient
  // token (see semantic.css) — leave the url() as-is rather than trying
  // to resolve/bundle it as a local file; it's served from the consuming
  // Next.js app's /public at runtime, not from this package.
  external: ["/bg-ambient-mesh.jpg"],
})
