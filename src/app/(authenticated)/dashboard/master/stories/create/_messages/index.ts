import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_STORIES_CREATE_MESSAGES = {
  namespace: "masterStoriesCreate",
  en,
  id,
} as const satisfies {
  namespace: "masterStoriesCreate";
} & Record<TLocale, typeof en>;
