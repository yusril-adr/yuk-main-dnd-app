export const LOCALES = ["en", "id"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localeToBcp47(locale: Locale): string {
  return locale === "id" ? "id-ID" : "en-US";
}
