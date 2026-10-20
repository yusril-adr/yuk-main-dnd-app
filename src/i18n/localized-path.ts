import { routing, type TAppLocale } from "./routing";

// Public URL of an unprefixed path in a locale: "/guildmates" -> "/id/guildmates"
// (English stays unprefixed). For metadata and the sitemap; components use
// the Link wrapper from src/i18n/navigation.ts instead.
export function getLocalizedPath(path: string, locale: TAppLocale) {
  if (locale === routing.defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

// hreflang map for a page that exists in every locale
export function getLanguageAlternates(path: string) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, getLocalizedPath(path, locale)]),
    ),
    "x-default": path,
  };
}
