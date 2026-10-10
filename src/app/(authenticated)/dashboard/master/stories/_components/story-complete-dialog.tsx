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
import { useCompleteStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-complete-story-by-id";
import {
  getStoryMemberSearchParam,
  useGetStoryMemberPagination,
} from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-member-pagination";
import { STORY_MEMBER_DIALOG_PER_PAGE } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-member-preview";
import StoryDetailDeleteMemberRow from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-delete-member-row";
import type { TStoryCompleteDialogProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-complete-dialog-props";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import CONFIG from "@/common/constants/config";

export default function StoryCompleteDialog({
  storyId,
  open,
  onOpenChange,
}: TStoryCompleteDialogProps) {
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

  const completeStory = useCompleteStoryById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
      onDialogOpenChange(false);
    },
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        // A missing story leaves the page. Any other 404 stays open.
        if (mutationError.message.startsWith("Story with id")) {
          router.push("/dashboard/master/stories");
          return;
        }
        toast.error(mutationError.message || "Couldn't complete story.");
        return;
      }
      if (mutationError instanceof MainAPIValidationError) {
        toast.error(
          mutationError.errors[0]?.messages[0] ?? "Couldn't complete story.",
        );
      }
    },
  });

  const isCompleting = completeStory.isPending || completeStory.isPaused;

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

  const onCompleteClick = useCallback(() => {
    if (isCompleting) {
      return;
    }
    completeStory.mutate({
      id: storyId,
      payload: { user_ids: selectedUserIds },
    });
  }, [completeStory, isCompleting, selectedUserIds, storyId]);

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
          <AlertDialogTitle>Complete story?</AlertDialogTitle>
          <AlertDialogDescription>
            Choose who attended. Checked members are marked attended and receive
            rewards. Unchecked members are marked absent and receive no rewards.
            The story and its members cannot be edited after this.
          </AlertDialogDescription>
        </AlertDialogHeader>
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
                              disabled={isCompleting}
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
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={isCompleting}
            onClick={onCompleteClick}
          >
            <If condition={isCompleting}>
              <Then>
                <Spinner data-icon="inline-start" />
              </Then>
            </If>
            Complete story
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
