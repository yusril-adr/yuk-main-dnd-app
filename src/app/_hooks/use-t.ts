"use client";

import { useTranslation } from "react-i18next";
import type { Namespace } from "i18next";

export function useT(namespace: Namespace = "common") {
  const { t } = useTranslation(namespace);
  return { t };
}
