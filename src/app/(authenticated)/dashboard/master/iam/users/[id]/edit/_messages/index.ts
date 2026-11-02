import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_USERS_EDIT_MESSAGES = {
  namespace: "masterUsersEdit",
  en,
  id,
} as const satisfies {
  namespace: "masterUsersEdit";
} & Record<TLocale, typeof en>;
