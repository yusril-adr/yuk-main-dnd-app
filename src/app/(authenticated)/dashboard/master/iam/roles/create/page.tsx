import type { Metadata } from "next";

import RoleCreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "YukMainDnD - Create role",
};

export default function RoleCreatePage() {
  return <RoleCreatePageClient />;
}
