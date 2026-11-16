import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/app/_components/ui/card";
import { cn } from "cn";
import { If, Then } from "react-if";

import EventDetailOrnament from "./event-detail-ornament";
import type { TEventDetailSectionCardProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-section-card-props";

export default function EventDetailSectionCard({
  icon: Icon,
  title,
  className,
  action,
  children,
}: TEventDetailSectionCardProps) {
  return (
    <Card className={cn("border-2 border-primary/15", className)}>
      <CardHeader>
        <h3
          data-slot="card-title"
          className="flex items-center gap-2 font-heading text-lg leading-normal font-medium"
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <Icon className="size-4" />
          </span>
          {title}
        </h3>
        <If condition={!!action}>
          <Then>
            <CardAction>{action}</CardAction>
          </Then>
        </If>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <EventDetailOrnament />
        {children}
      </CardContent>
    </Card>
  );
}
