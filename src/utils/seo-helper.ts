import type { Metadata } from "next";

import CONFIG from "@/common/constants/config";
import { OG_LOCALE, routing, type TAppLocale } from "@/i18n/routing";
import { DEFAULT_MESSAGES } from "@/i18n/default-messages";
import {
  getLanguageAlternates,
  getLocalizedPath,
} from "@/i18n/localized-path";

export const SITE_NAME = "YukMainDnD";

export const SITE_URL = CONFIG.SITE_URL.replace(/\/+$/, "");

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

// Share card alt in the default locale, for the static metadata route
// export and untranslated pages; translated pages pass common.site.ogAlt
export const OG_IMAGE_ALT = DEFAULT_MESSAGES.common.site.ogAlt;

// Default locale: src/app/opengraph-image.tsx (the root default). Others:
// src/app/og/[locale]/route.tsx. Child pages repeat it because their
// openGraph/twitter objects replace the parent's
export function getDefaultOgImage(locale: TAppLocale, alt: string) {
  return {
    url:
      locale === routing.defaultLocale ? "/opengraph-image" : `/og/${locale}`,
    ...OG_IMAGE_SIZE,
    alt,
  };
}

// Child openGraph/twitter objects replace the parent's, so shared fields are repeated here
export function makePageMetadata({
  title,
  description,
  path,
  image,
  locale = routing.defaultLocale,
  localized = false,
  defaultImageAlt,
}: {
  title?: string;
  description: string;
  // Unprefixed path, e.g. "/guildmates"
  path: string;
  // Absolute or root-relative URL; falls back to the guild photo
  image?: { url: string; alt: string } | null;
  locale?: TAppLocale;
  // The page is translated: add hreflang alternates for every locale.
  // Untranslated pages keep the default-locale canonical
  localized?: boolean;
  // Translated alt (common.site.ogAlt) for the fallback share card
  defaultImageAlt?: string;
}): Metadata {
  const pageLocale = localized ? locale : routing.defaultLocale;
  const ogImage = image?.url
    ? image
    : getDefaultOgImage(pageLocale, defaultImageAlt ?? OG_IMAGE_ALT);
  const ogTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = localized ? getLocalizedPath(path, locale) : path;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      ...(localized ? { languages: getLanguageAlternates(path) } : {}),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[pageLocale],
      url,
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
