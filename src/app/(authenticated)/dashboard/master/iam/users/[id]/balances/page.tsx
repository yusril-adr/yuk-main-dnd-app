import type { Metadata } from "next";

import UserBalancesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Balances",
};

export default function UserBalancesPage() {
  return <UserBalancesPageClient />;
}
