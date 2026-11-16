import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_EVENT_DETAIL_MESSAGES = {
  namespace: "masterEventDetail",
  en,
  id,
} as const satisfies {
  namespace: "masterEventDetail";
} & Record<TLocale, typeof en>;
