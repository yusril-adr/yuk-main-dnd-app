"use client";

import { createContext, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { I18nextProvider } from "react-i18next";

import dayjs from "@/libs/dayjs";
import { createI18nInstance } from "@/libs/i18n/create-instance";
import { LocaleCookie } from "@/libs/i18n/locale-cookie";
import { LOCALES } from "@/libs/i18n/locales";
import type { TLocale } from "@/libs/i18n/types/locale";
import type { TI18nProviderProps } from "@/app/_types/i18n-provider-props";
import type { TI18nProviderState } from "@/app/_types/i18n-provider-state";

export const I18nProviderContext = createContext<TI18nProviderState>({
  locale: "en",
  setLocale: async () => {},
  locales: LOCALES,
});

export function I18nProvider({ children, initialLocale }: TI18nProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<TLocale>(initialLocale);
  const [i18n] = useState(() => {
    const instance = createI18nInstance({ locale: initialLocale });
    dayjs.locale(initialLocale);
    return instance;
  });

  const setLocale = useCallback(
    async (next: TLocale) => {
      if (next === locale) return;

      LocaleCookie.set(next);
      await i18n.changeLanguage(next);
      dayjs.locale(next);
      if (typeof document !== "undefined") {
        document.documentElement.lang = next;
      }
      setLocaleState(next);
      router.refresh();
    },
    [i18n, locale, router],
  );

  const value = useMemo(
    () => ({ locale, setLocale, locales: LOCALES }),
    [locale, setLocale],
  );

  return (
    <I18nextProvider i18n={i18n}>
      <I18nProviderContext.Provider value={value}>
        {children}
      </I18nProviderContext.Provider>
    </I18nextProvider>
  );
}
