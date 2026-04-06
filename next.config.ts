import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["@heroui/react", "lucide-react", "highlight.js"],
    inlineCss: true,
  },
  images: {
    loaderFile: "./lib/imageLoader.ts",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;