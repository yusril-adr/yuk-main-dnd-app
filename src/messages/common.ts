import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en/common.json";
import id from "./id/common.json";

export const COMMON_MESSAGES = {
  namespace: "common",
  en,
  id,
} as const satisfies {
  namespace: "common";
} & Record<TLocale, typeof en>;
