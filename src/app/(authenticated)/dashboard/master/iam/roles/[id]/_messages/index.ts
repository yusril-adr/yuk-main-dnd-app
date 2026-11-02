import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_ROLES_DETAIL_MESSAGES = {
  namespace: "masterRolesDetail",
  en,
  id,
} as const satisfies {
  namespace: "masterRolesDetail";
} & Record<TLocale, typeof en>;
