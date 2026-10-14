import type { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/seo-helper";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/login",
        "/balances",
        "/profile",
        "/settings",
        "/switch-role",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
