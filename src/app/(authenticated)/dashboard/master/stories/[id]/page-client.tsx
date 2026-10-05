"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { useParams, useRouter, notFound } from "next/navigation";
import { If, Then, Else } from "react-if";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { PermissionEnum } from "@/common/enums/permission";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { toTitleCase } from "@/utils/format-text";
import dayjs from "@/libs/dayjs";

import StoryCardBanner from "@/app/(authenticated)/dashboard/master/stories/_components/story-card-banner";
import StoryStatusBadge from "@/app/(authenticated)/dashboard/master/stories/_components/story-status-badge";
import { useDeleteStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-delete-story-by-id";
import { useGetStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-by-id";

export default function StoryDetailPageClient() {
  const { auth } = useAuthContext();
  const { id } = useParams();
  const router = useRouter();
  const storyId = id as string;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

  const renderValue = (value: string | null | undefined) => {
    if (storyQuery.isLoading) {
      return <Skeleton className="h-6 w-full" />;
    }

    return value || "-";
  };

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

        {/* pt-0: the banner sits flush with the top edge of the card */}
        <Card className="pt-0">
          <If condition={storyQuery.isLoading}>
            <Then>
              <Skeleton className="aspect-video w-full rounded-none" />
            </Then>
            <Else>
              <StoryCardBanner
                bannerUrl={story?.banner_url}
                title={story?.title ?? "Story banner"}
              />
            </Else>
          </If>

          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-1/3 border bg-secondary px-4 py-6">
                    Title
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(story?.title)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Slug
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(story?.slug)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Status
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    <If condition={storyQuery.isLoading}>
                      <Then>
                        <Skeleton className="h-6 w-full" />
                      </Then>
                      <Else>
                        <If condition={!!story}>
                          <Then>
                            <StoryStatusBadge
                              status={story?.status as StoryStatusEnum}
                            />
                          </Then>
                          <Else>-</Else>
                        </If>
                      </Else>
                    </If>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Type
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(story?.type && toTitleCase(story.type))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Game System
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(story?.game_system)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Max Members
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(story?.max_members?.toString())}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Start At
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(
                      story?.start_at &&
                        dayjs(story.start_at).format("YYYY-MM-DD HH:mm"),
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Location Type
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(story?.location_type && toTitleCase(story.location_type))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Location Detail
                  </TableHead>
                  <TableCell className="border px-4 py-6 whitespace-normal break-words">
                    {renderValue(story?.location_detail)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Description
                  </TableHead>
                  <TableCell className="border px-4 py-6 whitespace-normal break-words">
                    {renderValue(story?.description)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Created By
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(story?.created_by?.display_name)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Created At
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(
                      story &&
                        dayjs(story.created_at).format("YYYY-MM-DD HH:mm:ss"),
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="border bg-secondary px-4 py-6">
                    Updated At
                  </TableHead>
                  <TableCell className="border px-4 py-6">
                    {renderValue(
                      story &&
                        dayjs(story.updated_at).format("YYYY-MM-DD HH:mm:ss"),
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
