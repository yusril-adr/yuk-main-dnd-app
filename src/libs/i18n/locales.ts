import type { TLocale } from "./types/locale";

export const LOCALES = ["en", "id"] as const;

export const DEFAULT_LOCALE: TLocale = "en";

export function isLocale(value: string): value is TLocale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localeToBcp47(locale: TLocale): string {
  return locale === "id" ? "id-ID" : "en-US";
}
