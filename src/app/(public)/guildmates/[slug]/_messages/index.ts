import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const GUILDMATE_DETAIL_MESSAGES = {
  namespace: "guildmate-detail",
  en,
  id,
} as const satisfies {
  namespace: "guildmate-detail";
} & Record<TLocale, typeof en>;
