"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
} from "@/app/_components/ui/empty";
import { ItemGroup } from "@/app/_components/ui/item";
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
import { useT } from "@/app/_hooks/use-t";
import { COMMON_MESSAGES } from "@/messages/common";

import BoardStoryDetailMemberRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-member-row";
import { BOARD_STORY_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import {
  getBoardStoryMemberSearchParam,
  useGetBoardStoryMemberPagination,
} from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_hooks/use-get-board-story-member-pagination";
import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailMembersDialogProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// Read-only full party list with search and infinite scroll
export default function BoardStoryDetailMembersDialog({
  storyId,
  open,
  onOpenChange,
}: TBoardStoryDetailMembersDialogProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);
  const { t: tCommon } = useT(COMMON_MESSAGES);
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
          <DialogTitle>{t("party.title")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("party.dialogDescription")}
          </DialogDescription>
        </DialogHeader>
        <InputGroup>
          <InputGroupInput
            value={searchInput}
            placeholder={t("party.searchPlaceholder")}
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
                  <Empty className="p-4">
                    <EmptyHeader>
                      <EmptyDescription className="italic">
                        {t("party.loadError")}
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </Then>
                <Else>
                  <If condition={items.length === 0}>
                    <Then>
                      <Empty className="p-4">
                        <EmptyHeader>
                          <EmptyDescription className="italic">
                            {isSearching
                              ? t("party.emptySearch")
                              : t("party.empty")}
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    </Then>
                    <Else>
                      <ItemGroup className="gap-3">
                        {items.map((member) => (
                          <BoardStoryDetailMemberRow
                            key={member.id}
                            member={member}
                            variant="detail"
                          />
                        ))}
                      </ItemGroup>
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
                {tCommon("actions.tryAgain")}
              </Button>
            </Then>
          </If>
          <div ref={setSentinelNode} className="h-px" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
