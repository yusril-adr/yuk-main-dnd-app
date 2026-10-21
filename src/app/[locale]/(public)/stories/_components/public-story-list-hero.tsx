import { Castle } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { If, Then } from "react-if";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import type { TPublicStoryListHeroProps } from "@/app/[locale]/(public)/stories/_types/public-story-components-props";

export default function PublicStoryListHero({
  totalStories,
}: TPublicStoryListHeroProps) {
  const t = useTranslations("stories.hero");
  const format = useFormatter();

  return (
    // Parchment-like panel: solid muted token, double thin frame
    <Card className="rounded-md bg-muted/40 p-1.5 shadow-none">
      <CardContent className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-primary/30 px-4 py-8 text-center sm:gap-4 sm:px-8 sm:py-12">
        <Castle aria-hidden className="size-8 text-primary sm:size-10" />
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
        <If condition={totalStories !== null}>
          <Then>
            <p className="text-sm text-muted-foreground">
              {t.rich("total", {
                count: totalStories ?? 0,
                total: format.number(totalStories ?? 0),
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
