"use client";

import { useCallback, useMemo, useState } from "react";
import { parseAsInteger, parseAsString } from "nuqs";
import { useTranslations } from "next-intl";

import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";
import type { TPublicUserPaginationPayload } from "@/api/main/modules/users/types/public-user-pagination-payload";

import PublicGuildmateHero from "@/app/[locale]/(public)/guildmates/_components/public-guildmate-hero";
import PublicGuildmateLegendsSection from "@/app/[locale]/(public)/guildmates/_components/public-guildmate-legends-section";
import PublicGuildmateSearch from "@/app/[locale]/(public)/guildmates/_components/public-guildmate-search";
import PublicGuildmateCardList from "@/app/[locale]/(public)/guildmates/_components/public-guildmate-card-list";
import { useGetPublicGuildmatePagination } from "@/app/[locale]/(public)/guildmates/_hooks/use-get-public-guildmate-pagination";
import { useGetTopDmExperience } from "@/app/[locale]/(public)/guildmates/_hooks/use-get-top-dm-experience";
import { useGetTopPlayerExperience } from "@/app/[locale]/(public)/guildmates/_hooks/use-get-top-player-experience";
import { useCurrentMonthRange } from "@/app/[locale]/(public)/guildmates/_hooks/use-current-month-range";
import { PUBLIC_GUILDMATE_PAGE_SIZE } from "@/app/[locale]/(public)/guildmates/_constants/public-guildmate-page-size";
import type { TPublicGuildmateLegendEntry } from "@/app/[locale]/(public)/guildmates/_types/public-guildmate-components-props";

export default function GuildMatesPageClient() {
  const t = useTranslations("guildmates.roll");
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
  });

  // null on the server/first paint; boards show their skeleton until then
  const monthRange = useCurrentMonthRange();
  const topDmQuery = useGetTopDmExperience(monthRange?.payload ?? null);
  const topPlayerQuery = useGetTopPlayerExperience(
    monthRange?.payload ?? null,
  );

  const dmEntries: TPublicGuildmateLegendEntry[] = useMemo(
    () =>
      (topDmQuery.data?.data?.data ?? []).slice(0, 3).map((user, idx) => ({
        rank: idx + 1,
        user,
        gainedExp: user.gained_dm_exp,
      })),
    [topDmQuery.data],
  );
  const playerEntries: TPublicGuildmateLegendEntry[] = useMemo(
    () =>
      (topPlayerQuery.data?.data?.data ?? []).slice(0, 3).map((user, idx) => ({
        rank: idx + 1,
        user,
        gainedExp: user.gained_player_exp,
      })),
    [topPlayerQuery.data],
  );

  const payload: TPublicUserPaginationPayload = useMemo(
    () => ({
      page: queryStates.page,
      per_page: PUBLIC_GUILDMATE_PAGE_SIZE,
      search: queryStates.search,
    }),
    [queryStates],
  );

  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useGetPublicGuildmatePagination(payload);
  // Remounts the uncontrolled search input after a reset
  const [searchKey, setSearchKey] = useState(0);

  const guildmates = useMemo(
    () => responseData?.data?.data?.items ?? [],
    [responseData],
  );

  const onSearchChange = useCallback(
    (value: string) => {
      setQueryStates({ search: value, page: 1 });
    },
    [setQueryStates],
  );

  const onReset = useCallback(() => {
    setQueryStates({ search: "", page: 1 });
    setSearchKey((key) => key + 1);
  }, [setQueryStates]);

  const handlePageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
      document
        .getElementById("guildmates-heading")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    [setQueryStates],
  );

  const totalGuildmates = responseData?.data?.data?.meta?.total_all_data;

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-7xl flex flex-col gap-8 px-4 pt-2 pb-10 sm:gap-10 sm:px-6 sm:pb-16 lg:px-10">
        <PublicGuildmateHero
          totalGuildmates={
            queryStates.search ? null : (totalGuildmates ?? null)
          }
        />

        <PublicGuildmateLegendsSection
          monthName={monthRange?.monthName ?? null}
          monthLabel={monthRange?.monthLabel ?? null}
          dmBoard={{
            entries: dmEntries,
            isLoading: topDmQuery.isPending,
            isError: topDmQuery.isError,
            onRetry: () => topDmQuery.refetch(),
          }}
          playerBoard={{
            entries: playerEntries,
            isLoading: topPlayerQuery.isPending,
            isError: topPlayerQuery.isError,
            onRetry: () => topPlayerQuery.refetch(),
          }}
        />

        <section
          aria-labelledby="guildmates-heading"
          className="flex scroll-mt-20 flex-col gap-4 sm:gap-6"
          id="guildmates-section"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h2
              id="guildmates-heading"
              className="scroll-mt-20 font-heading text-2xl sm:text-3xl"
            >
              {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <PublicGuildmateSearch
            key={searchKey}
            search={queryStates.search}
            onSearchChange={onSearchChange}
          />

          <PublicGuildmateCardList
            data={guildmates}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => refetch()}
            onReset={onReset}
            pageCount={responseData?.data?.data?.meta?.total_page || 1}
            rowCount={totalGuildmates || 0}
            page={queryStates.page}
            search={queryStates.search}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </div>
  );
}
