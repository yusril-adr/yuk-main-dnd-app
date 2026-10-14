import type { Metadata } from "next";

import RoleCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Create role",
};

export default function RoleCreatePage() {
  return <RoleCreatePageClient />;
}
