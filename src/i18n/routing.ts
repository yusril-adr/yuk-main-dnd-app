import { defineRouting } from "next-intl/routing";

// Supported locales. Keep LOCALES in scripts/generate-messages.mjs in sync.
export const LOCALES = ["en", "id"] as const;

export type TAppLocale = (typeof LOCALES)[number];

// Single place to configure i18n behaviour. Changing defaultLocale switches
// which language is unprefixed everywhere: routing, the dashboard/login
// fallback in src/proxy.ts, canonical/hreflang/sitemap URLs and the default
// share card (src/app/opengraph-image.tsx).
export const I18N_CONFIG: {
  // Unprefixed language; the others live under /<locale> on public pages
  defaultLocale: TAppLocale;
  // Redirect public visitors to their language based on the NEXT_LOCALE
  // cookie, then Accept-Language. When off, the unprefixed URLs always show
  // defaultLocale. The signed-in area always follows the cookie.
  localeDetection: boolean;
} = {
  defaultLocale: "en",
  localeDetection: true,
};

// Remember the choice for a year so the unprefixed dashboard follows it
export const LOCALE_COOKIE = {
  name: "NEXT_LOCALE",
  maxAge: 60 * 60 * 24 * 365,
} as const;

// Public pages: the default locale stays unprefixed (/guildmates), the others
// live under /<locale>. The signed-in area and /login never get a prefix:
// src/proxy.ts rewrites them internally using the NEXT_LOCALE cookie.
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: I18N_CONFIG.defaultLocale,
  localeDetection: I18N_CONFIG.localeDetection,
  localePrefix: "as-needed",
  localeCookie: LOCALE_COOKIE,
  // Only translated pages advertise alternates, via their metadata
  alternateLinks: false,
});

// Open Graph locale per app locale
export const OG_LOCALE: Record<TAppLocale, string> = {
  en: "en_US",
  id: "id_ID",
};
