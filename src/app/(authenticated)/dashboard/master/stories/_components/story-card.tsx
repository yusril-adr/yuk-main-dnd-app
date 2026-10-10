import { useCallback, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  CircleCheck,
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
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { PermissionEnum } from "@/common/enums/permission";
import { getRichTextPlainText } from "@/utils/rich-text";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";
import { canManageStory } from "@/app/(authenticated)/dashboard/master/stories/_utils/can-manage-story";
import { canCompleteStory } from "@/app/(authenticated)/dashboard/master/stories/_utils/can-complete-story";
import { isCompletedStory } from "@/app/(authenticated)/dashboard/master/stories/_utils/is-completed-story";
import { formatStoryReward } from "@/app/(authenticated)/dashboard/master/stories/_utils/story-reward";
import { isCancelledStory } from "@/app/(authenticated)/dashboard/master/stories/_utils/is-cancelled-story";

import StoryCardBanner from "./story-card-banner";
import StoryCompleteDialog from "./story-complete-dialog";
import StoryStatusBadge from "./story-status-badge";
import type { TStoryCardProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-props";

export default function StoryCard({
  story,
  onArchive,
  onUnarchive,
  onPublish,
  onDelete,
}: TStoryCardProps) {
  const { auth } = useAuthContext();
  const canUpdateStory = canManageStory(
    auth,
    story,
    PermissionEnum.STORIES_UPDATE,
  );
  const canDeleteStory = canManageStory(
    auth,
    story,
    PermissionEnum.STORIES_DELETE,
  );
  // Edit is hidden when cancelled or completed, including an archived story
  // whose previous status was cancelled or completed.
  const canEditStory =
    canUpdateStory && !isCancelledStory(story) && !isCompletedStory(story);
  const canCompleteStoryAction = canCompleteStory(canUpdateStory, story.status);
  const canDeleteStoryAction = canDeleteStory && !!onDelete;
  // Same rule as the detail page: allowed to update and not already archived
  const canArchiveStory =
    canUpdateStory && story.status !== StoryStatusEnum.ARCHIVED && !!onArchive;
  // Same rule as the detail page: allowed to update and currently archived
  const canUnarchiveStory =
    canUpdateStory &&
    story.status === StoryStatusEnum.ARCHIVED &&
    !!onUnarchive;
  const canPublishStory =
    canUpdateStory && story.status === StoryStatusEnum.DRAFT && !!onPublish;
  // Plain text from rich text HTML (or an old plain-text value); "" when the
  // description is empty or only has images
  const descriptionText = getRichTextPlainText(story.description);
  // Reward badges only for rewards above 0
  const expReward = formatStoryReward(story.exp_awarded, "XP");
  const goldReward = formatStoryReward(story.point_awarded, "GP");
  const [confirmArchiveId, setConfirmArchiveId] = useState<string | null>(null);
  const [confirmPublishId, setConfirmPublishId] = useState<string | null>(
    null,
  );
  const [confirmUnarchiveId, setConfirmUnarchiveId] = useState<string | null>(
    null,
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmCompleteId, setConfirmCompleteId] = useState<string | null>(
    null,
  );

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
          {/* Fixed 16:9 crop on list cards so every card is the same size
              (the form preview and detail page keep the natural ratio) */}
          <StoryCardBanner
            bannerUrl={story.banner_url}
            title={story.title}
            imageClassName="aspect-video max-h-none object-cover"
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Story actions"
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
                  View
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
                    Edit
                  </DropdownMenuItem>
                )}
                <If condition={canPublishStory}>
                  <Then>
                    <DropdownMenuItem
                      onClick={() => setConfirmPublishId(story.id)}
                    >
                      <Send />
                      Publish
                    </DropdownMenuItem>
                  </Then>
                </If>
                <If condition={canCompleteStoryAction}>
                  <Then>
                    <DropdownMenuItem
                      onClick={() => setConfirmCompleteId(story.id)}
                    >
                      <CircleCheck />
                      Complete
                    </DropdownMenuItem>
                  </Then>
                </If>
                <If condition={canArchiveStory}>
                  <Then>
                    <DropdownMenuItem
                      onClick={() => setConfirmArchiveId(story.id)}
                    >
                      <Archive />
                      Archive
                    </DropdownMenuItem>
                  </Then>
                </If>
                <If condition={canUnarchiveStory}>
                  <Then>
                    <DropdownMenuItem
                      onClick={() => setConfirmUnarchiveId(story.id)}
                    >
                      <ArchiveRestore />
                      Unarchive
                    </DropdownMenuItem>
                  </Then>
                </If>
                {canDeleteStoryAction && (
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setConfirmDeleteId(story.id)}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardHeader className="pt-2">
          <CardTitle className="min-w-0 truncate">
            <Button
              variant="link"
              className="p-0 h-auto text-base"
              render={<Link href={`/dashboard/master/stories/${story.id}`} />}
              nativeButton={false}
            >
              {story.title}
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-2">
          {/* min-h-15 = 3 lines of text-sm, keeps cards in the same row equal height */}
          <p className="line-clamp-3 min-h-15 text-muted-foreground">
            <If condition={!!descriptionText}>
              <Then>{descriptionText}</Then>
              <Else>No description.</Else>
            </If>
          </p>
        </CardContent>

        <CardFooter className="mt-auto border-t pt-3">
          {/* Status / type on the left, rewards on the right (wraps on narrow cards) */}
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <StoryStatusBadge status={story.status} />
              <Badge variant="outline">{STORY_TYPE_LABEL[story.type]}</Badge>
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
            <AlertDialogTitle>Publish story?</AlertDialogTitle>
            <AlertDialogDescription>
              The story will be marked as published.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onPublishConfirm}>
              Publish
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
            <AlertDialogTitle>Archive story?</AlertDialogTitle>
            <AlertDialogDescription>
              The story will be marked as archived. You can unarchive it later
              to restore its previous status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onArchiveConfirm}>
              Archive
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
            <AlertDialogTitle>Unarchive story?</AlertDialogTitle>
            <AlertDialogDescription>
              The story will go back to the status it had before it was archived
              (Draft or Published).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onUnarchiveConfirm}>
              Unarchive
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
            <AlertDialogTitle>Delete story?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The story will be removed from the
              system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <If condition={canCompleteStoryAction}>
        <Then>
          <StoryCompleteDialog
            storyId={story.id}
            open={confirmCompleteId !== null}
            onOpenChange={(open) => {
              if (!open) {
                setConfirmCompleteId(null);
              }
            }}
          />
        </Then>
      </If>
    </>
  );
}
