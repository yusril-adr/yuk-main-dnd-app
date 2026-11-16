import { Else, If, Then } from "react-if";

import type { TEventDetailInfoRowProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-info-row-props";

export default function EventDetailInfoRow({
  icon: Icon,
  label,
  value,
  emptyText,
}: TEventDetailInfoRowProps) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-primary/70" />
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 whitespace-pre-line break-words">
          <If condition={!!value}>
            <Then>{value}</Then>
            <Else>
              <span className="italic text-muted-foreground">{emptyText}</span>
            </Else>
          </If>
        </div>
      </div>
    </div>
  );
}
