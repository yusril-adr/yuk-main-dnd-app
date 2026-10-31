import type { Locale } from "@/libs/i18n/locales";

import en from "./en.json";
import id from "./id.json";

export const HOME_NS = "home" as const;

// id must cover every en key (assignable to typeof en)
export const HOME_MESSAGES = {
  en,
  id,
} as const satisfies Record<Locale, typeof en>;

export type HomeMessages = typeof en;
