import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const SWITCH_ROLE_MESSAGES = {
  namespace: "switchRole",
  en,
  id,
} as const satisfies {
  namespace: "switchRole";
} & Record<TLocale, typeof en>;
