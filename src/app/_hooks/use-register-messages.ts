"use client";

import { useTranslation } from "react-i18next";

import { registerMessages } from "@/libs/i18n/register-messages";
import type { Locale } from "@/libs/i18n/locales";

/** Call once at a section root so child useT(ns) sees the bundle on first paint. */
export function useRegisterMessages<T extends object>(
  ns: string,
  messages: Record<Locale, T>,
): void {
  const { i18n } = useTranslation();
  registerMessages(i18n, ns, messages);
}
