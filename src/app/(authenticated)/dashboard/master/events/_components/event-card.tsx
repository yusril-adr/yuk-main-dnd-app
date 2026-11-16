import { useCallback, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  Ban,
  EllipsisVertical,
  Eye,
  Pencil,
  Send,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Else, If, Then } from "react-if";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
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

export default function EventCard({
  event,
  onArchive,
  onUnarchive,
  onPublish,
  onCancel,
  onDelete,
}: TEventCardProps) {
  const { t } = useT(MASTER_EVENTS_MESSAGES);
  const { locale } = useLocale();
  const canEditEvent = event.action_list.is_can_update;
  const canDeleteEventAction = event.action_list.is_can_delete && !!onDelete;
  const canArchiveEvent = event.action_list.is_can_archive && !!onArchive;
  const canUnarchiveEvent = event.action_list.is_can_unarchive && !!onUnarchive;
  const canPublishEvent = event.action_list.is_can_publish && !!onPublish;
  const canCancelEvent = event.action_list.is_can_cancel && !!onCancel;
  // Plain text from rich text HTML (or an old plain-text value); "" when the
  // description is empty or only has images
  const descriptionText = getRichTextPlainText(event.description);
  // Reward badges only for rewards above 0
  const bcp47 = localeToBcp47(locale);
  const expReward = formatEventReward(event.exp_awarded, "EXP", bcp47);
  const goldReward = formatEventReward(event.point_awarded, "GP", bcp47);
  const [confirmArchiveId, setConfirmArchiveId] = useState<string | null>(null);
  const [confirmPublishId, setConfirmPublishId] = useState<string | null>(null);
  const [confirmUnarchiveId, setConfirmUnarchiveId] = useState<string | null>(
    null,
  );
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const onArchiveConfirm = useCallback(() => {
    if (confirmArchiveId && onArchive) {
      onArchive(confirmArchiveId);
    }
    setConfirmArchiveId(null);
  }, [confirmArchiveId, onArchive]);

  const onPublishConfirm = useCallback(() => {
    if (confirmPublishId && onPublish) {
      onPublish(confirmPublishId);
    }
    setConfirmPublishId(null);
  }, [confirmPublishId, onPublish]);

  const onUnarchiveConfirm = useCallback(() => {
    if (confirmUnarchiveId && onUnarchive) {
      onUnarchive(confirmUnarchiveId);
    }
    setConfirmUnarchiveId(null);
  }, [confirmUnarchiveId, onUnarchive]);

  const onCancelConfirm = useCallback(() => {
    if (confirmCancelId && onCancel) {
      onCancel(confirmCancelId);
    }
    setConfirmCancelId(null);
  }, [confirmCancelId, onCancel]);

  const onDeleteConfirm = useCallback(() => {
    if (confirmDeleteId && onDelete) {
      onDelete(confirmDeleteId);
    }
    setConfirmDeleteId(null);
  }, [confirmDeleteId, onDelete]);

  return (
    <>
      {/* The title link is stretched over the whole card (after:inset-0), so
          the card is one click target; only the ⋮ menu sits above it.
          pt-0: the banner sits flush with the top edge of the card.
          gap-2 keeps the title close to the description. Cards in a grid row
          stretch to the tallest one, so the footer is pinned to the bottom with
          mt-auto; pb-2 on the content keeps a minimum gap above it. */}
      <Card className="group relative gap-2 pt-0 transition-colors hover:ring-primary/50 has-focus-visible:ring-2 has-focus-visible:ring-ring">
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
            <Link
              href={`/dashboard/master/events/${event.id}`}
              title={event.title}
              className="line-clamp-2 break-words text-primary outline-none after:absolute after:inset-0 group-hover:underline underline-offset-4"
            >
              <h2 className="contents">{event.title}</h2>
            </Link>
          </CardTitle>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={t("card.actionsAria")}
                    // relative z-10 lifts it above the stretched title link
                    className="relative z-10 -mt-1 -mr-2"
                  >
                    <EllipsisVertical />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={
                      <Link href={`/dashboard/master/events/${event.id}`} />
                    }
                  >
                    <Eye />
                    {t("card.view")}
                  </DropdownMenuItem>
                  <If condition={canEditEvent}>
                    <Then>
                      <DropdownMenuItem
                        render={
                          <Link
                            href={`/dashboard/master/events/${event.id}/edit`}
                          />
                        }
                      >
                        <Pencil />
                        {t("card.edit")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={canPublishEvent}>
                    <Then>
                      <DropdownMenuItem
                        onClick={() => setConfirmPublishId(event.id)}
                      >
                        <Send />
                        {t("card.publish")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={canArchiveEvent}>
                    <Then>
                      <DropdownMenuItem
                        onClick={() => setConfirmArchiveId(event.id)}
                      >
                        <Archive />
                        {t("card.archive")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={canUnarchiveEvent}>
                    <Then>
                      <DropdownMenuItem
                        onClick={() => setConfirmUnarchiveId(event.id)}
                      >
                        <ArchiveRestore />
                        {t("card.unarchive")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={canCancelEvent}>
                    <Then>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setConfirmCancelId(event.id)}
                      >
                        <Ban />
                        {t("card.cancel")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                  <If condition={canDeleteEventAction}>
                    <Then>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setConfirmDeleteId(event.id)}
                      >
                        <Trash />
                        {t("card.delete")}
                      </DropdownMenuItem>
                    </Then>
                  </If>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
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

      <AlertDialog
        open={confirmPublishId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmPublishId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.publishTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialogs.publishDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onPublishConfirm}>
              {t("dialogs.publishConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmArchiveId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmArchiveId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.archiveTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialogs.archiveDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onArchiveConfirm}>
              {t("dialogs.archiveConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmUnarchiveId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmUnarchiveId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.unarchiveTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialogs.unarchiveDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onUnarchiveConfirm}>
              {t("dialogs.unarchiveConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmCancelId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmCancelId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.cancelTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialogs.cancelDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onCancelConfirm}>
              {t("dialogs.cancelConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialogs.deleteDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDeleteConfirm}>
              {t("dialogs.deleteConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
