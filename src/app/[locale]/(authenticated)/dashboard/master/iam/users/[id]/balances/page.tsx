import type { Metadata } from "next";

import UserBalancesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Balances",
};

export default function UserBalancesPage() {
  return <UserBalancesPageClient />;
}
