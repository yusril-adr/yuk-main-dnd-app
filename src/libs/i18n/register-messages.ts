import type { i18n } from "i18next";

import { LOCALES, type Locale } from "./locales";
import type { MessageCatalog } from "./message-catalog";

/** Sync, idempotent. Safe to call during render before t(). */
export function registerMessages(
  instance: i18n,
  catalog: MessageCatalog,
): void {
  for (const lng of LOCALES) {
    if (!instance.hasResourceBundle(lng, catalog.namespace)) {
      instance.addResourceBundle(lng, catalog.namespace, catalog[lng], true, true);
    }
  }
}

export type { Locale };
