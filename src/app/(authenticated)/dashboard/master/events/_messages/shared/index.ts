import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_EVENTS_SHARED_MESSAGES = {
  namespace: "masterEventsShared",
  en,
  id,
} as const satisfies {
  namespace: "masterEventsShared";
} & Record<TLocale, typeof en>;
