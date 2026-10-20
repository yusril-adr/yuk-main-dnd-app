import { ScrollText } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/app/_components/ui/empty";

import type { THomeEmptyStateProps } from "@/app/[locale]/(public)/_types/home-components-props";

export default function HomeEmptyState({ text }: THomeEmptyStateProps) {
  return (
    <Empty className="border bg-card py-10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ScrollText />
        </EmptyMedia>
        <EmptyDescription className="italic">{text}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
