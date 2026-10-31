"use client";

import { Users } from "lucide-react";
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
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";
import type { TPublicGuildmateEmptyStateProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateEmptyState({
  isFiltered,
  onReset,
}: TPublicGuildmateEmptyStateProps) {
  const { t } = useT(GUILDMATES_MESSAGES);

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
          {t("empty.title")}
        </EmptyTitle>
        <EmptyDescription>
          {isFiltered ? t("empty.filtered") : t("empty.default")}
        </EmptyDescription>
      </EmptyHeader>
      <If condition={isFiltered}>
        <Then>
          <EmptyContent>
            <Button variant="outline" onClick={onReset}>
              {t("empty.clearSearch")}
            </Button>
          </EmptyContent>
        </Then>
      </If>
    </Empty>
  );
}
