import type { TLocale } from "@/libs/i18n/types/locale";

export type TI18nProviderProps = {
  children: React.ReactNode;
  initialLocale: TLocale;
};
