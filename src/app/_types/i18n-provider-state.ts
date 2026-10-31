import type { Locale } from "@/libs/i18n/locales";

export type TI18nProviderState = {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  locales: readonly Locale[];
};
