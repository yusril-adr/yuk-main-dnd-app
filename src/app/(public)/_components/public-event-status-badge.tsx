import { Diamond } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";

import type { TPublicEventStatusBadgeProps } from "@/app/(public)/_types/public-event-status-badge-props";

export default function PublicEventStatusBadge({
  status,
  label,
  className,
}: TPublicEventStatusBadgeProps) {
  const isOpen = status === EventStatusEnum.PUBLISHED;

  return (
    <Badge
      variant={isOpen ? "default" : "outline"}
      className={cn(
        "gap-1 rounded-sm px-2 shadow-none [&>svg]:size-2.5 [&>svg]:fill-current",
        !isOpen && "bg-background text-muted-foreground",
        className,
      )}
    >
      <Diamond aria-hidden />
      {label}
    </Badge>
  );
}
