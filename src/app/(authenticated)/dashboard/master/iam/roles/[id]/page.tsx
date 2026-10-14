import type { Metadata } from "next";

import RoleDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Role detail",
};

export default function RoleDetailPage() {
  return <RoleDetailPageClient />;
}
