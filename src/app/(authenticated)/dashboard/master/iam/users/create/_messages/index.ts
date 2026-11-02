import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_USERS_CREATE_MESSAGES = {
  namespace: "masterUsersCreate",
  en,
  id,
} as const satisfies {
  namespace: "masterUsersCreate";
} & Record<TLocale, typeof en>;
