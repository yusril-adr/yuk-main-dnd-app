import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_STORIES_EDIT_MESSAGES = {
  namespace: "masterStoriesEdit",
  en,
  id,
} as const satisfies {
  namespace: "masterStoriesEdit";
} & Record<TLocale, typeof en>;
