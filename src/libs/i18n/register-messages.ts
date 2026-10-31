import type { i18n } from "i18next";

import type { Locale } from "./locales";

/** Sync, idempotent. Safe to call during render before t(). */
export function registerMessages(
  instance: i18n,
  ns: string,
  messages: Record<Locale, object>,
): void {
  for (const [lng, bundle] of Object.entries(messages) as [Locale, object][]) {
    if (!instance.hasResourceBundle(lng, ns)) {
      instance.addResourceBundle(lng, ns, bundle, true, true);
    }
  }
}
