import type { MetadataRoute } from "next";

import { getPublicStoryPaginationOnServer } from "@/api/main/modules/stories/server";
import { getPublicUserPaginationOnServer } from "@/api/main/modules/users/server";
import { getGuildmateHref } from "@/utils/user-helper";
import { SITE_URL } from "@/utils/seo-helper";

// Rebuilt at most hourly; dynamic entries are skipped if the API is unreachable
export const revalidate = 3600;

const SITEMAP_PER_PAGE = 100;
const SITEMAP_MAX_PAGES = 20;

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

// Walks every page; stops on the first failure and keeps what was collected
async function collectAll<T>(
  fetchPage: (
    page: number,
  ) => Promise<{ data: { items: T[]; meta: { total_page: number } } } | null>,
): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; page <= SITEMAP_MAX_PAGES; page++) {
    const response = await fetchPage(page);
    if (!response?.data?.items) break;
    items.push(...response.data.items);
    if (page >= (response.data.meta?.total_page ?? 1)) break;
  }
  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const [stories, users] = await Promise.all([
    collectAll((page) =>
      getPublicStoryPaginationOnServer({ page, per_page: SITEMAP_PER_PAGE }),
    ),
    collectAll((page) =>
      getPublicUserPaginationOnServer({ page, per_page: SITEMAP_PER_PAGE }),
    ),
  ]);

  return [
    ...PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...stories.map((story) => ({
      url: `${SITE_URL}/stories/${encodeURIComponent(story.slug || story.id)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...users.map((user) => ({
      url: `${SITE_URL}${getGuildmateHref(user)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
