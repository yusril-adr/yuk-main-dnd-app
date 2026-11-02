import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_USERS_BALANCES_MESSAGES = {
  namespace: "masterUsersBalances",
  en,
  id,
} as const satisfies {
  namespace: "masterUsersBalances";
} & Record<TLocale, typeof en>;
