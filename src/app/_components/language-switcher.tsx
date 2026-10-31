"use client";

import { Languages } from "lucide-react";

import { buttonVariants } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { COMMON_MESSAGES } from "@/messages/common";
import type { Locale } from "@/libs/i18n/locales";

const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  id: "Indonesia",
};

export function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  const { t } = useT(COMMON_MESSAGES);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          aria-label={t("language.switcherLabel")}
        >
          <Languages className="size-[1.2rem]" />
          <span className="sr-only">{t("language.switcherLabel")}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => {
              void setLocale(item);
            }}
            data-active={item === locale || undefined}
          >
            {LOCALE_LABEL[item]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
