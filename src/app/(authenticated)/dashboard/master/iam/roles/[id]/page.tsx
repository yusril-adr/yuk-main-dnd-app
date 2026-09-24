import type { Metadata } from "next";

import RoleDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Role detail",
};

export default function RoleDetailPage() {
  return <RoleDetailPageClient />;
}
