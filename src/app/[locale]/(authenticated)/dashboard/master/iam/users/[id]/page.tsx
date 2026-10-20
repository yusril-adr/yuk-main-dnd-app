import type { Metadata } from "next";

import UserDetailPageClient from "./page-client";

export const metadata: Metadata = {
  title: "User detail",
};

export default function UserDetailPage() {
  return <UserDetailPageClient />;
}
