"use client";

import { RotateCw, TriangleAlert } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/app/_components/ui/empty";
import { useT } from "@/app/_hooks/use-t";

import type { THomeErrorStateProps } from "@/app/(public)/_types/home-components-props";

export default function HomeErrorState({
  text,
  onRetry,
}: THomeErrorStateProps) {
  const { t } = useT("common");

  return (
    <Empty role="alert" className="border border-destructive/30 bg-card py-10">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="text-destructive">
          <TriangleAlert />
        </EmptyMedia>
        <EmptyDescription>{text}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RotateCw /> {t("actions.tryAgain")}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
