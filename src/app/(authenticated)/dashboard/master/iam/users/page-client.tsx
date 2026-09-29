"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Funnel, Plus, Search } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { Button } from "@/app/_components/ui/button";
import { ButtonGroup } from "@/app/_components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import { createSortByParser } from "@/libs/nuqs/parse-sort-by";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { PermissionEnum } from "@/common/enums/permission";
import { generatePages } from "@/utils/table-helper";
import type { TUserPaginationPayload } from "@/api/main/modules/master/iam/users/types/user-pagination-payload";

import UserCard from "@/app/(authenticated)/dashboard/master/iam/users/_components/user-card";
import UserCardSkeleton from "@/app/(authenticated)/dashboard/master/iam/users/_components/user-card-skeleton";
import type { TUserCardListSortBy } from "@/app/(authenticated)/dashboard/master/iam/users/_types/user-card-list-sort-by";
import { useGetUserPagination } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-pagination";
import { useDeleteUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-delete-user-by-id";
import { useGetAllRoles } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-all-roles";
import CONFIG from "@/common/constants/config";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;

const PAGE_SIZE_OPTIONS = [
  { label: "6 / page", value: 6 },
  { label: "12 / page", value: 12 },
  { label: "24 / page", value: 24 },
  { label: "48 / page", value: 48 },
];

const SORT_BY_OPTIONS = [
  { label: "Display Name", value: "display_name" },
  { label: "Username", value: "username" },
  { label: "Email", value: "email" },
  { label: "Created At", value: "created_at" },
  { label: "Updated At", value: "updated_at" },
];

const SORT_ORDER_OPTIONS = [
  { label: "Ascending", value: OrderKeyEnum.ASC },
  { label: "Descending", value: OrderKeyEnum.DESC },
];

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
        "created_at",
        "updated_at",
      ] as const,
      "Users",
    ),
    order: parseAsStringEnum<OrderKeyEnum>(Object.values(OrderKeyEnum)),
    roleId: parseAsString.withDefault(""),
  });

  const queryStatesIntoPayload: TUserPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: queryStates.pageSize,
      search: queryStates.search,
      sort_by: queryStates.sortBy ?? undefined,
      order: queryStates.order ?? undefined,
      role_ids: queryStates.roleId ? [queryStates.roleId] : undefined,
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

  const { data: rolesData } = useGetAllRoles();
  const roleOptions = (rolesData?.data?.data?.items ?? []).map((role) => ({
    label: role.name,
    value: role.id,
  }));

  const items = responseData?.data?.data?.items ?? [];
  const meta = responseData?.data?.data?.meta;
  const pageCount = meta?.total_page || 1;
  const rowCount = meta?.total_all_data || 0;

  const pages = useMemo(
    () =>
      generatePages({
        currentPage: queryStates.page,
        totalPages: pageCount,
      }),
    [queryStates.page, pageCount],
  );

  const dataStartIndex = (queryStates.page - 1) * queryStates.pageSize;
  const indexStart = rowCount === 0 ? 0 : dataStartIndex + 1;
  const indexEnd = Math.min(dataStartIndex + items.length, rowCount);
  const isFirstPage = queryStates.page === 1;
  const isLastPage = queryStates.page === pageCount;

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

  const [filterSortBy, setFilterSortBy] = useState<TUserCardListSortBy | null>(
    queryStates.sortBy ?? null,
  );
  const [filterOrder, setFilterOrder] = useState<OrderKeyEnum | null>(
    queryStates.order ?? null,
  );
  const [filterRoleId, setFilterRoleId] = useState<string>(
    queryStates.roleId ?? "",
  );

  const onFilterApply = useCallback(() => {
    setQueryStates({
      sortBy: filterSortBy,
      order: filterOrder,
      roleId: filterRoleId || null,
      page: 1,
    });
  }, [filterSortBy, filterOrder, filterRoleId, setQueryStates]);

  const onFilterClear = useCallback(() => {
    setFilterSortBy(null);
    setFilterOrder(null);
    setFilterRoleId("");
    setQueryStates({ sortBy: null, order: null, roleId: null, page: 1 });
  }, [setQueryStates]);

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

        <div className="flex items-center justify-between gap-2 mb-6">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <Funnel />
              Filter
            </PopoverTrigger>
            <PopoverContent align="start">
              <div className="flex flex-col gap-4 md:gap-2">
                <FieldGroup className="flex flex-col md:flex-row gap-4 md:gap-2">
                  <Field className="grid gap-2">
                    <FieldLabel>Sort By</FieldLabel>
                    <Select
                      items={SORT_BY_OPTIONS}
                      value={filterSortBy ?? undefined}
                      onValueChange={(val) => setFilterSortBy(val || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {SORT_BY_OPTIONS.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field className="grid gap-2">
                    <FieldLabel>Sort Order</FieldLabel>
                    <Select
                      items={SORT_ORDER_OPTIONS}
                      value={filterOrder ?? undefined}
                      onValueChange={(val) => setFilterOrder(val || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {SORT_ORDER_OPTIONS.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <Field className="grid gap-2">
                    <FieldLabel>Roles</FieldLabel>
                    <Select
                      items={roleOptions}
                      value={filterRoleId || undefined}
                      onValueChange={(val) => setFilterRoleId(val || "")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {roleOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>

                <FieldGroup className="mt-2">
                  <Field orientation="horizontal">
                    <Button
                      className="ms-auto"
                      variant="outline"
                      onClick={onFilterClear}
                    >
                      Clear
                    </Button>
                    <Button onClick={onFilterApply}>Apply</Button>
                  </Field>
                </FieldGroup>
              </div>
            </PopoverContent>
          </Popover>

          <InputGroup>
            <InputGroupInput
              placeholder="Type minimum 3 characters to search ..."
              onChange={(event) => onSearchChange(event.target.value)}
              defaultValue={queryStates.search}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading &&
            Array.from({ length: queryStates.pageSize }).map((_, idx) => (
              <UserCardSkeleton key={idx} />
            ))}

          {!isLoading &&
            items.map((user) => (
              <UserCard key={user.id} user={user} onDelete={deleteUserMutate} />
            ))}
        </div>

        {!isLoading && (
          <div className="flex flex-col md:flex-row justify-end items-center gap-2 mt-6">
            <span>
              {indexStart} - {indexEnd} of {rowCount} items
            </span>

            <ButtonGroup>
              <Button
                variant="ghost"
                size="icon"
                disabled={isFirstPage}
                onClick={() => handlePageChange(queryStates.page - 1)}
              >
                <ChevronLeft />
              </Button>

              {pages.map((page) => (
                <Button
                  key={page}
                  variant="ghost"
                  size="icon"
                  disabled={page === queryStates.page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="icon"
                disabled={isLastPage}
                onClick={() => handlePageChange(queryStates.page + 1)}
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>

            <Select
              items={PAGE_SIZE_OPTIONS}
              value={Number(queryStates.pageSize)}
              onValueChange={(val) =>
                handlePageSizeChange(val || queryStates.pageSize)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PAGE_SIZE_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </main>
    </div>
  );
}
