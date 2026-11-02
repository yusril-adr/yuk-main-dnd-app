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
import { useT } from "@/app/_hooks/use-t";
import {
  getStoryMemberSearchParam,
  useGetStoryMemberPagination,
} from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-member-pagination";
import { STORY_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-member-preview";
import type { TStoryDetailMembersDialogProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-members-dialog-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

import StoryDetailMemberRow from "./story-detail-member-row";

export default function StoryDetailMembersDialog({
  storyId,
  open,
  onOpenChange,
  canAddMembers,
  canRemoveMembers,
  onDeleteMember,
  onAddMember,
}: TStoryDetailMembersDialogProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);
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
                    {t("party.loadError")}
                  </p>
                </Then>
                <Else>
                  <If condition={items.length === 0}>
                    <Then>
                      <If condition={isSearching}>
                        <Then>
                          <p className="italic text-muted-foreground">
                            {t("party.emptySearch")}
                          </p>
                        </Then>
                        <Else>
                          <p className="italic text-muted-foreground">
                            {t("party.empty")}
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
                {t("party.tryAgain")}
              </Button>
            </Then>
          </If>
          <div ref={onSentinelRef} className="h-px" />
        </div>
        <If condition={canAddMembers || canRemoveMembers}>
          <Then>
            <DialogFooter className="sm:justify-between">
              <If condition={canRemoveMembers}>
                <Then>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onDeleteMemberClick}
                  >
                    <UserMinus data-icon="inline-start" />
                    {t("party.remove")}
                  </Button>
                </Then>
              </If>
              <If condition={canAddMembers}>
                <Then>
                  <div className="flex flex-col-reverse gap-2 sm:ml-auto sm:flex-row sm:justify-end">
                    <Button type="button" onClick={onAddMemberClick}>
                      <UserPlus data-icon="inline-start" />
                      {t("party.add")}
                    </Button>
                  </div>
                </Then>
              </If>
            </DialogFooter>
          </Then>
        </If>
      </DialogContent>
    </Dialog>
  );
}
