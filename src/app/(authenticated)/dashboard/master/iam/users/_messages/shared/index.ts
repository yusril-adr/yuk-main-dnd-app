import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_USERS_SHARED_MESSAGES = {
  namespace: "masterUsersShared",
  en,
  id,
} as const satisfies {
  namespace: "masterUsersShared";
} & Record<TLocale, typeof en>;
