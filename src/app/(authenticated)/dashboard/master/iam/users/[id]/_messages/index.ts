import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_USERS_DETAIL_MESSAGES = {
  namespace: "masterUsersDetail",
  en,
  id,
} as const satisfies {
  namespace: "masterUsersDetail";
} & Record<TLocale, typeof en>;
