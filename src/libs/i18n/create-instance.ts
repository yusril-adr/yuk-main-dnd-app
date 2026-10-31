import i18next, { type i18n, type Resource } from "i18next";

import { DEFAULT_LOCALE } from "./locales";
import { I18N_RESOURCES } from "./resources";
import type { TCreateI18nInstanceInput } from "./types/create-i18n-instance-input";

export function createI18nInstance({
  locale,
  resources = I18N_RESOURCES as unknown as Resource,
}: TCreateI18nInstanceInput): i18n {
  const instance = i18next.createInstance();

  void instance.init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: "common",
    ns: Object.keys(
      (resources as Record<string, Record<string, unknown>>)[DEFAULT_LOCALE] ??
        {},
    ),
    resources,
    interpolation: { escapeValue: false },
    returnNull: false,
    initAsync: false,
  });

  return instance;
}
