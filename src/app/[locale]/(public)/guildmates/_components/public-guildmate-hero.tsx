import { Shield } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { If, Then } from "react-if";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatExp } from "@/app/[locale]/(public)/guildmates/_utils/public-guildmate-helper";
import type { TPublicGuildmateHeroProps } from "@/app/[locale]/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateHero({
  totalGuildmates,
}: TPublicGuildmateHeroProps) {
  const t = useTranslations("guildmates.hero");
  const locale = useLocale();

  return (
    // Banner-like heading: thin double frame, solid tokens only
    <Card className="rounded-md bg-muted/40 p-1.5 shadow-none">
      <CardContent className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-primary/30 px-4 py-8 text-center sm:gap-4 sm:px-8 sm:py-12">
        <Shield aria-hidden className="size-8 text-primary sm:size-10" />
        <p className="text-xs tracking-[0.25em] text-primary uppercase">
          {t("kicker")}
        </p>
        <h1 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <Separator className="w-40! bg-primary/40 sm:w-56!" />
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          {t("description")}
        </p>
        <If condition={totalGuildmates !== null}>
          <Then>
            <p className="text-sm text-muted-foreground">
              {t.rich("total", {
                count: totalGuildmates ?? 0,
                total: formatExp(totalGuildmates ?? 0, locale),
                num: (chunks) => (
                  <span className="font-heading text-xl text-foreground">
                    {chunks}
                  </span>
                ),
              })}
            </p>
          </Then>
        </If>
      </CardContent>
    </Card>
  );
}
