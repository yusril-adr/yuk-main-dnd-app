import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_ROLES_SHARED_MESSAGES = {
  namespace: "masterRolesShared",
  en,
  id,
} as const satisfies {
  namespace: "masterRolesShared";
} & Record<TLocale, typeof en>;
