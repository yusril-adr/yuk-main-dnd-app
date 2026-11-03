import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const PUBLIC_STORY_CARD_MESSAGES = {
  namespace: "public-story-card",
  en,
  id,
} as const satisfies {
  namespace: "public-story-card";
} & Record<TLocale, typeof en>;
