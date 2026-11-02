import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const BOARD_STORIES_MESSAGES = {
  namespace: "boardStories",
  en,
  id,
} as const satisfies {
  namespace: "boardStories";
} & Record<TLocale, typeof en>;
