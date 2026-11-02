import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const LOGIN_MESSAGES = {
  namespace: "login",
  en,
  id,
} as const satisfies {
  namespace: "login";
} & Record<TLocale, typeof en>;
