import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const SETTINGS_MESSAGES = {
  namespace: "settings",
  en,
  id,
} as const satisfies {
  namespace: "settings";
} & Record<TLocale, typeof en>;
