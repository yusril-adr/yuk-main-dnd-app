"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Spinner } from "@/app/_components/ui/spinner";
import { useDeleteStoryMembers } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-delete-story-members";
import {
  getStoryMemberSearchParam,
  useGetStoryMemberPagination,
} from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-member-pagination";
import { STORY_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-member-preview";
import type { TStoryDetailDeleteMemberDialogProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-delete-member-dialog-props";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import CONFIG from "@/common/constants/config";

import StoryDetailDeleteMemberRow from "./story-detail-delete-member-row";

function getRemoveButtonLabel(count: number): string {
  if (count === 0) return "Remove";
  if (count === 1) return "Remove 1 member";
  return `Remove ${count} members`;
}

export default function StoryDetailDeleteMemberDialog({
  storyId,
  open,
  onOpenChange,
}: TStoryDetailDeleteMemberDialogProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | number | undefined>(
    undefined,
  );
  const query = useGetStoryMemberPagination(
    storyId,
    STORY_MEMBER_DIALOG_PER_PAGE,
    { search, enabled: open },
  );
  const items = query.data?.pages.flatMap((page) => page.data.data.items) ?? [];
  const isSearching = !!getStoryMemberSearchParam(search);
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

  const deleteMembers = useDeleteStoryMembers({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
      onDialogOpenChange(false);
    },
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        // Story missing leaves the detail page. A missing user, or a user who
        // is no longer a member, is a stale selection — stay open.
        if (mutationError.message.startsWith("Story with id")) {
          router.push("/dashboard/master/stories");
          return;
        }
        toast.error(
          mutationError.message || "Couldn't remove story members.",
        );
        return;
      }
      if (mutationError instanceof MainAPIValidationError) {
        toast.error(
          mutationError.errors[0]?.messages[0] ??
            "Couldn't remove story members.",
        );
      }
    },
  });

  const isRemoving = deleteMembers.isPending || deleteMembers.isPaused;

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

  const onUserCheckedChange = useCallback((userId: string, checked: boolean) => {
    setSelectedUserIds((current) => {
      if (checked && !current.includes(userId)) {
        return [...current, userId];
      }
      if (!checked) {
        return current.filter((id) => id !== userId);
      }
      return current;
    });
  }, []);

  const onCancelClick = useCallback(() => {
    onDialogOpenChange(false);
  }, [onDialogOpenChange]);

  const onDeleteClick = useCallback(() => {
    if (isRemoving || selectedUserIds.length === 0) {
      return;
    }
    deleteMembers.mutate({
      id: storyId,
      payload: { user_ids: selectedUserIds },
    });
  }, [deleteMembers, isRemoving, selectedUserIds, storyId]);

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
    <Dialog open={open} onOpenChange={onDialogOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove members</DialogTitle>
          <DialogDescription className="sr-only">
            Remove adventurers from this party
          </DialogDescription>
        </DialogHeader>
        <InputGroup>
          <InputGroupInput
            value={searchInput}
            placeholder="Type minimum 3 characters to search ..."
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
                    Couldn&apos;t load party members.
                  </p>
                </Then>
                <Else>
                  <If condition={items.length === 0}>
                    <Then>
                      <If condition={isSearching}>
                        <Then>
                          <p className="italic text-muted-foreground">
                            No adventurers match this search.
                          </p>
                        </Then>
                        <Else>
                          <p className="italic text-muted-foreground">
                            No adventurers have joined this party yet.
                          </p>
                        </Else>
                      </If>
                    </Then>
                    <Else>
                      <ul className="flex flex-col gap-3">
                        {items.map((member) => (
                          <li key={member.id}>
                            <StoryDetailDeleteMemberRow
                              member={member}
                              checked={selectedUserIds.includes(member.user.id)}
                              disabled={isRemoving}
                              onCheckedChange={onUserCheckedChange}
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
                Try again
              </Button>
            </Then>
          </If>
          <div ref={onSentinelRef} className="h-px" />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancelClick}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isRemoving || selectedUserIds.length === 0}
            onClick={onDeleteClick}
          >
            <If condition={isRemoving}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
            </If>
            {getRemoveButtonLabel(selectedUserIds.length)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
