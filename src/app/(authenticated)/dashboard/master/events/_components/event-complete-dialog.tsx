"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Else, If, Then } from "react-if";

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
import { useCompleteEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-complete-event-by-id";
import {
  getEventMemberSearchParam,
  useGetEventMemberPagination,
} from "@/app/(authenticated)/dashboard/master/events/_hooks/use-get-event-member-pagination";
import { EVENT_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/master/events/_constants/event-member-preview";
import EventDetailDeleteMemberRow from "@/app/(authenticated)/dashboard/master/events/_components/event-detail-delete-member-row";
import type { TEventCompleteDialogProps } from "@/app/(authenticated)/dashboard/master/events/_types/event-complete-dialog-props";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import CONFIG from "@/common/constants/config";
import { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_EVENTS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages/shared";

const MEMBER_STATUS_KEY = {
  [EventMemberStatusEnum.REGISTERED]: "enums.memberStatus.registered",
  [EventMemberStatusEnum.ABSENT]: "enums.memberStatus.absent",
  [EventMemberStatusEnum.ATTENDED]: "enums.memberStatus.attended",
} as const;

export default function EventCompleteDialog({
  eventId,
  open,
  onOpenChange,
}: TEventCompleteDialogProps) {
  const { t } = useT(MASTER_EVENTS_SHARED_MESSAGES);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | number | undefined>(
    undefined,
  );
  const query = useGetEventMemberPagination(
    eventId,
    EVENT_MEMBER_DIALOG_PER_PAGE,
    { search, enabled: open },
  );
  const items = query.data?.pages.flatMap((page) => page.data.data.items) ?? [];
  const isSearching = !!getEventMemberSearchParam(search);
  const [scrollNode, setScrollNode] = useState<HTMLDivElement | null>(null);
  const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);

  const onScrollBoxRef = useCallback((node: HTMLDivElement | null) => {
    setScrollNode(node);
  }, []);

  const onSentinelRef = useCallback((node: HTMLDivElement | null) => {
    setSentinelNode(node);
  }, []);

  const onSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchInput(value);
      if (value && value.length < 3) {
        return;
      }
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => {
        setSearch(value);
      }, 300);
    },
    [],
  );

  const onDialogOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = undefined;
        setSearchInput("");
        setSearch("");
        setSelectedUserIds([]);
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange],
  );

  const completeEvent = useCompleteEventById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
      onDialogOpenChange(false);
    },
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        // A missing event leaves the page. Any other 404 stays open.
        if (mutationError.message.startsWith("Event with id")) {
          router.push("/dashboard/master/events");
          return;
        }
        toast.error(mutationError.message || t("complete.errorFallback"));
        return;
      }
      if (mutationError instanceof MainAPIValidationError) {
        toast.error(
          mutationError.errors[0]?.messages[0] ?? t("complete.errorFallback"),
        );
      }
    },
  });

  const isCompleting = completeEvent.isPending || completeEvent.isPaused;

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const onReachEnd = useCallback(() => {
    // A failed page leaves the sentinel intersecting. Re-attaching the
    // observer would retry forever, so Try again owns that retry.
    if (
      !query.hasNextPage ||
      query.isFetchingNextPage ||
      query.isFetchNextPageError
    ) {
      return;
    }
    void query.fetchNextPage();
  }, [query]);

  const onTryAgainClick = useCallback(() => {
    void query.fetchNextPage();
  }, [query]);

  const onUserCheckedChange = useCallback(
    (userId: string, checked: boolean) => {
      setSelectedUserIds((current) => {
        if (checked && !current.includes(userId)) {
          return [...current, userId];
        }
        if (!checked) {
          return current.filter((id) => id !== userId);
        }
        return current;
      });
    },
    [],
  );

  const onCompleteClick = useCallback(() => {
    if (isCompleting || selectedUserIds.length === 0) {
      return;
    }
    completeEvent.mutate({
      id: eventId,
      payload: { user_ids: selectedUserIds },
    });
  }, [completeEvent, isCompleting, selectedUserIds, eventId]);

  useEffect(() => {
    if (!open || !scrollNode || !sentinelNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onReachEnd();
        }
      },
      { root: scrollNode, rootMargin: "80px" },
    );

    observer.observe(sentinelNode);
    return () => observer.disconnect();
  }, [open, scrollNode, sentinelNode, onReachEnd]);

  return (
    <AlertDialog open={open} onOpenChange={onDialogOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("complete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("complete.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputGroup>
          <InputGroupInput
            value={searchInput}
            placeholder={t("complete.searchPlaceholder")}
            onChange={onSearchInputChange}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div ref={onScrollBoxRef} className="max-h-80 min-h-0 overflow-y-auto">
          <If condition={query.isLoading}>
            <Then>
              <div className="flex justify-center py-3">
                <Spinner />
              </div>
            </Then>
            <Else>
              <If condition={query.isError}>
                <Then>
                  <p className="italic text-muted-foreground">
                    {t("complete.loadError")}
                  </p>
                </Then>
                <Else>
                  <If condition={items.length === 0}>
                    <Then>
                      <If condition={isSearching}>
                        <Then>
                          <p className="italic text-muted-foreground">
                            {t("complete.emptySearch")}
                          </p>
                        </Then>
                        <Else>
                          <p className="italic text-muted-foreground">
                            {t("complete.empty")}
                          </p>
                        </Else>
                      </If>
                    </Then>
                    <Else>
                      <ul className="flex flex-col gap-3">
                        {items.map((member) => (
                          <li key={member.id}>
                            <EventDetailDeleteMemberRow
                              member={member}
                              checked={selectedUserIds.includes(member.user.id)}
                              disabled={isCompleting}
                              onCheckedChange={onUserCheckedChange}
                              statusLabel={t(MEMBER_STATUS_KEY[member.status])}
                            />
                          </li>
                        ))}
                      </ul>
                    </Else>
                  </If>
                </Else>
              </If>
            </Else>
          </If>
          <If condition={query.isFetchingNextPage}>
            <Then>
              <div className="flex justify-center py-3">
                <Spinner />
              </div>
            </Then>
          </If>
          <If condition={query.isFetchNextPageError}>
            <Then>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onTryAgainClick}
              >
                {t("complete.tryAgain")}
              </Button>
            </Then>
          </If>
          <div ref={onSentinelRef} className="h-px" />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("complete.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={isCompleting || selectedUserIds.length === 0}
            onClick={onCompleteClick}
          >
            <If condition={isCompleting}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
            </If>
            {t("complete.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
