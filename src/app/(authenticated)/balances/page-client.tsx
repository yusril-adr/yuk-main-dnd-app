"use client";

import { useCallback } from "react";
import { Coins, Sparkles } from "lucide-react";
import { parseAsInteger, parseAsStringLiteral } from "nuqs";

import AppBreadcrumb from "@/app/_components/app-breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { useCamelCaseQueryStates } from "@/libs/nuqs/use-camel-case-query-states";

import BalanceSummary from "@/app/(authenticated)/balances/_components/balance-summary";
import BalanceExperiencePanel from "@/app/(authenticated)/balances/_components/balance-experience-panel";
import BalanceGoldPanel from "@/app/(authenticated)/balances/_components/balance-gold-panel";
import {
  BALANCE_TAB,
  BALANCE_TAB_OPTIONS,
} from "@/app/(authenticated)/balances/_constants/balance";
import type { TBalanceTab } from "@/app/(authenticated)/balances/_types/balance-components-props";

export default function BalancesPageClient() {
  const [queryStates, setQueryStates] = useCamelCaseQueryStates({
    tab: parseAsStringLiteral(BALANCE_TAB_OPTIONS).withDefault(
      BALANCE_TAB.EXPERIENCE,
    ),
    page: parseAsInteger.withDefault(1),
    type: parseAsInteger,
  });

  const onTabChange = useCallback(
    (tab: TBalanceTab) => setQueryStates({ tab, page: 1, type: null }),
    [setQueryStates],
  );

  const onTypeChange = useCallback(
    (type: number | null) => setQueryStates({ type, page: 1 }),
    [setQueryStates],
  );

  const onPageChange = useCallback(
    (page: number) => {
      setQueryStates({ page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setQueryStates],
  );

  const panelProps = {
    page: queryStates.page,
    type: queryStates.type,
    onPageChange,
    onTypeChange,
  };

  return (
    <div className="w-full flex justify-center min-w-0">
      <main className="w-full max-w-5xl flex flex-col px-4 pb-10 sm:px-6 lg:px-10">
        <AppBreadcrumb items={[{ name: "Balances" }]} />

        <div className="mt-4 mb-6 flex flex-col gap-1">
          <h1 className="font-heading text-2xl">Balances</h1>
          <p className="text-sm text-muted-foreground">
            Your ledger of experience and gold pieces.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <BalanceSummary />

          <Tabs
            value={queryStates.tab}
            onValueChange={(value) => onTabChange(value as TBalanceTab)}
          >
            <TabsList className="w-full sm:w-fit">
              <TabsTrigger value={BALANCE_TAB.EXPERIENCE}>
                <Sparkles />
                Experience
              </TabsTrigger>
              <TabsTrigger value={BALANCE_TAB.GOLD}>
                <Coins />
                Gold Pieces
              </TabsTrigger>
            </TabsList>
            <TabsContent value={BALANCE_TAB.EXPERIENCE} className="pt-2">
              <BalanceExperiencePanel {...panelProps} />
            </TabsContent>
            <TabsContent value={BALANCE_TAB.GOLD} className="pt-2">
              <BalanceGoldPanel {...panelProps} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
