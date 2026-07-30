import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@apna/design-system"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/design-system",
        permanent: false,
      },
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
    ]
  },
};

export default nextConfig;
