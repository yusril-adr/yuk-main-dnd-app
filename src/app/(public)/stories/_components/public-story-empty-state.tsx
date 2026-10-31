"use client";

import { ScrollText } from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import { STORIES_MESSAGES } from "@/app/(public)/stories/_messages";
import type { TPublicStoryEmptyStateProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryEmptyState({
  isFiltered,
  onReset,
}: TPublicStoryEmptyStateProps) {
  const { t } = useT(STORIES_MESSAGES);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed bg-muted/30 px-4 py-10 sm:px-6 sm:py-16 text-center">
      <div className="flex size-14 items-center sm:size-16 justify-center rounded-full bg-primary/10 text-primary [&>svg]:size-7">
        <ScrollText />
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="font-heading text-lg sm:text-xl">{t("empty.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {isFiltered ? t("empty.filtered") : t("empty.default")}
        </p>
      </div>
      <If condition={isFiltered}>
        <Then>
          <Button variant="outline" onClick={onReset}>
            {t("empty.clearFilters")}
          </Button>
        </Then>
      </If>
    </div>
  );
}
