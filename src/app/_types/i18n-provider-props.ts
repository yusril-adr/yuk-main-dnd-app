import type { Locale } from "@/libs/i18n/locales";

export type TI18nProviderProps = {
  children: React.ReactNode;
  initialLocale: Locale;
};
