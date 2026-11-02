import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const DATA_TABLE_MESSAGES = {
  namespace: "data-table",
  en,
  id,
} as const satisfies {
  namespace: "data-table";
} & Record<TLocale, typeof en>;
