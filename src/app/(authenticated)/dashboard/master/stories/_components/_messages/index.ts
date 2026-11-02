import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_STORIES_FORM_SHARED_MESSAGES = {
  namespace: "masterStoriesFormShared",
  en,
  id,
} as const satisfies {
  namespace: "masterStoriesFormShared";
} & Record<TLocale, typeof en>;
