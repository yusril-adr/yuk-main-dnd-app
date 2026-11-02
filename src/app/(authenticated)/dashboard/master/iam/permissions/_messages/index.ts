import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const MASTER_PERMISSIONS_MESSAGES = {
  namespace: "masterPermissions",
  en,
  id,
} as const satisfies {
  namespace: "masterPermissions";
} & Record<TLocale, typeof en>;
