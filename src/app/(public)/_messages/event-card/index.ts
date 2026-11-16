import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const PUBLIC_EVENT_CARD_MESSAGES = {
  namespace: "public-event-card",
  en,
  id,
} as const satisfies {
  namespace: "public-event-card";
} & Record<TLocale, typeof en>;
