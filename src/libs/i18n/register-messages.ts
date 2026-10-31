import type { i18n } from "i18next";

import { LOCALES } from "./locales";
import type { TMessageCatalog } from "./types/message-catalog";

/** Sync, idempotent. Safe to call during render before t(). */
export function registerMessages(
  instance: i18n,
  catalog: TMessageCatalog,
): void {
  for (const lng of LOCALES) {
    if (!instance.hasResourceBundle(lng, catalog.namespace)) {
      instance.addResourceBundle(lng, catalog.namespace, catalog[lng], true, true);
    }
  }
}
