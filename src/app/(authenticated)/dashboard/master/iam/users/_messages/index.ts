import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_USERS_MESSAGES = {
  namespace: "masterUsers",
  en,
  id,
} as const satisfies {
  namespace: "masterUsers";
} & Record<TLocale, typeof en>;
