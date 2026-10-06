"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";
import { useQueryClient } from "@tanstack/react-query";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import { createSortByParser } from "@/libs/nuqs/parse-sort-by";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { PermissionEnum } from "@/common/enums/permission";
import CONFIG from "@/common/constants/config";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import type { TStoryPaginationPayload } from "@/api/main/modules/master/stories/types/story-pagination-payload";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

import StoryCardList from "@/app/(authenticated)/dashboard/master/stories/_components/story-card-list";
import type {
  TStoryCardListFilters,
  TStoryCardListUserItem,
} from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-list-props";
import { useGetStoryPagination } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-story-pagination";
import { useDeleteStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-delete-story-by-id";
import { useArchiveStoryById } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-archive-story-by-id";
import { useGetUserPagination } from "@/app/(authenticated)/dashboard/master/stories/_hooks/use-get-user-pagination";

export default function StoriesPageClient() {
  const router = useRouter();
  const { auth } = useAuthContext();
  const queryClient = useQueryClient();
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(12),
    search: parseAsString.withDefault(""),
    sortBy: createSortByParser(
      [
        "title",
        "status",
        "type",
        "game_system",
        "max_members",
        "exp_awarded",
        "point_awarded",
        "start_at",
        "location_type",
        "created_at",
        "updated_at",
      ] as const,
      "Stories",
    ).withDefault("updated_at"),
    order: parseAsStringEnum<OrderKeyEnum>(
      Object.values(OrderKeyEnum),
    ).withDefault(OrderKeyEnum.DESC),
    status: parseAsStringEnum<StoryStatusEnum>(Object.values(StoryStatusEnum)),
    type: parseAsStringEnum<StoryTypeEnum>(Object.values(StoryTypeEnum)),
    locationType: parseAsStringEnum<StoryLocationTypeEnum>(
      Object.values(StoryLocationTypeEnum),
    ),
    createdBy: parseAsString,
  });

  const queryStatesIntoPayload: TStoryPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: queryStates.pageSize,
      search: queryStates.search,
      // nuqs parsers return null when unset, but API expects undefined — coalesce
      sort_by: queryStates.sortBy ?? undefined,
      order: queryStates.order ?? undefined,
      status: queryStates.status ?? undefined,
      type: queryStates.type ?? undefined,
      location_type: queryStates.locationType ?? undefined,
      created_by: queryStates.createdBy ?? undefined,
    }),
    [queryStates],
  );

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetStoryPagination(queryStatesIntoPayload);
  const { mutate: deleteStoryMutate } = useDeleteStoryById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/stories");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
    },
  });
  const { mutate: archiveStoryMutate } = useArchiveStoryById({
    // Refresh on success and on error (e.g. 404 when the story was deleted
    // elsewhere), so the card shows its real status or disappears
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL()],
      });
    },
  });

  const stories = useMemo(
    () => responseData?.data?.data?.items ?? [],
    [responseData],
  );

  // Searching users needs users:view — without it the API returns 403 (error toast),
  // so the "Created By" filter is hidden and the query is disabled.
  const canViewUsers = !!auth?.permissions.includes(PermissionEnum.USERS_VIEW);
  const [userSearch, setUserSearch] = useState("");
  const { data: usersData } = useGetUserPagination(userSearch || undefined, {
    enabled: canViewUsers,
  });

  const userItems = useMemo(() => {
    const items: TStoryCardListUserItem[] = (
      usersData?.data?.data?.items ?? []
    ).map((user) => ({ value: user.id, label: user.display_name }));

    // The applied creator may not be in the current user search results. While the
    // filter is active every listed story has that creator, so use its display_name.
    const creator = stories.find(
      (story) => story.created_by?.id === queryStates.createdBy,
    )?.created_by;
    if (creator && !items.some((item) => item.value === creator.id)) {
      items.unshift({ value: creator.id, label: creator.display_name });
    }

    return items;
  }, [usersData, stories, queryStates.createdBy]);

  useEffect(() => {
    if (isError && error instanceof MainAPINotFoundError) {
      router.push("/dashboard/master/stories");
    }
  }, [error, isError, router]);

  const onSearchChange = useCallback(
    (value: string) => {
      setQueryStates({ search: value, page: 1 });
    },
    [setQueryStates],
  );

  const onFilterApply = useCallback(
    (filters: TStoryCardListFilters) => {
      setQueryStates({ ...filters, page: 1 });
    },
    [setQueryStates],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
    },
    [setQueryStates],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      setQueryStates({ pageSize, page: 1 });
    },
    [setQueryStates],
  );

  const canCreateStories = auth?.permissions.includes(
    PermissionEnum.STORIES_CREATE,
  );

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={[{ name: "Stories" }]} />

        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="font-heading text-2xl">Stories</h1>
          {canCreateStories && (
            <Button
              render={<Link href="/dashboard/master/stories/create" />}
              nativeButton={false}
            >
              <Plus /> Add Story
            </Button>
          )}
        </div>

        <StoryCardList
          data={stories}
          isLoading={isLoading}
          pageCount={responseData?.data?.data?.meta?.total_page || 1}
          rowCount={responseData?.data?.data?.meta?.total_all_data || 0}
          queryTable={queryStates}
          userItems={userItems}
          canFilterByCreator={canViewUsers}
          onUserSearchChange={setUserSearch}
          onActionHandler={{
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            onSearchChange,
            onFilterApply,
            onArchiveStory: archiveStoryMutate,
            onDeleteStory: deleteStoryMutate,
          }}
        />
      </main>
    </div>
  );
}
