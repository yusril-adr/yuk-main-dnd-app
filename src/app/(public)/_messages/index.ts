import type { Locale } from "@/libs/i18n/locales";

import en from "./en.json";
import id from "./id.json";

export const HOME_MESSAGES = {
  namespace: "home",
  en,
  id,
} as const satisfies {
  namespace: "home";
} & Record<Locale, typeof en>;

export type HomeMessages = typeof en;
