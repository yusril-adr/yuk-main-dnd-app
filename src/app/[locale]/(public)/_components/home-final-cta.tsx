"use client";

import Link from "next/link";
import { LayoutDashboard, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/app/_components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from "@/app/_components/ui/item";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { Link as LocaleLink } from "@/i18n/navigation";

export default function HomeFinalCta() {
  const { auth } = useAuthContext();
  const t = useTranslations("home.finalCta");

  return (
    <section
      aria-labelledby="final-cta"
      className="w-full bg-primary text-primary-foreground"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <Item className="flex-col items-start gap-6 p-0 sm:flex-row sm:items-center sm:justify-between">
          <ItemContent className="gap-2">
            {/* `final-cta` is also the hook PublicFooter uses to turn red on home; keep the id in sync */}
            <h2 id="final-cta" className="font-heading text-3xl sm:text-4xl">
              {t("title")}
            </h2>
            <ItemDescription className="line-clamp-none text-base text-primary-foreground/80 sm:text-lg">
              {t("description")}
            </ItemDescription>
          </ItemContent>
          <ItemActions className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 w-full px-6 text-base sm:w-auto"
              // /login is never locale-prefixed; /stories keeps /id
              render={
                auth ? <LocaleLink href="/stories" /> : <Link href="/login" />
              }
              nativeButton={false}
            >
              {auth ? <LayoutDashboard /> : <UserPlus />}
              {auth ? t("findQuest") : t("join")}
            </Button>
          </ItemActions>
        </Item>
      </div>
    </section>
  );
}
