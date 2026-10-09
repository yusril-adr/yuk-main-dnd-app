import Link from "next/link";
import {
  Archive,
  ArchiveRestore,
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

import type { TStoryDetailActionsProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-actions-props";

export default function StoryDetailActions({
  storyId,
  canEdit,
  canPublish,
  canArchive,
  canUnarchive,
  canDelete,
  isPublishPending,
  isArchivePending,
  isUnarchivePending,
  onPublishClick,
  onArchiveClick,
  onUnarchiveClick,
  onDeleteClick,
}: TStoryDetailActionsProps) {
  const editHref = `/dashboard/master/stories/${storyId}/edit`;

  return (
    <div className="ms-auto">
      {/* sm and up: full buttons */}
      <div className="hidden gap-2 sm:flex">
        <If condition={canEdit}>
          <Then>
            <Button render={<Link href={editHref} />} nativeButton={false}>
              <Pencil /> Edit
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
              <Send /> Publish
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
              <Archive /> Archive
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
              <ArchiveRestore /> Unarchive
            </Button>
          </Then>
        </If>
        <If condition={canDelete}>
          <Then>
            <Button variant="destructive" onClick={onDeleteClick}>
              <Trash /> Delete
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
              <Button size="icon-sm" variant="ghost" aria-label="Story actions">
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
                    Edit
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
                    Publish
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
                    Archive
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
                    Unarchive
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
                    Delete
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
