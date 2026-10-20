"use client";

import { useTransition } from "react";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type TAppLocale } from "@/i18n/routing";

// Public pages only. The next-intl router writes the NEXT_LOCALE cookie
// (which the unprefixed dashboard also reads) and moves to the same page in
// the other locale, e.g. /guildmates/jane.doe <-> /id/guildmates/jane.doe
export function LocaleSwitcher() {
  const t = useTranslations("appTopbar.language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onLocaleChange = (next: TAppLocale) => {
    if (next === locale) return;
    startTransition(() => {
      // Keep filters such as ?search= and ?page=
      router.replace(`${pathname}${window.location.search}`, {
        locale: next,
        scroll: false,
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            disabled={isPending}
            aria-label={t("change", { language: t(`names.${locale}`) })}
          >
            <Languages aria-hidden />
            <span className="uppercase">{locale}</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(value) => onLocaleChange(value as TAppLocale)}
          >
            {routing.locales.map((item) => (
              <DropdownMenuRadioItem key={item} value={item} lang={item}>
                {t(`names.${item}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
