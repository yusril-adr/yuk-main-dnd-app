import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_STORIES_SHARED_MESSAGES = {
  namespace: "masterStoriesShared",
  en,
  id,
} as const satisfies {
  namespace: "masterStoriesShared";
} & Record<TLocale, typeof en>;
