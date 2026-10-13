import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { cn } from "@/utils/cn";

import type { TPublicStoryDetailSectionProps } from "@/app/(public)/stories/_types/public-story-components-props";

// Detail page section on shadcn Card (icon + title header, content body)
export default function PublicStoryDetailSection({
  icon: Icon,
  title,
  className,
  children,
}: TPublicStoryDetailSectionProps) {
  return (
    <Card
      className={cn(
        "gap-4 rounded-md [--card-spacing:--spacing(5)] sm:gap-5 sm:[--card-spacing:--spacing(6)] lg:[--card-spacing:--spacing(8)]",
        className,
      )}
    >
      <CardHeader className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 text-primary sm:size-10 [&>svg]:size-5">
          <Icon />
        </span>
        <CardTitle
          className="text-xl sm:text-2xl"
          role="heading"
          aria-level={2}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:gap-5">
        {children}
      </CardContent>
    </Card>
  );
}
