import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const STORY_DETAIL_MESSAGES = {
  namespace: "story-detail",
  en,
  id,
} as const satisfies {
  namespace: "story-detail";
} & Record<TLocale, typeof en>;
