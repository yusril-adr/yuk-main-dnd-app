import { DEFAULT_LOCALE, localeToBcp47 } from "@/libs/i18n/locales";
import type { TLocale } from "@/libs/i18n/types/locale";

export function formatExp(value: number, locale: TLocale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(localeToBcp47(locale)).format(value ?? 0);
}
