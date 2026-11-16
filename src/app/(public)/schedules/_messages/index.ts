import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const SCHEDULES_MESSAGES = {
  namespace: "schedules",
  en,
  id,
} as const satisfies {
  namespace: "schedules";
} & Record<TLocale, typeof en>;
