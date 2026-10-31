import CONFIG from "@/common/constants/config";

import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";

const COOKIE_OPTIONS = "path=/; max-age=31536000; SameSite=Lax";

export function parseLocale(raw: string | undefined | null): Locale {
  if (!raw) return DEFAULT_LOCALE;
  return isLocale(raw) ? raw : DEFAULT_LOCALE;
}

export const LocaleCookie = {
  get(): Locale | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${CONFIG.COOKIE.LOCALE_KEY}=([^;]*)`),
    );
    if (!match) return null;
    return parseLocale(decodeURIComponent(match[1]));
  },

  set(locale: Locale): void {
    document.cookie = `${CONFIG.COOKIE.LOCALE_KEY}=${encodeURIComponent(locale)}; ${COOKIE_OPTIONS}`;
  },
};
