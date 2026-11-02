"use client";

import { TriangleAlert } from "lucide-react";

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
import { COMMON_MESSAGES } from "@/messages/common";

import type { TBoardStoryErrorStateProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryErrorState({
  title,
  description,
  onRetry,
}: TBoardStoryErrorStateProps) {
  const { t: tCommon } = useT(COMMON_MESSAGES);

  return (
    <Empty
      role="alert"
      className="rounded-xl border border-solid bg-card px-6 py-12"
    >
      <EmptyHeader>
        <EmptyMedia className="text-destructive">
          <TriangleAlert className="size-10" />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRetry}>
          {tCommon("actions.tryAgain")}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
