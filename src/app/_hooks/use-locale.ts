import { useContext } from "react";

import { I18nProviderContext } from "@/app/_components/i18n-provider";

export function useLocale() {
  const context = useContext(I18nProviderContext);

  if (context === undefined) {
    throw new Error("useLocale must be used within an I18nProvider");
  }

  return context;
}
