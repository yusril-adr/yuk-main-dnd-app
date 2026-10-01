import type { Metadata } from "next";

import UserDetailPageClient from "./page-client";

export const metadata: Metadata = { title: "YukMainDnD - User Detail" };

export default function UserDetailPage() {
  return <UserDetailPageClient />;
}