import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/explore", destination: "/", permanent: true },
      { source: "/download", destination: "/", permanent: true },
      { source: "/sign-in", destination: "/", permanent: true },
      { source: "/sign-up", destination: "/", permanent: true },
      { source: "/film-competition", destination: "/", permanent: true },
      { source: "/auth/:path*", destination: "/", permanent: true },
      { source: "/checkout/:path*", destination: "/", permanent: true },
      { source: "/share/:path*", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.iconify.design",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
