import { useTranslation } from "react-i18next";

export function useT(namespace: "common" | "home" = "common") {
  const { t } = useTranslation(namespace);
  return { t };
}
