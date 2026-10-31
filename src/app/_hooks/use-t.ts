"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  type MessageCatalog,
  type MessageKey,
} from "@/libs/i18n/message-catalog";
import { registerMessages } from "@/libs/i18n/register-messages";

type TranslateOptions = Record<string, unknown>;

export function useT<T extends object>(catalog: MessageCatalog<T>) {
  const { t: translate, i18n } = useTranslation(catalog.namespace);
  registerMessages(i18n, catalog);

  const t = useCallback(
    (key: MessageKey<T>, options?: TranslateOptions) =>
      String(translate(key, options)),
    [translate],
  );

  return { t };
}
