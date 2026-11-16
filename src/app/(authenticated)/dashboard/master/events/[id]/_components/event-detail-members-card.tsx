"use client";

import { useCallback, useState } from "react";
import { UserPlus, UserRoundGroup } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import { useGetEventMemberPagination } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-get-event-member-pagination";
import { EVENT_MEMBER_PREVIEW_COUNT } from "@/app/(authenticated)/dashboard/master/events/_constants/event-member-preview";
import type { TEventDetailMembersCardProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-members-card-props";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

import EventDetailAddMemberDialog from "./event-detail-add-member-dialog";
import EventDetailDeleteMemberDialog from "./event-detail-delete-member-dialog";
import EventDetailMemberRow from "./event-detail-member-row";
import EventDetailMembersCardSkeleton from "./event-detail-members-card-skeleton";
import EventDetailMembersDialog from "./event-detail-members-dialog";
import EventDetailSectionCard from "./event-detail-section-card";

export default function EventDetailMembersCard({
  eventId,
  canAddMembers,
  canRemoveMembers,
  canCreateGuestUser,
}: TEventDetailMembersCardProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const query = useGetEventMemberPagination(
    eventId,
    EVENT_MEMBER_PREVIEW_COUNT,
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
          <EventDetailMembersCardSkeleton />
        </Then>
        <Else>
          <EventDetailSectionCard
            icon={UserRoundGroup}
            title={t("party.title")}
          >
            <If condition={query.isError}>
              <Then>
                <p className="italic text-muted-foreground">
                  {t("party.loadError")}
                </p>
              </Then>
              <Else>
                <If condition={items.length === 0}>
                  <Then>
                    <p className="italic text-muted-foreground">
                      {t("party.empty")}
                    </p>
                    <If condition={canAddMembers}>
                      <Then>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={onAddMemberClick}
                        >
                          <UserPlus data-icon="inline-start" />
                          {t("party.addMember")}
                        </Button>
                      </Then>
                    </If>
                  </Then>
                  <Else>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((member) => (
                        <li key={member.id}>
                          <EventDetailMemberRow
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
                      {t("party.showMore")}
                    </Button>
                  </Else>
                </If>
              </Else>
            </If>
          </EventDetailSectionCard>
        </Else>
      </If>
      <EventDetailMembersDialog
        eventId={eventId}
        open={isDialogOpen}
        onOpenChange={onDialogOpenChange}
        canAddMembers={canAddMembers}
        canRemoveMembers={canRemoveMembers}
        onDeleteMember={onDeleteMemberClick}
        onAddMember={onAddMemberClick}
      />
      <EventDetailAddMemberDialog
        eventId={eventId}
        open={isAddDialogOpen}
        onOpenChange={onAddDialogOpenChange}
        canCreateGuestUser={canCreateGuestUser}
      />
      <EventDetailDeleteMemberDialog
        eventId={eventId}
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
      />
    </>
  );
}
