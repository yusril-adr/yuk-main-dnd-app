import type { MetadataRoute } from "next";

import { getPublicStoryPaginationOnServer } from "@/api/main/modules/stories/server";
import { getPublicUserPaginationOnServer } from "@/api/main/modules/users/server";
import { getGuildmateHref } from "@/utils/user-helper";
import { SITE_URL } from "@/utils/seo-helper";
import { routing } from "@/i18n/routing";
import { getLocalizedPath } from "@/i18n/localized-path";

// Rebuilt at most hourly; dynamic entries are skipped if the API is unreachable
export const revalidate = 3600;

const SITEMAP_PER_PAGE = 100;
const SITEMAP_MAX_PAGES = 20;

type TChangeFrequency = "daily" | "weekly" | "monthly";

const PUBLIC_ROUTES: {
  path: string;
  changeFrequency: TChangeFrequency;
  priority: number;
  // Translated: listed once per locale with hreflang alternates
  localized?: boolean;
}[] = [
  { path: "/", changeFrequency: "daily", priority: 1, localized: true },
  {
    path: "/stories",
    changeFrequency: "daily",
    priority: 0.9,
    localized: true,
  },
  {
    path: "/guildmates",
    changeFrequency: "weekly",
    priority: 0.8,
    localized: true,
  },
  { path: "/events", changeFrequency: "monthly", priority: 0.5 },
  { path: "/goods", changeFrequency: "monthly", priority: 0.5 },
];

// Absolute URL; the root stays without a trailing slash
const toUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

// One entry per locale, each listing every language version
function localizedEntries(
  path: string,
  entry: {
    lastModified: Date;
    changeFrequency: TChangeFrequency;
    priority: number;
  },
): MetadataRoute.Sitemap {
  const alternates = {
    languages: Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        toUrl(getLocalizedPath(path, locale)),
      ]),
    ),
  };
  return routing.locales.map((locale) => ({
    url: toUrl(getLocalizedPath(path, locale)),
    ...entry,
    alternates,
  }));
}

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
    ...PUBLIC_ROUTES.flatMap(({ path, changeFrequency, priority, localized }) =>
      localized
        ? localizedEntries(path, { lastModified, changeFrequency, priority })
        : [{ url: toUrl(path), lastModified, changeFrequency, priority }],
    ),
    ...stories.flatMap((story) =>
      localizedEntries(
        `/stories/${encodeURIComponent(story.slug || story.id)}`,
        { lastModified, changeFrequency: "weekly", priority: 0.7 },
      ),
    ),
    ...users.flatMap((user) =>
      localizedEntries(getGuildmateHref(user), {
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
      }),
    ),
  ];
}
