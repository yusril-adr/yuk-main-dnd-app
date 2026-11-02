import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const COMING_SOON_MESSAGES = {
  namespace: "coming-soon",
  en,
  id,
} as const satisfies {
  namespace: "coming-soon";
} & Record<TLocale, typeof en>;
