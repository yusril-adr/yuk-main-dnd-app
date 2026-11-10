import { Else, If, Then } from "react-if";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { getRichTextPlainText } from "@/utils/rich-text";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { formatEventReward } from "@/app/(authenticated)/dashboard/master/events/_utils/event-reward";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { localeToBcp47 } from "@/libs/i18n/locales";

import EventCardBanner from "./event-card-banner";
import EventStatusBadge from "./event-status-badge";
import type { TEventCardProps } from "@/app/(authenticated)/dashboard/master/events/_types/event-card-props";
import { MASTER_EVENTS_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages";

const STATUS_MESSAGE_KEY = {
  [EventStatusEnum.DRAFT]: "enums.status.draft",
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.ARCHIVED]: "enums.status.archived",
  [EventStatusEnum.CANCELLED]: "enums.status.cancelled",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const LOCATION_MESSAGE_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

// No title link or ⋮ menu yet: the event detail, edit and lifecycle actions
// are not built, so the card is display-only for now
export default function EventCard({ event }: TEventCardProps) {
  const { t } = useT(MASTER_EVENTS_MESSAGES);
  const { locale } = useLocale();
  // Plain text from rich text HTML (or an old plain-text value); "" when the
  // description is empty or only has images
  const descriptionText = getRichTextPlainText(event.description);
  // Reward badges only for rewards above 0
  const bcp47 = localeToBcp47(locale);
  const expReward = formatEventReward(event.exp_awarded, "EXP", bcp47);
  const goldReward = formatEventReward(event.point_awarded, "GP", bcp47);

  return (
    // pt-0: the banner sits flush with the top edge of the card. Cards in a
    // grid row stretch to the tallest one, so the footer is pinned to the
    // bottom with mt-auto; pb-2 on the content keeps a minimum gap above it.
    <Card className="gap-2 pt-0">
      {/* Fixed 16:10 crop like the master story cards, so every card is the
          same size */}
      <EventCardBanner
        bannerUrl={event.banner_url}
        title={event.title}
        imageClassName="aspect-[16/10] max-h-none object-cover"
        placeholderClassName="aspect-[16/10]"
      />

      <CardHeader className="pt-2">
        <CardTitle className="min-w-0 text-base">
          <h2 title={event.title} className="line-clamp-2 break-words">
            {event.title}
          </h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        {/* min-h-15 = 3 lines of text-sm, keeps cards in the same row equal height */}
        <p className="line-clamp-3 min-h-15 text-muted-foreground">
          <If condition={!!descriptionText}>
            <Then>{descriptionText}</Then>
            <Else>{t("card.noDescription")}</Else>
          </If>
        </p>
      </CardContent>

      <CardFooter className="mt-auto border-t pt-3">
        {/* Status / location on the left, rewards on the right (wraps on narrow cards) */}
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <EventStatusBadge
              status={event.status}
              label={t(STATUS_MESSAGE_KEY[event.status])}
            />
            <Badge variant="outline">
              {t(LOCATION_MESSAGE_KEY[event.location_type])}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <If condition={!!expReward}>
              <Then>
                <Badge variant="outline">{expReward}</Badge>
              </Then>
            </If>
            <If condition={!!goldReward}>
              <Then>
                <Badge variant="outline">{goldReward}</Badge>
              </Then>
            </If>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
