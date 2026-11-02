import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const BOARD_STORY_DETAIL_MESSAGES = {
  namespace: "boardStoryDetail",
  en,
  id,
} as const satisfies {
  namespace: "boardStoryDetail";
} & Record<TLocale, typeof en>;
