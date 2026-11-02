import type { TLocale } from "@/libs/i18n/types/locale";

export type TI18nProviderState = {
  locale: TLocale;
  setLocale: (locale: TLocale) => Promise<void>;
  locales: readonly TLocale[];
};
