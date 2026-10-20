import { RotateCw, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "cn";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import type { TPublicGuildmateErrorStateProps } from "@/app/[locale]/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateErrorState({
  title,
  description,
  onRetry,
  compact = false,
}: TPublicGuildmateErrorStateProps) {
  const t = useTranslations("guildmates.error");
  const tActions = useTranslations("common.actions");

  return (
    <Empty
      role="alert"
      className={cn(
        "gap-3 rounded-md border border-solid border-destructive/30 bg-destructive/5 px-4",
        compact ? "py-8" : "py-10 sm:px-6 sm:py-16",
      )}
    >
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="mb-1 size-12 rounded-full bg-destructive/10 text-destructive"
        >
          <TriangleAlert />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-lg">
          {title ?? t("title")}
        </EmptyTitle>
        <EmptyDescription>{description ?? t("description")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRetry}>
          <RotateCw /> {tActions("tryAgain")}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
