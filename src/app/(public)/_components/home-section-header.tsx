import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from "@/app/_components/ui/item";

import type { THomeSectionHeaderProps } from "@/app/(public)/_types/home-components-props";

export default function HomeSectionHeader({
  id,
  title,
  description,
  linkHref,
  linkLabel,
}: THomeSectionHeaderProps) {
  return (
    <Item className="flex-col items-start gap-4 p-0 sm:flex-row sm:items-end sm:justify-between">
      <ItemContent className="max-w-2xl gap-2">
        <h2 id={id} className="font-heading text-3xl sm:text-4xl">
          {title}
        </h2>
        <ItemDescription className="line-clamp-none text-base sm:text-lg">
          {description}
        </ItemDescription>
      </ItemContent>
      {linkHref && (
        <ItemActions>
          <Button
            variant="outline"
            render={<Link href={linkHref} />}
            nativeButton={false}
          >
            {linkLabel} <ArrowRight />
          </Button>
        </ItemActions>
      )}
    </Item>
  );
}
