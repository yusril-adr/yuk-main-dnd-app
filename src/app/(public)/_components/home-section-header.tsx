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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-2xl flex-col gap-2">
        <h2 id={id} className="font-heading text-3xl sm:text-4xl">
          {title}
        </h2>
        <p className="text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
      {linkHref && (
        <Button
          variant="outline"
          className="self-start sm:self-auto"
          render={<Link href={linkHref} />}
          nativeButton={false}
        >
          {linkLabel} <ArrowRight />
        </Button>
      )}
    </div>
  );
}
