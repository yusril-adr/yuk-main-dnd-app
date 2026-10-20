import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const svgLoader = {
  loader: "@svgr/webpack",
  options: {
    svgo: false,
  },
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com", // Replace with your image provider's domain
        pathname: "/**", // Matches all paths under the domain
      },
    ],
  },
  allowedDevOrigins: ["192.168.110.93"],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [svgLoader],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [svgLoader],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
