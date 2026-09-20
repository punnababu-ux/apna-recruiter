import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@apna/design-system"],
  // Next's dev indicator defaults to bottom-left, where it sits on top of the
  // self-checkout auth-state switcher and eats its clicks. Dev-only overlay,
  // so moving it costs nothing in production.
  devIndicators: {
    position: "bottom-right",
  },
  async redirects() {
    return [
      // `/` used to redirect here because the root page was the component
      // showcase. The showcase now lives at /design-system/showcase and `/`
      // belongs to the marketing homepage.
      {
        source: "/onlyrounds",
        destination: "/apnahire/jobs",
        permanent: true,
      },
      {
        source: "/onlyrounds/:path*",
        destination: "/apnahire/:path*",
        permanent: true,
      },
      // The public pricing page moved out of the product namespace and into
      // the (marketing) route group, which doesn't appear in the URL.
      {
        source: "/apnahire/pricing",
        destination: "/pricing",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
