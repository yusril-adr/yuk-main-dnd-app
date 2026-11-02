import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_STORIES_MESSAGES = {
  namespace: "masterStories",
  en,
  id,
} as const satisfies {
  namespace: "masterStories";
} & Record<TLocale, typeof en>;
