"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { Button } from "@/app/_components/ui/button";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import { createSortByParser } from "@/libs/nuqs/parse-sort-by";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { PermissionEnum } from "@/common/enums/permission";
import type { TUserPaginationPayload } from "@/api/main/modules/master/iam/users/types/user-pagination-payload";

import UserCardList from "@/app/(authenticated)/dashboard/master/iam/users/_components/user-card-list";
import type { TUserCardListSortBy } from "@/app/(authenticated)/dashboard/master/iam/users/_types/user-card-list-sort-by";
import { useGetUserPagination } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-pagination";
import { useDeleteUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-delete-user-by-id";
import { useGetRolePagination } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-role-pagination";
import CONFIG from "@/common/constants/config";

export default function UsersPageClient() {
  const { auth } = useAuthContext();
  const canCreateUsers = auth?.permissions.includes(
    PermissionEnum.USERS_CREATE,
  );

  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(12),
    search: parseAsString.withDefault(""),
    sortBy: createSortByParser(
      [
        "display_name",
        "username",
        "email",
        "dm_level",
        "player_level",
        "dm_exp",
        "player_exp",
        "created_at",
        "updated_at",
      ] as const,
      "Users",
    ).withDefault("updated_at"),
    order: parseAsStringEnum<OrderKeyEnum>(Object.values(OrderKeyEnum)).withDefault(
      OrderKeyEnum.DESC,
    ),
    roleIds: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const queryStatesIntoPayload: TUserPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: queryStates.pageSize,
      search: queryStates.search,
      sort_by: queryStates.sortBy ?? undefined,
      order: queryStates.order ?? undefined,
      role_ids: queryStates.roleIds.length > 0 ? queryStates.roleIds : undefined,
    }),
    [queryStates],
  );

  const queryClient = useQueryClient();
  const { data: responseData, isLoading } = useGetUserPagination(
    queryStatesIntoPayload,
  );
  const { mutate: deleteUserMutate } = useDeleteUserById({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL()],
      });
    },
  });

  const [roleSearch, setRoleSearch] = useState("");

  const { data: rolesData } = useGetRolePagination(roleSearch || undefined);
  const roleItems = (rolesData?.data?.data?.items ?? []).map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const items = responseData?.data?.data?.items ?? [];
  const meta = responseData?.data?.data?.meta;
  const pageCount = meta?.total_page || 1;
  const rowCount = meta?.total_all_data || 0;

  const onPageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
    },
    [setQueryStates],
  );

  const onPageSizeChange = useCallback(
    (pageSize: number) => {
      setQueryStates({ pageSize, page: 1 });
    },
    [setQueryStates],
  );

  const onSearchChange = useCallback(
    (value: string) => {
      setQueryStates({ search: value, page: 1 });
    },
    [setQueryStates],
  );

  const onFilterApply = useCallback(
    (filters: {
      sortBy: TUserCardListSortBy | null;
      order: OrderKeyEnum | null;
      roleIds: string[];
    }) => {
      setQueryStates({
        sortBy: filters.sortBy,
        order: filters.order,
        roleIds: filters.roleIds.length > 0 ? filters.roleIds : null,
        page: 1,
      });
    },
    [setQueryStates],
  );

  const onDeleteUser = useCallback(
    (id: string) => {
      deleteUserMutate(id);
    },
    [deleteUserMutate],
  );

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={[{ name: "Users" }]} />

        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="font-heading text-2xl">Users</h1>
          {canCreateUsers && (
            <Button
              render={<Link href="/dashboard/master/iam/users/create" />}
              nativeButton={false}
            >
              <Plus /> Add User
            </Button>
          )}
        </div>

        <UserCardList
          data={items}
          isLoading={isLoading}
          pageCount={pageCount}
          rowCount={rowCount}
          queryTable={{
            page: queryStates.page,
            pageSize: queryStates.pageSize,
            search: queryStates.search,
            sortBy: queryStates.sortBy,
            order: queryStates.order,
            roleIds: queryStates.roleIds,
          }}
          roleItems={roleItems}
          onRoleSearchChange={setRoleSearch}
          onActionHandler={{
            onPageChange,
            onPageSizeChange,
            onSearchChange,
            onFilterApply,
            onDeleteUser,
          }}
        />
      </main>
    </div>
  );
}