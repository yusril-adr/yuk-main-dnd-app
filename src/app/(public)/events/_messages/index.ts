import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const EVENTS_MESSAGES = {
  namespace: "events",
  en,
  id,
} as const satisfies {
  namespace: "events";
} & Record<TLocale, typeof en>;
