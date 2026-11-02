import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const BALANCES_MESSAGES = {
  namespace: "balances",
  en,
  id,
} as const satisfies {
  namespace: "balances";
} & Record<TLocale, typeof en>;
