import { defineRouting } from "next-intl/routing";

// Remember the choice for a year so the unprefixed dashboard follows it
export const LOCALE_COOKIE = {
  name: "NEXT_LOCALE",
  maxAge: 60 * 60 * 24 * 365,
} as const;

// English stays unprefixed (/guildmates); Indonesian lives under /id on the
// public pages. The signed-in area and /login never get a prefix: src/proxy.ts
// rewrites them internally using the NEXT_LOCALE cookie (see i18n-proxy.ts).
// Keep LOCALES in scripts/generate-messages.mjs in sync.
export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: LOCALE_COOKIE,
  // Only translated pages advertise alternates, via their metadata
  alternateLinks: false,
});

export type TAppLocale = (typeof routing.locales)[number];

// Open Graph locale per app locale
export const OG_LOCALE: Record<TAppLocale, string> = {
  en: "en_US",
  id: "id_ID",
};
