import { Badge } from "@/app/_components/ui/badge";

import { EVENT_STATUS_BADGE_VARIANT } from "@/app/(authenticated)/dashboard/master/events/_constants/event-status-badge-variant";
import { EVENT_STATUS_LABEL } from "@/api/main/modules/master/events/enums/event-status-label";
import type { TEventStatusBadgeProps } from "@/app/(authenticated)/dashboard/master/events/_types/event-status-badge-props";

export default function EventStatusBadge({
  status,
  label,
}: TEventStatusBadgeProps) {
  return (
    <Badge variant={EVENT_STATUS_BADGE_VARIANT[status]}>
      {label ?? EVENT_STATUS_LABEL[status]}
    </Badge>
  );
}
