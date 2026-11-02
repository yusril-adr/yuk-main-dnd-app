import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_STORY_DETAIL_MESSAGES = {
  namespace: "masterStoryDetail",
  en,
  id,
} as const satisfies {
  namespace: "masterStoryDetail";
} & Record<TLocale, typeof en>;
