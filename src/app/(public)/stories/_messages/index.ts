import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const STORIES_MESSAGES = {
  namespace: "stories",
  en,
  id,
} as const satisfies {
  namespace: "stories";
} & Record<TLocale, typeof en>;
