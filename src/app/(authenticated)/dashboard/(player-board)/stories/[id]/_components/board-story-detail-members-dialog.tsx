"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Spinner } from "@/app/_components/ui/spinner";

import BoardStoryDetailMemberRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-member-row";
import { BOARD_STORY_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import {
  getBoardStoryMemberSearchParam,
  useGetBoardStoryMemberPagination,
} from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_hooks/use-get-board-story-member-pagination";
import type { TBoardStoryDetailMembersDialogProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// Read-only full party list with search and infinite scroll
export default function BoardStoryDetailMembersDialog({
  storyId,
  open,
  onOpenChange,
}: TBoardStoryDetailMembersDialogProps) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const query = useGetBoardStoryMemberPagination(
    storyId,
    BOARD_STORY_MEMBER_DIALOG_PER_PAGE,
    { search, enabled: open },
  );
  const items =
    query.data?.pages.flatMap((page) => page.data?.data?.items ?? []) ?? [];
  const isSearching = !!getBoardStoryMemberSearchParam(search);
  const [scrollNode, setScrollNode] = useState<HTMLDivElement | null>(null);
  const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);

  const onSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchInput(value);
      if (value && value.length < 3) return;
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => setSearch(value), 300);
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

  useEffect(() => () => clearTimeout(searchTimeoutRef.current), []);

  const onReachEnd = useCallback(() => {
    // A failed page leaves the sentinel intersecting; Try again owns that retry
    if (
      !query.hasNextPage ||
      query.isFetchingNextPage ||
      query.isFetchNextPageError
    ) {
      return;
    }
    void query.fetchNextPage();
  }, [query]);

  useEffect(() => {
    if (!open || !scrollNode || !sentinelNode) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onReachEnd();
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
        <div ref={setScrollNode} className="max-h-80 min-h-0 overflow-y-auto">
          <If condition={query.isPending}>
            <Then>
              <div className="flex justify-center py-3">
                <Spinner />
              </div>
            </Then>
            <Else>
              <If condition={query.isError && items.length === 0}>
                <Then>
                  <p className="italic text-muted-foreground">
                    Couldn&apos;t load party members.
                  </p>
                </Then>
                <Else>
                  <If condition={items.length === 0}>
                    <Then>
                      <p className="italic text-muted-foreground">
                        {isSearching
                          ? "No adventurers match this search."
                          : "No adventurers have joined this party yet."}
                      </p>
                    </Then>
                    <Else>
                      <ul className="flex flex-col gap-3">
                        {items.map((member) => (
                          <li key={member.id}>
                            <BoardStoryDetailMemberRow
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
                onClick={() => void query.fetchNextPage()}
              >
                Try again
              </Button>
            </Then>
          </If>
          <div ref={setSentinelNode} className="h-px" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
