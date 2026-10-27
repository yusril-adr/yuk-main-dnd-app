import type { NextConfig } from "next";

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
      // Story banners and avatars: the API returns Supabase Storage public URLs
      // (https://<project>.supabase.co/storage/v1/object/public/<bucket>/...)
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Dev only: on a network with fake-IP DNS (proxy/VPN), public hosts
    // resolve to private IPs and the /_next/image optimizer refuses them
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
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

export default nextConfig;
