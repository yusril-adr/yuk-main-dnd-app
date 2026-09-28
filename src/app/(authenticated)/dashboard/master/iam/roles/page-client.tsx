"use client";

import { useCallback, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import { createSortByParser } from "@/libs/nuqs/parse-sort-by";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { PermissionEnum } from "@/common/enums/permission";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import type { TRolePaginationPayload } from "@/api/main/modules/master/iam/roles/types/role-pagination-payload";

import RoleTable from "@/app/(authenticated)/dashboard/master/iam/roles/_components/role-table";
import { useGetRolePagination } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-get-role-pagination";
import { useDeleteRoleById } from "@/app/(authenticated)/dashboard/master/iam/roles/_hooks/use-delete-role-by-id";
import CONFIG from "@/common/constants/config";
import { useQueryClient } from "@tanstack/react-query";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;
type TRoleTableSortBy =
  | "id"
  | "name"
  | "description"
  | "created_at"
  | "updated_at";

export default function RolesPageClient() {
  const router = useRouter();
  const { auth } = useAuthContext();
  const queryClient = useQueryClient();
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    sortBy: createSortByParser(
      ["id", "name", "description", "created_at", "updated_at"] as const,
      "Roles",
    ),
    order: parseAsStringEnum<OrderKeyEnum>(Object.values(OrderKeyEnum)),
  });

  const queryStatesIntoPayload: TRolePaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: queryStates.pageSize,
      search: queryStates.search,
      sort_by: queryStates.sortBy ?? undefined,
      order: queryStates.order ?? undefined,
    }),
    [queryStates],
  );

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetRolePagination(queryStatesIntoPayload);
  const { mutate: deleteRoleMutate } = useDeleteRoleById({
    onError: (mutationError) => {
      if (mutationError instanceof MainAPINotFoundError) {
        router.push("/dashboard/master/iam/roles");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL()],
      });
    },
  });

  useEffect(() => {
    if (isError && error instanceof MainAPINotFoundError) {
      router.push("/dashboard/master/iam/roles");
    }
  }, [error, isError, router]);

  const onSearchChange = useCallback(
    (value: string) => {
      if (value && value.length < 3) {
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
        let desiredKey: TRoleTableSortBy | null = key as TRoleTableSortBy;

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
          sortBy: key as TRoleTableSortBy,
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
      setQueryStates({ pageSize, page: 1 });
    },
    [setQueryStates],
  );

  const canCreateRoles = auth?.permissions.includes(
    PermissionEnum.ROLES_CREATE,
  );

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={[{ name: "Roles" }]} />

        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="font-heading text-2xl">Roles</h1>
          {canCreateRoles && (
            <Button
              render={<Link href="/dashboard/master/iam/roles/create" />}
              nativeButton={false}
            >
              <Plus /> Add Role
            </Button>
          )}
        </div>

        <RoleTable
          data={responseData?.data?.data?.items ?? []}
          isLoading={isLoading}
          pageCount={responseData?.data?.data?.meta?.total_page || 1}
          rowCount={responseData?.data?.data?.meta?.total_all_data || 0}
          queryTable={queryStates}
          onActionHandler={{
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            onSortingChange: applySorting,
            onSearchChange,
            onDeleteRole: deleteRoleMutate,
          }}
        />
      </main>
    </div>
  );
}
