import { Fragment } from "react";

import { Card } from "@/app/_components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
} from "@/app/_components/ui/item";
import { Skeleton } from "@/app/_components/ui/skeleton";

import { BALANCE_PAGE_SIZE } from "@/app/[locale]/(authenticated)/balances/_constants/balance";

export default function BalanceLogSkeleton() {
  return (
    <Card size="sm" className="py-0" aria-busy="true" aria-label="Loading logs">
      <ItemGroup className="gap-0">
        {Array.from({ length: BALANCE_PAGE_SIZE }).map((_, index) => (
          <Fragment key={index}>
            {index > 0 && <ItemSeparator className="my-0" />}
            <Item role="listitem">
              <ItemContent>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </ItemContent>
              <ItemActions>
                <Skeleton className="h-5 w-16" />
              </ItemActions>
            </Item>
          </Fragment>
        ))}
      </ItemGroup>
    </Card>
  );
}
