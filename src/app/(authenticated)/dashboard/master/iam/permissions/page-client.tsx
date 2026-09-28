"use client";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useFilter } from "@/app/_hooks/use-filter";
import { createSortByParser } from "@/libs/nuqs/parse-sort-by";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { PermissionModuleEnum } from "@/api/main/modules/master/iam/permissions/enums/permission-module";
import { PermissionActionEnum } from "@/api/main/modules/master/iam/permissions/enums/permission-action";
import type { TPermissionPaginationPayload } from "@/api/main/modules/master/iam/permissions/types/permission-pagination-payload";

import PermissionTable from "@/app/(authenticated)/dashboard/master/iam/permissions/_components/permission-table";
import { useGetPermissionPagination } from "@/app/(authenticated)/dashboard/master/iam/permissions/_hooks/use-get-permission-pagination";
import type { TPermissionTableFilterValues } from "@/app/(authenticated)/dashboard/master/iam/permissions/_types/permission-table-props";
import type { TPermissionTableSortBy } from "@/app/(authenticated)/dashboard/master/iam/permissions/_types/permission-table-sort-by";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;

export default function PermissionsPageClient() {
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    sortBy: createSortByParser(
      ["id", "module", "action", "key", "created_at", "updated_at"] as const,
      "Permissions",
    ),
    order: parseAsStringEnum<OrderKeyEnum>(Object.values(OrderKeyEnum)),
    module: parseAsStringEnum<PermissionModuleEnum>(
      Object.values(PermissionModuleEnum),
    ),
    action: parseAsStringEnum<PermissionActionEnum>(
      Object.values(PermissionActionEnum),
    ),
  });

  const { control, handleSubmit, reset } =
    useForm<TPermissionTableFilterValues>({
      defaultValues: {
        module: (queryStates.module as PermissionModuleEnum) || null,
        action: (queryStates.action as PermissionActionEnum) || null,
      },
    });

  const { onFilterReset, onFilterSubmit, columnFilters } =
    useFilter<TPermissionTableFilterValues>(
      ["module", "action"],
      queryStates,
      setQueryStates,
      reset,
    );

  const queryStatesIntoPayload: TPermissionPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: queryStates.pageSize,
      search: queryStates.search,
      // nuqs parsers return null when unset, but API expects undefined — coalesce
      sort_by: queryStates.sortBy ?? undefined,
      order: queryStates.order ?? undefined,
      module: queryStates.module ?? undefined,
      action: queryStates.action ?? undefined,
    }),
    [queryStates],
  );

  const { data: responseData, isLoading } = useGetPermissionPagination(
    queryStatesIntoPayload,
  );

  const onSearchChange = useCallback(
    (value: string) => {
      if (value && value !== "" && value.length < 3) {
        return;
      }

      if (debounceSearchTimeoutId) {
        clearTimeout(debounceSearchTimeoutId);
      }

      debounceSearchTimeoutId = setTimeout(() => {
        setQueryStates({ search: value, page: 1 });
      }, 300);
    },
    [setQueryStates],
  );

  const applySorting = useCallback(
    (key: string) => {
      if (queryStates.sortBy === key) {
        let desiredOrder: OrderKeyEnum | null = null;
        let desiredKey: TPermissionTableSortBy | null =
          key as TPermissionTableSortBy;

        switch (queryStates.order) {
          case OrderKeyEnum.ASC:
            desiredOrder = OrderKeyEnum.DESC;
            break;
          case OrderKeyEnum.DESC:
            desiredKey = null;
            break;
          default:
            desiredOrder = OrderKeyEnum.ASC;
            break;
        }

        setQueryStates({
          order: desiredOrder,
          sortBy: desiredKey,
          page: 1,
        });
      } else {
        setQueryStates({
          sortBy: key as TPermissionTableSortBy,
          order: OrderKeyEnum.ASC,
          page: 1,
        });
      }
    },
    [queryStates.order, queryStates.sortBy, setQueryStates],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
    },
    [setQueryStates],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      setQueryStates({ pageSize: pageSize, page: 1 });
    },
    [setQueryStates],
  );

  const breadcrumbItems = [
    {
      name: "Permissions",
    },
  ];

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <div className="flex flex-col">
          <AppBreadcrumb items={breadcrumbItems} />

          <div className="flex justify-between items-center mt-4 mb-6">
            <h1 className="font-heading text-2xl">Permissions</h1>
          </div>
        </div>

        <PermissionTable
          data={responseData?.data?.data?.items ?? []}
          isLoading={isLoading}
          pageCount={responseData?.data?.data?.meta?.total_page || 1}
          rowCount={responseData?.data?.data?.meta?.total_all_data || 0}
          queryTable={queryStates}
          columnFilters={columnFilters}
          onActionHandler={{
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            onSortingChange: applySorting,
            onSearchChange,
            onFilterForm: {
              filterControl: control,
              onFilterSubmit: handleSubmit(onFilterSubmit),
              onFilterReset,
            },
          }}
        />
      </main>
    </div>
  );
}
