import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const BOARD_EVENTS_MESSAGES = {
  namespace: "boardEvents",
  en,
  id,
} as const satisfies {
  namespace: "boardEvents";
} & Record<TLocale, typeof en>;
