import { ChevronDown, RotateCw, Users } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Spinner } from "@/app/_components/ui/spinner";

import PublicStoryDetailSection from "./public-story-detail-section";
import PublicStoryPartyMember from "./public-story-party-member";
import { useGetPublicStoryMemberPagination } from "@/app/(public)/stories/_hooks/use-get-public-story-member-pagination";
import { PUBLIC_STORY_MEMBER_PER_PAGE } from "@/app/(public)/stories/_constants/public-story-member";
import type { TPublicStoryPartyProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryParty({
  storyId,
  maxMembers,
  className,
}: TPublicStoryPartyProps) {
  const membersQuery = useGetPublicStoryMemberPagination(
    storyId,
    PUBLIC_STORY_MEMBER_PER_PAGE,
  );
  const pages = membersQuery.data?.pages ?? [];
  const members = pages.flatMap((page) => page.data?.data?.items ?? []);
  // Latest page has the freshest total
  const meta = pages[pages.length - 1]?.data?.data?.meta;
  const total = meta?.total_all_data ?? 0;

  return (
    <PublicStoryDetailSection
      icon={Users}
      title="The Party"
      className={className}
    >
      <If condition={!!meta}>
        <Then>
          <p className="-mt-2 text-sm text-foreground/80">
            <span className="font-medium text-foreground">{total}</span>{" "}
            {total === 1 ? "adventurer has" : "adventurers have"} joined
            {maxMembers ? (
              <>
                {" · up to "}
                <span className="font-medium text-foreground">
                  {maxMembers}
                </span>{" "}
                will be rewarded
              </>
            ) : null}
          </p>
        </Then>
      </If>

      <If condition={membersQuery.isLoading}>
        <Then>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 rounded-md border p-3"
              >
                <Skeleton className="size-11 rounded-full" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3.5 w-3/4" />
                </div>
              </li>
            ))}
          </ul>
        </Then>
        <Else>
          <If condition={membersQuery.isError}>
            <Then>
              <div className="flex flex-col items-center gap-3 rounded-md border border-destructive/40 bg-destructive/5 px-4 py-6 text-center">
                <p className="text-sm text-foreground">
                  The party roster could not be read.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => membersQuery.refetch()}
                >
                  <RotateCw /> Try again
                </Button>
              </div>
            </Then>
            <Else>
              <If condition={members.length === 0}>
                <Then>
                  <div className="flex flex-col items-center gap-2 rounded-md border border-dashed bg-muted/40 px-4 py-8 text-center">
                    <Users className="size-6 text-primary" />
                    <p className="font-heading text-lg">
                      No adventurers have joined yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The table awaits its first hero.
                    </p>
                  </div>
                </Then>
                <Else>
                  <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {members.map((member) => (
                      <PublicStoryPartyMember key={member.id} member={member} />
                    ))}
                  </ul>

                  <If condition={membersQuery.hasNextPage}>
                    <Then>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto sm:self-center"
                        disabled={membersQuery.isFetchingNextPage}
                        onClick={() => membersQuery.fetchNextPage()}
                      >
                        {membersQuery.isFetchingNextPage ? (
                          <Spinner />
                        ) : (
                          <ChevronDown />
                        )}
                        {membersQuery.isFetchingNextPage
                          ? "Summoning adventurers..."
                          : `Show more adventurers (${total - members.length} more)`}
                      </Button>
                    </Then>
                  </If>
                </Else>
              </If>
            </Else>
          </If>
        </Else>
      </If>
    </PublicStoryDetailSection>
  );
}
