import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_EVENTS_CREATE_MESSAGES = {
  namespace: "masterEventsCreate",
  en,
  id,
} as const satisfies {
  namespace: "masterEventsCreate";
} & Record<TLocale, typeof en>;
