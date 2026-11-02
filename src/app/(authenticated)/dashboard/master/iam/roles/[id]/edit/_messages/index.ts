import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_ROLES_EDIT_MESSAGES = {
  namespace: "masterRolesEdit",
  en,
  id,
} as const satisfies {
  namespace: "masterRolesEdit";
} & Record<TLocale, typeof en>;
