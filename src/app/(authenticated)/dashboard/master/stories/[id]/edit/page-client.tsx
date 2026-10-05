"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import StoryEditForm from "./_components/story-edit-form";
import { useGetStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-by-id";
import { useUpdateStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-update-story-by-id";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import CONFIG from "@/common/constants/config";

export default function StoryEditPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const storyId = id as string;
  const storyQuery = useGetStoryById(storyId);
  const updateStoryMutation = useUpdateStoryById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
      router.push(`/dashboard/master/stories/${storyId}`);
    },
    onError: (error) => {
      if (error instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
      }
    },
  });
  const story = storyQuery.data?.data?.data;
  useEffect(() => {
    if (
      storyQuery.isError &&
      storyQuery.error instanceof MainAPINotFoundError
    ) {
      notFound();
    }
  }, [storyQuery.error, storyQuery.isError, router]);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb
          items={[
            { name: "Stories", link: "/dashboard/master/stories" },
            ...(story
              ? [
                  {
                    name: story.title,
                    link: `/dashboard/master/stories/${storyId}`,
                  },
                ]
              : []),
            { name: "Edit" },
          ]}
        />

        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={`/dashboard/master/stories/${storyId}`}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Edit Story</h1>
        </div>

        <StoryEditForm
          story={story}
          isLoading={storyQuery.isLoading}
          onSubmitPayload={(payload) =>
            updateStoryMutation.mutate({ id: storyId, payload })
          }
          mutationError={updateStoryMutation.error}
          isPending={updateStoryMutation.isPending}
          isPaused={updateStoryMutation.isPaused}
        />
      </main>
    </div>
  );
}
