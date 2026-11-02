import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const NOT_FOUND_MESSAGES = {
  namespace: "not-found",
  en,
  id,
} as const satisfies {
  namespace: "not-found";
} & Record<TLocale, typeof en>;
