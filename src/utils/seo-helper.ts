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
  image,
}: {
  title?: string;
  description: string;
  path: string;
  // Absolute or root-relative URL; falls back to the guild photo
  image?: { url: string; alt: string } | null;
}): Metadata {
  const ogImage = image?.url ? image : DEFAULT_OG_IMAGE;
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
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export const NO_INDEX_METADATA: Metadata = {
  robots: { index: false, follow: false },
};

export const META_DESCRIPTION_MAX_LENGTH = 160;

// Collapses whitespace and cuts at a word boundary with an ellipsis
export function toMetaDescription(
  text: string | null | undefined,
  fallback: string,
): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (!clean) return fallback;
  if (clean.length <= META_DESCRIPTION_MAX_LENGTH) return clean;
  const cut = clean.slice(0, META_DESCRIPTION_MAX_LENGTH - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?-]+$/, "")}…`;
}
