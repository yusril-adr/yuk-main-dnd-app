import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_EVENTS_EDIT_MESSAGES = {
  namespace: "masterEventsEdit",
  en,
  id,
} as const satisfies {
  namespace: "masterEventsEdit";
} & Record<TLocale, typeof en>;
