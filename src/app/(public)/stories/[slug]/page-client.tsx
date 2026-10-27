"use client";

import { useEffect } from "react";
import { History, Scroll } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { Else, If, Then } from "react-if";

import RichTextContent from "@/app/_components/rich-text-content";
import dayjs from "@/libs/dayjs";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";

import { useGetPublicStoryByIdentifier } from "@/app/(public)/stories/[slug]/_hooks/use-get-public-story-by-identifier";
import PublicStoryDetailHero from "@/app/(public)/stories/[slug]/_components/public-story-detail-hero";
import PublicStoryDetailSection from "@/app/(public)/stories/[slug]/_components/public-story-detail-section";
import PublicStoryDetailSummary from "@/app/(public)/stories/[slug]/_components/public-story-detail-summary";
import PublicStoryDetailSkeleton from "@/app/(public)/stories/[slug]/_components/public-story-detail-skeleton";
import PublicStoryParty from "@/app/(public)/stories/[slug]/_components/public-story-party";
import PublicStoryComments from "@/app/(public)/stories/[slug]/_components/public-story-comments";
import PublicStoryErrorState from "@/app/(public)/stories/_components/public-story-error-state";
import { PUBLIC_STORY_DETAIL_DATE_FORMAT } from "@/app/(public)/stories/[slug]/_constants/public-story-detail-date-format";

export default function PublicStoryDetailPageClient() {
  // Slug URL; the API also accepts the id, so old /stories/<id> links still work
  const { slug } = useParams();
  const storyIdentifier = slug as string;
  const { auth } = useAuthContext();
  // Keyed by viewer so action_list refetches after login/logout
  const storyQuery = useGetPublicStoryByIdentifier(storyIdentifier, {
    userId: auth?.id,
  });
  const story = storyQuery.data?.data?.data;
  const isNotFound =
    storyQuery.isError && storyQuery.error instanceof MainAPINotFoundError;

  useEffect(() => {
    // 404 for unknown ids and for stories that are not published/completed
    if (isNotFound) {
      notFound();
    }
  }, [isNotFound]);

  return (
    <div className="w-full min-w-0">
      <If condition={storyQuery.isLoading}>
        <Then>
          <PublicStoryDetailSkeleton />
        </Then>
        <Else>
          <If condition={!!story}>
            <Then>
              {story && (
                <article className="flex flex-col pb-36 lg:pb-16">
                  <PublicStoryDetailHero story={story} />

                  <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pt-2 sm:gap-8 sm:px-6 lg:grid-cols-3 lg:px-10">
                    {/* Summary first on mobile, sticky right column on desktop */}
                    <PublicStoryDetailSummary
                      story={story}
                      className="lg:sticky lg:top-24 lg:order-last lg:self-start"
                    />

                    <div className="flex  flex-col gap-6 sm:gap-8 lg:col-span-2">
                      <PublicStoryDetailSection icon={Scroll} title="The Tale">
                        <If condition={!!story.description}>
                          <Then>
                            <RichTextContent
                              value={story.description as string}
                              className="text-base leading-relaxed"
                            />
                          </Then>
                          <Else>
                            <p className="italic text-muted-foreground">
                              No description has been written for this story
                              yet.
                            </p>
                          </Else>
                        </If>
                      </PublicStoryDetailSection>

                      <PublicStoryParty
                        storyId={story.id}
                        maxMembers={story.max_members}
                      />

                      <PublicStoryDetailSection
                        icon={History}
                        title="Chronicle"
                      >
                        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                          <div className="flex flex-col gap-1 rounded-sm border border-dashed bg-muted/40 p-4">
                            <dt className="text-xs text-muted-foreground uppercase">
                              Posted
                            </dt>
                            <dd className="font-medium">
                              {dayjs(story.created_at).format(
                                PUBLIC_STORY_DETAIL_DATE_FORMAT,
                              )}
                            </dd>
                          </div>
                          <div className="flex flex-col gap-1 rounded-sm border border-dashed bg-muted/40 p-4">
                            <dt className="text-xs text-muted-foreground uppercase">
                              Last updated
                            </dt>
                            <dd className="font-medium">
                              {dayjs(story.updated_at).format(
                                PUBLIC_STORY_DETAIL_DATE_FORMAT,
                              )}
                            </dd>
                          </div>
                        </dl>
                      </PublicStoryDetailSection>

                      <PublicStoryComments story={story} />
                    </div>
                  </div>
                </article>
              )}
            </Then>
            <Else>
              <If condition={storyQuery.isError && !isNotFound}>
                <Then>
                  <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
                    <PublicStoryErrorState
                      title="This tale could not be loaded"
                      description="Something went wrong while loading the story. Please try again."
                      onRetry={() => storyQuery.refetch()}
                    />
                  </div>
                </Then>
              </If>
            </Else>
          </If>
        </Else>
      </If>
    </div>
  );
}
