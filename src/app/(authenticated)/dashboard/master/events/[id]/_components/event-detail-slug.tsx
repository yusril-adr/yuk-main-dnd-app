"use client";

import type { TEventDetailSlugProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-slug-props";

// Event slug. There is no public event detail page yet, so this is text only.
export default function EventDetailSlug({ slug }: TEventDetailSlugProps) {
  return (
    <span className="font-mono text-xs text-muted-foreground">/{slug}</span>
  );
}
