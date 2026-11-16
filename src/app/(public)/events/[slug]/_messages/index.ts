import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const EVENT_DETAIL_MESSAGES = {
  namespace: "event-detail",
  en,
  id,
} as const satisfies {
  namespace: "event-detail";
} & Record<TLocale, typeof en>;
