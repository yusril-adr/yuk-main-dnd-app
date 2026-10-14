import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

import type { THomeSectionHeaderProps } from "@/app/(public)/_types/home-components-props";

export default function HomeSectionHeader({
  id,
  title,
  description,
  linkHref,
  linkLabel,
}: THomeSectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="font-heading text-2xl sm:text-3xl">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {linkHref && (
        <Button
          variant="ghost"
          size="sm"
          render={<Link href={linkHref} />}
          nativeButton={false}
        >
          {linkLabel} <ArrowRight />
        </Button>
      )}
    </div>
  );
}
