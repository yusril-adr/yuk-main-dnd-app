"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChessKnight,
  Coins,
  Sparkles,
  Plus,
  type LucideIcon,
} from "lucide-react";
import {
  createParser,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import { Button } from "@/app/_components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { useGetUserById } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-by-id";
import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { USER_EXP_LOG_TYPE_LABEL } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type-label";
import { UserExpLogDirectionEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-direction";
import { USER_EXP_LOG_DIRECTION_LABEL } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-direction-label";
import type { TAddUserExperiencePointsPayload } from "@/api/main/modules/master/iam/users/[id]/experience-points/types/add-user-experience-points-payload";
import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";
import { USER_POINT_LOG_TYPE_LABEL } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type-label";
import type { TAddUserPointsPayload } from "@/api/main/modules/master/iam/users/[id]/points/types/add-user-points-payload";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import CONFIG from "@/common/constants/config";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import AddUserExperiencePointsDialog from "./_components/add-user-experience-points-dialog";
import UserBalanceStatCard from "./_components/user-balance-stat-card";
import AddUserPointsDialog from "./_components/add-user-points-dialog";
import UserBalanceLogList from "./_components/user-balance-log-list";
import { UserBalanceTabEnum } from "./_enums/user-balance-tab";
import { useAddUserExperiencePoints } from "./_hooks/use-add-user-experience-points";
import { useAddUserPoints } from "./_hooks/use-add-user-points";
import { useGetUserExperiencePointPagination } from "./_hooks/use-get-user-experience-point-pagination";
import { useGetUserPointPagination } from "./_hooks/use-get-user-point-pagination";
import type { TUserBalanceLogListFilter } from "./_types/user-balance-log-list-props";
import { toUserBalanceLogPayload } from "./_utils/user-balance-log-payload";

let debounceSearchTimeoutId: NodeJS.Timeout | number | undefined;

const BALANCE_LOG_TYPE_VALUES = [
  ...new Set(
    [UserExpLogTypeEnum, UserPointLogTypeEnum].flatMap((enumObj) =>
      Object.values(enumObj).filter(
        (value): value is number => typeof value === "number",
      ),
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

const EXP_LOG_DIRECTION_OPTIONS = [
  UserExpLogDirectionEnum.INCREMENT,
  UserExpLogDirectionEnum.DECREMENT,
];

const parseAsExpLogDirection = createParser({
  parse(value) {
    const parsed = Number(value);
    return EXP_LOG_DIRECTION_OPTIONS.includes(parsed) ? parsed : null;
  },
  serialize(value) {
    return String(value);
  },
});

const EXP_LOG_TYPE_ICONS: Record<UserExpLogTypeEnum, LucideIcon> = {
  [UserExpLogTypeEnum.PLAYER]: ChessKnight,
  [UserExpLogTypeEnum.DM]: BookOpen,
};

const POINT_LOG_TYPE_ICONS: Record<UserPointLogTypeEnum, LucideIcon> = {
  [UserPointLogTypeEnum.INCOME]: ArrowDownLeft,
  [UserPointLogTypeEnum.EXPENSE]: ArrowUpRight,
};

const LOG_PAGE_SIZE = 10;

export default function UserBalancesPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId = id as string;

  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    tab: parseAsStringEnum<UserBalanceTabEnum>(
      Object.values(UserBalanceTabEnum),
    ).withDefault(UserBalanceTabEnum.EXPERIENCE_POINTS),
    type: parseAsBalanceLogType,
    direction: parseAsExpLogDirection,
  });
  const [isAddExpDialogOpen, setIsAddExpDialogOpen] = useState(false);
  const [isAddPointDialogOpen, setIsAddPointDialogOpen] = useState(false);
  const [addDialogTab, setAddDialogTab] = useState(queryStates.tab);
  if (queryStates.tab !== addDialogTab) {
    setAddDialogTab(queryStates.tab);
    setIsAddExpDialogOpen(false);
    setIsAddPointDialogOpen(false);
  }

  const userQuery = useGetUserById(userId);
  const user = userQuery.data?.data?.data;
  const canViewPoints = !!user && user.action_list.is_can_view_balances;
  const canCreatePoints = !!user && user.action_list.is_can_create_balances;
  // Direction only exists on EXP logs; never send it to the GP endpoint
  const direction =
    queryStates.tab === UserBalanceTabEnum.EXPERIENCE_POINTS
      ? queryStates.direction
      : null;
  const payload = useMemo(
    () =>
      toUserBalanceLogPayload({
        ...queryStates,
        direction,
        pageSize: LOG_PAGE_SIZE,
      }),
    [queryStates, direction],
  );
  const logsEnabled = canViewPoints && userQuery.isSuccess;
  // Until the user (and its permission) loads, the log queries are disabled
  // and report not loading; treat that wait as loading so the list shows its
  // skeleton instead of the empty state
  const isLogsPending = !logsEnabled;
  const expQuery = useGetUserExperiencePointPagination(userId, payload, {
    enabled:
      logsEnabled && queryStates.tab === UserBalanceTabEnum.EXPERIENCE_POINTS,
  });
  const pointQuery = useGetUserPointPagination(userId, payload, {
    enabled: logsEnabled && queryStates.tab === UserBalanceTabEnum.GOLD_PIECES,
  });
  const expItems = expQuery.data?.data?.data?.items ?? [];
  const expMeta = expQuery.data?.data?.data?.meta;
  const pointItems = pointQuery.data?.data?.data?.items ?? [];
  const pointMeta = pointQuery.data?.data?.data?.meta;

  const onAddSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL(), userId],
    });
    setQueryStates({ page: 1 });
  };
  const onAddError = (error: Error) => {
    if (error instanceof MainAPINotFoundError) notFound();
  };

  const {
    mutate: addExpMutate,
    error: addExpError,
    isPending: addExpIsPending,
  } = useAddUserExperiencePoints({
    onSuccess: onAddSuccess,
    onError: onAddError,
  });
  const {
    mutate: addPointMutate,
    error: addPointError,
    isPending: addPointIsPending,
  } = useAddUserPoints({
    onSuccess: onAddSuccess,
    onError: onAddError,
  });

  useEffect(() => {
    if (userQuery.isError && userQuery.error instanceof MainAPINotFoundError) {
      notFound();
    }
  }, [userQuery.error, userQuery.isError]);

  useEffect(() => {
    if (userQuery.isSuccess && !canViewPoints) {
      router.replace(`/dashboard/master/iam/users/${userId}`);
    }
  }, [userQuery.isSuccess, canViewPoints, router, userId]);

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
        type: null,
        direction: null,
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

  const onPageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
    },
    [setQueryStates],
  );

  const onExpFilterApply = useCallback(
    (filter: TUserBalanceLogListFilter<UserExpLogTypeEnum>) => {
      setQueryStates({
        type: filter.type,
        direction: filter.direction,
        page: 1,
      });
    },
    [setQueryStates],
  );

  const onPointFilterApply = useCallback(
    (filter: TUserBalanceLogListFilter<UserPointLogTypeEnum>) => {
      setQueryStates({
        type: filter.type,
        page: 1,
      });
    },
    [setQueryStates],
  );

  const onSubmitExperience = (payload: TAddUserExperiencePointsPayload) => {
    addExpMutate({ id: userId, payload });
  };
  const onSubmitPoints = (payload: TAddUserPointsPayload) => {
    addPointMutate({ id: userId, payload });
  };

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
    pageSize: LOG_PAGE_SIZE,
    search: queryStates.search,
    type: queryStates.type,
    direction,
  };

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-5xl flex flex-col px-4 pb-10 sm:px-6 lg:px-10">
        <AppBreadcrumb items={breadcrumbItems} />
        <div className="mt-4 mb-6 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-x-2">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Back to user"
              render={<Link href={`/dashboard/master/iam/users/${userId}`} />}
              nativeButton={false}
            >
              <ArrowLeft />
            </Button>
            <div className="flex min-w-0 flex-col">
              <h1 className="font-heading text-2xl">Balances</h1>
              {user?.display_name && (
                <p className="truncate text-sm text-muted-foreground">
                  Ledger of {user.display_name}
                </p>
              )}
            </div>
          </div>
          {canCreatePoints && (
            <Button
              type="button"
              className="shrink-0"
              onClick={() => {
                if (queryStates.tab === UserBalanceTabEnum.EXPERIENCE_POINTS) {
                  setIsAddExpDialogOpen(true);
                } else {
                  setIsAddPointDialogOpen(true);
                }
              }}
            >
              <Plus />
              {queryStates.tab === UserBalanceTabEnum.EXPERIENCE_POINTS ? (
                <>
                  <span className="md:hidden">Add EXP</span>
                  <span className="hidden md:inline">
                    Add Experience Points
                  </span>
                </>
              ) : (
                <>
                  <span className="md:hidden">Add GP</span>
                  <span className="hidden md:inline">Add Gold Pieces</span>
                </>
              )}
            </Button>
          )}
        </div>

        <section
          aria-label="Current balances"
          className="mb-6 grid w-full grid-cols-3 gap-2 sm:gap-4"
        >
          <UserBalanceStatCard
            label="Player EXP"
            unit="EXP"
            icon={ChessKnight}
            value={user?.player_exp}
            isLoading={userQuery.isLoading}
          />
          <UserBalanceStatCard
            label="DM EXP"
            unit="EXP"
            icon={BookOpen}
            value={user?.dm_exp}
            isLoading={userQuery.isLoading}
          />
          <UserBalanceStatCard
            label="Gold Pieces"
            unit="GP"
            icon={Coins}
            value={user?.points}
            isLoading={userQuery.isLoading}
          />
        </section>

        {!userQuery.isError && (
          <Tabs
            className="w-full min-w-0 gap-3"
            value={queryStates.tab}
            onValueChange={onTabChange}
          >
            <TabsList className="w-full sm:w-fit">
              <TabsTrigger value={UserBalanceTabEnum.EXPERIENCE_POINTS}>
                <Sparkles />
                Experience Points
              </TabsTrigger>
              <TabsTrigger value={UserBalanceTabEnum.GOLD_PIECES}>
                <Coins />
                Gold Pieces
              </TabsTrigger>
            </TabsList>
            <TabsContent value={UserBalanceTabEnum.EXPERIENCE_POINTS}>
              <UserBalanceLogList<UserExpLogTypeEnum>
                key={queryStates.tab}
                data={expItems}
                isLoading={
                  isLogsPending || expQuery.isLoading || expQuery.isFetching
                }
                isError={expQuery.isError}
                unit="EXP"
                onRetry={() => expQuery.refetch()}
                pageCount={expMeta?.total_page || 1}
                rowCount={expMeta?.total_all_data || 0}
                queryTable={queryTable}
                typeOptions={[UserExpLogTypeEnum.PLAYER, UserExpLogTypeEnum.DM]}
                typeLabels={USER_EXP_LOG_TYPE_LABEL}
                typeIcons={EXP_LOG_TYPE_ICONS}
                directionOptions={EXP_LOG_DIRECTION_OPTIONS}
                directionLabels={USER_EXP_LOG_DIRECTION_LABEL}
                isNegative={(row) =>
                  row.direction === UserExpLogDirectionEnum.DECREMENT
                }
                onPageChange={onPageChange}
                onSearchChange={onSearchChange}
                onFilterApply={onExpFilterApply}
              />
            </TabsContent>
            <TabsContent value={UserBalanceTabEnum.GOLD_PIECES}>
              <UserBalanceLogList<UserPointLogTypeEnum>
                key={queryStates.tab}
                data={pointItems}
                isLoading={
                  isLogsPending || pointQuery.isLoading || pointQuery.isFetching
                }
                isError={pointQuery.isError}
                unit="GP"
                onRetry={() => pointQuery.refetch()}
                pageCount={pointMeta?.total_page || 1}
                rowCount={pointMeta?.total_all_data || 0}
                queryTable={queryTable}
                typeOptions={[
                  UserPointLogTypeEnum.INCOME,
                  UserPointLogTypeEnum.EXPENSE,
                ]}
                typeLabels={USER_POINT_LOG_TYPE_LABEL}
                typeIcons={POINT_LOG_TYPE_ICONS}
                isNegative={(row) => row.type === UserPointLogTypeEnum.EXPENSE}
                onPageChange={onPageChange}
                onSearchChange={onSearchChange}
                onFilterApply={onPointFilterApply}
              />
            </TabsContent>
          </Tabs>
        )}
        {canCreatePoints && (
          <>
            <AddUserExperiencePointsDialog
              open={isAddExpDialogOpen}
              onOpenChange={setIsAddExpDialogOpen}
              onSubmitPayload={onSubmitExperience}
              mutationError={addExpError}
              isPending={addExpIsPending}
            />
            <AddUserPointsDialog
              open={isAddPointDialogOpen}
              onOpenChange={setIsAddPointDialogOpen}
              onSubmitPayload={onSubmitPoints}
              mutationError={addPointError}
              isPending={addPointIsPending}
            />
          </>
        )}
      </main>
    </div>
  );
}
