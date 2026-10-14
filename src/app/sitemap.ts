import type { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/seo-helper";

// Static public routes only; story and guildmate detail entries come later
const PUBLIC_ROUTES: {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/stories", changeFrequency: "daily", priority: 0.9 },
  { path: "/guildmates", changeFrequency: "weekly", priority: 0.8 },
  { path: "/events", changeFrequency: "monthly", priority: 0.5 },
  { path: "/goods", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
