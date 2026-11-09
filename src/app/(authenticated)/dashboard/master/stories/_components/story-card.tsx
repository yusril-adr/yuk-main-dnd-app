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
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { formatStoryReward } from "@/app/(authenticated)/dashboard/master/stories/_utils/story-reward";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { localeToBcp47 } from "@/libs/i18n/locales";

import StoryCardBanner from "./story-card-banner";
import StoryStatusBadge from "./story-status-badge";
import type { TStoryCardProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-props";
import { MASTER_STORIES_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/_messages";

const STATUS_MESSAGE_KEY = {
  [StoryStatusEnum.DRAFT]: "enums.status.draft",
  [StoryStatusEnum.PUBLISHED]: "enums.status.published",
  [StoryStatusEnum.ARCHIVED]: "enums.status.archived",
  [StoryStatusEnum.CANCELLED]: "enums.status.cancelled",
  [StoryStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const TYPE_MESSAGE_KEY = {
  [StoryTypeEnum.ONESHOT]: "enums.type.oneshot",
  [StoryTypeEnum.CAMPAIGN]: "enums.type.campaign",
} as const;

export default function StoryCard({
  story,
  onArchive,
  onUnarchive,
  onPublish,
  onCancel,
  onDelete,
}: TStoryCardProps) {
  const { t } = useT(MASTER_STORIES_MESSAGES);
  const { locale } = useLocale();
  const canEditStory = story.action_list.is_can_update;
  const canDeleteStoryAction = story.action_list.is_can_delete && !!onDelete;
  const canArchiveStory = story.action_list.is_can_archive && !!onArchive;
  const canUnarchiveStory = story.action_list.is_can_unarchive && !!onUnarchive;
  const canPublishStory = story.action_list.is_can_publish && !!onPublish;
  const canCancelStory = story.action_list.is_can_cancel && !!onCancel;
  // Plain text from rich text HTML (or an old plain-text value); "" when the
  // description is empty or only has images
  const descriptionText = getRichTextPlainText(story.description);
  // Reward badges only for rewards above 0
  const bcp47 = localeToBcp47(locale);
  const expReward = formatStoryReward(story.exp_awarded, "EXP", bcp47);
  const goldReward = formatStoryReward(story.point_awarded, "GP", bcp47);
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
      {/* pt-0: the banner sits flush with the top edge of the card.
          gap-2 keeps the title close to the description. Cards in a grid row
          stretch to the tallest one, so the footer is pinned to the bottom with
          mt-auto; pb-2 on the content keeps a minimum gap above it. */}
      <Card className="gap-2 pt-0">
        <div className="relative">
          {/* Fixed 16:10 crop like the public story cards, so every card is
              the same size (the form preview keeps the natural ratio) */}
          <StoryCardBanner
            bannerUrl={story.banner_url}
            title={story.title}
            imageClassName="aspect-[16/10] max-h-none object-cover"
            placeholderClassName="aspect-[16/10]"
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label={t("card.actionsAria")}
                  // Plain ghost like the other ⋯ buttons; the drop shadow keeps the
                  // icon visible on light or busy banner images
                  className="absolute top-2 right-2 [&_svg]:drop-shadow-sm"
                >
                  <EllipsisVertical />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={
                    <Link href={`/dashboard/master/stories/${story.id}`} />
                  }
                >
                  <Eye />
                  {t("card.view")}
                </DropdownMenuItem>
                {canEditStory && (
                  <DropdownMenuItem
                    render={
                      <Link
                        href={`/dashboard/master/stories/${story.id}/edit`}
                      />
                    }
                  >
                    <Pencil />
                    {t("card.edit")}
                  </DropdownMenuItem>
                )}
                <If condition={canPublishStory}>
                  <Then>
                    <DropdownMenuItem
                      onClick={() => setConfirmPublishId(story.id)}
                    >
                      <Send />
                      {t("card.publish")}
                    </DropdownMenuItem>
                  </Then>
                </If>
                <If condition={canArchiveStory}>
                  <Then>
                    <DropdownMenuItem
                      onClick={() => setConfirmArchiveId(story.id)}
                    >
                      <Archive />
                      {t("card.archive")}
                    </DropdownMenuItem>
                  </Then>
                </If>
                <If condition={canUnarchiveStory}>
                  <Then>
                    <DropdownMenuItem
                      onClick={() => setConfirmUnarchiveId(story.id)}
                    >
                      <ArchiveRestore />
                      {t("card.unarchive")}
                    </DropdownMenuItem>
                  </Then>
                </If>
                <If condition={canCancelStory}>
                  <Then>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setConfirmCancelId(story.id)}
                    >
                      <Ban />
                      {t("card.cancel")}
                    </DropdownMenuItem>
                  </Then>
                </If>
                {canDeleteStoryAction && (
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setConfirmDeleteId(story.id)}
                  >
                    <Trash />
                    {t("card.delete")}
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardHeader className="pt-2">
          <CardTitle className="min-w-0">
            <Button
              variant="link"
              className="p-0 h-auto justify-start text-left text-base whitespace-normal"
              render={<Link href={`/dashboard/master/stories/${story.id}`} />}
              nativeButton={false}
              title={story.title}
            >
              <span className="line-clamp-2 break-words">{story.title}</span>
            </Button>
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
          {/* Status / type on the left, rewards on the right (wraps on narrow cards) */}
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <StoryStatusBadge
                status={story.status}
                label={t(STATUS_MESSAGE_KEY[story.status])}
              />
              <Badge variant="outline">
                {t(TYPE_MESSAGE_KEY[story.type])}
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
