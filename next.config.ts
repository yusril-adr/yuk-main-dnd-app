import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*githubusercontent.com", // Replace with your image provider's domain
        pathname: "/**", // Matches all paths under the domain
      },
    ],
  },
  allowedDevOrigins: ["192.168.110.93"],
};

export default nextConfig;
