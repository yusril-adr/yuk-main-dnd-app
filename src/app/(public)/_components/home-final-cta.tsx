"use client";

import Link from "next/link";
import { ExternalLink, LayoutDashboard, UserPlus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from "@/app/_components/ui/item";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useT } from "@/app/_hooks/use-t";
import { HOME_MESSAGES } from "@/app/(public)/_messages";
import CONFIG from "@/common/constants/config";

export default function HomeFinalCta() {
  const { auth } = useAuthContext();
  const { t } = useT(HOME_MESSAGES);

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
              {t("cta.title")}
            </h2>
            <ItemDescription className="line-clamp-none text-base text-primary-foreground/80 sm:text-lg">
              {t("cta.description")}
            </ItemDescription>
          </ItemContent>
          <ItemActions className="w-full flex-col sm:w-auto sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 w-full px-6 text-base sm:w-auto"
              render={<Link href={auth ? "/stories" : "/login"} />}
              nativeButton={false}
            >
              {auth ? <LayoutDashboard /> : <UserPlus />}
              {auth ? t("cta.findStory") : t("cta.joinGuild")}
            </Button>
            <Button
              size="lg"
              variant="link"
              className="h-12 w-full px-4 text-base text-primary-foreground focus-visible:border-primary-foreground focus-visible:ring-primary-foreground/60 sm:w-auto"
              render={
                <a
                  href={CONFIG.MANUAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
            >
              {t("cta.readManual")}
              <ExternalLink aria-hidden />
              <span className="sr-only">{t("cta.opensNewTab")}</span>
            </Button>
          </ItemActions>
        </Item>
      </div>
    </section>
  );
}
