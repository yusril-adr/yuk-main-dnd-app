import type { TLocale } from "@/libs/i18n/types/locale";

import en from "./en.json";
import id from "./id.json";

export const DASHBOARD_HOME_MESSAGES = {
  namespace: "dashboardHome",
  en,
  id,
} as const satisfies {
  namespace: "dashboardHome";
} & Record<TLocale, typeof en>;
