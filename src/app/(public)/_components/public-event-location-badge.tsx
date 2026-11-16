import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";

import { PUBLIC_EVENT_LOCATION_TYPE_ICON } from "@/app/(public)/_constants/public-event-icons";
import type { TPublicEventLocationBadgeProps } from "@/app/(public)/_types/public-event-location-badge-props";

export default function PublicEventLocationBadge({
  locationType,
  label,
  className,
}: TPublicEventLocationBadgeProps) {
  const Icon = PUBLIC_EVENT_LOCATION_TYPE_ICON[locationType];

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 rounded-sm px-2 [&>svg]:size-3", className)}
    >
      <Icon />
      {label}
    </Badge>
  );
}
