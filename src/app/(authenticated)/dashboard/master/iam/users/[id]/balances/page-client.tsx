"use client";

import { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { ArrowLeft, Coins, Medal } from "lucide-react";
import { createParser, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";
import { Else, If, Then } from "react-if";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useGetUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-by-id";
import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { USER_EXP_LOG_TYPE_LABEL } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type-label";
import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";
import { USER_POINT_LOG_TYPE_LABEL } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type-label";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import { PermissionEnum } from "@/common/enums/permission";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { createSortByParser } from "@/libs/nuqs/parse-sort-by";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import UserBalanceLogTable from "./_components/user-balance-log-table";
import { UserBalanceTabEnum } from "./_enums/user-balance-tab";
import { useGetUserExperiencePointPagination } from "./_hooks/use-get-user-experience-point-pagination";
import { useGetUserPointPagination } from "./_hooks/use-get-user-point-pagination";
import { USER_BALANCE_LOG_SORT_BY } from "./_types/user-balance-log-sort-by";
import type { TUserBalanceLogSortBy } from "./_types/user-balance-log-sort-by";
import { toUserBalanceLogPayload } from "./_utils/user-balance-log-payload";

let debounceSearchTimeoutId: NodeJS.Timeout | number | undefined;

const BALANCE_LOG_TYPE_VALUES = [
  ...new Set(
    [UserExpLogTypeEnum, UserPointLogTypeEnum].flatMap((enumObj) =>
      Object.values(enumObj).filter((value): value is number => typeof value === "number"),
    ),
  ),
];

const parseAsBalanceLogType = createParser({
  parse(value) {
    const parsed = Number(value);
    return BALANCE_LOG_TYPE_VALUES.includes(parsed) ? parsed : null;
  },
  serialize(value) {
    return String(value);
  },
});

function StatBlock({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted-foreground tracking-wider uppercase">
        {label}
      </span>
      <span className="text-lg font-heading font-medium">{value}</span>
    </div>
  );
}

export default function UserBalancesPageClient() {
  const { auth, authQuery } = useAuthContext();
  const { id } = useParams();
  const router = useRouter();
  const userId = id as string;
  const canViewPoints = !!auth?.permissions.includes(PermissionEnum.POINTS_VIEW);

  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    sortBy: createSortByParser(USER_BALANCE_LOG_SORT_BY, "Balances"),
    order: parseAsStringEnum<OrderKeyEnum>(Object.values(OrderKeyEnum)),
    tab: parseAsStringEnum<UserBalanceTabEnum>(
      Object.values(UserBalanceTabEnum),
    ).withDefault(UserBalanceTabEnum.EXPERIENCE_POINTS),
    type: parseAsBalanceLogType,
  });

  const userQuery = useGetUserById(userId);
  const user = userQuery.data?.data?.data;
  const payload = useMemo(
    () => toUserBalanceLogPayload(queryStates),
    [queryStates],
  );
  const logsEnabled = canViewPoints && userQuery.isSuccess;
  const expQuery = useGetUserExperiencePointPagination(userId, payload, {
    enabled:
      logsEnabled &&
      queryStates.tab === UserBalanceTabEnum.EXPERIENCE_POINTS,
  });
  const pointQuery = useGetUserPointPagination(userId, payload, {
    enabled:
      logsEnabled && queryStates.tab === UserBalanceTabEnum.GOLD_PIECES,
  });
  const expItems = expQuery.data?.data?.data?.items ?? [];
  const expMeta = expQuery.data?.data?.data?.meta;
  const pointItems = pointQuery.data?.data?.data?.items ?? [];
  const pointMeta = pointQuery.data?.data?.data?.meta;

  useEffect(() => {
    if (userQuery.isError && userQuery.error instanceof MainAPINotFoundError) {
      notFound();
    }
  }, [userQuery.error, userQuery.isError]);

  useEffect(() => {
    if (authQuery?.isSuccess && !canViewPoints) {
      router.replace(`/dashboard/master/iam/users/${userId}`);
    }
  }, [authQuery?.isSuccess, canViewPoints, router, userId]);

  const onTabChange = useCallback(
    (value: unknown) => {
      if (
        value !== UserBalanceTabEnum.EXPERIENCE_POINTS &&
        value !== UserBalanceTabEnum.GOLD_PIECES
      ) {
        return;
      }
      if (value === queryStates.tab) return;
      setQueryStates({
        tab: value,
        page: 1,
        search: "",
        sortBy: null,
        order: null,
        type: null,
      });
    },
    [queryStates.tab, setQueryStates],
  );

  const onSearchChange = useCallback(
    (value: string) => {
      if (value && value !== "" && value.length < 3) return;
      clearTimeout(debounceSearchTimeoutId);
      debounceSearchTimeoutId = setTimeout(() => {
        setQueryStates({ search: value, page: 1 });
      }, 300);
    },
    [setQueryStates],
  );

  const onSortingChange = useCallback(
    (key: string) => {
      if (queryStates.sortBy === key) {
        let desiredOrder: OrderKeyEnum | null = null;
        let desiredKey: TUserBalanceLogSortBy | null =
          key as TUserBalanceLogSortBy;
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
        return;
      }
      setQueryStates({
        sortBy: key as TUserBalanceLogSortBy,
        order: OrderKeyEnum.ASC,
        page: 1,
      });
    },
    [queryStates.order, queryStates.sortBy, setQueryStates],
  );

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

  const onExpFilterApply = useCallback(
    (type: UserExpLogTypeEnum | null) => {
      setQueryStates({ type, page: 1 });
    },
    [setQueryStates],
  );

  const onPointFilterApply = useCallback(
    (type: UserPointLogTypeEnum | null) => {
      setQueryStates({ type, page: 1 });
    },
    [setQueryStates],
  );

  const breadcrumbItems = useMemo(
    () => [
      { name: "Users", link: "/dashboard/master/iam/users" },
      {
        name: user?.display_name ?? "Detail",
        link: `/dashboard/master/iam/users/${userId}`,
      },
      { name: "Balances" },
    ],
    [user?.display_name, userId],
  );

  const queryTable = {
    page: queryStates.page,
    pageSize: queryStates.pageSize,
    search: queryStates.search,
    sortBy: queryStates.sortBy,
    order: queryStates.order,
    type: queryStates.type,
  };

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col px-10 pb-10">
        <AppBreadcrumb items={breadcrumbItems} />
        <div className="flex items-center mt-4 mb-6 gap-x-2">
          <Link href={`/dashboard/master/iam/users/${userId}`}>
            <ArrowLeft />
          </Link>
          <h1 className="font-heading text-2xl">Balances</h1>
        </div>

        <If condition={userQuery.isLoading}>
          <Then>
            <div className="grid grid-cols-3 gap-6 w-full mb-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-6 w-10" />
                </div>
              ))}
            </div>
          </Then>
          <Else>
            <div className="grid grid-cols-3 gap-6 w-full mb-6">
              <StatBlock
                label="Player EXP"
                value={user?.player_exp?.toLocaleString() ?? "-"}
              />
              <StatBlock
                label="DM EXP"
                value={user?.dm_exp?.toLocaleString() ?? "-"}
              />
              <StatBlock
                label="Gold Pieces"
                value={user?.points?.toLocaleString() ?? "-"}
              />
            </div>
          </Else>
        </If>

        <Tabs value={queryStates.tab} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger value={UserBalanceTabEnum.EXPERIENCE_POINTS}>
              <Medal className="size-4" /> Experience Points
            </TabsTrigger>
            <TabsTrigger value={UserBalanceTabEnum.GOLD_PIECES}>
              <Coins className="size-4" /> Gold Pieces
            </TabsTrigger>
          </TabsList>
          <TabsContent value={UserBalanceTabEnum.EXPERIENCE_POINTS}>
            <UserBalanceLogTable
              key={queryStates.tab}
              data={expItems}
              isLoading={expQuery.isLoading || expQuery.isFetching}
              pageCount={expMeta?.total_page || 1}
              rowCount={expMeta?.total_all_data || 0}
              queryTable={queryTable}
              typeOptions={[UserExpLogTypeEnum.PLAYER, UserExpLogTypeEnum.DM]}
              typeLabels={USER_EXP_LOG_TYPE_LABEL}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              onSortingChange={onSortingChange}
              onSearchChange={onSearchChange}
              onFilterApply={onExpFilterApply}
            />
          </TabsContent>
          <TabsContent value={UserBalanceTabEnum.GOLD_PIECES}>
            <UserBalanceLogTable
              key={queryStates.tab}
              data={pointItems}
              isLoading={pointQuery.isLoading || pointQuery.isFetching}
              pageCount={pointMeta?.total_page || 1}
              rowCount={pointMeta?.total_all_data || 0}
              queryTable={queryTable}
              typeOptions={[
                UserPointLogTypeEnum.INCOME,
                UserPointLogTypeEnum.EXPENSE,
              ]}
              typeLabels={USER_POINT_LOG_TYPE_LABEL}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              onSortingChange={onSortingChange}
              onSearchChange={onSearchChange}
              onFilterApply={onPointFilterApply}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
