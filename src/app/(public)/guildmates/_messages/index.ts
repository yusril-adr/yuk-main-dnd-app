import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const GUILDMATES_MESSAGES = {
  namespace: "guildmates",
  en,
  id,
} as const satisfies {
  namespace: "guildmates";
} & Record<TLocale, typeof en>;
