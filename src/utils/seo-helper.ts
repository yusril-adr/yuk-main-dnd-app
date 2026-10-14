import type { Metadata } from "next";

import CONFIG from "@/common/constants/config";

export const SITE_NAME = "YukMainDnD";

export const SITE_DESCRIPTION =
  "A tabletop RPG guild: join quests, meet guildmates and track your adventures.";

export const SITE_URL = CONFIG.SITE_URL.replace(/\/+$/, "");

export const DEFAULT_OG_IMAGE = {
  url: "/images/guild/guild-photo-1.webp",
  width: 1600,
  height: 1200,
  alt: "Yuk Main DnD guild members smiling together at a session night",
};

// Child openGraph/twitter objects replace the parent's, so shared fields are repeated here
export function makePageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const ogTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export const NO_INDEX_METADATA: Metadata = {
  robots: { index: false, follow: false },
};
