"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, notFound } from "next/navigation";
import { If, Then, Else } from "react-if";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
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
import { PermissionEnum } from "@/common/enums/permission";
import CONFIG from "@/common/constants/config";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import type { TStoryResponse } from "@/api/main/modules/master/stories/types/story-response";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

import { useDeleteStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-delete-story-by-id";
import { useGetStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-by-id";
import { useArchiveStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-archive-story-by-id";
import { useUnarchiveStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-unarchive-story-by-id";
import { usePublishStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-publish-story-by-id";
import StoryDetailHero from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-hero";
import StoryDetailQuestCard from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-quest-card";
import StoryDetailAdventureCard from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-adventure-card";
import StoryDetailChronicleCard from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-chronicle-card";
import StoryDetailMembersCard from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-members-card";
import StoryDetailSkeleton from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-skeleton";
import StoryDetailActions from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-actions";
import { canManageStory } from "@/app/(authenticated)/dashboard/master/stories/_utils/can-manage-story";

export default function StoryDetailPageClient() {
  const { auth } = useAuthContext();
  const { id } = useParams();
  const router = useRouter();
  const storyId = id as string;
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isUnarchiveDialogOpen, setIsUnarchiveDialogOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const storyQuery = useGetStoryById(storyId);
  const story = storyQuery.data?.data?.data;
  const canUpdateStory = canManageStory(
    auth,
    story,
    PermissionEnum.STORIES_UPDATE,
  );
  const canDeleteStory = canManageStory(
    auth,
    story,
    PermissionEnum.STORIES_DELETE,
  );
  const deleteStoryMutation = useDeleteStoryById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
      }
    },
    onSuccess: () => {
      router.push("/dashboard/master/stories");
    },
  });

  const archiveStoryMutation = useArchiveStoryById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
      }
    },
    onSuccess: () => {
      // Refreshes the list and this detail query (its key starts with STORY.ALL())
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
    },
  });

  const unarchiveStoryMutation = useUnarchiveStoryById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
      }
    },
    onSuccess: () => {
      // Refreshes the list and this detail query (its key starts with STORY.ALL())
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
    },
  });

  const publishStoryMutation = usePublishStoryById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
      }
    },
    onSuccess: () => {
      // Refreshes the list and this detail query (its key starts with STORY.ALL())
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
    },
  });

  const canArchiveStory =
    canUpdateStory && story?.status !== StoryStatusEnum.ARCHIVED;
  // Unarchive restores the status saved when the story was archived
  const canUnarchiveStory =
    canUpdateStory && story?.status === StoryStatusEnum.ARCHIVED;
  const canPublishStory =
    canUpdateStory && story?.status === StoryStatusEnum.DRAFT;

  useEffect(() => {
    if (
      storyQuery.isError &&
      storyQuery.error instanceof MainAPINotFoundError
    ) {
      notFound();
    }
  }, [storyQuery.error, storyQuery.isError, router]);

  const breadcrumbItems = useMemo(
    () => [
      { name: "Stories", link: "/dashboard/master/stories" },
      { name: story?.title ?? "Detail" },
    ],
    [story?.title],
  );

  const onPublishHandler = () => {
    publishStoryMutation.mutate(storyId);
    setIsPublishDialogOpen(false);
  };

  const onArchiveHandler = () => {
    archiveStoryMutation.mutate(storyId);
    setIsArchiveDialogOpen(false);
  };

  const onUnarchiveHandler = () => {
    unarchiveStoryMutation.mutate(storyId);
    setIsUnarchiveDialogOpen(false);
  };

  const onDeleteHandler = () => {
    deleteStoryMutation.mutate(storyId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href="/dashboard/master/stories">
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Story Detail</h1>
          <If condition={!!story && (canUpdateStory || canDeleteStory)}>
            <Then>
              <StoryDetailActions
                storyId={storyId}
                canEdit={canUpdateStory}
                canPublish={canPublishStory}
                canArchive={canArchiveStory}
                canUnarchive={canUnarchiveStory}
                canDelete={canDeleteStory}
                isPublishPending={publishStoryMutation.isPending}
                isArchivePending={archiveStoryMutation.isPending}
                isUnarchivePending={unarchiveStoryMutation.isPending}
                onPublishClick={() => setIsPublishDialogOpen(true)}
                onArchiveClick={() => setIsArchiveDialogOpen(true)}
                onUnarchiveClick={() => setIsUnarchiveDialogOpen(true)}
                onDeleteClick={() => setIsDeleteDialogOpen(true)}
              />
            </Then>
          </If>
        </div>

        <If condition={storyQuery.isLoading}>
          <Then>
            <StoryDetailSkeleton />
          </Then>
          <Else>
            <If condition={!!story}>
              <Then>
                <div className="flex flex-col gap-6">
                  <StoryDetailHero story={story as TStoryResponse} />
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <StoryDetailQuestCard
                      story={story as TStoryResponse}
                      className="lg:col-span-2 lg:self-start"
                    />
                    <div className="flex flex-col gap-6">
                      <StoryDetailAdventureCard
                        story={story as TStoryResponse}
                      />
                      <StoryDetailChronicleCard
                        story={story as TStoryResponse}
                      />
                    </div>
                  </div>
                  <StoryDetailMembersCard storyId={storyId} />
                </div>
              </Then>
            </If>
          </Else>
        </If>

        <AlertDialog
          open={isPublishDialogOpen}
          onOpenChange={setIsPublishDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publish story?</AlertDialogTitle>
              <AlertDialogDescription>
                The story will be marked as published.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={publishStoryMutation.isPending}
                onClick={onPublishHandler}
              >
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isArchiveDialogOpen}
          onOpenChange={setIsArchiveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Archive story?</AlertDialogTitle>
              <AlertDialogDescription>
                The story will be marked as archived. You can unarchive it later
                to restore its previous status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={archiveStoryMutation.isPending}
                onClick={onArchiveHandler}
              >
                Archive
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isUnarchiveDialogOpen}
          onOpenChange={setIsUnarchiveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unarchive story?</AlertDialogTitle>
              <AlertDialogDescription>
                The story will go back to the status it had before it was
                archived (Draft or Published).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={unarchiveStoryMutation.isPending}
                onClick={onUnarchiveHandler}
              >
                Unarchive
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete story?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The story will be removed from the
                system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteStoryMutation.isPending}
                onClick={onDeleteHandler}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
