import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_ROLES_MESSAGES = {
  namespace: "masterRoles",
  en,
  id,
} as const satisfies {
  namespace: "masterRoles";
} & Record<TLocale, typeof en>;
