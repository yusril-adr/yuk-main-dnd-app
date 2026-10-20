import { Suspense } from "react";
import type { Metadata } from "next";

import BalancesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Balances",
};

export default function BalancesPage() {
  // nuqs reads search params, so the client page needs a Suspense boundary
  return (
    <Suspense>
      <BalancesPageClient />
    </Suspense>
  );
}
