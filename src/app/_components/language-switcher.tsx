"use client";

import { Languages } from "lucide-react";

import { buttonVariants } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { isLocale } from "@/libs/i18n/locales";
import { COMMON_MESSAGES } from "@/messages/common";
import type { TLocale } from "@/libs/i18n/types/locale";

const LOCALE_LABEL: Record<TLocale, string> = {
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
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => {
            if (isLocale(value)) void setLocale(value);
          }}
        >
          {locales.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              disabled={item === locale}
              className="data-disabled:text-primary data-disabled:opacity-100"
              closeOnClick
            >
              {LOCALE_LABEL[item]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
