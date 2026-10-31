import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const HOME_MESSAGES = {
  namespace: "home",
  en,
  id,
} as const satisfies {
  namespace: "home";
} & Record<TLocale, typeof en>;
