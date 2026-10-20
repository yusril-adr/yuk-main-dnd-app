import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import type { TPublicGuildmateEmptyStateProps } from "@/app/[locale]/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateEmptyState({
  isFiltered,
  onReset,
}: TPublicGuildmateEmptyStateProps) {
  const t = useTranslations("guildmates.empty");

  return (
    <Empty className="rounded-md border bg-muted/30 px-4 py-10 sm:px-6 sm:py-16">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-14 rounded-full bg-primary/10 text-primary sm:size-16 [&_svg:not([class*='size-'])]:size-7"
        >
          <Users />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-lg sm:text-xl">
          {t("title")}
        </EmptyTitle>
        <EmptyDescription>
          {isFiltered ? t("filtered") : t("unfiltered")}
        </EmptyDescription>
      </EmptyHeader>
      <If condition={isFiltered}>
        <Then>
          <EmptyContent>
            <Button variant="outline" onClick={onReset}>
              {t("clear")}
            </Button>
          </EmptyContent>
        </Then>
      </If>
    </Empty>
  );
}
