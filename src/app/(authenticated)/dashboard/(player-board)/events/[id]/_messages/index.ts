import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const BOARD_EVENT_DETAIL_MESSAGES = {
  namespace: "boardEventDetail",
  en,
  id,
} as const satisfies {
  namespace: "boardEventDetail";
} & Record<TLocale, typeof en>;
