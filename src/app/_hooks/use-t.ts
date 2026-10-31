"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { registerMessages } from "@/libs/i18n/register-messages";
import type { TMessageCatalog } from "@/libs/i18n/types/message-catalog";
import type { TMessageKey } from "@/libs/i18n/types/message-key";
import type { TTranslateOptions } from "@/libs/i18n/types/translate-options";

export function useT<T extends object>(catalog: TMessageCatalog<T>) {
  const { t: translate, i18n } = useTranslation(catalog.namespace);
  registerMessages(i18n, catalog);

  const t = useCallback(
    (key: TMessageKey<T>, options?: TTranslateOptions) =>
      String(translate(key, options)),
    [translate],
  );

  return { t };
}
