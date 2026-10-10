"use client";

import { useCallback, useState } from "react";
import { UserPlus, UserRoundGroup } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { useGetStoryMemberPagination } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-member-pagination";
import { STORY_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-member-preview";
import type { TStoryDetailMembersCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-members-card-props";

import StoryDetailAddMemberDialog from "./story-detail-add-member-dialog";
import StoryDetailDeleteMemberDialog from "./story-detail-delete-member-dialog";
import StoryDetailMemberRow from "./story-detail-member-row";
import StoryDetailMembersCardSkeleton from "./story-detail-members-card-skeleton";
import StoryDetailMembersDialog from "./story-detail-members-dialog";
import StoryDetailSectionCard from "./story-detail-section-card";

export default function StoryDetailMembersCard({
  storyId,
  canManageMembers,
}: TStoryDetailMembersCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const query = useGetStoryMemberPagination(
    storyId,
    STORY_MEMBER_PREVIEW_COUNT,
  );
  const items = query.data?.pages[0]?.data.data.items ?? [];

  const onShowMoreClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const onAddMemberClick = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  const onDialogOpenChange = useCallback((nextOpen: boolean) => {
    setIsDialogOpen(nextOpen);
  }, []);

  const onAddDialogOpenChange = useCallback((nextOpen: boolean) => {
    setIsAddDialogOpen(nextOpen);
  }, []);

  const onDeleteMemberClick = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const onDeleteDialogOpenChange = useCallback((nextOpen: boolean) => {
    setIsDeleteDialogOpen(nextOpen);
  }, []);

  return (
    <>
      <If condition={query.isLoading}>
        <Then>
          <StoryDetailMembersCardSkeleton />
        </Then>
        <Else>
          <StoryDetailSectionCard icon={UserRoundGroup} title="Party">
            <If condition={query.isError}>
              <Then>
                <p className="italic text-muted-foreground">
                  Couldn&apos;t load party members.
                </p>
              </Then>
              <Else>
                <If condition={items.length === 0}>
                  <Then>
                    <p className="italic text-muted-foreground">
                      No adventurers have joined this party yet.
                    </p>
                    <If condition={canManageMembers}>
                      <Then>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={onAddMemberClick}
                        >
                          <UserPlus data-icon="inline-start" />
                          Add member
                        </Button>
                      </Then>
                    </If>
                  </Then>
                  <Else>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((member) => (
                        <li key={member.id}>
                          <StoryDetailMemberRow
                            member={member}
                            variant="avatar"
                          />
                        </li>
                      ))}
                    </ul>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onShowMoreClick}
                    >
                      Show more
                    </Button>
                  </Else>
                </If>
              </Else>
            </If>
          </StoryDetailSectionCard>
        </Else>
      </If>
      <StoryDetailMembersDialog
        storyId={storyId}
        open={isDialogOpen}
        onOpenChange={onDialogOpenChange}
        canManageMembers={canManageMembers}
        onDeleteMember={onDeleteMemberClick}
        onAddMember={onAddMemberClick}
      />
      <StoryDetailAddMemberDialog
        storyId={storyId}
        open={isAddDialogOpen}
        onOpenChange={onAddDialogOpenChange}
      />
      <StoryDetailDeleteMemberDialog
        storyId={storyId}
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
      />
    </>
  );
}
