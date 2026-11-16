"use client";

import { useCallback, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createParser,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";
import { useQueryClient } from "@tanstack/react-query";
import { If, Then } from "react-if";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import { createSortByParser } from "@/libs/nuqs/parse-sort-by";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { PermissionEnum } from "@/common/enums/permission";
import CONFIG from "@/common/constants/config";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import type { TEventPaginationPayload } from "@/api/main/modules/master/events/types/event-pagination-payload";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

import EventCardList from "@/app/(authenticated)/dashboard/master/events/_components/event-card-list";
import type { TEventCardListFilters } from "@/app/(authenticated)/dashboard/master/events/_types/event-card-list-filters";
import type { TEventCardListUserItem } from "@/app/(authenticated)/dashboard/master/events/_types/event-card-list-user-item";
import { useGetEventPagination } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-get-event-pagination";
import { useDeleteEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-delete-event-by-id";
import { useArchiveEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-archive-event-by-id";
import { useUnarchiveEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-unarchive-event-by-id";
import { useCancelEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-cancel-event-by-id";
import { usePublishEventById } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-publish-event-by-id";
import { useGetUserOptions } from "@/app/(authenticated)/dashboard/master/events/_hooks/use-get-user-options";
import { EVENT_CREATED_BY_ALL } from "@/app/(authenticated)/dashboard/master/events/_constants/event-created-by-filter";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENTS_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/_messages";

function parseAsNumericEnum<T extends Record<string, number | string>>(
  enumObj: T,
) {
  const numericValues = Object.values(enumObj).filter(
    (v): v is number => typeof v === "number",
  );
  return createParser({
    parse: (value) => {
      const n = Number(value);
      return numericValues.includes(n) ? (n as T[keyof T] & number) : null;
    },
    serialize: (value) => String(value),
  });
}

export default function EventsPageClient() {
  const { t } = useT(MASTER_EVENTS_MESSAGES);
  const { auth } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(12),
    search: parseAsString.withDefault(""),
    sortBy: createSortByParser(
      [
        "title",
        "status",
        "max_members",
        "exp_awarded",
        "point_awarded",
        "start_at",
        "location_type",
        "created_at",
        "updated_at",
      ] as const,
      "Events",
    ).withDefault("updated_at"),
    order: parseAsStringEnum<OrderKeyEnum>(
      Object.values(OrderKeyEnum),
    ).withDefault(OrderKeyEnum.DESC),
    status: parseAsNumericEnum(EventStatusEnum),
    locationType: parseAsNumericEnum(EventLocationTypeEnum),
    createdBy: parseAsString,
  });

  // The list defaults to the current user's events; the "Created By" filter
  // (user options need no permission) can switch or clear it.
  const defaultCreatedBy = auth?.id ?? null;
  const createdBy =
    queryStates.createdBy === EVENT_CREATED_BY_ALL
      ? null
      : (queryStates.createdBy ?? defaultCreatedBy);

  const queryStatesIntoPayload: TEventPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: queryStates.pageSize,
      search: queryStates.search,
      // nuqs parsers return null when unset, but API expects undefined — coalesce
      sort_by: queryStates.sortBy ?? undefined,
      order: queryStates.order ?? undefined,
      status: queryStates.status ?? undefined,
      location_type: queryStates.locationType ?? undefined,
      created_by: createdBy ?? undefined,
    }),
    [queryStates, createdBy],
  );

  const { data: responseData, isLoading } = useGetEventPagination(
    queryStatesIntoPayload,
  );
  const { mutate: deleteEventMutate } = useDeleteEventById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/events");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });
  const { mutate: archiveEventMutate } = useArchiveEventById({
    // Refresh on success and on error (e.g. 404 when the event was deleted
    // elsewhere), so the card shows its real status or disappears
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  const { mutate: unarchiveEventMutate } = useUnarchiveEventById({
    // Same as archive: refresh on success and on error (404 / 400), so the
    // card shows its real status or disappears (e.g. under an Archived filter)
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  const { mutate: publishEventMutate } = usePublishEventById({
    // Refresh on success and on error (e.g. 404 when the event was deleted
    // elsewhere), so the card shows its real status or disappears
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  const { mutate: cancelEventMutate } = useCancelEventById({
    // Same as archive: refresh on success and on error (404 / 400), so the
    // card shows its real status or disappears (e.g. under a Published filter)
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL()],
      });
    },
  });

  const events = useMemo(
    () => responseData?.data?.data?.items ?? [],
    [responseData],
  );

  const [userSearch, setUserSearch] = useState("");
  const { data: usersData } = useGetUserOptions(userSearch || undefined);

  const userItems = useMemo(() => {
    const items: TEventCardListUserItem[] = (
      usersData?.data?.data?.items ?? []
    ).map((user) => ({ value: user.id, label: user.display_name }));

    // The applied creator may not be in the current user search results. While the
    // filter is active every listed event has that creator, so use its display_name.
    // Fall back to the logged-in user for the default filter (e.g. empty list).
    const creator =
      events.find((event) => event.created_by?.id === createdBy)?.created_by ??
      (auth && auth.id === createdBy ? auth : undefined);
    if (creator && !items.some((item) => item.value === creator.id)) {
      items.unshift({ value: creator.id, label: creator.display_name });
    }

    return items;
  }, [usersData, events, createdBy, auth]);

  const onSearchChange = useCallback(
    (value: string) => {
      setQueryStates({ search: value, page: 1 });
    },
    [setQueryStates],
  );

  const onFilterApply = useCallback(
    (filters: TEventCardListFilters) => {
      setQueryStates({
        ...filters,
        // Keep the URL clean for the default (current user); mark "any creator"
        // explicitly so it isn't replaced by the default.
        createdBy:
          filters.createdBy === defaultCreatedBy
            ? null
            : (filters.createdBy ??
              (defaultCreatedBy ? EVENT_CREATED_BY_ALL : null)),
        page: 1,
      });
    },
    [setQueryStates, defaultCreatedBy],
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

  const canCreateEvents = auth?.permissions.includes(
    PermissionEnum.EVENTS_CREATE,
  );

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={[{ name: t("breadcrumb") }]} />

        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="font-heading text-2xl">{t("title")}</h1>
          <If condition={!!canCreateEvents}>
            <Then>
              <Button
                render={<Link href="/dashboard/master/events/create" />}
                nativeButton={false}
              >
                <Plus /> {t("addEvent")}
              </Button>
            </Then>
          </If>
        </div>

        <EventCardList
          data={events}
          isLoading={isLoading}
          pageCount={responseData?.data?.data?.meta?.total_page || 1}
          rowCount={responseData?.data?.data?.meta?.total_all_data || 0}
          queryTable={{ ...queryStates, createdBy }}
          userItems={userItems}
          defaultCreatedBy={defaultCreatedBy}
          onUserSearchChange={setUserSearch}
          onActionHandler={{
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            onSearchChange,
            onFilterApply,
            onArchiveEvent: archiveEventMutate,
            onPublishEvent: publishEventMutate,
            onUnarchiveEvent: unarchiveEventMutate,
            onCancelEvent: cancelEventMutate,
            onDeleteEvent: deleteEventMutate,
          }}
        />
      </main>
    </div>
  );
}
