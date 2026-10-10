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
import { useAddStoryMembers } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-add-story-members";
import {
  getAvailableStoryUserSearchParam,
  useGetAvailableStoryUserPagination,
} from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-available-story-user-pagination";
import { STORY_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-member-preview";
import type { TStoryDetailAddMemberDialogProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-add-member-dialog-props";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import CONFIG from "@/common/constants/config";

import StoryDetailAddMemberRow from "./story-detail-add-member-row";

function getAddButtonLabel(count: number): string {
  if (count === 0) return "Add";
  if (count === 1) return "Add 1 member";
  return `Add ${count} members`;
}

export default function StoryDetailAddMemberDialog({
  storyId,
  open,
  onOpenChange,
}: TStoryDetailAddMemberDialogProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | number | undefined>(
    undefined,
  );
  const query = useGetAvailableStoryUserPagination(
    storyId,
    STORY_MEMBER_DIALOG_PER_PAGE,
    { search, enabled: open },
  );
  const items = query.data?.pages.flatMap((page) => page.data.data.items) ?? [];
  const isSearching = !!getAvailableStoryUserSearchParam(search);
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

  const addMembers = useAddStoryMembers({
    onSuccess: () => {
      // Member lists and this detail query all start with STORY.ALL().
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
      onDialogOpenChange(false);
    },
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
        return;
      }
      // 403/409/5xx are already toasted by the axios interceptor.
      // 400 validation arrays are not. Stay open and keep the selection.
      if (mutationError instanceof MainAPIValidationError) {
        toast.error(
          mutationError.errors[0]?.messages[0] ?? "Couldn't add story members.",
        );
      }
    },
  });

  const isAdding = addMembers.isPending || addMembers.isPaused;

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

  const onAddClick = useCallback(() => {
    if (isAdding || selectedUserIds.length === 0) {
      return;
    }
    addMembers.mutate({
      id: storyId,
      payload: { user_ids: selectedUserIds },
    });
  }, [addMembers, isAdding, selectedUserIds, storyId]);

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
          <DialogTitle>Add member</DialogTitle>
          <DialogDescription className="sr-only">
            Add adventurers to this party
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
                    Couldn&apos;t load available adventurers.
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
                            No adventurers are available to join.
                          </p>
                        </Else>
                      </If>
                    </Then>
                    <Else>
                      <ul className="flex flex-col gap-3">
                        {items.map((user) => (
                          <li key={user.id}>
                            <StoryDetailAddMemberRow
                              user={user}
                              checked={selectedUserIds.includes(user.id)}
                              disabled={isAdding}
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
            disabled={isAdding || selectedUserIds.length === 0}
            onClick={onAddClick}
          >
            <If condition={isAdding}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
            </If>
            {getAddButtonLabel(selectedUserIds.length)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
