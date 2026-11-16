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

import type { TBoardEventErrorStateProps } from "@/app/(authenticated)/dashboard/(player-board)/events/_types/board-event-components-props";

export default function BoardEventErrorState({
  title,
  description,
  onRetry,
}: TBoardEventErrorStateProps) {
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
