import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_ROLES_CREATE_MESSAGES = {
  namespace: "masterRolesCreate",
  en,
  id,
} as const satisfies {
  namespace: "masterRolesCreate";
} & Record<TLocale, typeof en>;
