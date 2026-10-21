import { ChevronDown, RotateCw, Users } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Item, ItemGroup } from "@/app/_components/ui/item";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Spinner } from "@/app/_components/ui/spinner";

import PublicStoryDetailSection from "./public-story-detail-section";
import PublicStoryPartyMember from "./public-story-party-member";
import { useGetPublicStoryMemberPagination } from "@/app/[locale]/(public)/stories/[slug]/_hooks/use-get-public-story-member-pagination";
import { PUBLIC_STORY_MEMBER_PER_PAGE } from "@/app/[locale]/(public)/stories/[slug]/_constants/public-story-member";
import type { TPublicStoryPartyProps } from "@/app/[locale]/(public)/stories/[slug]/_types/public-story-detail-components-props";

export default function PublicStoryParty({
  storyId,
  maxMembers,
  className,
}: TPublicStoryPartyProps) {
  const t = useTranslations("storyDetail.party");
  const tActions = useTranslations("common.actions");
  const format = useFormatter();
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
      title={t("title")}
      className={className}
    >
      <If condition={!!meta}>
        <Then>
          <p className="-mt-2 text-sm text-foreground/80">
            {t.rich("joined", {
              count: total,
              total: format.number(total),
              num: (chunks) => (
                <span className="font-medium text-foreground">{chunks}</span>
              ),
            })}
            {maxMembers
              ? t.rich("playable", {
                  max: format.number(maxMembers),
                  num: (chunks) => (
                    <span className="font-medium text-foreground">
                      {chunks}
                    </span>
                  ),
                })
              : null}
          </p>
        </Then>
      </If>

      <If condition={membersQuery.isLoading}>
        <Then>
          <ItemGroup className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Item
                key={idx}
                role="listitem"
                variant="outline"
                size="sm"
                className="flex-nowrap"
              >
                <Skeleton className="size-11 rounded-full" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3.5 w-3/4" />
                </div>
              </Item>
            ))}
          </ItemGroup>
        </Then>
        <Else>
          <If condition={membersQuery.isError}>
            <Then>
              <div className="flex flex-col items-center gap-3 rounded-md border border-destructive/40 bg-destructive/5 px-4 py-6 text-center">
                <p className="text-sm text-foreground">
                  {t("error")}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => membersQuery.refetch()}
                >
                  <RotateCw /> {tActions("tryAgain")}
                </Button>
              </div>
            </Then>
            <Else>
              <If condition={members.length === 0}>
                <Then>
                  <div className="flex flex-col items-center gap-2 rounded-md border border-dashed bg-muted/40 px-4 py-8 text-center">
                    <Users className="size-6 text-primary" />
                    <p className="font-heading text-lg">
                      {t("emptyTitle")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("emptyDescription")}
                    </p>
                  </div>
                </Then>
                <Else>
                  <ItemGroup className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {members.map((member) => (
                      <PublicStoryPartyMember key={member.id} member={member} />
                    ))}
                  </ItemGroup>

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
                          ? t("loadingMore")
                          : t("showMore", {
                              count: format.number(total - members.length),
                            })}
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
