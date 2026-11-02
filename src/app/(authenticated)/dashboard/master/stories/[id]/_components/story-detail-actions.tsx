"use client";

import Link from "next/link";
import {
  Archive,
  ArchiveRestore,
  Ban,
  CircleCheck,
  EllipsisVertical,
  Pencil,
  Send,
  Trash,
} from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useT } from "@/app/_hooks/use-t";

import type { TStoryDetailActionsProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-actions-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

export default function StoryDetailActions({
  storyId,
  canEdit,
  canPublish,
  canComplete,
  canArchive,
  canUnarchive,
  canCancel,
  canDelete,
  isPublishPending,
  isArchivePending,
  isUnarchivePending,
  isCancelPending,
  onPublishClick,
  onCompleteClick,
  onArchiveClick,
  onUnarchiveClick,
  onCancelClick,
  onDeleteClick,
}: TStoryDetailActionsProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);
  const editHref = `/dashboard/master/stories/${storyId}/edit`;

  return (
    <div className="ms-auto">
      {/* sm and up: full buttons */}
      <div className="hidden gap-2 sm:flex">
        <If condition={canEdit}>
          <Then>
            <Button render={<Link href={editHref} />} nativeButton={false}>
              <Pencil /> {t("actions.edit")}
            </Button>
          </Then>
        </If>
        <If condition={canPublish}>
          <Then>
            <Button
              variant="default"
              disabled={isPublishPending}
              onClick={onPublishClick}
            >
              <Send /> {t("actions.publish")}
            </Button>
          </Then>
        </If>
        <If condition={canComplete}>
          <Then>
            <Button variant="default" onClick={onCompleteClick}>
              <CircleCheck /> {t("actions.complete")}
            </Button>
          </Then>
        </If>
        <If condition={canArchive}>
          <Then>
            <Button
              variant="outline"
              disabled={isArchivePending}
              onClick={onArchiveClick}
            >
              <Archive /> {t("actions.archive")}
            </Button>
          </Then>
        </If>
        <If condition={canUnarchive}>
          <Then>
            <Button
              variant="outline"
              disabled={isUnarchivePending}
              onClick={onUnarchiveClick}
            >
              <ArchiveRestore /> {t("actions.unarchive")}
            </Button>
          </Then>
        </If>
        <If condition={canCancel}>
          <Then>
            <Button
              variant="destructive"
              disabled={isCancelPending}
              onClick={onCancelClick}
            >
              <Ban /> {t("actions.cancel")}
            </Button>
          </Then>
        </If>
        <If condition={canDelete}>
          <Then>
            <Button variant="destructive" onClick={onDeleteClick}>
              <Trash /> {t("actions.delete")}
            </Button>
          </Then>
        </If>
      </div>

      {/* Below sm: three buttons don't fit next to the title, so collapse them
          into a ghost ⋯ menu like the story card's actions */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={t("actions.actionsAria")}
              >
                <EllipsisVertical />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <If condition={canEdit}>
                <Then>
                  <DropdownMenuItem render={<Link href={editHref} />}>
                    <Pencil />
                    {t("actions.edit")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canPublish}>
                <Then>
                  <DropdownMenuItem
                    disabled={isPublishPending}
                    onClick={onPublishClick}
                  >
                    <Send />
                    {t("actions.publish")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canComplete}>
                <Then>
                  <DropdownMenuItem onClick={onCompleteClick}>
                    <CircleCheck />
                    {t("actions.complete")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canArchive}>
                <Then>
                  <DropdownMenuItem
                    disabled={isArchivePending}
                    onClick={onArchiveClick}
                  >
                    <Archive />
                    {t("actions.archive")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canUnarchive}>
                <Then>
                  <DropdownMenuItem
                    disabled={isUnarchivePending}
                    onClick={onUnarchiveClick}
                  >
                    <ArchiveRestore />
                    {t("actions.unarchive")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canCancel}>
                <Then>
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={isCancelPending}
                    onClick={onCancelClick}
                  >
                    <Ban />
                    {t("actions.cancel")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canDelete}>
                <Then>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={onDeleteClick}
                  >
                    <Trash />
                    {t("actions.delete")}
                  </DropdownMenuItem>
                </Then>
              </If>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
