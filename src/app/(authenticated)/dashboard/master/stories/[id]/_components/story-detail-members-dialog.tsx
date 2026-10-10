"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, UserMinus, UserPlus } from "lucide-react";
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
import {
  getStoryMemberSearchParam,
  useGetStoryMemberPagination,
} from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-member-pagination";
import { STORY_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-member-preview";
import type { TStoryDetailMembersDialogProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-members-dialog-props";

import StoryDetailMemberRow from "./story-detail-member-row";

export default function StoryDetailMembersDialog({
  storyId,
  open,
  onOpenChange,
  canManageMembers,
  onDeleteMember,
  onAddMember,
}: TStoryDetailMembersDialogProps) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | number | undefined>(
    undefined,
  );
  const query = useGetStoryMemberPagination(
    storyId,
    STORY_MEMBER_DIALOG_PER_PAGE,
    {
      search,
      enabled: open,
    },
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
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange],
  );

  const onAddMemberClick = useCallback(() => {
    onAddMember();
  }, [onAddMember]);

  const onDeleteMemberClick = useCallback(() => {
    onDeleteMember();
  }, [onDeleteMember]);

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
          <DialogTitle>Party</DialogTitle>
          <DialogDescription className="sr-only">
            Full list of story members
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
                            <StoryDetailMemberRow
                              member={member}
                              variant="detail"
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
        <If condition={canManageMembers}>
          <Then>
            <DialogFooter className="sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={onDeleteMemberClick}
              >
                <UserMinus data-icon="inline-start" />
                Remove
              </Button>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button type="button" onClick={onAddMemberClick}>
                  <UserPlus data-icon="inline-start" />
                  Add
                </Button>
              </div>
            </DialogFooter>
          </Then>
        </If>
      </DialogContent>
    </Dialog>
  );
}
