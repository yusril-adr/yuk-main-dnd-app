"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Archive, Pencil, Trash } from "lucide-react";
import { useParams, useRouter, notFound } from "next/navigation";
import { If, Then, Else } from "react-if";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Button } from "@/app/_components/ui/button";
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
import StoryDetailHero from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-hero";
import StoryDetailQuestCard from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-quest-card";
import StoryDetailAdventureCard from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-adventure-card";
import StoryDetailChronicleCard from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-chronicle-card";
import StoryDetailSkeleton from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-skeleton";

export default function StoryDetailPageClient() {
  const { auth } = useAuthContext();
  const { id } = useParams();
  const router = useRouter();
  const storyId = id as string;
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const storyQuery = useGetStoryById(storyId);
  const story = storyQuery.data?.data?.data;
  const canUpdateStories = auth?.permissions.includes(
    PermissionEnum.STORIES_UPDATE,
  );
  const canDeleteStories = auth?.permissions.includes(
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

  const canArchiveStory =
    !!canUpdateStories && story?.status !== StoryStatusEnum.ARCHIVED;

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

  const onArchiveHandler = () => {
    archiveStoryMutation.mutate(storyId);
    setIsArchiveDialogOpen(false);
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
          {story && (canUpdateStories || canDeleteStories) && (
            <div className="ms-auto flex gap-2">
              {canUpdateStories && (
                <Button
                  render={
                    <Link href={`/dashboard/master/stories/${storyId}/edit`} />
                  }
                  nativeButton={false}
                >
                  <Pencil /> Edit
                </Button>
              )}
              <If condition={canArchiveStory}>
                <Then>
                  <Button
                    variant="outline"
                    disabled={archiveStoryMutation.isPending}
                    onClick={() => setIsArchiveDialogOpen(true)}
                  >
                    <Archive /> Archive
                  </Button>
                </Then>
              </If>
              {canDeleteStories && (
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash /> Delete
                </Button>
              )}
            </div>
          )}
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
                </div>
              </Then>
            </If>
          </Else>
        </If>

        <AlertDialog
          open={isArchiveDialogOpen}
          onOpenChange={setIsArchiveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Archive story?</AlertDialogTitle>
              <AlertDialogDescription>
                The story will be marked as archived. You can change its status
                again from the edit page.
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
