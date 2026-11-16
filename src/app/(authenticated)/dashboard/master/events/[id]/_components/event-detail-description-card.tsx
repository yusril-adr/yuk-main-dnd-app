"use client";

import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import RichTextContent from "@/app/_components/rich-text-content";
import { useT } from "@/app/_hooks/use-t";

import EventDetailCopyDescriptionButton from "./event-detail-copy-description-button";
import EventDetailSectionCard from "./event-detail-section-card";
import type { TEventDetailCardProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-card-props";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

export default function EventDetailDescriptionCard({
  event,
  className,
}: TEventDetailCardProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);
  const description = event.description;

  return (
    <EventDetailSectionCard
      icon={Scroll}
      title={t("description.title")}
      className={className}
      action={
        description ? (
          <EventDetailCopyDescriptionButton description={description} />
        ) : undefined
      }
    >
      <If condition={!!description}>
        <Then>
          <RichTextContent
            value={description ?? ""}
            className="text-base"
          />
        </Then>
        <Else>
          <p className="italic text-muted-foreground">
            {t("description.empty")}
          </p>
        </Else>
      </If>
    </EventDetailSectionCard>
  );
}
